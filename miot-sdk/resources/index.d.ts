export namespace Language {
    const zh: string;
    const zh_tw: string;
    const zh_hk: string;
    const zh_bo: string;
    const en: string;
    const es: string;
    const ko: string;
    const ru: string;
    const it: string;
    const fr: string;
    const de: string;
    const id: string;
    const pl: string;
    const vi: string;
    const ja: string;
    const th: string;
    const pt: string;
    const nl: string;
    const ar: string;
    const tr: string;
    const he: string;
    const el: string;
    const cs: string;
    const uk: string;
    const hu: string;
    const ro: string;
    const sv: string;
    const es_us: string;
    const pt_pt: string;
    const sk: string;
    const nb: string;
    const fi: string;
}
declare namespace _default {
    export { logo };
    /**
       * 注册多语言
       * @method
       * @param {json} langStrings
       * @example
       *
       import res from 'miot/resources'
       res.registerStrings({
          zh:{
              t1:"测试字符串",
              t2:"数值为{1}",
              t3:["从{1}到{2}", [0, "非法数据"], [1, "错误数据"], [2, "从 二 到 {2}"], [(v1,v2)=>v1>100, "太多了"]],
              t4:{
                  t5:()=>"好的",
                  t6:["最多{1}"],
                  t7:(a,b,c)=>`${a}|${b}|${c}`,
                  t8:"你好"
              }
          },
          en:{
              t1:"test strigns",
              t2:"value is {1}",
              t3:["from {1} to {2}", [0, "invalid data"], [1, "wrong value"], [3, "from three to {2}"], [v1=>v1>100, "too more"]],
              t4:{
                  t5:[()=>"good"],
                  t6:"{1} at most",
                  t7:(a,b,c)=>`${a}/${b}/${c}`
              }
          }
       });
  
      //style recommend
      console.log(res.strings.t1);
      console.log(res.strings.t2(123));
      console.log(res.strings.t3(0, 1));
      console.log(res.strings.t3(1, 2));
      console.log(res.strings.t3(2, 200));
      console.log(res.strings.t3(100, 3000));
      console.log(res.strings.t3(101, 500));
      console.log(res.strings.t4.t5());
      console.log(res.strings.t4.t6(20));
      console.log(res.strings.t4.t7(5,6,7));
      console.log(res.strings.t4.t8);
  
      //style traditional
      console.log(res.getString('t1');
      console.log(res.getString('t2',123));
      console.log(res.getString('t3', 0, 1));
      console.log(res.getString('t3', 1, 2));
      console.log(res.getString('t3', 2, 200));
      console.log(res.getString('t3', 100, 3000));
      console.log(res.getString('t3', 101, 500));
      console.log(res.getString('t4.t5');
      console.log(res.getString('t4.t6', 20));
      console.log(res.getString('t4.t7', 5,6,7));
      console.log(res.getString('t4.t8');
  
  
  
       *
       */
    export function registerStrings(langStrings: json): void;
    /**
       * 注册多语言
       * @method
       * @param {json} langStrings
       * @example
       *
       import res from 'miot/resources'
       res.registerStrings({
          zh:{
              t1:"测试字符串",
              t2:"数值为{1}",
              t3:["从{1}到{2}", [0, "非法数据"], [1, "错误数据"], [2, "从 二 到 {2}"], [(v1,v2)=>v1>100, "太多了"]],
              t4:{
                  t5:()=>"好的",
                  t6:["最多{1}"],
                  t7:(a,b,c)=>`${a}|${b}|${c}`,
                  t8:"你好"
              }
          },
          en:{
              t1:"test strigns",
              t2:"value is {1}",
              t3:["from {1} to {2}", [0, "invalid data"], [1, "wrong value"], [3, "from three to {2}"], [v1=>v1>100, "too more"]],
              t4:{
                  t5:[()=>"good"],
                  t6:"{1} at most",
                  t7:(a,b,c)=>`${a}/${b}/${c}`
              }
          }
       });
  
      //style recommend
      console.log(res.strings.t1);
      console.log(res.strings.t2(123));
      console.log(res.strings.t3(0, 1));
      console.log(res.strings.t3(1, 2));
      console.log(res.strings.t3(2, 200));
      console.log(res.strings.t3(100, 3000));
      console.log(res.strings.t3(101, 500));
      console.log(res.strings.t4.t5());
      console.log(res.strings.t4.t6(20));
      console.log(res.strings.t4.t7(5,6,7));
      console.log(res.strings.t4.t8);
  
      //style traditional
      console.log(res.getString('t1');
      console.log(res.getString('t2',123));
      console.log(res.getString('t3', 0, 1));
      console.log(res.getString('t3', 1, 2));
      console.log(res.getString('t3', 2, 200));
      console.log(res.getString('t3', 100, 3000));
      console.log(res.getString('t3', 101, 500));
      console.log(res.getString('t4.t5');
      console.log(res.getString('t4.t6', 20));
      console.log(res.getString('t4.t7', 5,6,7));
      console.log(res.getString('t4.t8');
  
  
  
       *
       */
    export function registerStrings(langStrings: json): void;
    /**
       * 获取当前使用中的语言, 缺省为Host.locale.language
       * @method
       */
    export function getLanguage(): any;
    /**
       * 获取当前使用中的语言, 缺省为Host.locale.language
       * @method
       */
    export function getLanguage(): any;
    /**
       * 设置当前语言, 如果 lang 为 false 或 null, 则恢复为Host.locale.language
       * @param {Language} lang
       */
    export function setLanguage(lang: {
        /**
           * 中文
           * @const
           */
        zh: string;
        /**
           * 繁体中文(台湾)
           * @const
           */
        zh_tw: string;
        /**
           * 繁体中文(香港)
           * @const
           */
        zh_hk: string;
        /**
           * 藏语
           * @const
           */
        zh_bo: string;
        /**
           * 英语
           * @const
           */
        en: string;
        /**
           * 西班牙语
           * @const
           */
        es: string;
        /**
           * 朝鲜语
           * @const
           */
        ko: string;
        /**
           * 俄语
           * @const
           */
        ru: string;
        /**
           * 意大利
           * @const
           */
        it: string;
        /**
           * 法语
           * @const
           */
        fr: string;
        /**
           * 德语
           * @const
           */
        de: string;
        /**
           * 印尼
           * @const
           */
        id: string;
        /**
           * 波兰
           * @const
           */
        pl: string;
        /**
           * 越南
           * @const
           */
        vi: string;
        /**
           * 日语
           * @const
           */
        ja: string;
        /**
           * 傣语
           * @const
           */
        th: string;
        /**
           * 葡萄牙语
           * @const
           */
        pt: string;
        /**
           * 荷兰语
           * @const
           */
        nl: string;
        /**
           * 阿拉伯语
           * @const
           */
        ar: string;
        /**
           * 土耳其语
           * @const
           */
        tr: string;
        /**
         * 希伯来语
         * @const
         */
        he: string;
        /**
         * 希腊语
         * @const
         */
        el: string;
        /**
          * 捷克语
          * @constc
          */
        cs: string;
        /**
          * 乌克兰语
          * @const
          */
        uk: string;
        /**
          * 匈牙利语
          * @const
          */
        hu: string;
        /**
          * 罗马尼亚语
           * @const
          */
        ro: string;
        /**
          * 瑞典语
          * @const
          */
        sv: string;
        /**
          * 拉美西班牙语
          * @const
          */
        es_us: string;
        /**
          * 欧洲葡萄牙语
          * @const
          */
        pt_pt: string;
        /**
          * 斯洛伐克语
          * @const
          */
        sk: string;
        /**
          * 挪威语
          * @const
          */
        nb: string;
        /**
          * 芬兰语
          * @const
          */
        fi: string;
    }): void;
    /**
       * 设置当前语言, 如果 lang 为 false 或 null, 则恢复为Host.locale.language
       * @param {Language} lang
       */
    export function setLanguage(lang: {
        /**
           * 中文
           * @const
           */
        zh: string;
        /**
           * 繁体中文(台湾)
           * @const
           */
        zh_tw: string;
        /**
           * 繁体中文(香港)
           * @const
           */
        zh_hk: string;
        /**
           * 藏语
           * @const
           */
        zh_bo: string;
        /**
           * 英语
           * @const
           */
        en: string;
        /**
           * 西班牙语
           * @const
           */
        es: string;
        /**
           * 朝鲜语
           * @const
           */
        ko: string;
        /**
           * 俄语
           * @const
           */
        ru: string;
        /**
           * 意大利
           * @const
           */
        it: string;
        /**
           * 法语
           * @const
           */
        fr: string;
        /**
           * 德语
           * @const
           */
        de: string;
        /**
           * 印尼
           * @const
           */
        id: string;
        /**
           * 波兰
           * @const
           */
        pl: string;
        /**
           * 越南
           * @const
           */
        vi: string;
        /**
           * 日语
           * @const
           */
        ja: string;
        /**
           * 傣语
           * @const
           */
        th: string;
        /**
           * 葡萄牙语
           * @const
           */
        pt: string;
        /**
           * 荷兰语
           * @const
           */
        nl: string;
        /**
           * 阿拉伯语
           * @const
           */
        ar: string;
        /**
           * 土耳其语
           * @const
           */
        tr: string;
        /**
         * 希伯来语
         * @const
         */
        he: string;
        /**
         * 希腊语
         * @const
         */
        el: string;
        /**
          * 捷克语
          * @constc
          */
        cs: string;
        /**
          * 乌克兰语
          * @const
          */
        uk: string;
        /**
          * 匈牙利语
          * @const
          */
        hu: string;
        /**
          * 罗马尼亚语
           * @const
          */
        ro: string;
        /**
          * 瑞典语
          * @const
          */
        sv: string;
        /**
          * 拉美西班牙语
          * @const
          */
        es_us: string;
        /**
          * 欧洲葡萄牙语
          * @const
          */
        pt_pt: string;
        /**
          * 斯洛伐克语
          * @const
          */
        sk: string;
        /**
          * 挪威语
          * @const
          */
        nb: string;
        /**
          * 芬兰语
          * @const
          */
        fi: string;
    }): void;
    /**
       * 根据主键名获取系统的国际化字符串
       * @param {string} key -主键名
       * @param  {...any} params -参数
       * @returns {string}
       * @example
       *    res.getSystemString('mijia')
       */
    export function getSystemString(key: string, ...params: any[]): string;
    /**
       * 根据主键名获取系统的国际化字符串
       * @param {string} key -主键名
       * @param  {...any} params -参数
       * @returns {string}
       * @example
       *    res.getSystemString('mijia')
       */
    export function getSystemString(key: string, ...params: any[]): string;
    /**
       * 根据主键名获取用户自定义的国际化字符串
       * @param {string} key -主键名
       * @param  {...any} params -参数
       * @returns {string}
       * @example
       *    res.getString('t1.tx', 1)
       *    res.getString('t2')
       */
    export function getString(key: string, ...params: any[]): string;
    /**
       * 根据主键名获取用户自定义的国际化字符串
       * @param {string} key -主键名
       * @param  {...any} params -参数
       * @returns {string}
       * @example
       *    res.getString('t1.tx', 1)
       *    res.getString('t2')
       */
    export function getString(key: string, ...params: any[]): string;
    export { createI18n };
}
export default _default;
import Images from "./Images";
import Styles from "./Styles";
import strings from "./Strings";
import { createI18n } from "../native";
export { Images, Styles, strings };