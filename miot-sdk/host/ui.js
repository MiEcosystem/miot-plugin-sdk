/**
 * @export
 * @module miot/host/ui
 * @description 本地原生业务页面访问与处理
 * @example
 * import {Host} from 'miot'
 * ...
 * //删除设备
 * Host.ui.openDeleteDevice()
 * //分享设备
 * Host.ui.openShareDevicePage
 *
 *
 */
const resolveAssetSource = require('resolveAssetSource');
function resolveUrl(rawUrl) {
}
export default {
  /**
   * 是否支持商城
   * @return {Promise}
   * @example
   * Host.ui.canOpenStorePage().then(res => console("can open store = ", res))
   */
  canOpenStorePage() {
  },
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
   * 是否保持屏幕常亮
   * @param {Boolean} flag 默认false
   */
  keepScreenNotLock(flag = false) {
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
   * api_level 10001
   * 打开蓝牙网关页面
   */
  openBtGatewayActivity() {
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
   * 打开设备时区设置页
   */
  openDeviceTimeZoneSettingPage() {
    native.MIOTHost.openDeviceTimeZoneSettingPage();
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
   * 开启倒计时界面 
   * @param {Boolean} isCountDownOn 设备的当前状态:YES 为开启，所以我们启动关闭倒计时; NO  为关闭，所以我们启动开启倒计时
   * @param {{onMethod:string, offMethod:string, onParam:string, offParam:string}} setting {onMethod:string, offMethod:string, onParam:string, offParam:string}
   * @example
   * 
   * Host.ui.openCountDownPage(true, {onMethod:"power_on", offMethod:'power_off', onParam:'on', offParam:'off'})
   * 
   */
  openCountDownPage(isCountDownOn, setting) {
  },
  /**
   * 打开一次性密码设置页
   * @param {*} did 
   * @param {*} interval 
   * @param {*} digits 
   */
  openOneTimePassword(did,interval, digits) {
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
   * @param {string} customTimerIdentifier 自定义定时Identifier
   * @param {string} onMethod  定时到时设备“开”执行的 RPC 指令命令字字符串
   * @param {string} onParam   定时到时设备“开”执行的 RPC 指令参数字符串（目前仅支持单参数）
   * @param {string} offMethod 定时到时设备“关”执行的 RPC 指令命令字字符串
   * @param {string} offParam  定时到时设备“关”执行的 RPC 指令参数字符串（目前仅支持单参数）
   *
   * @description 这个api 应该可以废弃了
   */
  openTimerSettingPageWithCustomIdentifier(customTimerIdentifier, onMethod, onParam, offMethod, offParam) {
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
   * 打开用户账号下某一设备的插件
   * @param {string} did  设备的did
   * @param {string} model  设备的model
   * @param {object} params  额外参数，打开插件时传入
   * @returns {Promise<json>} 打开插件失败，返回错误信息；打开插件成功，无回调信息
   */
  openDevice(did, model, params) {
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
   * ios特有页面，android 不能使用
   * 打开更多设置页面（通常包括安全设置，常见问题与用户反馈）
   */
  openNewMorePage() {
  },
  /**
   * 打开小爱训练计划
   * @param {string} clientId 类的名字
   * @param {string} did 类的名字
   * @param {string} aiMiotClientId 类的名字
   * @param {string} aiClientId 类的名字
   * @param {string} aiVersion 类的名字
   */
  openXiaoAiLearnPage(clientId, did, aiMiotClientId, aiClientId, aiVersion) {
  },
};