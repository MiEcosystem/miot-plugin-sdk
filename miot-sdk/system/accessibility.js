import native, { buildEvents } from "../native";
class IAccessibility {
    /**
     * 获取无障碍高对比度文字开关状态
     * 
     * @returns {Promise<boolean>} result: 开：true，关：false
     * @example
     * System.accessibility.getHighTextContrastState().then((res) => {
     *      alert(`highTextContrastState -> ${res}`)
     * })
     */
    @report
  getHighTextContrastState() {
  }
}
const AccessibilityInstance = new IAccessibility();
export default AccessibilityInstance;