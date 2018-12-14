/**
 * @export
 * @module miot/host/locale
 * @description host 的本地信息, 包括语言，时区和地理位置
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
      return native.MIOTHost.timeZone;
    } else {
      return 'iOS 暂不支持';
    }
  },
  /**
   * 获取手机地理位置信息
   * @returns {Promise}
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
   */
  getLocation() {
     return Promise.resolve(null);
  },
}