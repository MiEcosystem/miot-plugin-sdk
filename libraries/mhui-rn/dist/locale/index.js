import * as langs from "./lang/index";
export class Locale {
  static of(lang = 'zh') {
    return langs[lang];
  }

}