/**
 * @export public
 * @doc_name 页面导航模块
 * @doc_index 7
 * @doc_directory host
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
import { Device } from "../index";
import native from "../native";
import Service from "../Service";
const resolveAssetSource = require('resolveAssetSource');
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
   * 弹窗请求隐私政策和用户协议授权， 支持显示用户体验计划
   * @since 10023
   * @param {object} option 配置数据
   * @param {string} option.privacyURL 隐私协议本地资源
   * @param {string} [option.agreementURL] 用户协议本地资源，未设置时如果hideAgreement=false，显示为默认的用户协议
   * @param {string} [option.experiencePlanURL] 用户体验计划本地资源，为空时如果hideUserExperiencePlan=false，则显示米家默认用户体验计划
   * @param {boolean} [option.hideAgreement=false] 是否隐藏用户协议，默认显示用户协议
   * @param {boolean} [option.hideUserExperiencePlan=false] 是否隐藏用户体验计划，默认显示用户体验计划
   * @returns {Promise} 弹窗授权结果
   * @example
   *
   * //仅供参考
   * //可以参考project/com.xiaomi.demo/Main/Host/UI/privacy.js部分样例
   *
   * //batchGetDeviceDatas 设置的属性在设备删除以及设备取消授权之后会自动清空，因此只需要在请求授权检测时，检查下flag即可。撤销授权时可以不用手动清理flag
   * const agreementURL = require('xxxxx.html');
   * const privacyURL = require('xxxxx.html');
   * var options = {agreementURL, privacyURL};
   * //options.hideAgreement = this.state.hideAgreement;
   * Service.smarthome.batchGetDeviceDatas([{ did: Device.deviceID, props: ["prop.s_auth_config"] }]).then(res => {
   *  console.log('batchGetDeviceDatas ', res);
   *  let alreadyAuthed = false;
   *  let result = res[Device.deviceID];
   *  let config;
   *  if (result && result['prop.s_auth_config']) {
   *    config = result['prop.s_auth_config']
   *  }
   *  if (config) {
   *    try {
   *      let authJson = JSON.parse(config);
   *      console.log('auth config ', authJson)
   *      alreadyAuthed = authJson.privacyAuthed && true;
   *    } catch (err) {
   *      //json解析失败，不处理
   *    }
   *  }
   *  if (alreadyAuthed) {
   *    //已授权，不再弹窗显示
   *    alert("已经授权")
   *    return new Promise.resolve("已经授权")
   *  } else {
   *    return Host.ui.alertLegalInformationAuthorization(options).then(res => {
   *      console.log('授权结果', res)
   *      if (res) {
   *        return Service.smarthome.batchSetDeviceDatas([{ did: Device.deviceID, props: { "prop.s_auth_config": JSON.stringify({ 'privacyAuthed': 'true' }) } }])
   *      } else {
   *        return new Promise.reject("取消授权")
   *      }
   *    })
   *  }
   * }).catch(err => {
   *   //没能授权成功
   *  alert('授权错误'+err)
   *  Package.exit()
   * });
   *
   */
  alertLegalInformationAuthorization(option) {
    const optionCopy = Object.assign({}, option);
    if (!optionCopy.force && (Device.isShared || Device.isFamily)) {
      console.warn("分享设备不建议进行弹窗请求隐私授权。")
      return;
    }
    if (optionCopy.privacyURL) {
      optionCopy.privacyURL = resolveUrl(optionCopy.privacyURL);
    }
    if (optionCopy.agreementURL) {
      optionCopy.agreementURL = resolveUrl(optionCopy.agreementURL);
    }
    if (optionCopy.hideAgreement) {
      delete optionCopy['agreementURL']//iOS下设置为“”则隐藏该项目
    }
    if (optionCopy.experiencePlanURL) {
      optionCopy.experiencePlanURL = resolveUrl(optionCopy.experiencePlanURL);
    }
    if (optionCopy.hideUserExperiencePlan) {
      delete optionCopy['experiencePlanURL']
    }
    // 内部事件，不需要提供给外部, 如果显示了隐私政策弹窗，需要通知关闭掉固件升级弹窗
    DeviceEventEmitter.emit('MH_Event_ShowPrivacyLicenseDialog', { isShowingPrivacyLicenseDialog: true });
    return new Promise((resolve, reject) => {
      native.MIOTHost.showDeclarationWithConfig(optionCopy, (ret, res) => {
        if (ret === 'ok' || ret === true || ret === 'true') {
          resolve(true);
        } else {
          reject(false);
        }
      });
    })
  },
  /**
   * 查看隐私政策和用户协议信息， 支持显示用户体验计划
   * @since 10023
   * @param {object} option 配置数据
   * @param {string} option.privacyURL 隐私协议本地资源
   * @param {string} [option.agreementURL] 用户协议本地资源，未设置时如果hideAgreement=false，显示为默认的用户协议
   * @param {string} [option.experiencePlanURL] 用户体验计划本地资源，为空时如果hideUserExperiencePlan=false，则显示米家默认用户体验计划
   * @param {boolean} [option.hideAgreement=false] 是否隐藏用户协议，默认显示用户协议
   * @param {boolean} [option.hideUserExperiencePlan=false] 是否隐藏用户体验计划，默认显示用户体验计划
   * @returns {Promise} 授权结果
   *
   */
  previewLegalInformationAuthorization(option) {
    const optionCopy = Object.assign({}, option);
    if (!optionCopy.force && (Device.isShared || Device.isFamily)) {
      console.warn("分享设备不建议进行弹窗请求隐私授权。")
      return;
    }
    if (optionCopy.privacyURL) {
      optionCopy.privacyURL = resolveUrl(optionCopy.privacyURL);
    }
    if (optionCopy.agreementURL) {
      optionCopy.agreementURL = resolveUrl(optionCopy.agreementURL);
    }
    if (optionCopy.hideAgreement) {
      delete optionCopy['agreementURL']
    }
    if (optionCopy.experiencePlanURL) {
      optionCopy.experiencePlanURL = resolveUrl(optionCopy.experiencePlanURL);
    }
    if (optionCopy.hideUserExperiencePlan) {
      delete optionCopy['experiencePlanURL']
    }
    return new Promise((resolve, reject) => {
      native.MIOTHost.openDeclarationWithConfig(optionCopy, (ok, res) => {
        if (ok) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    })
  },
  /**
   * 查看软件政策和隐私协议
   * @deprecated 10023废弃， 请使用 previewLegalInformationAuthorization
   * @param {string} licenseTitle optional 可以为空
   * @param {string} licenseUrl optional require('资源的相对路径')
   * @param {string} policyTitle 不可以为空
   * @param {string} policyUrl 不可以为空 require('资源的相对路径')
   */
  privacyAndProtocolReview(licenseTitle, licenseUrl, policyTitle, policyUrl) {
  },
  /**
   * 软件政策和隐私协议授权
   * 隐私协议弹框需求：
   * a. 所有接入米家的设备，绑定成功后第一次进插件，都需要隐私弹框，后续再进不需弹框
   * b. 取消隐私授权/解绑设备后，重新绑定设备，仍需遵循规则a
   * 插件端可按如下方案实现：
   * 1. 使用batchSetDeviceDatas存储一个标志位，用来记录是否“隐私弹框”过
   * 2. 进入插件时batchGetDeviceDatas获取此标志位，若为NO，弹框，同时设置标志位为YES；若为YES，不弹框
   * 3. 设备取消授权或解绑设备时，此标志位米家后台会自动清除，故遵循了上述需求b
   * 4. 异常处理：进插件时，如果网络异常等原因导致batchGetDeviceDatas失败，就不弹框（此时99%情况是第2+次进插件）
   *
   * @deprecated   10023废弃， 请使用 alertLegalInformationAuthorization 替换
   * @param {string} licenseTitle optional 可以为空
   * @param {string} licenseUrl optional require('资源的相对路径')
   * @param {string} policyTitle 不可以为空
   * @param {string} policyUrl 不可以为空 require('资源的相对路径')
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
   * 打开Mesh设备固件升级页。分享的设备点击此接口无反应（理论上分享的设备不应该出现调用此接口的菜单）
   * @since 10025
   */
  openBleMeshDeviceUpgradePage() {
  },
  /**
   * 打开设备时区设置页
   * apiLevel在10025，增加参数的支持，APP修改时区是否需要同步到设备端，前提是设备需要支持miIO.set_timezone 方法
   * 如果sync_device为true，服务端会给设备发送rpc,例如： {'method':'miIO.set_timezone','params':["Asia/Chongqing"]}
   * @param {Object} {"sync_device": false}  true-需要同步给设备 false-不需要同步给设备（默认）
   * @since 10025
   */
  openDeviceTimeZoneSettingPage(params = null) {
    if (!params) {
      params = { "sync_device": false }
    }
    native.MIOTHost.openDeviceTimeZoneSettingPage(params);
  },
  /**
   * 打开商城某商品详情页面
   * @param {string} gid - 商品ID
   */
  openShopPage(gid) {
  },
  /**
   * 打开商城搜索结果页面
   * @param {string} keyword - 搜索关键字
   * @since 10024
   */
  openShopSearchPage(keyword) {
  },
  /**
   * 打开Mesh灯组 添加/编辑 页,Device.pid为17，则为Mesh设备组
   * @since 10021
   * @param {String} type - 需要打开创建设备组页面时，type=add，需要打开编辑设备组页面时，type=edit
   * @param {String} did - 设备did。如果是创建，则是以当前实际设备的did为基础，进入创建灯组页面。如果是编辑，则是灯组的虚拟设备did。
   */
  openMeshDeviceGroupPage(type, did) {
  },
  /**
   * 打开创建设备组页，如果是支持Mesh的设备，请使用上面的openMeshDeviceGroupPage
   * @param {String} groupModel - 设备组model
   * 打开创建设备组页，只有在设备页内，需要创建设备组时，才能调用此方法。如果是设备组页面内，请使用下面的openEditDeviceGroupPage方法
   * 只有特定设备支持创建设备组统一管理
   */
  openAddDeviceGroupPage(groupModel = "") {
  },
  /**
   * 打开编辑设备组页，只有在设备组页内，需要修改设备组时，才能调用此方法。如果是设备页面内，请使用上面的openAddDeviceGroupPage方法
   * @param {Array} dids - 包含组设备did的数组
   */
  openEditDeviceGroupPage(dids) {
  },
  /**
   * 开启倒计时界面
   * @param {Boolean} isCountDownOn 设备的当前状态:YES 为开启，所以我们启动关闭倒计时; NO  为关闭，所以我们启动开启倒计时
   * @param {object} setting 设置倒计时页面的属性
   * @param {string} setting.onMethod 指硬件端，打开 倒计时应该 执行的方法，请咨询硬件工程师
   * @param {string} setting.onParam 指硬件端，打开 倒计时应该 传入的参数，请咨询硬件工程师
   * @param {string} setting.offMethod 指硬件端，关闭 倒计时应该 执行的方法，请咨询硬件工程师
   * @param {string} setting.offParam 指硬件端，关闭 倒计时应该 传入的参数，请咨询硬件工程师
   * @param {string} setting.identify since 10021, 用于设置倒计时的identify
   * @example
   *
   * Host.ui.openCountDownPage(true, {onMethod:"power_on", offMethod:'power_off', onParam:'on', offParam:'off'})
   *
   */
  openCountDownPage(isCountDownOn, setting) {
  },
  /**
   * 打开一次性密码设置页
   * @param {*} did   设备did
   * @param {*} interval  时间间隔，即密码组的刷新时间间隔，单位为分钟，类型为 number，传入 10 到 60 的整数
   * @param {*} digits 密码位数，类型为 number，传入 6 到 8 的整数
   */
  openOneTimePassword(did, interval, digits) {
  },
  /**
   * @deprecated 10004 开始废弃， 后续版本会移除该方法。
   * @param {string} onMethod  定时到时设备“开”执行的 RPC 指令命令字字符串
   * @param {string} onParam   定时到时设备“开”执行的 RPC 指令参数字符串（目前仅支持单参数）
   * @param {string} offMethod 定时到时设备“关”执行的 RPC 指令命令字字符串
   * @param {string} offParam  定时到时设备“关”执行的 RPC 指令参数字符串（目前仅支持单参数）
   *
   * @description 这个api 应该可以废弃了，使用下面的openTimerSettingPageWithOptions
   */
  openTimerSettingPage(onMethod, onParam, offMethod, offParam) {
  },
  /**
   * @deprecated 10004 开始废弃， 后续版本会移除该方法。
   * @param {string} customTimerIdentifier 自定义定时Identifier
   * @param {string} onMethod  定时到时设备“开”执行的 RPC 指令命令字字符串
   * @param {string} onParam   定时到时设备“开”执行的 RPC 指令参数字符串（目前仅支持单参数）
   * @param {string} offMethod 定时到时设备“关”执行的 RPC 指令命令字字符串
   * @param {string} offParam  定时到时设备“关”执行的 RPC 指令参数字符串（目前仅支持单参数）
   *
   * @description 这个api 应该可以废弃了，使用下面的openTimerSettingPageWithOptions
   */
  openTimerSettingPageWithCustomIdentifier(customTimerIdentifier, onMethod, onParam, offMethod, offParam) {
  },
  /**
   * @param {string} onMethod  定时到时设备“开”执行的 RPC 指令命令字字符串，指硬件端，打开定时应该执行的方法，请咨询硬件工程师,miot-spec下，一般为：set_properties
   * @param {json} onParam   定时到时设备“开”执行的 RPC 指令参数，可以是字符串、数字、字典、数组，指硬件端，打开定时应该传入的参数，请咨询硬件工程师，iot-spec下，一般为：[{did,siid,piid,value}]
   * @param {string} offMethod 定时到时设备“关”执行的 RPC 指令命令字字符串,,参数请与嵌入式的同学沟通，指硬件端，关闭定时应该执行的方法，请咨询硬件工程师，miot-spec下，一般为：set_properties
   * @param {json} offParam  定时到时设备“关”执行的 RPC 指令参数，可以是字符串、数字、字典、数组，指硬件端，关闭定时应该传入的参数，请咨询硬件工程师，miot-spec下，一般为：[{did,siid,piid,value}]
   * @example
   *
   * Host.ui.openTimerSettingPageWithVariousTypeParams("power_on", ["on", "title"], 'off',"title"}),
   */
  openTimerSettingPageWithVariousTypeParams(onMethod, onParam, offMethod, offParam) {
  },
  /**
   * 扩展自 openTimerSettingPageWithVariousTypeParams , 新增支持自定义name使用
   * @since 10010 ,SDKLevel 10010 开始提供使用
   * @param {object} options 配置信息
   * @param {string} options.onMethod 配置定时开启的 method 名，同上面openTimerSettingPageWithVariousTypeParams的参数onMethod
   * @param {string} options.onParam 配置定时开启的 参数，同上面openTimerSettingPageWithVariousTypeParams的参数onParam
   * @param {string} options.offMethod 配置定时关闭的 method 名，同上面openTimerSettingPageWithVariousTypeParams的参数offMethod
   * @param {string} options.offParam 配置定时关闭的 参数，同上面openTimerSettingPageWithVariousTypeParams的参数offParam
   * @param {string} options.displayName 配置场景日志显示的名称
   * @param {string} options.identify 自定义定时Identifier
   * @param {string} options.onTimerTips 定时列表页面、设置时间页面 打开副标题（默认：开启时间）
   * @param {string} options.offTimerTips 定时列表页面、设置时间页面 关闭时间副标题（默认：关闭时间）
   * @param {string} options.listTimerTips 定时列表页面 定时时间段副标题（默认：开启时段）
   * @param {boolean} options.bothTimerMustBeSet 是否强制要求设置时间段？ true: 强制设置时间段(默认：false)如果设置true,忽略下面三个参数
   * @param {boolean} options.showOnTimerType 是否可以创建：定时开启？ true: 可以，false:不可以(默认：true)
   * @param {boolean} options.showOffTimerType 是否可以创建：定时关闭？ true: 可以，false:不可以(默认：true)
   * @param {boolean} options.showPeriodTimerType 是否可以创建：时间段定时？ true: 可以，false:不可以(默认：true)
   * 注意：showOnTimerType、showOffTimerType、showPeriodTimerType三个参数至少有一个为true，才有效，否则三个中任意都会被忽略掉
   * @example
   * Host.ui.openTimerSettingPageWithOptions({onMethod:"power_on", onParam: "on", offMethod: "power_off", offParam: "off", displayName:"设置xxx定时"，identify:"plug_usb_countdowm"})
   */
  openTimerSettingPageWithOptions(options) {
  },
  /**
   * 更多设置-多键开关设置页面
   * @since 10010 ,SDKLevel 10010 开始提供使用
   * @param {string} did  设备did 指定设备ID
   * @param {string} mac  设备mac option, 在不传递时。默认使用当前设备
   * @example
   * Host.ui.openPowerMultikeyPage(did, mac);
  */
  openPowerMultikeyPage(did, mac = null) {
  },
  /**
 * 添加或者复制一个红外遥控器
 * @since 10003
 * @param {string} did 设备did
 * @param {number} type 0：添加遥控器；1：复制遥控器。默认0
 * @param {array} models 一组红外遥控器model，只传入一个model将直接跳转到相应的品牌列表或者机顶盒列表，支持的models见文档。默认空数组[]
 * @param {object} extra 额外配置，会传入打开的插件页，也有部分特殊功能定义字段如下：
 * @param {boolean} [extra.create_device = true] 米家首页列表是否展示虚拟遥控器设备。默认true。暂时只有android支持
 * @param {boolean} [extra.dismiss_current_plug = true] since 10020 。在推出新的插件页面时，关掉当前页面，返回app首页。iOS Only
 */
  addOrCopyIR(did, type = 0, models = [], extra = { create_device: true }) {
  },
  /**
   * 打开用户账号下某一设备的插件
   * @param {string} did  设备的did
   * @param {string} model  设备的model
   * @param {object} params  额外参数，打开插件时传入，也有部分特殊功能定义字段如下：
   * @param {boolean} [params.dismiss_current_plug = true] since 10020 。是否在推出新的插件页面时，关掉当前页面，返回app首页。iOS Only
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
   * @deprecated 10010 开始废弃， 后续版本会移除该方法。推荐使用 `miot/ui/CommonSetting`
   * ios特有页面，android 不能使用
   * 打开更多设置页面（通常包括安全设置，常见问题与用户反馈）
   */
  openNewMorePage() {
  },
  /**
   * @since 10002
   * android特有页面，ios 不能使用
   * 打开手机蓝牙设置页面
  */
  openPhoneBluSettingPage() {
  },
  /**
   * 打开小爱训练计划
   * @param {string} clientId
   * @param {string} did 设备 ID
   * @param {string} aiMiotClientId 米家的客户端 ID
   * @param {string} aiClientId 水滴平台的客户端
   * @param {string} aiVersion "" 不隐藏 "thirdpart" 隐藏 “一段录音” “设备控制” 按钮 "audio" 隐藏 “一段录音” 按钮 "device" 隐藏 “设备控制” 按钮
 */
  openXiaoAiLearnPage(clientId, did, aiMiotClientId, aiClientId, aiVersion) {
  },
  /**
   * 显示提示用户打开蓝牙的动画示意图, 仅在iOS下有效，Android下无反应
   * @since 10004
   */
  showBLESwitchGuide() {
  },
  /**
   * 隐藏提示用户打开蓝牙的动画示意图, 仅在iOS下有效，Android下无反应
   * @since 10004
   */
  dismissBLESwitchGuide() {
  },
  /**
   * 打开设备快连成功页面
   * @since 10004
   * @param {string} model 设备model
   * @param {string} did 设备did
   */
  openConnectSucceedPage(model, did) {
  },
  /**
   * 打开Zigbee 网关插件开启子设备快连
   * @since 10020
   * @param {string} did 网关设备did
   */
  openZigbeeConnectDeviceList(did) {
  },
  /**
   * android 特有， 跳转到小米钱包
   * @param params
   * @return {Promise}
   * @example
   * let params = {action:'issue_mifare',type:'1',product_id:'66666-00211',source_channel:'mijia'};
   * Host.ui.openMiPayPageForAndroid(params).then((res)=>{console.log(res)}).catch((error)=>{ console.log(error)});
   */
  openMiPayPageForAndroid(params) {
     return Promise.resolve(null);
  },
  /**
   * 跳转到设备定向推荐界面,注意：SDK_10024及其之后才可使用
   * @since 10024
   * @param {String} did
   * @param {number} recommendId
   * @return {Promise}
   */
  openPluginRecommendScene(did, recommendId) {
  },
  /**
   * 刷新设备列表，同时刷新设备列表页UI
   * @since 10025
   * @return {Promise}
   */
  refreshDeviceList() {
     return Promise.resolve(null);
  }
};