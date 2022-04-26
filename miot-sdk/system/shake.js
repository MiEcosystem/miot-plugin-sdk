/**
 * @export public
 * @doc_name 手机摇一摇模块
 * @doc_index 11
 * @doc_directory system
 * @module miot/system
 * @description
 * 摇一摇
 * @example
 * import {System} from "miot"
 * import {ShakeEvent} from "miot"
 * ...
 * System.shake.startShakeListener().then((res) => {
    alert(`startShakeListener: ${ JSON.stringify(res) }`);
  })
 * ...
 System.shake.stopShakeListener().then((res) => {
    alert(`stopShakeListener: ${ JSON.stringify(res) }`);
  })
 */
export { default, ShakeEvent } from 'mhrn/system/shake';