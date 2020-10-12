/**
 * @export public
 * @doc_name 手机陀螺仪模块
 * @doc_index 6
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机的陀螺仪
 *
 * @example
 * import {System} from "miot"
 * import {CompassChangeEvent} from "miot"
 * ...
 * System.gyroscope.startGyroscope(//interval).then(() => {
    alert(`startGyroscope: ${ JSON.stringify(res) }`);
   })
 * ...
   System.gyroscope.stopGyroscope().then(() => {})
 * ...
 */
import native, { buildEvents } from "../native";
/**
 * 陀螺仪
 * @interface
 *
 */
class IGyroscope {
  /**
   * 开始监听陀螺仪数据
   * @since 10043
   * @param {string} interval 监听陀螺仪数据回调函数的执行频率。其合法值如下：
   * game 适用于更新游戏的回调频率，在 20ms/次 左右；
   * ui 适用于更新 UI 的回调频率，在 60ms/次 左右；
   * normal 普通的回调频率，在 200ms/次 左右。
   * @returns {Promise<json>} 成功时：{code:0,message:'success'}
   * @example
   *  System.gyroscope.startGyroscope(interval.c).then((res) => {
        alert(`startGyroscope: ${ JSON.stringify(res) }`);
      }).catch((error) => {
        console.log(error);
      });
   */
  @report
  startGyroscope(interval) {
    return new Promise((resolve, reject) => {
      native.MIOTSystem.startGyroscope(interval, (ok, res) => {
        if (ok) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  /**
   * 停止监听陀螺仪数据
   * @since 10043
   * @returns {Promise<json>} 成功时：{code:0,message:'success'}
   * @example
   *  System.gyroscope.stopGyroscope().then((res) => {
          alert(`stopGyroscope: ${ JSON.stringify(res) }`);
        }).catch((error) => {
          console.log(error);
        });
      }
   */
  @report
  stopGyroscope() {
    return new Promise((resolve, reject) => {
      native.MIOTSystem.stopGyroscope((ok, res) => {
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
 * 监听陀螺仪数据变化事件。频率根据 wx.startGyroscope() 的 interval 参数。可以使用 wx.stopGyroscope() 停止监听。
 * @since 10043
 * @returns {object} result 包含X、Y、Z轴的角速度
 * @example
 *  GyroscopeChangeEvent.onGyroscopeChange.addListener((result) => {
      console.log(result);
    });
 */
export const GyroscopeChangeEvent = {
  onGyroscopeChange: {
  }
};
buildEvents(GyroscopeChangeEvent);
const GyroscopeInstance = new IGyroscope();
export default GyroscopeInstance;