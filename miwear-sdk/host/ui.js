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

  /**
   * 打开智能跳绳2设备管理页
   * @param {JSON} params 
   * @param {String} params.did 当前设备did
   * @returns {Promise}
   */
  static openSmartRopeDeviceManager(params) {
    return new Promise((resolve, reject) => {
      wearNative.MiWearHost.openSmartRopeDeviceManager(params, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }

  /**
   * 打开运动健康运动数据中心
   * @param {JSON} params 
   * @param {String} params.did 设备id
   * @param {String} params.sportType 运动类型,默认：rope_skipping（跳绳）
   * @param {Number} params.selectIdx 默认选中Tab,0周/1月/2年/3总,不传默认“总”Tab
   * @returns {Promise}
   */
  static openSportDataCenter(params) {
    return new Promise((resolve, reject) => {
      wearNative.MiWearHost.openSportDataCenter(params, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }

  /**
   * 打开运动健康报告页
   * @note 通过did和运动开始时间戳跳转
   * @param {JSON} params 
   * @param {String} params.did 设备id
   * @param {Number} params.timestamp 运动开始时间戳
   * @returns {Promise}
   */
  static openSportReport(params) {
    return new Promise((resolve, reject) => {
      wearNative.MiWearHost.openSportReport(params, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }

  /**
   * 打开运动健康报告页
   * @note 通过运动报告和运动打点文件Mock跳转（用于报告页调试）
   * @param {JSON} params
   * @param {String} params.reportDataString 运动报告数据（十六进制字符串形式）
   * @param {String} params.recordDataString 运动打点数据（十六进制字符串形式）
   * @returns {Promise}
   */
  static mockSportReport(params) {
    return new Promise((resolve, reject) => {
      wearNative.MiWearHost.mockSportReport(params, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
}