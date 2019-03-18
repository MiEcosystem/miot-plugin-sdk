/**
 * @export
 * @module miot/Bluetooth
 * @description 蓝牙设备操作类
 *
 * @example
 *
 * import {Device} from 'miot'
 *
 * const ble = Device.getBluetoothLE();
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
import RootDevice from './Device'
import Host from './Host'
export const getBluetoothUUID128 = id => {
    if(!id || id=='')return null;
    id = id.toUpperCase();
    if(id.length > 8)return id;
    switch(id.length){
        case 2: id = "000000" + id;break;
        case 4: id = "0000" + id;break;
        case 6: id = "00" + id;break;
        case 8: break;
        default:
            return null;
    }
    return id + "-0000-1000-8000-00805F9B34FB";
}
/**
 * BLE蓝牙特征值
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
     * 对应 writeWithResponse
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
     * 对应 writeWithoutResponse
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
 * BLE蓝牙服务类
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
     * @param {int} timeout 毫秒 蓝牙未响应的超时时间
     * @returns {Promise<IBluetoothLock>}
     * @example
     * import {Bluetooth} from 'miot'
     * ...
     * Bluetooth.createBluetoothLE(...).connect(...).then(device => {
     *  device.securityLock().toggle(0,5000)
     *      .then(lock => {console.log('toggle success')})
     *      .catch(err => {console.log('toggle failed'})
     * })
     * ...
     */
    toggle(cmd,timeout) {
         return Promise.resolve(null);
    }
    /**
     * 支持小米加密芯片的蓝牙设备，在被分享的设备中，调用此方法，可判断分享的电子钥匙是否有效
     * @method
     * @returns {Promise<IBluetoothLock>}
     * @example
     * import {Bluetooth} from 'miot'
     * ...
     * Bluetooth.createBluetoothLE(...).securityLock().isShareKeyValid()
     *  .then(lock => {console.log('ShareKey is valid')})
     *  .catch(err => {console.log('ShareKey isn't valid'})
     * ...
     */
    isShareKeyValid() {
         return Promise.resolve(null);
    }
    /**
     * 支持小米加密芯片的蓝牙设备，获取一次性密码组
     * 假设输入 interval 为 30，则会从当日 0 点开始计算，每 30 分钟为一个刷新间隔。生成的密码在当前刷新间隔及下一个刷新间隔内有效。
     * 如当日 10:19 生成，则该组密码在 10:00 ~ 10:30（当前刷新间隔） 以及 10:30 ~ 11:00 (下一个刷新间隔) 有效。
     * 密码组中每条密码使用一次即过期。
     * 注意设备上获取当前时间（UTC，精度为秒）的准确性由设备保证，否则会有计算误差。
     * @method
     * @param {int} interval 时间间隔，单位为分钟，类型为 number，传入 10 到 60 的整数
     * @param {int} digits 密码位数，类型为 number，传入 6 到 8 的整数
     * @returns {Promise<int[]>}
     * @example
     * import {Bluetooth} from 'miot'
     * ...
     * Bluetooth.createBluetoothLE(...).securityLock().getOneTimePassword(30,6)
     *  .then(pwd => {console.log('one time password is ', pwd)})
     *  .catch(err => {console.log('get one time password failed, ', err})
     * ...
     */
    getOneTimePassword(interval,digits) {
         return Promise.resolve(null);
    }
    /**
     * 支持小米加密芯片的蓝牙设备，使用此方法将明文加密为密文后，可发送给设备
     * @method
     * @param {string} message 明文
     * @returns {Promise<string>}
     * @example
     * import {Bluetooth} from 'miot'
     * ...
     * Bluetooth.createBluetoothLE(...).securityLock().encryptMessage('message')
     *  .then(msg => {console.log('encrypted message is ', msg)})
     *  .catch(err => {console.log('encrypted message failed, ', err})
     * ...
     */
    encryptMessage(message) {
         return Promise.resolve(null);
    }
    /**
     * 支持小米加密芯片的蓝牙设备，使用此方法将明文加密为密文后，可发送给设备
     * @method
     * @param {string} encrypted 密文
     * @returns {Promise<string>}
     * @example
     * import {Bluetooth} from 'miot'
     * ...
     * Bluetooth.createBluetoothLE(...).securityLock().encryptMessage('decryptedMessage')
     *  .then(msg => {console.log('decrypt message is ', msg)})
     *  .catch(err => {console.log('decrypt message failed, ', err})
     * ...
     */
    decryptMessage(encrypted) {
         return Promise.resolve(null);
    }
}
/**
 *
 * 蓝牙组件基本接口
 * @interface
 *
 *
 */
export class IBluetooth {
    /**
     * 是否 BLE 蓝牙
     * @member
     * @type {boolean}
     * @readonly
     */
    get isBLE(){
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
     * 打开蓝牙链接. option参数peripheralID为iOS 平台的可选参数，因为iOS平台无法获取普通 BLE 蓝牙设备的 Mac
     * peripheralID 可通过 startScan（）搜索周边蓝牙设备获取（如设备OTA中，设备固件切换，无小米蓝牙协议相关服务时需建立连接），或通过retrievePeripheralsWithServicesForIOS（）搜索已连接设备获取（如可穿戴长连接设备，无法发送 mibeacon）
     * 建立连接后，SDK 会用 peripheralID 充当 Mac 地址
     *
     * @method
     * @returns {Promise<IBluetooth>}
     * @param {int} type -蓝牙设备类型 -1 自动判断，0 普通小米蓝牙协议设备，1 安全芯片小米蓝牙设备（比如锁类产品），2 分享的安全芯片小米蓝牙设备，3 普通的BLE蓝牙设备(无 mibeacon，无小米 FE95 service)
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
    connect(type=-1, option=0) {
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
     * @param {int} delay -延迟时长(毫秒)
     *
     */
    disconnect(delay = 0) {
    }
    /**
     * 获取当前连接设备写操作每包最大长度
     * 注：有开发者反馈该系统接口在 iOS 上并不完全准确，不可过于依赖，以实际测试为准
     * 注：返回值单位为 bit，注意换算，8 bit 为 1 byte，两字符 hexString 长度为 1 byte，如 “FF”
     * @method
     * @param {int} type - 0 代表 writeWithResponse, 1 代表 writeWithoutResponse
     *
     */
    maximumWriteValueLength(type = 0){
         return Promise.resolve(null);
    }
    /**
     * 更新版本号，蓝牙的版本号 connect 之后才能
     * @return {Promise<any>}
     */
    getVersion() {
         return Promise.resolve(null);
    }
}
/**
 *  BLE 蓝牙
 * @interface
 */
export class IBluetoothLE extends IBluetooth{
    /**
     * 蓝牙锁相关操作
     * @returns {IBluetoothLock}
     *
     */
    get securityLock() {
        return null;
    }
    /**
     *获取蓝牙服务
     * @member
     * @param {string} serviceUUID
     * @returns {IBluetoothService}
     *
     */
    getService(serviceUUID) {
        return null;
    }
    /**
     * 发现服务
     * @method
     * @param {...string} serviceUUIDs
     * @returns {boolean}
     *
     */
    startDiscoverServices(...serviceUUIDs) {
        return false;
    }
    /**
     * 获取蓝牙固件版本
     * @method 
     * @returns {Promise}
     *
     */
    getVersion() {
        return null;
    }
}
/**
 * 经典蓝牙
 * @interface
 */
export class IBluetoothClassic extends IBluetooth{
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
/**
 * @export
 */
export default {
    /**
     * 标准化蓝牙UUID为128位大写
     * @param {string} id 
     * @returns {string}
     * 
     * @example
     * import {Bluetooth} from 'miot';
     * const myServiceUUID = Bluetooth.UUID128("0015");
     * const myCharacterUUID = Bluetooth.UUID128("f7255c06-e981-46f1-be3d-86c5cd1bb590");
     * 
     */
    UUID128:getBluetoothUUID128,
    /**
     * 用以判断两个 UUID 是否相等
     * @param {string} uuid1 
     * @param {string} uuid2 
     */
    isSameUUID(uuid1, uuid2){
        if(uuid1 == uuid2){
            return true;
        }
        if(!uuid1 || !uuid2){
            return false;
        }
        return getBluetoothUUID128(uuid1) == getBluetoothUUID128(uuid2);
    },
    /**
     * 创建BLE蓝牙设备,
     * @method
     * @param {string} macOrPeripheralID -- iOS传 peripheralUUID, android 传 mac
     * @returns {IBluetoothLE}
     * @example
     *   import Bluetooth from 'miot/Bluetooth'
     *   const ble = Bluetooth.createBluetoothLE("a.b.c...")
     */
    createBluetoothLE(macOrPeripheralID) {
         return null
    },
    /**
     * 创建经典蓝牙设备
     * @method
     * @param {string} macOrPeripheralID -- iOS传 peripheralUUID, android 传 mac
     * @returns {IBluetoothClassic}
     * @example
     *   import Bluetooth from 'miot/Bluetooth'
     *   const bludtoothClassic = Bluetooth.createBluetoothClassic("a.b.c...")
     */
    createBluetoothClassic(macOrPeripheralID) {
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
     *      Bluetooth.startScan(3000, 'FE95','FE96')
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
     * iOS 平台获取已连接 BLE Peripheral，适用于可穿戴长连接设备
     * 对应 coreBLuetooth 中 retrievePeripheralsWithIdentifiers:(NSArray<NSUUID *> *)identifiers 方法
     * @method
     * @param {...string} UUIDs - Peripheral UUIDs
     * @returns {Promise<Map<uuid, Bluetooth>>}
     * //@mark ios done
     * @example
     *   Bluetooth.retrievePeripheralsForIOS("PeripheralUUID1","PeripheralUUID2","PeripheralUUID3")
     */
    retrievePeripheralsForIOS(...UUIDs) {
         return Promise.resolve(null);
    },
    /**
     * iOS 平台通过 serviceUUID 获取已连接 BLE Peripheral，适用于可穿戴长连接设备
     * 对应 coreBLuetooth 中 retrieveConnectedPeripheralsWithServices:(NSArray<CBUUID *> *)serviceUUIDs 方法
     * @method
     * @param {...string} serviceUUIDs - Peripheral  serviceUUIDs
     * @returns {Promise<Map<uuid, Bluetooth>>}
     * //@mark ios done
     * @example
     *   Bluetooth.retrievePeripheralsWithServicesForIOS("serviceUUID1","serviceUUID2","serviceUUID3")
     */
    retrievePeripheralsWithServicesForIOS(...UUIDs) {
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
     *  @param {string} mac
     * @returns {Promise<boolean>}
     */
    isBleGatewayConnected(mac) {
         return Promise.resolve(true);
    },
    /**
    * 只在MIUI上支持，维持长连接 如果连接失败，则会隔一段时间尝试重连，如果继续失败，则重连间隔会翻倍，直到上限。
    * @static
    * @param {string} mac
    */
    bindDeviceforMIUI(mac){
    },
    /**
     * 只在MIUI上支持，解除长连接
     * @static
     * @param {string} mac
     */
    unBindDeviceforMIUI(mac){
    },
    /**
     * 只在MIUI上支持，维持长连接 如果连接失败，则会隔一段时间尝试重连，如果继续失败，则重连间隔会翻倍，直到上限。
     *
     * @static
     * @param {*} alert
     * @param {*} enable
     *  @param {string} mac
     */
    setAlertConfigsOnMIUI(mac,alert,enable){
    },
};