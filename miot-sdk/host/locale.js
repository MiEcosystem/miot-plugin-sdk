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
import { report } from "../decorator/ReportDecorator";
import Permission from '../service/permission';
import Device from "../device/BasicDevice";
import { System } from "../index";
/**
 * 本地化
 * @interface
 *
 */
class ILocale {
  /**
   * 获取米家 APP 语言
   * @type {string}
   */
  get language() {
  }
  /**
   * 获取系统语言
   * @type {string}
   */
  get systemLanguage() {
  }
  /**
   * 获取时区
   * @type {string}
   */
  get timeZone() {
  }
  /**
   * 是否是24小时制计时格式
   * @type {boolean}
   */
  get is24HourTime() {
  }
  /**
   * 获取手机地理位置信息
   * @returns {Promise<object>}{
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
   * @deprecated Use {@System.location.getLocation} 建议使用System.location.getLocation
   * @example
   * import {Host} from 'miot'
   * ...
   * Host.locale.getLocation().then(res => {
   *  console.log('get location: ', res)
   * })
   */
  @report
  getLocation() {
     return Promise.resolve(null);
  }
  /**
   * 获取手机的时区信息
   * @since 10024
   * @returns {Promise}
   * @example
   * Host.locale.getSystemTimeZone().then...
   * result = {"timeZone":"Asia/Shanghai"}
   */
  @report
  getSystemTimeZone() {
     return Promise.resolve(null);
  }
  /**
   * 获取手机系统设置时区差，仅Android设备需要该方法，iOS设备建议使用new Date().getTimezoneOffset()
   *
   * @since 10062
   * @returns {Promise} 成功进入then，失败进入catch
   * code : 0代表接口调用成功
   * iOS调用该接口返回{ "code": -1, "message": 'iOS not support' }
   @example
   *
   * ...
   * Host.locale.getSystemTimeZoneOffset().then((res) => {
   *   console.log("res", res);
   * }).catch((error) => {
   *    console.log("error", error);
   * });
   */
  @report
  getSystemTimeZoneOffset() {
  }
}
const LocaleInstance = new ILocale();
export default LocaleInstance;