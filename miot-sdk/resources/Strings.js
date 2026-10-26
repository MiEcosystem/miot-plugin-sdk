import locale from "miot/host/locale";
import { Utils } from "../native";
const placeholderRegex = /(\{[\d|\w]+\})/;
const getStrings = (strings) => {
  const language = locale.language;
  return strings[language] || strings['en'];
};
const formatString = (str, ...valuesForPlaceholders) => {
  return (str || '')
    .split(placeholderRegex)
    .filter((textPart) => !!textPart)
    .map((textPart) => {
      if (textPart.match(placeholderRegex)) {
        const matchedKey = textPart.slice(1, -1);
        let valueForPlaceholder = valuesForPlaceholders[matchedKey];
        // If no value found, check if working with an object instead
        if (valueForPlaceholder == undefined) {
          const valueFromObjectPlaceholder = valuesForPlaceholders[0][matchedKey];
          if (valueFromObjectPlaceholder !== undefined) {
            valueForPlaceholder = valueFromObjectPlaceholder;
          } else {
            // If value still isn't found, then it must have been undefined/null
            return valueForPlaceholder;
          }
        }
        return valueForPlaceholder;
      }
      return textPart;
    }).join('');
};
const pluralString = (pluralMap, replaces = []) => {
  const language = locale.language;
  let ret = null;
  if (typeof pluralMap === 'object') {
    ret = pluralMap[Utils.getPluralRules(language, replaces[0])];
  } else {
    ret = pluralMap;
  }
  if (!ret) {
    return '';
  }
  replaces.forEach((r) => {
    ret = ret.replace('{0}', r);
  });
  return ret;
};
const i18ns = {
  get zh() { return require('./translation/zh_CN').default; },
  get zh_tw() { return require('./translation/zh_TW').default; },
  get zh_hk() { return require('./translation/zh_HK').default; },
  get en() { return require('./translation/en_US').default; },
  get es() { return require('./translation/es_ES').default; },
  get ru() { return require('./translation/ru_RU').default; },
  get ko() { return require('./translation/ko_KR').default; },
  get fr() { return require('./translation/fr_FR').default; },
  get it() { return require('./translation/it_IT').default; },
  get de() { return require('./translation/de_DE').default; },
  get id() { return require('./translation/in_ID').default; },
  get pl() { return require('./translation/pl_PL').default; },
  get vi() { return require('./translation/vi_VN').default; },
  get ja() { return require('./translation/ja_JP').default; },
  get th() { return require('./translation/th_TH').default; },
  get tr() { return require('./translation/tr_TR').default; },
  get pt() { return require('./translation/pt_BR').default; },
  get nl() { return require('./translation/nl_NL').default; },
  get ar() { return require('./translation/ar_EG').default; },
  get he() { return require('./translation/iw_IL').default; },
  get el() { return require('./translation/el_GR').default; },
  get cs() { return require('./translation/cs_CZ').default; },
  get uk() { return require('./translation/uk_UA').default; },
  get hu() { return require('./translation/hu_HU').default; },
  get ro() { return require('./translation/ro_RO').default; },
  get sv() { return require('./translation/sv_SE').default; },
  get es_us() { return require('./translation/es_US').default; },
  get pt_pt() { return require('./translation/pt_PT').default; },
  get sk() { return require('./translation/sk_SK').default; },
  get nb() { return require('./translation/nb_NO').default; },
  get fi() { return require('./translation/fi_FI').default; }
};
// 为了 autoComplete
let strings = i18ns.zh;
const getI18nsStrings = () => {
  return getStrings({
    zh: i18ns.zh,
    zh_tw: i18ns.zh_tw,
    zh_hk: i18ns.zh_hk,
    en: i18ns.en,
    es: i18ns.es,
    ru: i18ns.ru,
    ko: i18ns.ko,
    fr: i18ns.fr,
    it: i18ns.it,
    de: i18ns.de,
    id: i18ns.id,
    pl: i18ns.pl,
    vi: i18ns.vi,
    ja: i18ns.ja,
    th: i18ns.th,
    tr: i18ns.tr,
    pt: i18ns.pt,
    nl: i18ns.nl,
    ar: i18ns.ar,
    he: i18ns.he,
    el: i18ns.el,
    cs: i18ns.cs,
    uk: i18ns.uk,
    hu: i18ns.hu,
    ro: i18ns.ro,
    sv: i18ns.sv,
    es_us: i18ns.es_us,
    pt_pt: i18ns.pt_pt,
    sk: i18ns.sk,
    nb: i18ns.nb,
    fi: i18ns.fi
  });
};
export const initI18nsStings = () => {
  let i18nsStrings = getI18nsStrings();
  Object.assign(strings, i18nsStrings);
};
strings = getI18nsStrings();
export default strings;
export { formatString, pluralString };