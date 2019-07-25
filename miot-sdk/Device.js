/**
 * @export public
 * @doc_name 插件设备模块
 * @doc_index 6
 * @module miot/Device
 * @description
 * 设备相关 API
 * IDevice 当前设备实例对象，用于获取当前设备属性等
 * IDeviceWifi 当前设备网络操作实例对象，用于发送设备网络操作请求等
 * DeviceEvent 当前设备的可订阅事件，用于订阅设备名称状态变化等
 *
 * @example
 * import {Device} from 'miot'
 * ...
 * //IDevice
 * //属性获取
 * let did = Device.deviceID
 * let deviceModel = Device.model
 * //设备方法，e.g 场景创建
 * let scene = Device.createTimerScene(params)
 *
 * //IDeviceWifi
 * //wifi方法 e.g RPC请求
 * Device.getDeviceWifi().callMethod('method_name', params)
 *  .then(res => {//here is the success result})
 *  .catch(err => {//error happened})
 * ...
 * 其余具体使用请参考具体API文档
 */
import Scene from './service/scene';
import { Device } from ".";
const PERMISSION_OWNER = 16;
const PERMISSION_FAMILY = 8;
const PERMISSION_SHARE = 4;
const PERMISSION_SHARE_READONLY = 32;
const PERMISSION_NONE = 65296;
const PERMISSION_NONE_MASK = 30;
const INTERVAL_SUBSCRIBE_MSG_SECONDS = (2 * 60 + 50);//2'50"
export function _find_device(did) {
    let device = RootDevice;
    let props = Properties.of(device);
    if (props.did != did) {
        device = (props._subDevices || []).find(d => did == d.deviceID);
        if (!device) {
            return {};
        }
        props = Properties.of(device);
    }
    return { device, props }
}
/**
 * Device事件集合
 * @namespace DeviceEvent
 * @example
 *    import {DeviceEvent} from 'miot'
 *    ...
 *    class MyPage extends React.Component{
 *          componentWillMount(){
 *              this.subscription = DeviceEvent.deviceReceivedMessages.addListener((device, messages)=>{
 *                  if(!this.props.navigation.isFocused()){
 *                      return;
 *                  }
 *                  ...
 *              })
 *          }
 *          ...
 *          componentWillUnmount(){
 *              ...
 *              this.subscription.remove()
 *          }
 *          ...
 *    }
 *
 *    ...
 *
 */
export const DeviceEvent = {
    /**
     * 设备名称变更事件
     * @event
     * @param {IDevice} device -发生变更的设备
     * @since 1.0.0
     *
     */
    deviceNameChanged: {
    },
    /**
     * 设备时区变更事件
     * @event
     * @param {IDevice} device -发生变更的设备
     * @since 1.0.0
     *
     */
    deviceTimeZoneChanged: {
    },
    /**
     * 设备状态变更事件
     * @event
     * @param {IDevice} device -发生变更的设备
     */
    deviceStatusChanged: {
    },
    /**
     * 设备消息
     * @event
     * @param {IDevice} device
     * @param {Map<string,object>} messages -接收到的数据
     * @param {array} originData -接收到的数据, [{key,time,value}]
     *
     * @example
     *
     * import {Device, DeviceEvent} from 'miot'
     *
     * let msgSubscription = null;
     * Device.getDeviceWifi().subscribeMessages("prop.power", "event.something").then(subcription=>{
     *      msgSubscription = subcription;
     * });
     * ...
     * const subscription = DeviceEvent.deviceReceivedMessages.addListener(
     * (device, messages)=>{
     *   if(messages.has('prop.power')){
     *      const power = messages.get('prop.power');
     *      ...
     *   }
     *   ...
     * })
     * ...
     *
     * msgSubscription&&msgSubscription.remove();
     *
     */
    deviceReceivedMessages: {
    }
};
/**
 * 设备网络访问控制类
 * @interface
 */
export class IDeviceWifi {
    /**
     * 获取设备ID，same as Device.deviceID
     * @member
     * @type {string}
     * @example
     * import {Device} from 'miot'
     * ...
     * let did = Device.getDeviceWifi().deviceID
     */
    get deviceID() {
         return  ""
    }
    /**
     * 加载属性数据
     * 内部调用get_prop 方法,会依据当前环境选择从本地局域网或者云端获取, 并将返回数据写成{key:value}格式
     * @method
     * @param {*} propNames
     * @returns {Promise<Map>} Map<name, value>
     * @example
     * Device.getDeviceWifi().loadProperties("a", "b").then(map=>{
     *  const a = map.get("a")
     *  const b = map.get("b")
     * })
     *
     */
    loadProperties(...propNames) {
        if (propNames.length < 1) {
            return Promise.reject();
        }
        return this.callMethod("get_prop", propNames).then((res => {
            const map = new Map();
            if (res.result) {
                propNames.forEach((n, i) => map.set(n, res.result[i]));
            }
            return map;
        }));
    }
    /**
     * 从云端加载属性数据
     * 内部调用get_prop 方法, 并将返回数据写成{key:value}格式
     * @method
     * @param {*} propNames
     * @returns {Promise<Map>} Map<name, value>
     *
     */
    loadPropertiesFromCloud(...propNames) {
        if (propNames.length < 1) {
            return Promise.reject();
        }
        return this.callMethodFromCloud("get_prop", propNames).then((res => {
            const map = new Map();
            if (res.result) {
                propNames.forEach((n, i) => map.set(n, res.result[i]));
            }
            return map;
        }));
    }
    /** 
     * 检查设备固件升级弹窗.使用方法：Device.getDeviceWifi().checkFirmwareUpdateAndAlert()
     * 已废弃，请使用Device.checkFirmwareUpdateAndAlert()来代替。
     */
    checkFirmwareUpdateAndAlert() {
        return Device.checkFirmwareUpdateAndAlert();
    }
    /**
     * 调用设备方法
     * 若与设备通信处于同一个 wifi 下会使用局域网传输数据，如果不在同一个 wifi 下由米家服务器转发请求
     * @param {string} method  方法名
     * @param {json} args  参数
     * @param {json} extraPayload  额外参数，根据设备需求设定。在payload数据中设置额外参数
     * @return {Promise<json>} {code:0,result:{},id:""}
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
    callMethod(method, args, extraPayload = {}) {
         return Promise.resolve({});
    }
    /**
     * 云端调用设备方法
     * 同 callMethod 函数 不在同一个 wifi 下的情况
     * @param {string} method  方法名
     * @param {json} args 参数
     * @return {Promise<json>} 请求成功返回 {code:0,result:{} }
     *
     */
    callMethodFromCloud(method, args) {
         return Promise.resolve({});
    }
    /**
     * 本地调用设备方法
     * 同 callMethod 函数在同一个 wifi 下的情况
     * @param {string} method  方法名
     * @param {json} args 参数
     * @return {Promise<json>} 请求成功返回 {code:0,result:{} }
     *
     */
    callMethodFromLocal(method, args) {
         return Promise.resolve({});
    }
    /**
     * ping 操作 检查设备本地局域网通信是否可用
     * @returns {Promise<boolean>}
     *
     * @example
     * Device.getDeviceWifi().localPing()
     *  .then(res => console.log('success:', res))
     *  .catch(err => console.log('failed:', err))
     */
    localPing() {
         return Promise.resolve({});
    }
    /**
     * 订阅设备消息
     * @method
     * @param {...string} propertyOrEventNames -在开发平台上声明的 prop 与 event 名，注意消息格式为：prop.xxxxx 或者 event.xxxxx ，表示订阅的是设备的属性变化，还是设备的事件响应.如果是miot-spec设备。则为prop.siid.piid，event.siid.eiid
     * @returns {Promise<EventSubscription>}
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
     */
    subscribeMessages(...propertyOrEventNames) {
         return Promise.resolve(this);
    }
    /**
     * 获取设备固件版本信息
     * @return {Promise<any>}
     */
    getVersion() {
         return Promise.resolve({});
    }
    /**
     * 升级设备固件.可以和Service.smarthome.getAvailableFirmwareForDids搭配使用，先检查是否有可用版本，如果有，展示信息给用户，让用户确认，或者直接升级。
     * /home/devupgrade
     * @method
     * @return {Promise<DeviceVersion>}
     * @example
     * Device.getDeviceWifi().startUpgradingFirmware()
     *  .then(res => console.log('success:', res))
     *  .catch(err => console.log('failed:', err))
     */
    startUpgradingFirmware() {
         return Promise.resolve({});
    }
    /**
     * 为设备固件升级失败添加自定义的errorCode与错误提示信息的索引
     * 注意 分享过来的设备是无法进行固件升级的，所以此时此方法无效。
     * Android暂未适配
     * @param {json} message 以errorCode为key，以错误提示信息为value的字典。key和value的数据类型都须是string。
     * @return boolean 设置是否成功
     * @example
     * let ret = Device.getDeviceWifi().setFirmwareUpdateErrDic({"3":'无法连接'})
     */
    setFirmwareUpdateErrDic(message) {
         return Promise.resolve({});
    }
    /**
     * 设置设备控制页不检查固件升级
     * Android暂未适配
     * @param {boolean} notCheck 是否 不检查更新 true-不自动检查 false-自动检查
     * @return {Promise}
     * @example
     * Device.getDeviceWifi().setFirmwareNotCheckUpdate(true|false)
     *  .then(res => console.log('success:', res))
     *  .catch(err => console.log('failed:', err))
     */
    setFirmwareNotCheckUpdate(notCheck) {
         return Promise.resolve(null);
    }
}
/**
 * @interface
 * @description
 * 设备信息的实例
 * 仅适用于当前插件适配的设备
 * @example
 * import 'Device' from 'miot'
 * ...
 * let did = Device.deviceID
 * let model = Device.model
 * ...
 */
class IDevice {
    /**
     *获取设备 id，每一个真实设备都有一个唯一的 id
     * @type {string}
     * @readonly
     *
     */
    get deviceID() {
         return  0
    }
    /**
     * 获取设备的 model,设备类型的唯一标识
     * @type {string}
     * @readonly
     *
     */
    get model() {
         return  ""
    }
    /**
     * 获得设备 wifi 操作对象
     * @returns {IDeviceWifi}
     *
     */
    getDeviceWifi() {
         return null
    }
    /**
     *设备是否已经可用
     * @type {boolean}
     * @readonly
     *
     *
     */
    get isReady() {
         return false
    }
    /**
     * 如果有父设备，直接获取 父设备 Device，一般是网关子设备才会有父设备
     * @type {IDevice}
     * @readonly
     *
     */
    get parentDevice() {
         return null
    }
    /**
     * 是否是根设备，从首页点击设备进入插件，此设备即为根设备。
     * @member
     * @type {boolean}
     * @readonly
     *
     */
    get isRootDevice() {
         return  false
    }
    /**
     * 批量删除设备, 不能删除 小米路由器/本地蓝牙/局域网直连设备
     * @since 10011
     * @param {object[]} didAndPids did 与 pid（Device.type） 列表 [{did:xx,pid:xx}, {did:xx,pid:xx}]
     */
    deleteDevices(didAndPids) {
         return Promise.resolve(null);
    }
    /**
     * 获取子设备列表，一般网关才会有子设备
     * @since 10004
     * @method
     * @returns {Promise<IDevice[]>}
     * @example
     * import 'Device' from 'miot'
     * Device.getSubDevices()
     * .then(devices => {//get device list})
     */
    getSubDevices(useCache = false) {
         return Promise.resolve([]);
    }
    /**
     * 获取蓝牙网关关联的普通蓝牙和蓝牙mesh设备列表。
     * @since 10020
     * @param {string} [did=Device.deviceID] 蓝牙网关的did，可以为空，为空时默认取当前Device.deviceID
     * @returns {Promise} 返回数组设备信息的promise， {"mesh":[], "normal":""}
     */
    getLinkedBTDevices(did = null) {
         return Promise.resolve([]);
    }
    /**
     * @typedef {Object} DeviceConfig
     * @property {string} deviceIconURL 设备的实物icon url
     * @property {string} deviceName 设备类型的名称
     * @property {string} resetPageURL 设备的重置引导url
     */
    /**
     * 获取某个model设备的默认配置，例如iconurl，名称等等
     * @since 10010
     * @param {string} model 指定设备的model
     * @returns {DeviceConfig} 设备配置
     */
    loadRealDeviceConfig(model) {
         return Promise.resolve({});
    }
    /**
     * 是否虚拟设备
     * @type {boolean}
     * @readonly
     *
     */
    get isVirtualDevice() {
         return  false
    }
    /**
     * 获取虚拟设备 /home/virtualdevicectr
     * @returns {Promise<IDevice[]>}
     */
    getVirtualDevices() {
         return Promise.resolve([]);
    }
    /**
     * 实时获取设备的网络信息包括网络强度
     * @param {String} did 设备id
     * @method
     * @returns {Promise<IDevice[]>}
     */
    readDeviceNetWorkInfo(did) {
         return Promise.resolve([]);
    }
    /**
     * 获取小米BLE蓝牙控制类, 
     * 注意: 在 iOS 平台上, 如果没有指定peripheralID, 则须先执行Bluetooth.scan(), 
     * 扫描到与device.mac匹配的蓝牙设备之后才能 connect 成功, 否则将不能成功执行后来的所有操作.
     * @method
     * @param {string} peripheralID -- iOS平台上可以直接指定与设备 mac 匹配的peripheralID, android 平台不需要此参数
     * @returns {IBluetoothLE}
     * @see {@link module:miot/Bluetooth}
     * @example
     * 
     * const peripheralUUID4IOS = ...;
     * 
     * Device.getBluetoothLE(peripheralUUID4IOS).connect()
     * .then(ble=>{
     *      ble....
     * })
     * .catch(error=>{
     *
     * })
     * 
     *
     */
    getBluetoothLE(peripheralID = null) {
         return null
    }
    /**
     * 设备所有者的小米账号, 可以使用 load 获取 account 下的所有数据。
     * 不调用 load 只有 ID，nickName 字段有值。
     * 注:Service.account 不load时只有ID可用，与此处不一样。
     * @type {IAccount}
     * @readonly
     * @see {@link module:miot/Account}
     *
     */
    get owner() {
         return null
    }
    /**
     * 上报日志，写入文件，在用户反馈时可以查看
     * @param {string} log
     *
     */
    reportLog(log) {
    }
    /**
     * 加载本设备相关的场景
     * @method
     * @param {*} sceneType  SceneType.Timer(定时场景)，SceneType.Artificial(人工场景)，SceneType.Automatic(自动场景)
     * @param {*} opt {identify,name} identify：代表场景的分类，创建场景时可自定义此参数；如果获取场景的时候传入identify，表示获取identify类场景列表；如果不需要对场景分类，此参数可忽略。name:场景名字
     * @returns {Promise<IScene[]>}
     * @see {@link module:miot/service/scene}
     *
     */
    loadScenes(sceneType, opt = null) {
        return Scene.loadScenes(this.deviceID, sceneType, opt);
    }
    /**
     * 加载定时场景
     * @param {json} opt 同上loadScenes的opt
     * @returns {Promise<IScene[]>}
     * @see {@link module:miot/service/scene}
     *
     */
    loadTimerScenes(opt = null) {
        return Scene.loadTimerScenes(this.deviceID, opt);
    }
    /**
     * 获取当前设备列表中的指定model的设备列表
     * @since 10003
     * @param {string} model 设备model
     */
    requestAuthorizedDeviceListData(model) {
         return Promise
    }
    /**
     * 将当前手机的定位信息作为新的设备位置进行上报，该操作会更新设备的地理位置信息。
     * @since 10020
     * @returns {Promise}
     */
    reportDeviceGPSInfo() {
         return Promise
    }
    /**
     * 创建场景
     * @method
     * @param {SceneType} 同上loadScenes的sceneType
     * @param {json} opt  同上loadScenes的opt，此处传入opt，后续获取场景时，可根据此opt来筛选
     * @returns {IScene}
     * @see {@link module:miot/service/scene}
     *
     */
    createScene(sceneType, opt = null) {
        return Scene.createScene(this.deviceID, sceneType, opt);
    }
    /**
     * 创建定时场景
     * @method
     * @param {json} opt 同上loadScenes的opt，此处传入opt，后续获取场景时，可根据此opt来筛选
     * @returns {IScene}
     * @see {@link module:miot/service/scene}
     *
     */
    createTimerScene(opt = null) {
        return Scene.createTimerScene(this.deviceID, opt);
    }
    /**
     * 除了基本信息的其他数据都在这个字段返回，如：{"fw_version":"1.4.0","mcu_version":"0001"}
     * 可以解析为 json
     * @type {string}
     * @readonly
     *
     */
    get extra() {
         return  ""
    }
    /**
     * 开发者平台配置的设备的中文名
     * @type {string}
     * @readonly
     *
     */
    get name() {
         return  ""
    }
    /**
     *设备的 token 加密后生成的固定值，在设备快连入网时生成，能唯一标识设备的生命周期，直至被重置、重新快连入网。注意该 Session 并非设备与服务器交互时认证所用 Token，只能用于标识作用
     * @type {string}
     * @readonly
     *
     */
    get session() {
         return  ""
    }
    /**
     *开发者平台配置的设备图标 一个图片的下载地址
     * @type {string}
     * @readonly
     *
     */
    get iconURL() {
         return  ""
    }
    /**
     * 当前账户对设备的控制权限，主要用于分享的设备 4:普通分享 36:只读分享
     * @type {int}
     * @readonly
     *
     */
    get permitLevel() {
         return  0
    }
    /**
     * 是否设置了进入插件使用密码
     * @type {boolean}
     * @readonly
     *
     */
    get isSetPinCode() {
         return  false
    }
    /**
     * 父设备的 model,10023及其之后返回空字符串
     * @deprecated   10023开始废弃，10023及后续版本建议使用 Device.parentDevice.model
     * @type {string}
     * @readonly
     *
     */
    get parentModel() {
         return  ""
    }
    /**
     * 是否在设备列表显示
     *  0 -- 不显示
     * @type {int}
     * @readonly
     *
     */
    get showMode() {
         return  0
    }
    /**
     * 获取设备时区,非实时加载，可能为空.如果需要自行获取最新设备时区值，请使用smarthome.getDeviceTimeZone(did)
     * @type {string}
     * @deprecated   10021开始废弃，10021及后续版本建议使用 Device.getDeviceTimeZone().then
     */
    get timeZone() {
         return  ""
    }
    /**
     * 获取设备的 mac 地址
     * @type {string}
     * @readonly
     *
     */
    get mac() {
         return  ""
    }
    /**
     * 获取当前wifi设备固件的版本
     * @type {string}
     * @readonly
     *
     */
    get lastVersion() {
         return  ""
    }
    /**
     * 获取 prop中保存的信息
     * @type {json}
     * @readonly
     *
     */
    get propInfo() {
         return  {}
    }
    /**
     *获取设备的 ip
     * @type {string}
     * @readonly
     *
     */
    get IP() {
         return  ""
    }
    /**
     * 获取 wifi 信号强度
     * @type {string}
     * @readonly
     *
     */
    get RSSI() {
         return  ""
    }
    /**
     * 获取连接 wifi 的名称
     * @type {string}
     * @readonly
     *
     */
    get SSID() {
         return  ""
    }
    /**
     * 获取连接 wifi 的mac 地址
     * @type {string}
     * @readonly
     *
     */
    get BSSID() {
         return  ""
    }
    /**
     * 获取设备类型，0：wifi单模设备，1：yunyi设备，2：云接入设备，3：zigbee设备，5：虚拟设备，6：蓝牙单模设备，7：本地AP设备，8：蓝牙wifi双模设备，9：其他，10：功能插件，11：SIM卡设备，12：网线设备，13：NB-IoT，14：第三方云接入，15：红外遥控器，16：BLE Mesh，17：虚拟设备（新设备组）
     * @type {int}
     * @readonly
     *
     */
    get type() {
         return  0
    }
    /**
     * 获取上次修改时间戳, 例如1532587811237
     * @type {long}
     * @readonly
     *
     */
    get lastModified() {
         return  1532587811237
    }
    /**
     * 本地设备还是远程设备, 0未知 1本地 2远程
     * @type {int}
     * @readonly
     *
     */
    get location() {
         return  0
    }
    /**
     * 纬度
     * @type {double}
     * @readonly
     *
     */
    get latitude() {
         return  0.0
    }
    /**
     * 经度
     * @type {double}
     * @readonly
     *
     */
    get longitude() {
         return  0.0
    }
    /**
     * 是否支持语音控制
     * @return {boolean}
     * @readonly
     *
     */
    get isVoiceDevice() {
         return  false
    }
    /**
     * 设备是否在线 true 在线
     * @type {boolean}
     * @readonly
     *
     */
    get isOnline() {
         return  false
    }
    /**
     * 重置标志，本地设备才会返回该字段，为1时表示设备刚刚reset过
     * @type {int}
     * @readonly
     * @deprecated 10023开始废弃，后续不再提供此字段，此方法永远返回0
     */
    get resetFlag() {
         return  0
    }
    /**
     *是否是自己的设备，若是别人（包含家属）分享给你的设备，isOwner则为false
     * @type {boolean}
     * @readonly
     *
     */
    get isOwner() {
         return  false
    }
    /**
     *是否是自己家庭的设备，如果是家属分享给你的设备，isFamily则为true，注意此时isShared为false（iOS暂不支持分享给家属）
     * @type {boolean}
     * @readonly
     *
     */
    get isFamily() {
         return  false
    }
    /**
     *是否是别人分享的设备，若是家属分享给你的设备，isShared为fasle，isFamily为true
     * @type {boolean}
     * @readonly
     *
     */
    get isShared() {
         return  false
    }
    /**
     *是否是已经绑定的设备
     * @since 10005
     * @type {boolean}
     * @readonly
     *
     */
    get isBinded() {
         return  false
    }
    /**
     *是否是别人分享的只读设备
     * @type {boolean}
     * @readonly
     *
     */
    get isReadonlyShared() {
         return  false
    }
    /**
     * 检查当前设备是否支持HomeKit
     * @since 10021
     * @returns {Promise<boolean>} 是否支持
     */
    checkIsHomeKitDevice() {
         return Promise
    }
    /**
     * 检查当前设备是否接入了HomeKit
     * @since 10021
     * @returns {Promise<boolean>} 是否接入
     */
    checkHomeKitConnected() {
         return Promise
    }
    /**
     * 将当前设备绑定到HomeKit中
     * @since 10021
     * @returns {Promise} 成功进入then，失败进入catch
     */
    bindToHomeKit() {
         return Promise
    }
    /**
     * 获取当前设备的时区信息
     * @since 10021
     * @returns {Promise} 成功进入then，失败进入catch
     */
    getDeviceTimeZone() {
         return Promise
    }
    /**
     * 修改设备/子设备的名字，注意不支持蓝牙网关对子设备名称的修改
     * @since 10022
     * @param {String} newName 设备的新的名称
     * @param {String} did 如果修改自身的名称，可不传，如果修改子设备的，则需要传子设备的did。如果did是其他，调用此方法会走reject
     * @returns {Promise} 成功进入then，失败进入catch，成功时，res为新名称。同时，DeviceEvent的deviceNameChanged会被触发
     */
    changeDeviceName(newName, did = null) {
        return new Promise((resolve, reject) => {
            native.MIOTDevice.changeDeviceName(newName, did, (ok, res) => {
                if (ok) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
        });
    }
    // @native begin
    /**
     * 检查设备固件升级弹窗。该方法会触发升级弹窗alert提示。
     * 建议使用场景为需要屏蔽默认的插件启动检测的弹窗，自行寻找合适的时机触发该检测机制。
     * 不支持单模蓝牙、组设备、虚拟设备、离线设备、分享设备。
     * @since 10023
     * @returns {Promise}
     * @example
     * 
     * //首先屏蔽默认弹窗
     * Package.disableAutoCheckUpgrade = true;
     * //....
     * //在合适的时间触发
     * Device.checkFirmwareUpdateAndAlert().then(res => { }).catch(err => { })
     */
    checkFirmwareUpdateAndAlert() {
        //virture device: did contain virtual, model contain virtual
        //分享设备预计虚拟设备和离线设备都不检查
         return Promise.resolve({});
    }
    /**
     * 获取设备定向推荐信息，展示推荐入口使用。注意：SDK_10024及其之后才可使用
     * @since 10024
     * @param {String} model
     * @param {String} did
     * @returns {Promise}
     */
    getRecommendScenes(model, did) {
         return Promise.resolve({});
    }
}
const RootDevice={};
/**
 * @export
 */
export default RootDevice;