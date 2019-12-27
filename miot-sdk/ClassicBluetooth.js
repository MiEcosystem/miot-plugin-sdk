// 兼容老版本
import ClassicDevice, { ClassicBluetoothEvent as MIOTClassicBluetoothEvent } from './device/bluetooth/ClassicDevice';
export default ClassicDevice;
export const ClassicBluetoothEvent = MIOTClassicBluetoothEvent;