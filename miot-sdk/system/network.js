/**
 * @export public
 * @doc_name 手机网络模块
 * @doc_index 12
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机网络相关接口
 *
 * @example
 * import {System} from "miot"
 * ...
 * System.network.getGatewayIpAddress().then()
 * ...
 */
import native, { isIOS } from "../native";
/**
 * 网络
 * @interface
 *
 */
class INetwork {
  /**
   * 获取手机当前连接的路由器IP地址
   * @since 10045
   * @returns {Promise<object>} result:
   * 成功时：{"code":0, "data":xxx},data.ipAddress:手机当前连接的路由器IP地址
   * 失败时：{"code":-1, "message":"xxx" }
   * @example
   *  System.network.getGatewayIpAddress().then((res) => {
    if (res && res.data) {
      alert(`getGatewayIpAddress success,ipAddress:${ res.data.ipAddress }`);
    } else {
      alert(`getGatewayIpAddress fail,${ JSON.stringify(res) }`);
    }
  }).catch((error) => {
    alert(`getGatewayIpAddress fail,${ JSON.stringify(error) }`);
  });
   */
  @report
  getGatewayIpAddress() {
  }
  /**
   * 获取当前wifi的广播地址
   * @since 10047
   * @returns {Promise<object>} result:
   * 成功时：{"code":0, "data":{"address":xxx.xxx.xxx}}
   * 失败时：{"code":-1, "message":"xxx" }
   * @example
   * System.network.getGatewayIpAddress().then( res =>{
   *  alert(JSON.stringify(res));
   * }).catch(err =>{
   *  alert(JSON.stringify(err));
   * })
   */
  @report
  getWifiBroadcastAddress() {
  }
}
const NetworkInstance = new INetwork();
export default NetworkInstance;