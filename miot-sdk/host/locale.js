/**
 * @export
 * @module miot/host/locale
 * @description host 的本地信息, 包括时间, 时区, 语言, 地区 等等
 *
 */
export default {
    /**
     * 获取本地语言
     * @type {string}
     */
    get language(){
    },
    /**
     * 获取时区 比如 8 -8
     * @type {string}
     */
    get timeZone(){
    },
    /**
     * 获取本地当前时间
     * @returns {Promise<long>}
     */
     get currentTimeMillis(){
        return Promise.resolve(null);
     },
     /**
      * 获取当前国家
      * @return {Promise}
      */
     getCurrentCountry(){
        return Promise.resolve(null);
     },
     /**
      * 获取当前地址
      * @returns {Promise}
      */
     getPlaceMark(){
       return Promise.resolve(null);
     },
     /**
      * 获取当前地理经纬度
      * @returns {Promise}
      */
     getGPS(){
        return Promise.resolve(null);
     },
 }