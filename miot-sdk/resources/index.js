/**
 * @export
 * @module miot/resources
 * @description 系统提供的静态资源, 包括图片, 文字, 基础 styleSheet css 等等
 *
 * import res from "miot/resources"
 *
 * res.logo
 * res.systemStrings.mijia
 *
 */
import logo from './images/logo.png'
import en from './strings/en'
import zh from './strings/zh'
/**
 * 支持的语言类型
 * @namespace Language
 */
export const Language={
    zh:"zh",
    zh_tw:"zh_tw",
    zh_hk:"zh_hk",
    en:"en",
    
}
 const i18n={system:{},custom:{}, lang:false}
export default {
    /**
     * 米家标志
     * @member
     */
    logo,
    /**
     * 注册多语言
     * @method
     * @param {json} langStrings 
     * @example
     * 
     * import res from 'miot/resources'
     * 
     * res.registerStrings({
     *  zh:{
     *      test:"测试字符串"
     *  },
     *  en:{
     *      test:"test strings"
     *  }
     * });
     * 
     * console.log(res.strings.test)
     * 
     */
    registerStrings(langStrings){
        if(!langStrings)return;
        if(i18n.lang){
            i18n.language = lang;
        }
    },
    /**
     * 获取当前使用中的语言, 缺省为Host.locale.language
     * @method
     */
    getLanguage(){
        return i18n.system.language;
    },
    /**
     * 设置当前语言, 如果 lang 为 false 或 null, 则恢复为Host.locale.language
     * @param {Language} lang 
     */
    setLanguage(lang){
        i18n.lang = lang;
        i18n.system.language = lang;
        (i18n.users||{}).language = lang;
    },
    /**
     * 获取系统字符串
     * @member
     * @example 
     * 
     * console.log(res.systemStrings.mijia)
     * 
     */
    get systemStrings(){
        return i18n.system.strings;
    },
    /**
     * 获取用户自定义字符串
     * @member
     * 
     */
    get strings(){
        return i18n.custom.strings;
    }
}