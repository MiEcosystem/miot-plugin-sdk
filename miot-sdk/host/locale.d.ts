export default LocaleInstance;
declare const LocaleInstance: ILocale;
/**
 * 本地化
 * @interface
 *
 */
declare class ILocale {
  /**
     * 获取米家 APP 语言
     * @type {string}
     */
  get language(): string;
  /**
     * 获取系统语言
     * @type {string}
     */
  get systemLanguage(): string;
  /**
     * 获取时区
     * @type {string}
     */
  get timeZone(): string;
  /**
     * 是否是24小时制计时格式
     * @type {boolean}
     */
  get is24HourTime(): boolean;
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
  getLocation(): Promise<object>;
  /**
     * 获取手机的时区信息
     * @since 10024
     * @returns {Promise}
     * @example
     * Host.locale.getSystemTimeZone().then...
     * result = {"timeZone":"Asia/Shanghai"}
     */
  getSystemTimeZone(): Promise<any>;
  /**
     * 获取手机系统设置时区差，仅Android设备需要该方法，iOS设备建议使用new Date().getTimezoneOffset()
     *
     * @since 10062
     * @returns {Promise} 成功进入then，失败进入catch
     * code : 0代表接口调用成功 res {"code": 0, "data": {"timeZoneOffset": 28800000}}
     * iOS调用该接口返回{ "code": -1, "message": 'iOS not support' }
     @example
     *
     * ...
     * Host.locale.getSystemTimeZoneOffset().then((res) => {
     *   let offset = res['data']['timeZoneOffset'];
     *   console.log("offset", offset);
     * }).catch((error) => {
     *    console.log("error", error);
     * });
     */
  getSystemTimeZoneOffset(): Promise<any>;
  /**
     * 通过经纬度坐标获取地理位置信息，返回详细地址以及POIS信息
     *
     * @since 10062
     * @returns {Promise} 成功进入then，失败进入catch
     * code : 0代表接口调用成功 res {"code": 0, "data": {"address": "湖北省武汉市洪山区九峰街道东湖国家自主创新示范区公共服务中心3号楼中国光谷", "pois": "东湖国家自主创新示范区公共服务中心3号楼"}}
     * 失败返回{ "code": -1, "message": 'get address failed' }
     * 参数 latitude ，longitude分别为经纬度坐标值
     @example
     *
     * ...
     * let params = {
     *    latitude: 30.491,
     *    longitude: 114.50,
     *    coordType : 6,
     * }
     * 参数说明
     *    @param latitude纬度坐标
     *    @param longitude 经度坐标
     *    @param coordType 坐标系类型，不传默认是高德坐标系
     *           坐标系对应关系:
     *           0-BAIDU
     *           1-MAPBAR
     *           2-MAPABC
     *           3-SOSOMAP
     *           4-ALIYUN
     *           5-GOOGLE
     *           6-GPS
     * Host.locale.getAddressByCoordinate(params).then((res) => {
     *   let address = res['data']['address'];
     *   let pois = res['data']['pois'];
     *   console.log("address: ", address , “ , pois:" , pois );
     * }).catch((error) => {
     *    console.log("error", error);
     * });
     */
  getAddressByCoordinate(params: any): Promise<any>;
}