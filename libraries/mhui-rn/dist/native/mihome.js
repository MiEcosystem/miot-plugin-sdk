// @ts-nocheck

/* eslint-disable */
import { NativeModules, Platform } from 'react-native';
const MIOTHost = Platform.OS === 'ios' ? NativeModules.MHPluginSDK : NativeModules.MIOTHost;
const MIOTService = NativeModules.MIOTService;
const LanguageNameMap = Platform.OS === 'ios' ? {
  /**
     * 中文
     */
  zh: ['zh_CN', 'zh-CN', 'zh-Hans'],

  /**
     * 繁体中文(台湾)
     */
  zh_tw: ['zh_TW', 'zh-TW', 'zh-Hant'],

  /**
     * 繁体中文(香港)
     */
  zh_hk: ['zh_HK', 'zh-HK', 'zh-Hant-HK'],

  /**
     * 藏语
     */
  zh_bo: /bo($|_)/,

  /**
     * 英语
     */
  en: /^en($|_)/,

  /**
     * 西班牙语
     */
  es: /^es($|_)/,

  /**
     * 朝鲜语
     */
  ko: /^ko($|_)/,

  /**
     * 俄语
     */
  ru: /^ru($|_)/,

  /**
     * 意大利
     */
  it: /^it($|_)/,

  /**
     * 法语
     */
  fr: /^fr($|_)/,

  /**
     * 德语
     */
  de: /^de($|_)/,

  /**
     * 印尼
     */
  id: /^id($|_)/,

  /**
     * 波兰
     */
  pl: /^pl($|_)/,

  /**
     * 越南
     */
  vi: /^vi($|_)/,

  /**
     * 日语
     */
  ja: /^ja($|_)/,

  /**
     * 傣语
     */
  th: /^th($|_)/,

  /**
     * 葡萄牙
     */
  pt: /^pt($|_)/,

  /**
     * 荷兰
     */
  nl: /^nl($|_)/,

  /**
     * 阿拉伯语
     */
  ar: /^ar($|_)/,

  /**
     * 土耳其语言
     */
  tr: /^tr($|_)/
} : {
  /**
     * 中文
     */
  zh: ['zh', 'zh_CN'],

  /**
     * 繁体中文(台湾)
     */
  zh_tw: 'zh_TW',

  /**
     * 繁体中文(香港)
     */
  zh_hk: 'zh_HK',

  /**
     * 藏语
     */
  zh_bo: /bo($|_)/,

  /**
     * 英语
     */
  en: /^en($|_)/,

  /**
     * 西班牙语
     */
  es: /^es($|_)/,

  /**
     * 朝鲜语
     */
  ko: /^ko($|_)/,

  /**
     * 俄语
     */
  ru: /^ru($|_)/,

  /**
     * 意大利
     */
  it: /^it($|_)/,

  /**
     * 法语
     */
  fr: /^fr($|_)/,

  /**
     * 德语
     */
  de: /^de($|_)/,

  /**
     * 印尼
     */
  id: /(^|_)id($|_)/,
  // android 印尼语 native 返回 ‘in_id’，修改正则

  /**
     * 波兰
     */
  pl: /^pl($|_)/,

  /**
     * 越南
     */
  vi: /^vi($|_)/,

  /**
     * 日语
     */
  ja: /^ja($|_)/,

  /**
     * 傣语
     */
  th: /^th($|_)/,

  /**
     * 葡萄牙
     */
  pt: /^pt($|_)/,

  /**
     * 荷兰
     */
  nl: /^nl($|_)/,

  /**
     * 阿拉伯语
     */
  ar: /^ar($|_)/,

  /**
     * 土耳其语言
     */
  tr: /^tr($|_)/
};

function getStandardLanguageName(name, nameMap) {
  // default is en
  if (!name) return 'en';

  const std = n => n.toLowerCase().replace(/-/g, '_');

  name = std(name);
  const ns = Object.keys(nameMap);

  for (let i = 0; i < ns.length; i++) {
    const lang = ns[i];
    const nm = nameMap[lang];
    if (!nm) continue;

    if (Array.isArray(nm)) {
      for (let j = 0; j < nm.length; j++) {
        if (typeof nm[j].test === 'function') {
          if (nm[j].test(name)) return lang;
        } else if (name == std(nm[j])) {
          return lang;
        }
      }
    } else if (typeof nm === 'function') {
      if (nm(name)) return lang;
    } else if (typeof nm.test === 'function') {
      if (nm.test(name)) return lang;
    } else if (name == std(nm)) {
      return lang;
    }
  }

  return 'en';
}

function getSystemLanguage() {
  return getStandardLanguageName(MIOTHost?.language || 'en', LanguageNameMap);
}

export const currentDarkMode = MIOTService?.currentDarkMode || 'light';
export const language = getSystemLanguage();