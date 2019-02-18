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
import IrController from './service/ircontroller'
import Scene from './service/scene'
import Security from './service/security'
import Storage from './service/storage'
import Spec from './service/spec'
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
   * @member ircontroller
   * @description 红外 相关 API
   * @see {@link module:miot/service/ircontroller}
   */
  get ircontroller() {
    return IrController;
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
   * @member spec
   * @description spec 的请求
   * @see {@link module:miot/service/spec}
   */
  get spec() {
    return Spec;
  },
  /**
   * @method
   * @description 米家 App 设置的地区和服务器信息
   * @return {Promise<{countryName:"",countryCode:"",serverCode:""}>}
   */
  getServerName() {
     return Promise.resolve(null);
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
  /**
   * 传入域名返回 serverToken 等信息，目前只支持小爱音箱的域名
   * Android not support yet
   * @param {string} sid like "xxx.xiaomi.com"
   * @returns {Promise}
   */
  getServiceTokenWithSid(sid) {
     return Promise.resolve(null);
  },
  /**
   * 某设备向服务器申请did和token
   * Android not support yet
   * @param {*} model 设备的model
   * @param {*} mac 设备的mac地址
   * @returns {Promise} resolve({res,did,token})
   */
  applyForDeviceIDAndToken(model,mac) {
     return Promise.resolve(null);
  }
}