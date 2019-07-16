/**
 * @export
 * @module miot
 * @description 米家ReactNative插件SDK
 *
 * @example
 *import {API_LEVEL, Package, Device, Service, Host, Resources, Bluetooth, DeviceProperties} from 'miot'
 *import {PackageEvent, DeviceEvent, BluetoothEvent} from 'miot'
 *import SDK from 'miot'
 *
 *import {ImageButton, InputDialog} from 'miot/ui'
 *import Res from 'miot/resources'
 *
 *import Bluetooth from 'miot/Bluetooth'
 *
 */
import BluetoothFactory, { BluetoothEvent as BluetoothEventNames } from './Bluetooth';
import ClassicBluetoothFactory, { ClassicBluetoothEvent as ClassicBluetoothEventNames } from './ClassicBluetooth';
import RootDevice, { DeviceEvent as DeviceEventNames } from './Device';
import HostInstance from './Host';
import { AudioEvent as AudioEventNames } from './host/audio';
import { FileEvent as FileEventNames } from './host/file';
import PackageInstance, { Entrance as Entrances, PackageEvent as PackageEventNames } from './Package';
import { RootDeviceProperties } from "./Properties";
import ResourcesPack from './resources';
import ServiceInstance from './Service';
import { SceneType as SceneTypeNames } from './service/scene';
export const API_LEVEL = 10023
/**
 * 插件包基本配置
 * {@link module:miot/Package}
 * @export
 */
export const Package = PackageInstance;
/**
 * 插件入口类型
 * {@link module:miot/Package~Entrance}
 * @export
 */
export const Entrance = Entrances;
/**
 * 插件全局事件
 * {@link module:miot/Package~PackageEvent}
 * @export
 */
export const PackageEvent = PackageEventNames;
/**
 * 当前设备
 * {@link module:miot/Device}
 * @type {IDevice}
 * @export
 */
export const Device = RootDevice;
/**
 * 设备系统事件
 * {@link module:miot/Device~DeviceEvent}
 * @export
 */
export const DeviceEvent = DeviceEventNames;
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
export const Service = ServiceInstance;
/**
 * 插件运行环境的本地服务
 * {@link module:miot/Host}
 * @export
 */
export const Host = HostInstance;
/**
 * 资源类
 * {@link module:miot/resources}
 * @export
 */
export const Resources = ResourcesPack;
/**
 * 蓝牙类
 * {@link module:miot/Bluetooth}
 * @export
 */
export const Bluetooth = BluetoothFactory;
/**
 * 蓝牙事件
 * {@link module:miot/Bluetooth~BluetoothEvent}
 * @export
 */
export const BluetoothEvent = BluetoothEventNames;
/**
 * 蓝牙类
 * {@link module:miot/ClassicBluetooth}
 * @export
 */
export const ClassicBluetooth = ClassicBluetoothFactory;
/**
 * 蓝牙事件
 * {@link module:miot/ClassicBluetooth~ClassicBluetoothEvent}
 * @export
 */
export const ClassicBluetoothEvent = ClassicBluetoothEventNames;
/**
 * 场景类型
 * {@link module:miot/service/scene~SceneType}
 * @export
 */
export const SceneType = SceneTypeNames;
export const FileEvent = FileEventNames;
export const AudioEvent = AudioEventNames;
/**
 * @export
 */
export default {
    API_LEVEL, Package, PackageEvent, Entrance,
    Device, DeviceEvent, DeviceProperties,
    Service, Host, Resources,
    Bluetooth, BluetoothEvent, SceneType,
    FileEvent, AudioEvent, ClassicBluetooth, ClassicBluetoothEvent
}