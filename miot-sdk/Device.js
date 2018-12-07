/**
 * @export
 * @module miot/Device
 * @desc 设备相关 API
 *
 *
 */
import Account from "./Account"
import Scene from './service/scene'
import Bluetooth, { IBluetoothClassic } from "./Bluetooth";
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
     * 设备状态变更事件,
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
     * Device.getDeviceWifi().subscribeMessages("power", "rgb").then(subcription=>{
     *      msgSubscription = subcription;
     * });
     * ...
     * const subscription = DeviceEvent.deviceReceivedMessages.addListener(
     * (device, messages)=>{
     *   if(messages.has('power')){
     *      const power = messages.get('power');
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
export class IDeviceWifi{
    /**
     * 获取设备ID
     * @member
     * @type {string}
     */
    get deviceID(){
         return  ""
    }
    /**
     * 调用设备方法, 和设备通信如果同一个 wifi 下会使用局域网传输数据，如果不在同一个 wifi 下由米家服务器转发请求
     * @param {string} method  方法名
     * @param {json} args  参数
     * @return {Promise<json>} {code:0,result:{},id:""}
     *
     */
    callMethod(method, args) {
         return Promise.resolve({});
    }
    /**
     * 加载属性数据, 调用get_prop 方法, 并将返回数据写成{key:value}格式
     * @method
     * @param {*} propNames
     * @returns {Promise<Map>} Map<name, value>
     * @example
     *
     *   Device.getDeviceWifi().loadProperties("a", "b").then(map=>{
     *      const a = map.get("a")
     *      const b = map.get("b")
     *   })
     *
     */
    loadProperties(...propNames) {
        if (propNames.length < 1) {
            return Promise.reject();
        }
        return this.callMethod("get_prop", propNames).then((res => {
            const map = new Map();
            if(res.result){
                propNames.forEach((n, i) => map.set(n, res.result[i]));
            }
            return map;
        }));
    }
    /**
     * 从云端加载属性数据, 调用get_prop 方法, 并将返回数据写成{key:value}格式
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
            if(res.result){
                propNames.forEach((n, i) => map.set(n, res.result[i]));
            }
            return map;
        }));
    }
    /**
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
     * ping 操作
     * @returns {Promise<json>}
     *
     */
    localPing() {
         return Promise.resolve({});
    }
    /**
     * 订阅设备消息
     * @method
     * @param {...string} propertyOrEventNames -在开发平台上声明的 prop 与 event 名
     * @returns {Promise<EventSubscription>}
     *
     */
    subscribeMessages(...propertyOrEventNames) {
         return Promise.resolve(this);
    }
    /**
     * 设备固件版本信息
     * @typedef DeviceVersion
     * @property {boolean} isUpdating
     * @property {boolean} isLatest
     * @property {boolean} isForce
     * @property {boolean} hasNewFirmware
     * @property {string} curVersion
     * @property {string} newVersion
     * @property {string} description
     *
     */
    /**
     * 检查硬件版本信息 /home/checkversion
     * @method
     * @returns {Promise<DeviceVersion>}
     *
     */
    checkVersion() {
         return Promise.resolve({});
    }
    /**
     * 获取固件的状态，可以确认是否需要升级，也可以获得当前的升级状态。 /home/devupgrade
     * @method
     * @return {Promise<DeviceVersion>}
     *
     */
    startUpgradingFirmware() {
         return Promise.resolve({});
    }
}
/**
 * @interface
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
     * 获得设备 wifi
     * @returns {IDeviceWifi}
     * 
     */
    getDeviceWifi(){
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
     * 如果有父设备，直接获取 父设备 Device
     * @type {IDevice}
     * @readonly
     *
     */
    get parentDevice() {
         return null
    }
    /**
     * 是否是根设备
     * @member
     * @type {boolean}
     * @readonly
     *
     */
    get isRootDevice() {
         return  false
    }
    /**
     * 获取子设备
     * @method
     * @returns {Promise<IDevice[]>}
     *
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
     *
     */
    getVirtualDevices() {
         return Promise.resolve([]);
    }
    /**
     * 获取BLE蓝牙控制类
     * @method
     * @returns {IBluetoothLE}
     * @see {@link module:miot/Bluetooth} 
     * @example
     *
     * Device.getBluetoothLE().connect()
     * .then(ble=>{
     *      ble....
     * })
     * .catch(error=>{
     *
     * })
     *
     *
     */
    getBluetoothLE() {
         return null
    }
    /**
     * 获取经典蓝牙控制类
     * @method
     * @returns {IBluetoothClassic}
     * @see {@link module:miot/Bluetooth} 
     * @example
     *
     * Device.getBluetoothClassic().connect()
     * .then(bluetoothClassic=>{
     *      bluetoothClassic....
     * })
     * .catch(error=>{
     *
     * })
     *
     *
     */
    getBluetoothClassic() {
         return null
    }
    /**
     *设备所有者的小米账号, 可以使用 load 获取 account 下的所有数据。不调用 load 只有 ID，nickName 字段有值
     * @type {IAccount}
     * @readonly
     * @see {@link module:miot/Account}
     *
     */
    get owner() {
         return null
    }
    /**
     * 上报日志
     * @param {string} log
     * 
     */
    reportLog(log) {
    }
    /**
     * 加载本设备相关的场景
     * @method
     * @param {*} sceneType
     * @param {*} opt
     * @returns {Promise<IScene[]>}
     * @see {@link module:miot/service/scene}
     *
     */
    loadScenes(sceneType, opt = null) {
        return Scene.loadScenes(this.deviceID, sceneType, opt);
    }
    /**
     * 加载定时场景
     * @param {json} opt
     * @returns {Promise<IScene[]>}
     * @see {@link module:miot/service/scene}
     *
     */
    loadTimerScenes(opt = null) {
        return Scene.loadTimerScenes(this.deviceID, opt);
    }
    /**
     * 创建场景
     * @method
     * @param {SceneType} sceneType
     * @param {json} opt
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
     * @param {json} opt
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
     *设备的 token 加密后生成的固定值
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
     * 当前账户对设备的控制权限
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
     * 获取设备的 mac 地址
     * @type {string}
     * @readonly
     *
     */
    get mac() {
         return  ""
    }
    /**
     * 获取当前设备固件的版本
     * @type {string}
     * @readonly
     *
     */
    get version() {
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
     * 获取设备类型
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
     * 经纬度
     * @type {double}
     * @readonly
     *
     */
    get latitude() {
         return  0.0
    }
    /**
     * 经纬度
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
     * 重置标志
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
     *是否是Binded2的设备
     * @type {boolean}
     * @readonly
     *
     */
    get isBinded2() {
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