/**
 * @export public
 * @doc_name Eco基础插件设备模块
 */
import native, { buildEvents, isAndroid, isIOS, EcoProperties } from '../ecoNative';
export class BasicDevice {
  /**
     *获取设备 did
     * @return {string}
     * @readonly
     *
     */
  get deviceID() {
     return  0
  }
  /**
     * 获取设备的 model
     * @return {string}
     * @readonly
     *
     */
  get model() {
     return  ""
  }
  /**
  * 设备的名称
  * @return {string}
  * @readonly
  *
  */
  get name() {
     return  ""
  }
  /**
   * 设备连接状态
   * @return {integer}
   * @readonly
   *
   */
  get connectState() {
    return EcoProperties.of(this).connectState;
  }
  /**
   * 设备mac地址--唯一
   * @return {string}
   * @readonly
   *
   */
  get mac() {
    return EcoProperties.of(this).mac;
  }
  /**
   * 设备sn
   * @return {string}
   * @readonly
   *
   */
  get sn() {
    return EcoProperties.of(this).sn;
  }
  /**
   * 是否是主账号
   * @return {boolean}
   * @readonly
   *
   */
  get isOwner() {
    return EcoProperties.of(this).isOwner;
  }
}
/**
 * 原生端蓝牙命令下发数据(EcoWearPacket)需要的packetType
 */
export const EcoDevceConnectState = {
  Disconnected: 0, /** 连接断开 */
  Connecting: 1, /** 正在发起连接 */
  Connected: 2, /** 已连接(连接成功) */
  Connect_Fail: 3, /** 连接失败 Android独有 */
  NOON: -1 /** 初始化状态  */
};
export class PollPropMap {
  static PROP_TYPE_UNKNOWN = 0;
  static PROP_TYPE_MIOT_SPEC = 1;
  static PROP_TYPE_PROFILE = 2;
  static MSG_SOURCE_POLL = 1;
  constructor() {
    // this.propSet = new Set();
    // this.specPropSet = new Set();
    // this.profilePropSet = new Set();
    this.propInfoMap = new Map();// map<prop,{prop,subscription,updateTime,value,propType,siid,piid>
    this.subscribeInfoMap = new Map();// map<subscribId,set<prop>>
    // this.miotDeviceType = PollPropMap.DEVICE_TYPE_UNKNOWN;
  }
}
/**
 * @static
 * @return {BasicDevice}
 */
const RootDevice = new BasicDevice();
if (native.ECODevice) {
  EcoProperties.init(RootDevice, {
    ...native.ECODevice.currentDevice, _msgMap: new Map(),
    _pollMsgSet: new PollPropMap()
  });
}
/**
 * @export 导出rootDevice
 */
export default RootDevice;