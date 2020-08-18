/**
 * @export public
 * @doc_name 手机系统模块
 * @doc_index 1
 * @doc_directory system
 * @module miot/system
 * @description
 * 扩展程序运行时手机系统提供的功能
 * 系统的能力主要包括：
 * 1. 电量(battery.js)
 * 2. 屏幕(screen.js)
 * 3. 加速计(accelerometer.js)
 * 4. 罗盘(compass.js)
 * 5. 陀螺仪(gyroscope.js)
 * 6. 性能(memory.js)
 * 7. 扫码(scancode.js)
 * 8. 震动(vibrate.js)
 * 9. 语音、相机(permission.js) 
 * 10. 定位(location.js)
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
export const battery = IBattery;
export const accelerometer = IAccelerometer;
export const compass = ICompass;
export const gyroscope = IGyroscope;
export const scancode = IScanCode;
export const vibrate = IVibrate;
export const permission = IPermission;
export const location = Location;
export default {
  battery, accelerometer, compass, gyroscope, scancode, 
  vibrate, permission, location
};