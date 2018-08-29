/**
 * @export
 * @module miot/host/ui
 * @description 本地业务页面访问与处理
 *
 *
 *
 *
 */
import native from "../native";
const resolveAssetSource = require('resolveAssetSource');

export default {

  /**
   * 弹出删除设备的对话框
   * @param {string} [title=null] - 自定义提示，不设置使用默认提示
   * @mark andr done
   */
  openDeleteDevice(title = null) {
    if (native.isAndroid) {
      native.MIOTHost.openDeleteDevice(title);
    } else {
      title ? native.MIOTHost.openDeleteDeviceWithCustomMessage(title) :
        native.MIOTHost.openDeleteDevice();
    }
  },

  /**
   * 打开分享设备的页面
   * @mark andr done
   */
  openShareDevicePage() {
    native.MIOTHost.openShareDevicePage();
  },

  /**
   * 打开房间设备管理的页面
   * @mark andr done
   */
  openRoomManagementPage() {
    native.MIOTHost.openRoomManagementPage();
  },

  /**
   * 打开语音设备管理的页面
   * @mark andr done
   */
  openVoiceCtrlDeviceAuthPage() {
    native.MIOTHost.openVoiceCtrlDeviceAuthPage();
  },

  /**
   * 打开添加智能的页面
   * @mark andr done
   */
  openIftttAutoPage() {
    native.MIOTHost.openIftttAutoPage();
  },

  /**
   * 打开反馈页
   * @mark andr done
   */
  openFeedbackInput() {
    native.MIOTHost.openFeedbackInput();
  },

  /**
   * 打开安全管理页
   */
  openSecuritySetting() {
    native.MIOTHost.openSecuritySetting();
  },

  /**
   * 打开常见问题页，别名「使用帮助」
   * @mark andr done
   */
  openHelpPage() {
    naticve.isIOS && native.MIOTHost.openFeedback();
    native.isAndroid && native.MIOTHost.openHelpPage();
  },

  /**
   * 打开分享列表页面
   * @param {string} title
   * @param {string} description
   * @param {string} imagePath
   * @param {string} url
   * @mark andr done
   */
  openShareListBar(title, description, imagePath, url) {
    native.MIOTHost.openShareListBar(title, description, imagePath, url);
  },

  /**
   * @callback getDevicesWithModelCallback
   * @param {boolean} success
   * @param {Object} devices
   */

  /**
   * 获取设备列表中指定model的设备信息
   * @param {string} model - 设备model
   * @param {getDevicesWithModelCallback} callback
   * @mark andr done
   *
   */
  getDevicesWithModel(model, callback) {
    native.MIOTHost.getDevicesWithModel(model, callback);
  },

  /**
   * 打开蓝牙网关页
   * @mark andr done
   */
  openBtGatewayPage() {
    native.MIOTHost.openBtGatewayPage();
  },

  /**
   * 查看软件政策和隐私协议
   * @param {string} licenseTitle
   * @param {string} licenseUrl
   * @param {string} policyTitle
   * @param {string} policyUrl
   * @mark andr done
   */
  privacyAndProtocolReview(licenseTitle, licenseUrl, policyTitle, policyUrl) {
    licenseUrl=resolveAssetSource(licenseUrl);
    policyUrl=resolveAssetSource(policyUrl);
    if (licenseUrl && (licenseUrl.uri || Array.isArray(licenseUrl))) {
      if (licenseUrl.uri) {
        licenseUrl = [{uri: licenseUrl.uri}];
      }
    }
    if (policyUrl && (policyUrl.uri || Array.isArray(policyUrl))) {
      if (policyUrl.uri) {
        policyUrl = [{uri: policyUrl.uri}];
      }
    }
    native.MIOTHost.privacyAndProtocolReview(licenseTitle, licenseUrl, policyTitle, policyUrl);
  },

  /**
   * @callback openPrivacyLicenseCallback
   * @param {string} result - 用户是否同意
   */

  /**
   * 软件政策和隐私协议授权
   * @param {string} licenseTitle
   * @param {string} licenseUrl - 可以是网络地址或者相对路径
   * @param {string} policyTitle
   * @param {string} policyUrl - 可以是网络地址或者相对路径
   * @param {openPrivacyLicenseCallback} callback
   * @mark andr done
   */
  openPrivacyLicense(licenseTitle, licenseUrl, policyTitle, policyUrl, callback) {
    licenseUrl=resolveAssetSource(licenseUrl);
    policyUrl=resolveAssetSource(policyUrl);
    if (licenseUrl && (licenseUrl.uri || Array.isArray(licenseUrl))) {
      if (licenseUrl.uri) {
        licenseUrl = [{uri: licenseUrl.uri}];
      }
    }
    if (policyUrl && (policyUrl.uri || Array.isArray(policyUrl))) {
      if (policyUrl.uri) {
        policyUrl = [{uri: policyUrl.uri}];
      }
    }
    native.MIOTHost.openPrivacyLicense(licenseTitle,licenseUrl, policyTitle, policyUrl, callback);
  },

  /**
   * 打开重命名对话框
   * @mark andr done
   */
  openChangeDeviceName() {
    native.MIOTHost.openChangeDeviceName();
  },

  /**
   * 添加桌面快捷方式
   * @mark andr done
   */
  openAddToDesktopPage() {
    native.MIOTHost.openAddToDesktopPage();
  },

  /**
   * 打开设备检查固件升级页
   * @mark andr done
   */
  openDeviceUpgradePage() {
    native.MIOTHost.openDeviceUpgradePage();
  },

  /**
   * 打开H5页面
   * @param {string} url - 链接地址
   * @mark andr done
   */
  openWebPage(url) {
    native.MIOTHost.openWebPage(url);
  },

  /**
   * 打开商城某商品详情页面
   * @param {string} gid - 商品ID
   * @mark andr done
   */
  openShopPage(gid) {
    openWebPage("https://home.mi.com/shop/detail?gid=" + gid);
  },

  /**
   * 打开创建设备组页
   * 只有特定设备支持创建设备组统一管理
   * @mark andr done
   */
  openAddDeviceGroupPage() {
    native.MIOTHost.openAddDeviceGroupPage();
  },

  /**
   * @param {Array} dids- 包含组设备did的数组
   * @mark andr done
   */
  openEditDeviceGroupPage(dids) {
    native.MIOTHost.openAddDeviceGroupPage();
  },

  /**
   * @param {string} onMethod  定时到时设备“开”执行的 RPC 指令命令字字符串
   * @param {string} onParam   定时到时设备“开”执行的 RPC 指令参数字符串（目前仅支持单参数）
   * @param {string} offMethod 定时到时设备“关”执行的 RPC 指令命令字字符串
   * @param {string} offParam  定时到时设备“关”执行的 RPC 指令参数字符串（目前仅支持单参数）
   * @mark andr done
   *
   * @description 这个api 应该可以废弃了
   */
  openTimerSettingPage(onMethod, onParam, offMethod, offParam) {
    native.MIOTHost.openTimerSettingPage(onMethod, onParam, offMethod, offParam);
  },

  /**
   * @param {string} onMethod  定时到时设备“开”执行的 RPC 指令命令字字符串
   * @param {Object} onParam   定时到时设备“开”执行的 RPC 指令参数，可以是字符串、数字、字典、数组
   * @param {string} offMethod 定时到时设备“关”执行的 RPC 指令命令字字符串
   * @param {Object} offParam  定时到时设备“关”执行的 RPC 指令参数，可以是字符串、数字、字典、数组
   * @mark andr done
   */
  openTimerSettingPageWithVariousTypeParams(onMethod, onParam, offMethod, offParam) {
    native.MIOTHost.openTimerSettingPageWithVariousTypeParams(onMethod, onParam, offMethod, offParam);
  },

  /**
   * 打开某设备列表中的某个设备
   * @param {string} did  设备的did
   * @param {Object} model  设备的model
   * @param {callback} callback callback(error, info) error表示错误信息，info表示被打开的设备信息
   * @mark andr done
   */
  openDevice(did, model,callback) {
    native.MIOTHost.openDevice(did, model,callback);
  },

  /**
   * 打开一个原生类 className ，界面类类名 注意 用此方法打开的vc初始化时不需要传参数，
   * 需要传参的viewController暂时还需要手动导出
   * @param {string} className 类的名字
   * @mark andr 暂不提供
   */
  openPageWithClassName(className) {
    native.MIOTHost.openPageWithClassName(className);
  },

  /**
   * 打开更多设置页面（通常包括安全设置，常见问题与用户反馈）
   * @mark andr done
   */
  openNewMorePage() {
    native.MIOTHost.openNewMorePage();
  },
};



