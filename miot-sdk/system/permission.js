/**
 * @export public
 * @doc_name 手机权限模块
 * @doc_index 10
 * @doc_directory system
 * @module miot/System
 * @description
 * 手机的语音、相机和定位的权限
 *
 * @example
 * import {System} from "miot/System"
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
   * 弹出提示框向用户请求某项权限。返回一个 Promise,表示处理完成
   * @since 10043
   * @param permission Permissions中的某项权限
   * @return {Promise<Boolean>} 申请成功或失败
   * @example
   *  System.permission.request(permission).then((res) => {
        console.log("111", res);
      }).catch((error) => {
        console.log(error);
      });
   */
  @report
  request(permission) {
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