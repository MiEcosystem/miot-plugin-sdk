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
import native from "../native";
/**
 * 扫码
 * @interface
 *
 */
class IScanCode {
  /**
   * 使用米家APP进行扫码操作
   * @since 10043
   * @return {Promise<Object>} res
   * 成功时：{"code":0, "data":xxx},data.result:string,扫码结果
   * 失败时：{"code":-1, "message":"xxx" }；
   * @example
   *  System.scancode.scanCode().then((res) => {
    if (res && res.data) {
      alert(`getScanCode success,result:${ res.data.result }`);
    } else {
      alert(`getScanCode fail,${ JSON.stringify(res) }`);
    }
  }).catch((error) => {
    alert(`getScanCode fail,${ JSON.stringify(error) }`);
  });
   */
  @report
  scanCode() {
  }
}
const ScanCodeInstance = new IScanCode();
export default ScanCodeInstance;