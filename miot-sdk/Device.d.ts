export default MIOTBasicDevice;
export const DeviceEvent: typeof MIOTDeviceEvent;
export const IDeviceWifi: typeof WifiDevice;
export const IDevice: typeof BasicDevice;
export const DarkMode: {
    darkModeStore: import("./darkmode/index").DarkModeStore;
    preparePluginOwnDarkMode(): void;
    getColorScheme(): import("./darkmode/index").NativeColorScheme;
    addChangeListener(listener: any): void;
    removeChangeListener(listener: any): void;
};
import MIOTBasicDevice from "./device/BasicDevice";
import { DeviceEvent as MIOTDeviceEvent } from "./device/BasicDevice";
import WifiDevice from "./device/WifiDevice";
import { BasicDevice } from "./device/BasicDevice";