/**
 * @export public
 * @doc_name 页面导航模块
 * @doc_index 7
 * @doc_directory host
 * @module miwear/host/ui
 * @description 本地原生业务页面访问与处理
 * @example
 * import {Host} from 'miwear' 
 *
 *
 */
import native, { isAndroid, isIOS } from "miot/native";
import { report } from "miot/decorator/ReportDecorator";
import Host from "miot/Host";
import wearNative from "../native";

export default class NativePagesRouter {

  static openWebPage(url, params = {}) {
    Host.openWebPage(url, params);
  }

  /**
   * 打开反馈页
   */
  @report
  static openFeedback() {
    console.log("openFeedback");
    wearNative.MiWearHost.openFeedback();
  }
}