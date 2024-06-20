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
  }
};