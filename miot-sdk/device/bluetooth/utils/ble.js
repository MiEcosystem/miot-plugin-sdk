import native, { isAndroid, Properties } from '../../../native';
import LockDevice from '../LockDevice';
import { getBluetoothUUID128, getMacUuid, setMacUuid } from './uuid';
import { IBluetooth as BluetoothDevice } from '../BluetoothDevice';