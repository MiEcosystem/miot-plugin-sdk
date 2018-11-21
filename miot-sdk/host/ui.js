/**
 * @export
 * @module miot/host/ui
 * @description 本地业务页面访问与处理
 *
 *
 *
 *
 */
const resolveAssetSource = require('resolveAssetSource');
function resolveUrl(rawUrl) {
}
export default {
  /**
   * 弹出删除设备的对话框
   * @param {string} [title=null] - 自定义提示，不设置使用默认提示
   */
  openDeleteDevice(title = null) {
  },
  /**
   * 打开分享设备的页面
   */
  openShareDevicePage() {
  },
  /**
   * 打开房间设备管理的页面
   */
  openRoomManagementPage() {
  },
  /**
   * 打开语音设备管理的页面
   */
  openVoiceCtrlDeviceAuthPage() {
  },
  /**
   * 打开添加智能的页面
   */
  openIftttAutoPage() {
  },
  /**
   * 打开反馈页
   */
  openFeedbackInput() {
  },
  /**
   * 打开安全管理页
   */
  openSecuritySetting() {
  },
  /**
   * 打开常见问题页，别名「使用帮助」
   */
  openHelpPage() {
  },
  /**
   * 打开分享列表页面
   * @param {string} title
   * @param {string} description
   * @param {string} imagePath 和Image source 一样的格式
   * @param {string} url
   */
  openShareListBar(title, description, imagePath, url) {
  },
  /**
   * @callback getDevicesWithModelCallback
   * @param {boolean} success
   * @param {Object} devices
   */
  /**
   * 获取设备列表中指定model的设备信息
   * @param {string} model - 设备model
   * @returns {Promise<Array<devices>>}
   *
   */
  getDevicesWithModel(model) {
     return Promise.resolve([]);
  },
  /**
   * 打开蓝牙网关页
   */
  openBtGatewayPage() {
  },
  /**
   * 查看软件政策和隐私协议
   * @param {string} licenseTitle
   * @param {string} licenseUrl - require('资源的相对路径')
   * @param {string} policyTitle
   * @param {string} policyUrl - require('资源的相对路径')
   */
  privacyAndProtocolReview(licenseTitle, licenseUrl, policyTitle, policyUrl) {
  },
  /**
   * 软件政策和隐私协议授权
   * @param {string} licenseTitle
   * @param {string} licenseUrl - require('资源的相对路径')
   * @param {string} policyTitle
   * @param {string} policyUrl - require('资源的相对路径')
   * @returns {Promise}
   */
  openPrivacyLicense(licenseTitle, licenseUrl, policyTitle, policyUrl) {
     return Promise.resolve({});
  },
  /**
   * 打开重命名对话框
   */
  openChangeDeviceName() {
  },
  /**
   * 添加桌面快捷方式
   */
  openAddToDesktopPage() {
  },
  /**
   * 打开设备检查固件升级页
   */
  openDeviceUpgradePage() {
  },
  /**
   * 打开H5页面
   * @param {string} url - 链接地址
   */
  openWebPage(url) {
  },
  /**
   * 打开商城某商品详情页面
   * @param {string} gid - 商品ID
   */
  openShopPage(gid) {
  },
  /**
   * 打开创建设备组页
   * 只有特定设备支持创建设备组统一管理
   */
  openAddDeviceGroupPage() {
  },
  /**
   * @param {Array} dids- 包含组设备did的数组
   */
  openEditDeviceGroupPage(dids) {
  },
  /**
   * @param {string} onMethod  定时到时设备“开”执行的 RPC 指令命令字字符串
   * @param {string} onParam   定时到时设备“开”执行的 RPC 指令参数字符串（目前仅支持单参数）
   * @param {string} offMethod 定时到时设备“关”执行的 RPC 指令命令字字符串
   * @param {string} offParam  定时到时设备“关”执行的 RPC 指令参数字符串（目前仅支持单参数）
   *
   * @description 这个api 应该可以废弃了
   */
  openTimerSettingPage(onMethod, onParam, offMethod, offParam) {
  },
  /**
   * @param {string} onMethod  定时到时设备“开”执行的 RPC 指令命令字字符串
   * @param {json} onParam   定时到时设备“开”执行的 RPC 指令参数，可以是字符串、数字、字典、数组
   * @param {string} offMethod 定时到时设备“关”执行的 RPC 指令命令字字符串
   * @param {json} offParam  定时到时设备“关”执行的 RPC 指令参数，可以是字符串、数字、字典、数组
   */
  openTimerSettingPageWithVariousTypeParams(onMethod, onParam, offMethod, offParam) {
  },
  /**
   * 打开某设备列表中的某个设备
   * @param {string} did  设备的did
   * @param {string} model  设备的model
   * @returns {Promise<json>} 返回被打开的 device 信息
   */
  openDevice(did, model, callback) {
     return Promise.resolve(null);
  },
  /**
   * 打开一个原生类 className ，界面类类名 注意 用此方法打开的vc初始化时不需要传参数，
   * 需要传参的viewController暂时还需要手动导出
   * @param {string} className 类的名字
   */
  openPageWithClassName(className) {
  },
  /**
   * 打开更多设置页面（通常包括安全设置，常见问题与用户反馈）
   */
  openNewMorePage() {
  },
};