/**
 * @export
 * @module miot/Service
 * @description 系统服务
 * @example
 *
 * import {Service} from 'miot'
 *
 * Service.getServerName().then(res=>{...})
 * Service.getUTCTimeFromServer().then(...)
 *
 * Service.smarthome.reportGPSInfo(...).then(...)
 *
 * Service.account.ID
 * Serivce.account.nickName
 * Service.account.avatar
 * Service.account.load().then(account=>{})
 *
 * Service.scene.loadTimerScenes(...).then(scenes=>{})
 * Service.security.loadSecureKeys(...).then(keys=>{
 * ...
 * })
 *
 * Service.storage.getUserConfigs(key).then()
 *
 *
 */
import Smarthome from './service/smarthome'
import Scene from './service/scene'
import Security from './service/security'
import Storage from './service/storage'
// import Ximalaya from './service/ximalaya';
import Account from './Account'
import Host from './Host';
 const CurrentAccount = null;
export default {
  /**
   * @member smarthome
   * @description 设备相关 API
   * @see {@link module:miot/service/smarthome}
   */
  get smarthome() {
    return Smarthome;
  },
  /**
   * @member account
   * @type {IAccount}
   * @description 当前的用户信息
   * @see {@link module:miot/Account}
   */
  get account() {
    return CurrentAccount;
  },
  /**
   * @member scene
   * @description 场景 API 的调用
   * @see {@link module:miot/service/scene}
   */
  get scene() {
    return Scene;
  },
  /**
   * @member security
   * @description 安全相关设置操作
   * @see {@link module:miot/service/security}
   */
  get security() {
    return Security;
  },
  /**
   * @member storage
   * @description 用户存储操作, userProfile
   * @see {@link module:miot/service/storage}
   */
  get storage() {
    return Storage;
  },
  /**
   * @method
   * @description 米家 App 设置的地区和服务器信息
   * @return {Promise<{countryName:"",countryCode:"",serverCode:""}>}
   */
  getServerName() {
    return new Promise((resolve, reject) => {
      if (native.isAndroid) {
        native.MIOTService.getServerName(res => {
          // Android：美国地区，美国服务器
          if (res.countryCode === "us_true") {
            res.countryCode = 'us'
          }
          resolve(res);
        });
      }
      else {
        native.MIOTHost.getCurrentCountryInfoCallback((isSuccess, res) => {
          if (isSuccess) {
            // iOS：美国地区，亚洲服务器
            if (res.countryCode === "us_sg") {
              res.countryCode = 'us'
            }
            resolve(res);
          } else {
            reject("地区和服务器信息未正确获取");
          }
        })
      }
    });
  },
  /**
   * @method getTimeZoneOfServer
   * @description 服务器所在时区
   */
  getTimeZoneOfServer() {
     return Promise.resolve(null);
  },
  /**
   * @method getUTCFromServer
   * @description 从米家服务器获取当前UTC时间戳（会发送网络请求）
   * @returns {Promise<long>}
   */
  getUTCFromServer() {
     return Promise.resolve(0);
  },
}