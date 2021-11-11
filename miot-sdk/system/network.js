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
import native, { buildEvents, isIOS } from "../native";
import { CompassChangeEvent } from "./compass";
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
  /**
   * 发起连接wifi指令
   * @since 10061
   * @param ssid 要连接的WIFI名称
   * @param pwd 要连接的WIFI密码
   * @returns {Promise<object>} result:
   * 成功时：{code : 0, message : "send connect wifi command success"}
   * 连接是否成功需要监听ConnectionChangedEvent.networkConnectionChanged
   * @example
   * let params = {
   *    ssid: "xxx",
   *    pwd: "xxx"
   * }
   * System.network.connectWifi(params).then(res =>{
   *  alert(JSON.stringify(res));
   * }).catch(err =>{
   *  alert(JSON.stringify(err));
   * })
   * */
  @report
  connectWifi(params) {
  }
}
export const ConnectionChangedEvent = {
  networkConnectionChanged: {
  }
};
buildEvents(ConnectionChangedEvent);
const NetworkInstance = new INetwork();
export default NetworkInstance;