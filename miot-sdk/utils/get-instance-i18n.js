import { Device, Service, Host } from 'miot';
const api = 'http://miot-spec.srv/instance/v2/multiLanguage?urn=';
const defaultLang = 'en';
const LangMap = {
  nl: 'nl_NL',
  tr: 'tr_TR',
  zh: 'zh_cn'
};
const FlagMap = {
  service: 'service',
  property: 'property',
  valuelist: 'valuelist',
  action: 'action',
  event: 'event'
};
const CachedI18ns = {};
function getApiUrl(type) {
  return `${ api }${ type }`;
}
function getI18n(did) {
  if (CachedI18ns[did]) {
    return Promise.resolve(CachedI18ns[did]);
  }
  return Service.spec.getInstanceWithCache(did).then((instance) => {
    if (instance?.type) {
      return fetch(getApiUrl(instance?.type));
    }
    return Promise.reject();
  }).then((i18n) => {
    return i18n.json();
  }).then((i18n) => {
    CachedI18ns[did] = i18n?.data;
    return CachedI18ns[did];
  });
}
export function getI18nForSpecs(specs = [], did = Device.deviceID) {
  return getI18n(did).then((i18n) => {
    return getI18nForSpecsFromCachedI18n(i18n, specs);
  });
}
/**
 * 将多个文案配置依次合并成一个，后者相对于前者的差异部分，替换或新增
 * 注意：参数中不需要带有语言标识
 * @param {object} 文案配置，如{title: 'xxx'}，支持多个参数依次列开
 * @return {object} 合并后的配置
 */
export function mergeI18n(...i18ns) {
  return i18ns.reduce((ret, i18n) => {
    return {
      ...ret,
      ...(i18n || {})
    };
  }, {});
}
/**
 * 通过传入的specs 获取对应的功能定义文案，若有fn 则根据fn 对文案进行处理
 * @param {array} specs 支持service({siid}), property({siid, piid}), valuelist({siid, piid, viid}), action({siid, aiid}), event({siid, eiid})
 * @param {function} fn 对拿到的功能定义的文案进行额外处理
 * @return {string} 最终返回的文案
 */
function getI18nForSpecsFromCachedI18n(CachedI18n, specs) {
  const lang = Host.locale.language;
  if (!CachedI18n) {
    return '';
  }
  const i18n = CachedI18n[LangMap[lang] || lang] || CachedI18n[defaultLang] || CachedI18n['zh_cn'] || {};
  // if (!i18n) {
  //   return '';
  // }
  const keys = specs.map((spec) => {
    return getI18nKey(spec);
  });
  const specI18ns = keys.map((key) => {
    // return i18n[key] || '';
    return i18n[key] || (CachedI18n[defaultLang] ? CachedI18n[defaultLang][key] : '') || (CachedI18n['zh_cn'] ? CachedI18n['zh_cn'][key] : '') || '';
  });
  return specI18ns;
}
function getI18nKeyFlag(type, n) {
  const id = (`000${ n }`).slice(-3);
  return `${ type }:${ id }`;
}
function getI18nKey(spec) {
  if (!spec) {
    return '';
  }
  const { siid, piid, viid, aiid, eiid } = spec;
  const keyFlags = [];
  if (siid) {
    keyFlags.push(getI18nKeyFlag(FlagMap.service, siid));
  }
  if (piid) {
    keyFlags.push(getI18nKeyFlag(FlagMap.property, piid));
    // value 比较特殊，是从0开始的序号
    if (viid || viid === 0) {
      keyFlags.push(getI18nKeyFlag(FlagMap.valuelist, viid));
    }
  }
  if (aiid) {
    keyFlags.push(getI18nKeyFlag(FlagMap.action, aiid));
  }
  if (eiid) {
    keyFlags.push(getI18nKeyFlag(FlagMap.event, eiid));
  }
  return keyFlags.join(':');
}