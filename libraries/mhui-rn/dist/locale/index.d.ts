import { MIoTLang } from './lang/Interface';
export declare type Langs = 'zh' | 'zh_tw' | 'zh_hk' | 'en' | 'ko' | 'ru' | 'es' | 'fr' | 'it' | 'de' | 'id' | 'pl' | 'vi' | 'ja' | 'th' | 'tr' | 'nl' | 'pt';
export declare class Locale {
    static of(lang?: Langs): MIoTLang;
}
