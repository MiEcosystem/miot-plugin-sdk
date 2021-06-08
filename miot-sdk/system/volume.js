/**
 * @export public
 * @doc_name 手机音量模块
 * @doc_index 13
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机音量
 *
 * @example
 * import {System} from "miot"
 * import {VolumeChangeEvent} from "miot"
 * ...
 * System.volume.startVolume().then((res) => {
        alert(`getStartVolume: ${ JSON.stringify(res) }`);
    });
 * ...
 System.volume.stopVolume().then(() => {})
 * ...
 */
import native, { buildEvents } from "../native";
/**
 * 音量
 * @interface
 *
 */
class IVolume {
  /**
   * 获取音量信息
   * @since 10045
   * @returns {Promise<object>} result:
   * 成功时：{"code":0, "data":xxx},data.volume:number,设备当前音量，取值在0.0-1.0之间
   * 失败时：{"code":-1, "message":"xxx" }；
   * @example
   *   System.volume.getVolumeInfo().then((res) => {
    if (res && res.data) {
      alert(`getSystemVolumeInfo success,volume:${ res.data.volume }`);
    } else {
      alert(`getSystemVolumeInfo fail,${ JSON.stringify(res) }`);
    }
  }).catch((error) => {
    alert(`getSystemVolumeInfo fail,${ JSON.stringify(error) }`);
  });
  });
   */
  @report
  getVolumeInfo() {
  }
  /**
   * 开始监听音量变化
   * @since 10045
   * @param {Object} hideSystemSlider 是否隐藏系统的音量进度条，默认不隐藏
   * @returns {Promise<json>} 成功时：{code:0,message:'success'}
   * @example
   *  System.volume.startVolume({hideSystemSlider:true}).then((res) => {
    alert(`getStartVolume: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`getStartVolume: ${ JSON.stringify(error) }`);
  });
   */
  @report
  startVolume({ hideSystemSlider = false } = {}) {
  }
  /**
   * 停止监听量变化
   * @since 10045
   * @returns {Promise<json>} 成功时：{code:0,message:'success'}
   * @example
   *  System.volume.stopVolume().then((res) => {
    alert(`getStopVolume: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`getStopVolume: ${ JSON.stringify(error) }`);
  });
   */
  @report
  stopVolume() {
  }
}
/**
 * 监听音量变化事件
 * @since 10045
 * @returns {number} volume 当前音量
 * @example
 *  VolumeChangeEvent.onVolumeChange.addListener((result) => {
      console.log(result);
    });
 */
export const VolumeChangeEvent = {
  onVolumeChange: {
  }
};
buildEvents(VolumeChangeEvent);
const VolumeInstance = new IVolume();
export default VolumeInstance;