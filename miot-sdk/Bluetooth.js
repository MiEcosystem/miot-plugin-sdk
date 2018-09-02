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
 const createEventManager=def=>def
/**
 * 蓝牙特征值
 * @interface
 *
 * @expo interface
 */
export class IBluetoothCharacteristic{
    /**
     * 是否已经被发现
     * @member
     * @type {boolean}
     * @readonly
     *
     * @expo get
     */
    get isDiscovered(){
         return  false
    }
   /**
    * 数值是否已经加载, 为 true 时,本类才能读到正确的 value
    * @member
    * @type {boolean}
     * @readonly
     *
     * @expo get
    */
    get isValueLoaded(){
         return  false
    }
    /**
     * 特征值的 UUID
     * @member
     * @type {string}
     * @readonly
     *
     * @expo get
     */
    get UUID(){
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
     * @expo get
     */
    get value(){
         return  null
    }
    /**
     * 读取蓝牙数据
     * @method
     * @returns {Promise<IBluetoothCharacteristic>}
     *
     *
     *
     * @expo method
     * @mark andr done
     */
    read(){
         return Promise.resolve(null);
    }
    /**
     * 写数据
     * @method
     * @param {*} value
     * @returns {Promise<IBluetoothCharacteristic>}
     *
     * @expo method
     * @mark andr done
     */
    write(value){
         return Promise.resolve(null);
    }
   /**
    * 直接写数据
    * @method
    * @param {*} value
    * @returns {Promise<IBluetoothCharacteristic>}
    *
    * @expo method
    * @mark andr done
    */
   writeWithoutResponse(value){
     return Promise.resolve(null);
   }
   /**
    * 设置数值变化监听开关
    * @method
    * @param {boolean} flag
    * @returns {Promise<IBluetoothCharacteristic>}
    *
    * @expo method
    * @mark andr done
    */
   setNotify(flag){
     return Promise.resolve(null);
   }
}
/**
 * 蓝牙服务
 * @interface
 * @expo interface
 */
export class IBluetoothService{
   /**
    * 蓝牙服务 UUID
    * @member
    * @type {string}
     * @readonly
     * 
    */
   get UUID(){
         return  ""
   }
   /**
    * 蓝牙服务是否已被发现
    * @member
     * @readonly
     * 
    */
   get isDiscovered(){
         return  false
   }
   /**
    * 发现蓝牙特征
    * @method
    * @param {...string} characteristicUUIDs
    * @returns {boolean}
    *
    * @expo method
    * @mark andr done
    */
   startDiscoverCharacteristics(...characteristicUUIDs){
         return false
   }
  /**
   * 获取蓝牙特征
   * @member
   * @param {string} characteristicUUID
   * @type {IBluetoothCharacteristic}
   *
   * @expo method
   * @mark andr done
   */
   getCharacteristic(characteristicUUID){
         return null
   }
}
/**
 *
 * 蓝牙设备
 * @interface
 *
 * @expo interface
 *
 */
export class IBluetooth {
   /**
    * 蓝牙设备的 mac 地址
    * @member
    * @type {string}
     * @readonly
     *
     * @expo get
    *
    */
   get mac(){
         return  ""
   }
   /**
    * 蓝牙设备的 UUID
    * @member
     * @readonly
     *
     * @expo get
    */
   get UUID(){
         return  ""
   }
   /**
    * 蓝牙开关状态
    * @member
    * @type {boolean}
     * @readonly
     *
     * @expo get
    */
   get isEnabled(){
         return  false
   }
   /**
    * 蓝牙是否已经连接
    * @member
    * @type {boolean}
    *
     * @readonly
     *
     * @expo get
    */
   get isConnected(){
         return  false
   }
   /**
    *获取蓝牙服务
    * @member
    * @param {string} serviceUUID
    * @type {IBluetoothService}
    *
    * @expo method
    */
   getService(serviceUUID){
         return null
   }
   /**
    * 发现服务
    * @method
    * @param {...string} serviceUUIDs
    * @returns {boolean}
    *
    * @expo method
    * @mark andr done
    */
    startDiscoverServices(...serviceUUIDs){
         return false
    }
   /**
    * 打开蓝牙链接
    *
    * @method
    * @returns {Promise<IBluetooth>}
    * @param {int} type android插件链接蓝牙类型 -1 自动判断，0 小米蓝牙协议设备，1 自己的安全芯片设备，2 分享的安全芯片设备，3 普通的蓝牙协议
    *
     * @expo method
    * @mark andr done
    */
    connect(type){
         return Promise.resolve(this);
    }
   /**
    * 读取 RSSI
    * @method
    * @returns {Promise<*>}
    *
    * @expo method
    * @mark andr done
    */
   readRSSI(){
      return Promise.resolve(null);
   }
   /**
    * 关闭链接
    * @method
    * @param {int} delay -延迟时长
    *
    * @expo method
    * @mark andr done
    */
   disconnect( delay=0 ){
   }
  /**
   *只在MIUI上支持，维持长连接 如果连接失败，则会隔一段时间尝试重连，如果继续失败，则重连间隔会翻倍，直到上限。
   *
   * @mark andr done
   */
  bindDevice(){
  }
  /**
   * 只在MIUI上支持，解除长连接
   *
   * @mark andr done
   */
  unBindDevice(){
  }
  /**
   *设备自动重连开关是否打开
   * @param callback
   *
   * @mark andr done
   */
  isAutoReconnect(callback){
  }
  /**
   * 设置指定的设备断开后是否自动重连
   * @param enable
   * @param callback
   *
   * @mark andr done
   */
  setAutoReconnect(enable,callback){
  }
}
 const bluetoothDevices={}
/**
 * 蓝牙事件名集合
 * @typedef BluetoothEvent
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
export const BluetoothEvent = createEventManager({
    /**
     * 蓝牙断开连接
     * @event
     * @param {IBluetooth} bluetooh -发生连接打开关闭事件的蓝牙设备
     * @param {boolean} isConnected -当前连接状态
     * @mark andr done
     *
     */
    bluetoothConnectionStatusChanged:{
    },
    /**
     * 蓝牙设备扫描发现事件
     * @event
     * @param {...IBluetooth} bluetooh -扫描发现的蓝牙设备
     *
     * @mark andr done
     */
    bluetoothDeviceDiscovered:{
    },
    /**
     * 蓝牙设备扫描发现失败事件
     * @event
     * @param {*} error -错误信息
     *
     * @mark andr done
     */
    bluetoothDeviceDiscoverFailed:{
    },
    /**
     * 蓝牙服务发现事件
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {...IBluetoothService} service -发现的蓝牙服务
     *
     * @mark andr done
     */
    bluetoothSeviceDiscovered:{
    },
    /**
     * 蓝牙服务发现失败事件
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {*} error -错误信息
     *
     * @mark andr done
     */
    bluetoothSeviceDiscoverFailed:{
    },
    /**
     * 蓝牙特征发现事件
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {IBluetoothService} service -蓝牙特征
     * @param {...IBluetoothCharacteristic} characters -发现的蓝牙特征
     *
     * @mark andr done
     */
    bluetoothCharacteristicDiscovered:{
    },
    /**
     * 蓝牙特征发现失败事件
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {IBluetoothService} service -蓝牙特征
     * @param {*} error -错误信息
     *
     * @mark andr done
     */
    bluetoothCharacteristicDiscoverFailed:{
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
     * @mark andr done
     */
    bluetoothCharacteristicValueChanged:{
    },
    /**
     * 蓝牙开关状态变更事件
     * @event
     * @type {event}
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {boolean} isEnabled -当前状态
     *
     * @mark andr done
     */
    bluetoothStatusChanged:{
    }
});
/**
 * @export
 */
export default {
   /**
    * 创建蓝牙设备
    * @method
    * @param {*} macOrUUID
    * @returns {IBluetooth}
    * @example
    *   import Bluetooth from 'miot/Bluetooth'
    */
   createBluetooth(mac){
         return null
   },
   /**
    * 开始扫描蓝牙设备
    * @method
    * @param durationInMillis 扫描时长
    * @param {int} type 0经典蓝牙 1 ble 蓝牙
    * @mark andr done
    *
    * @example
    *      import Bluetooth from 'miot/Bluetooth'
    *      Bluetooth.startScan(ret=>{})
    */
   startScan(durationInMillis,type){
   },
  /**
   * 扫描指定 serviceIds 的蓝牙设备
   * @param durationInMillis 扫描时长
   * @param serviceIds  serviceId 的数组
   */
  startLeScan(durationInMillis,serviceIds){
   },
   /**
    * 停止扫描蓝牙设备
    * @method
    *
    * @mark andr done
    *
    */
   stopScan(){
   },
   /**
    * 加载本地蓝牙设备
    * @method
    * @param {*} uuids serviceUUID or deviceUUID
    * @param {*} opt {withServiceUUID:false}
    * @returns {Promise<Map<uuid, Bluetooth>>}
    */
   retrievePeripheralsForIOS(uuids, opt={withServiceUUID:false}){
         return Promise.resolve(null);
   },
       /**
     * 打开蓝牙
     * @static
     * @param {boolean} silence
     *
     * @mark andr done
     */
    enableBluetoothForAndroid(silence=false) {
    },
    /**
     * 判断蓝牙是否开放
     * @static
     * @returns {Promise<boolean>}
     * @mark andr done
     */
    checkBluetoothIsEnabledForAndroid(callback) {
    },
    /**
     * 判断当前设备是否通过蓝牙网关扫描到了
     * @static
     * @returns {Promise<boolean>}
     * @mark andr done
     */
    isBleGatewayConnected(callback) {
    }
};