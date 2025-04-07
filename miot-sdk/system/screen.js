import native, { buildEvents } from "../native";
class IScreen {
    /**
     * 获取手机屏幕锁屏状态
     * 
     * @returns {Promise<boolean>} result: 锁屏：true，未锁屏：false
     * @example
     * System.screen.getScreenLockState().then((res) => {
     *      alert(`screenLocakState -> ${res}`)
     * })
     */
    @report
  getScreenLockState() {
  }
}
/**
 * 监听锁屏状态监听：仅用于android平台
 * @since 10106
 * @example 
 * ScreenLockEvent.screenStateChanged.addListener((locked) => {
 *      console.log(`ScreenLockEvent -> ${locked}`);
 * });
 */
export const ScreenLockEvent = {
  screenStateChanged: {
  }
};
buildEvents(ScreenLockEvent);
const ScreenInstance = new IScreen();
export default ScreenInstance;