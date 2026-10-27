'use strict';
import { Service, Device } from 'miot';
const SKEY = 'mobile-network';
const cellularCheckCache = new Map(); // model → boolean
/**
 * 在 spec instance 中查找是否声明了某个 service。
 *
 * 兼容 spec-v2 与 v3:
 *   v2:`instance.services[*].type` 形如 `urn:...:service:mobile-network:...`,索引 3 是 skey
 *   v3:service 在 `instance.modules[*].services[*]` 下,索引 4 是 skey
 *
 * 不能用 Service.spec.getSpecByKey({skey}):它在 v3 + 无 mkey 时直接返回 [],会
 * 误判所有 v3 设备为非 4G(SDK service/spec.js:386-407)。
 */
function hasServiceInInstance(instance, skey) {
  if (!instance) return false;
  const isV3 = parseFloat(instance['protocol-version'] || 2) >= 3;
  const keyIndex = isV3 ? 4 : 3;
  const matches = (svc) => {
    const parts = (svc && svc.type ? svc.type : '').split(':');
    return parts[keyIndex] === skey;
  };
  if (isV3) {
    const modules = instance.modules || [];
    for (let i = 0; i < modules.length; i++) {
      if ((modules[i].services || []).some(matches)) return true;
    }
    return false;
  }
  return (instance.services || []).some(matches);
}
/**
 * 判定当前设备是否为 4G(蜂窝)设备:查 spec 是否声明 mobile-network service。
 *
 * 拉的是 spec 元数据(米家服务器),设备离线也能查;首次走 RPC,后续命中
 * SDK 内 cachedParsedInstance 缓存。spec 查询失败时直接抛出,由调用方决定
 * 提示策略——不静默 return false,避免 4G 设备在 spec 抖动时被误带去 Wi-Fi 兜底页。
 */
export async function isCellularDevice() {
  const instance = await Service.spec.getInstanceWithCache(Device.deviceID);
  return hasServiceInInstance(instance, SKEY);
}
/** 按 model 维度内存缓存,后续点击零延迟 */
export async function isCellularDeviceCached() {
  const model = Device.model;
  if (cellularCheckCache.has(model)) return cellularCheckCache.get(model);
  const result = await isCellularDevice();
  cellularCheckCache.set(model, result);
  return result;
}