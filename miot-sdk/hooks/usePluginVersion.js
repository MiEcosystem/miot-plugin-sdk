// 修复 MIIO-129341:更多设置页"插件版本"从 native 兜底值跳变到服务器返回值的"闪一下"。
// 原行为:每次 mount → useState 初始 = native.MIOTPackage.version("5") → useEffect 异步拉
//        服务器拼成 "5.4" → setState 触发重渲染。视觉上每次进设置页都要闪一次。
//
// 修复分两层:
//   ① hook 层加模块级缓存 (models, specifiedModel) → mergeVersion。命中即同步用作
//      useState 初始值,跳过一次 paint。
//   ② 暴露 primeVersionCache,允许插件入口在 RN bundle 加载时就发起一次 fetch,
//      把结果预写进同一份缓存。用户从首页走到设置页期间(≥几百 ms)网络已回,
//      首次进入也能命中缓存 → first paint 就是终态,0 闪 0 空白。
//
// 行为对照(单插件 session):
//   入口已 prime + 进设置页时 prefetch 已回:first paint = "5.4",0 闪 0 空白
//   入口未 prime / prefetch 未回:first paint = native "5",~几百 ms 内跳一次
//                                  (退化到 prime 之前的行为,作为弱网降级)
//   第 N(>1)次进入:first paint = "5.4",0 闪
//   弱网 / fetch reject:不写缓存,行为同未 prime
//
// 兼容性:hook 默认导出签名 / 返回类型 / 副作用顺序均未变,所有插件无需调整调用方式;
//        primeVersionCache 是新增的可选能力,不调用就是纯缓存方案。
// 缓存范围:模块级 Map,各插件 RN bundle 独立 JS context,不会跨插件污染。
import { useState, useEffect } from 'react';
import Device from 'miot/device/BasicDevice';
import native from 'miot/native';
import { fetchPluginInfos } from '../utils/plugin-info';
const versionCache = new Map();
function buildCacheKey(models, specifiedModel) {
  return `${ models.join(',') }|${ specifiedModel || '' }`;
}
function formatMergeVersion(plugins) {
  return (plugins || []).map((plugin) => {
    const { version: pluginVersion = '0', status = '0' } = plugin || {};
    return `${ pluginVersion }.${ status }`;
  }).join('-');
}
/**
 * 主动预热版本缓存。建议在插件入口(Package.entry 之前)fire-and-forget 调一次,
 * 让"用户从首页走到设置页"这段时间被网络往返填满,设置页 mount 时即可同步取到
 * 服务器拼接版本,避免首次进入仍闪一次。
 *
 * @param {string[]} [models] - 默认 [Device.model]
 * @param {string} [specifiedModel] - 默认 ''
 * @returns {Promise<string|undefined>} 成功时 resolve mergeVersion(已写入缓存),
 *   失败时 resolve undefined(不写缓存,不抛异常,不影响入口流程)
 */
export function primeVersionCache(models = [Device.model], specifiedModel = '') {
  const { version } = native.MIOTPackage;
  return fetchPluginInfos(
    models,
    specifiedModel ? [{ model: specifiedModel, version }] : []
  ).then((plugins) => {
    const mergeVersion = formatMergeVersion(plugins);
    versionCache.set(buildCacheKey(models, specifiedModel), mergeVersion);
    return mergeVersion;
  }).catch(() => undefined);
}
export default function usePluginVersion(models = [Device.model], specifiedModel = '') {
  const cacheKey = buildCacheKey(models, specifiedModel);
  const cached = versionCache.get(cacheKey);
  const { version } = native.MIOTPackage;
  // cache hit → first paint 直接显示上次拼接好的 mergeVersion;miss → native 兜底
  const [pluginVersion, setPluginVersion] = useState(cached || version);
  useEffect(() => {
    fetchPluginInfos(models, specifiedModel ? [{ model: specifiedModel, version }] : []).then((plugins) => {
      const mergeVersion = formatMergeVersion(plugins);
      setPluginVersion(mergeVersion);
      versionCache.set(cacheKey, mergeVersion);
    }).catch(() => {});
  }, []);
  return pluginVersion;
}