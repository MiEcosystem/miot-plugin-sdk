/**
 * @export public
 * @doc_name 系统服务模块
 * @doc_index 1
 * @doc_directory service
 * @module miot/Service
 * @description Service 模块提供的能力主要包括米家服务端及米家云平台提供的服务能力
 * 能力主要包括：
 * 账号管理(Account.js)
 * 房间管理(room.js)
 * 智能场景(scene.js)
 * 云服务(smarthome.js)
 * Spec协议(spec.js)
 * 云存储(storage.js)
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
import Account from './service/Account';
import native, { isAndroid, Properties } from './native';
import apiRepo from './service/apiRepo';
import omitApi from './service/omitApi';
import cameraSubDomains from './service/cameraSubDomain';
import IrController from './service/ircontroller';
import MHRoom from './service/room';
import Scene from './service/scene';
import Security from './service/security';
import Smarthome from './service/smarthome';
import Spec from './service/spec';
import Storage from './service/storage';
import TJInfra from './service/tjinfra';
import MiotCamera from './service/miotcamera';
import Kookong from './service/kookong';
import XiaoAi from './service/xiaoai';
import { NativeModules, Platform } from 'react-native';
import JSONbig from 'json-bigint';
import Permission from './service/permission';
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
   * @member miotcamera
   * @description 摄像机相关 API
   * @see {@link module:miot/service/miotcamera}
   */
  get miotcamera() {
    return MiotCamera;
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
   * @deprecated 1.0下所有定时相关的接口已不再维护，请使用sceneV2。部分工具类依旧可用
   * @description 场景1.0 API 的调用
   * @see {@link module:miot/service/scene}
   */
  get scene() {
    if (__DEV__ && console.warn) {
      console.warn("scene deprecated 1.0下所有定时相关的接口已不再维护，请使用sceneV2。部分工具类依旧可用");
    }
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
  get kookong() {
    return Kookong;
  },
  get permission() {
    return Permission;
  },
  get xiaoai() {
    return XiaoAi;
  },
  /**
   * @method callSmartHomeAPI
   * @since 10024
   * @description 通用的请求米家后台接口的方法，与米家服务器交互。
   * 不同设备开放的接口请参照与米家后台对接时提供的文档或说明，以后台给出的信息为准。
   * 米家客户端只封装透传网络请求，无法对接口调用结果解释，有问题请直接联系项目对接后台人员或 PM。
   *
   * 想使用某个接口之前，先检查 SDK 是否已经收录，可在 `miot-sdk/service/apiRepo.js`和`miot-sdk/service/omitApi.js` 文件中查阅。
   * 注:这里的接口路径前缀为https://api.io.mi.com/app，所以请传入的接口中不要带入/app的前缀
   * 如果 SDK 暂时没有收录，可通过 issue 提出申请，提供接口的相关信息。
   * @param {string} api - 接口地址，比如'/location/set'
   * @param {object} params 传入参数，根据和米家后台商议的数据格式来传入，比如{ did: 'xxxx', pid: 'xxxx' }
   */
  callSmartHomeAPI(api, params) {
     return Promise.resolve(null);
  },
  /**
   * @method callSmartHomeAPIV2
   * @since 101110
   * @description 通用的请求米家后台接口的方法，与米家服务器交互。
   * 与 callSmartHomeAPI 的区别在成功返回：callSmartHomeAPI 只回传 res.result（裁剪掉顶层 code/message），
   * 本方法保留完整顶层结构（code/message/result 都在），业务侧自行读取 res.result。
   *
   * 成败判定下沉到原生，双端统一按业务 code == 0 判定：code == 0 回调 ok=true；
   * code != 0 或传输失败回调 ok=false。JS 侧不再重复判 code，仅依据 ok 分流为 resolve / reject：
   * - ok=true  → resolve(res)，res 为服务端完整响应（如 { code:0, message, result }），
   *              另含原生附加的 __api_info（请求耗时信息）。
   * - ok=false → reject(res)，res 为 { code, message, __api_info }，
   *              由 JS 胶水层从原生失败回调（code 码 / 消息 / api_info）拼接而成。
   *
   * 接入契约：外部服务须遵循 code == 0 表示成功、code != 0 表示失败，否则不可直接接入本接口。
   * 收录校验规则与 callSmartHomeAPI 一致（见 apiRepo.js / omitApi.js）。
   * @param {string} api - 接口地址，比如'/location/set'
   * @param {object} params 传入参数，比如{ did: 'xxxx', pid: 'xxxx' }
   * @param {function} [resProcessHandler] 可选响应加工钩子 (api, params, res) => res，resolve/reject 前对 res 做格式归一（不判 code）；默认不传即纯透传。
   */
  callSmartHomeAPIV2(api, params, resProcessHandler = null) {
     return Promise.resolve(null);
  },
  /**
   * @method callSmartHomeCameraAPI
   * @since 10035
   * @description 专用摄像头相关接口请求
   * api in `miot-sdk/service/apiRepo.js`
   * subDomain in `miot-sdk/service/cameraSubDomain.js`
   *
   * @param {string} api 接口地址
   * @param {string} subDomain subDomain
   * @param {bool}   post 是否POST方法
   * @param {object} params 传入参数
   */
  callSmartHomeCameraAPI(api, subDomain, post, params) {
     return Promise.resolve(null);
  },
  /**
   * @method callSmartHomeCameraAPI
   * @since 10044
   * @description 专用摄像头相关接口请求
   * api in `miot-sdk/service/apiRepo.js`
   * subDomain in `miot-sdk/service/cameraSubDomain.js`
   *
   * @param {string} api 接口地址
   * @param {string} subDomain subDomain
   * @param {bool}   post 是否POST方法
   * @param {string} params BigJSON.strinify(object);
   */
  callSmartHomeCameraAPIWithStringParam(api, subDomain, post, params) {
     return Promise.resolve(null);
  },
  /**
   * @method callSmartHomeCameraAPI
   * @since 10041
   * @description 小爱音箱相关接口请求,注意此请求传的是一个对象，里面部分对象有默认值，可不传
   * @param {string} host 请求的host，取值normal，hd,profile,lbs,skillstore,aifile,ai,aitrain,grayupgrade,homealbum。表示的host分别如下...
   * {
   *    "normal": "https://api2.mina.mi.com",
   *    "hd": "https://hd.mina.mi.com",
   *    "profile": "https://userprofile.mina.mi.com",
   *    "lbs": "https://lbs.mina.mi.com",
   *    "skillstore": "https://skillstore.mina.mi.com",
   *    "aifile": "https://file.ai.xiaomi.com",
   *    "ai": "https://api.ai.xiaomi.com",
   *    "aitrain": "https://i.ai.mi.com/mico",
   *    "grayupgrade": "https://api.miwifi.com/rs/grayupgrade/v2/micoiOS",
   *    "homealbum": "https://display.api.mina.mi.com",
   *    "pusher": "https://pusherapi-iotdcm.ai.xiaomi.com"
   * }
   * @param {string} path 请求的路径，比如"/device_profile/conversation"
   * @param {number} method 默认为0（表示get方法），1表示post方法，2表示put方法
   * @param {object} params 请求的参数，比如{limit:20}
   * @param {bool}   needDevice cookie中是否需要带上deviceId，默认为true
   * @param {object} cookie 支持带上自定义的cookie
   * @param {string} contentType put和post方法默认是以表单方式提交参数，即Content-Type为application/x-www-form-urlencoded，如果想以application/json的方式，请传入'json'
   * @return {Promise<object>} 透传接口，直接返回服务端返回的值
   */
  callXiaoaiNetworkAPI({ host = 'normal', path, method = 0, params = {}, needDevice = 1, cookie = {}, contentType = undefined } = {
    host: 'normal', method: 0, needDevice: 1, params: {}, cookie: {}, contentType: undefined
  }) {
     return Promise.resolve(null);
  },
  /**
   * @method getServerName
   * @description 获取 米家 App 设置的地区和服务器信息
   * Android上返回的countryCode为大写，iOS上为小写，建议使用时在拿到countryCode后调用一下toLowerCase方法，都统一成小写
   * @return {Promise<{countryName:"",countryCode:"",serverCode:""}>}
   */
  getServerName() {
     return Promise.resolve(null);
  },
  /**
   * @method getDevSerEnv
   * @description 获取米家APP切换的当前服务器环境
   * @returns (string) st、at、release、pv ，p1 其中st 对应米家iOS app的Dev
   */
  getDevSerEnv() {
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
   * Android从SDK-10039开始支持该接口
   * @param {string} sid 域名，类似"xxx.xiaomi.com"
   * @returns {Promise}
   */
  getServiceTokenWithSid(sid) {
     return Promise.resolve(null);
  },
  /**
   * since 10042
   * 撤销隐私授权,插件调用该接口后需要主动调用退出插件
   * @returns {Promise<Object>} 成功时返回：{code:0,data:true};
   *                            失败时返回：{code:-1,message:'invalid device'} ,或 {code:-2,message:'xxxxx'}
   * @example
   * Service.revokePrivacyLicense()
   *        .then(res=>{
   *          console.log(JSON.stringify(res));
   *          if( res.code ===0){
   *            console.log('success');
   *          }
   *        }).catch(err=>{
   *           console.log(JSON.stringify(err));
   *        });
   *
   */
  revokePrivacyLicense() {
     return Promise.resolve(null);
  },
  /**
   * since 10042
   * 删除设备,插件调用该接口后需要主动调用退出插件
   * @returns {Promise<Object>} 成功时返回：{code:0,data:true};
   *                            失败时返回：{code:-1,message:'invalid device'} ,或 {code:-2,message:'xxxxx'}
   * @example
   * Service.deleteDevice()
   *        .then(res=>{
   *          console.log(JSON.stringify(res));
   *          if( res.code ===0){
   *            console.log('success');
   *          }
   *        }).catch(err=>{
   *           console.log(JSON.stringify(err));
   *        });
   */
  deleteDevice() {
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
  },
  /**
   * @method callSpecificAPI
   * @since 10031
   * @description 调用当前手机设备的网关http服务
   * 只封装透传网络请求，无法对接口调用结果解释，有问题请直接联系项目对接后台人员或 PM。
   *
   * @param {string} url - url
   * @param {string} method - 如 'get', 'post'等 不区分大小写 暂时只支持 get 和 post
   * @param {object} params 传入参数，比如{ did: 'xxxx', pid: 'xxxx','allow_private_certificates':true/false };allow_private_certificates是10056新增加的参数(10055及以前的版本该参数不生效)，传true表明该请求使用小米路由器私有证书，默认为false;
   * @returns {Promise}
   * 成功时：返回网络请求的结果对应字符串， 相当于：response.body().string()
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  callSpecificAPI(url, method, params) {
     return Promise.resolve(null);
  },
  /**
   * @method callSmartChatAPI
   * @since 10107
   * @description C700 智能问答接口（SSE）(插件->云存)
   * @param params
   *   params.conversationId
   *   params.did
   *   params.content
   *   params.callbackEvent
   * @returns {Promise<unknown> | Promise.Promise}
   */
  callSmartChatAPI(params) {
    return new Promise((resolve, reject) => {
      native.MIOTService.callSmartChatAPI(params, (ok, res) => {
        if (ok) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  },
  /**
   * @namespace Service.SSE
   * @description 通用 SSE（Server-Sent Events）流式接口。
   *
   * 框架只负责"透传参数 + 透传返回值 + 把控流生命周期"，不解析任何业务内容；
   * 底层复用米家 RC4 加密流式网关（与 callSmartChatAPI 同一通道）。
   *
   * 事件订阅：事件名 = `${callbackEvent}:${conversationId}`，
   * 用 DeviceEventEmitter.addListener 监听，事件体固定为 { code, data, conversationId }：
   *   - code 0  : chunk，data 为原始 JSON 字符串（业务自行 JSON.parse）
   *   - code 1  : done（连接停止；业务"回答是否结束"由业务自行根据 event 判断）
   *   - code -1 : 网络/传输层失败
   *   - code -2 : 服务器业务错误
   *   - code -3 : 已取消
   * 注意：参数错误不通过事件下发，而是 open() 返回的 Promise 直接 reject 错误描述。
   *
   * @example
   * import { Service } from 'miot';
   * import { DeviceEventEmitter } from 'react-native';
   * const conversationId = 'xxx-uuid';
   * await Service.SSE.open({
   *   path: '/llm/api/mihome/assistant',
   *   conversationId,
   *   callbackEvent: 'myFeatureSSE',
   *   body: { query: '羊毛衫油渍怎么洗' },
   * });
   * const sub = DeviceEventEmitter.addListener(`myFeatureSSE:${conversationId}`, evt => {
   *   if (evt.code === 0) { const e = JSON.parse(evt.data); ... }
   *   else if (evt.code === 1) { sub.remove(); }      // 连接停止
   *   else if (evt.code < 0)  { sub.remove(); }       // 出错/取消
   * });
   * // 组件卸载时务必主动取消，回收连接
   * useEffect(() => () => Service.SSE.cancel(conversationId), []);
   */
  SSE: {
    /**
     * @method Service.SSE.open
     * @description 打开一条 SSE 流。
     * @param {object} opts
     *   opts.path           {string}  必填，请求路径，例 '/llm/api/mihome/assistant'
     *   opts.conversationId {string}  必填，会话标识；作 registry key + 事件名后缀 + 取消依据
     *   opts.callbackEvent  {string}  必填，事件名前缀；实际事件名 = `${callbackEvent}:${conversationId}`
     *   opts.body           {object}  可选，业务参数，native 透传（整体 stringify 后作为流式请求体）
     *   opts.host           {string}  可选，默认米家流式网关
     *   opts.header         {object}  可选，仅追踪头（如 Request-Id）；鉴权/cookie/Accept 由 SDK 自动注入
     * @returns {Promise<void>} 成功 resolve；参数错误等同步失败 reject 错误描述
     */
    open(opts) {
      return new Promise((resolve, reject) => {
        native.MIOTService.openSSE(opts, (ok, res) => {
          if (ok) {
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
    },
    /**
     * @method Service.SSE.cancel
     * @description 取消指定会话的 SSE 流（会下发 code=-3 事件后回收）。
     * @param {string} conversationId 目标会话标识
     * @returns {Promise<void>}
     */
    cancel(conversationId) {
      return new Promise((resolve) => {
        native.MIOTService.cancelSSE(conversationId, () => resolve());
      });
    }
  },
  /**
   * 获取设备多语言资源文件, 由于是发起网络请求，数据的正确性可以通过抓包来查看；
   * 只要网络请求成功会代码会执行到then（与具体是否获取到设备属性值无关）， 网络请求失败则会执行到catch
   * @param did 设备的did
   * @return {Promise<JSON>} 设备的Spec属性详情
   * 方法执行成功时：直接返回设备具体内容，json结构字符串
   * 失败时：{code:xxx, message:xxx}
   */
  fetchMultilingualResources(did) {
     return Promise.resolve(null);
  }
};