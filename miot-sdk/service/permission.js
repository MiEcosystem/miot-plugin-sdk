/**
 * @export private
 * @doc_name SDK 权限模块
 * @doc_index 10
 * @doc_directory service
 * @module miot/service/permission
 * @description
 * 用于控制插件对API的使用权限, 仅限于SDK内部使用
 * @example
 * import {Service} from "miot"
 * Service.permission.isMethodAllowed(xxx,xxx)
 */
import { report } from "../decorator/ReportDecorator";
import native from "../native";
import permissionLocal from "./permissionLocal.json";
class IPermission {
  /**
   * 拉取最新远程配置，默认会调用一次，优先使用远程配置
   * @returns {Promise<Object>}
   */
  @report
  fetchRemoteConfig() {
    });
  }
  /**
   * 方法白名单
   * @param {string} method 方法名称
   * @param {string} model 需要判断的 model
   * @returns {boolean>} 允许或者不允许
   */
  @report
  isMethodAllowed(method, model) {
    let map = this.remoteConfig ?? this.localConfig;
    let methodAllow = map.methodAllow ?? {};
    let models = methodAllow[method] ?? [];
    return models.length == 0
    || models.includes(model)
    || models.find((m) => { return model.startsWith(m); });
  }
}
const instance = new IPermission();
instance.fetchRemoteConfig().then((res) => {
  console.log('获取远程权限配置成功，优先使用远程配置', JSON.stringify(res, null, '\t'));
}).catch((err) => {
  console.log('获取或解析云端权限配置失败，将使用本地配置', JSON.stringify(err, null, '\t'));
});
export default instance;