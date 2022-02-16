/**
 * 云端隐私通知类型
 * @namespace CLOUD_PRIVACY_EVENT_TYPE
 */
export const CLOUD_PRIVACY_EVENT_TYPE = {
  // 已经同意过云端隐私弹窗或者点击同意云端隐私弹窗
  AGREED: 'agreed',
  // 获取同意状态失败或者弹窗失败
  FAILED: 'failed',
  // 没有同意过云端隐私弹窗,需要弹窗,且弹窗成功
  POP_DIALOG_SUCCESS: 'pop_dialog_success'
};
Object.freeze(CLOUD_PRIVACY_EVENT_TYPE);
export const PrivacyEvent = {
  /**
   * 云端隐私状态通知,通知为
   * {eventType: CLOUD_PRIVACY_EVENT_TYPE中的某个值,
   * eventMessage: String类型,通知消息}
   * @event
   * @since 10064
   */
  cloudPrivacyEvent: { always: true }
};