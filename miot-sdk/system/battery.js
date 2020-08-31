/**
 * @export public
 * @doc_name 手机电量模块
 * @doc_index 2
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机的电量
 *
 * @example
 * import {System} from "miot"
 * ...
 * System.battery.getBatteryInfo().then(res => {//return result})
 * ...
 */
import native, { isIOS } from "../native";
/**
 * 电量
 * @interface
 *
 */
class IBattery {
  /**
   * 获取设备电量信息
   * @since 10043
   * @returns {Promise<object>} result:
   * result.level:string,设备电量,取值范围0-100；
   * result.isCharging:boolean,是否正在充电中；
   * @example
   *  System.battery.getBatteryInfo().then((res) => {
        alert(`getBatteryInfo,level:${ res.level },isCharging:${ res.isCharging }`);
        console.log("111", res);
      }).catch((error) => {
        console.log(error);
    });
   */
  @report
  getBatteryInfo() {
  }
}
const BatteryInstance = new IBattery();
export default BatteryInstance;