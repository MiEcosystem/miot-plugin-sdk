/**
 * 设备网络访问控制类
 * @interface
 */
export default class IDeviceWifi {
  set deviceID(arg: string);
  /**
       * 获取设备ID，same as Device.deviceID
       * @member
       * @deprecated since 10032,请使用Device.deviceID;
       * @type {string}
       * @example
       * import {Device} from 'miot'
       * ...
       * let did = Device.getDeviceWifi().deviceID
       */
  get deviceID(): string;
  /**
      * @typedef {Object} NetworkInfo
      * @property {string} bssid  wifi 的mac地址
      * @property {number} rssi   wifi的原始信号强度，android和iOS为保持一致，不要使用。
      * @property {string} ssid  wifi 的名称
      * @property {number} wifiStrength  wifi的信号强度，adnroid和iOS保持一致后的，推荐使用。正常wifi/combo设备返回0-100之间的值，蓝牙设备返回0
      */
  /**
     * 实时获取设备的网络信息包括网络强度，此方法一般情况下不走reject
     * @param {String} did 设备id
     * @method
     * @returns {Promise<NetworkInfo>}
     *      resolve：NetworkInfo
     *      reject：不会走reject
     */
  readDeviceNetWorkInfo(did: string): Promise<{
        /**
         * wifi 的mac地址
         */
        bssid: string;
        /**
         * wifi的原始信号强度，android和iOS为保持一致，不要使用。
         */
        rssi: number;
        /**
         * wifi 的名称
         */
        ssid: string;
        /**
         * wifi的信号强度，adnroid和iOS保持一致后的，推荐使用。正常wifi/combo设备返回0-100之间的值，蓝牙设备返回0
         */
        wifiStrength: number;
    }>;
    /**
     * 加载属性数据，
     * 内部调用get_prop 方法,Android会依据当前环境选择从本地局域网或者云端获取, iOS因获取不到wifi信息，会默认走云端获取，并将返回数据写成{key:value}格式
     * @method
     * @param {*} propNames 属性名称，若propNames长度小于一个，则走reject。普通设备传：prop.propertyName, miot-spec设备传prop.siid.piid
     * @returns {Promise<Map>} Map<name, value>
     * @example
     * Device.getDeviceWifi().loadProperties("prop.light", "prop.2.1").then(map=>{
     *  const a = map.get("a")
     *  const b = map.get("b")
     * })
     *
     */
  loadProperties(...propNames: any): Promise<Map<any, any>>;
  /**
     * 强制从云端加载属性数据
     * 内部调用get_prop 方法, 并将返回数据写成{key:value}格式
     * @method
     * @param {*} propNames 属性名称，若propNames长度小于一个，则走reject
     * @returns {Promise<Map>} Map<name, value> 同上
     *
     */
  loadPropertiesFromCloud(...propNames: any): Promise<Map<any, any>>;
  /**
     * 调用设备方法
     * Android里面，若与设备通信处于同一个 wifi 下会使用局域网直接传输数据，如果不在同一个 wifi 下由云端转发请求。iOS里面，因获取不到wifi信息，一般默认走云端
     * @param {string} method  方法名
     * @param {json} args  参数，传输的数据大小由固件决定，一般最大为1K
     * @param {json} extraPayload  额外参数，根据设备需求设定。在payload数据中设置额外参数，暂时只提供给绿米网关使用，如有需求，请联系米家。
     * @return {Promise<json>} {code:0,result:{},id:""} 透传
     * @example
     * Device.getDeviceWifi().callMethod('getProps', [prop1,prop2])
     *  .then(res => console.log('success:', res))
     *  .catch(err => console.error('failed:', err))
     * //对应payload参考：
     * //{'method': 'getProps', 'params':[prop1,prop2]}
     *
     * Device.getDeviceWifi().callMethod('getProps', [prop1,prop2], {sid:Device.deviceID, 'key1':'xxxx'})
     *  .then(res => console.log('success:', res))
     *  .catch(err => console.error('failed:', err))
     * //对应payload参考：
     * //{'method': 'getProps', 'params':[prop1,prop2], 'sid':'xxxxx', 'key1': 'xxxx'}
     *
     */
  callMethod(method: string, args: json, extraPayload?: json): Promise<json>;
  /**
     * 强制通过云端调用设备方法
     * Android同callMethod函数不在同一个wifi下的情况，iOS一般情况下等于callMethod方法
     * @param {string} method  方法名
     * @param {json} args 参数
     * @param {json} extraPayload  (API Level 10027新增)额外参数，根据设备需求设定。在payload数据中设置额外参数
     * @return {Promise<json>} 请求成功返回 {code:0,result:{} } 透传
     *
     */
  callMethodFromCloud(method: string, args: json, extraPayload?: json): Promise<json>;
  /**
     * 本地调用设备方法，会直接根据设备ip和端口，发送udp请求，直接和设备通讯。**注意：如果不在同一个路由器，rpc会失败，而不会自动的走云端的方法，使用此方法前，可通过下面的localPing去判断是否是同一个局域网**
     * @param {string} method  方法名
     * @param {json} args 参数
     * @param {json} extraPayload  (API Level 10027新增)额外参数，根据设备需求设定。在payload数据中设置额外参数
     * @return {Promise<json>} 请求成功返回 {code:0,result:{} } 透传
     *
     */
  callMethodFromLocal(method: string, args: json, extraPayload?: json): Promise<json>;
  /**
     *
     * @param {json} payload  数据格式 @{@"id" : @(id), @"method" : @"method", @"params" : originData, @"other" : other}
     * @param {number} length  每一帧的长度
     * @param {string} type   类型，例如“scene”
     * @retun {Promise<json>} 请求成功返回 {code:0,result:{} }
     * 请求失败返回 {code:xxx, message:xxx}
     */
  sendKeyFramePayLoad(payload: json, length: number, type: string): Promise<any>;
  /**
     * ping 操作 检查设备本地局域网通信是否可用，如果某个功能需要强制走本地,又不确定它是否在同一个局域网下，可以先调用此方法检查。
     * @returns {Promise<boolean>}
     *
     * @example
     * Device.getDeviceWifi().localPing()
     *  .then(res => console.log('success:', res))
     *  .catch(err => console.log('failed:', err))
     */
  localPing(): Promise<boolean>;
  /**
     * 订阅设备消息。指插件端监听设备属性变化或者事件执行的消息。比如：洗衣机洗完衣服了，需要手机发出“嘀嘀”的声音通知用户，我们就可以监听衣服洗完了这个事件。
     * 订阅设备消息的前提是：设备属性变化/设备事件 正确上报。你需要在：https://iot.mi.com/productDetail_new.html#/pushMessage?model=yourmodel 里面正确的配置消息推送，然后固件端实现消息推送协议。最后在客户端使用此方法订阅。
     * 具体使用办法，错误排查和注意点可参考iot平台的设备订阅文档：https://iot.mi.com/new/doc/extension-development/basic-functions/device-subscribe/Wi-Fi
     * @method
     * @param {...string} propertyOrEventNames -在开发平台上声明的 prop 与 event 名，注意消息格式为：prop.xxxxx 或者 event.xxxxx ，表示订阅的是设备的属性变化，还是设备的事件响应.如果是miot-spec设备。则为prop.siid.piid，event.siid.eiid
     * @example
     * import {Device, DeviceEvent} from 'miot'
     * ...
     * //监听 属性变化和事件响应
     * const listener = DeviceEvent.deviceReceivedMessages.addListener(
     * (device, messages)=>{
     *  if(messages.has('prop.color')){
     *    console.log('获取到属性变化：',messages.get('prop.color'));
     *     ...
     *  } else if (messages.has('event.powerOn')){
     *    console.log('获取到事件响应：',messages.get('event.powerOn'));
     *    ...
     *  }
     *  ...
     * })
     * ...
     *   //添加订阅：属性变更和事件响应
     * let msgSubscription = null;
     * Device.getDeviceWifi().subscribeMessages('prop.color','event.powerOn')
     * .then(subcription => {
     *    //call this when you need to unsubscribe the message
     *   msgSubscription = subcription;
     * })
     * .catch(() => console.log('subscribe failed'))
     * ...
     *
     * ...
     * //unsubscribe the props
     * msgSubscription&&msgSubscription.remove();
     * listener&&listener.remove();
     *
     * @returns {Promise<EventSubscription>}
     *      resolve：EventSubscription 订阅监听
     *      reject：订阅ID或者空
     */
  subscribeMessages(...propertyOrEventNames: string[]): Promise<EventSubscription>;
  /**
     * 监听属性的变化，subscribeMessages的一种替代方案：
     *  定时轮询指定的属性，轮询后属性与上一次有变化发送通知，没变化不通知;接收通知的方式与subscribeMessages相同.
     * @since SDK-10038
     * @ignore 内部实验接口,暂不对外公开
     * @param  {...string} propertyNames 需要监听的属性列表(支持prop.2.1和prop.power)
     * @returns Promise<Object>  执行成功时返回当前正在监听的prop个数，如{total_listen_props:5}，失败时返回出错信息
     * @example
     * //监听 属性变化和事件响应
     * const listener = DeviceEvent.deviceReceivedMessages.addListener(
     * (device, messages)=>{
     *  if(messages.has('prop.color')){
     *    console.log('获取到属性变化：',messages.get('prop.color'));
     *     ...
     *  } else if (messages.has('prop.2.1')){
     *    console.log('获取到属性变化：',messages.get('prop.2.1'));
     *    ...
     *  }
     *  ...
     * })
     * ...
     *   //添加订阅：属性变更
     * let msgSubscription = null;
     * Device.getDeviceWifi().listenMessages('prop.color','prop.2.1')
     * .then(res => {
     *    console.log('listen prop success:',res);
     * })
     * .catch(() => console.log('listen prop failed'))
     * ...
     *
     * ...
     * //unlisten the props
     * Device.getDeviceWifi().unlistenMessages('prop.color','prop.2.1');
     * listener&&listener.remove();
     */
  listenMessages(...propertyNames: string[]): Promise<any>;
  /**
     * 取消轮询,与listenMessages配合使用
     * @since SDK-10038
     * @ignore 内部实验接口,暂不对外公开
     * @param  {...string} propertyNames 需要取消轮询的属性
     * @example
     * //可分多次取消
     * Device.getDeviceWifi().unlistenMessages('prop.2.1');
     * Device.getDeviceWifi().unlistenMessages('prop.power');
     * //或者一次取消多个
     * Device.getDeviceWifi().unlistenMessages('prop.2.1','prop.power');
     * //取消所有订阅
     * Device.getDeviceWifi().unlistenMessages();
     */
  unlistenMessages(...propertyNames: string[]): Promise<{
        total_unlistened_props: number;
        message: string;
    }>;
    /**
     * 获取当前设备固件版本信息。蓝牙设备请不要用此方法，需要用BTDevice.getVersion()方法。
     * 万一为空,你可以使用Service.smarthome.checkDeviceVersion()来获取版本（curVersion字段）。
     * @return {Promise<any>}
     *      resolve：version
     *      reject：null
     */
  getVersion(): Promise<any>;
  /**
     * 设备固件版本信息
     * @typedef DeviceVersion
     * @property {boolean} isUpdating - 是否ota升级中 为true时，otaState才有效
     * @property {boolean} isLatest - 是否是最新版本
     * @property {boolean} isForce - 是否强制升级
     * @property {boolean} hasNewFirmware - 是否有新固件
     * @property {string} curVersion - 当前固件版本
     * @property {string} newVersion - 新固件版本
     * @property {string} description - 描述
     *
     */
  /**
     * 升级设备固件.可以和Service.smarthome.getAvailableFirmwareForDids搭配使用，先检查是否有可用版本，如果有，展示信息给用户，让用户确认，或者直接升级。
     * /home/devupgrade
     * @method
     * @example
     * Device.getDeviceWifi().startUpgradingFirmware()
     *  .then(res => console.log('success:', res))
     *  .catch(err => console.log('failed:', err))
     * @return {Promise<DeviceVersion>} {}
     *      resolve：DeviceVersion
     *      reject：{code: xxx, message: xxx} 其他code:网络错误/服务端错误
     */
  startUpgradingFirmware(): Promise<{
        /**
         * - 是否ota升级中 为true时，otaState才有效
         */
        isUpdating: boolean;
        /**
         * - 是否是最新版本
         */
        isLatest: boolean;
        /**
         * - 是否强制升级
         */
        isForce: boolean;
        /**
         * - 是否有新固件
         */
        hasNewFirmware: boolean;
        /**
         * - 当前固件版本
         */
        curVersion: string;
        /**
         * - 新固件版本
         */
        newVersion: string;
        /**
         * - 描述
         */
        description: string;
    }>;
    /**
     * 为设备固件升级失败添加自定义的errorCode与错误提示信息的索引，以便给用户以友好易懂的错误提示，暂时仅供石头扫地机使用。注意 分享过来的设备是无法进行固件升级的，所以此时此方法也无效。
     * **Android暂未适配，正常情况下请不要使用这种双端不统一的方法**
     * @deprecated since 10032
     * @param {json} message 以errorCode为key，以错误提示信息为value的字典。key和value的数据类型都须是string。
     * @return boolean 设置是否成功
     * @example
     * let ret = Device.getDeviceWifi().setFirmwareUpdateErrDic({"3":'无法连接'})
     */
  setFirmwareUpdateErrDic(message: json): boolean;
  /**
     * 设置设备控制页不检查固件升级，避免出现弹框，已废弃。
     * **Android暂未适配**
     * @deprecated since 10032 请使用Package.disableAutoCheckUpgrade = true 来屏蔽默认弹窗
     * @param {boolean} notCheck 是否 不检查更新 true-不自动检查 false-自动检查
     * @example
     * Device.getDeviceWifi().setFirmwareNotCheckUpdate(true|false)
     *  .then(res => console.log('success:', res))
     *  .catch(err => console.log('failed:', err))
     *
     * @return {Promise}
     *      resolve: "set success"
     *      reject: "not a MHDeviceViewControllerBase"
     */
  setFirmwareNotCheckUpdate(notCheck: boolean): Promise<any>;
  /**
     * 检查wifi设备固件升级弹窗。该方法会触发升级弹窗alert提示。
     * 建议使用场景为需要屏蔽默认的插件启动检测的弹窗，自行寻找合适的时机触发该检测机制。
     * 支持wifi设备，combo设备，zigbee设备
     * 不支持单模蓝牙、组设备、虚拟设备、离线设备、分享设备。蓝牙检查升级请使用Service.smarthome.getLatestVersionV2()。
     * @example
     *
     * //首先屏蔽默认弹窗
     * Package.disableAutoCheckUpgrade = true;
     * //....
     * //在合适的时间触发
     * Device.checkFirmwareUpdateAndAlert().then(res => { }).catch(err => { })
     * @returns {Promise}
     *      resolve：res={needUpgradge,force,upgrading，latestVersion} ,其中：needUpgrade:是否需要升级，force：是否需要强制升级，updrading：是否正在升级，latestVersion：最新版本版本号
     *      reject：{code: xxx, message: xxx} 401:设备所有者才可升级  其他code:网络错误/服务端错误
     */
  checkFirmwareUpdateAndAlert(): Promise<any>;
  /**
    * 检查当前设备是否支持HomeKit，Android系统不支持HomeKit设备。需要在plato平台配置homekit_config，包含在内的设备，isHomekit才可能返回true
    * @since 10021
    * @returns {Promise<boolean>} 是否支持  res = true or false
    */
  checkIsHomeKitDevice(): Promise<boolean>;
  /**
     * 检查当前设备是否已经接入了HomeKit，Android不支持。如果没有接入，可以调用下面的bindToHomeKit方法，将设备接入
     * @since 10021
     * @returns {Promise<boolean>} 是否接入 res = true or false
     */
  checkHomeKitConnected(): Promise<boolean>;
  /**
     * 将当前设备绑定到HomeKit中
     * 绑定失败部分code：-1:system version 10.0 support hard auth bind or system version 11.3 support soft auth bind
     * @since 10021
     * @returns {Promise} 成功进入then，失败进入catch resolve ：res = true；reject：res={code:xxx,message:xxx}
     *
     */
  bindToHomeKit(): Promise<any>;
  /**
     * @typedef {Object} DeviceExtra
     * @property {string} name 设备名称
     * @property {string} did 设备did
     * @property {string} mac 设备mac地址
     * @property {bool} share_flag 设备是否是分享设备
     *
     */
  /**
     * @typedef {Object} DeviceProductInfo
     * @property {string} model 设备model
     * @property {string} product_name 设备的产品名称
     * @property {string} product_icon 设备图标
     * @property {string} product_id 设备类别id
     * @property {Object<DeviceExtra[]>} devices
     *
     */
  /**
     * 获取当前设备列表中的指定model的设备列表。需要在common_extra_config增加配置，暂时用于秒秒测的互联互通功能。
     * 用途：秒秒测有一个设备互联的功能，比如牙刷可以连电子表，然后电子表上展示倒计时。
     * @since 10003
     * @param {string} model 设备model
     * @returns {Promise<DeviceProductInfo[]>}
     *      resolve：设备列表数组
     *      reject：{message:xxx} 找不到授权的model  无法找到任何设备
     */
  requestAuthorizedDeviceListData(model: string): Promise<{
        /**
         * 设备model
         */
        model: string;
        /**
         * 设备的产品名称
         */
        product_name: string;
        /**
         * 设备图标
         */
        product_icon: string;
        /**
         * 设备类别id
         */
        product_id: string;
        devices: any;
    }[]>;
    /**
     * 获取虚拟设备的子设备列表，暂时已上线的虚拟设备有：yeelink和philips灯组和窗帘组。其他的暂不支持。注意：Mesh灯组，和灯组2.0，无法通过此接口获取子设备（暂未开放）
     * @since  10003。
     * change on 10046 获取虚拟窗帘组设备的子设备列表
     * 通过传入的type判断返回哪种设备的子设备  yeelink和philips灯组的组设备是N->1，子设备不会出现在设备列表中，但是窗帘设备是N->N+1,所以请求的接口不同,，为兼容旧版，默认type=1
     * @param type   ===1时表示yeelink和philips灯组的组设备   ===2时表示窗帘组设备
     * 涉及接口：/home/virtualdevicectr，/v2/groupv2/query_status。可抓包此接口查看，返回的为此接口的数据
     * 使用场景：展示组设备的子设备列表，可通过此接口获取数据
     * @returns {Promise<BasicDevice[]>}
     *      resolve:子设备列表
     *      reject：{code: xxx, message: xxx}网络错误
     */
  getVirtualDevices(type: number, group_did: any): Promise<BasicDevice[]>;
  /**
     * 获取设备定向推荐信息，展示推荐入口使用：用于获取插件上方偶尔弹出的提示条/广告条数据，比如：设备信号差，请调整设备位置。
     * 若需要使用此接口而且不会用，请联系米家的同学。
     * @since 10024
     * @param {String} model
     * @param {String} did
     * @returns {Promise}
     *      resolve:定向推荐数据。米家的同学可通过下面的wiki查询
     *      reject: {code: xxx, message: xxx} -1 获取设备定向推荐数据失败
     */
  getRecommendScenes(model: string, did: string): Promise<any>;
  updateHomeKitAuthorizationData(data: any): Promise<any>;
  /**
     * 支持WiFi+Ble双绑定的猫眼和门锁设备获取当前isOnLine的具体在线状态;
     * 其他品类的Wifi设备isOnline仅有在离线0，1两个明确的值，不再细分;
     * 在线状态： -1：获取在线状态失败， 0：离线， 1：ble在线， 2：wifi 在线， 3：ble&&wifi 在线
     * @param did
     * @returns {Promise<unknown>}
     * {
     *     "code": 0,
     *     "message":"ok",
     *     "result":{
     *         "list":[
     *             {
     *                  "did": "xxxxx",
     *                  "name": "xxxxx",
     *                  "pd_id": 12345,
     *                  "model": "xxxxx",
     *                  "update_time": 1706684760444930,
     *                  "is_online": 1,
     *                  "is_share": false,
     *                  "ssid":"xxxxx",
     *                  "first_bind_time":1706684760444930,
     *                  "multi_device_online_status":1,
     *             },
     *         ]
     *     }
     * }
     */
  readOnlineDetail(did: any): Promise<unknown>;
}
import { BasicDevice } from "./BasicDevice";