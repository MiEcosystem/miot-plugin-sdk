declare namespace _default {
    export { getBluetoothUUID128 as UUID128 };
    /**
       * 用以判断两个 UUID 是否相等
       * @param {string} uuid1
       * @param {string} uuid2
       */
    export function isSameUUID(uuid1: string, uuid2: string): boolean;
    /**
       * 用以判断两个 UUID 是否相等
       * @param {string} uuid1
       * @param {string} uuid2
       */
    export function isSameUUID(uuid1: string, uuid2: string): boolean;
    /**
       * 创建蓝牙设备,自动确定是普通蓝牙设备还是蓝牙锁设备。
       * @param {string} macOrPeripheralID -- iOS传 peripheralUUID, android 传 mac
       * @returns {IBluetooth}
       * @example
       * import {Bluetooth} from 'miot/device/bluetooth';
       *   const ble = Bluetooth.createBluetoothLE("a.b.c...")
       */
    export function createBluetoothLE(macOrPeripheralID: string): IBluetooth;
    /**
       * 创建蓝牙设备,自动确定是普通蓝牙设备还是蓝牙锁设备。
       * @param {string} macOrPeripheralID -- iOS传 peripheralUUID, android 传 mac
       * @returns {IBluetooth}
       * @example
       * import {Bluetooth} from 'miot/device/bluetooth';
       *   const ble = Bluetooth.createBluetoothLE("a.b.c...")
       */
    export function createBluetoothLE(macOrPeripheralID: string): IBluetooth;
    /**
       * 创建经典蓝牙设备
       * @param {string} macOrPeripheralID -- iOS传 peripheralUUID, android 传 mac
       * @returns {IBluetoothClassic}
       * @example
       *   import {Bluetooth} from 'miot/device/bluetooth'
       *   const bludtoothClassic = Bluetooth.createBluetoothClassic("a.b.c...")
       */
    export function createBluetoothClassic(macOrPeripheralID: string): IBluetoothClassic;
    /**
       * 创建经典蓝牙设备
       * @param {string} macOrPeripheralID -- iOS传 peripheralUUID, android 传 mac
       * @returns {IBluetoothClassic}
       * @example
       *   import {Bluetooth} from 'miot/device/bluetooth'
       *   const bludtoothClassic = Bluetooth.createBluetoothClassic("a.b.c...")
       */
    export function createBluetoothClassic(macOrPeripheralID: string): IBluetoothClassic;
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
    export function checkBluetoothIsEnabled(): Promise<boolean>;
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
    export function checkBluetoothIsEnabled(): Promise<boolean>;
    /**
     * 扫描前先检查蓝牙权限
     * */
    export function checkBluetoothPermission(): Promise<any>;
    /**
     * 扫描前先检查蓝牙权限
     * */
    export function checkBluetoothPermission(): Promise<any>;
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
    export function startScan(durationInMillis: int, ...serviceUUIDs: string[]): void;
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
    export function startScan(durationInMillis: int, ...serviceUUIDs: string[]): void;
    /**
       * 停止扫描蓝牙设备,此方法同样没有回调方法。获取到需要的设备，或者返回上一页，记得调用stopScan
       * @returns {void}
       *
       */
    export function stopScan(): void;
    /**
       * 停止扫描蓝牙设备,此方法同样没有回调方法。获取到需要的设备，或者返回上一页，记得调用stopScan
       * @returns {void}
       *
       */
    export function stopScan(): void;
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
    export function retrievePeripheralsForIOS(...UUIDs: string[]): Promise<Map<uuid, IBluetooth>>;
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
    export function retrievePeripheralsForIOS(...UUIDs: string[]): Promise<Map<uuid, IBluetooth>>;
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
    export function retrievePeripheralsWithServicesForIOS(...UUIDs: any[]): Promise<Map<uuid, IBluetooth>>;
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
    export function retrievePeripheralsWithServicesForIOS(...UUIDs: any[]): Promise<Map<uuid, IBluetooth>>;
    /**
     * ble 直连spec的关键方法，用于触发 set/get property, do action 这三个方法；
     * @static
     * @private
     * @params {String} mac, 蓝牙设备的mac地址
     * @params {int} opCode 定义为： 0：set Property; 2: get Property; 5: do action
     * @params {String} json: 各个方法需要的需要的参数各不相同，参数类型建议文档：https://xiaomi.feishu.cn/docs/doccneoCLgQYWtfaEU8sWoKwx3E#UXkcyO
     */
    export function doSpecOperation(mac: any, opCode: any, json: any): Promise<any>;
    /**
     * ble 直连spec的关键方法，用于触发 set/get property, do action 这三个方法；
     * @static
     * @private
     * @params {String} mac, 蓝牙设备的mac地址
     * @params {int} opCode 定义为： 0：set Property; 2: get Property; 5: do action
     * @params {String} json: 各个方法需要的需要的参数各不相同，参数类型建议文档：https://xiaomi.feishu.cn/docs/doccneoCLgQYWtfaEU8sWoKwx3E#UXkcyO
     */
    export function doSpecOperation(mac: any, opCode: any, json: any): Promise<any>;
    /**
     * 打开蓝牙（Android），iOS无法直接操作蓝牙的打开，只能通过Host.ui.showBLESwitchGuide();提示用户打开蓝牙。
     * @static
     * @param {boolean} silence
     * @returns void 无返回值
     *
     */
    export function enableBluetoothForAndroid(silence?: boolean): void;
    /**
     * 打开蓝牙（Android），iOS无法直接操作蓝牙的打开，只能通过Host.ui.showBLESwitchGuide();提示用户打开蓝牙。
     * @static
     * @param {boolean} silence
     * @returns void 无返回值
     *
     */
    export function enableBluetoothForAndroid(silence?: boolean): void;
    /**
       * 判断当前设备是否通过蓝牙网关扫描到了。
       * 已知使用场景：如果是，可以考虑在更多设置加一个去蓝牙网关的入口，跳转到蓝牙网关页面，然后可以操作网关绑定此设备为子设备
       * @static
       * @param {string} mac 蓝牙子设备mac
       * @returns {Promise<boolean>}，此方法不会走reject
       */
    export function isBleGatewayConnected(mac: string): Promise<boolean>;
    /**
       * 判断当前设备是否通过蓝牙网关扫描到了。
       * 已知使用场景：如果是，可以考虑在更多设置加一个去蓝牙网关的入口，跳转到蓝牙网关页面，然后可以操作网关绑定此设备为子设备
       * @static
       * @param {string} mac 蓝牙子设备mac
       * @returns {Promise<boolean>}，此方法不会走reject
       */
    export function isBleGatewayConnected(mac: string): Promise<boolean>;
    /**
     * 判断当前设备是否被蓝牙/蓝牙Mesh网关扫描到
     * @since 10040
     * @param {string} mac 蓝牙子设备Mac
     * @param {boolean} forceRefresh 是否强制刷新
     * @returns {Promise<Object>}
     * 成功时的返回值：
     * {code:0,data:{connected:[true/false],mac:[网关mac]}} 已连接时connected=true,反之connected=false，mac可能为空；
     * 失败时可能返回返回值：
     * {code:-1,message:"mac is null or empty."}
     * {code:-2,message:"cann't find any gateway device."}
     * {code:-3,message:"internal error xxxx"}
     */
    export function isBleOrMeshGatewayConnected(mac: string, forceRefresh?: boolean): Promise<any>;
    /**
     * 判断当前设备是否被蓝牙/蓝牙Mesh网关扫描到
     * @since 10040
     * @param {string} mac 蓝牙子设备Mac
     * @param {boolean} forceRefresh 是否强制刷新
     * @returns {Promise<Object>}
     * 成功时的返回值：
     * {code:0,data:{connected:[true/false],mac:[网关mac]}} 已连接时connected=true,反之connected=false，mac可能为空；
     * 失败时可能返回返回值：
     * {code:-1,message:"mac is null or empty."}
     * {code:-2,message:"cann't find any gateway device."}
     * {code:-3,message:"internal error xxxx"}
     */
    export function isBleOrMeshGatewayConnected(mac: string, forceRefresh?: boolean): Promise<any>;
    /**
       * 获取信号强度RSSI
       *  @since 10038
       * @returns {Promise<Object>}
       * 成功时：{"code":0, "data":{RSSI: x}}
       * 失败时：{"code":-1, "message":"xxx" }
       */
    export function getBtGateWaySubDeviceRSSI(mac: any): Promise<any>;
    /**
       * 获取信号强度RSSI
       *  @since 10038
       * @returns {Promise<Object>}
       * 成功时：{"code":0, "data":{RSSI: x}}
       * 失败时：{"code":-1, "message":"xxx" }
       */
    export function getBtGateWaySubDeviceRSSI(mac: any): Promise<any>;
    /**
      * 只在MIUI上支持，维持长连接 如果连接失败，则会隔一段时间尝试重连，如果继续失败，则重连间隔会翻倍，直到上限。
      * @static
      * @param {string} mac
      */
    export function bindDeviceforMIUI(mac: string): void;
    /**
      * 只在MIUI上支持，维持长连接 如果连接失败，则会隔一段时间尝试重连，如果继续失败，则重连间隔会翻倍，直到上限。
      * @static
      * @param {string} mac
      */
    export function bindDeviceforMIUI(mac: string): void;
    /**
       * 只在MIUI上支持，解除长连接
       * @static
       * @param {string} mac
       */
    export function unBindDeviceforMIUI(mac: string): void;
    /**
       * 只在MIUI上支持，解除长连接
       * @static
       * @param {string} mac
       */
    export function unBindDeviceforMIUI(mac: string): void;
    /**
       * 只在MIUI上支持，维持长连接 如果连接失败，则会隔一段时间尝试重连，如果继续失败，则重连间隔会翻倍，直到上限。
       *
       * @static
       * @param {*} alert
       * @param {*} enable
       *  @param {string} mac
       */
    export function setAlertConfigsOnMIUI(mac: string, alert: any, enable: any): Promise<any>;
    /**
       * 只在MIUI上支持，维持长连接 如果连接失败，则会隔一段时间尝试重连，如果继续失败，则重连间隔会翻倍，直到上限。
       *
       * @static
       * @param {*} alert
       * @param {*} enable
       *  @param {string} mac
       */
    export function setAlertConfigsOnMIUI(mac: string, alert: any, enable: any): Promise<any>;
    /**
     * Since SDK_10079
     * 仅支持Android设备 iOS设备不支持该方法
     * @returns boolean 判断蓝牙是否是半开模式
     *  Bluetooth.isBluetoothHalfOpenForAndroid().then((enable) => {
     *       console.log("enable : " + enable)
     *     }).catch((error) => {
     *       this.logInfo('checkBluetoothIsEnabled error ', error);
     *     });
     *
     */
    export function isBluetoothHalfOpenForAndroid(): Promise<any>;
    /**
     * Since SDK_10079
     * 仅支持Android设备 iOS设备不支持该方法
     * @returns boolean 判断蓝牙是否是半开模式
     *  Bluetooth.isBluetoothHalfOpenForAndroid().then((enable) => {
     *       console.log("enable : " + enable)
     *     }).catch((error) => {
     *       this.logInfo('checkBluetoothIsEnabled error ', error);
     *     });
     *
     */
    export function isBluetoothHalfOpenForAndroid(): Promise<any>;
    /**
     * since SDK_10104
     * @param mac
     */
    export function createBond(mac: any): void;
    /**
     * since SDK_10104
     * @param mac
     */
    export function createBond(mac: any): void;
    /**
     * since SDK_10104
     * @param mac
     */
    export function removeBond(mac: any): void;
    /**
     * since SDK_10104
     * @param mac
     */
    export function removeBond(mac: any): void;
}
export default _default;
import { getBluetoothUUID128 } from "./utils/uuid";
import { takeBluetooth } from "./utils/ble";
export { getBluetoothUUID128, takeBluetooth };