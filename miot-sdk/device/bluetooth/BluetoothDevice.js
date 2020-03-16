/**
 * @export public
 * @doc_name 蓝牙模块
 * @doc_index 2
 * @doc_directory bluetooth
 * @module miot/device/bluetooh
 * @description 蓝牙设备操作类
 * 蓝牙设备的开发，详见：https://iot.mi.com/new/doc/05-%E7%B1%B3%E5%AE%B6%E6%89%A9%E5%B1%95%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/04-%E8%AE%BE%E5%A4%87%E7%AE%A1%E7%90%86/03-%E6%8C%89%E8%AE%BE%E5%A4%87/02-%E8%93%9D%E7%89%99%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/02-%E8%93%9D%E7%89%99%E8%AE%BE%E5%A4%87%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97.html
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
import { getBluetoothUUID128 } from './index';
import RootDevice from '../BasicDevice';
import {report} from "../../decorator/ReportDecorator";
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
        //@native => true
        return !Properties.of(this).isClassic;
    }
    /**
     * 蓝牙设备的 mac 地址
     * @member
     * @type {string}
     * @readonly
     *
     */
    get mac() {
        //@native => ""
        return (Properties.of(this).fakemac || {}).mac;
    }
    /**
     * 蓝牙设备的 UUID
     * @member
     * @type {string}
     * @readonly
     *
     */
    get UUID() {
        //@native => ""
        return (Properties.of(this).fakemac || {}).deviceUUID;
    }
    /**
     * 蓝牙是否已经连接
     * @member
     * @type {boolean}
     * @readonly
     *
     */
    get isConnected() {
        //@native => false
        return Properties.of(this).isConnected;
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
        //@native => false
        return Properties.of(this)._connecting;
    }
    /**
     * 打开蓝牙链接. option参数peripheralID为iOS 平台的可选参数，因为iOS平台无法获取普通 BLE 蓝牙设备的 Mac
     * peripheralID 可通过 startScan（）搜索周边蓝牙设备获取（如设备OTA中，设备固件切换，无小米蓝牙协议相关服务时需建立连接），或通过retrievePeripheralsWithServicesForIOS（）搜索已连接设备获取（如可穿戴长连接设备，无法发送 mibeacon）
     * 建立连接后，SDK 会用 peripheralID 充当 Mac 地址
     * error code :
     * 0 - 成功
     * -1: 请求失败
     * -2: 请求取消哦
     * -3: 参数异常
     * -4: 蓝牙不支持
     * -5: 蓝牙已关闭
     * -6: 连接不可用
     * -7: 超时
     * -10: token失效
     * -11: 请求过于频繁
     * -12: 配置未准备
     * -13: 请求中
     * -14: 请求被拒绝
     * -15: 未知异常
     * -16: 安全芯片：设备已经被重置，没有注册的Key信息，需要用户重新绑定
     * -17: 安全芯片：设备已经被绑定，需要用户解除绑定并且按设备的复位键清除绑定
     * -18: 安全芯片：分享的钥匙已过期
     * -19: 安全芯片：共享登录时没有获取到共享的Key
     * -20: 安全芯片：注册时验证设备返回的证书和设备签名失败
     * -21: 安全芯片：Owner登录时解析设备返回的证书和签名失败
     * -22: 安全芯片：Owner登录时设备返回失败
     * -23: 安全芯片：共享用户登录时解析设备返回的证书和签名失败
     * -24: 安全芯片：共享用户登录时设备返回失败
     * -25: 安全芯片：共享用户登录时获取SharedKeyId为空
     * -26: 安全芯片：Owner登录时绑定LTMK到服务器失败
     * -27: 连接设备过程中，Notify操作失败
     * -28: 数据传输过程中，数据发送失败
     * -29: 普通安全：注册时获取did失败
     * -30: 普通安全：注册时绑定did失败
     * -31: 普通安全：登录时验证设备返回的token失败
     * -32: 蓝牙连接过程中收到连接断开的广播
     * -33: 安全芯片：绑定的时候需要用户在设备输入配对码
     * -34: 安全芯片：绑定时设备输入的配对码失败
     * -35: 安全芯片：绑定时配对码过期
     * -36: 安全芯片：绑定时获取固件版本号失败
     * -37: 安全芯片：绑定时当前app不支持固件的版本，需要提示用户升级app
     * -38: 安全芯片：从服务端同步到加密的LTMK，解密的时候pincode为空
     * -39: 蓝牙Mesh绑定过程中，服务端校验设备证书失败
     * -40: 蓝牙Mesh绑定过程中，服务端校验设备签名失败
     * -41: 蓝牙Mesh绑定过程中，设备校验服务端证书失败
     * -42: 蓝牙Mesh绑定过程中，设备校验服务端签名失败
     * -43: 蓝牙Mesh绑定过程中，设备校验服务端公钥失败
     * -44: 蓝牙Mesh绑定过程中，获取Mesh配置信息失败
     * -45: 蓝牙Mesh绑定过程中，给服务端发送Mesh配置结果时失败
     * @method
     * @returns {Promise<IBluetooth>}
     * @param {int} type -蓝牙设备类型 -1: 自动判断，0: 普通小米蓝牙协议设备，1: 安全芯片小米蓝牙设备（比如锁类产品），2: 分享的安全芯片小米蓝牙设备，3: 普通的BLE蓝牙设备(无 mibeacon，无小米 FE95 service)， 4: Standard Auth 标准蓝牙认证协议(通常2019.10.1之后上线的新设备，使用的都是该蓝牙协议，具体详情可以与设备端开发沟通)
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
        //@native :=> promise this
        //@mark andr done
        //@mark iOS  done
        if (!Number.isInteger(type)) {
            return Promise.reject({ code: 101, msg: "the first param type is error, param type must be an integer" })
        }
        const self = Properties.of(this);
        if (self._connecting && !native.isIOS) {
            //ios 下的connecting状态交由native管理
            return Promise.reject({ code: 100, msg: "the bluetooth is connecting now, please waiting for a moment" });
        }
        option = option || {};
        if (self.isConnected && !option.forceReconnect) {
            option.forceReconnect = self._disconnect_timeout && self._disconnect_timeout >= new Date().getTime();
            if (!option.forceReconnect) {
                return Promise.resolve(this);
            }
        }
        const { fakemac } = self;
        if (option && option.peripheralID) {
            if (!fakemac.deviceUUID) {
                fakemac.deviceUUID = option.peripheralID;
            } else if (fakemac.deviceUUID !== option.peripheralID) {
                // if (Host.isDebug) {
                //     // 不再支持option中使用 option.peripheralID 进行连接
                //     let messate = "peripheralID in option :" + option.peripheralID + " not complie with current ble uuid:" + fakemac.deviceUUID + ", peripheralID in option is no longer supported, please use Bluetooth.createBluetoothLE(peripheralID).connect() or Bluetooth.createBluetoothClassic(peripheralID).connect() instead."
                //     throw new Error(messate);
                // } else {
                //NOTE: 在当前ble对象连接另外一个uuid的外设时，创建另一个外设的uuid ble对象，避免某些用户反馈蓝牙扫描无返回等问题
                Bluetooth.createBluetoothClassic(option.peripheralID);
                // }
            }
        }
        if (mac_uuid_for_ios && !fakemac.deviceUUID) {
            if (!fakemac.mac) {
                return Promise.reject({ code: 10, msg: "invalid bluetooth on IOS" });
            }
            fakemac.deviceUUID = mac_uuid_for_ios.get(fakemac.mac);
            if (!fakemac.deviceUUID) {
                //TOFIX: 等待iOSAPP更新后开放
                // return Promise.reject({code:10, msg:"not found the bluetooth for " + fakemac.mac + "  on IOS"});
            }
        }
        self._connecting = true;
        return new Promise((resolve, reject) => {
            //data : ok=> {services:[{uuid:"...", chars:["...", "..."]} ]}
            //false: {error:100, message:""}
            const callback = (ok, data) => {
                self._connecting = false;
                self._disconnect_timeout = 0;
                if (!ok) {
                    self.isConnected = false;
                    if (native.isIOS) {
                        //统一code ios:android
                        let err_map = { 0: -6, 1: -15, 2: -7, 3: -10, 5: -1, 6: -16, 7: -18, 8: -20, 4: 0 }
                        if (data.code !== undefined) {
                            console.log(data.code)
                            if (err_map[data.code] !== undefined) {
                                data.code = err_map[data.code];
                            }
                        }
                    }
                    reject(data)
                    return;
                }
                self.isConnected = true;
                const { services } = data;
                (services || []).forEach(s => {
                    const srv = this.getService(s.uuid);
                    if (!srv) return;
                    Properties.of(srv).isDiscovered = true;
                    (s.chars || []).forEach(c => {
                        const chr = srv.getCharacteristic(c);
                        if (!chr) return;
                        Properties.of(chr).isDiscovered = true;
                    })
                })
                resolve(data);
                native.MIOTEventEmitter.emit('bluetoothSeviceDiscovered', {
                    mac: fakemac.id, foundUUIDs: (services || []).map(s => s.uuid)
                });
                (services || []).forEach(s => {
                    native.MIOTEventEmitter.emit('bluetoothCharacteristicDiscovered', {
                        mac: fakemac.id, serviceUUID: s.uuid, foundUUIDs: s.chars || []
                    });
                })
            }
            native.MIOTBluetooth.connect(fakemac.id, type, option, callback);
        });
        //@native end
    }
    /**
     * 读取 RSSI
     * @method
     * @returns {Promise<*>}
     *
     */
    @report
    readRSSI() {
        //@native :=> promise
        //@mark andr done
        //@mark iOS done
        return new Promise((resolve, reject) => {
            const { fakemac } = Properties.of(this);
            native.MIOTBluetooth.readRSSI(fakemac.id, (ok, data) => {
                if (ok) {
                    resolve(data);
                    return;
                }
                reject(data);
            });
        });
        //@native end
    }
    /**
     * 关闭链接 **注意小米协议的蓝牙设备，退出插件的时候，一定要调用此方法，关闭蓝牙连接，否则下次打开插件的时候，会提示蓝牙无法连接**
     * @method
     * @param {int} delay -延迟时长(毫秒)
     *
     */
    @report
    disconnect(delay = 0) {
        //@native begin
        //@mark andr done
        //@mark iOS done
        const self = Properties.of(this);
        if (self._connecting && !native.isIOS) {
            return false;
        }
        self._disconnect_timeout = new Date().getTime() + ((delay && delay > 0) ? delay : 0) + 1;
        native.MIOTBluetooth.disconnectDeviceWithDelay(self.fakemac.id, delay);
        return true;
        //@native end
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
        //@native :=> promise
        return new Promise((resolve, reject) => {
            if (native.isIOS) {
                native.MIOTBluetooth.maximumWriteValueLengthForType(type, (ok, result) => {
                    if (ok) {
                        resolve(result);
                    }
                    else {
                        reject(result);
                    }
                });
            }
            else {
                console.log("has no real methord,return default value 20 bytes.");
                resolve(20 * 8);
            }
        });
        //@native end
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
        //@native :=> promise
        return new Promise((resolve, reject) => {
            function setDeviceVersion(data) {
                const { mac } = Properties.of(this).fakemac || {};
                let device = RootDevice;
                let props = Properties.of(device);
                if (props.mac != mac) {
                    device = (props._subDevices || []).find(d => mac == d.mac);
                }
                if (device) {
                    device.version = data;
                }
            }
            const { fakemac } = Properties.of(this);
            if (native.isIOS) {
                if (!isFromlocal) {
                    native.MIOTDevice.getVersion(false, (ok, data) => {
                        if (ok) {
                            setDeviceVersion.call(this, data);
                            resolve(data);
                            return;
                        }
                        reject(data);
                    });
                } else {
                    native.MIOTBluetooth.readHexStringWithCallback(fakemac.id, '0004', 'FE95', (ok, data) => {
                        if (!isCrypto) {
                            function hex2a(hexstring) {
                                var hex = hexstring.toString();
                                var str = '';
                                for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
                                    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                                return str;
                            }
                            data = hex2a(data)
                        }
                        if (ok) {
                            setDeviceVersion.call(this, data);
                            resolve(data);
                            return;
                        }
                        reject(data);
                    });
                }
            } else {
                native.MIOTBluetooth.getVersion(fakemac.id, false, (ok, data) => {
                    if (ok) {
                        setDeviceVersion.call(this, data);
                        resolve(data);
                        return;
                    }
                    reject(data);
                });
            }
        });
        //@native end
    }
    //@native begin
    //特别注意, 真正的实现都放在这里
    get securityLock() {
        const { securityChip } = Properties.of(this);
        return securityChip;
    }
    @report
    getService(serviceUUID) {
        const fullUUID = getBluetoothUUID128(serviceUUID);
        if (!fullUUID) {
            return null;
        }
        const { services, fakemac } = Properties.of(this);
        let service = services.get(fullUUID);
        if (!service) {
            service = new IBluetoothService();
            Properties.init(service, {
                fakemac,
                serviceUUID, fullUUID,
                characteristics: new Map()
            })
            services.set(fullUUID, service);
        }
        return service;
    }
    @report
    startDiscoverServices(...serviceUUIDs) {
        if (!this.isConnected) {
            return false;
        }
        const notFound = serviceUUIDs;//serviceUUIDs.filter(uuid => !this.getService(uuid).isDiscovered);
        const { fakemac } = Properties.of(this);
        native.MIOTBluetooth.discoverServices(fakemac.id, notFound)
        return true;
    }
    //@native end
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
        //@native begin
        //@mark andr done
        //uuid 为iOS单独添加
        forever: emitter => ({ mac, isConnected, uuid }) => {
            // if (Host.isDebug) {
            console.log("Bluetooth", "bluetoothConnectionStatusChanged", mac);
            // }
            let bluetooth = bluetoothDevices.get(mac);
            if (!bluetooth) {
                return;
            }
            const ble = Properties.of(bluetooth);
            ble._disconnect_timeout = 0;
            if (uuid && uuid !== '') {
                //如果iOS端传递了uuid参数
                ble.deviceUUID = uuid
            }
            if (ble.isConnected !== isConnected) {//防止重复回调，android 连接状态是 false 会多次回调，但是 java 中没有保存链接状态
                ble.isConnected = isConnected;
                //reset status of bluetoothLE
                if (!isConnected) {
                    ble.services.forEach(s => {
                        const srv = Properties.of(s);
                        srv.isDiscovered = false;
                        srv.characteristics.forEach(c => {
                            Properties.of(c).isDiscovered = false;
                        });
                    });
                }
                emitter.emit(bluetooth, isConnected);
            }
        }
        //@native end
    },
    /**
     * 蓝牙设备扫描发现事件
     * @event
     * @param {json} bluetoohData --扫描发现的蓝牙设备数据
     *
     */
    bluetoothDeviceDiscovered: {
        //@native begin
        //@mark andr done
        forever: emitter => (data) => {
            // if (Host.isDebug) {
            console.log("Bluetooth", "bluetoothDeviceDiscovered", data);
            // }
            if (mac_uuid_for_ios) {
                if (data.uuid) {
                    data.uuid = data.uuid.toUpperCase();
                }
                if (data.mac && data.uuid) {
                    mac_uuid_for_ios.set(data.mac, data.uuid);
                    let ble = bluetoothDevices.get(data.mac);
                    if (ble) {
                        const { fakemac } = Properties.of(ble);
                        if (fakemac) {
                            fakemac.deviceUUID = data.uuid;
                        }
                        bluetoothDevices.set(data.uuid, ble);
                    }
                }
            }
            // let bluetooth = bluetoothDevices.get(mac);
            // if (!bluetooth) {
            //     emitter.emit(bluetooth, mac);
            //     return;
            // }
            emitter.emit(data);
        }
        //@native end
    },
    /**
     * 蓝牙设备扫描发现失败事件
     * @event
     * @param {*} error -错误信息
     *
     */
    bluetoothDeviceDiscoverFailed: {
        //@native begin
        //@mark andr done
        always: emitter => ({ error }) => {
            // if (Host.isDebug) {
            console.log("Bluetooth", "bluetoothDeviceDiscoverFailed", error);
            // }
            emitter.emit(error);
        }
        //@native end
    },
    /**
     * 蓝牙服务发现事件
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {...IBluetoothService} service -发现的蓝牙服务
     *
     */
    bluetoothSeviceDiscovered: {
        //@native begin
        //@mark andr done
        forever: emitter => ({ mac, foundUUIDs }) => {
            // if (Host.isDebug) {
            console.log("Bluetooth", "bluetoothSeviceDiscovered", mac, foundUUIDs);
            // }
            let bluetooth = bluetoothDevices.get(mac);
            if (!bluetooth) {
                return;
            }
            const services = (foundUUIDs || []).map(uuid => {
                const service = bluetooth.getService(uuid);
                Properties.of(service).isDiscovered = true;
                return service;
            })
            emitter.emit(bluetooth, services)
        }
        //@native end
    },
    /**
     * 蓝牙服务发现失败事件
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {*} error -错误信息
     *
     */
    bluetoothSeviceDiscoverFailed: {
        //@native begin
        //@mark andr done
        always: emitter => ({ mac, error }) => {
            // if (Host.isDebug) {
            console.log("Bluetooth", "bluetoothSeviceDiscoverFailed", mac);
            // }
            let bluetooth = bluetoothDevices.get(mac);
            if (!bluetooth) {
                return;
            }
            emitter.emit(bluetooh, error);
        }
        //@native end
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
        //@native begin
        //@mark andr done
        forever: emitter => ({ mac, serviceUUID, foundUUIDs }) => {
            // if (Host.isDebug) {
            console.log("Bluetooth", "bluetoothCharacteristicDiscovered", mac, foundUUIDs);
            // }
            let bluetooth = bluetoothDevices.get(mac);
            if (!bluetooth) {
                return;
            }
            const service = bluetooth.getService(serviceUUID);
            if (!service.isDiscovered) {
                return;
            }
            const characters = (foundUUIDs || []).map(uuid => {
                const character = service.getCharacteristic(uuid)
                Properties.of(character).isDiscovered = true;
                return character
            })
            emitter.emit(bluetooth, service, characters);
        }
        //@native end
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
        //@native begin
        //@mark andr done
        always: emitter => ({ mac, serviceUUID, error }) => {
            // if (Host.isDebug) {
            console.log("Bluetooth", "bluetoothCharacteristicDiscoverFailed", mac);
            // }
            let bluetooth = bluetoothDevices.get(mac);
            if (!bluetooth) {
                return;
            }
            const service = bluetooth.getService(serviceUUID);
            if (!service.isDiscovered) {
                return;
            }
            emitter.emit(bluetooh, service, error);
        }
        //@native end
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
        //@native begin
        //@mark andr done
        forever: emitter => ({ mac, serviceUUID, characteristicUUID, value }) => {
            // if (Host.isDebug) {
            console.log("Bluetooth", "bluetoothCharacteristicValueChanged", mac);
            // }
            let bluetooth = bluetoothDevices.get(mac);
            if (!bluetooth) {
                return;
            }
            const service = bluetooth.getService(serviceUUID);
            if (!service.isDiscovered) {
                return;
            }
            const character = service.getCharacteristic(characteristicUUID);
            if (!character.isDiscovered) {
                return;
            }
            const props = Properties.of(character);
            props.isValueLoaded = true;
            props.value = value;
            emitter.emit(bluetooth, service, character, value);
        }
        //@native end
    },
    /**
     * 蓝牙开关状态变更事件
     * @event
     * @type {event}
     * @param {boolean} isEnabled -当前状态
     *
     */
    bluetoothStatusChanged: {
        //@native begin
        //@mark andr done
        forever: emitter => ({ isEnabled }) => {
            // if (Host.isDebug) {
            console.log("Bluetooth", "bluetoothStatusChanged", isEnabled);
            // }
            emitter.emit(isEnabled);
        }
        //@native end
    }
};
buildEvents(BluetoothEvent);