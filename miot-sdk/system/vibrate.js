/**
 * @export public
 * @doc_name 手机震动模块
 * @doc_index 9
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机的长震与短震
 *
 * @example
 * import {System} from "miot"
 * ...
 * System.vibrate.vibrateShort();
 * ...
 */
import native from "../native";
/**
 * 震动
 * @interface
 *
 */
class IVibrate {
  /**
   * 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
   * @since 10043
   * @example System.vibrate.vibrateShort();
   */
  @report
  vibrateShort() {
  }
  /**
   * 使手机发生较长时间的振动（400 ms)
   * @since 10043
   * @example System.vibrate.vibrateLong();
   */
  @report
  vibrateLong() {
  }
}
const VibrateInstance = new IVibrate();
export default VibrateInstance;