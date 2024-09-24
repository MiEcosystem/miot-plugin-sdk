import Package from "miot/Package";
import native from "../native";
export default {
  requestData(url, params) {
    return new Promise((resolve, reject) => {
      native.MiWearHost.requestUrl(url, params, (isSuccess, response) => {
        if (isSuccess) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  },
  requestApi(api, params) {
    let data = {
      eco_api: api,
      params: params
    };
    return this.requestData("eco/api_proxy", data);
  },
  /**
   * 获取业务插件版本号
   * model： 设备model 示例：mi.wear.l67
   */
  getPluginVersion(model) {
    console.log("getPluginVersion")
    return Package.version;
  },
  /**
   * 打开智能跳绳2设备管理页
   * @param {JSON} params 
   * @param {String} params.did 当前设备did
   * @returns {Promise}
   */
  openSmartRopeDeviceManager(params) {
    return new Promise((resolve, reject) => {
      native.MiWearHost.openSmartRopeDeviceManager(params, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  },
  /**
   * 打开运动健康运动数据中心
   * @param {JSON} params 
   * @param {String} params.did 设备id
   * @param {String} params.sportType 运动类型,默认：rope_skipping（跳绳）
   * @param {Number} params.selectIdx 默认选中Tab,0周/1月/2年/3总,不传默认“总”Tab
   * @returns {Promise}
   */
  openSportDataCenter(params) {
    return new Promise((resolve, reject) => {
      native.MiWearHost.openSportDataCenter(params, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  },
  /**
   * 打开运动健康报告页
   * @note 通过did和运动开始时间戳跳转
   * @param {JSON} params 
   * @param {String} params.did 设备id
   * @param {Number} params.timestamp 运动开始时间戳
   * @returns {Promise}
   */
  openSportReport(params) {
    return new Promise((resolve, reject) => {
      native.MiWearHost.openSportReport(params, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  },
  /**
   * 打开运动健康报告页
   * @note 通过运动报告和运动打点文件Mock跳转（用于报告页调试）
   * @param {JSON} params
   * @param {String} params.reportDataString 运动报告数据（十六进制字符串形式）
   * @param {String} params.recordDataString 运动打点数据（十六进制字符串形式）
   * @returns {Promise}
   */
  mockSportReport(params) {
    return new Promise((resolve, reject) => {
      native.MiWearHost.mockSportReport(params, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  },
};