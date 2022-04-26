/**
 * @export public
 * @doc_name 手机扫码模块
 * @doc_index 8
 * @doc_directory system
 * @module miot/system
 * @description
 * 通过米家APP扫描二维码
 *
 * @example
 * import {System} from "miot"
 * ...
 * System.scancode.getScanCode().then(res => {//return result})
 * ...
 */
export { default } from 'mhrn/system/scancode';