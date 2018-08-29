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

import native, {Properties, createEventManager} from './native'

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
        return Properties.of(this).isDiscovered;
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
        return Properties.of(this).isValueLoaded;
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
         return Properties.of(this).characteristicUUID;
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
        return Properties.of(this).value;
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
        return new Promise((resolve, reject)=>{
          const self =  Properties.of(this);
          const {serviceUUID, characteristicUUID} = self;
          native.MIOTBluetooth.readHexStringWithCallback(characteristicUUID, serviceUUID,(ok, data)=>{
            if (ok) {
              self.value = data;
              self.isValueLoaded = true;
              resolve(self);
              return;
            }
            reject(data);
          });
        });
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
        return new Promise((resolve, reject)=>{
            const self = Properties.of(this)
            const {serviceUUID, characteristicUUID} = self
            native.MIOTBluetooth.writeHexStringWithCallback(value, characteristicUUID, serviceUUID, 0, (ok, error)=>{
                if (ok) {
                    self.value = value;
                    self.isValueLoaded = true;
                    resolve(this);
                    return;
                }
                reject(error);
            });
        });
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
     return new Promise((resolve, reject)=>{
        const self = Properties.of(this)
        const {serviceUUID, characteristicUUID} = self

        native.MIOTBluetooth.writeHexStringWithCallback(value, characteristicUUID, serviceUUID, 1, (ok, error)=>{
            if (ok) {
                self.value = value;
                self.isValueLoaded = true;
                resolve(this);
                return;
            }
            reject(error);
        });
     });
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
     return new Promise((resolve, reject)=>{
       const {serviceUUID, characteristicUUID} = Properties.of(this);
       native.MIOTBluetooth.setNotifyWithCallback(flag, characteristicUUID, serviceUUID,(ok, error)=>{
         if (ok) {
           resolve(this);
           return;
         }
         reject(error);
       });
     });
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
     * @expo get
    */
   get UUID(){
       return Properties.of(this).serviceUUID;
   }

   /**
    * 蓝牙服务是否已被发现
    * @member
     * @readonly
     *
     * @expo get
    */
   get isDiscovered(){
       return Properties.of(this).isDiscovered;
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
        if(characteristicUUIDs.length < 1 || !this.isDiscovered){
            return false;
        }
        const notFound = characteristicUUIDs.filter(uuid=>!this.getCharacteristic(uuid).isDiscovered)
        if(notFound.length > 0){
            const {serviceUUID} = Properties.of(this);
            native.MIOTBluetooth.discoverCharacteristics(notFound, serviceUUID);
        }
        return true;
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
       if(typeof(characteristicUUID) != "string" || characteristicUUID.length < 3){
           return null;
       }
       const {characteristics, mac, serviceUUID, deviceUUID} = Properties.of(this);
       let character = characteristics.get(characteristicUUID);
       if(!character){
           character = new IBluetoothCharacteristic();
           Properties.init(character, {mac, deviceUUID, serviceUUID, characteristicUUID})
           characteristics.set(characteristicUUID, character)
       }
       return character;
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
       return Properties.of(this).mac;
   }

   /**
    * 蓝牙设备的 UUID
    * @member
     * @readonly
     *
     * @expo get
    */
   get UUID(){
       return Properties.of(this).UUID;
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
       return Properties.of(this).isEnabled;
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
       return Properties.of(this).isConnected;
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
       if(typeof(serviceUUID) != "string" || serviceUUID.length < 5){
           return null;
       }
       const {services, mac, UUID} = Properties.of(this);
       let service = services.get(serviceUUID)
       if(!service){
            service = new IBluetooth();
            Properties.init(service, {mac, deviceUUID:UUID,
                serviceUUID,
                characteristics:new Map()
            })
            services.set(serviceUUID, service);
       }
       return service;
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
        if(serviceUUIDs.length < 1 || !this.isConnected){
            return false;
        }
        const notFound = serviceUUIDs.filter(uuid=>!this.getService(uuid).isDiscovered);
        if(notFound.length > 0){
            native.MIOTBluetooth.discoverServices(notFound)
        }
        return true;
    }

   /**
    * 读取连接状态,请使用  isConnected ,链接成功后返回值为 true，断开连接后值为 false
    * @method
    * @description
    *  connected 已连接
    *  connecting 正在连接
    *  disconnected 已断开
    *  disconnecting 正在断开连接
    *  unknown 未知
    *
    * @expo get
    */
   // readConnectionStatus(){
   //     return new Promise((resolve, reject)=>{
   //          native.MIOTBluetooth.getConnectStatus(ret=>{
   //              resolve(ret)
   //          });
   //     })
   // }

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
        if(this.isConnected){
            return Promise.resolve(this);
        }
        return new Promise((resolve, reject)=>{
            //data : ok=> {services:[{uuid:"...", chars:["...", "..."]} ]}
            //false: {error:100, message:""}
            native.isAndroid ? native.MIOTBluetooth.connect(this.mac,type, (ok, data)=>{
                if(!ok){
                    reject(data)
                    return;
                }
                const {services} = data;
                (services||[]).forEach(s=>{
                    const srv = this.getService(s.uuid);
                    Properties.of(srv).isDiscovered = true;
                    (s.chars||[]).forEach(c=>{
                        const chr = srv.getCharacteristic(c);
                        Properties.of(chr).isDiscovered = true;
                    })
                })

            }):native.MIOTBluetooth.connect(this.mac, (ok, data)=>{
                if(!ok){
                    reject(data)
                    return;
                }
                const {services} = data;
                (services||[]).forEach(s=>{
                    const srv = this.getService(s.uuid);
                    Properties.of(srv).isDiscovered = true;
                    (s.chars||[]).forEach(c=>{
                        const chr = srv.getCharacteristic(c);
                        Properties.of(chr).isDiscovered = true;
                    })
                })

            })
        });
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
     return new Promise((resolve, reject)=>{
       native.MIOTBluetooth.readRSSI((ok,data)=>{
         if (ok) {
           resolve(data);
           return;
         }
         reject(data);
       });
     });
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
     native.MIOTBluetooth.disconnectDeviceWithDelay(delay);
   }

  /**
   *只在MIUI上支持，维持长连接 如果连接失败，则会隔一段时间尝试重连，如果继续失败，则重连间隔会翻倍，直到上限。
   *
   * @mark andr done
   */
  bindDevice(){
    native.MIOTBluetooth.bindDevice();
  }

  /**
   * 只在MIUI上支持，解除长连接
   *
   * @mark andr done
   */
  unBindDevice(){
    native.MIOTBluetooth.unBindDevice();
  }

  /**
   *设备自动重连开关是否打开
   * @param callback
   *
   * @mark andr done
   */
  isAutoReconnect(callback){
    native.MIOTBluetooth.isAutoReconnect(callback);
  }

  /**
   * 设置指定的设备断开后是否自动重连
   * @param enable
   * @param callback
   *
   * @mark andr done
   */
  setAutoReconnect(enable,callback){
    native.MIOTBluetooth.setAutoReconnect(enable,callback);
  }
}

const {bluetoothDevices} = native.LocalCache;
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
    bluetoothConnectionStatusChanged:{forever:emitter=>
        ({mac, isConnected})=>{
            let bluetooth = bluetoothDevices.get(mac);
            if(!bluetooth){
                return;
            }
            Properties.of(bluetooth).isConnected = isConnected;
            emitter.emit(bluetooth, isConnected);
        }
    },

    /**
     * 蓝牙设备扫描发现事件
     * @event
     * @param {...IBluetooth} bluetooh -扫描发现的蓝牙设备
     *
     * @mark andr done
     */
    bluetoothDeviceDiscovered:{forever:emitter=>
        ({mac})=>{
            let bluetooth = bluetoothDevices.get(mac);
            if(!bluetooth){
                return;
            }
            emitter.emit(bluetooth);
        }
    },

    /**
     * 蓝牙设备扫描发现失败事件
     * @event
     * @param {*} error -错误信息
     *
     * @mark andr done
     */
    bluetoothDeviceDiscoverFailed:{always:emitter=>
        ({error})=>{
            emitter.emit(error);
        }
    },

    /**
     * 蓝牙服务发现事件
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {...IBluetoothService} service -发现的蓝牙服务
     *
     * @mark andr done
     */
    bluetoothSeviceDiscovered:{forever:emitter=>
        ({mac, foundUUIDs})=>{
            let bluetooth = bluetoothDevices.get(mac);
            if(!bluetooth){
                return;
            }
            const services = (foundUUIDs||[]).map(uuid=>{
                const service = bluetooth.getService(uuid);
                Properties.of(service).isDiscovered = true;
                return service;
            })
            emitter.emit(bluetooth, ...services)
        }
    },


    /**
     * 蓝牙服务发现失败事件
     * @event
     * @param {IBluetooth} bluetooh -蓝牙设备
     * @param {*} error -错误信息
     *
     * @mark andr done
     */
    bluetoothSeviceDiscoverFailed:{always:emitter=>
        ({mac, error})=>{
            let bluetooth = bluetoothDevices.get(mac);
            if(!bluetooth){
                return;
            }
            emitter.emit(bluetooh, error);
        }
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
    bluetoothCharacteristicDiscovered:{forever:emitter=>
        ({mac, serviceUUID, foundUUIDs})=>{
            let bluetooth = bluetoothDevices.get(mac);
            if(!bluetooth){
                return;
            }
            const service = bluetooth.getService(serviceUUID);
            if(!service.isDiscovered){
                return;
            }
            const characters = (foundUUIDs||[]).forEach(uuid=>{
                const character = service.getCharacteristic(uuid)
                Properties.of(character).isDiscovered = true;
                return character
            })
            emitter.emit(bluetooth, service, ...characters);
        }
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
    bluetoothCharacteristicDiscoverFailed:{always:emitter=>
        ({mac, serviceUUID, error})=>{
            let bluetooth = bluetoothDevices.get(mac);
            if(!bluetooth){
                return;
            }
            const service = bluetooth.getService(serviceUUID);
            if(!service.isDiscovered){
                return;
            }
            emitter.emit(bluetooh, service, error);
        }
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
    bluetoothCharacteristicValueChanged:{forever:emitter=>
        ({mac, serviceUUID, characteristicUUID, value})=>{
            let bluetooth = bluetoothDevices.get(mac);
            if(!bluetooth){
                return;
            }
            const service = bluetooth.getService(serviceUUID);
            if(!service.isDiscovered){
                return;
            }
            const character = service.getCharacteristic(characteristicUUID);
            if(!character.isDiscovered){
                return;
            }
            const props = Properties.of(character);
            props.isValueLoaded = true;
            props.value = value;
            emitter.emit(bluetooth, service, character, value);
        }
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
    bluetoothStatusChanged:{forever:emitter=>
        ({mac, isEnabled})=>{
            let bluetooth = bluetoothDevices.get(mac);
            if(!bluetooth){
                return;
            }
            Properties.of(bluetooth).isEnabled = isEnabled;
            emitter.emit(bluetooth, isEnabled);
        }
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
       let bluetooth = bluetoothDevices.get(mac);
       if(!bluetooth){
        bluetooth = Properties.init(new IBluetooth(), {mac, services:new Map()});
           bluetoothDevices.set(mac, bluetooth);
       }
       return bluetooth;
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
     native.MIOTBluetooth.startScan(durationInMillis,type);
   },
  /**
   * 扫描指定 serviceIds 的蓝牙设备
   * @param durationInMillis 扫描时长
   * @param serviceIds  serviceId 的数组
   */
  startLeScan(durationInMillis,serviceIds){
     native.MIOTBluetooth.startLeScan(durationInMillis,serviceIds);
   },

   /**
    * 停止扫描蓝牙设备
    * @method
    *
    * @mark andr done
    *
    */
   stopScan(){
     native.MIOTBluetooth.stopScan();
   },

   /**
    * 加载本地蓝牙设备
    * @method
    * @param {*} uuids serviceUUID or deviceUUID
    * @param {*} opt {withServiceUUID:false}
    * @returns {Promise<Map<uuid, Bluetooth>>}
    */
   retrievePeripheralsForIOS(uuids, opt={withServiceUUID:false}){
       return new Promise()
   },

       /**
     * 打开蓝牙
     * @static
     * @param {boolean} silence
     *
     * @mark andr done
     */
    enableBluetoothForAndroid(silence=false) {
         native.MIOTBluetooth.openBluetooth(silence);
    },

    /**
     * 判断蓝牙是否开放
     * @static
     * @returns {Promise<boolean>}
     * @mark andr done
     */
    checkBluetoothIsEnabledForAndroid(callback) {
      native.MIOTBluetooth.isBluetoothOpen(callback);
    },

    /**
     * 判断当前设备是否通过蓝牙网关扫描到了
     * @static
     * @returns {Promise<boolean>}
     * @mark andr done
     */
    isBleGatewayConnected(callback) {
      native.MIOTBluetooth.isBleGatewayConnected(callback);
    }

};
