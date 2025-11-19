import { report } from "../decorator/ReportDecorator";
import native from "../native";
import { pluginSpecPackagesName, specPluginNames } from "../utils/special-plugins";
import permissionLocal from "./permissionLocal.json";
export declare class IPermission {
  /**
   * 拉取最新远程配置，默认会调用一次，优先使用远程配置
   * @returns {Promise<Object>}
   */
  fetchRemoteConfig(): Promise<object>;
  /**
   * 方法白名单
   * @param {string} method 方法名称
   * @param {string} model 需要判断的 model
   * @returns {boolean>} 允许或者不允许
   */
  isMethodAllowed(method: string, model: string): boolean;
}
const instance: IPermission;
export default instance;