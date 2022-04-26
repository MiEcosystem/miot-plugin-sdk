/**
 * @export public
 * @doc_name 手机系统模块
 * @doc_index 1
 * @doc_directory system
 * @module miot/system
 * @description
 * 扩展程序运行时手机系统提供的功能
 * 系统的能力主要包括：
 * 电量(battery.js)
 * 屏幕(screen.js)
 * 音量(volume.js)
 * 加速计(accelerometer.js)
 * 罗盘(compass.js)
 * 陀螺仪(gyroscope.js)
 * 性能(memory.js)
 * 扫码(scancode.js)
 * 震动(vibrate.js)
 * 语音、相机(permission.js)
 * 定位(location.js)
 * 网络(network.js)
 * @example
 *  import {System} from 'miot'
 */
import Battery from "./battery";
import Accelerometer from "./accelerometer";
import Compass from "./compass";
import Gyroscope from "./gyroscope";
import ScanCode from "./scancode";
import Vibrate from "./vibrate";
import Permission from "./permission";
import Location from "./location";
import Volume from "./volume";
import Network from "./network";
import Shake from "./shake";
import Nfc from './nfc';
export const battery = Battery;
export const accelerometer = Accelerometer;
export const compass = Compass;
export const gyroscope = Gyroscope;
export const scancode = ScanCode;
export const vibrate = Vibrate;
export const permission = Permission;
export const location = Location;
export const volume = Volume;
export const network = Network;
export const shake = Shake;
export const nfc = Nfc;
export default {
  battery, accelerometer, compass, gyroscope, scancode,
  vibrate, permission, location, volume, network, shake, nfc
};