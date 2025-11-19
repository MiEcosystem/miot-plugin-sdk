export default NetworkInstance;
declare const NetworkInstance: INetwork;
/**
 * 网络
 * @interface
 *
 */
export declare class INetwork {
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
  getGatewayIpAddress(): Promise<object>;
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
  getWifiBroadcastAddress(): Promise<object>;
}