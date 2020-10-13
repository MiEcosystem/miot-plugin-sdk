/**
 * @export public
 * @doc_name 手机加速模块
 * @doc_index 3
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机的加速计
 *
 * @example
 * import {System} from "miot"
 * import {AccelerometerChangeEvent} from "miot"
 * ...
 * System.accelerometer.startAccelerometer(//interval).then(() => {
    alert(`startAccelerometer: ${ JSON.stringify(res) }`);
   })
 * ...
   System.accelerometer.stopAccelerometer().then(() => {})
 * ...
 */
import native, { buildEvents } from "../native";
/**
 * 加速计
 * @interface
 *
 */
class IAccelerometer {
  /**
   * 开始监听加速度数据
   * @since 10043
   * @param {string} interval 监听加速度数据回调函数的执行频率。其合法值如下：
   * game 适用于更新游戏的回调频率，在 20ms/次 左右；
   * ui 适用于更新 UI 的回调频率，在 60ms/次 左右；
   * normal 普通的回调频率，在 200ms/次 左右。
   * @returns {Promise<json>} 成功时：{code:0,message:'success'}
   * @example
   *  System.accelerometer.startAccelerometer(interval.a).then((res) => {
        alert(`startAccelerometer: ${ JSON.stringify(res) }`);
      }).catch((error) => {
        alert(`startAccelerometer: ${ JSON.stringify(error) }`);
      });
   */
  @report
  startAccelerometer(interval) {
    return new Promise((resolve, reject) => {
      native.MIOTSystem.startAccelerometer(interval, (ok, res) => {
        if (ok) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  /**
   * 停止监听加速度数据
   * @since 10043
   * @returns {Promise<json>} 成功时：{code:0,message:'success'}
   * @example
   *  System.accelerometer.stopAccelerometer().then((res) => {
          alert(`stopAccelerometer: ${ JSON.stringify(res) }`);
        }).catch((error) => {
          alert(`stopAccelerometer: ${ JSON.stringify(error) }`);
        });
      }
   */
  @report
  stopAccelerometer() {
    return new Promise((resolve, reject) => {
      native.MIOTSystem.stopAccelerometer((ok, res) => {
        if (ok) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
}
/**
 * 监听加速度数据事件。需要先调用startAccelerometer开始监听,回调的频率根据 startAccelerometer的 interval 参数
 * @since 10043
 * @returns {object} result 包含X、Y、Z轴的加速度
 * @example
 *  AccelerometerChangeEvent.onAccelerometerChange.addListener((result) => {
      console.log(result);
    });
 */
export const AccelerometerChangeEvent = {
  onAccelerometerChange: {
  }
};
buildEvents(AccelerometerChangeEvent);
const AccelerometerInstance = new IAccelerometer();
export default AccelerometerInstance;