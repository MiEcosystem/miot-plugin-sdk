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
import native, { isAndroid } from "../native";
import { PermissionsAndroid } from "react-native";
/**
 * 权限
 * @interface
 *
 */
export const Permissions = {
  "CAMERA": "camera",
  "RECORD_AUDIO": "record_audio",
  "LOCATION": "location"
};
class IPermission {
  /**
   * @typedef {Object} PermissionInfo
   * @property {number} type iOS 中，为 PHOTOS 时， 0表示未选择， 1，2表示无权限，3表示有权限，4表示部分照片有权限
   */
  /**
    * @typedef {Object} PermissionRes
    * @property {number} code 0表示成功，其他表示失败
    * @property {string} message 信息描述
    * @property {Object<PermissionInfo>} info 可选
    */
  /**
    * 弹出提示框向用户请求某项权限。返回一个 Promise,表示处理完成
    * @since 10047
    * @param permission Permissions中的某项权限
    * @return {Promise<PermissionRes>} 申请成功或失败
    * @example
    *  System.permission.requestInfo(Permissions.CAMERA).then((res) => {
          alert(`requestPermission,result:${ res }`);
        }).catch((error) => {
          alert(`requestPermission,error:${ JSON.parse(error) }`);
        });
    */
  @report
  requestInfo(permission) {
    return this._request(permission, true);
  }
  /**
   * 弹出提示框向用户请求某项权限。返回一个 Promise,表示处理完成
   * @since 10043
   * @param permission Permissions中的某项权限
   * @return {Promise<Boolean>} 申请成功或失败
   * @example
   *  System.permission.request(Permissions.CAMERA).then((res) => {
    alert(`requestPermission,result:${ res }`);
  }).catch((error) => {
    alert(`requestPermission,error:${ JSON.parse(error) }`);
  });
   */
  @report
  request(permission) {
    return this._request(permission);
  }
  _request(permission, returnInfo = false) {
  }
}
function getPermissionString(permission) {
  switch (permission) {
    case Permissions.CAMERA:
      return PermissionsAndroid.PERMISSIONS.CAMERA;
    case Permissions.RECORD_AUDIO:
      return PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
    case Permissions.LOCATION:
      return PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
    default:
      console.log("IPermission", `permission not support:${ permission }`);
      return "";
  }
}
const PermissionInstance = new IPermission();
export default PermissionInstance;