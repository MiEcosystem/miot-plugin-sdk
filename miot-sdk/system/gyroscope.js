/**
 * @export public
 * @doc_name 手机陀螺仪模块
 * @doc_index 6
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机的陀螺仪
 *
 * @example
 * import {System} from "miot"
 * import {CompassChangeEvent} from "miot"
 * ...
 * System.gyroscope.startGyroscope(//interval).then(() => {
    alert(`startGyroscope: ${ JSON.stringify(res) }`);
   })
 * ...
   System.gyroscope.stopGyroscope().then(() => {})
 * ...
 */
export { default, GyroscopeChangeEvent } from 'mhrn/system/gyroscope';