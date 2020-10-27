/**
 * @export public
 * @doc_name 手机摇一摇模块
 * @doc_index 11
 * @doc_directory system
 * @module miot/system
 * @description
 * 摇一摇
 *
 * @example
 * import {System} from "miot"
 * import {ShakeEvent} from "miot"
 * ...
 * System.shake.startShakeListener().then((res) => {
    alert(`startShakeListener: ${ JSON.stringify(res) }`);
  })
 * ...
 System.shake.stopShakeListener().then((res) => {
    alert(`stopShakeListener: ${ JSON.stringify(res) }`);
  })
 * ...
 */
import native, { buildEvents } from "../native";
/**
 * 摇一摇
 * @interface
 *
 */
class IShake {
  /**
   * 开始监听摇一摇
   * @since 10045
   * @returns {Promise} 成功时：{code:0,message:'success'}
   * 失败时：{code:xxx, message:"xxx" }
   * @example
   *  System.shake.startShakeListener().then((res) => {
    alert(`startShakeListener: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`startShakeListener: ${ JSON.stringify(error) }`);
  });
   */
  @report
  startShakeListener() {
    return new Promise((resolve, reject) => {
      native.MIOTSystem.startShakeListener((ok, res) => {
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
   * @since 10045
   * @returns {Promise} 成功时：{code:0,message:'success'}
   * 失败时：{code:xxx, message:"xxx" }
   * @example
   *  System.shake.stopShakeListener().then((res) => {
    alert(`stopShakeListener: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`stopShakeListener: ${ JSON.stringify(error) }`);
  });
   */
  @report
  stopShakeListener() {
    return new Promise((resolve, reject) => {
      native.MIOTSystem.stopShakeListener((ok, res) => {
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
 * 监听摇一摇事件。需要先调用startShakeListener开始监听,注意及时取消监听
 * @since 10045
 * @example
 *  ShakeEvent.onShake.addListener(() => {
      console.log(`ShakeEvent`);
    });
 */
export const ShakeEvent = {
  onShake: {
  }
};
buildEvents(ShakeEvent);
const ShakeInstance = new IShake();
export default ShakeInstance;