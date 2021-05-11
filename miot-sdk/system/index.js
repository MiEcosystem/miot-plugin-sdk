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
 *
 * @example
 *
 *  import {System} from 'miot'
 *
 */
import IBattery from "./battery";
import IAccelerometer from "./accelerometer";
import ICompass from "./compass";
import IGyroscope from "./gyroscope";
import IScanCode from "./scancode";
import IVibrate from "./vibrate";
import IPermission from "./permission";
import Location from "./location";
import Volume from "./volume";
import Network from "./network";
import IShake from "./shake";
import INfc from './nfc';
export const battery = IBattery;
export const accelerometer = IAccelerometer;
export const compass = ICompass;
export const gyroscope = IGyroscope;
export const scancode = IScanCode;
export const vibrate = IVibrate;
export const permission = IPermission;
export const location = Location;
export const volume = Volume;
export const network = Network;
export const shake = IShake;
export const nfc = INfc;
export default {
  battery, accelerometer, compass, gyroscope, scancode,
  vibrate, permission, location, volume, network, shake, nfc
};