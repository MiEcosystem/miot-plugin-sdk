/**
 * @export
 * @module miot/host/locale
 * @description host 的本地信息, 包括语言，时区和地理位置
 * @example
 * import {Host} from 'miot'
 * ...
 * let language = Host.locale.language
 * let timeZone = Host.locale.timeZone
 * if (language === 'zh') ...
 * ... 
 *
 */
export default {
  /**
   * 获取米家 APP 语言
   * @type {string}
   */
  get language() {
  },
  /**
   * 获取时区
   * @type {string}
   */
  get timeZone() {
  },
  /**
   * 是否是24小时制计时格式
   * @type {boolean}
   */
  get is24HourTime() {
  },
  
  /**
   * 获取手机地理位置信息
   * {
   * country
   * province
   * city
   * district
   * street
   * address
   * latitude(纬度)
   * longitude(经度)
   * citycode(城市编码)
   * adcode(区域编码)
   * }
   * @returns {Promise}
   * @example
   * import {Host} from 'miot'
   * ...
   * Host.locale.getLocation().then(res => {
   *  console.log('get location: ', res)
   * })
   */
  getLocation() {
     return Promise.resolve(null);
  },
}