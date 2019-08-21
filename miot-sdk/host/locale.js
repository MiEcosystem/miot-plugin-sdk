/**
 * @export public
 * @doc_name 本地化模块
 * @doc_index 5
 * @doc_directory host
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
   * 获取系统语言
   */
  get systemLanguage() {
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
   * district(区域)
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
  /**
   * 获取手机的时区信息
   * @since 10024
   * @returns {Promise}
   * @example
   * Host.locale.getSystemTimeZone().then...
   * result = {"timeZone":"Asia/Shanghai"}
   */
  getSystemTimeZone() {
    return new Promise((resolve, reject) => {
      native.MIOTHost.getSystemTimezoneNameWithCallback((ok, result) => {
        if (ok) {
          resolve(result)
        } else {
          reject(result);
        }
      });
    })
  }
}