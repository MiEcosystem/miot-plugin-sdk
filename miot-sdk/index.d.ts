/**
 * MIOT SDK 版本
 * @type {int}
 * @export
 */
export const API_LEVEL: int;
/**
 * 插件包基本配置
 * {@link module:miot/Package}
 * @export
 */
export const Package: {
    readonly extraEntry: any;
    readonly entrance: {
        Main: string;
        Scene: string;
    };
    readonly pageParams: object;
    readonly entryInfo: json;
    exitInfo: any;
    readonly packageID: int;
    readonly pluginID: any;
    readonly version: string;
    readonly rnVersion: any;
    readonly packageName: string;
    readonly minApiLevel: int;
    readonly buildType: string;
    readonly isDebug: boolean;
    readonly models: string;
    BLEAutoCheckUpgradeOptions: any;
    wifiDeviceUpgradeOptions: any;
    entry(RootComponent: import("react").Component<any, any, any>, afterPackageEntry?: Function): void;
    _packageRootNavigationStack(): any;
    exit(info?: JSON): void;
    navigate(name: any, params: {} | undefined, push: any): void;
    installModule(moduleId: string): json;
};
/**
 * 插件入口类型
 * {@link module:miot/Package~Entrance}
 * @export
 */
export const Entrance: {
    Main: string;
    Scene: string;
};
/**
 * 插件全局事件
 * {@link module:miot/Package~PackageEvent}
 * @export
 */
export const PackageEvent: typeof PackageEventNames;
/**
 * 隐私事件
 * {@link module:miot/utils/protocol-helper}
 * @export
 */
export const PrivacyEvent: typeof PrivacyEventNames;
/**
 * 云端隐私通知类型
 * {@link module:miot/utils/protocol-helper~CLOUD_PRIVACY_EVENT_TYPE}
 * @export
 */
export const CLOUD_PRIVACY_EVENT_TYPES: typeof CLOUD_PRIVACY_EVENT_TYPE;
export const UserExpPlanEvent: typeof UserExpPlanEventNames;
/**
 * 云端隐私通知类型
 * {@link module:miot/utils/protocol-helper~CLOUD_PRIVACY_EVENT_TYPE}
 * @export
 */
export const USER_EXP_PLAN_EVENT_TYPES: typeof USER_EXP_PLAN_EVENT_TYPE;
/**
 * 当前设备
 * {@link module:miot/Device}
 * @type {IDevice}
 * @export
 */
export const Device: IDevice;
/**
 * 当前设备
 * {@link module:miot/Device~DeviceEvent}
 * @type {IDevice}
 * @export
 */
export const DeviceEvent: IDevice;
/**
 * 当前设备属性缓存
 * {@link module:miot/Properties}
 * @export
 * @type {IProperties}
 */
export const DeviceProperties: IProperties;
/**
 * MIOT 提供的云服务
 * {@link module:miot/Service}
 * @export
 */
export const Service: typeof ServiceInstance;
/**
 * 插件运行环境的本地服务
 * {@link module:miot/Host}
 * @export
 */
export const Host: typeof HostInstance;
export const HostEvent: typeof HostEventNames;
/**
 * 系统功能
 * {@link module:miot/System}
 * @export
 */
export const System: typeof SystemInstance;
/**
 * 资源类
 * {@link module:miot/resources}
 * @export
 */
export const Resources: typeof ResourcesPack;
/**
 * 蓝牙类
 * {@link module:miot/Bluetooth}
 * @export
 */
export const Bluetooth: typeof BluetoothFactory;
/**
 * 蓝牙事件
 * {@link module:miot/Bluetooth~BluetoothEvent}
 * @export
 */
export const BluetoothEvent: typeof MIOTBluetoothEvent;
/**
 * 经典蓝牙类
 * {@link module:miot/ClassicBluetooth}
 * @export
 */
export const ClassicBluetooth: typeof ClassicBluetoothFactory;
/**
 * 经典蓝牙事件
 * {@link module:miot/ClassicBluetooth～ClassicBluetoothEvent}
 * @export
 */
export const ClassicBluetoothEvent: typeof MIOTClassicBluetoothEvent;
/**
 * 椭圆曲线
 * @export
 */
export const ECCCrypto: typeof ECCCryptoClass;
/**
 * 场景类型
 * {@link module:miot/service/scene~SceneType}
 * @export
 */
export const SceneType: any;
export const FileEvent: typeof FileEventNames;
export const MemoryWarningEvent: typeof MemoryWarningEventNames;
export const AccelerometerChangeEvent: typeof AccelerometerChangeEventNames;
export const CompassChangeEvent: typeof CompassChangeEventNames;
export const VolumeChangeEvent: typeof VolumeChangeEventNames;
export const GyroscopeChangeEvent: typeof GyroscopeChangeEventNames;
export const AudioEvent: typeof AudioEventNames;
export const DarkMode: {
    darkModeStore: import("./darkmode").DarkModeStore;
    preparePluginOwnDarkMode(): void;
    getColorScheme(): import("./darkmode").NativeColorScheme;
    addChangeListener(listener: any): void;
    removeChangeListener(listener: any): void;
};
declare namespace _default {
    export { Device };
    export { DeviceEvent };
    export { Bluetooth };
    export { BluetoothEvent };
    export { ClassicBluetooth };
    export { ClassicBluetoothEvent };
    export { API_LEVEL };
    export { Package };
    export { PackageEvent };
    export { Entrance };
    export { DeviceProperties };
    export { Service };
    export { Host };
    export { System };
    export { HostEvent };
    export { Resources };
    export { ECCCrypto };
    export { SceneType };
    export { FileEvent };
    export { AudioEvent };
    export { MemoryWarningEvent };
    export { Utils };
    export { DarkMode };
}
export default _default;
import { PackageEvent as PackageEventNames } from "./Package";
import { PrivacyEvent as PrivacyEventNames } from "./utils/protocol-helper";
import { CLOUD_PRIVACY_EVENT_TYPE } from "./utils/protocol-helper";
import { UserExpPlanEvent as UserExpPlanEventNames } from "./utils/protocol-helper";
import { USER_EXP_PLAN_EVENT_TYPE } from "./utils/protocol-helper";
import ServiceInstance from "./Service";
import HostInstance from "./Host";
import { HostEvent as HostEventNames } from "./Host";
import SystemInstance from "./system/";
import ResourcesPack from "./resources";
import BluetoothFactory from "./device/bluetooth";
import { BluetoothEvent as MIOTBluetoothEvent } from "./device/bluetooth/BluetoothDevice";
import ClassicBluetoothFactory from "./device/bluetooth/ClassicDevice";
import { ClassicBluetoothEvent as MIOTClassicBluetoothEvent } from "./device/bluetooth/ClassicDevice";
import { ECCCrypto as ECCCryptoClass } from "./host/crypto";
import { FileEvent as FileEventNames } from "./host/file";
import { MemoryWarningEvent as MemoryWarningEventNames } from "./system/memory";
import { AccelerometerChangeEvent as AccelerometerChangeEventNames } from "./system/accelerometer";
import { CompassChangeEvent as CompassChangeEventNames } from "./system/compass";
import { VolumeChangeEvent as VolumeChangeEventNames } from "./system/volume";
import { GyroscopeChangeEvent as GyroscopeChangeEventNames } from "./system/gyroscope";
import { AudioEvent as AudioEventNames } from "./host/audio";
import * as Utils from "./utils";