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
import native, { isAndroid, isIOS } from "../native";
import AutoOTAABTestHelper from 'miot/utils/autoota_abtest_helper';
import ProtocolManager from '../utils/protocol-helper';
import { report } from "../decorator/ReportDecorator";
import Device from '../device/BasicDevice';
import Service from '../Service';
import PrivacyUploadFdsHelper from '../utils/privacy_uploadfds_helper';
/**
 * 原生UI管理
 * @interface
 *
 */
class IUi {
  /**
   * 是否支持商城
   * @return {Promise<Boolean>}
   * @example
   * Host.ui.canOpenStorePage().then(res => console("can open store = ", res))
   */
  @report
  canOpenStorePage() {
  }
  /**
   * 弹出删除设备的对话框
   * @param {string} [title=null] - 自定义提示，不设置使用默认提示
   */
  @report
  openDeleteDevice(title = null) {
  }
  /**
   * 打开分享设备的页面
   */
  @report
  openShareDevicePage() {
  }
  /**
   * 是否保持屏幕常亮
   * @param {Boolean} flag 默认false
   */
  @report
  keepScreenNotLock(flag = false) {
  }
  /**
   * 打开房间设备管理的页面
   */
  @report
  openRoomManagementPage() {
  }
  @report
  openRoomManagementPageByDid(did) {
  }
  /**
   * 打开语音设备管理的页面
   */
  @report
  openVoiceCtrlDeviceAuthPage() {
  }
  /**
   * 打开添加智能的页面,注意分享的用户无法打开
   * @deprecated  sdk 10032版本开始废弃，请使用 Service.scene.openIftttAutoPage()
   */
  @report
  openIftttAutoPage() {
  }
  /**
   * 打开反馈页
   */
  @report
  openFeedbackInput() {
  }
  /**
   * 打开安全管理页
   */
  @report
  openSecuritySetting() {
  }
  /**
   * 打开常见问题页，别名「使用帮助」
   */
  @report
  openHelpPage() {
  }
  /**
   * 打开分享列表页面
   * @param {string} title 标题
   * @param {string} description 描述
   * @param {string} imagePath 和Image source 一样的格式
   * @param {string} url 分享链接
   */
  @report
  openShareListBar(title, description, imagePath, url) {
  }
  /**
   * 打开系统分享文件页面
   * @param {string} pathOrUrl 分享文件的全路径或者链接url。
   */
  @report
  openSystemShareWindow(pathOrUrl) {
  }
  /**
  * 打开系统文件打开页面 since 10050
  * @param {string} pathOrUrl 文件的全路径或者链接url。
  */
  @report
  openSystemFileWindow(pathOrUrl) {
  }
  /**
   * @since 10078
   * 打开耗材详情页面(自研插件)
   * @param {object} params 耗材传递的参数
   *   params
   *   android平台 对应的 getConsumableDetails 接口数据的details数组的元素
   *   iOS平台  接口数据的details数组的元素 + details数据上层consumesData数据
   *   具体用法可参考xiaomi.demo
   */
   @report
  openConsumesDetailPage(params) {
  }
  /**
   * 获取设备列表中指定model的设备信息(仅白名单设备才允许调用此方法，如需使用，请联系插件框架)
   * @param model 指定的model
   * @param {boolean} includeGroupedDevice - since 10046 是否包含被组成了一个组的设备（目前仅窗帘设备可用，灯设备不可用），默认不包含
   * @returns {Promise<devices[]>} 对象中有字段 isGrouped 表示是被分组的设备，includeGroupedDevice = true时才有效
   */
  @report
   getDevicesWithModel(model, includeGroupedDevice = false) {
      return Promise.resolve([]);
   }
  /**
   * 打开蓝牙网关页
   */
  @report
  openBtGatewayPage() {
  }
  /**
   * 使用参数 params 打开蓝牙网关页
   * 会和当前model的企业组进行匹配，只能打开同一企业组下的蓝牙网关页面
   * 标准插件例外，标准插件可以打开任意企业组的蓝牙网关页面
   *
   * @returns {Promise}
   * eg:
   * Host.ui.openBtGatewayPageWithParams({did:xxxx}).then(()=>{}).catch((err)=>{console.log(err)});
   * 可能的返回的信息
   *  {"code":0, "message": "success"}}
   *  {"code":-101, "message": "method unallowed on shared device"}}
   *  {"code":-102, "message": "error input params: check did"}}
   *  {"code":-201, "message": "account find no specific device with input parmas did"}}
   *  {"code":-204, "message": "could only open ble gateway page belongs same company, compared with opened plugin model"}}
   *  {"code":-301, "message": "account find no specific ble gateway device data with input params did"}}
   */
  @report
  openBtGatewayPageWithParams(params) {
  }
  /**
   * 弹窗请求隐私政策和用户协议授权， 支持显示用户体验计划
   * @since 10023
   * @param {object} option 配置数据
   * @param {string} option.privacyURL 隐私协议本地资源
   * @param {string} [option.agreementURL] 用户协议本地资源，未设置时如果hideAgreement=false，显示为默认的用户协议
   * @param {string} [option.experiencePlanURL] 用户体验计划本地资源，为空时如果hideUserExperiencePlan=false，则显示米家默认用户体验计划
   * @param {boolean} [option.hideAgreement=false] 是否隐藏用户协议，默认显示用户协议
   * @param {boolean} [option.hideUserExperiencePlan=false] 是否隐藏用户体验计划，默认显示用户体验计划
   * @param {string} [option.privacyURLForChildren] since 10060 用于展示儿童信息保护规则
   * @param {string} [option.privacyURLForWatch] since 10060 用于展示手表隐私政策
   * @param {string} [option.privacyChanges] since 10060 当隐私有变更时将变更的内容传入以便告知用户
   * @returns {Promise<Boolean>} 弹窗授权结果
   * @example
   * 可以参考iot文档 或 project/com.xiaomi.demo/MainPage.js部分样例
   */
  @report
  alertLegalInformationAuthorization(option) {
    ProtocolManager.protocolMangerReportLog('[Privacy Debug] Host.ui.alertLegalInfo.. enter, local privacy option : ', option);
     return Promise.resolve(null);
  }
  /**
   * 查看隐私政策和用户协议信息， 支持显示用户体验计划
   * @since 10023
   * @param {object} option 配置数据
   * @param {string} option.privacyURL 隐私协议本地资源
   * @param {string} [option.agreementURL] 用户协议本地资源，未设置时如果hideAgreement=false，显示为默认的用户协议
   * @param {string} [option.experiencePlanURL] 用户体验计划本地资源，为空时如果hideUserExperiencePlan=false，则显示米家默认用户体验计划
   * @param {string} [option.privacyURLForChildren] since 10060儿童信息保护规则本地资源
   * @param {string} [option.privacyURLForWatch] since 10060手表隐私政策本地资源
   * @param {boolean} [option.hideAgreement=false] 是否隐藏用户协议，默认显示用户协议
   * @param {boolean} [option.hideUserExperiencePlan=false] 是否隐藏用户体验计划，默认显示用户体验计划
   * @returns {Promise<Boolean>} 授权结果
   *
   */
  @report
  previewLegalInformationAuthorization(option) {
     return Promise.resolve(null);
  }
  // 10098开始判断是否检查隐私
  previewLegalInformationAuthorizationV2(option) {
     return Promise.resolve(null);
  }
  /**
   * 查看软件政策和隐私协议
   * @deprecated 10023废弃， 请使用 previewLegalInformationAuthorization
   * @param {string} licenseTitle optional 可以为空
   * @param {string} licenseUrl optional require('资源的相对路径')
   * @param {string} policyTitle 不可以为空
   * @param {string} policyUrl 不可以为空 require('资源的相对路径')
   */
  @report
  privacyAndProtocolReview(licenseTitle, licenseUrl, policyTitle, policyUrl) {
  }
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
   * @returns {Promise<Boolean>}
   */
  @report
  openPrivacyLicense(licenseTitle, licenseUrl, policyTitle, policyUrl) {
     return Promise.resolve({});
  }
  /**
   * 打开重命名对话框
   */
  @report
  openChangeDeviceName() {
  }
  /**
   * 添加桌面快捷方式
   */
  @report
  openAddToDesktopPage() {
  }
  /**
   * 打开设备检查固件升级页（先检查，后可升级）
   * 针对wifi、AP、第三方云等可以联网的设备的统一OTA方案
   * @param type 默认 0 ，进入最新固件升级页面          type字段 自10049支持
   *              1， 进入旧版（native）固件升级页面    type字段 自10049支持
   */
  @report
  openDeviceUpgradePage(type = 0) {
  }
  /**
   *
   */
  @report
  openDeviceInfoPage(params) {
    this.packageNavigate('MiotDeviceInfoPage', params);
  }
  /**
   * since 10091
   * 多键设备，控制设备入口
   * @param {object} params 参数
   * @param {object} params.params 参数
   *
   * @param {bool} params.supportAiCtrl 转无线模式下是否支持小爱语控设置
   *
   * @param {array} params.switchSpecs 按键specs
   * @param {number} switchSpec.siid 按键的siid
   * @param {number} switchSpec.piid 按键的piid
   * @param {string} switchSpec.description 按键的spec描述
   * @param {string} switchSpec.i18n 按键的默认名称
   *
   * @param {array} params.switchClickSpecs 按键单击specs
   * @param {number} switchClickSpec.siid 按键的siid
   * @param {number} switchClickSpec.eiid 按键的eiid
   * @param {string} switchClickSpec.description 按键单击的spec描述
   * @param {string} switchClickSpec.i18n 按键单击的默认名称
   *
   * @param {array} params.switchDoubleClickSpecs 按键双击specs，没有传[]
   * @param {number} switchDoubleClickSpec.siid 按键的siid
   * @param {number} switchDoubleClickSpec.eiid 按键的eiid
   * @param {string} switchDoubleClickSpec.description 按键双击的spec描述
   * @param {string} switchDoubleClickSpec.i18n 按键双击的默认名称
   *
   * @param {array} params.switchLongPressesSpecs 按键长按specs，没有传[]
   * @param {number} switchLongPressesSpec.siid 按键的siid
   * @param {number} switchLongPressesSpec.eiid 按键的eiid
   * @param {string} switchLongPressesSpec.description 按键长按的spec描述
   * @param {string} switchLongPressesSpec.i18n 按键长按的默认名称
   *
   * @param {array} params.switchModeSpecs 按键转无线模式specs
   * @param {number} switchModeSpec.siid 按键的siid
   * @param {number} switchModeSpec.piid 按键的piid
   * @param {string} switchModeSpec.description 按键转无线模式的spec描述
   * @param {object} switchModeSpec.prop 按键转无线模式的value值
   * @param {number} prop.Wireless 按键转无线模式的value值
   * @param {number} prop.Wired And Wireless 按键正常模式的value值
   *
   * @param {array} params.switchSensorModeSpecs 按键模式specs，没有传[]
   * @param {number} switchSensorModeSpec.siid 按键的siid
   * @param {number} switchSensorModeSpec.piid 按键的piid
   * @param {string} switchSensorModeSpec.speedModeSelectMsg 选择疾速模式时的智能提示文案
   * @param {string} switchSensorModeSpec.multipleClickSubtitle 标准模式的卡片副标题
   * @param {object} switchSensorModeSpec.prop 按键转无线模式的value值
   * @param {number} prop.Quick Single Click 按键疾速模式的value值
   * @param {number} prop.Multiple Click 按键标准模式的value值
   *
   * @param {object} params.specButtonType 按键类型，没有传空
   * @param {number} specButtonType.siid 按键类型的siid
   * @param {number} specButtonType.piid 按键类型的piid
   * @param {string} specButtonType.description 按键类型的spec描述
   * @param {array<object>} switchSensorModeSpec.valueList[value] 按键转无线模式的value值
   * @param {number} value.value 按键类型的value值
   * @param {string} value.description 按键类型的value值的spec描述
   * @param {object} specButtonType.prop 按键转无线模式的value值
   * @param {number} prop.description key为 value的description，value 为 value的 value
   * @example {json} params
   * { "params": {
		"switchClickSpecs": [{
			"siid": 5,
			"eiid": 1,
			"description": "Left Switch Sensor",
			"i18n": "单击左键"
		}, {
			"siid": 6,
			"eiid": 1,
			"description": "Middle Switch Sensor",
			"i18n": "单击中键"
		}, {
			"siid": 7,
			"eiid": 1,
			"description": "Right Switch Sensor",
			"i18n": "单击右键"
		}],
		"switchDoubleClickSpecs": [{
			"siid": 5,
			"eiid": 2,
			"description": "Left Switch Sensor",
			"i18n": "双击左键"
		}, {
			"siid": 6,
			"eiid": 2,
			"description": "Middle Switch Sensor",
			"i18n": "双击中键"
		}, {
			"siid": 7,
			"eiid": 2,
			"description": "Right Switch Sensor",
			"i18n": "双击右键"
		}],
		"switchLongPressesSpecs": [{
			"siid": 5,
			"eiid": 3,
			"description": "Left Switch Sensor",
			"i18n": "长按左键"
		}, {
			"siid": 6,
			"eiid": 3,
			"description": "Middle Switch Sensor",
			"i18n": "长按中键"
		}, {
			"siid": 7,
			"eiid": 3,
			"description": "Right Switch Sensor",
			"i18n": "长按右键"
		}],
		"specButtonType": null,
		"switchSpecs": [{
			"siid": 2,
			"piid": 1,
			"description": "Left Switch Service",
			"i18n": "左键"
		}, {
			"siid": 3,
			"piid": 1,
			"description": "Middle Switch Service",
			"i18n": "中键"
		}, {
			"siid": 4,
			"piid": 1,
			"description": "Right Switch Service",
			"i18n": "右键"
		}],
		"switchModeSpecs": [{
			"siid": 2,
			"piid": 2,
			"description": "Left Switch Service",
			"prop": {
				"Wireless": 1,
				"Wired And Wireless": 0
			}
		}, {
			"siid": 3,
			"piid": 2,
			"description": "Middle Switch Service",
			"prop": {
				"Wireless": 1,
				"Wired And Wireless": 0
			}
		}, {
			"siid": 4,
			"piid": 2,
			"description": "Right Switch Service",
			"prop": {
				"Wireless": 1,
				"Wired And Wireless": 0
			}
		}],
		"supportAiCtrl": true,
		"switchSensorModeSpecs": [{
			"siid": 5,
			"piid": 1,
			"description": "Left Switch Sensor",
			"prop": {
				"Quick Single Click": 0,
				"Multiple Click": 1
			},
			"speedModeSelectMsg": "当前设备设置了「双击」或「长按」的自动化。疾速模式下，相关自动化将无法响应",
			"multipleClickSubtitle": "若该设备需要设置「双击」或「长按」的自动化，请选择此项"
		}, {
			"siid": 6,
			"piid": 1,
			"description": "Middle Switch Sensor",
			"prop": {
				"Quick Single Click": 0,
				"Multiple Click": 1
			},
			"speedModeSelectMsg": "当前设备设置了「双击」或「长按」的自动化。疾速模式下，相关自动化将无法响应",
			"multipleClickSubtitle": "若该设备需要设置「双击」或「长按」的自动化，请选择此项"
		}, {
			"siid": 7,
			"piid": 1,
			"description": "Right Switch Sensor",
			"prop": {
				"Quick Single Click": 0,
				"Multiple Click": 1
			},
			"speedModeSelectMsg": "当前设备设置了「双击」或「长按」的自动化。疾速模式下，相关自动化将无法响应",
			"multipleClickSubtitle": "若该设备需要设置「双击」或「长按」的自动化，请选择此项"
		}]
	}
}
   */
  @report
  openSwitchButtonSelectPage(params) {
  }
  /**
   * since 10091
   * 单键设备、从智能日志打开指定按键的控制设备入口
   * @param {object} params 参数
   * @param {object} params.params 参数
   *
   * @param {bool} params.supportAiCtrl 转无线模式下是否支持小爱语控设置
   * @param {number} params.memberId switchSpecs对应的按键index，从0开始
   * @param {bool} params.fromSceneLog 是否通过智能日志进入
   *
   * @param {array} params.switchSpecs 按键specs
   * @param {number} switchSpec.siid 按键的siid
   * @param {number} switchSpec.piid 按键的piid
   * @param {string} switchSpec.description 按键的spec描述
   * @param {string} switchSpec.i18n 按键的默认名称
   *
   * @param {object} params.switchClickSpec 按键单击specs
   * @param {number} switchClickSpec.siid 按键的siid
   * @param {number} switchClickSpec.eiid 按键的eiid
   * @param {string} switchClickSpec.description 按键单击的spec描述
   * @param {string} switchClickSpec.i18n 按键单击的默认名称
   *
   * @param {object} params.switchDoubleClickSpec 按键双击spec，没有传[]
   * @param {number} switchDoubleClickSpec.siid 按键的siid
   * @param {number} switchDoubleClickSpec.eiid 按键的eiid
   * @param {string} switchDoubleClickSpec.description 按键双击的spec描述
   * @param {string} switchDoubleClickSpec.i18n 按键双击的默认名称
   *
   * @param {object} params.switchLongPressesSpec 按键长按spec，没有传[]
   * @param {number} switchLongPressesSpec.siid 按键的siid
   * @param {number} switchLongPressesSpec.eiid 按键的eiid
   * @param {string} switchLongPressesSpec.description 按键长按的spec描述
   * @param {string} switchLongPressesSpec.i18n 按键长按的默认名称
   *
   * @param {object} params.switchModeSpec 按键转无线模式spec
   * @param {number} switchModeSpec.siid 按键的siid
   * @param {number} switchModeSpec.piid 按键的piid
   * @param {string} switchModeSpec.description 按键转无线模式的spec描述
   * @param {object} switchModeSpec.prop 按键转无线模式的value值
   * @param {number} prop.Wireless 按键转无线模式的value值
   * @param {number} prop.Wired And Wireless 按键正常模式的value值
   *
   * @param {object} params.switchSensorModeSpec 按键模式spec，没有传[]
   * @param {number} switchSensorModeSpec.siid 按键的siid
   * @param {number} switchSensorModeSpec.piid 按键的piid
   * @param {string} switchSensorModeSpec.speedModeSelectMsg 选择疾速模式时的智能提示文案
   * @param {string} switchSensorModeSpec.multipleClickSubtitle 标准模式的卡片副标题
   * @param {object} switchSensorModeSpec.prop 按键转无线模式的value值
   * @param {number} prop.Quick Single Click 按键疾速模式的value值
   * @param {number} prop.Multiple Click 按键标准模式的value值
   *
   * @param {object} params.specButtonType 按键类型，没有传空
   * @param {number} specButtonType.siid 按键类型的siid
   * @param {number} specButtonType.piid 按键类型的piid
   * @param {string} specButtonType.description 按键类型的spec描述
   * @param {array<object>} switchSensorModeSpec.valueList[value] 按键转无线模式的value值
   * @param {number} value.value 按键类型的value值
   * @param {string} value.description 按键类型的value值的spec描述
   * @param {object} specButtonType.prop 按键转无线模式的value值
   * @param {number} prop.description key为 value的description，value 为 value的 value
   * @example {json} params
  {
	"params": {
		"switchSpecs": [{
			"siid": 2,
			"piid": 1,
			"description": "Switch",
			"i18n": "按键"
		}],
		"switchSpec": {
			"siid": 2,
			"piid": 1,
			"description": "Switch",
			"i18n": "按键"
		},
		"switchModeSpec": {
			"siid": 2,
			"piid": 2,
			"description": "Switch",
			"prop": {
				"Wireless": 1,
				"Wired And Wireless": 0
			}
		},
		"switchSensorModeSpec": {
			"siid": 3,
			"piid": 1,
			"description": "Switch Sensor",
			"prop": {
				"Quick Single Click": 0,
				"Multiple Click": 1
			},
			"speedModeSelectMsg": "当前设备设置了「双击」或「长按」的自动化。疾速模式下，相关自动化将无法响应",
			"multipleClickSubtitle": "若该设备需要设置「双击」或「长按」的自动化，请选择此项"
		},
		"switchClickSpec": {
			"siid": 3,
			"eiid": 1,
			"description": "Switch Sensor",
			"i18n": "单击"
		},
		"switchDoubleClickSpec": {
			"siid": 3,
			"eiid": 2,
			"description": "Switch Sensor",
			"i18n": "双击"
		},
		"switchLongPressesSpec": {
			"siid": 3,
			"eiid": 3,
			"description": "Switch Sensor",
			"i18n": "长按"
		},
		"specButtonType": null,
		"supportAiCtrl": true,
		"memberId": 0
	}
   */
  @report
  openSwitchButtonSettingPage(params) {
  }
  /**
   * 打开设备检查固件历史版本信息页面
   */
  @report
  openDeviceUpgradeHistoryPage() {
  }
  /**
   * 打开Mesh设备固件升级页。分享的设备点击此接口无反应（理论上分享的设备不应该出现调用此接口的菜单）
   * @since 10025
   * 后续蓝牙统一OTA接口openBleCommonDeviceUpgradePage接口传参数param.auth_type = 5时也可以实现此功能（两种方式的原生实现一致），但为了向前兼容厂商已调用的此接口，所以此接口不能下掉
   */
  @report
  openBleMeshDeviceUpgradePage() {
  }
  /**
   * 打开通用协议的蓝牙固件OTA页面。分享的设备点击此接口无反应（理论上分享的设备不应该出现调用此接口的菜单）
   * @since 10038
   * @param {Object} params 请求参数
   * @param {number} params.auth_type 指定设备的协议类型 0: 普通小米蓝牙协议设备(新接入设备已废弃该类型)，1: 安全芯片小米蓝牙设备（比如锁类产品） 4: Standard Auth 标准蓝牙认证协议(通常2019.10.1之后上线的新蓝牙设备) 5: mesh 设备
   * @param {string} params.fake_dfu_url 指定写入DFU的下载地址，仅在测试环境下有效，指定之后可以强制更新指定DFU固件版本
   * @example
   * Host.ui.openBleCommonDeviceUpgradePage({auth_type: 5 })
   * 目前ios在进行OTA前，可以先断开与设备的蓝牙连接，然后再从设备广播的信息中拿到设备auth_type的值（无需传参auth_type），但是安卓暂时不好实现所以接口增加了参数auth_type
   */
  @report
  openBleCommonDeviceUpgradePage(params) {
  }
  /**
   * 打开灯组2.0固件升级页。分享的设备点击此接口无反应（理论上分享的设备不应该出现调用此接口的菜单）
   * @since 10031
   */
  @report
  openLightGroupUpgradePage() {
  }
  /**
   * 打开Ble 组设备升级页面
   * @param {Number} type 蓝牙类型，与蓝牙connect 参数中的type 一致
   * @since 10049
   */
  @report
  openBleGroupUpgradePage(type) {
  }
  /**
   * 打开设备时区设置页
   * apiLevel在10025，增加参数的支持，APP修改时区是否需要同步到设备端，前提是设备需要支持miIO.set_timezone 方法
   * 如果sync_device为true，服务端会给设备发送rpc,例如： {'method':'miIO.set_timezone','params':["Asia/Chongqing"]}
   * @param {Object} {"sync_device": false}  true-需要同步给设备 false-不需要同步给设备（默认）
   * @since 10025
   */
  @report
  openDeviceTimeZoneSettingPage(params = null) {
    if (!params) {
      params = { "sync_device": false };
    }
    native.MIOTHost.openDeviceTimeZoneSettingPage(params);
  }
  /**
   * 打开商城某商品详情页面
   * @param {string} gid - 商品ID
   */
  @report
  openShopPage(gid) {
  }
  /**
   * 打开商城搜索结果页面
   * @param {string} keyword - 搜索关键字
   * @since 10024
   */
  @report
  openShopSearchPage(keyword) {
  }
  /**
   * 打开产品百科H5页面
   * @since 10035
   * @param {string} url - 链接地址
   * 值得注意的是，米家对该接口能够打开的url做了限制，目前支持的是包含 "*.mi.com",@"*.xiaomi.com",@"*.xiaomiyoupin.com"的域名
   */
  @report
  openProductBaikeWebPage(url) {
  }
  /**
   * 打开Mesh灯组 添加/编辑 页,Device.pid为17，则为Mesh设备组
   * @since 10021
   * @param {String} type - 需要打开创建设备组页面时，type=add，需要打开编辑设备组页面时，type=edit
   * @param {String} did - 设备did。如果是创建，则是以当前实际设备的did为基础，进入创建灯组页面。如果是编辑，则是灯组的虚拟设备did。
   * @param {int} version - 灯组版本，目前可选值有1和2，分别代表灯组1.0(旧版灯组)和灯组2.0 ;默认为灯组1.0
   */
  @report
  openMeshDeviceGroupPage(type, did, version = 1) {
  }
  /**
   * 打开创建设备组页，如果是支持Mesh的设备，请使用上面的openMeshDeviceGroupPage
   * @param {String} groupModel - 设备组model
   * 打开创建设备组页，只有在设备页内，需要创建设备组时，才能调用此方法。如果是设备组页面内，请使用下面的openEditDeviceGroupPage方法
   * 只有特定设备支持创建设备组统一管理
   */
  @report
  openAddDeviceGroupPage(groupModel = "") {
  }
  /**
   * 打开编辑设备组页，只有在设备组页内，需要修改设备组时，才能调用此方法。如果是设备页面内，请使用上面的openAddDeviceGroupPage方法
   * @param {Array} dids - 包含组设备did的数组
   */
  @report
  openEditDeviceGroupPage(dids) {
  }
  /**
   * 开启倒计时界面
   * @deprecated  sdk 10032版本开始废弃，请使用 Service.scene.openCountDownPage()
   * @param {Boolean} isCountDownOn 设备的当前状态:YES 为开启，所以我们启动关闭倒计时; NO  为关闭，所以我们启动开启倒计时
   * @param {object} setting 设置倒计时页面的属性
   * @param {string} setting.onMethod 指硬件端，打开 倒计时应该 执行的方法，请咨询硬件工程师
   * @param {string} setting.onParam 指硬件端，打开 倒计时应该 传入的参数，请咨询硬件工程师
   * @param {string} setting.offMethod 指硬件端，关闭 倒计时应该 执行的方法，请咨询硬件工程师
   * @param {string} setting.offParam 指硬件端，关闭 倒计时应该 传入的参数，请咨询硬件工程师
   * @param {string} setting.identify since 10021, 用于设置倒计时的identify
   * @param {string} options.displayName 配置场景日志显示的名称：注意，不会更改倒计时页面的标题，只会上传到服务端
   * @example
   *
   * Host.ui.openCountDownPage(true, {onMethod:"power_on", offMethod:'power_off', onParam:'on', offParam:'off',displayName:"新名字"})
   *
   */
  @report
  openCountDownPage(isCountDownOn, setting) {
  }
  /**
   * 打开一次性密码设置页
   * @param {string} did   设备did
   * @param {int} interval  时间间隔，即密码组的刷新时间间隔，单位为分钟，类型为 number，传入 10 到 60 的整数
   * @param {int} digits 密码位数，类型为 number，传入 6 到 8 的整数
   */
  @report
  openOneTimePassword(did, interval, digits) {
  }
  /**
   * @deprecated since 10004 use openTimerSettingPageWithVariousTypeParams instead
   * @param {string} onMethod  定时到时设备“开”执行的 RPC 指令命令字字符串
   * @param {string} onParam   定时到时设备“开”执行的 RPC 指令参数字符串（目前仅支持单参数）
   * @param {string} offMethod 定时到时设备“关”执行的 RPC 指令命令字字符串
   * @param {string} offParam  定时到时设备“关”执行的 RPC 指令参数字符串（目前仅支持单参数）
   *
   * @description 这个api 应该可以废弃了，使用 Service.scene.openTimerSettingPageWithOptions()
   */
  @report
  openTimerSettingPage(onMethod, onParam, offMethod, offParam) {
  }
  /**
   * @deprecated since 10004 use openTimerSettingPageWithVariousTypeParams instead
   * @param {string} customTimerIdentifier 自定义定时Identifier
   * @param {string} onMethod  定时到时设备“开”执行的 RPC 指令命令字字符串
   * @param {string} onParam   定时到时设备“开”执行的 RPC 指令参数字符串（目前仅支持单参数）
   * @param {string} offMethod 定时到时设备“关”执行的 RPC 指令命令字字符串
   * @param {string} offParam  定时到时设备“关”执行的 RPC 指令参数字符串（目前仅支持单参数）
   *
   * @description 这个api 应该可以废弃了，使用 Service.scene.openTimerSettingPageWithOptions()
   */
  @report
  openTimerSettingPageWithCustomIdentifier(customTimerIdentifier, onMethod, onParam, offMethod, offParam) {
  }
  /**
   * @param {string} onMethod  定时到时设备“开”执行的 RPC 指令命令字字符串，指硬件端，打开定时应该执行的方法，请咨询硬件工程师,miot-spec下，一般为：set_properties
   * @param {json} onParam   定时到时设备“开”执行的 RPC 指令参数，可以是字符串、数字、字典、数组，指硬件端，打开定时应该传入的参数，请咨询硬件工程师，iot-spec下，一般为：[{did,siid,piid,value}]
   * @param {string} offMethod 定时到时设备“关”执行的 RPC 指令命令字字符串,,参数请与嵌入式的同学沟通，指硬件端，关闭定时应该执行的方法，请咨询硬件工程师，miot-spec下，一般为：set_properties
   * @param {json} offParam  定时到时设备“关”执行的 RPC 指令参数，可以是字符串、数字、字典、数组，指硬件端，关闭定时应该传入的参数，请咨询硬件工程师，miot-spec下，一般为：[{did,siid,piid,value}]
   * @example
   *
   * Host.ui.openTimerSettingPageWithVariousTypeParams("power_on", ["on", "title"], 'off',"title"}),
   */
  @report
  openTimerSettingPageWithVariousTypeParams(onMethod, onParam, offMethod, offParam) {
  }
  /**
   * 扩展自 openTimerSettingPageWithVariousTypeParams , 新增支持自定义name使用
   * @deprecated  sdk 10032版本开始废弃，请使用 Service.scene.openTimerSettingPageWithOptions()
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
   * Host.ui.openTimerSettingPageWithOptions({onMethod:"set_properties", onParam: [{did:Device.deviceID, siid:3, piid:2, value:true}], offMethod: "set_properties", offParam: [{did:Device.deviceID, siid:3, piid:2, value:false}], displayName:"设置xxx定时"，identify:"plug_usb_countdowm"})
   */
  @report
  openTimerSettingPageWithOptions(options) {
  }
  /**
   * 更多设置-多键开关设置页面
   * @since 10010 ,SDKLevel 10010 开始提供使用
   * @param {string} did  设备did 指定设备ID
   * @param {string} mac  设备mac option, 在不传递时。默认使用当前设备
   * @example
   * Host.ui.openPowerMultikeyPage(did, mac);
  */
  @report
  openPowerMultikeyPage(did, mac = null) {
  }
  openPowerMultikeyPageV2(did, mac = null, params) {
  }
  /**
  * 添加或者复制一个红外遥控器
  * @since 10003
  * @param {string} did 设备did
  * @param {number} type 0：添加遥控器；1：复制遥控器。默认0
  * @param {array} models 一组红外遥控器model，只传入一个model将直接跳转到相应的品牌列表或者机顶盒列表，支持的models见文档。默认空数组[]
  * @param {object} extra 额外配置，会传入打开的插件页，也有部分特殊功能定义字段如下：
  * @param {boolean} [extra.create_device = true] 米家首页列表是否展示虚拟遥控器设备。默认true。暂时只有android支持
  * @param {boolean} [extra.dismiss_current_plug = true] since 10020 。在推出新的插件页面时，关掉当前页面，返回app首页。iOS Only
  * @param {boolean} [extra.open_room_select] 红外遥控添加完成是否跳转到选择房间页面，默认值 false
  */
  @report
  addOrCopyIR(did, type = 0, models = [], extra = { create_device: true }) {
  }
  /**
   * 打开用户账号下某一设备的插件
   * @param {string} did  设备的did
   * @param {string} model  设备的model
   * @param {object} params  额外参数，打开插件时传入，也有部分特殊功能定义字段如下：
   * @param {boolean} [params.dismiss_current_plug = true] since 10020 。是否在推出新的插件页面时，关掉当前页面，返回app首页。iOS Only
   * @returns {Promise<json>} 打开插件失败，返回错误信息；打开插件成功，无回调信息
   */
  @report
  openDevice(did, model, params) {
     return Promise.resolve(null);
  }
  /**
   * 打开用户账号下某一设备的插件,可支持跳转到插件的某一页面
   * 至于跳转到哪个页面，**需要插件方做支持**，示例可以参考com.xiaomi.demo 中 Host.ui.openPluginPage 的使用
   * 整体流程如下：
   * 插件调用此方法openPluginPage
   *      ⬇  ️
   * 将参数传到native
   *      ⬇
   * native调用打开插件的方法，带上此处传递的参数
   *      ⬇
   * native打开RN页面，将参数传递到Package.js
   *      ⬇
   * 支持打开内部页面的插件，通过Package.entrance获取将要跳转到哪个页面，通过Package.pageParams获取此页面需要的页面参数
   *      ⬇
   * 打开插件对应页面，注意：如果isBackToMainPage为true，则需要在你的插件首页的componentDidMount中，增加跳转逻辑，反之，则应该在index.js中控制入口界面。详细使用请参考Demo中 openPluginPage、Package.entrance、Package.pageParams三个方法的使用
   *
   * @since 10026
   * @param {string} did  设备的did
   * @param {string} pageName  将打开插件的某一页面, 此参数将会赋值给 Package.entrance, 默认为 Entrance.Main
   * @param {object} pageParams  将打开插件的某一页面的参数，此参数将会赋值给 Package.pageParams
   * @param {boolean} [pageParams.isBackToMainPage = true] 打开的插件页面按返回，是否需要返回到插件首页
   * @param {boolean} [params.dismiss_current_plug] since 10040 。是否在推出新的插件页面时，关掉当前页面，返回app首页，默认false。iOS Only
   * @param {int}     [pageParams.open_plugin_source] since 10059, 可选参数，标识从哪里打开插件(不传默认为0)。可能的取值有：
   * 0--默认值，如米家首页/其他；1-- 标准插件的更多功能；2--设置页的首页样式
   * @example
   * let pageParams = {did:Device.deviceID,model:Device.model}
   * Host.ui.openPluginPage(Device.deviceID, PluginEntrance.Setting, pageParams)
   */
  @report
  openPluginPage(did, pageName = 'main', pageParams = { isBackToMainPage: true }) {
  }
  /**
   * 打开一个原生类 className ，界面类类名 注意 用此方法打开的vc初始化时不需要传参数，
   * 需要传参的viewController暂时还需要手动导出
   * @param {string} className 类的名字
   */
  @report
  openPageWithClassName(className) {
  }
  /**
   * @deprecated since10010 use 'miot/ui/CommonSetting' component instead. See example https://github.com/MiEcosystem/miot-plugin-sdk/blob/SDK_10004/projects/com.xiaomi.demo/Main/tutorial/Setting.js for more details
   * ios特有页面，android 不能使用
   * 打开更多设置页面（通常包括安全设置，常见问题与用户反馈）
   */
  @report
  openNewMorePage() {
  }
  /**
   * @since 10002
   * android特有页面，ios 不能使用
   * 打开手机蓝牙设置页面
  */
  @report
  openPhoneBluSettingPage() {
  }
  /**
   * 打开小爱训练计划
   * @param {string} clientId
   * @param {string} did 设备 ID
   * @param {string} aiMiotClientId 米家的客户端 ID
   * @param {string} aiClientId 水滴平台的客户端
   * @param {string} aiVersion "" 不隐藏 "thirdpart" 隐藏 “一段录音” “设备控制” 按钮 "audio" 隐藏 “一段录音” 按钮 "device" 隐藏 “设备控制” 按钮
   * @param {object} otherParams 想怎么玩都行的参数，会覆盖之前的
   * @param {boolean} otherParams.newVerAiTrain 当传入其他参数中newVerAiTrain为true情况 会进入新版本的训练计划 否则默认进入旧版
  */
  @report
  openXiaoAiLearnPage(clientId, did, aiMiotClientId, aiClientId, aiVersion, otherParams) {
  }
  /**
   * 显示提示用户打开蓝牙的动画示意图, 仅在iOS下有效，Android下无反应
   * @since 10004
   */
  @report
  showBLESwitchGuide() {
  }
  /**
   * 隐藏提示用户打开蓝牙的动画示意图, 仅在iOS下有效，Android下无反应
   * @since 10004
   */
  @report
  dismissBLESwitchGuide() {
  }
  /**
   * 打开设备快连成功页面
   * @since 10004
   * @param {string} model 设备model
   * @param {string} did 设备did
   */
  @report
  openConnectSucceedPage(model, did) {
  }
  /**
   * 打开窗帘组选房间设置名称的页面
   * @since 10049
   * @param {string} groupDid 组设备did
   * @param {string} leftDid 左侧窗帘did
   * @param {string} rightDid 右侧窗帘did
   */
  @report
  openCurtainGroupNamePage(groupDid, leftDid, rightDid) {
  }
  /**
   * 打开Zigbee 网关插件开启子设备快连
   * @since 10020
   * @param {string} did 网关设备did
   */
  @report
  openZigbeeConnectDeviceList(did) {
  }
  /**
   * 打开设备网络信息页面，米家已提供入口：设置 - 更多设置 - 网络信息。此方法只针对wifi设备，combo设备，蓝牙设备请不要调用此方法。
   * @since 10026
   */
  @report
  openDeviceNetworkInfoPage() {
  }
  /**
   * android 特有， 跳转到小米钱包
   * @param params
   * @return {Promise<object>}
   * @example
   * let params = {action:'issue_mifare',type:'1',product_id:'66666-00211',source_channel:'mijia'};
   * Host.ui.openMiPayPageForAndroid(params).then((res)=>{console.log(res)}).catch((error)=>{ console.log(error)});
   */
  @report
  openMiPayPageForAndroid(params) {
     return Promise.resolve(null);
  }
  /**
   * 跳转到设备定向推荐界面,注意：SDK_10024及其之后才可使用
   * @since 10024
   * @param {String} did
   * @param {number} recommendId
   */
  @report
  openPluginRecommendScene(did, recommendId) {
  }
  /**
   * 刷新设备列表，同时刷新设备列表页UI
   * @since 10025
   * @return {Promise}
   */
  @report
  refreshDeviceList() {
     return Promise.resolve(null);
  }
  /**
   * 跳转到终端设备指定的设置页面 如 iPhone和安卓手机的系统设置页面
   * @since 10036
   * @param {number} type
   *      type = 1 打开手机设置页中米家app配置页面      10036及以上 有效
   *      type = 2 WiFi设置页面                      10036及以上 有效
   *      type = 3 WiFi选择页面                      10047及以上 有效(仅Android)，iOS上无任何效果
   */
  @report
  openTerminalDeviceSettingPage(type) {
  }
  /**
   *  打开Android系统位置信息设置页(不同于权限配置页) only Android
   *  @since 10038
   */
  @report
  openAndroidLocationServerSettingPage() {
  }
  /**
   *  打开设备重置页面
   *  @since 10041
   */
  @report
  openResetAndConnectDevicePage() {
  }
  /**
   *  打开配网页面，（仅限猫眼门锁使用）
   *  @since 10068
   */
  openWifiConfigStepPage() {
  }
  /**
   *  打开语音授权页面
   *  @since 10041
   */
  @report
  openVoiceCtrlDevListPage() {
  }
  /**
   *  打开文件选择页面 only for iOS
   *  在使用前建议判断平台
   *  @since 10042
   *  @return {Promise}
   *
   *  成功时返回
   *    { code: 0 , data: [ { path: xxx, fileName: xxx, ext: xxx, fileSize: xxx}, {...}] }
   *      其中 path 是文件的绝对地址，ext是扩展名，fileName是文件名，byteLen 是文件 size 单位是byte
   *      需要特别说明的是：
   *      1：data 返回的数组类型 在 10042 中目前仅返回一个文件信息，不支持多选
   *      2：如果用户没有选择任何文件，例如点击了左上角的取消按钮，那么 data 中会返回空数组，开发人员需要对此做处理。
   *  失败时返回
   *    { code: -1, message: 'file authorized failed'}  // 在ios中 获取icloud需要验证授权，此处错误代表授权失败，如果出现此错误，请联系米家开发人员或提交工单反馈。
   *    { code: -2, message: 'file read error'}  // 出现此种错误 代表 ios 获取授权文件路径失败，如果出现此错误，请联系米家开发人员或提交工单反馈。
   *    { code: -3, message: 'method [openIOSDocumentFileChoosePage] can only be invoked on iOS, Android is not supported.' }
   */
  @report
  openIOSDocumentFileChoosePage() {
  }
  /**
   * 打开系统的文件选择(Android only)
   * @since 10048
   * @ignore 特定插件可用
   * @param {string} mimeType 文件类型，不可为空；这里会根据mimeType的值来展示符合条件的文件，比如图片类型:image/*.
   * @returns {json} 用户选择的文件，成功时： { code:0, data: { path: 'xxx(文件路径)', name:'xxx(文件名)', mimeType:'xxxx(文件类型)'}}
   *                 失败时：{code:-1, message: 'mimeType cann't be empty'}
   *                       {code:-2, message: 'cann't find target page,permission denied'}
   *                       {code:-3, message: 'cann't find target page,please check if your mimeType is correct'}
   * @example
   * Host.ui.openFileSelectPage("text/*").then(res=>{
   *  alert(JSON.stringify(res));
   * }).catch(err=>{
   *  alert(JSON.stringify(err));
   * })
   */
  @report
  openFileSelectPage(mimeType) {
  }
  /**
   * 打开系统的文件目录选择，Android 21及以上才支持(Android only)
   * @since 10048
   * @ignore 特定插件可用
   * @returns {json} 用户选择的目录,成功时：{ code:0, data: 'xxxxx(目录)'}
   *                            失败时：{code:-1, message:'minimum support Android API is 21'}
   *                                   {code:-2, message:'cann't find target page,permission denied'}
   * @example
   * Host.ui.openDirectorySelectPage().then(res=>{
   *  alert(JSON.stringify(res));
   * }).catch(err=>{
   *  alert(JSON.stringify(err));
   * })
   */
  @report
  openDirectorySelectPage() {
  }
  /**
   * @since 10049
   * 打开NFC写设备数据的页面，默认会写入设备的基本信息(如did，model等)，如果插件还需要写入其他数据，可以通过参数extra传给App；
   * 在米家首页，手机接触到NFC设备时会读取写入的设备信息，读取成功后会自动打开相应的插件，插件可以通过Package.entryIfno.nfcdata获取
   * 写入NFC设备的extra字段的值
   * @param {string} extra 需要写入到nfc设备的额外数据
   * @example
   * let extra = 'test_data';
   * Host.ui.openNFCWriteDeviceInfoPage(extra);
   */
  @report
  openNFCWriteDeviceInfoPage(extra = '') {
  }
  /**
   * @since 10056
   * 打开NFC写设备数据的调试页面。
   * 注意：该接口仅限于调试使用，只在DB包可用，线上版本不可用。仅特定插件可用。
   * 在米家首页，手机接触到NFC设备时会读取写入的设备信息，读取成功后会自动打开相应的插件，插件可以通过Package.entryIfno.nfcdata获取
   * @param {jsonobject} params 需要写入到nfc设备数据;
   * params的格式如下：
   * {
   *    did: string类型，设备的did,必填,且不能为空
   *    model: stringl类型, 对应插件的model,必填,切不能为空
   *    extra: json格式的string类型，需要写入到设备的额外参数，选填
   * }
   * @example
   * let params={
   *  did: Device.deviceID,
   *  model: Device.model,
   *  extra: JSON.stringify({key:'value'})
   * }
   * Host.ui.openNFCWriteDeviceInfoDebugPage(params);
   */
     @report
  openNFCWriteDeviceInfoDebugPage(params) {
  }
  /**
   * @since 10055
   * 打开设置定时的页面。
   * 这个页面不同于Service.scene.openTimerSettingPageWithOptions，这个页面只负责选择日期然后返回对应的crontab字符串
   * @param{Object}param(optional)。
   * param.crontab(string)表示描述定时任务的字符串，当传入的值有效时进入页面会展示对应的定时状态
   * param.title(string)，要显示的标题
   * param.hideLegalTime(boolean)，是否隐藏法定节假日,(当服务器为外服时无法显示法定节假日)
   * @return{Promise} 成功时返回{code:0,data:{crontab:'xxxxxxx'}}
   * 这个方法不会走reject，原生界面崩溃了代表传入的param.crontab不合法，native端解析失败。
   */
  @report
  openGenerateCrontabStringPage(param = {}) {
  }
  /**
    * @since 10056
    * 打开固件自动更新页面（原生页面位置：设置-》检查更新-》固件自动更新）
    * @example
    * Host.ui.openFirmWareAutoOTAPage();
  */
  @report
  openFirmWareAutoOTAPage() {
  }
  /**
   * 返回Android手机底部导航栏高度
   * @since 10069
   * 仅限Android使用
  * @example
   * Host.ui.getNavigationBarHeight()
   *
   * res : {"data":{"navigationBarHeight":130},"code":0}
   */
  @report
  getNavigationBarHeight() {
  }
  /**
   * 打开虚拟组设备的初始化页面，多用在getVirtualDeviceCombineStatus判断成组失败的情况下
   * @param {Object}param
   * param.groupDid{string},组设备的did
   * param.includeCurtainDevice{boolean}，Android only，页面默认是为灯组设计的，需要兼容窗帘组的时候请传入这个参数
   */
  @report
  openVirtualGroupInitPage(param) {
  }
  /**
   * 打开离线弹框页面，用于标准插件页面打开离线弹框
   * @since 10079
  * @example
   * Host.ui.openDeviceOfflineAlert()
    */
  @report
  openDeviceOfflineAlert() {
  }
  /**
   * 打开本地直连控制关联页面
   * @param {Object} param 预留
   * @example
   * Host.ui.openAssociatePage(param);
   */
  @report
  openAssociatePage(param = {}) {
  }
  /**
   * @since 10084
   * 打开设备更换图标弹窗，目前支持灯，插座和开关设备
   * @param {Object} param
   * @param {number} param.plugin_type
   * 0：开关品类；1：灯组品类；2：插座品类
   * @return {Promise<{code:number,data:{subclass_id:number,proxy_category_icon:String}},{code:number,message:String}>}
   * 成功返回{
   *   code:0,
   *   data:{
   *     subclass_id:xxx,
   *     proxy_category_icon:xxxx //可能为空字符串
   *   }
   * }
   * 失败返回 {
   *   code:-1,
   *   message:xxxx
   * }
   */
  @report
  openChangeDeviceIconDialog(param) {
  }
  /**
   * @since 10082
   /**
   * 打开电视遥控器NFC写入流程的页面,only for Android
   * @param param {Object} 预留
   */
   @report
  openNFCWritePageForConnectTV(param = undefined) {
  }
   /**
    * 基站（室内机）插件使用，调用该接口跳转到WiFi选择页面，选择后将ssid和passwd返回给插件
    * @returns {Promise<Object>}
    * {
    *   code:0,
    *   data:{
    *     ssid:xxxx,
    *     passwd:xxxx
    *   }
    * }
    */
   @report
   openWifiChoosePage() {
   }
   /**
    * 基站（室内机）插件使用，调用该接口跳转到子设备配网页面，给子设备配网
   */
   @report
   openConfigRouterSubPage() {
   }
  /**
   * @since 10102
   * 打开选择位置地图弹框
   * @param
   * param.title(string) 标题
   * param.message(string) 副标题 
   * param.homeId(string)  家庭Id 不传默认当前家庭Id
   * param.titleType(string) title类型(sunrise/sunset) 当title和message都不传时 会根据这个类型展示不同的默认title以及messge
   * param.callbackEvent(string) 回调事件类型 会通过这个发送自定义事件 
   * @return{Promise} 弹框点确定成功通过callbackEvent 自定义事件返回 
   * {
        "city_id" = 101010100;
        "home_addr" = "xx";
        latitude = "40.06043341349643";
        longitude = "116.3078702476689";
    };
   */
   @report
   openSelectLocationMapDialog(param) {
   }
  
    /**
   * 打开设备中枢功能页
   * @param  暂传空
   */
    @report
   openDeviceHubGatewayPage(param = {}) {
   }
  /**
   * 打开紧急事件电话呼叫页面
   * @param {string} did 设备 ID
   */
  @report
    openDeviceCallSettingPage(did) {
      native.MIOTHost.openDeviceCallSettingPage(did);
    }
  /**
   * 打开紧急事件电话呼叫页面
   * @param {string} did 设备 ID
   * @param {string} extra 个保合规参数
   * {
   *    privacyVersion:'',
   *    type:'accept',
   *    privacyType: 3,
   *    pluginPrivacyId: 1234
   * }
   */
  @report
  openDeviceCallSettingPageWithExtra(did, extra) {
    native.MIOTHost.openDeviceCallSettingPageWithExtra(did, extra);
  }
  /**
   * 打开推荐场景详情页
   * @params {object} params
   * params.tempID {string}  场景模版ID
   * params.sceneID {string} 场景ID
   * params.edit_from {int}  来源 0-未知入口 1-智能tab 2-配网 3-插件内 4-发现页跳转
   * params.did {string} 设备id
   * @example
   * Host.ui.openTemplateScenePage(param);
   */
       @report
  openTemplateScenePage(param = {}) {
  }
  /**
   * 打开配对模式界面，仅Matter设备具备该项
   */
  @report
       openMatterConnectPage(did) {
       }
  /**
   * 跳转到插件之外页面后，如Host.ui.openWebPage(targetUrl)打开的H5页面，调用后回到插件页
   * @param info
   */
  backToPluginPage(info = null) {
  }
    /**
   * 打开家庭管理页面
   * @param {string} did 设备 ID
   */
    @report
  openFamilyManagerPage(did) {
    native.MIOTHost.openFamilyManagerPage(did);
  }
  /**
   * since SDK_10100
   * 打开家庭相册页
   *
   * @param did
   */
  @report
    openFamilyAlbumPage(did) {
      native.MIOTHost.openFamilyAlbumPage(did);
    }
  /**
   * 打开米家微信小程序，在微信小程序中订阅音视频通话
   * @since 10091
   * @param params 参数必须包含：
   * {
   *    paramType : 固定："requestWxDeviceVoIP"
        userId: 用户登陆的账号id
        did ：设备did
        deviceName: 设备在插件中的名称
        model ：设备model
   * }
      @example
   *  Host.ui.requestWxDeviceVoIP({
   *    paramType : "requestWxDeviceVoIP",
        userId: "894158105",
        did ："102344554",
        deviceName: "device_name",
        model ："device_model"
   * })
   */
  @report
  requestWxDeviceVoIP(params) {
  }
  /**
   * 分享，邀请其他成员订阅音视频通话
   * @since 10091
   * @param params 参数必须包含：
   * {
   *  paramType : 固定："shareWxDeviceVoIP"
      userId: 用户登陆的账号id
      did ：设备did
      deviceName: 设备在插件中的名称
      model ：设备model
      deviceIconURL: 设备icon图片
    * }
      @example
    *  Host.ui.shareWxDeviceVoIP({
        paramType : "shareWxDeviceVoIP",
        userId: "894158105",
        did ："102344554",
        deviceName: "device_name",
        model ："device_model",
        deviceIconURL: ""
      })
    */
  @report
  shareWxDeviceVoIP(params) {
  }
  /**
   * 分享，邀请 家庭成员/家庭管理员/仅通话/家庭成员且通话/家庭管理员且通话
   * @since 10099
   * @param params 参数必须包含：
   * {
   *  inviteType : 固定："homeMember" "homeAdmin" "call" "homeMemberAndCall" "homeAdminAndCall" 分别对应上面五种类型
      userId: 用户登陆的账号id
      did ：设备did
      deviceName: 设备在插件中的名称
      model ：设备model
      wxMessageTitle：微信消息的标题
    * }
      @example
    *  Host.ui.shareWxForInviteFriends({
        inviteType : "homeMember",
        userId: "894158105",
        did ："102344554",
        deviceName: "device_name",
        model ："device_model",
        wxMessageTitle：'xx'
      })
    */
  @report
  shareWxForInviteFriends(params) {
  }
  /**
   * 打开米家小程序，跳到对应的设备卡片（不发起通话）
   * @since 10091
   * @param params 参数必须包含：
   * {
   *  paramType : 固定："locateWxDevice"
      userId: 用户登陆的账号id
      did ：设备did
      deviceName: 设备在插件中的名称
      model ：设备model
      deviceIconURL: 设备icon图片
    * }
      @example
    *  Host.ui.locateWxDevice({
        paramType : "locateWxDevice",
        userId: "894158105",
        did ："102344554",
        deviceName: "device_name",
        model ："device_model",
        deviceIconURL: ""
      })
    */
      @report
  locateWxDevice(params) {
  }
  /**
   * 5. 跳转全部遥控器管理页面
   * since 10099
   * Android only support
   */
  @report
  openIrDeviceManagerPage() {
    if (isAndroid) {
      native.MIOTHost.openIrDeviceManagerPage();
    } else {
      if (__DEV__ && console.warn) {
        console.warn('method [openIrDeviceManagerPage] can only be invoked on Android, iOS is not implemented. ');
      }
    }
  }
  /**
   * 1. 添加红外遥控器
   * since 10099
   * Android only support
   */
  @report
  openAddIrDevicePage() {
    if (isAndroid) {
      native.MIOTHost.openAddIrDevicePage();
    } else {
      if (__DEV__ && console.warn) {
        console.warn('method [openAddIrDevicePage] can only be invoked on Android, iOS is not implemented. ');
      }
    }
  }
  /**
   * 2. 打开特定遥控器插件
   * since 10099
   * Android only support
   */
  @report
  openIrDevicePage(deviceTypeId) {
    if (isAndroid) {
      native.MIOTHost.openIrDevicePage(deviceTypeId);
    } else {
      if (__DEV__ && console.warn) {
        console.warn('method [openIrDevicePage] can only be invoked on Android, iOS is not implemented. ');
      }
    }
  }
}
const UiInstance = new IUi();
export default UiInstance;