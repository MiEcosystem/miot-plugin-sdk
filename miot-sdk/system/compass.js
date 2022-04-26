/**
 * @export public
 * @doc_name 手机罗盘模块
 * @doc_index 5
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机的罗盘
 *
 * @example
 * import {System} from "miot"
 * import {CompassChangeEvent} from "miot"
 * ...
 * System.compass.startCompass(//interval).then(() => {
    alert(`startCompass: ${ JSON.stringify(res) }`);
   })
 * ...
   System.compass.stopCompass().then(() => {})
 * ...
 */
export { default, CompassChangeEvent } from 'mhrn/system/compass';