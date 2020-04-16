/**
 * @export public
 * @doc_name 基础插件设备模块
 * @doc_index 2
 * @doc_directory device
 * @module miot/device
 * @description
 * 设备相关 API,主要包括当前实例设备对象，部分对象方法，以及设备事件
 * 设备对象的属性，请直接查看下面各个API/属性说明
 * 部分对象方法主要包含：获取小米WiFi设备控制类，获取蓝牙设备控制类，修改时区，修改设备名称，获取定向推荐，获取当前设备属性等。
 * 设备事件主要有：设备名称更改，设备时区更改，设备状态更改，获取到设备消息
 * @example
 *
 * componentDidMount(){
 *      this._deviceNameChangedListener = DeviceEvent.deviceNameChanged.addListener(device => {
 *      this.state.name = device.name;
 *      this.setState({});
 *   });
 * }
 *
 * 一定要记得，用完后要移除，否则可能报错
 *
 *  componentWillUnmount(){
 *      this._deviceNameChangedListener && this._deviceNameChangedListener.remove();
 *  }
 *
 * BasicDevice 当前设备实例对象，用于获取当前设备属性,调用设备基础方法等
 *
 * @example
 * import {Device} from 'miot/device'
 *
 * //属性获取
 * let did = Device.deviceID
 * let deviceModel = Device.model
 * //wifi方法 e.g RPC请求
 * Device.getDeviceWifi().callMethod('method_name', params)
 *  .then(res => {//here is the success result})
 *  .catch(err => {//error happened})
 *
 * 其余具体使用请参考具体API文档
 */
/**
 * 设备事件集合
 * @description DeviceEvent 当前设备事件：可以理解为iOS中的通知，或者Android中的广播.表示此事件发生后，通知监听此事件的组件执行某操作。
 * @namespace DeviceEvent
 */
export const DeviceEvent = {
    /**
     * 设备名称变更事件
     * @event
     * @param {IDevice} device -发生变更的设备
     * @since 1.0.0
     *
     */
    deviceNameChanged: {
    },
    /**
     * 设备时区变更事件
     * @event
     * @param {IDevice} device -发生变更的设备
     * @since 1.0.0
     */
    deviceTimeZoneChanged: {
    },
    /**
     * 设备状态变更事件
     * @event
     * @param {IDevice} device -发生变更的设备
     */
    deviceStatusChanged: {
    },
    /**
     * 设备消息,注意订阅的消息都是通过此方法返回。
     * @event
     * @param {IDevice} device
     * @param {Map<string,object>} messages -接收到的数据
     * @param {array} originData -接收到的数据, [{key,time,value}]
     *
     * @example
     *
     * import {Device, DeviceEvent} from 'miot'
     *
     * let msgSubscription = null;
     * // 普通设备：
     * Device.getDeviceWifi().subscribeMessages("prop.power", "event.something").then(subcription=>{
     *      msgSubscription = subcription;
     * });
     * // miot-spec设备（参数为：prop.siid.piid或event.siid.eiid）：
     * Device.getDeviceWifi().subscribeMessages("prop.2.1", "event.3.1").then(subcription=>{
     *      msgSubscription = subcription;
     * });
     *
     * ...
     * const subscription = DeviceEvent.deviceReceivedMessages.addListener(
     * (device, messages)=>{
     *  // 普通设备
     *   if(messages.has('prop.power')){
     *      const power = messages.get('prop.power');
     *      ...
     *   }
     *  // miot-spec设备
    *   if(messages.has('prop.2.1')){
     *      const power = messages.get('prop.2.1');
     *      ...
     *   }
     *   ...
     * })
     * ...
     *
     * msgSubscription&&msgSubscription.remove();
     *
     */
    deviceReceivedMessages: {
    },
    /**
     * 多键开关名称变更事件
     * @event
     * @param {Map<string, object>} value {"1":{"ai_desc":"","home_id":1,"id":1,"name":"","icon":"","room_id":1},"2":{"ai_desc":"","home_id":1,"id":2,"name":"","icon":"","room_id":1}}
     * @param {String} did 设备did
     * @since 10037
     */
    multiSwitchNameChanged: {
    }
};
buildEvents(DeviceEvent)
/**
 * 基础设备控制类
 * @interface
 */
export class BasicDevice {
    /**
     *获取设备 id，每一个真实设备都有一个唯一的 id
     * @return {string}
     * @readonly
     *
     */
    get deviceID() {
         return  0
    }
    /**
     * 获取设备的 model,设备类型的唯一标识
     * @return {string}
     * @readonly
     *
     */
    get model() {
         return  ""
    }
    /**
    * 获取小米WiFi设备控制类
    * Device.getDeviceWifi().callMethod(xxx)
    */
    getDeviceWifi() {
         return null
    }
    /**
     *设备是否已经可用,没有did的设备的插件，可能调用此方法判断接口是否可用。此方法没什么其他存在的意义，一般也不需要使用此方法
     * @return {boolean}
     * @readonly
     *
     *
     */
    get isReady() {
         return false
    }
    /**
     * 如果有父设备，直接获取 父设备 Device，一般是网关子设备才会有父设备，注意：**设备组的子设备没有父设备，或者说设备组子设备的父设备不是这个设备组**
     * @return {BasicDevice}
     * @readonly
     *
     */
    get parentDevice() {
         return null
    }
    /**
     * 是否是根设备，没有父设备的设备，即为根设备。一般网关子设备不是根设备，其他的都是
     * @member
     * @return {boolean}
     * @readonly
     *
     */
    get isRootDevice() {
         return  false
        return !(parent && Object.keys(parent).length > 0);
    }
    /**
     * 批量删除设备, 不能删除 小米路由器/本地蓝牙/局域网直连设备，不能删除与自己设备无关的设备，比如，其他生态链公司的设备。
     * @since 10011
     * @param {object[]} didAndPids did 与 pid（Device.type） 列表 [{did:xx,pid:xx}, {did:xx,pid:xx}]
     */
    @report
    deleteDevices(didAndPids) {
         return Promise.resolve(null);
    }
    /**
     * 获取子设备列表，一般网关才会有子设备，注意此方法无法获取设备组的子设备。获取虚拟设备组的子设备，请使用Device.getDeviceWifi().getVirtualDevices()方法。Mesh设备组暂时没有查询子设备的方法。
     * @since 10004
     * @method
     * @example
     * import 'Device' from 'miot'
     * Device.getSubDevices()
     * .then(devices => {//get device list})
     * @returns {Promise<BasicDevice[]>}
     *      resolve：array<BasicDevice>子设备列表
     *      reject：{code:xxx,message:xxx} -1:找不到网关设备  其他code：服务端错误/网络错误
     */
    @report
    getSubDevices(useCache = false) {
         return Promise.resolve([]);
    }
    /**
     * 获取蓝牙网关关联的普通蓝牙和蓝牙mesh设备列表。
     * @since 10020
     * @param {string} [did=Device.deviceID] 蓝牙网关的did，可以为空，为空时默认取当前Device.deviceID
     * @returns {Promise} 返回数组设备信息的promise， {"mesh":[], "normal":""}
     *      resolve：array<DeviceData> {iconURL,did,model,userId,extra,name,session,permitLevel,parentId,parentModel,mac,propInfo,ip,ssid,bssid,pid,latitude,longitude,isVoiceDevice,isOnline,ownerId,ownerName}，字段具体含义和BasicDevice中对应字段含义一样
     *      reject：{code:xxx,error:xxx,extra:xxx} code只会等于-1。 res.code -1:网关设备不存在  401:只能查找当前设备或者父网关设备的列表  404:无子设备数据
     */
    @report
    getLinkedBTDevices(did = null) {
         return Promise.resolve([]);
    }
    /**
     * @typedef {Object} DeviceConfig
     * @property {string} deviceIconURL 设备的实物icon url
     * @property {string} deviceName 设备类型的名称。**注意此名称不是设备名称**
     * @property {string} resetPageURL 设备的重置引导url
     */
    /**
     * 获取某个model设备的默认配置，例如iconurl，名称等等
     * @since 10010
     * @param {string} model 指定设备的model
     * @returns {DeviceConfig} 设备配置
     *      resolve：DeviceConfig
     *      reject：不会走reject
     *
     */
    @report
    loadRealDeviceConfig(model) {
         return Promise.resolve({});
    }
    /**
    * 是否虚拟设备，虚拟设备主要指老的设备组（Yeelight灯组，飞利浦灯组）。
    * **注意：mesh设备组，灯组2.0均不是虚拟设备**
    * @since 10003
    * @return {boolean}
    * @readonly
    *
    */
    get isVirtualDevice() {
         return  false
    }
    /**
     * 获取小米BLE蓝牙控制类,
     * 注意: 在 iOS 平台上, 如果没有指定peripheralID, 则须先执行Bluetooth.scan(),
     * 扫描到与device.mac匹配的蓝牙设备之后才能 connect 成功, 否则将不能成功执行后来的所有操作.
     * @method
     * @param {string} peripheralID -- iOS平台上可以直接指定与设备 mac 匹配的peripheralID, android 平台不需要此参数
     * @returns {IBluetoothLE}
     * @example
     *
     * import {Device} from 'miot/device'
     *
     * const peripheralUUID4IOS = ...;
     *
     * Device.getBluetoothLE(peripheralUUID4IOS).connect()
     * .then(ble=>{
     *      ble....
     * })
     * .catch(error=>{
     *
     * })
     */
    @report
    getBluetoothLE(peripheralID = null) {
         return null
    }
    /**
     * @typedef {Object} GPSInfo
     * @property {number} longitude  经度
     * @property {number} latitude   纬度
     * @property {string} countryCode  国家码
     * @property {string} adminArea  地区信息
     * @property {string} locality  城市信息
     * @property {string} subLocality 城区信息
     * @property {string} thoroughfare  街道信息
     * @property {string} language 地区语言信息
     */
    /**
     * 将当前手机的定位信息作为新的设备位置进行上报，该操作会更新设备的地理位置信息。
     * @since 10020
     * @returns {Promise<GPSInfo>}
     *      resolve：GPSInfo
     *      reject：{code:xxx,message:xxx} 其他code：网络错误/服务端错误
     */
    @report
    reportDeviceGPSInfo() {
         return Promise
    }
    /**
     * 设备所有者的小米账号, 可以使用 load 获取 account 下的所有数据。
     * 不调用 load 只有 ID，nickName 字段有值。
     * 注:Service.account 不load时只有ID可用，与此处不一样。
     * @return {IAccount} 账号信息。详见Account.js
     * @readonly
     * @see {@link module:miot/Account}
     *
     */
    get owner() {
         return null
    }
    /**
     * 设备的名称。注意与loadRealDeviceConfig返回的deviceName的区别
     * @return {string}
     * @readonly
     *
     */
    get name() {
         return  ""
    }
    /**
     * 设备的 token 加密后生成的固定值，在设备快连入网时生成，能唯一标识设备的生命周期，直至被重置、重新快连入网。可以使用此字段，鉴定设备有没有被重新绑定。注意该 Session 并非设备与服务器交互时认证所用 Token，只能用于标识作用
     * 使用方法：将session保存到手机里(Host.storage.set)，或者userdata（Service.smarthome.setDeviceData）,后续打开插件后，对比保存的session与当前session，如果相同，则表示未重置
     * @return {string}
     * @readonly
     *
     */
    get session() {
         return  ""
    }
    /**
     *开发者平台配置的设备图标 一个图片的下载地址，和米家设备列表页的图标一样
     * @return {string}
     * @readonly
     *
     */
    get iconURL() {
         return  ""
    }
    /**
     * 当前账户对设备的控制权限，主要用于分享的设备 4:普通分享 36:只读分享。一般情况下，分享的设备可以被控制，但是不能添加/删除/修改 自动化和倒计时定时。如果出现被分享的设备，有不该有的功能，请通过此处的permitLevel判断并增加权限控制
     * @return {int}
     * @readonly
     *
     */
    get permitLevel() {
         return  0
    }
    /**
     * 是否设置了进入插件使用密码，如果你们的设置页面有修改密码功能，可以通过此字段，判断密码是否设置了。
     * @return {boolean}
     * @readonly
     *
     */
    get isSetPinCode() {
         return  false
    }
    /**
     * 是否在设备列表显示，一般不需要使用此方法。
     *  0 -- 不显示
     * @return {int}
     * @readonly
     *
     */
    get showMode() {
         return  0
    }
    /**
     * 获取设备的 mac 地址，蓝牙设备返回为空字符串
     * @return {string}
     * @readonly
     *
     */
    get mac() {
         return  ""
    }
    /**
     * 获取当前固件的版本，记住，只能获取wifi设备/combo设备的固件版本，其他设备的固件版本，请使用其他方法读取。比如：蓝牙使用BTDevice.getVersion()。如果是zigbee，红外等设备，请尝试此方法和蓝牙的getVersion方法，看哪个能获取到正确的值，然后就使用哪个。
     * @return {string}
     * @readonly
     *
     */
    get lastVersion() {
         return  ""
    }
    /**
     *获取设备的 ip，蓝牙设备的ip为空
     * @return {string}
     * @readonly
     *
     */
    get IP() {
         return  ""
    }
    /**
     * 获取 wifi 信号强度，蓝牙/Mesh设备的为空
     * @return {string}
     * @readonly
     *
     */
    get RSSI() {
         return  ""
    }
    /**
     * 获取连接 wifi 的名称，蓝牙/Mesh设备的为空
     * @return {string}
     * @readonly
     *
     */
    get SSID() {
         return  ""
    }
    /**
     * 获取连接 wifi 的mac 地址，蓝牙/Mesh设备为空
     * @return {string}
     * @readonly
     *
     */
    get BSSID() {
         return  ""
    }
    /**
     * 获取设备类型，0：wifi单模设备，1：yunyi设备，2：云接入设备，3：zigbee设备，5：虚拟设备，6：蓝牙单模设备，7：本地AP设备，8：蓝牙wifi双模设备，9：其他，10：功能插件，11：SIM卡设备，12：网线设备，13：NB-IoT，14：第三方云接入，15：红外遥控器，16：BLE Mesh，17：虚拟设备（新设备组）
     * @return {int}
     * @readonly
     *
     */
    get type() {
         return  0
    }
    /**
     * 获取上次修改（修改名称，绑定/解绑等）的时间戳, 例如1532587811237
     * 暂时没想到它的使用场景，有开发者想到了可以联系米家更新文档
     * @return {long} 时间戳
     * @readonly
     *
     */
    get lastModified() {
         return  1532587811237
    }
    /**
     * 本地设备还是远程设备, 0未知 1本地 2远程。
     * iOS中，本地设备指的是既没有绑定到iot平台，又不是被分享的设备。**注意：不是寻常理解的，同一个路由器的是本地设备，不同路由器的是远程设备，iOS中，无法获取一个设备是否在同一个局域网**
     *
     * @return {int}  0未知 1本地 2远程。
     * @readonly
     *
     */
    get location() {
         return  0
    }
    /**
     * 设备的纬度
     * @return {double}
     * @readonly
     *
     */
    get latitude() {
         return  0.0
    }
    /**
     * 设备的经度
     * @return {double}
     * @readonly
     *
     */
    get longitude() {
         return  0.0
    }
    /**
     * 是否支持语音（一般指小爱同学）控制
     * @return {boolean}
     * @readonly
     *
     */
    get isVoiceDevice() {
         return  false
    }
    /**
     * 设备是否在线 true 在线。离线设备在插件内几乎所有功能均不可操作
     * @return {boolean}
     * @readonly
     *
     */
    get isOnline() {
         return  false
    }
    /**
     *是否是自己的设备，若是别人（包含家属）分享给你的设备，isOwner则为false
     * @return {boolean}
     * @readonly
     *
     */
    get isOwner() {
         return  false
    }
    /**
     * 当前账户对设备的控制权限，主要用于分享的设备 4:普通分享 36:只读分享 68:家庭分享
     * @return {boolean}
     * @readonly
     *
     */
    get isFamily() {
         return  false
        return permitLevel == PERMISSION_FAMILY || permitLevel == PERMISSION_FAMILY_IOS;
    }
    /**
     *是否是别人分享的设备，若是家属分享给你的设备，isShared为fasle，isFamily为true
     * @return {boolean}
     * @readonly
     *
     */
    get isShared() {
         return  false
        return (permitLevel == PERMISSION_SHARE || permitLevel == PERMISSION_SHARE_READONLY) && Properties.of(this).ownerName !== null;
    }
    /**
     *是否是已经绑定的设备，一般返回true
     * @since 10005
     * @return {boolean}
     * @readonly
     *
     */
    get isBinded() {
         return  false
    }
    /**
     * 是否是别人分享的只读设备,权限比isShared更小。受iot后台基础配置 - 产品共享影响。产品共享可配置为：支持（用户不可选共享权限），支持（用户可选共享权限）（可查看可操作设备，可查看不可操作设备），不支持共享
     * 如果后台配置选择的支持（用户可选共享权限），然后设备拥有者分享时选择的是可查看不可操作设备，则此选项为True
     * @return {boolean}
     * @readonly
     *
     */
    get isReadonlyShared() {
         return  false
    }
    /**
     * 获取当前设备的时区信息（国际标准时区）。**注意：国际标准时区中，没有Asia/Beijing。**
     * @since 10021
     * @returns {Promise} 成功进入then，失败进入catch。then：res="Asia/Shanghai";
     * resolve：timezone string
     * reject：{code: xxx, message: xxx}
     */
    @report
    getDeviceTimeZone() {
         return Promise
    }
    /**
     * 修改设备/子设备的名字，注意不支持蓝牙网关对子设备名称的修改
     * @since 10022
     * @param {String} newName 设备的新的名称
     * @param {String} did 如果修改自身的名称，可不传，如果修改子设备的，则需要传子设备的did。如果did是其他，调用此方法会走reject
     * @returns {Promise} 成功进入then，失败进入catch
     *      resolve：成功时，res为新名称。同时，DeviceEvent的deviceNameChanged会被触发
     *      reject：{code: xxx, message: xxx} -1:新名称不合法  -2:非当前设备或者子设备，没有改名权限  其他code：网络问题/服务端问题
     */
    @report
    changeDeviceName(newName, did = null) {
        // @native begin
        return new Promise((resolve, reject) => {
            native.MIOTDevice.changeDeviceName(newName, did, (ok, res) => {
                if (ok) {
                    const { device, props } = _find_device(did);
                    if (device && props) {
                        props.name = newName;
                    }
                    resolve(res);
                } else {
                    reject(res);
                }
            })
        });
        // @native end
    }
    // @programe mark deprecated
    /**
     * 获取虚拟设备的子设备列表，
     * @deprecated since 10032 请使用Device.getDeviceWifi().getVirtualDevices()代替
     */
    @report
    getVirtualDevices() {
         return Promise.resolve([]);
         return Promise.resolve({});
         return Promise
    }
    /**
     * 除了基本信息的其他部分额外信息都在这个字段返回，如：{"fw_version":"1.4.0","mcu_version":"0001","isSetPincode":0}
     * 可以解析为 json
     * @deprecated since 10032 此字段后台无人维护，也无人知道它存在的含义，故废弃。
     * @return {string}
     * @readonly
     *
     */
    get extra() {
         return  ""
    }
    /**
    * 检查当前设备是否支持HomeKit，Android系统不支持HomeKit设备。需要在plato平台配置homekit_config，包含在内的设备，isHomekit才可能返回true
    * @deprecated since 10032 请使用Device.getDeviceWifi().checkIsHomeKitDevice()
    */
   @report
    checkIsHomeKitDevice() {
         return Promise
    }
    /**
     * 检查当前设备是否已经接入了HomeKit，Android不支持。如果没有接入，可以调用下面的bindToHomeKit方法，将设备接入
     * @deprecated since 10032 请使用Device.getDeviceWifi().checkHomeKitConnected()
     */
    @report
    checkHomeKitConnected() {
         return Promise
    }
    /**
     * 将当前设备绑定到HomeKit中
     * @deprecated since 10032 请使用Device.getDeviceWifi().bindToHomeKit()
     *
     */
    @report
    bindToHomeKit() {
         return Promise
    }
    /**
    * 检查wifi设备固件升级弹窗。该方法会触发升级弹窗alert提示。
    * @deprecated since 10032,请使用Device.getDeviceWifi().checkFirmwareUpdateAndAlert()
    */
   @report
    checkFirmwareUpdateAndAlert() {
         return Promise.resolve({});
    }
    /**
     * 实时获取设备的网络信息包括网络强度，此方法一般情况下不走reject
     * @return {Object} NetworkInfo
     * @deprecated since 10032 即将废弃，请使用Device.getDeviceWifi().readDeviceNetWorkInfo()。
     */
    @report
    readDeviceNetWorkInfo(did) {
         return Promise.resolve([]);
    }
    /**
     * 父设备的 model,10023及其之后返回空字符串
     * @deprecated   10023开始废弃，10023及后续版本建议使用 Device.parentDevice.model
     * @return {string}
     * @readonly
     *
     */
    get parentModel() {
         return  ""
    }
    /**
     * 获取设备时区,非实时加载，可能为空.如果需要自行获取最新设备时区值，请使用smarthome.getDeviceTimeZone(did)
     * @return {string}
     * @deprecated   10021开始废弃，10021及后续版本建议使用 Device.getDeviceTimeZone().then
     */
    get timeZone() {
         return  ""
    }
    /**
     * 获取 prop中保存的信息。当某设备有莫人属性时，这里为莫人属性的值，否则无此字段。不同设备类型，propInfo中包含的属性可能不同，propInfo一半是个json。
     * @deprecated 因此属性极大造成米家设备列表页接口响应时长变长，现已废弃，一般都会返回null。若需要这里面的属性，请直接通过callMethod去读取。
     * @return {json}
     * @readonly
     *
     */
    get propInfo() {
         return  {}
    }
    /**
     * 重置标志，本地设备才会返回该字段，为1时表示设备刚刚reset过
     * @deprecated 10023开始废弃，后续不再提供此字段，此方法永远返回0
     * @return {int}
     * @readonly
     */
    get resetFlag() {
         return  0
    }
    /**
     * 创建场景
     * @deprecated since 10032 请使用Service.scene.createScene(BasicDevice.deviceID,sceneType,opt)
     * @method
     * @param {SceneType} 同上loadScenes的sceneType
     * @param {json} opt  同上loadScenes的opt，此处传入opt，后续获取场景时，可根据此opt来筛选
     * @returns {IScene}
     * @see {@link module:miot/service/scene}
     *
     */
    @report
    createScene(sceneType, opt = null) {
         return  ""
    }
    /**
     * 创建定时场景
     * @deprecated since 10032 请使用Service.scene.createTimerScene(BasicDevice.deviceID,opt)
     * @method
     * @param {json} opt 同上loadScenes的opt，此处传入opt，后续获取场景时，可根据此opt来筛选
     * @returns {IScene}
     * @see {@link module:miot/service/scene}
     *
     */
    @report
    createTimerScene(opt = null) {
         return  ""
    }
    /**
    * 加载本设备相关的场景
    * @deprecated since 10032 请使用Service.scene.loadScenes(BasicDevice.deviceID,sceneType,opt)
    * @method
    * @param {*} sceneType  SceneType.Timer(定时场景)，SceneType.Artificial(人工场景)，SceneType.Automatic(自动场景)
    * @param {*} opt {identify,name} identify：代表场景的分类，创建场景时可自定义此参数；如果获取场景的时候传入identify，表示获取identify类场景列表；如果不需要对场景分类，此参数可忽略。name:场景名字
    * @returns {Promise<IScene[]>}
    * @see {@link module:miot/service/scene}
    *
    */
   @report
    loadScenes(sceneType, opt = null) {
         return  ""
    }
    /**
     * 加载定时场景
     * @deprecated since 10032 请使用Service.scene.loadTimerScenes(BasicDevice.deviceID,opt)
     * @param {json} opt 同上loadScenes的opt
     * @returns {Promise<IScene[]>}
     * @see {@link module:miot/service/scene}
     *
     */
    @report
    loadTimerScenes(opt = null) {
         return  ""
    }
    /**
     * 上报日志，写入文件，在用户反馈时可以查看。比如某个地方报错/出错了，打上log，用户反馈后，能在后台查看到。查看地址：https://iot.mi.com/fe-op/operationCenter/userFeedback
     * @deprecated since 10032,请使用Service.smarthome.reportLog()代替。
     * @param {string} log
     *
     */
    @report
    reportLog(log) {
    }
}
/**
 * @export 导出rootDevice
 */
export default RootDevice;