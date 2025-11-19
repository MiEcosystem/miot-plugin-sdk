export { CurrentAccount };
declare namespace _default {
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
    function callSmartHomeAPI(api: string, params: object): Promise<any>;
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
    function callSmartHomeAPI(api: string, params: object): Promise<any>;
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
    function callSmartHomeCameraAPI(api: string, subDomain: string, post: bool, params: object): Promise<any>;
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
    function callSmartHomeCameraAPI(api: string, subDomain: string, post: bool, params: object): Promise<any>;
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
    function callSmartHomeCameraAPIWithStringParam(api: string, subDomain: string, post: bool, params: string): Promise<any>;
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
    function callSmartHomeCameraAPIWithStringParam(api: string, subDomain: string, post: bool, params: string): Promise<any>;
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
    function callXiaoaiNetworkAPI({ host, path, method, params, needDevice, cookie, contentType }?: string): Promise<object>;
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
    function callXiaoaiNetworkAPI({ host, path, method, params, needDevice, cookie, contentType }?: string): Promise<object>;
    /**
     * @method getServerName
     * @description 获取 米家 App 设置的地区和服务器信息
     * Android上返回的countryCode为大写，iOS上为小写，建议使用时在拿到countryCode后调用一下toLowerCase方法，都统一成小写
     * @return {Promise<{countryName:"",countryCode:"",serverCode:""}>}
     */
    function getServerName(): Promise<{
        countryName: "";
        countryCode: "";
        serverCode: "";
    }>;
    /**
     * @method getServerName
     * @description 获取 米家 App 设置的地区和服务器信息
     * Android上返回的countryCode为大写，iOS上为小写，建议使用时在拿到countryCode后调用一下toLowerCase方法，都统一成小写
     * @return {Promise<{countryName:"",countryCode:"",serverCode:""}>}
     */
    function getServerName(): Promise<{
        countryName: "";
        countryCode: "";
        serverCode: "";
    }>;
    /**
     * @method getDevSerEnv
     * @description 获取米家APP切换的当前服务器环境
     * @returns (string) st、at、release、pv ，p1 其中st 对应米家iOS app的Dev
     */
    function getDevSerEnv(): any;
    /**
     * @method getDevSerEnv
     * @description 获取米家APP切换的当前服务器环境
     * @returns (string) st、at、release、pv ，p1 其中st 对应米家iOS app的Dev
     */
    function getDevSerEnv(): any;
    /**
     * @method getTimeZoneOfServer
     * @description 获取服务器所在时区
     */
    function getTimeZoneOfServer(): Promise<any>;
    /**
     * @method getTimeZoneOfServer
     * @description 获取服务器所在时区
     */
    function getTimeZoneOfServer(): Promise<any>;
    /**
     * @method getUTCFromServer
     * @description 从米家服务器获取当前UTC时间戳（会发送网络请求）
     * @returns {Promise<long>}
     */
    function getUTCFromServer(): Promise<long>;
    /**
     * @method getUTCFromServer
     * @description 从米家服务器获取当前UTC时间戳（会发送网络请求）
     * @returns {Promise<long>}
     */
    function getUTCFromServer(): Promise<long>;
    /**
     * 传入域名返回 serverToken 等信息，目前只支持小爱音箱的域名
     * Android从SDK-10039开始支持该接口
     * @param {string} sid 域名，类似"xxx.xiaomi.com"
     * @returns {Promise}
     */
    function getServiceTokenWithSid(sid: string): Promise<any>;
    /**
     * 传入域名返回 serverToken 等信息，目前只支持小爱音箱的域名
     * Android从SDK-10039开始支持该接口
     * @param {string} sid 域名，类似"xxx.xiaomi.com"
     * @returns {Promise}
     */
    function getServiceTokenWithSid(sid: string): Promise<any>;
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
    function revokePrivacyLicense(): Promise<Object>;
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
    function revokePrivacyLicense(): Promise<Object>;
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
    function deleteDevice(): Promise<Object>;
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
    function deleteDevice(): Promise<Object>;
    /**
     * 某设备向服务器申请did和token
     * Android暂不支持此方法
     * @param {*} model 设备的model
     * @param {*} mac 设备的mac地址
     * @returns {Promise} resolve({res,did,token})
     */
    function applyForDeviceIDAndToken(model: any, mac: any): Promise<any>;
    /**
     * 某设备向服务器申请did和token
     * Android暂不支持此方法
     * @param {*} model 设备的model
     * @param {*} mac 设备的mac地址
     * @returns {Promise} resolve({res,did,token})
     */
    function applyForDeviceIDAndToken(model: any, mac: any): Promise<any>;
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
    function callSpecificAPI(url: string, method: string, params: object): Promise<any>;
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
    function callSpecificAPI(url: string, method: string, params: object): Promise<any>;
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
    function callSmartChatAPI(params: any): any;
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
    function callSmartChatAPI(params: any): any;
}
export default _default;
import { CurrentAccount } from "./service/Account";