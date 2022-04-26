/**
 * @export public
 * @doc_name 手机权限模块
 * @doc_index 10
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机的语音、相机和定位的权限
 *
 * @example
 * import {System} from "miot"
 * ...
 * System.permission.request(permission).then((res) => {})
 * ...
 */
export { default } from 'mhrn/system/permission';