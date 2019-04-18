/**
 * @export
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
import Account from "./Account"
import Scene from './service/scene'
import Host from "./Host";
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
     * @param {...string} propertyOrEventNames -在开发平台上声明的 prop 与 event 名，注意消息格式为：prop.xxxxx 或者 event.xxxxx ，表示订阅的是设备的属性变化，还是设备的事件响应
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
        return new Promise((resolve, reject) => {
            native.MIOTDevice.getVersion(false, (ok, data) => {
                if (ok) {
                    Properties.of(this).version = data;
                    resolve(data);
                    return;
                }
                reject(data);
            });
        });
    }
    /**
     * 获取固件的状态，可以确认是否需要升级，也可以获得当前的升级状态。
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
     * 获取子设备列表，一般网关才会有子设备
     * @since 10004
     * @method
     * @returns {Promise<IDevice[]>}
     * @example
     * import 'Device' from 'miot'
     * Device.getSubDevices()
     * .then(devices => {//get device list})
     */
    getSubDevices() {
         return Promise.resolve([]);
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
     * @method
     * @returns {Promise<IDevice[]>}
     * @description 废弃中，后续将不支持虚拟设备
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
     * 父设备的 model
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
     *
     */
    get resetFlag() {
         return  0
    }
    /**
     *是否是自己的设备
     * @type {boolean}
     * @readonly
     *
     */
    get isOwner() {
         return  false
    }
    /**
     *是否是自己家庭的设备
     * @type {boolean}
     * @readonly
     *
     */
    get isFamily() {
         return  false
    }
    /**
     *是否是别人分享的设备
     * @type {boolean}
     * @readonly
     *
     */
    get isShared() {
         return  false
    }
    /**
     *是否是已经绑定的设备
     * @since 10004 
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
}
const RootDevice={};
/**
 * @export
 */
export default RootDevice;