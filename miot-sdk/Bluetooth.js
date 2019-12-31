// 兼容老版本
import Bluetooth, { getBluetoothUUID128 as MIOTGetBluetoothUUID, takeBluetooth as MIOTTakeBluetooth } from "./device/bluetooth";
import { IBluetooth as BluetoothDevice, BluetoothEvent as MIOTBluetoothEvent } from './device/bluetooth/BluetoothDevice'
import { IBluetoothService as MIOTIBluetoothService, IBluetoothCharacteristic as MIOTIBluetoothCharacteristic } from './device/bluetooth/CoreBluetooth';
import LockDevice from './device/bluetooth/LockDevice';
export default Bluetooth;
export const IBluetooth = BluetoothDevice;
export const BluetoothEvent = MIOTBluetoothEvent;
export const IBluetoothService = MIOTIBluetoothService;
export const IBluetoothCharacteristic = MIOTIBluetoothCharacteristic;
export const IBluetoothLock = LockDevice;
export const getBluetoothUUID128 = MIOTGetBluetoothUUID;
export const takeBluetooth = MIOTTakeBluetooth;