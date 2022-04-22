/**
 * @since 10068
 * @doc_name 小爱
 * @description 提供给小爱使用的相关API
 */
import native from '../native/index';
/**
 * @export
 */
class IXiaoai {
  /**
   * @param param 预留
   * @since 10069
   */
  showQQMusicAuthAlert(param = {}) {
    native.MIOTWifiSpeaker.showQQMusicAuthAlert(param);
  }
}
const IXiaoaiInstance = new IXiaoai();
export default IXiaoaiInstance;