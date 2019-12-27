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
//@native
import native from "../native";
export default {
  /**
   * 获取米家 APP 语言
   * @type {string}
   */
  get language() {
    //@native
    return native.language;
  },
  /**
   * 获取系统语言
   * @type {string}
   */
  get systemLanguage() {
    //@native
    return native.MIOTHost.systemLanguage;
  },
  /**
   * 获取时区
   * @type {string}
   */
  get timeZone() {
    //@native begin
    return native.MIOTHost.timeZone;
    //@native end
  },
  /**
   * 是否是24小时制计时格式
   * @type {boolean}
   */
  get is24HourTime() {
    //@native begin
    return native.MIOTHost.is24HourTime;
    //@native end
  },
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
   * @example
   * import {Host} from 'miot'
   * ...
   * Host.locale.getLocation().then(res => {
   *  console.log('get location: ', res)
   * })
   */
  getLocation() {
    //@native :=> promise
    return new Promise((resolve, reject) => {
      if (native.isAndroid) {
        native.MIOTHost.getLocation((ok, res) => {
          if (ok)
            resolve({ ...res, AOIName: res.aoiname });
          else
            reject(res);
        });
      } else {
        // 只能用iPhone 真机测试
        native.MHMapLocation.reLocationWithReGeocode(true, (locationParams, regeocodeParmas, errorParams) => {
          if (errorParams && errorParams.code) {
            console.log('请求地理位置信息出错，错误信息：' + errorParams);
            reject('请求地理位置信息出错，错误信息：' + JSON.stringify(errorParams));
          } else {
            if (regeocodeParmas.formattedAddress) {
              regeocodeParmas.address = regeocodeParmas.formattedAddress;
              delete regeocodeParmas.formattedAddress;
            }
            resolve({ ...locationParams, ...regeocodeParmas });
          }
        })
      }
    });
    //@native end
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