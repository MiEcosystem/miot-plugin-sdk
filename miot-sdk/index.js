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
// new
import RootDevice, { DeviceEvent as MIOTDeviceEvent } from './device/BasicDevice';
import ClassicBluetoothFactory, { ClassicBluetoothEvent as MIOTClassicBluetoothEvent } from './device/bluetooth/ClassicDevice';
import BluetoothFactory from './device/bluetooth';
import { BluetoothEvent as MIOTBluetoothEvent } from './device/bluetooth/BluetoothDevice';
import HostInstance, { HostEvent as HostEventNames } from './Host';
import SystemInstance from "./system/";
import { ECCCrypto as ECCCryptoClass } from "./host/crypto";
import { AudioEvent as AudioEventNames } from './host/audio';
import { FileEvent as FileEventNames } from './host/file';
import { MemoryWarningEvent as MemoryWarningEventNames } from './system/memory';
import { AccelerometerChangeEvent as AccelerometerChangeEventNames } from './system/accelerometer';
import { CompassChangeEvent as CompassChangeEventNames } from './system/compass';
import { VolumeChangeEvent as VolumeChangeEventNames } from './system/volume';
import { GyroscopeChangeEvent as GyroscopeChangeEventNames } from './system/gyroscope';
import PackageInstance, { Entrance as Entrances, PackageEvent as PackageEventNames } from './Package';
import { PrivacyEvent as PrivacyEventNames, CLOUD_PRIVACY_EVENT_TYPE , UserExpPlanEvent as UserExpPlanEventNames, USER_EXP_PLAN_EVENT_TYPE} from './utils/protocol-helper';
import { RootDeviceProperties } from "./Properties";
import ResourcesPack from './resources';
import ServiceInstance from './Service';
import { SceneType as SceneTypeNames } from './service/scene';
import DarkModeFactory from './darkmode';
export const API_LEVEL = 10068
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
 * 隐私事件
 * {@link module:miot/utils/protocol-helper}
 * @export
 */
export const PrivacyEvent = PrivacyEventNames;
/**
 * 云端隐私通知类型
 * {@link module:miot/utils/protocol-helper~CLOUD_PRIVACY_EVENT_TYPE}
 * @export
 */
export const CLOUD_PRIVACY_EVENT_TYPES = CLOUD_PRIVACY_EVENT_TYPE;
export const UserExpPlanEvent = UserExpPlanEventNames;
/**
 * 云端隐私通知类型
 * {@link module:miot/utils/protocol-helper~CLOUD_PRIVACY_EVENT_TYPE}
 * @export
 */
export const USER_EXP_PLAN_EVENT_TYPES = USER_EXP_PLAN_EVENT_TYPE;
/**
 * 当前设备
 * {@link module:miot/Device}
 * @type {IDevice}
 * @export
 */
export const Device = RootDevice;
console.log(device);
/**
 * 当前设备
 * {@link module:miot/Device~DeviceEvent}
 * @type {IDevice}
 * @export
 */
export const DeviceEvent = MIOTDeviceEvent;
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
console.log(HostInstance);
export const HostEvent = HostEventNames;
/**
 * 系统功能
 * {@link module:miot/System}
 * @export
 */
export const System = SystemInstance;
console.log(SystemInstance);
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
export const BluetoothEvent = MIOTBluetoothEvent;
/**
 * 经典蓝牙类
 * {@link module:miot/ClassicBluetooth}
 * @export
 */
export const ClassicBluetooth = ClassicBluetoothFactory;
/**
 * 经典蓝牙事件
 * {@link module:miot/ClassicBluetooth～ClassicBluetoothEvent}
 * @export
 */
export const ClassicBluetoothEvent = MIOTClassicBluetoothEvent;
/**
 * 椭圆曲线
 * @export
 */
export const ECCCrypto = ECCCryptoClass;
/**
 * 场景类型
 * {@link module:miot/service/scene~SceneType}
 * @export
 */
export const SceneType = SceneTypeNames;
export const FileEvent = FileEventNames;
export const MemoryWarningEvent = MemoryWarningEventNames;
export const AccelerometerChangeEvent = AccelerometerChangeEventNames;
export const CompassChangeEvent = CompassChangeEventNames;
export const VolumeChangeEvent = VolumeChangeEventNames;
export const GyroscopeChangeEvent = GyroscopeChangeEventNames;
export const AudioEvent = AudioEventNames;
export const DarkMode = DarkModeFactory;
import * as Utils from './utils';
/**
 * @export
 */
export default {
  Device, DeviceEvent, Bluetooth, BluetoothEvent, ClassicBluetooth, ClassicBluetoothEvent,
  API_LEVEL, Package, PackageEvent, Entrance, DeviceProperties,
  Service, Host, System, HostEvent, Resources, ECCCrypto,
  SceneType,
  FileEvent, AudioEvent, MemoryWarningEvent,
  Utils, DarkMode
};