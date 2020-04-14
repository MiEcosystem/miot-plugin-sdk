/**
 * @export public
 * @doc_name 蓝牙入口模块
 * @doc_index 1
 * @doc_directory bluetooth
 * @module miot/device/bluetooth
 * @description 蓝牙设备操作类
 * 蓝牙设备的开发，详见：[蓝牙设备](https://iot.mi.com/new/doc/app-development/extension-development/device-management/device.html#%E8%93%9D%E7%89%99%E8%AE%BE%E5%A4%87)，此处不再赘述蓝牙开发的流程以及蓝牙的工作原理。
 * **默认大家对iOS中的CoreBluetooth和Android中的android.bluetooth有一定了解，了解了这些内容再来读此文档，事半功倍。**  
 * 蓝牙设备由1个js文件拆分为5个js文件，主要为：  
 * index.js 蓝牙设备相关入口文件  
 * BluetoothDevice.js 普通蓝牙设备功能文件，包含了蓝牙设备的基本操作，比如发现，连接，取消链接，蓝牙事件等模块。  
 * LockDevice.js 蓝牙锁独有的相关功能文件，提供了蓝牙锁的开关锁，密码管理，加解密等功能  
 * CoreBluetooth.js 蓝牙服务/特征值管理类文件，提供了蓝牙服务，蓝牙特征值等模块  
 * ClassicDevice.js 经典蓝牙功能文件，包含了经典蓝牙的连接，数据读写等操作，一般开发者不用关心此文件。  
 * 每个文件的具体功能，请直接查看此文件的具体文档。
 * 
 * @example
 *
 * import {Bluetooth} from 'miot/device/bluetooth'
 *
 *  Bluetooth.checkBluetoothIsEnabled().then(result => {
        this.state.isEnable = result;
        if (result) {
            this.addLog("蓝牙已开启")
            this.startScan();
        } else {
            this.addLog("蓝牙未开启，请检查开启蓝牙后再试")
            Host.ui.showBLESwitchGuide();
        }
    })
 *
 * ...
 *
 * ble.disconnect()
 *
 */
import native, { Properties } from '../../native';
import { IBluetooth as BluetoothDevice, getMacUuid, setMacUuid, IBluetooth } from './BluetoothDevice'
import LockDevice from './LockDevice';
export const getBluetoothUUID128 = id => {
    if (!id || id == '') return null;
    id = id.toUpperCase();
    if (id.length > 8) return id;
    switch (id.length) {
        case 2: id = "000000" + id; break;
        case 4: id = "0000" + id; break;
        case 6: id = "00" + id; break;
        case 8: break;
        default:
            return null;
    }
    return id + "-0000-1000-8000-00805F9B34FB";
}
 const bluetoothDevices={}
/**
 * 蓝牙操作入口类
 * @interface
 */
export default {
    /**
     * 标准化蓝牙UUID为128位大写
     * @param {string} id
     * @returns {string}
     *
     * @example
     * import {Bluetooth} from 'miot/device/bluetooth';
     * const myServiceUUID = Bluetooth.UUID128("0015");
     * const myCharacterUUID = Bluetooth.UUID128("f7255c06-e981-46f1-be3d-86c5cd1bb590");
     *
     */
    UUID128: getBluetoothUUID128,
    /**
     * 用以判断两个 UUID 是否相等
     * @param {string} uuid1
     * @param {string} uuid2
     */
    isSameUUID(uuid1, uuid2) {
        if (uuid1 == uuid2) {
            return true;
        }
        if (!uuid1 || !uuid2) {
            return false;
        }
        return getBluetoothUUID128(uuid1) == getBluetoothUUID128(uuid2);
    },
    /**
     * 创建蓝牙设备,自动确定是普通蓝牙设备还是蓝牙锁设备。
     * @param {string} macOrPeripheralID -- iOS传 peripheralUUID, android 传 mac
     * @returns {IBluetooth}
     * @example
     * import {Bluetooth} from 'miot/device/bluetooth';
     *   const ble = Bluetooth.createBluetoothLE("a.b.c...")
     */
    createBluetoothLE(macOrPeripheralID) {
         return null
    },
    /**
     * 创建经典蓝牙设备
     * @param {string} macOrPeripheralID -- iOS传 peripheralUUID, android 传 mac
     * @returns {IBluetoothClassic}
     * @example
     *   import {Bluetooth} from 'miot/device/bluetooth'
     *   const bludtoothClassic = Bluetooth.createBluetoothClassic("a.b.c...")
     */
    createBluetoothClassic(macOrPeripheralID) {
         return null
    },
    /**
     * 判断蓝牙是否开放,如果没打开，可以调用Host.ui.showBLESwitchGuide()打开提示页面，让用户打开蓝牙。
     * @example
     *  Bluetooth.checkBluetoothIsEnabled().then(result => {
            this.state.isEnable = result;
            if (result) {
                this.addLog("蓝牙已开启")
                this.startScan();
            } else {
                this.addLog("蓝牙未开启，请检查开启蓝牙后再试")
                Host.ui.showBLESwitchGuide();
            }
        });
     * @returns {Promise<boolean>} 此方法不会走reject
     */
    checkBluetoothIsEnabled() {
         return Promise.resolve(true);
    },
    /**
     * 开始扫描蓝牙设备，此方法没有回调，扫描得到的结果，通过BluetoothEvent.bluetoothDeviceDiscovered.addListener()来获取扫描的结果，获取到正确的蓝牙设备对象后，记得调用下面的Bluetooth.stopScan()来停止蓝牙扫描。
     * @param {int} durationInMillis - 扫描时长
     * @param {...string} serviceUUIDs - 指定扫描包含了此service的蓝牙设备, 为空时扫描全部
     * @returns {void}
     *
     * @example
     *  import Bluetooth from 'miot/Bluetooth'
     *  Bluetooth.startScan(3000, 'FE95','FE96')
     * 
     *  BluetoothEvent.bluetoothDeviceDiscovered.addListener((result) => {
            if (bt) {
                console.log("发现设备" + JSON.stringify(result))
            } else {
                this.addLog("初次发现设备" + JSON.stringify(result))
                //普通蓝牙设备的连接必须在扫描到设备之后手动创建 ble 对象
                bt = Bluetooth.createBluetoothLE(result.uuid || result.mac);//android 用 mac 创建设备，ios 用 uuid 创建设备
                Bluetooth.stopScan();
                this.connect();
            }
        })
     */
    startScan(durationInMillis, ...serviceUUIDs) {
    },
    /**
     * 停止扫描蓝牙设备,此方法同样没有回调方法。获取到需要的设备，或者返回上一页，记得调用stopScan
     * @returns {void}
     *
     */
    stopScan() {
    },
    /**
     * iOS 平台获取已连接 BLE的蓝牙设备，适用于可穿戴长连接设备，一般此种类型的设备不需要断开。此方法可以理解为，根据UUID去获取已经连接的蓝牙设备
     * 已经连接的蓝牙设备不会发送广播，所以通过下面两行代码连接，必定返回失败：
     * const ble = Device.getBluetoothLE();ble.connect().then(ble=>{})
     * 因机制不同，android可以正常连接到。所以提供了下面两个方法，专门用于iOS连接失败后，获取已连接的ble对象。
     * 此方法对应 coreBLuetooth 中 retrievePeripheralsWithIdentifiers:(NSArray<NSUUID *> *)identifiers 方法
     * @param {...string} UUIDs - Peripheral UUIDs 。外设UUID，比如小米手环UUID
     * @example
     *   Bluetooth.retrievePeripheralsForIOS("PeripheralUUID1","PeripheralUUID2","PeripheralUUID3")
     * @returns {Promise<Map<uuid,IBluetooth>>} resolve: 返回一个map，key为UUID，value为IBluetooth对象
     *           reject: false（android调用时）
     */
    retrievePeripheralsForIOS(...UUIDs) {
         return Promise.resolve(null);
    },
    /**
     * iOS 平台通过 serviceUUID 获取已连接 BLE Peripheral，适用于可穿戴长连接设备
     * 使用场景同上面的retrievePeripheralsForIOS方法，不同点在于，此处是根据serviceUUID来筛选，表示筛选包含此serviceUUID的蓝牙设备
     * 对应 coreBLuetooth 中 retrieveConnectedPeripheralsWithServices:(NSArray<CBUUID *> *)serviceUUIDs 方法
     * @param {...string} serviceUUIDs - Peripheral  serviceUUIDs service的UUID
     * @example
     *   Bluetooth.retrievePeripheralsWithServicesForIOS("serviceUUID1","serviceUUID2","serviceUUID3")
     * @returns {Promise<Map<uuid,IBluetooth>>}  resolve：返回一个map，key为UUID，value为IBluetooth对象
     *            reject：false（android调用时）
     */
    retrievePeripheralsWithServicesForIOS(...UUIDs) {
         return Promise.resolve(null);
    },
    /**
     * 打开蓝牙（Android），iOS无法直接操作蓝牙的打开，只能通过Host.ui.showBLESwitchGuide();提示用户打开蓝牙。
     * @static
     * @param {boolean} silence
     * @returns void 无返回值
     *
     */
    enableBluetoothForAndroid(silence = false) {
    },
    /**
     * 判断当前设备是否通过蓝牙网关扫描到了。
     * 已知使用场景：如果是，可以考虑在更多设置加一个去蓝牙网关的入口，跳转到蓝牙网关页面，然后可以操作网关绑定此设备为子设备
     * @static
     * @param {string} mac 蓝牙子设备mac
     * @returns {Promise<boolean>}，此方法不会走reject
     */
    isBleGatewayConnected(mac) {
         return Promise.resolve(true);
    },
    /**
    * 只在MIUI上支持，维持长连接 如果连接失败，则会隔一段时间尝试重连，如果继续失败，则重连间隔会翻倍，直到上限。
    * @static
    * @param {string} mac
    */
    bindDeviceforMIUI(mac) {
    },
    /**
     * 只在MIUI上支持，解除长连接
     * @static
     * @param {string} mac
     */
    unBindDeviceforMIUI(mac) {
    },
    /**
     * 只在MIUI上支持，维持长连接 如果连接失败，则会隔一段时间尝试重连，如果继续失败，则重连间隔会翻倍，直到上限。
     *
     * @static
     * @param {*} alert
     * @param {*} enable
     *  @param {string} mac
     */
    setAlertConfigsOnMIUI(mac, alert, enable) {
    },
};