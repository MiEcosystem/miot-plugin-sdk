/**
 * @export public
 * @doc_name 系统服务模块
 * @doc_index 1
 * @doc_directory service
 * @module miot/Service
 * @description 系统服务模块，提供了设备，红外，场景，安全，存储，miot-spec协议，账号等子服务模块
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
import Account from './Account';
import native, { Properties } from './native';
import apiRepo from './service/apiRepo';
import IrController from './service/ircontroller';
import MHRoom from './service/room';
import Scene from './service/scene';
import Security from './service/security';
import Smarthome from './service/smarthome';
import Spec from './service/spec';
import Storage from './service/storage';
import TJInfra from './service/tjinfra';
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
  get room() {
    return MHRoom;
  },
  /**
   * @method callSmartHomeAPI
   * @since 10024
   * @description 通用的请求米家后台接口的方法，与米家服务器交互。
   * 不同设备开放的接口请参照与米家后台对接时提供的文档或说明，以后台给出的信息为准。
   * 米家客户端只封装透传网络请求，无法对接口调用结果解释，有问题请直接联系项目对接后台人员或 PM。
   * 
   * 想使用某个接口之前，先检查 SDK 是否已经收录，可在 `miot-sdk/service/apiRepo.js` 文件中查阅。
   * 如果 SDK 暂时没有收录，可通过 issue 提出申请，提供接口的相关信息。
   * @param {string} api - 接口地址，比如'/location/set'
   * @param {object} params 传入参数，根据和米家后台商议的数据格式来传入，比如{ did: 'xxxx', pid: 'xxxx' }
   */
  callSmartHomeAPI(api, params) {
     return Promise.resolve(null);
  },
  /**
   * @method getServerName
   * @description 获取 米家 App 设置的地区和服务器信息
   * @return {Promise<{countryName:"",countryCode:"",serverCode:""}>}
   */
  getServerName() {
     return Promise.resolve(null);
  },
  /**
   * @method getTimeZoneOfServer
   * @description 获取服务器所在时区
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
   * android暂时不支持此方法
   * @param {string} sid 域名，类似"xxx.xiaomi.com"
   * @returns {Promise}
   */
  getServiceTokenWithSid(sid) {
     return Promise.resolve(null);
  },
  /**
   * 某设备向服务器申请did和token
   * Android暂不支持此方法
   * @param {*} model 设备的model
   * @param {*} mac 设备的mac地址
   * @returns {Promise} resolve({res,did,token})
   */
  applyForDeviceIDAndToken(model, mac) {
     return Promise.resolve(null);
  }
}