// 兼容老版本
import MIOTBasicDevice, { BasicDevice, DeviceEvent as MIOTDeviceEvent } from './device/BasicDevice';
import WifiDevice from './device/WifiDevice';
import MIOTDarkMode from './darkmode/index';
export default MIOTBasicDevice;
export const DeviceEvent = MIOTDeviceEvent;
export const IDeviceWifi = WifiDevice;
export const IDevice = BasicDevice;
export const DarkMode = MIOTDarkMode;