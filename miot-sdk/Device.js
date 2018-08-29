/**
 * @export
 * @module miot/Device
 * @desc 设备相关 API
 * 
 *
 */

import native, { Properties, Utils, createEventManager } from './native'

import Account from "./Account"
import Scene from './service/scene'

const PERMISSION_OWNER = 16;
const PERMISSION_FAMILY = 8;
const PERMISSION_SHARE = 4;
const PERMISSION_SHARE_READONLY = 32;
const PERMISSION_NONE = 65296;
const PERMISSION_NONE_MASK = 30;

function _find_device(did){
    let device = RootDevice;
    let props = Properties.of(device);
    if(props.did != did){
        device = (props._subDevices||[]).find(d=>did==d.deviceID);
        if(!device){
            return {};
        }
        props = Properties.of(device);
    }
    return {device, props}
}

/**
 * Device事件名集合
 * @typedef DeviceEvent
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
 * @expo events
 */
export const DeviceEvent = createEventManager({
    /**
     * 设备名称变更事件
     * @event
     * @param {IDevice} device -发生变更的设备
     *
     * @mark ios  ?
     * @mark andr done
     *
     */
    deviceNameChanged:{forever:emitter=>
        ({did, newName})=>{
            const {device, props} = _find_device(did);
            if(!device)return;
            props.name = newName;
            emitter.emit(device);
        }
    },

    /**
     * 设备状态变更事件,
     * @event
     * @param {IDevice} device -发生变更的设备
     *
     * @mark ios  ?
     * @mark andr ?
     */
    deviceStatusChanged:{forever:emitter=>
        (did, newstatus, {rootDeviceIsReady})=>{
            //监听设备准备妥当的消息
            if(rootDeviceIsReady && did){
                Properties.of(RootDevice).did = did;
                //try to reload root device stat at here

                return;
            }
            const {device, props} = _find_device(did);
            if(!device)return;
            // props.name = newName;
            emitter.emit(device);
        }
    },

    /**
     * 设备场景消息
     * @event
     * @param {IDevice} device
     * @param {Map<string,object>} messages -接收到的数据
     * @param {array} originData -接收到的数据, [{key,time,value}]
     *
     * @mark ios  ?
     * @mark andr done
     *
     */
    deviceReceivedMessages:{forever:emitter=>
        ({did, data})=>{
            const {device, props} = _find_device(did);
            if(!device)return;
            if(typeof(data) == "string"){
                data = JSON.parse(data);
            }
            const map = new Map();
            data.forEach(ent=>map.set(ent.key, ent.value))
            emitter.emit(device, map, data);
        }
    ,sameas:"deviceRecievedMessages"}

});

// export const DeviceEvent = deviceEventManager.eventNames;
// deviceEventManager.events = deviceEventManager.createEventHandlers();

/**
 * @interface
 * @expo interface
 */
class IDevice {

    /**
     *获取设备 id，每一个真实设备都有一个唯一的 id
     * @type {string}
     * @readonly
     * 
     * @expo get
     * @mark ios  done
     * @mark andr done
     */
    get deviceID() {
        return Properties.of(this).did;
    }

    /**
     * 获取设备的 model,设备类型的唯一标识
     * @type {string}
     * @readonly
     *
     * @expo get
     * @mark ios
     * @mark andr
     */
    get model() {
        return Properties.of(this).model;
    }

    /**
     *设备是否已经可用
     * @type {boolean}
     * @readonly
     *
     * @expo get
     * @mark ios
     * @mark andr
     *
     */
    get isReady() {
        const { did } = Properties.of(this);
        return did && did != '';
    }

    /**
     * 订阅设备消息
     * @method
     * @param {...string} propertyOrEventNames -在开发平台上声明的 prop 与 event 名
     * @returns {Promise<IDevice>}
     *
     * @expo method
     * @mark ios
     * @mark andr done
     */
    subscribeMessages(...propertyOrEventNames) {
        if(propertyOrEventNames.length < 1){
            return Promise.reject("arguments is empty");
        }
        const {_msgset} = Properties.of(this);
        propertyOrEventNames.forEach(n=>_msgset.add(n));
        return (new Promise((resolve, reject)=>{
            native.MIOTDevice.subscribeMessages(this.deviceID, Array.from(_msgset), (ok) => {
                ok&&resolve(this);
                !ok&&reject();
            })
        }));
    }

    /**
     * 加载本设备相关的场景
     * @method
     * @param {*} sceneType
     * @param {*} opt
     * @returns {Promise<IScene[]>}
     * @see {@link module:miot/service/scene}
     * 
     * @expo method
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
     * @expo method
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
     * @expo method
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
     * @expo method
     */
    createTimerScene(opt = null) {
        return Scene.createTimerScene(this.deviceID, opt);
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
     * @expo def
     */
    /**
     * 检查硬件版本信息
     * @method
     * @returns {Promise<DeviceVersion>}
     * 
     * 
     * @expo method
     */
    checkVersion() {
        return new Promise((resolve, reject) => {
            const { did, pid } = Properties.of(this)
            native.MIOTRPC.standardCall("/home/checkversion", { did, pid }, (ok, res) => {
                if (!ok) {
                    return reject(res);
                }
                const { updating, isLatest, description, force, curr, latest } = res;
                resolve({
                    isUpdating: updating, isLatest, isForce: force, description,
                    curVersion: curr, newVersion: latest, hasNewFirmware: updating ? false : !isLatest
                })
            });
        });
    }

    /**
     * 获取固件的状态，可以确认是否需要升级，也可以获得当前的升级状态。
     * @method
     * @return {Promise<DeviceVersion>}
     * 
     * 
     * @expo method
     */
    startUpgradingFirmware() {
        return new Promise((resolve, reject) => {
            const { did, pid } = Properties.of(this)
            native.MIOTRPC.standardCall("/home/devupgrade", { did, pid }, (ok, res) => {
                if (!ok) {
                    return reject(res);
                }
                const { updating, isLatest, description, force, curr, latest } = res;
                resolve({
                    isUpdating: updating, isLatest, isForce: force, description,
                    curVersion: curr, newVersion: latest, hasNewFirmware: updating ? false : !isLatest
                })
            });
        });
    }

    /**
     * 如果有父设备，直接获取 父设备 Device
     * @type {IDevice}
     * @readonly
     * 
     * 
     * @expo get
     */
    get parentDevice() {
        //更新 subDevice 的时候, 需要将 parentDevice 重置回来
        return Properties.of(this)._parentDevice;
    }

    /**
     * 是否是根设备
     * @member
     * @type {boolean}
     * @readonly
     * 
     * @expo get
     */
    get isRootDevice() {
        return !Properties.of(this)._parentDevice;
    }

    /**
     * 获取子设备
     * @method
     * @returns {Promise<IDevice[]>}
     * 
     * @expo get
     * @mark andr done
     */
    getSubDevices() {
        const self = Properties.of(this);
        if (self._parentDevice) {
            return Promise.reject();
        }
        if (self._subDevices) {
            return Promise.resolve(self._subDevices);
        }
        return new Promise((resolve, reject) => {
            native.MIOTDevice.loadSubDevices(this.deviceID, ret => {
                if (ret && ret.ok && ret.result) {
                    self._subDevices = ret.result.map(stat => {
                        //initDeviceEvents
                        return (Properties.init(new IDevice(),
                            { ...stat, _parentDeviceID: this.deviceID, _parentDevice: this, _msgset:new Set()}
                        ));
                    })
                    resolve(self._subDevices);
                } else {
                    reject(ret)
                }
            });
        });
    }
    /**
     * 蓝牙操作入口
     * @type {IBluetooth}
     * @see {@link module:miot/Bluetooth}
     * @readonly
     * @example
     *
     * Device.bluetooth.connect()
     * .then(bluetooth=>{
     *      bluetooth....
     * })
     * .catch(error=>{
     *
     * })
     * 
     * 
     * @expo get
     */
    get bluetooth() {
        const self = Properties.of(this)
        if (self._bluetooth) {
            return self._bluetooth;
        }
        if (!self.mac) {
            throw new Error("the device is not initialized");
        }
        self._bluetooth = Bluetooth.createBluetooth(self.mac);
        return self._bluetooth;
    }

    /**
     *设备所有者的小米账号, 可以使用 load 获取 account 下的所有数据。不调用 load 只有 ID，nickName 字段有值
     * @type {IAccount} 
     * @readonly
     * @see {@link module:miot/Account} 
     * 
     * @expo get
     */
    get owner() {
        const props = Properties.of(this);
        if (!props._owner) {
            props._owner = Properties.init(new Account(),
                {
                    'id': Properties.of(this).ownerId,
                    'nickName': Properties.of(this).ownerName,
                    'isLoaded': false
                });
        }
        return props._owner;
    }


    /**
     * 调用设备方法, 和设备通信如果同一个 wifi 下会使用局域网传输数据，如果不在同一个 wifi 下由米家服务器转发请求
     * @param {string} method  方法名
     * @param {json} args  参数 
     * @return {Promise<json>} {code:0,result:{},id:""}
     * 
     * @expo method
     * @mark andr done
     */
    callMethod(method, args) { 
        return new Promise((resolve, reject) => {
            native.MIOTDevice.callMethod(this.deviceID, method, native.isAndroid ? ((typeof (args) === "string") ? args : JSON.stringify(args)) : args, (ok,res) => {
                if (ok) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
        })
    }

    /**
     * 加载属性数据, 调用get_prop 方法, 并将返回数据写成{key:value}格式
     * @method
     * @param {*} propNames
     * @returns {Promise<Map>} Map<name, value>
     * @example
     *
     *   Device.loadProperties("a", "b").then(map=>{
     *      const a = map.get("a")
     *      const b = map.get("b")
     *   })
     *
     * @expo method
     */
    loadProperties(...propNames) {
      if (propNames.length < 1) {
        return Promise.reject();
      }
      return this.callMethod("get_prop",propNames).then((res=>{
        const map = new Map();
        propNames.forEach((n, i) => map.set(n, res.result[i]));
        return map;
      }));
    }

    /**
     * 从云端加载属性数据, 调用get_prop 方法, 并将返回数据写成{key:value}格式
     * @method
     * @param {*} propNames
     * @returns {Promise<Map>} Map<name, value>
     *
     * @expo method
     */
    loadPropertiesFromCloud(...propNames) {
        if (propNames.length < 1) {
            return Promise.reject();
        }
        return this.callMethodFromCloud("get_prop",propNames).then((res=>{
          const map = new Map();
          propNames.forEach((n, i) => map.set(n, res[i]));
          return map;
        }));
    }

    /**
     * 同 callMethod 函数 不在同一个 wifi 下的情况
     * @param {string} method  方法名
     * @param {json} args 参数  
     * @return {Promise<json>} 请求成功返回 {code:0,result:{} } 
     * 
     * @expo method
     * @mark andr done
     */
    callMethodFromCloud(method, args) {
        // return this._methodProxy;
        return new Promise((resolve, reject) => {
            native.MIOTDevice.callMethodFromCloud(this.deviceID, method, native.isAndroid ? ((typeof (args) === "string") ? args : JSON.stringify(args)) : args, (ok,res) => {
              if (ok) {
                resolve(res)
              } else {
                reject(res)
              }
            })
        })
    }

    /**
     * 上报日志
     * @param {string} log
     * 
     * @expo method
     * @mark andr done
     */
    reportLog(log) {
        native.MIOTService.addLog(this.model, log);
    }

    /**
     * ping 操作
     * @returns {Promise<json>}
     * 
     * @expo method
     * @mark andr done
     */
    localPing() {
        return new Promise((resolve, reject) => {
            native.MIOTDevice.localPingWithCallback(this.deviceID, ret => {
                if (ret) {
                    resolve(ret)
                } else {
                    reject()
                }
            })
        });
    }

    /**
     * 除了基本信息的其他数据都在这个字段返回，如：{"fw_version":"1.4.0","mcu_version":"0001"}
     * 可以解析为 json
     * @type {string}
     * @readonly
     * 
     * @expo get
     */
    get extra() {
        return Properties.of(this).extrainfo;
    }

    /**
     * 开发者平台配置的设备的中文名
     * @type {string}
     * @readonly
     * 
     * @expo get
     */
    get name() {
        return Properties.of(this).name;
    }
 
    /**
     *设备的 session
     * @type {string}
     * @readonly
     * 
     * @expo get
     */
    get session() {
        return Properties.of(this).session;
    }

    /**
     *开发者平台配置的设备图标 一个图片的下载地址
     * @type {string}
     * @readonly
     * 
     * @expo get
     */
    get iconURL() {
        return Properties.of(this).iconURL;
    }

    /**
     * 当前账户对设备的控制权限
     * @type {int}
     * @readonly
     * 
     * @expo get
     */
    get permitLevel() {
        return Properties.of(this).permitLevel;
    }

    /**
     * 是否设置了进入插件使用密码
     * @type {boolean}
     * @readonly
     * 
     * @expo get
     */
    get isSetPinCode() {
        return Properties.of(this).isSetPinCode;
    }

    /**
     * 父设备的 model
     * @type {string}
     * @readonly
     * 
     * @expo get
     */
    get parentModel() {
        return Properties.of(this).parentModel;
    }

    /**
     * 是否在设备列表显示
     *  0 -- 不显示
     * @type {int}
     * @readonly
     * 
     * @expo get
     */
    get showMode() {
        return Properties.of(this).showMode;
    }


    /**
     * 获取设备的 mac 地址
     * @type {string}
     * @readonly
     * 
     * @expo get
     */
    get mac() {
        return Properties.of(this).mac;
    }

    /**
     * 获取当前设备固件的版本
     * @type {string}
     * @readonly
     * 
     * @expo get
     */
    get version() {
        return Properties.of(this).version;
    }

    /**
     *获取 prop中保存的信息
     * @type {json}
     * @readonly
     * 
     * @expo get
     */
    get propInfo() {
        return Properties.of(this).propInfo;
    }

    /**
     *获取设备的 ip
     * @type {string}
     * @readonly
     * 
     * @expo get
     */
    get IP() {
        return Properties.of(this).ip;
    }

    /**
     *获取 wifi 信号强度
     * @type {string}
     * @readonly
     * 
     * @expo get
     */
    get RSSI() {
        return Properties.of(this).rssi;
    }

    /**
     *获取连接 wifi 的名称
     * @type {string}
     * @readonly
     * 
     * @expo get
     */
    get SSID() {
        return Properties.of(this).ssid;
    }

    /**
     *获取连接 wifi 的mac 地址
     * @type {string}
     * @readonly
     * 
     * @expo get
     */
    get BSSID() {
        return Properties.of(this).bssid;
    }

    /**
     *获取设备类型
     * @type {int}
     * @readonly
     * 
     * @expo get
     */
    get type() {
        return Properties.of(this).pid;
    }

    /**
     *获取上次修改时间
      时间戳, 例如1532587811237
     * @type {long}}
     * @readonly
     * 
     * @expo get
     */
    get lastModified() {
        return Properties.of(this).lastModified;
    }

    /**
     *本地设备还是远程设备
     0未知 1本地 2远程
     * @type {int}
     * @readonly
     * 
     * @expo get
     */
    get location() {
        return Properties.of(this).location;
    }

    /**
     * 经纬度
     * @type {double}
     * @readonly
     * 
     * @expo get
     */
    get latitude() {
        return Properties.of(this).latitude;
    }

    /**
     * 经纬度
     * @type {double}
     * @readonly
     * 
     * @expo get
     */
    get longitude() {
        return Properties.of(this).longitude;
    }

    /**
     * 是否支持语音控制
     * @return {boolean}
     * @readonly
     * 
     * @expo get
     */
    get isVoiceDevice() {
        return Properties.of(this).isVoiceDevice;
    }

    /**
     * 设备是否在线 true 在线
     * @type {boolean}
     * @readonly
     * 
     * @expo get
     */
    get isOnline() {
        return Properties.of(this).isOnline;
    }

    /**
     * 重置标志
     * @type {int}
     * @readonly
     * 
     * @expo get
     */
    get resetFlag() {
        return Properties.of(this).resetFlag;
    }

    /**
     *是否是自己的设备
     * @type {boolean}
     * @readonly
     * 
     * @expo get
     */
    get isOwner() {
        return (Properties.of(this).permitLevel & PERMISSION_NONE_MASK & PERMISSION_OWNER) !== 0;
    }

    /**
     *是否是自己家庭的设备
     * @type {boolean}
     * @readonly
     * 
     * @expo get
     */
    get isFamily() {
        return (Properties.of(this).permitLevel & PERMISSION_NONE_MASK & PERMISSION_FAMILY) !== 0;
    }

    /**
     *是否是别人分享的设备
     * @type {boolean}
     * @readonly
     * 
     * @expo get
     */
    get isShared() {
        return (Properties.of(this).permitLevel & PERMISSION_SHARE) !== 0 && Properties.of(this).ownerName !== null;
    }

    /**
     *是否是Binded2的设备
     * @type {boolean}
     * @readonly
     * 
     * @expo get
     */
    get isBinded2() {
        return (Properties.of(this).permitLevel & PERMISSION_NONE_MASK) !== 0;
    }

    /**
     *是否是别人分享的只读设备
     * @type {boolean}
     * @readonly
     * 
     * @expo get
     */
    get isReadonlyShared() {
        return (Properties.of(this).permitLevel & PERMISSION_SHARE_READONLY) !== 0 && Properties.of(this).ownerName !== null;
    }


}

/**
 * @static
 * @type {IDevice}
 */
const RootDevice = new IDevice();
Properties.init(RootDevice, { ...native.MIOTDevice.currentDevice, _msgset:new Set()})
/**
 * @expo default {}
 */
export default RootDevice;
