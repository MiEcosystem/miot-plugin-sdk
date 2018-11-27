/**
 * @export
 * @module miot/Bluetooth
 * @description 蓝牙设备操作类
 *
 * @example
 *
 * import {Device} from 'miot'
 *
 * const bluetooth = Device.bluetooth;
 * bluetooth.connect().then(bluetooth=>{
 *
 * });
 *  bluetooth.startDiscoverServices("a-b-c-d-e", ...)
 *
 * bluetooth.getService("a-b-c-d-e").startDiscoverCharacteristics("1-2-3-4-5",...)
 *
 * bluetooth.getService('...').getCharacteristic('...')
 *                      .setNotify(true)
 *                      .read(characteristic=>{
 *                          characteristic.value ...
 *                      })
 *                      .write(value, ok=>{})
 *
 * bluetooh.getService('a-b-c').getCharacteristic('1-2-3')
 *      .read().then(value=>{}).catch(err=>{...})
 *
 *
 *
 * bluetooth.disconnect()
 *
 */
import RootDevice from './Device'
/**
 * 蓝牙特征值
 * @interface
 *
 */
export class IBluetoothCharacteristic {
    /**
     * 是否已经被发现
     * @member
     * @type {boolean}
     * @readonly
     *
     */
    get isDiscovered() {
         return  false
    }
    /**
     * 数值是否已经加载, 为 true 时,本类才能读到正确的 value
     * @member
     * @type {boolean}
     * @readonly
     *
     */
    get isValueLoaded() {
         return  false
    }
    /**
     * 特征值的 UUID
     * @member
     * @type {string}
     * @readonly
     *
     */
    get UUID() {
         return  ""
    }
    /**
     * 数值, 配合 isValueLoaded 使用
     * @member
     * @type {*}
     * @readonly
     * @example
     *
     *   ...
     *   if(charateristic.isValueLoaded){
     *       const val = characteristic.value;
     *       ...
     *   }
     *   ...
     *
     */
    get value() {
         return  null
    }
    /**
     * 读取蓝牙数据
     * @method
     * @returns {Promise<IBluetoothCharacteristic>}
     *
     *
     */
    read() {
         return Promise.resolve(null);
    }
    /**
     * 写数据
     * @method
     * @param {*} value
     * @returns {Promise<IBluetoothCharacteristic>}
     *
     */
    write(value) {
         return Promise.resolve(null);
    }
    /**
     * 直接写数据
     * @method
     * @param {*} value
     * @returns {Promise<IBluetoothCharacteristic>}
     *
     */
    writeWithoutResponse(value) {
         return Promise.resolve(null);
    }
    /**
     * 设置数值变化监听开关
     * @method
     * @param {boolean} flag -true 打开监听, false 则关闭监听
     * @returns {Promise<IBluetoothCharacteristic>}
     *
     */
    setNotify(flag) {
         return Promise.resolve(null);
    }
}
/**
 * 蓝牙服务
 * @interface
 *
 */
export class IBluetoothService {
    /**
     * 蓝牙服务 UUID
     * @member
     * @type {string}
     * @readonly
     *
     */
    get UUID() {
         return  ""
    }
    /**
     * 蓝牙服务是否已被发现
     * @member
     * @type {boolean}
     * @readonly
     *
     */
    get isDiscovered() {
         return  false
    }
    /**
     * 发现蓝牙特征
     * @method
     * @param {...string} characteristicUUIDs -特征的 UUID
     * @returns {boolean}
     *
     */
    startDiscoverCharacteristics(...characteristicUUIDs) {
         return false
    }
    /**
     * 获取蓝牙特征
     * @member
     * @param {string} characteristicUUID
     * @returns {IBluetoothCharacteristic}
     *
     */
    getCharacteristic(characteristicUUID) {
         return null
    }
}
/**
 * 蓝牙锁相关
 * @interface
 *
 */
export class IBluetoothLock {
    /**
     * 支持小米加密芯片的蓝牙设备，开关蓝牙锁
     * @method
     * @param {int} cmd 操作命令可传入 0 ，1 ，2三个 int 值，分别代表 开锁，上锁，反锁
     * @returns {Promise<string>}
     */
    toggle(cmd) {
         return Promise.resolve(null);
    }
    /**
     * 支持小米加密芯片的蓝牙设备，在被分享的设备中，调用此方法，可判断分享的电子钥匙是否过期
     * @method
     * @returns {Promise<string>}
     */
    isShareKeyValid() {
         return Promise.resolve(null);
    }
    /**
     * 支持小米加密芯片的蓝牙设备，获取一次性密码
     * @method
     * @param {int} interval 时间间隔，单位为秒，类型为 number，传入 1 到 60 的整数
     * @param {int} digits 密码位数，类型为 number，传入 6 到 8 的整数
     * @returns {Promise<int[]>}
     */
    getOneTimePassword(interval,digits) {
         return Promise.resolve(null);
    }
    /**
     * 支持小米加密芯片的蓝牙设备，使用此方法将明文加密为密文后，可发送给设备
     * @method
     * @param {string} message 明文
     * @returns {Promise<string>}
     */
    encryptMessage(message) {
         return Promise.resolve(null);
    }
    /**
     * 支持小米加密芯片的蓝牙设备，使用此方法将明文加密为密文后，可发送给设备
     * @method
     * @param {string} encrypted 密文
     * @returns {Promise<string>}
     */
    decryptMessage(encrypted) {
         return Promise.resolve(null);
    }
}
/**
 *
 * 蓝牙设备
 * @interface
 *
 *
 */
export class IBluetooth {
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
     * 蓝牙锁相关操作
     * @returns {IBluetoothLock}
     *
     */
    get securityLock() {
         return false
    }
    /**
     *获取蓝牙服务
     * @member
     * @param {string} serviceUUID
     * @returns {IBluetoothService}
     *
     */
    getService(serviceUUID) {
         return null
    }
    /**
     * 发现服务
     * @method
     * @param {...string} serviceUUIDs
     * @returns {boolean}
     *
     */
    startDiscoverServices(...serviceUUIDs) {
         return false
    }
    /**
     * 打开蓝牙链接
     *
     * @method
     * @returns {Promise<IBluetooth>}
     * @param {int} type android插件链接蓝牙类型 -1 自动判断，0 小米蓝牙协议设备，1 自己的安全芯片设备，2 分享的安全芯片设备，3 普通的蓝牙协议
     *
     */
    connect(type) {
         return Promise.resolve(this);
    }
    /**
     * 读取 RSSI
     * @method
     * @returns {Promise<*>}
     *
     */
    readRSSI() {
         return Promise.resolve(null);
    }
    /**
     * 关闭链接
     * @method
     * @param {int} delay -延迟时长
     *
     */
    disconnect(delay = 0) {
    }
}
 const bluetoothDevices={}
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
     * 蓝牙断开连接
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
     * @param {...IBluetooth} bluetooh -扫描发现的蓝牙设备
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
/**
 * @export
 */
export default {
    /**
     * 创建蓝牙设备, 但目前只支持RootDevice 的 mac 地址
     * @method
     * @param {string} mac
     * @returns {IBluetooth}
     * @example
     *   import Bluetooth from 'miot/Bluetooth'
     *   const bludtooth = Bluetooth.createBluetooth("a.b.c...")
     */
    createBluetooth(mac) {
         return null
    },
    /**
     * 判断蓝牙是否开放
     * @static
     * @returns {Promise<boolean>}
     */
    checkBluetoothIsEnabled() {
         return Promise.resolve(true);
    },
    /**
     * 开始扫描蓝牙设备
     * @method
     * @param {int} durationInMillis - 扫描时长
     * @param {...string} serviceUUIDs - 指定扫描, 为空时扫描全部
     * @returns {void}
     *
     * @example
     *      import Bluetooth from 'miot/Bluetooth'
     *      Bluetooth.startScan(30, ...)
     */
    startScan(durationInMillis, ...serviceUUIDs) {
    },
    /**
     * 停止扫描蓝牙设备
     * @method
     * @returns {void}
     *
     */
    stopScan() {
    },
    /**
     * 加载本地蓝牙设备
     * @method
     * @param {...string} UUIDs - deviceUUID
     * @returns {Promise<Map<uuid, Bluetooth>>}
     *
     * @example
     *   ...
     *   Bluetooth.retrievePeripheralsForIOS({services:["deviceUUID1","deviceUUID2","deviceUUID3"]})
     *   Bluetooth.retrievePeripheralsForIOS({devices:["deviceUUID1","deviceUUID2","deviceUUID3"]})
     *   ...
     *   Bluetooth.retrievePeripheralsForIOS("deviceUUID1","deviceUUID2","deviceUUID3",...)
     *
     */
    retrievePeripheralsForIOS(...UUIDs) {
         return Promise.resolve(null);
    },
    /**
     * 打开蓝牙
     * @static
     * @param {boolean} silence
     * @returns void
     *
     */
    enableBluetoothForAndroid(silence = false) {
    },
    /**
     * 判断当前设备是否通过蓝牙网关扫描到了
     * @static
     * @returns {Promise<boolean>}
     */
    isBleGatewayConnected() {
         return Promise.resolve(true);
    },
};