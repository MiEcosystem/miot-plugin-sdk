/**
 * @export
 * @module miot
 * @description 米家ReactNative插件SDK
 *
 * @example
 *   import {API_LEVEL, Package, Device, Service, Host, Resources, Bluetooth, DeviceProperties} from 'miot'
 *   import {PackageEvent, DeviceEvent, BluetoothEvent} from 'miot'
 *   import SDK from 'miot'
 *   import {Tip, AD } from 'miot/ui'
 *   import Res from 'miot/resources'
 *
 *   import Bluetooth from 'miot/Bluetooth'
 *   
 */

import PackageInstance, {PackageEvent as PackageEventNames } from './Package'

import RootDevice, {DeviceEvent as DeviceEventNames} from './Device'
import {RootDeviceProperties} from "./Properties"

import ServiceInstance from './Service'
import HostInstance  from './Host'

import ResourcesPack from './resources'

import BluetoothFactory, {BluetoothEvent as BluetoothEventNames} from './Bluetooth'

import {SceneType as SceneTypeNames} from './service/scene'

/**
 * @ignore
 * 由于是双方共同修改,所以需要各自维护各自的修改进程
 * 方法就是每一次正式修改, 都需要各自在这里将版本号+1
 */
const pkg = require("./package.json")
const API_LEVEL_IOS = pkg.api_level_ios;
const API_LEVEL_ANDROID = pkg.api_level_android;
const API_LEVEL_REACT = pkg.api_level_react;

/**
 * MIOT SDK 版本
 * @type {int}
 * @export
 */
export const API_LEVEL = API_LEVEL_REACT + API_LEVEL_IOS + API_LEVEL_ANDROID;

/**
 * 插件包基本配置
 * {@link module:miot/Package}
 * @export
 */
export const Package=PackageInstance;

/**
 * 插件全局事件名称
 * {@link module:miot/Package}
 * @export
 */
export const PackageEvent=PackageEventNames;

/**
 * 当前设备
 * {@link module:miot/Device}
 * @type {IDevice}
 * @export
 */
export const Device=RootDevice;

/**
 * 设备系统事件名称
 * @export
 */
export const DeviceEvent=DeviceEventNames;

/**
 * 当前设备属性缓存
 * {@link module:miot/Properties}
 * @export
 * @type {IProperties}
 */
export const DeviceProperties = RootDeviceProperties;

/**
 * MIOT 提供的云服务
 * {@link module:miot/Service}
 * @export
 */
export const Service=ServiceInstance;
/**
 * 插件运行环境的本地服务
 * {@link module:miot/Host}
 * @export
 */
export const Host=HostInstance;

/**
 * 资源类
 * {@link module:miot/resources}
 * @export
 */
export const Resources=ResourcesPack;

/**
 * 蓝牙类
 * {@link module:miot/Bluetooth}
 * @export
 */
export const Bluetooth = BluetoothFactory;

/**
 * 蓝牙事件名称
 * @export
 */
export const BluetoothEvent = BluetoothEventNames;

/**
 * 场景类型
 * @export
 */
export const SceneType = SceneTypeNames;


/**
 * @export
 */
export default {API_LEVEL, Package, PackageEvent, 
    Device, DeviceEvent, DeviceProperties,
    Service, Host, Resources,
    Bluetooth, BluetoothEvent, SceneType}
