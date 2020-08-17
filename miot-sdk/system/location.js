/**
 * @export public
 * @doc_name 手机系统定位模块
 * @doc_index 11
 * @doc_directory system
 * @module miot/System
 * @description
 * 扩展程序运行时手机系统提供的定位功能，主要包括定位权限的获取，获取当前定位（不同精度），位置信息更新事件等方法
 *
 * @example
 *
 *  import {System} from 'miot'
 *
 *  System.location.getLocation({accuracy:1}).then(res=>{
 *      console.log(res)
 *  })
 *
 */
import native, { isAndroid, buildEvents } from '../native';
import { report } from "../decorator/ReportDecorator";
export class Location {
  /**
   * 获取手机地理位置信息
   * @param {string} accuracy 获取定位的精度，可选high, middle, low, since 10043
   * @returns {Promise<object>}{
   * country
   * province
   * city
   * district(区域)
   * street
   * address
   * latitude(纬度)
   * longitude(经度)
   * citycode(城市编码)
   * adcode(区域编码)
   * }
   * @example
   * import {System} from 'miot'
   * ...
   * System.location.getLocation().then(res => {
   *  console.log('get location: ', res)
   * })
   */
  @report
  getLocation(accuracy = 'middle') {
    console.log("getLocation");
     return Promise.resolve(null);
  }
}
/**
 * Host事件集合
 * @namespace HostEvent
 * @example
 *    import { HostEvent } from 'miot/host';
 *    const subscription = HostEvent.cellPhoneNetworkStateChanged.addListener(
 *       (event)=>{
 *          ...
 *       }
 *     )
 *    ...
 *    subscription.remove()
 *    ...
 *
 */
export const LocationEvent = {
  /**
     * 位置信息更新事件
     * @since 10044
     * @event
     * @param{object}  接收到的数据 location
     *
     * @example
     * 可查看LocationEventDemo.js
     *
     */
  locationChanged: {
  }
};
buildEvents(LocationEvent);
const LocationInstance = new Location();
export default LocationInstance;