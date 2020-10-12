/**
 * @export public
 * @doc_name 手机罗盘模块
 * @doc_index 5
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机的罗盘
 *
 * @example
 * import {System} from "miot"
 * import {CompassChangeEvent} from "miot"
 * ...
 * System.compass.startCompass(//interval).then(() => {
    alert(`startCompass: ${ JSON.stringify(res) }`);
   })
 * ...
   System.compass.stopCompass().then(() => {})
 * ...
 */
import native, { buildEvents } from "../native";
/**
 * 罗盘
 * @interface
 *
 */
class ICompass {
  /**
   * 开始监听罗盘数据
   * @since 10043
   * @param {string} interval 监听罗盘数据回调函数的执行频率。其合法值如下：
   * game 适用于更新游戏的回调频率，在 20ms/次 左右；
   * ui 适用于更新 UI 的回调频率，在 60ms/次 左右；
   * normal 普通的回调频率，在 200ms/次 左右。
   * @returns {Promise<json>} 成功时：{code:0,message:'success'}
   * @example
   *  System.compass.startCompass(interval.c).then((res) => {
        alert(`startCompass: ${ JSON.stringify(res) }`);
      }).catch((error) => {
        console.log(error);
      });
   */
  @report
  startCompass(interval) {
  }
  /**
   * 停止监听罗盘数据
   * @since 10043
   * @returns {Promise<json>} 成功时：{code:0,message:'success'}
   * @example
   *  System.compass.stopCompass().then((res) => {
          alert(`stopCompass: ${ JSON.stringify(res) }`);
        }).catch((error) => {
          console.log(error);
        });
      }
   */
  @report
  stopCompass() {
  }
}
/**
 * 监听罗盘数据变化事件。频率：5 次/秒，接口调用后会自动开始监听，可使用 wx.stopCompass 停止监听。
 * @since 10043
 * @returns {number} direction 面对的方向度数
 * @example
 *  CompassChangeEvent.onCompassChange.addListener((result) => {
      console.log(result);
    });
 */
export const CompassChangeEvent = {
  onCompassChange: {
  }
};
buildEvents(CompassChangeEvent);
const CompassInstance = new ICompass();
export default CompassInstance;