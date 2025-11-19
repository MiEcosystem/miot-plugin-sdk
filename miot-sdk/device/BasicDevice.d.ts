export function _find_device(did: any): {
    device?: undefined;
    props?: undefined;
} | {
    device: BasicDevice;
    props: any;
};
export namespace DeviceEvent {
    namespace deviceNameChanged {
        function forever(emitter: any): ({ did, newName }: {
            did: any;
            newName: any;
        }) => void;
    }
    namespace deviceIconChanged {
        export function forever_1(emitter: any): ({ did, subclass_id, proxy_category_icon }: {
            did: any;
            subclass_id: any;
            proxy_category_icon: any;
        }) => void;
        export { forever_1 as forever };
    }
    namespace deviceTimeZoneChanged {
        export function forever_2(emitter: any): ({ did, timeZone }: {
            did: any;
            timeZone: any;
        }) => void;
        export { forever_2 as forever };
    }
    namespace bleDeviceFirmwareNeedUpgrade {
        export function forever_3(emitter: any): ({ did, currentVersion, latestVersion, mcu_version, current_mcu_version }: {
            did: any;
            currentVersion: any;
            latestVersion: any;
            mcu_version: any;
            current_mcu_version: any;
        }) => void;
        export { forever_3 as forever };
    }
    namespace deviceStatusChanged {
        export function forever_4(emitter: any): ({ did, newStatus }: {
            did: any;
            newStatus: any;
        }) => void;
        export { forever_4 as forever };
    }
    namespace BLESpecNotifyActionEvent {
        export function forever_5(emitter: any): ({ result }: {
            result: any;
        }) => void;
        export { forever_5 as forever };
    }
    namespace deviceReceivedMessages {
        export function forever_6(emitter: any): ({ did, data, subcribeId }: {
            did: any;
            data: any;
            subcribeId: any;
        }) => void;
        export { forever_6 as forever };
        export const sameas: string;
    }
    namespace multiSwitchNameChanged {
        export function forever_7(emitter: any): (params: any) => void;
        export { forever_7 as forever };
    }
    namespace pinCodeVerifyPassed {
        const always: boolean;
    }
    namespace pinCodeSwitchChanged {
        export function forever_8(emitter: any): ({ did, switchStatus }: {
            did: any;
            switchStatus: any;
        }) => void;
        export { forever_8 as forever };
    }
}
/**
 * 基础设备控制类
 * @interface
 */
export class BasicDevice {
  /**
       * 是否有固件更新，为了显示小红点
       * @param {boolean}
       */
  set needUpgrade(arg: boolean);
  /**
       * 是否有固件更新，为了显示小红点,一般不需要开发者设置，自己使用
       * @return {boolean}
       */
  get needUpgrade(): boolean;
  /**
       *获取设备 id，每一个真实设备都有一个唯一的 id
       * @return {string}
       * @readonly
       *
       */
  readonly get deviceID(): string;
  /**
       * 获取设备的 model,设备类型的唯一标识
       * @return {string}
       * @readonly
       *
       */
  readonly get model(): string;
  get specUrn(): any;
  /**
     * device的 pd_id，和model是一一对应的关系，可以理解为唯一对应一个设备
     * （注：与pid是两种概念）
     * @return {number}
     * @readonly
     *
     */
  readonly get pd_id(): number;
  /**
     * device在隐私平台上传的最新的隐私的版本，返回字符串类型 eg: 0002
     * @return {string}
     * @readonly
     */
  readonly get lastestPrivacyVersion(): string;
  /**
     * device在隐私平台上传的最新的隐私的版本，返回字符串类型 eg: 0002
     * @return {string}
     * @readonly
     */
  readonly get productName(): string;
  /**
     * device 的配网方式
     * @return {number}
     * @readonly
     */
  readonly get sc_type(): number;
  /**
     * device config info
     * @return {object}
     * @readonly
     */
  readonly get deviceConfigInfo(): any;
  /**
     * 获取设备的 是否是新绑定的设备
     * @return {boolean}
     * @readonly
     *
     */
  readonly get isNew(): boolean;
  /**
     * 路由器设备专属属性
     *
     * since SDK 10083
     * */
  get partnerId(): any;
  get meshId(): any;
  /**
      * 获取小米WiFi设备控制类
      * Device.getDeviceWifi().callMethod(xxx)
      */
  getDeviceWifi(): any;
  createWiFiDeviceInstance(): {};
  /**
       *设备是否已经可用,没有did的设备的插件，可能调用此方法判断接口是否可用。此方法没什么其他存在的意义，一般也不需要使用此方法
       * @return {boolean}
       * @readonly
       *
       *
       */
  readonly get isReady(): boolean;
  /**
       * 如果有父设备，直接获取 父设备 Device，一般是网关子设备才会有父设备，注意：**设备组的子设备没有父设备，或者说设备组子设备的父设备不是这个设备组**
       * @return {BasicDevice}
       * @readonly
       *
       */
  readonly get parentDevice(): BasicDevice;
  /**
       * 是否是根设备，没有父设备的设备，即为根设备。一般网关子设备不是根设备，其他的都是
       * @member
       * @return {boolean}
       * @readonly
       *
       */
  readonly get isRootDevice(): boolean;
  /**
       * 设备绑定到当前账号（当前家庭）下的时间戳（北京时间）
       * @since 10057
       * @member
       * @return {Number} 单位秒
       * @readonly
       */
  readonly get orderTime(): number;
  /**
       * 是否为常用设备
       * @since 10052
       * @member
       * @return {object} 成功时：{code:0,data:[true|false]}
       * @readonly
       */
  readonly getFreqFlag(): object;
  /**
       * 是否为常用摄像机
       * @since 10052
       * @member
       * @return {object} 成功时：{code:0,data:[true|false]}
       * @readonly
       */
  readonly getFreqCameraFlag(): object;
  /**
     * 批量删除设备, 不能删除 小米路由器/本地蓝牙/局域网直连设备，不能删除与自己设备无关的设备，比如，其他生态链公司的设备。
     * @since 10011
     * @param {object[]} didAndPids did 与 pid（Device.type） 列表 [{did:xx,pid:xx}, {did:xx,pid:xx}]
     */
  deleteDevices(didAndPids: object[]): Promise<any>;
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
  getSubDevices(useCache?: boolean): Promise<BasicDevice[]>;
  /**
     * 获取蓝牙网关关联的普通蓝牙和蓝牙mesh设备列表。
     * @since 10020
     * @param {string} [did=Device.deviceID] 蓝牙网关的did，可以为空，为空时默认取当前Device.deviceID
     * @returns {Promise} 返回数组设备信息的promise， {"mesh":[], "normal":""}
     *      resolve：array<DeviceData> {iconURL,did,model,userId,extra,name,session,permitLevel,parentId,parentModel,mac,propInfo,ip,ssid,bssid,pid,latitude,longitude,isVoiceDevice,isOnline,ownerId,ownerName}，字段具体含义和BasicDevice中对应字段含义一样
     *      reject：{code:xxx,error:xxx,extra:xxx} code只会等于-1。 res.code -1:网关设备不存在  401:只能查找当前设备或者父网关设备的列表  404:无子设备数据
     */
  getLinkedBTDevices(did?: string): Promise<any>;
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
  loadRealDeviceConfig(model: string): {
        /**
         * 设备的实物icon url
         */
        deviceIconURL: string;
        /**
         * 设备类型的名称。**注意此名称不是设备名称**
         */
        deviceName: string;
        /**
         * 设备的重置引导url
         */
        resetPageURL: string;
    };
    /**
    * 是否虚拟设备，虚拟设备主要指老的设备组（Yeelight灯组，飞利浦灯组）。
    * **注意：Mesh设备组，灯组2.0均不是虚拟设备**
    * @since 10003
    * @return {boolean}
    * @readonly
    *
    */
  readonly get isVirtualDevice(): boolean;
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
  getBluetoothLE(peripheralID?: string): IBluetoothLE;
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
  reportDeviceGPSInfo(): Promise<{
        /**
         * 经度
         */
        longitude: number;
        /**
         * 纬度
         */
        latitude: number;
        /**
         * 国家码
         */
        countryCode: string;
        /**
         * 地区信息
         */
        adminArea: string;
        /**
         * 城市信息
         */
        locality: string;
        /**
         * 城区信息
         */
        subLocality: string;
        /**
         * 街道信息
         */
        thoroughfare: string;
        /**
         * 地区语言信息
         */
        language: string;
    }>;
    /**
     * 设备所有者的小米账号, 可以使用 load 获取 account 下的所有数据。
     * 不调用 load 只有 ID，nickName 字段有值。
     * 注:Service.account 不load时只有ID可用，与此处不一样。
     * @return {IAccount} 账号信息。详见Account.js
     * @readonly
     * @see {@link module:miot/Account}
     *
     */
  readonly get owner(): IAccount;
  /**
     * 设备的名称。注意与loadRealDeviceConfig返回的deviceName的区别
     * @return {string}
     * @readonly
     *
     */
  readonly get name(): string;
  /**
     * 设备的 token 加密后生成的固定值，在设备快连入网时生成，能唯一标识设备的生命周期，直至被重置、重新快连入网。可以使用此字段，鉴定设备有没有被重新绑定。注意该 Session 并非设备与服务器交互时认证所用 Token，只能用于标识作用
     * 使用方法：将session保存到手机里(Host.storage.set)，或者userdata（Service.smarthome.setDeviceData）,后续打开插件后，对比保存的session与当前session，如果相同，则表示未重置
     * @return {string}
     * @readonly
     *
     */
  readonly get session(): string;
  /**
     *开发者平台配置的设备图标 一个图片的下载地址，和米家设备列表页的图标一样
     * @return {string}
     * @readonly
     *
     */
  readonly get iconURL(): string;
  /**
     * 当前账户对设备的控制权限，主要用于分享的设备 4:普通分享 36:只读分享。一般情况下，分享的设备可以被控制，但是不能添加/删除/修改 自动化和倒计时定时。如果出现被分享的设备，有不该有的功能，请通过此处的permitLevel判断并增加权限控制
     * @return {int}
     * @readonly
     *
     */
  readonly get permitLevel(): int;
  /**
     * 是否设置了进入插件使用密码，如果你们的设置页面有修改密码功能，可以通过此字段，判断密码是否设置了。
     * @return {boolean}
     * @readonly
     *
     */
  readonly get isSetPinCode(): boolean;
  /**
     * 是否在设备列表显示，一般不需要使用此方法。
     *  0 -- 不显示
     * @return {int}
     * @readonly
     *
     */
  readonly get showMode(): int;
  /**
     * 获取设备的 mac 地址，蓝牙设备返回为空字符串
     * @return {string}
     * @readonly
     *
     */
  readonly get mac(): string;
  /**
     * 获取当前固件的版本，记住，只能获取wifi设备/combo设备的固件版本，其他设备的固件版本，请使用其他方法读取。比如：蓝牙使用BTDevice.getVersion()。如果是zigbee，红外等设备，请尝试此方法和蓝牙的getVersion方法，看哪个能获取到正确的值，然后就使用哪个。
     * @return {string}
     * @readonly
     *
     */
  readonly get lastVersion(): string;
  /**
     * 获取当前最新固件的版本，蓝牙设备连接后可获取，wifi设备调用 checkFirmwareUpdateAndAlert 后可获取到
     * @return {string}
     * @readonly
     *
     */
  readonly get latestVersion(): string;
  /**
     * 获取当前最新固件的版本的mcu的版本号，使用时需要判空
     * @return {string}
     * @since 10052
     * @hide
     * @readonly
     *
     */
  readonly get latest_mcu_version(): string;
  /**
     *获取设备的 ip，蓝牙设备的ip为空
     * @return {string}
     * @readonly
     *
     */
  readonly get IP(): string;
  /**
     * 获取 wifi 信号强度，蓝牙/Mesh设备的为空
     * @return {string}
     * @readonly
     *
     */
  readonly get RSSI(): string;
  /**
     * 获取连接 wifi 的名称，蓝牙/Mesh设备的为空
     * @return {string}
     * @readonly
     *
     */
  readonly get SSID(): string;
  /**
     * 获取连接 wifi 的mac 地址，蓝牙/Mesh设备为空
     * @return {string}
     * @readonly
     *
     */
  readonly get BSSID(): string;
    /**
     * 设备类型常量
     * 来源： https://wiki.n.miui.com/pages/viewpage.action?pageId=325395852
     * */
    DEVICE_TYPE: {
        WIFI_SINGLE_MODEL_DEVICE: string;
        YUN_YI_DEVICE: string;
        CLOUD_DEVICE: string;
        ZIGBEE_DEVICE: string;
        VIRTUAL_DEVICE: string;
        BLUETOOTH_SINGLE_MODEL_DEVICE: string;
        LOCAL_AP_DEVICE: string;
        DUAL_MODEL_DEVICE: string;
        OTHER_DEVICE: string;
        FUNCTION_PLUGIN: string;
        SIM_CARD_DEVICE: string;
        NETWORK_CABLE_DEVICE: string;
        NB_IoT_DEVICE: string;
        THIRD_CLOUD_DEVICE: string;
        INFRARED_REMOTE_CONTROLLER_DEVICE: string;
        BLE_MESH_DEVICE: string;
        NEW_GROUP_VIRTUAL_DEVICE: string;
        ONLY_CABLE_DEVICE: string;
        PLC_DEVICE: string;
        MATTER_DEVICE: string;
    };
    /**
     * 获取设备类型，
     * 0：wifi单模设备，
     * 1：yunyi设备，
     * 2：云接入设备，
     * 3：zigbee设备，
     * 5：虚拟设备，
     * 6：蓝牙单模设备，
     * 7：本地AP设备，
     * 8：蓝牙wifi双模设备，
     * 9：其他，
     * 10：功能插件，
     * 11：SIM卡设备，
     * 12：网线设备，
     * 13：NB-IoT，
     * 14：第三方云接入，
     * 15：红外遥控器，
     * 16：BLE Mesh，
     * 17：虚拟设备（新设备组）
     * 21：仅网线设备，局域网绑定
     * 22：plc设备，plc配网
     * @return {string}
     * @readonly
     *
     */
    readonly get type(): string;
    /**
     * 获取上次修改（修改名称，绑定/解绑等）的时间戳, 例如1532587811237
     * 暂时没想到它的使用场景，有开发者想到了可以联系米家更新文档
     * @return {long} 时间戳
     * @readonly
     *
     */
    readonly get lastModified(): long;
    /**
     * 本地设备还是远程设备, 0未知 1本地 2远程。
     * iOS中，本地设备指的是既没有绑定到iot平台，又不是被分享的设备。**注意：不是寻常理解的，同一个路由器的是本地设备，不同路由器的是远程设备，iOS中，无法获取一个设备是否在同一个局域网**
     *
     * @return {int}  0未知 1本地 2远程。
     * @readonly
     *
     */
    readonly get location(): int;
    /**
     * 设备的纬度
     * @return {double}
     * @readonly
     *
     */
    readonly get latitude(): double;
    /**
     * 设备的经度
     * @return {double}
     * @readonly
     *
     */
    readonly get longitude(): double;
    /**
     * 是否支持语音（一般指小爱同学）控制
     * @return {boolean}
     * @readonly
     *
     */
    readonly get isVoiceDevice(): boolean;
    /**
     * 设备是否在线 true 在线。离线设备在插件内几乎所有功能均不可操作
     * @return {boolean}
     * @readonly
     *
     */
    readonly get isOnline(): boolean;
    /**
    * 获取蓝牙设备的mtu大小，当设备connect/disconnect 时候，会发生变化
    */
    get mtu(): any;
    /**
     *是否是自己的设备，若是别人（包含家属）分享给你的设备，isOwner则为false
     * @return {boolean}
     * @readonly
     *
     */
    readonly get isOwner(): boolean;
    /**
     * 当前账户对设备的控制权限，主要用于分享的设备 4:普通分享 36:只读分享 68:家庭分享
     * @return {boolean}
     * @readonly
     *
     */
    readonly get isFamily(): boolean;
    /**
     *是否是别人分享的设备，若是家属分享给你的设备，isShared为fasle，isFamily为true
     * @return {boolean}
     * @readonly
     *
     */
    readonly get isShared(): boolean;
    /**
     *是否是已经绑定的设备，一般返回true
     * @since 10005
     * @return {boolean}
     * @readonly
     *
     */
    readonly get isBinded(): boolean;
    get isBinded2(): boolean;
    /**
     * 是否是别人分享的只读设备,权限比isShared更小。受iot后台基础配置 - 产品共享影响。产品共享可配置为：支持（用户不可选共享权限），支持（用户可选共享权限）（可查看可操作设备，可查看不可操作设备），不支持共享
     * 如果后台配置选择的支持（用户可选共享权限），然后设备拥有者分享时选择的是可查看不可操作设备，则此选项为True
     * @return {boolean}
     * @readonly
     *
     */
    readonly get isReadonlyShared(): boolean;
    /**
     * 获取当前设备的时区信息（国际标准时区），这里的设置不是指手机，而是指iot设备。**注意：国际标准时区中，没有Asia/Beijing。**
     * @since 10021
     * @returns {Promise} 成功进入then，失败进入catch。then：res="Asia/Shanghai";
     * resolve：timezone string
     * reject：{code: xxx, message: xxx}
     */
    getDeviceTimeZone(): Promise<any>;
    /**
     * 获取当前设备ble mac
     * @since 10057
     * @returns {Promise} 成功进入then，失败进入catch。res： {"code": 0, "message": "ok", "result": {"data": {"ble_mac": "B0:41:1D:E9:2E:CE"}}};
     * reject：{code: xxx, message: xxx}
     * 使用场景: 设备同时存在wifi mac与 ble mac,且绑定插件时上报的是wifi mac，既Device.mac获取的是wifi mac
     * 使用条件: 设备ble mac上报给了后台，该接口方可获取到数据
     *
     * @example
     * Device.getDeviceBleMac().then((res)=>{
     *   let mac = res['result']['data']['ble_mac'];
     * }).catch((err)=>{
     *   console.log('get ble mac failed  : ', err);
     * });
     */
    getDeviceBleMac(): Promise<any>;
    /**
     * 修改设备/子设备的名字，注意不支持蓝牙网关对子设备名称的修改
     * @since 10022
     * @param {String} newName 设备的新的名称
     * @param {String} did 如果修改自身的名称，可不传，如果修改子设备的，则需要传子设备的did。如果did是其他，调用此方法会走reject
     * @returns {Promise} 成功进入then，失败进入catch
     *      resolve：成功时，res为新名称。同时，DeviceEvent的deviceNameChanged会被触发
     *      reject：{code: xxx, message: xxx} -1:新名称不合法  -2:非当前设备或者子设备，没有改名权限  其他code：网络问题/服务端问题
     */
    changeDeviceName(newName: string, did?: string): Promise<any>;
    /**
    * 获取当前设备的设备信息
    * @since 10024
    * @returns {Promise<Object>}当前设备的值
    *       resolve:类似{'prop.2.1':'on','prop.light':8}这样的{key:value}键值对，其中键为设备属性名称，值为设备属性值
    *       reject：device.prop为空，则走reject，返回null
    */
    getCurrentDeviceValue(): Promise<any>;
    /**
     * 获取虚拟设备的子设备列表，
     * @deprecated since 10032 请使用Device.getDeviceWifi().getVirtualDevices()代替
     */
    getVirtualDevices(): any;
    /**
    * 获取设备定向推荐信息，展示推荐入口使用：用于获取插件上方偶尔弹出的提示条/广告条数据，比如：设备信号差，请调整设备位置。
    * @deprecated since 10032 请使用Device.getDeviceWifi().getRecommendScenes()代替
    */
    getRecommendScenes(model: any, did: any): any;
    /**
     * 获取当前设备列表中的指定model的设备列表。需要在common_extra_config增加配置，暂时用于秒秒测的互联互通功能。
     * @deprecated since 10032，请使用Device.getDeviceWifi().requestAuthorizedDeviceListData()代替
     */
    requestAuthorizedDeviceListData(model: any): Promise<any>;
    /**
     * 除了基本信息的其他部分额外信息都在这个字段返回，如：{"fw_version":"1.4.0","mcu_version":"0001","isSetPincode":0}
     * 可以解析为 json
     * @deprecated since 10032 此字段后台无人维护，也无人知道它存在的含义，故废弃。
     * @return {string}
     * @readonly
     *
     */
    readonly get extra(): string;
    /**
     * 除了基本信息的其他部分额外信息都在这个字段返回, 如：{"fw_version":"1.4.0","mcu_version":"0001","isSetPincode":0}
     * 返回json对象
     * 目前CommonSetting中的是否在首页展示多个设备，从该字段的split中取数据判断，如 {"showGroupMember": false, "split": {"moduleId": 2, "parentId": "1042550162"}}
     * @since 10059
     * @return {json}
     * @readonly
     *
     */
    readonly get extraObj(): json;
    /**
    * 检查当前设备是否支持HomeKit，Android系统不支持HomeKit设备。需要在plato平台配置homekit_config，包含在内的设备，isHomekit才可能返回true
    * @deprecated since 10032 请使用Device.getDeviceWifi().checkIsHomeKitDevice()
    */
    checkIsHomeKitDevice(): any;
    /**
     * 检查当前设备是否已经接入了HomeKit，Android不支持。如果没有接入，可以调用下面的bindToHomeKit方法，将设备接入
     * @deprecated since 10032 请使用Device.getDeviceWifi().checkHomeKitConnected()
     */
    checkHomeKitConnected(): any;
    /**
     * 将当前设备绑定到HomeKit中
     * @deprecated since 10032 请使用Device.getDeviceWifi().bindToHomeKit()
     *
     */
    bindToHomeKit(): any;
    /**
    * 检查wifi设备固件升级弹窗。该方法会触发升级弹窗alert提示。
    * @deprecated since 10032,请使用Device.getDeviceWifi().checkFirmwareUpdateAndAlert()
    */
    checkFirmwareUpdateAndAlert(): any;
    /**
     * 实时获取设备的网络信息包括网络强度，此方法一般情况下不走reject
     * @return {Object} NetworkInfo
     * @deprecated since 10032 即将废弃，请使用Device.getDeviceWifi().readDeviceNetWorkInfo()。
     */
    readDeviceNetWorkInfo(did: any): any;
    /**
     * 父设备的 model,10023及其之后返回空字符串
     * @deprecated   10023开始废弃，10023及后续版本建议使用 Device.parentDevice.model
     * @return {string}
     * @readonly
     *
     */
    readonly get parentModel(): string;
    /**
     * 获取设备时区,非实时加载，可能为空.如果需要自行获取最新设备时区值，请使用smarthome.getDeviceTimeZone(did)
     * @return {string}
     * @deprecated   10021开始废弃，10021及后续版本建议使用 Device.getDeviceTimeZone().then
     */
    get timeZone(): string;
    /**
     * 获取 prop中保存的信息。当某设备有莫人属性时，这里为莫人属性的值，否则无此字段。不同设备类型，propInfo中包含的属性可能不同，propInfo一半是个json。
     * @deprecated 因此属性极大造成米家设备列表页接口响应时长变长，现已废弃，一般都会返回null。若需要这里面的属性，请直接通过callMethod去读取。
     * @return {json}
     * @readonly
     *
     */
    readonly get propInfo(): json;
    /**
     * 重置标志，本地设备才会返回该字段，为1时表示设备刚刚reset过
     * @deprecated 10023开始废弃，后续不再提供此字段，此方法永远返回0
     * @return {int}
     * @readonly
     */
    readonly get resetFlag(): int;
    /**
   * 通用标志，每一位表示一个含义，>0才返回该字段：
   * comFlag&1=1表示是常用设备，
   * comFlag&2=2表示是常用摄像机，
   * comFlag&4=4表示是uwb-tag设备
   * comFlag&8=8表示是uwb-buildin设备
   * comFlag&16=16表示按键拆分子设备是全屋智能模式下，自动默认拆分的设备，不需要在设备列表展示
   * comFlag&32=32表示灯组中的单灯可释放（新灯组中的单灯可释放，旧灯组中的单灯不可释放）
   * comFlag&64=64表示首页的卡片放大展示（8.0摄像机大卡片）
   * comFlag&128=128表示设备在终端显示
   * comFlag&256=256米家8.0设备超级常用标志（包括超级常用摄像机）
   * 1. comFlag字段新增含义：comFlag&512=512 ，能够上车的设备标识，具体根据设备的instance的device后字段进行过滤，例如：urn:miot-spec-v2:device:light:0000A001:qzgd-wy0a01:1:0000C802，会提取light的type进行筛选，需要上车的品类见文档：车-卡片 （目前支持一期品类上车）（bit：第10位,1 << 9）
   * 2. comFlag字段新增含义：comFlag&1024=1024 ，已经被选中需要在车机cariot中心展示及扫码选择界面展示成已选的设备。（bit：第11位,1 << 10）
   * @return {int}
   * @readonly
   */
    readonly get comFlag(): int;
    get isWearableDevice(): boolean;
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
    createScene(sceneType: any, opt?: json): IScene;
    /**
     * 创建定时场景
     * @deprecated since 10032 请使用Service.scene.createTimerScene(BasicDevice.deviceID,opt)
     * @method
     * @param {json} opt 同上loadScenes的opt，此处传入opt，后续获取场景时，可根据此opt来筛选
     * @returns {IScene}
     * @see {@link module:miot/service/scene}
     *
     */
    createTimerScene(opt?: json): IScene;
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
    loadScenes(sceneType: any, opt?: any): Promise<IScene[]>;
    /**
     * 加载定时场景
     * @deprecated since 10032 请使用Service.scene.loadTimerScenes(BasicDevice.deviceID,opt)
     * @param {json} opt 同上loadScenes的opt
     * @returns {Promise<IScene[]>}
     * @see {@link module:miot/service/scene}
     *
     */
    loadTimerScenes(opt?: json): Promise<IScene[]>;
    /**
     * 上报日志，写入文件，在用户反馈时可以查看。比如某个地方报错/出错了，打上log，用户反馈后，能在后台查看到。查看地址：https://iot.mi.com/fe-op/operationCenter/userFeedback
     * @deprecated since 10032,请使用Service.smarthome.reportLog()代替。
     * @param {string} log
     *
     */
    reportLog(log: string): void;
    /**
     * 查询设备的房间信息
     * @since 10039
     * @param {string} did DeviceID，默认为当前设备
     * @return {Promise<Object>} {code: 0, data: {roomId, homeId, roomName, homeName} }
     */
    getRoomInfoForCurrentHome(did?: string): Promise<any>;
    /**
    * 查询当前家庭信息(非车房间的家庭，车房间有特殊逻辑，使用getRoomInfoForCurrentHome获取)
    * @since 10110
    * @return {Promise<Object>} {code: 0, data: {homeId, permitLevel} }
    */
    getCurrentSelectHomeInfo(): Promise<any>;
    /**
     * 查询设备的房间经纬度信息
     * @since 10098
     * @param {string} did DeviceID，默认为当前设备
     * @param {String} pluginPrivacyId 插件侧的用户同意相关隐私的ID（插件侧自行生成）
     * @return {Promise<Object>} {code: 0, data: {latitude,longitude} }
     */
    getRoomLocation(did: string, pluginPrivacyId: string): Promise<any>;
    /**
     * 获取与当前设备相同企业组的所有设备(包括当前设备)
     * @since 10052
     * @returns {Promise<Object>} 成功时{code:0,data:[{...device},{...device},...]}
     * 失败时：{code:-1,message:"cannot get current device info"}
     * {code:-2,message:"get company identifier error"}
     * @example
     * Device.getAllDevicesOfBelongedCompanies().then(res=>{
     *  alert(JSON.stringify(res));
     * }).catch(err =>{
     *  alert(JSON.stringify(err));
     * });
     */
    getAllDevicesOfBelongedCompanies(): Promise<any>;
    /**
     * 获取本地的用户同意的版本的隐私信息
     * @since 10060
     * @returns {Promise<Object>} 成功时{code:0,data:{version:<string>, did: <string>}}
     * 失败时：{code:-1,message:"cannot get native privacy info"}
     * @example
     * Device.getNativePrivacyConfirmationVersion().then(res=>{
     *  alert(JSON.stringify(res));
     * }).catch(err =>{
     *  alert(JSON.stringify(err));
     * });
     */
    getNativePrivacyConfirmationVersion(option?: {}): Promise<any>;
    /**
     * 设置本地的用户同意的版本的隐私信息
     * @since 10060
     * @param options <Object> {'version': <string>}
     * @example
     * Device.setNativePrivacyConfirmationVersion({version:'0001'});
     */
    setNativePrivacyConfirmationVersion(options: any): void;
    /**
     * 上报到服务端的隐私同意记录
     * 详细文档见https://xiaomi.f.mioffice.cn/docs/dock4uv9BqoKASgxpyVwroofMOe
     * @since 10060
     * @param {options} <Object> {
     *   'privacyVersion':<string>,隐私政策版本（必填字段，没有值则填空字符串""）
     *   'type':<string>,"accept"表示接受;"cancel"表示撤销;“remove"表示解除，会删除设备，清理所有数据，只有在撤销隐私授权时使用。（必填字段）
     *   'privacyType':<number>, 上报类型：隐私协议上报（1），系统权限上报（2），敏感数据上报（3）;（必填字段）
     *   'pluginPrivacyId':<number>, 插件隐私协议id,用来标记同一privacyType下的不同隐私主体（必填字段）。
     *   建议设置为4位数字,privacyType为1时,设置为11xx; privacyType为2时, ,设置为12xx;privacyType为3时, ,设置为13xx;
     *   'sysPermissionInfo':<Array>, （可选字段)系统权限信息数组（仅当privacy_type=2时为必填字段）数组中每个元素包含以下两个字段：
     *    status:<number>,拒绝（0），同意（1）
     *    permission_id:<number>,系统权限ID, 例如：[{"permission_id":208,"status":1},{"permission_id":202,"status":0},{"permission_id":207,"status":1}]
     * }
     *  @returns {Promise<Object>} 成功时{code:0,data:{
     *    "code":0,
     *     "message":"ok",
     *     "result":"ok"
     * }}
     * 失败时：{code:-1,message:"xxx}
     * {code:-2,message:"xxx"}
     * @example
     * let param = {
     *        privacyVersion: "",
     *        type: "accept",
     *        privacyType: 3,
     *        pluginPrivacyId: 1300,
     *        sysPermissionInfo:
     *         [{permission_id: 101, status: 1},
     *            {permission_id: 102, status: 0}],
     *      }
     * Device.setPrivacyConfirmation(param).then((res) => {
     *        alert(JSON.stringify(res, null, '\t'));
     *     }).catch((err) => {
     *        alert(JSON.stringify(err, null, '\t'));
     *     });
     */
    setPrivacyConfirmation(options: any): Promise<any>;
    /**
     * 获取当前账号下当前家庭的所有设备（包括共享设备）
     * @since 10066
     *  @returns {Promise<Object>} 成功时
     *    {
     *     "code":0,
     *     "data":{
     *        "homeId": <xxx>
     *        "commonDevices":[{
     *              "model' : <xxx>,
     *              "did" : <xxx>,
     *              "deviceName" : <xxx>,
     *              "iconUrl" : <xxx>,
     *              "roomId" : <xxx>,
     *              "roomName" : <xxx>,
     *              "categoryName" : <xxx>
     *            }
     *          ]
     *      }
     *    }
     * 失败时：{code:-1,message:"xxx}
     * @example
     * Device.getHomeDeviceList().then((res) => {
     *        alert(JSON.stringify(res, null, '\t'));
     *     }).catch((err) => {
     *        alert(JSON.stringify(err, null, '\t'));
     *     });
     */
    getHomeDeviceList(): Promise<any>;
    /**
     * 获取家庭成员的列表
     * @since 10090
     * @returns {Promise<Object>} 成功时
     * {
     *  "code": 0,
     *  "data": [
          {
     *      "icon": "xxx.jpg",
            "nick_name": "小米账号",
            "uid": 894158105,
     *    }]
     * }
     * 失败时：{code:-1,message:"xxx}
     * @example
     * let options = {}
     * Device.getHomeMemberList(options).then((res) => {
     *        alert(JSON.stringify(res, null, '\t'));
     *     }).catch((err) => {
     *        alert(JSON.stringify(err, null, '\t'));
     *     });
     */
    getHomeMemberList(options?: {}): Promise<any>;
    /**
     * 设置常用设备开关
     * @since 10077
     * @param {options} <Object> {
     *   'switchStatus':<string>,1：打开 0：关闭（必填字段）
     * }
     *  @returns {Promise<Object>} 成功时{code:0,data:{
     *    "code":0,
     *     "message":"ok",
     *     "result":"ok"
     * }}
     * 失败时：{code:-1,message:"xxx}
     * {code:-1,message:"xxx"}
     * @example
     * let param = {
     *        switchStatus: "1"
     *      }
     * Device.setCommonUseDeviceSwitch(param).then((res) => {
     *        alert(JSON.stringify(res, null, '\t'));
     *     }).catch((err) => {
     *        alert(JSON.stringify(err, null, '\t'));
     *     });
     */
    setCommonUseDeviceSwitch(options: any): Promise<any>;
    /**
     * 紧急联系人设置判断
     * @since 10085
     * @returns {Promise<Object>}
     * success: { code:0, data }
     * fail: {coce: -1, message }
     */
    hasSetDeviceCall(): Promise<any>;
    /**
     * 设备是否属于车房间
     * @since 10087
     * @returns {Promise<Object>}
     * success: { code:0, data }
     * fail: {coce: -1, message }
     */
    isBelongToCarRoom(did: any): Promise<any>;
    /**
   * 获取账号下的所有设备列表
   * @since 10100
   * @returns {Promise<Object>} 成功时
   * {
   *  "code": 0,
   *  "data": [
        {
   *      "did": "xxx",
          "model": "xxx",
          "isOnline": "xx",
          "isMeshGatewayDevice": "xx",
   *    }]
   * }
   * @example
   * let options = {}
   * Device.getAllDeviceList(options).then((res) => {
   *        alert(JSON.stringify(res, null, '\t'));
   *     }).catch((err) => {
   *        alert(JSON.stringify(err, null, '\t'));
   *     });
   */
    getAllDeviceList(): Promise<any>;
}
export class PollPropMap {
    static PROP_TYPE_UNKNOWN: number;
    static PROP_TYPE_MIOT_SPEC: number;
    static PROP_TYPE_PROFILE: number;
    static MSG_SOURCE_POLL: number;
    propInfoMap: Map<any, any>;
    subscribeInfoMap: Map<any, any>;
    listenMessagesTimeOutSet: Set<any>;
}
export default RootDevice;
/**
 * @static
 * @return {BasicDevice}
 */
declare const RootDevice: BasicDevice;