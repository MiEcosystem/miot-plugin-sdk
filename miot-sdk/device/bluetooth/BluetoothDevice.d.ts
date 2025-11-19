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
  readonly get isBLE(): boolean;
  /**
       * 蓝牙设备的 mac 地址
       * @member
       * @type {string}
       * @readonly
       *
       */
  readonly get mac(): string;
  /**
       * 蓝牙设备的 UUID
       * @member
       * @type {string}
       * @readonly
       *
       */
  readonly get UUID(): string;
  /**
       * 蓝牙是否已经连接
       * @member
       * @type {boolean}
       * @readonly
       *
       */
  readonly get isConnected(): boolean;
  /**
       * 蓝牙是否处于连接中
       * @since 10004
       * @member
       * @type {boolean}
       * @readonly
       *
       */
  readonly get isConnecting(): boolean;
  /**
     * 蓝牙设备是否正在OTA中
     * @since 10044
     * @member
     * @type {boolean}
     * @readonly
     */
  readonly get doingOTA(): boolean;
  checkBluetoothPermission(): void;
  createBluetoothClassic(macOrPeripheralID: any): null;
  loadBasicDeviceInstance(): null;
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
     * |-46|蓝牙安全协议绑定过程中，获取bindkey失败|
     * |-47|标准认证中，获取设备信息失败|
     * |-48|标准认证：绑定失败，需要App Confirm|
     * |-49|标准认证：OOB验证失败|
     * |-50|标准认证：注册时需要二维码OOB|
     * |-51|标准认证：注册认证失败|
     * |-52|标准认证：登录认证失败|
     * |-53|标准认证：登录认证失败，重复登录|
     * |-54|标准认证：登录的时候token为空|
     * |-55|普通蓝牙设备：绑定时将notify超时从request分离出来|
     * 蓝牙设备类型（parameter type)
     *
     * | type | description |
     * | :-:  | --- |
     * | -1   | 自动判断 Android不支持 |
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
  connect(type?: int, option?: json): Promise<IBluetooth>;
  _connect(type?: number, option?: number): Promise<any>;
  /**
     * 读取 RSSI
     * @method
     * @returns {Promise<*>}
     *
     */
  readRSSI(): Promise<any>;
  /**
     * 关闭链接 **注意小米协议的蓝牙设备，退出插件的时候，一定要调用此方法，关闭蓝牙连接，否则下次打开插件的时候，会提示蓝牙无法连接**
     * @method
     * @param {int} delay -延迟时长(毫秒)
     * @param {boolean} forceDisconnect - 强制断开蓝牙连接，默认值为false。为false时，如果当前状态为连接中则不会断开连接；如果为true,不管当前是什么状态，都会请求APP断开连接。从10050开始新增，仅针对Android生效
     */
  disconnect(delay?: int, forceDisconnect?: boolean): boolean;
  /**
     * 获取当前连接设备写操作每包最大长度
     * 注：有开发者反馈该系统接口在 iOS 上并不完全准确，不可过于依赖，以实际测试为准。（比如，charac.write()写入10byte成功，写入11byte失败，则max为10）
     * 注：返回值单位为 bit，注意换算，8 bit 为 1 byte，两字符 hexString 长度为 1 byte，如 “FF”
     * @method
     * @deprecated Use {@readReliableMTU} 建议使用readReliableMTU
     * @param {int} type - 0 代表 writeWithResponse, 1 代表 writeWithoutResponse，理论上结果是一样的。
     * @return {Promise<number>} 最大长度
     *        resolve: iOS时，返回系统返回的长度，Android返回160bit
     *        reject：iOS设备未连接会reject connect the device first，Android 不会走reject
     */
  maximumWriteValueLength(type?: int): Promise<number>;
  /**
     * 获取当前连接设备单包可交互的最大MTU值，单位为byte。
     * 当结果 reliable === true 时，表示该结果值为手机与设备进行了一次固定大小的文件传输交换测试，可以确保结果MTU为可交互的MTU大小，否则结果值为系统默认值，不可信。
     * 支持的设备会返回有效MTU大小，不支持的设备会返回默认值。仅支持 WriteWithoutResponse 方式
     * 注：该接口仅可用于支持通用OTA方案的蓝牙固件之上，固件限制具体如下：
     * RC4协议设备不支持。
     * StandardAuth标准认证 version >= 1.1.0
     * Mesh认证 version >= 1.4.0
     * SecureAuth认证 version >= 2.3.0
     * 返回结果值为{reliable:true, mtu: 111},reliable 表示结果值是否可靠，mtu 表示单包可传递最大大小
     * @method
     * @since 10038
     * @param {Object} params - 暂时可以不传。
     * @param {double} params.timeout 数据交互超时限时，默认为2s
     * @return {Promise<Object>} 最大可读写长度,单位为byte
     */
  readReliableMTU(params?: {
        timeout: double;
    }): Promise<Object>;
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
  getVersion(isFromlocal?: boolean, isCrypto?: boolean): Promise<any>;
  /**
     * 订阅ble spec 消息推送；除了订阅之外，插件需要与设备建立蓝牙连接，并主动扫描设备的特征值，设备才会给插件推送消息。
     * @since 10040
     * @param  {...string} propertyOrEventNames prop.2.1,event.2.1
     * @example
     * //详细使用示例可以参考com.xiaomi.bledemo/Main/BleSpec.js
       let listener0= DeviceEvent.BLESpecNotifyActionEvent.addListener((device, data) => {
          console.log('receive prop(event) changed notification:' + JSON.stringify(data))
          data.forEach((key, value) => {
            console.log(`receive prop(event) changed notification,prop:${ key }`, JSON.stringify(value));
          });
        });
        this._s1 = BluetoothEvent.bluetoothSeviceDiscovered.addListener((blut, services) => {
          if (services.length <= 0) {
          return;
          }
          console.log('bluetoothSeviceDiscovered', blut.mac, services.map(s => s.UUID), bt.isConnected);
          const s = services.map(s => ({ uuid: s.UUID, char: [] }));
          services.forEach(s => {
            s.startDiscoverCharacteristics();
          });
        }
        bt = Device.getBluetoothLE();
        if(bt.isConnected){
          bt.startDiscoverServices();
          bt.subscribeMessages('prop.2.1','event.2.1').then(res => {
            console.log('subscribe exception success,res:',JSON.stringify(res));
          }).catch(err => console.log('subscribe exception fail'))
        } else if(bt.isConnecting){
          let listener1 = BluetoothEvent.bluetoothConnectionStatusChanged.addListener((blut, isConnect) => {
          console.log('bluetoothConnectionStatusChanged', blut, isConnect);
          if (bt.mac === blut.mac) {
            if(isConnect){
              bt.startDiscoverServices();
              bt.subscribeMessages('prop.2.1','event.2.1').then(res => {
                console.log('subscribe exception success,res:',JSON.stringify(res));
              }).catch(err => console.log('subscribe exception fail'))
            }else{
              console.log('connect bledevice error');
            }
            listener1.remove();
          }
        }else{
          bt.connect(scType,{ did: Device.deviceID }).then(res=>{
            bt.startDiscoverServices();
            bt.subscribeMessages('prop.2.1','event.2.1').then(res => {
              console.log('subscribe exception success,res:',JSON.stringify(res));
              }).catch(err => console.log('subscribe exception fail'))
            });
          });
        }
     */
  subscribeMessages(...propertyOrEventNames: string[]): Promise<{
        code: number;
        message: string;
        count: number;
    }>;
    /**
     * 取消订阅
     * @since 10040
     * @param  {...string} propertyOrEventNames ,propertyOrEventNames为空表示取消当前设备所有订阅
     * @example
     * 一次取消订阅多个属性或者事件：
     *  Device.getBluetoothLE().unsubscribeMessages('prop.2.1','event.2.1);
     * 分多次取消：
     * Device.getBluetoothLE().unsubscribeMessages('prop.2.1');
     * Device.getBluetoothLE().unsubscribeMessages('event.2.1');
     * 一次取消所有订阅过的属性或事件：
     * Device.getBluetoothLE().unsubscribeMessages();
     *
     */
  unsubscribeMessages(...propertyOrEventNames: string[]): Promise<{
        code: number;
        message: string;
        count: number;
    }>;
  get securityLock(): any;
  getService(serviceUUID: any): any;
  startDiscoverServices(...serviceUUIDs: any[]): boolean;
}
export namespace BluetoothEvent {
    namespace bluetoothConnectionStatusChanged {
        function forever(emitter: any): ({ mac, isConnected, uuid }: {
            mac: any;
            isConnected: any;
            uuid: any;
        }) => void;
    }
    namespace bluetoothDeviceDiscovered {
        export function forever_1(emitter: any): (data: any) => void;
        export { forever_1 as forever };
    }
    namespace bluetoothDeviceDiscoverFailed {
        function always(emitter: any): ({ error }: {
            error: any;
        }) => void;
    }
    namespace bluetoothSeviceDiscovered {
        export function forever_2(emitter: any): ({ mac, foundUUIDs }: {
            mac: any;
            foundUUIDs: any;
        }) => void;
        export { forever_2 as forever };
    }
    namespace bluetoothSeviceDiscoverFailed {
        export function always_1(emitter: any): ({ mac, error }: {
            mac: any;
            error: any;
        }) => void;
        export { always_1 as always };
    }
    namespace bluetoothCharacteristicDiscovered {
        export function forever_3(emitter: any): ({ mac, serviceUUID, foundUUIDs }: {
            mac: any;
            serviceUUID: any;
            foundUUIDs: any;
        }) => void;
        export { forever_3 as forever };
    }
    namespace bluetoothCharacteristicDiscoverFailed {
        export function always_2(emitter: any): ({ mac, serviceUUID, error }: {
            mac: any;
            serviceUUID: any;
            error: any;
        }) => void;
        export { always_2 as always };
    }
    namespace bluetoothCharacteristicValueChanged {
        export function forever_4(emitter: any): ({ mac, serviceUUID, characteristicUUID, value }: {
            mac: any;
            serviceUUID: any;
            characteristicUUID: any;
            value: any;
        }) => void;
        export { forever_4 as forever };
    }
    const bluetoothStatusChanged: Event | undefined;
}
import { setMacUuid } from "./utils/uuid";
import { getMacUuid } from "./utils/uuid";
export { setMacUuid, getMacUuid };