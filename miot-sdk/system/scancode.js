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
   * @return {Promise<Object>}
   * result(String):扫码获取的字符串数据
   * @example
   *  System.scancode.getScanCode().then((res) => {
        console.log("111", res);
      }).catch((error) => {
        console.log(error);
    });
   */
  @report
  scanCode() {
  }
}

const ScanCodeInstance = new IScanCode();

export default ScanCodeInstance;
