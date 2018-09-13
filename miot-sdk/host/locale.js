import native from "../native";
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
      return native.MIOTHost.language;
    },
    /**
     * 获取时区 比如 8 -8
     */
    get timeZone(){
      return native.MIOTHost.timeZone;
    },
    /**
     * 获取本地当前时间
     */
     get currentTimeMillis(){
      return new Promise((resolve, reject) => {
        native.MIOTHost.getCurrentTimeMillis(callback => {
          resolve(callback);
        });
      });
     },
     /**
      * 获取当前国家
      */
     getCurrentCountry(){
       return new Promise((resolve, reject) => {
         native.MIOTHost.getLocation((ok, res) => {
           if (ok)
             resolve(res.country);
           else
             reject(res);
         });
       });
     },
     /**
      * 获取当前地址
      */
     getPlaceMark(){
       return new Promise((resolve, reject) => {
         native.MIOTHost.getLocation((ok, res) => {
           if (ok)
             resolve(res.address);
           else
             reject(res);
         });
       });
     },
     /**
      * 获取当前地理经纬度
      */
     getGPS(){
       return new Promise((resolve, reject) => {
         native.MIOTHost.getLocation((ok, res) => {
           if (ok)
             resolve(res);
           else
             reject(res);
         });
       });
     },
 }