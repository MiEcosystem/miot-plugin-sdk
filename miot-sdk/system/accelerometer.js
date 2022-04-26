/**
 * @export public
 * @doc_name 手机加速模块
 * @doc_index 3
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机的加速计
 * @example
 * import {System} from "miot"
 * import {AccelerometerChangeEvent} from "miot"
 * ...
 * System.accelerometer.startAccelerometer(//interval).then(() => {
    alert(`startAccelerometer: ${ JSON.stringify(res) }`);
   })
 * ...
   System.accelerometer.stopAccelerometer().then(() => {})
 * ...
 */
export { default, AccelerometerChangeEvent } from 'mhrn/system/accelerometer';