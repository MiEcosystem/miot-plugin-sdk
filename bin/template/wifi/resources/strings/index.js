import { Resources } from 'miot';
import { Language } from 'miot/resources';

const LANGUAGE = Resources.getLanguage();

function getLocalizedString(language) {
  let K = getI18nKeywords(language);
  return K;
}

/**
 * 插件开发者可以根据自己所需，判断插件需要支持哪些语言做对应的增/删
 * @param language
 * @returns
 */
function getI18nKeywords(language) {
  switch (language) {
    case Language.zh:
      return require('./zh');
    case Language.zh_tw:
      return require('./zh_tw');
    case Language.zh_hk:
      return require('./zh_hk');
    case Language.en:
      return require('./en');
    case Language.ko:
      return require('./ko');
    case Language.ru:
      return require('./ru');
    case Language.es:
      return require('./es');
    case Language.fr:
      return require('./fr');
    case Language.it:
      return require('./it');
    case Language.de:
      return require('./de');
    case Language.id:
      return require('./id');
    case Language.pl:
      return require('./pl');
    case Language.vi:
      return require('./vi');
    case Language.ja:
      return require('./ja');
    case Language.th:
      return require('./th');
    default:
      return require('./zh');
  }
}

const PluginStrings = getLocalizedString(LANGUAGE);
export default PluginStrings;

