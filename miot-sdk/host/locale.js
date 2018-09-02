/**
 * @export
 * @module miot/host/locale
 * @description host 的本地信息, 包括时间, 时区, 语言, 地区 等等
 * 
 */
export default {
    /**
     * 获取本地语言
     */
    get language(){
         return  ""
    },
    /**
     * 获取本地当前时间
     */
     get currentTimeMillis(){
     },
     /**
      * 获取当前国家
      */
     getCurrentCountry(){
         return Promise.resolve(null);
     },
     /**
      * 获取当前地址
      */
     getPlaceMark(){
         return Promise.resolve(null);
     },
     /**
      * 获取当前地理经纬度
      */
     getGPS(){
         return Promise.resolve(null);
     },
 }