/**
 * 电量
 * @interface
 *
 */
export declare class IBattery {
  /**
     * 获取设备电量信息
     * @since 10043
     * @returns {Promise<object>} res:
     * 成功时：{"code":0, "data":xxx},data.level:string,设备电量,取值范围0-100,data.isCharging:boolean,是否正在充电中
     * 失败时：{"code":-1, "message":"xxx" }；
     * @example
     *  System.battery.getBatteryInfo().then((res) => {
      if (res && res.data) {
        alert(`getBatteryInfo success,level:${ res.data.level },isCharging:${ res.data.isCharging }`);
      } else {
        alert(`getBatteryInfo fail,${ JSON.stringify(res) }`);
      }
    }).catch((error) => {
      alert(`getBatteryInfo fail,${ JSON.stringify(error) }`);
    });
     */
  getBatteryInfo(): Promise<object>;
}
export default BatteryInstance;
declare const BatteryInstance: IBattery;