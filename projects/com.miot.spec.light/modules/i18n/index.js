import { Resources } from 'miot';
import { Language } from 'miot/resources';

const LANGUAGE = Resources.getLanguage();

function getLocalizedString(language) {
  let K = getI18nKeywords(language);
  return {
    powerOn: K.keyword0,
    powerOff: K.keyword1,
    switch: K.keyword2,
    setTime: K.keyword3,
    timer: K.keyword4,
    setting: K.keyword5,
    featureSetting: K.keyword6,
    commonSetting: K.keyword7,
    deviceName: K.keyword8,
    deviceTimezone: K.keyword9,
    locationManagement: K.keyword10,
    shareDevice: K.keyword11,
    ifttt: K.keyword12,
    firmwareUpgrate: K.keyword13,
    moreSetting: K.keyword14,
    helpPage: K.keyword15,
    feedback: K.keyword16,
    addToDesktop: K.keyword17,
    licenseAndPolicy: K.keyword18,
    resetDevice: K.keyword19,
    security: K.keyword39,

    buttonOpenTitle: K.keyword36,
    buttonSuspendTitle: K.keyword37,
    buttonCloseTitle: K.keyword35,

    customize: K.keyword20,
    cancel: K.keyword21,
    startUp: K.keyword22,

    timingTipOn: K.keyword23,
    timingTipOff: K.keyword24,
    countdownTipOn: (h, m) => {
      let s = '';
      if (h > 0) {
        s += (`${ (h == 1 ? K.keyword25_0 : K.keyword25_0_plurals).replace('{1}', h) } `);
      }
      s += (m == 1 ? K.keyword25_1 : K.keyword25_1_plurals).replace('{1}', m);
      return K.keyword25.replace('{1}', s);
    },
    countdownTipOff: (h, m) => {
      let s = '';
      if (h > 0) {
        s += (`${ (h == 1 ? K.keyword25_0 : K.keyword25_0_plurals).replace('{1}', h) } `);
      }
      s += (m == 1 ? K.keyword25_1 : K.keyword25_1_plurals).replace('{1}', m);
      return K.keyword26.replace('{1}', s);
    },
    openInfo: K.keyword27,
    closeInfo: K.keyword28,

    shortHour: K.keyword29,
    shortMinute: K.keyword30,
    minute: K.keyword32,
    minutes: K.keyword32_plurals,

    handling: K.keyword33,
    failed: K.keyword34,
    noSharedPermission: K.keyword40
  };
}

function getI18nKeywords(language) {
  switch (language) {
    case Language.zh:
      return require('./zh');
    case Language.zh_tw:
      return require('./zh_tw');
    case Language.zh_hk:
      return require('./zh_hk');
    // // case Language.zh_bo:
    // //   return require('./zh_bo');
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
    // case Language.pt:
    //   return require('./pt');
    // case Language.nl:
    //   return require('./nl');
    // case Language.ar:
    //   return require('./ar');
    default:
      return require('./zh');
  }
}

export default {
  [LANGUAGE]: getLocalizedString(LANGUAGE)
};
