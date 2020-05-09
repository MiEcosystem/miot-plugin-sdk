/**
 * @export public
 * @doc_name 蓝牙模块
 * @doc_index 2
 * @doc_directory bluetooth
 * @module miot/device/bluetooh
 * @description 蓝牙设备操作类
 * 蓝牙设备的开发，详见[小米协议BLE设备开发指南](https://iot.mi.com/new/doc/app-development/extension-development/device-management/device.html#%E5%B0%8F%E7%B1%B3%E5%8D%8F%E8%AE%AEBLE%E8%AE%BE%E5%A4%87%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97)  
 * 此文件包含了蓝牙设备的基本操作，比如获取蓝牙设备基本属性，蓝牙设备版本，发现，连接，取消连接蓝牙设备，蓝牙事件等模块。
 * 
 * @example
 * import Device from 'miot/device'
 *
 * // 此ble对象，即为IBluetooth对象或者IBluetoothLock对象
 * const ble = Device.getBluetoothLE();
 * 
 * ble.connect().then(ble=>{
 *
 *  ble.startDiscoverServices("a-b-c-d-e", ...)
 *   ...
 * });
 *
 * ...
 * ble.getService("a-b-c-d-e").startDiscoverCharacteristics("1-2-3-4-5",...)
 *
 * ...
 * const charac = ble.getService('...').getCharacteristic('...')
 * charac.setNotify().then(characteristic=>{}).catch(err=>{});
 * charac.read().then(characteristic=>{characteristic.value ... }).catch(err=>{});
 * charac.write().then(characteristic=>{}).catch(err=>{})
 *
 * ...
 *
 * ble.disconnect()
 *
 */
import native, { buildEvents, Properties } from '../../native';
import { IBluetoothService } from './CoreBluetooth';
import Bluetooth, { getBluetoothUUID128 } from './index';
import RootDevice from '../BasicDevice';
import { report } from "../../decorator/ReportDecorator";
// import Host from '../../Host';
/**
 *
 * 蓝牙组件基本接口,主要提供了蓝牙设备的基本属性，蓝牙设备的基本操作，和蓝牙设备事件等功能。
 *
 */
//  @native begin
const mac_uuid_for_ios = native.isIOS ? new Map() : null;
const { bluetoothDevices } = native.LocalCache;
export function setMacUuid(key, value) {
    value && mac_uuid_for_ios.set(key, value);
}
export function getMacUuid() {
    return mac_uuid_for_ios;
}
function hex2a(hexstring) {
    var hex = hexstring.toString();
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
// @native end
/**
 * 基础蓝牙设操作类
 * @interface
 */
export class IBluetooth {
    /**
     * 是否 BLE 蓝牙。如果不是，则是经典蓝牙
     * @member
     * @type {boolean}
     * @readonly
     */
    get isBLE() {
         return  true
    }
    /**
     * 蓝牙设备的 mac 地址
     * @member
     * @type {string}
     * @readonly
     *
     */
    get mac() {
         return  ""
    }
    /**
     * 蓝牙设备的 UUID
     * @member
     * @type {string}
     * @readonly
     *
     */
    get UUID() {
         return  ""
    }
    /**
     * 蓝牙是否已经连接
     * @member
     * @type {boolean}
     * @readonly
     *
     */
    get isConnected() {
         return  false
    }
    /**
     * 蓝牙是否处于连接中
     * @since 10004
     * @member
     * @type {boolean}
     * @readonly
     *
     */
    get isConnecting() {
         return  false
    }
    /**
     * 打开蓝牙链接. option参数peripheralID为iOS 平台的可选参数，因为iOS平台无法获取普通 BLE 蓝牙设备的 Mac  
     * peripheralID 可通过 startScan（）搜索周边蓝牙设备获取（如设备OTA中，设备固件切换，无小米蓝牙协议相关服务时需建立连接），或通过retrievePeripheralsWithServicesForIOS（）搜索已连接设备获取（如可穿戴长连接设备，无法发送 mibeacon）  
     * 建立连接后，SDK 会用 peripheralID 充当 Mac 地址  
     * error code :  
     * 
     * |code|desc|
     * |:-:|---|
     * | 0|成功|
     * |-1|请求失败|
     * |-2|请求取消哦|
     * |-3|参数异常|
     * |-4|蓝牙不支持|
     * |-5|蓝牙已关闭|
     * |-6|连接不可用|
     * |-7|超时|
     * |-10|token失效|
     * |-11|请求过于频繁|
     * |-12|配置未准备|
     * |-13|请求中|
     * |-14|请求被拒绝|
     * |-15|未知异常|
     * |-16|安全芯片：设备已经被重置，没有注册的Key信息，需要用户重新绑定|
     * |-17|安全芯片：设备已经被绑定，需要用户解除绑定并且按设备的复位键清除绑定|
     * |-18|安全芯片：分享的钥匙已过期|
     * |-19|安全芯片：共享登录时没有获取到共享的Key|
     * |-20|安全芯片：注册时验证设备返回的证书和设备签名失败|
     * |-21|安全芯片：Owner登录时解析设备返回的证书和签名失败|
     * |-22|安全芯片：Owner登录时设备返回失败|
     * |-23|安全芯片：共享用户登录时解析设备返回的证书和签名失败|
     * |-24|安全芯片：共享用户登录时设备返回失败|
     * |-25|安全芯片：共享用户登录时获取SharedKeyId为空|
     * |-26|安全芯片：Owner登录时绑定LTMK到服务器失败|
     * |-27|连接设备过程中，Notify操作失败|
     * |-28|数据传输过程中，数据发送失败|
     * |-29|普通安全：注册时获取did失败|
     * |-30|普通安全：注册时绑定did失败|
     * |-31|普通安全：登录时验证设备返回的token失败|
     * |-32|蓝牙连接过程中收到连接断开的广播|
     * |-33|安全芯片：绑定的时候需要用户在设备输入配对码|
     * |-34|安全芯片：绑定时设备输入的配对码失败|
     * |-35|安全芯片：绑定时配对码过期|
     * |-36|安全芯片：绑定时获取固件版本号失败|
     * |-37|安全芯片：绑定时当前app不支持固件的版本，需要提示用户升级app|
     * |-38|安全芯片：从服务端同步到加密的LTMK，解密的时候pincode为空|
     * |-39|蓝牙Mesh绑定过程中，服务端校验设备证书失败|
     * |-40|蓝牙Mesh绑定过程中，服务端校验设备签名失败|
     * |-41|蓝牙Mesh绑定过程中，设备校验服务端证书失败|
     * |-42|蓝牙Mesh绑定过程中，设备校验服务端签名失败|
     * |-43|蓝牙Mesh绑定过程中，设备校验服务端公钥失败|
     * |-44|蓝牙Mesh绑定过程中，获取Mesh配置信息失败|
     * |-45|蓝牙Mesh绑定过程中，给服务端发送Mesh配置结果时失败|
     *   
     * 蓝牙设备类型（parameter type)  
     * 
     * | type | description |
     * | :-:  | --- |
     * | -1   | 自动判断 |
     * |  0   | 普通小米蓝牙协议设备 |
     * |  1   | 安全芯片小米蓝牙设备（比如锁类产品） |
     * |  2   | 分享的安全芯片小米蓝牙设备 |
     * |  3   | 普通的BLE蓝牙设备(无 mibeacon，无小米 FE95 service) |
     * |  4   | Standard Auth 标准蓝牙认证协议(通常2019.10.1之后上线的新设备，使用的都是该蓝牙协议，具体详情可以与设备端开发沟通) |
     * |  5   | Mesh设备 |
     *   
     * @method
     * @returns {Promise<IBluetooth>}
     * @param {int} type -蓝牙设备类型 详情见上表(蓝牙设备类型)
     * @param {json} option -附加参数, 格式 {timeout:12000, peripheralID:"..."}, timeout的单位为毫秒, peripheralID是iOS平台参数
     *
     * @example
     *
     * Device.getBluetoothLE()
     *       .connect(3, {peripheralID:"1-a-b-3-c", timeout:12000})
     *       .then(ble=>{
     *          ...
     *       })
     *       .catch(err=>{
     *          ...
     *       });
     *
     */
    @report
    connect(type = -1, option = 0) {
         return Promise.resolve(this);
    }
    /**
     * 读取 RSSI
     * @method
     * @returns {Promise<*>}
     *
     */
    @report
    readRSSI() {
         return Promise.resolve(null);
    }
    /**
     * 关闭链接 **注意小米协议的蓝牙设备，退出插件的时候，一定要调用此方法，关闭蓝牙连接，否则下次打开插件的时候，会提示蓝牙无法连接**
     * @method
     * @param {int} delay -延迟时长(毫秒)
     *
     */
    @report
    disconnect(delay = 0) {
    }
    /**
     * 获取当前连接设备写操作每包最大长度
     * 注：有开发者反馈该系统接口在 iOS 上并不完全准确，不可过于依赖，以实际测试为准。（比如，charac.write()写入10byte成功，写入11byte失败，则max为10）
     * 注：返回值单位为 bit，注意换算，8 bit 为 1 byte，两字符 hexString 长度为 1 byte，如 “FF”
     * @method
     * @param {int} type - 0 代表 writeWithResponse, 1 代表 writeWithoutResponse，理论上结果是一样的。
     * @return {Promise<number>} 最大长度
     *        resolve: iOS时，返回系统返回的长度，Android返回160bit
     *        reject：iOS设备未连接会reject connect the device first，Android 不会走reject
     */
    @report
    maximumWriteValueLength(type = 0) {
         return Promise.resolve(null);
    }
    /**
     * 
     * 更新版本号，蓝牙的版本号 connect 之后才能查看。
     * @param {boolean} isFromlocal 10028版本开始支持。是否本地读取。仅限iOS，是否直接从设备读取版本号，默认为否，从服务端读取版本号，如果出现升级/降级时版本号错误的情况，此处请传true。
     * 注意：此属性对Android无效，Android默认本地读取。
     * 注意：如果从本地读取的版本号错误，说明版本号在固件端时加密的
     * @param {boolean} isCrypto 10028版本开始支持。版本号是否是加密的,默认没加密。如果读出来的数据，是乱码的，请将isCrypto设置为true，然后使用Device.getBluetoothLE().securityLock.decryptMessageWithToken(version)解密，如果读出来的为hexstring，则需要将hexstring转化为普通的string，如果还是不对，那就说明固件端自己做了加密，需要把这个数据再进行解密一次，再转string。
     * 
     * @example 正常情况，如果返回的是hexstring，则需要将hexstring转化为普通的string
     * Device.getBluetoothLE().getVersion().then()
     * 
     * @example 加密情况
     * 
     * function hexCharCodeToStr(hexCharCodeStr) {
     *  var trimedStr = hexCharCodeStr.trim();
     *  var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x"?trimedStr.substr(2):trimedStr;
     *  var len = rawStr.length;
     *   if (len % 2 !== 0) {
     *      alert("Illegal Format ASCII Code!");
     *      return "";
     *   }
     *   var curCharCode;
     *   var resultStr = [];
     *   for (var i = 0; i < len; i = i + 2) {
     *      curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
     *      resultStr.push(String.fromCharCode(curCharCode));
     *   }
     *   return resultStr.join("");
     *  }
     * 
     * Device.getBluetoothLE().getVersion(true, true).then(version => {
     *   var data = Device.getBluetoothLE().securityLock.decryptMessageWithToken(version).then(data => {
     *       let lastVersion = hexCharCodeToStr(data.result);
     *       console.log("设备版本为：" + lastVersion);
     *    })
     * })
     * 
     * @return {Promise<any>} 
     *      resolve：如果能正常读取成功，一般为：1.0.2等类似样式的string，如果是加密的且使用example里面的方法并不能获取解密后的：请咨询你们的固件工程师，让他们提供解密方法。
     *      reject：{code: xxx, message: xxx}100:设备正在连接中，请连接成功后重试  101:蓝牙外设设备不能存在  102:无法发现版本信息对应的服务或者特征值 103:当前设备没有版本号，无法读取
     */
    @report
    getVersion(isFromlocal = false, isCrypto = false) {
         return Promise.resolve(null);
    }
}
/**
 * 蓝牙事件名集合
 * @namespace BluetoothEvent
 * @example
 *    import {BluetoothEvent} from 'miot'
 *    const subscription = BluetoothEvent.bluetoothServiceDiscovered.addListener(
 *       (bluetooth, ...services)=>{
 *          ...
 *       }
 *     )
 *    ...
 *    subscription.remove()
 *    ...
 *
 */
export const BluetoothEvent = {
    /**
     * 蓝牙连接状态改变的事件
     * @event
     * @param {IBluetooth} bluetooh -发生连接打开关闭事件的蓝牙设备
     * @param {boolean} isConnected -当前连接状态
     *
     */
    bluetoothConnectionStatusChanged: {
    },
    /**
     * 蓝牙设备扫描发现事件
     * @event
     * @param {json} bluetoohData --扫描发现的蓝牙设备数据
     *
     */
    bluetoothDeviceDiscovered: {
    },
    /**
     * 蓝牙设备扫描发现失败事件
     * @event
     * @param {*} error -错误信息
     *
     */
    bluetoothDeviceDiscoverFailed: {
    },
    /**
     * 蓝牙服务发现事件
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {...IBluetoothService} service -发现的蓝牙服务
     *
     */
    bluetoothSeviceDiscovered: {
    },
    /**
     * 蓝牙服务发现失败事件
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {*} error -错误信息
     *
     */
    bluetoothSeviceDiscoverFailed: {
    },
    /**
     * 蓝牙特征发现事件
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {IBluetoothService} service -蓝牙特征
     * @param {...IBluetoothCharacteristic} characters -发现的蓝牙特征
     *
     */
    bluetoothCharacteristicDiscovered: {
    },
    /**
     * 蓝牙特征发现失败事件
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {IBluetoothService} service -蓝牙特征
     * @param {*} error -错误信息
     *
     */
    bluetoothCharacteristicDiscoverFailed: {
    },
    /**
     * 蓝牙特征值变更事件
     * notify, read
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {IBluetoothService} service -蓝牙服务
     * @param {IBluetoothCharacteristic} character -蓝牙特征
     * @param {*} value -数值
     *
     */
    bluetoothCharacteristicValueChanged: {
    },
    /**
     * 蓝牙开关状态变更事件
     * @event
     * @type {event}
     * @param {boolean} isEnabled -当前状态
     *
     */
    bluetoothStatusChanged: {
    }
};
buildEvents(BluetoothEvent);