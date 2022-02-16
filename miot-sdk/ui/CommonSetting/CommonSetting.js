import { Device, DeviceEvent, Entrance, Host, Package, PackageEvent, Service } from 'miot';
// import {Device,DeviceEvent} from 'miot'
// import {Host} from 'miot';
import PropTypes from 'prop-types';
import React from 'react';
import { DeviceEventEmitter, Text, View } from 'react-native';
import { RkButton } from 'react-native-ui-kitten';
import { strings, Styles } from '../../resources';
import { formatString } from '../../resources/Strings';
import ListItem from '../ListItem/ListItem';
import ListItemWithSwitch from '../ListItem/ListItemWithSwitch';
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
import DynamicColor from 'miot/ui/Style/DynamicColor';
import { FontPrimary } from 'miot/utils/fonts';
// 用于标记固件升级小红点是否被点击过。防止点完小红点后，当蓝牙连接上，小红点再次出现
let firmwareUpgradeDotClicked = false;
let modelType = '';
function getModelType() {
  return new Promise((resolve) => {
    if (modelType) {
      resolve(modelType);
      return;
    }
    Service.spec.getSpecString(Device.deviceID).then((instance) => {
      if (typeof instance === 'string') {
        instance = JSON.parse(instance);
      }
      if (instance && instance.type) {
        modelType = instance.type.split(':')[3];
        resolve(modelType);
        return;
      }
      resolve(Device.model ? Device.model.split('.')[1] : '');
    }).catch(() => {
      resolve(Device.model ? Device.model.split('.')[1] : '');
    });
  });
}
export function resetClassVariables() {
  firmwareUpgradeDotClicked = false;
  modelType = '';
  countryCode = '';
  productBaikeUrl = null;
  roomInfo = null;
}
getModelType().then(() => { }).catch(() => { });
let countryCode = '';
function getCountryCode() {
  return new Promise((resolve, reject) => {
    if (countryCode) {
      resolve(countryCode);
      return;
    }
    Service.getServerName().then(({ countryCode: mCountryCode }) => {
      countryCode = (mCountryCode || '').toLowerCase();
      resolve(countryCode);
    }).catch(reject);
  });
}
let productBaikeUrl = null;
function getProductBaikeUrl() {
  return new Promise((resolve, reject) => {
    if (productBaikeUrl != null) {
      resolve(productBaikeUrl);
      return;
    }
    getCountryCode().then((countryCode) => {
      if (countryCode == 'cn') {
        return fetch(`https://home.mi.com/newoperation/productBaike?model=${ Device.model }`);
      } else {
        productBaikeUrl = '';
        return Promise.reject(null);
      }
    }).then((response) => response.json())
      .then((response) => {
        if (response.code == 0) {
          productBaikeUrl = response.data.baikeUrl;
          resolve(productBaikeUrl);
          return;
        }
        productBaikeUrl = '';
        reject(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
getProductBaikeUrl().then(() => { }).catch(() => { });
// 请求是否展示多键开关和开关的状态
function getMultipleKey() {
  return new Promise((resolve, reject) => {
    Service.callSmartHomeAPI("/v2/home/device_support_split", { dids: [Device.deviceID] }).then((res) => {
      if (!res || !res.supports) {
        reject();
      } else {
        resolve(res.supports);
      }
    }).catch((error) => {
      Service.smarthome.reportLog(Device.model, `Service.smarthome.device_support_split error: ${ JSON.stringify(error) }`);
      reject(error);
    });
  });
}
let roomInfo = null;
function getRoomeInfo() {
  return new Promise((resolve, reject) => {
    if (roomInfo) {
      resolve(roomInfo);
      return;
    }
    Device.getRoomInfoForCurrentHome().then((res) => {
      roomInfo = res;
      resolve(roomInfo);
    }).catch(reject);
  });
}
getRoomeInfo().then(() => { }).catch(() => { });
const choiceIndexArray = [
  {
    title: strings.stdPluginTitle,
    subtitle: strings.stdPluginSubTitle
  },
  {
    title: strings.thirdPluginTitle
  }
];
function getPluginCategory() {
  return new Promise((resolve, reject) => {
    Service.smarthome.getHomepageSettings()
      .then((res) => {
        if (res && res.data) {
          const ret = {
            hasStdPlugin: res.data.standardized,
            pluginCategory: res.data.homepage_type
          };
          resolve(ret);
        } else {
          reject({
            code: -1,
            message: '\'getHomepageSettings\' method returns null object'
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
const firstOptionsInner = {
  /**
   * 按键设置，多键开关`必选`，其余设备`必不选`
   */
  MEMBER_SET: 'memberSet',
  /**
   * 设备共享, `可选`
   */
  SHARE: 'share',
  /**
   * 蓝牙网关, `可选`
   */
  BTGATEWAY: 'btGateway',
  /**
   * 语音授权, `可选`
   */
  VOICE_AUTH: 'voiceAuth',
  /**
   * 智能场景, `可选`
   */
  IFTTT: 'ifttt',
  /**
   * 固件升级，`可选`
   */
  FIRMWARE_UPGRADE: 'firmwareUpgrade',
  /**
   * 新建设备组
   */
  CREATE_GROUP: 'createGroup',
  /**
   * 管理设备组
   */
  MANAGE_GROUP: 'manageGroup',
  /**
   * 产品百科
   */
  PRODUCT_BAIKE: 'productBaike',
  /**
   * 标准插件
   */
  STAND_PLUGIN: 'standPlugin',
  /**
   * 多键开关
   */
  MULTIPLEKEY_SWITCH: 'MultipleKeySwitch'
};
const firstAllOptionsInner = {
  ...firstOptionsInner,
  /**
   * 常用摄像机
   */
  FREQ_CAMERA: 'freqCamera',
  /**
   * 设备名称，`必选`
   */
  NAME: 'name',
  /**
   * 位置管理，`必选`
   */
  LOCATION: 'location',
  /**
   * 使用帮助，`必选`
   */
  HELP: 'help',
  /**
   * 更多设置，`必选`
   */
  MORE: 'more',
  /**
   * 安全设置，`必选`
   */
  SECURITY: 'security',
  /**
   * 法律信息，`必选`
   */
  LEGAL_INFO: 'legalInfo'
};
const secondOptionsInner = {
  /**
   * 固件升级——固件自动升级, `可选`
   */
  AUTO_UPGRADE: 'autoUpgrade',
  /**
   * 更多设置——设备时区, `可选`
   */
  TIMEZONE: 'timezone',
  /**
   * 法律信息——加入用户体验计划, `可选`
   */
  USER_EXPERIENCE_PROGRAM: 'userExperienceProgram'
};
const secondAllOptionsInner = {
  ...secondOptionsInner,
  /**
   * 插件版本号
   */
  PLUGIN_VERSION: 'pluginVersion',
  /**
   * 固件升级——检查固件更新，`必选`
   */
  CHECK_UPGRADE: 'checkUpgrade',
  /**
   * 更多设置——安全设置，`必选`
   */
  SECURITY: 'security',
  /**
   * 更多设置——反馈问题，`必选`
   */
  FEEDBACK: 'feedback',
  /**
   * 更多设置——添加桌面快捷方式，`必选`
   */
  ADD_TO_DESKTOP: 'addToDesktop',
  /**
   * 法律信息——用户协议，`必选`
   */
  USER_AGREEMENT: 'userAgreement',
  /**
   * 法律信息——隐私政策，`必选`
   */
  PRIVACY_POLICY: 'privacyPolicy',
  /**
   * 常用设备/设备首页常用设备
   */
  FREQ_DEVICE: 'freqDevice',
  /**
   * 默认首页--标识标准插件还是厂商插件
   */
  DEFAULT_PLUGIN: 'default_plugin'
};
export const AllOptions = {
  ...firstAllOptionsInner,
  ...secondAllOptionsInner
};
export const SETTING_KEYS = {
  // 一级菜单
  first_options: AllOptions,
  // 二级菜单
  second_options: AllOptions
};
const firstAllOptions = AllOptions;
const secondAllOptions = AllOptions;
export { firstAllOptions, secondAllOptions };
/**
 * 分享设备的设置项
 * 0: 不显示
 * 1: 显示
 */
const firstSharedOptions = {
  [AllOptions.NAME]: 0,
  [AllOptions.MEMBER_SET]: 0,
  [AllOptions.LOCATION]: 0,
  [AllOptions.SHARE]: 0,
  [AllOptions.BTGATEWAY]: 0,
  [AllOptions.VOICE_AUTH]: 0,
  [AllOptions.IFTTT]: 0,
  [AllOptions.FIRMWARE_UPGRADE]: 0,
  [AllOptions.CREATE_GROUP]: 0,
  [AllOptions.MANAGE_GROUP]: 0,
  [AllOptions.MORE]: 1,
  [AllOptions.HELP]: 1,
  [AllOptions.SECURITY]: 0,
  [AllOptions.LEGAL_INFO]: 0, // 20190516，分享设备不显示「法律信息」
  [AllOptions.PRODUCT_BAIKE]: 1,
  [AllOptions.STAND_PLUGIN]: 1,
  [AllOptions.FREQ_CAMERA]: 1,
  [AllOptions.FREQ_DEVICE]: 1,
  [AllOptions.DEFAULT_PLUGIN]: 1
};
/**
 * 20190708 / SDK_10023
 * 所有设置项顺序固定
 * 权重值越大，排序越靠后，为了可扩展性，权重不能依次递增+1
 */
export const AllOptionsWeight = {
  // firstOptions
  [AllOptions.NAME]: 0,
  [AllOptions.CREATE_GROUP]: 1,
  [AllOptions.MANAGE_GROUP]: 1,
  [AllOptions.MEMBER_SET]: 3,
  [AllOptions.LOCATION]: 6,
  [AllOptions.SHARE]: 9,
  [AllOptions.IFTTT]: 18,
  [AllOptions.PRODUCT_BAIKE]: 19,
  [AllOptions.FIRMWARE_UPGRADE]: 21,
  [AllOptions.HELP]: 24,
  [AllOptions.MORE]: 27,
  [AllOptions.STAND_PLUGIN]: 22,
  [AllOptions.DEFAULT_PLUGIN]: 28,
  [AllOptions.FREQ_DEVICE]: 29,
  [AllOptions.FREQ_CAMERA]: 30,
  [AllOptions.MULTIPLEKEY_SWITCH]: 35,
  // secondOptions
  [AllOptions.AUTO_UPGRADE]: 1,
  [AllOptions.PLUGIN_VERSION]: 1,
  [AllOptions.SECURITY]: 3,
  "networkInfo": 5,
  [AllOptions.VOICE_AUTH]: 7,
  [AllOptions.BTGATEWAY]: 9,
  [AllOptions.USER_EXPERIENCE_PROGRAM]: 11,
  [AllOptions.CHECK_UPGRADE]: 13,
  [AllOptions.LEGAL_INFO]: 18,
  [AllOptions.USER_AGREEMENT]: 19,
  [AllOptions.PRIVACY_POLICY]: 19,
  [AllOptions.TIMEZONE]: 21,
  [AllOptions.FEEDBACK]: 23,
  [AllOptions.ADD_TO_DESKTOP]: 25
};
/**
 * 某些特殊设备类型不显示某些设置项
 * key: 设置项的key
 * value: 不显示该设置项的设备类型列表, 用 pid 表示设备类型, [] 表示支持所有设备
 * 0:  wifi单模设备
 * 1:  yunyi设备
 * 2:  云接入设备
 * 3:  zigbee设备
 * 5:  虚拟设备
 * 6:  蓝牙单模设备
 * 7:  本地AP设备
 * 8:  蓝牙wifi双模设备
 * 9:  其他
 * 10: 功能插件
 * 11: SIM卡设备
 * 12: 网线设备
 * 13: NB-IoT
 * 14: 第三方云接入
 * 15: 红外遥控器
 * 16: BLE Mesh
 * 17: 虚拟设备（新设备组）
 */
const excludeOptions = {
  [AllOptions.NAME]: [],
  [AllOptions.MEMBER_SET]: [],
  [AllOptions.LOCATION]: [],
  [AllOptions.SHARE]: [],
  [AllOptions.BTGATEWAY]: [],
  [AllOptions.VOICE_AUTH]: [],
  [AllOptions.IFTTT]: [],
  [AllOptions.FIRMWARE_UPGRADE]: [],
  [AllOptions.CREATE_GROUP]: ['17'],
  [AllOptions.MANAGE_GROUP]: [],
  [AllOptions.MORE]: [],
  [AllOptions.HELP]: [],
  [AllOptions.SECURITY]: [],
  [AllOptions.LEGAL_INFO]: ['5', '15', '17'] // 新增策略：灯组、红外遥控器等虚拟设备不显示法律信息，20190619
};
/**
 * ItemStyle - 10040新增 可参考 ListItem组件的部分样式
 * @typedef {Object} ItemStyle
 * @property {style} titleStyle - 标题的自定义样式
 * @property {style} subtitleStyle - 副标题的自定义样式
 * @property {style} valueStyle - 右侧文案的自定义样式
 * @property {bool} dotStyle - 10040新增 title右上角红点的style  建议设置宽高为8，以免图片失真
 * @property {number} titleNumberOfLines - 10040新增 设置title字体显示的最大行数 默认为1
 * @property {number} subtitleNumberOfLines - 10040新增 设置subtitle字体显示的最大行数 默认为2
 * @property {number} valueNumberOfLines - 10040新增 设置value字体显示的最大行数 默认为2
 * @property {number} valueMaxWidth - 10051新增 设置value文案的最大宽度 默认为有箭头时30%，无箭头时35%
 * @property {bool} useNewType - 10045新增 是否使用新样式 10045以后*!必须!*使用新样式
 */
/**
 * moreSettingPageStyle - 10040新增 二级页面 更多设置 页面的样式
 * @typedef {Object} moreSettingPageStyle
 * @property {style} navigationBarStyle - 标题的自定义样式 -可参考 NavigationBar 样式
 * @property {style} itemStyle - 列表中 item样式
 * @property {style} - 10053新增 containerStyle - 标题栏下方内容的样式
 */
/**
 *
 * - 10040新增
 * @typedef {Object} CommonSettingStyle
 * @property {bool} allowFontScaling - 10040新增 设置字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {bool} unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @property {style} titleStyle - 10040新增 CommonSetting中 "通用设置" 字体的样式
 * @property {ItemStyle} itemStyle - 10040新增 CommonSetting中 列表item 的样式
 * @property {object} deleteTextStyle - 10040新增 CommonSetting中 "删除设备" 字体的样式
 * @property {object} moreSettingPageStyle - 10040新增 CommonSetting中 二级页面 更多设置 页面的样式
 * @property {object} titleContainer - 10053新增 CommonSetting中 "通用设置" 所在item的样式
 * @property {object} bottomContainer - 10053新增 CommonSetting中 "删除设备" 所在item的样式
 */
/**
 * @export public
 * @doc_name 通用设置
 * @doc_index 3
 * @doc_directory ui
 * @author Geeook
 * @since 10004
 * @module CommonSetting
 * @description 米家通用设置项
 * @property {array} firstOptions - 一级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项，其中产品百科的配置请参考: https://iot.mi.com/new/doc/direct-access/productcenter/advance-configure#%E9%85%8D%E7%BD%AE%E2%80%9C%E4%BA%A7%E5%93%81%E7%99%BE%E7%A7%91%E2%80%9D
 * @property {array} secondOptions - 二级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项
 * @property {array} showDot - 定义哪些列表项需要显示小红点。为了便于扩展每个列表项都可以显示小红点，默认全部**不显示**，需要显示传入该列表项的key即可。
 * @property {CommonSettingStyle} commonSettingStyle - - 10040新增 CommonSetting 中有关字体样式相关设置
 * @property {object} extraOptions - 其他特殊配置项
 * ```js
 * // extraOptions
 * extraOptions: {
 *   showUpgrade: bool // 「固件升级」是否跳转原生固件升级页面。默认值true。一般来说，wifi设备跳转原生固件升级页面，蓝牙设备（传入bleOtaAuthType除外）不跳转原生固件升级页面
 *   upgradePageKey: string // 「固件升级」如果不跳转原生固件升级页面，请传入想跳转页面的key(定义在 index.js 的 RootStack 中)
 *   licenseUrl: 资源id, // 见 miot/Host.ui.privacyAndProtocolReview 的传参说明，SDK_10023 开始废弃
 *   policyUrl: 资源id, // 见 miot/Host.ui.privacyAndProtocolReview 的传参说明，SDK_10023 开始废弃
 *   deleteDeviceMessage: string // 删除设备的弹窗中自定义提示文案，见 miot/Host.ui.openDeleteDevice 的传参说明
 *   ZXhjbHVkZVJlcXVpcmVkT3B0aW9ucw==: [] // %E5%A6%82%E6%9E%9C%E6%83%B3%E8%A6%81%E5%B1%8F%E8%94%BD%E5%BF%85%E9%80%89%E9%A1%B9%EF%BC%8C%E5%9C%A8%E8%BF%99%E9%87%8C%E4%BC%A0%E5%85%A5%20key%20%E5%8D%B3%E5%8F%AF%EF%BC%8C%E4%B8%80%E7%BA%A7%20or%20%E4%BA%8C%E7%BA%A7%E8%8F%9C%E5%8D%95%E7%9A%84%20key%20%E9%83%BD%E5%8F%AF%E4%BB%A5%E3%80%82%E7%89%B9%E6%AE%8A%E9%9C%80%E8%A6%81%EF%BC%8C%E8%B0%A8%E6%85%8E%E4%BD%BF%E7%94%A8
 *   option: object // 见 miot/Host.ui.previewLegalInformationAuthorization 的传参说明
 *   syncDevice: bool // 插件端设置时区后是否需要后台同步到设备端, 见 miot/Host.ui.openDeviceTimeZoneSettingPage 的传参说明
 *   networkInfoConfig: number // 「更多设置」页面是否显示「网络信息」设置项。0：不显示；1：显示；-1：米家默认配置（蓝牙设备不显示，Wi-Fi设备显示）
 *   bleOtaAuthType: number // 打开通用的蓝牙固件OTA的原生页面。指定设备的协议类型 0: 普通小米蓝牙协议设备(新接入设备已废弃该类型)，1: 安全芯片小米蓝牙设备（比如锁类产品） 4: Standard Auth 标准蓝牙认证协议(通常2019.10.1之后上线的新蓝牙设备) 5: mesh 设备
 *   10059新增
 *   preOperations: object { AllOptions.SHARE: function, AllOptions.FIRMWARE_UPGRADE: function, AllOptions.CREATE_GROUP: function, AllOptions.MANAGE_GROUP: function  } // 打开分享、ota、创建组、编辑组页面的前置操作，只会在resolve中执行打开页面
 * }
 * ```
 * @property {object} navigation - 必须传入当前插件的路由，即 `this.props.navigation`，否则无法跳转二级页面
 * **注意：**
 * **1. 如果需要显示「更多设置」「固件升级」的二级菜单页面，需要从 miot/ui/CommonSetting 中导出 MoreSetting 和 FirmwareUpgrade 页面，**
 *    **并放在项目入口文件index.js的RootStack中。**
 * ```js
 * // index.js snippet
 * import { FirmwareUpgrade, MoreSetting } from "miot/ui/CommonSetting";
 * ...
 * const RootStack = createStackNavigator(
 * {
 *     Setting, // 设置页
 *     MoreSetting, // 二级菜单——更多设置
 *     FirmwareUpgrade, // 二级菜单——固件升级
 * }
 * ...
 * )
 * ```
 * **2. 必须传入当前插件的路由，即 `this.props.navigation`，否则无法跳转二级页面**
 * ```js
 * <CommonSetting
 *   navigation={this.props.navigation}
 * />
 * ```
 * @see com.xiaomi.demo->教程->插件通用设置项
 */
export default class CommonSetting extends React.Component {
  static propTypes = {
    firstOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    showDot: PropTypes.array,
    extraOptions: PropTypes.object,
    navigation: PropTypes.object.isRequired,
    commonSettingStyle: PropTypes.object,
    accessible: AccessibilityPropTypes.accessible,
    firstCustomOptions: PropTypes.array,
    secondCustomOptions: PropTypes.array
  }
  static defaultProps = {
    firstOptions: [
      AllOptions.SHARE,
      // AllOptions.BTGATEWAY,
      // AllOptions.VOICE_AUTH,
      AllOptions.IFTTT,
      AllOptions.FIRMWARE_UPGRADE,
      // AllOptions.CREATE_GROUP,
      // AllOptions.MANAGE_GROUP,
      AllOptions.SECURITY
    ],
    secondOptions: [
      AllOptions.AUTO_UPGRADE,
      AllOptions.TIMEZONE,
      AllOptions.SECURITY,
      AllOptions.USER_EXPERIENCE_PROGRAM
    ],
    showDot: [],
    extraOptions: {}
  }
  getCommonSetting(state) {
    let { modelType, productBaikeUrl, roomInfo, freqFlag, freqCameraFlag, freqCameraNeedShowRedPoint, pluginCategory, multipleKeyisOn, keyNum } = state || {};
    const { preOperations } = this.props.extraOptions;
    if (!modelType) {
      modelType = '  ';
    }
    let ret = {
      [AllOptions.NAME]: {
        title: strings.name,
        value: state.name,
        onPress: () => Host.ui.openChangeDeviceName()
      },
      [AllOptions.LOCATION]: {
        title: strings.location,
        onPress: () => Host.ui.openRoomManagementPage()
      },
      [AllOptions.MEMBER_SET]: {
        title: strings.memberSet,
        onPress: () => {
          if (Package.packageName === 'miot.plugin.spec') {
            Host.ui.openPowerMultikeyPage(Device.deviceID, Device.mac, { useNewSetting: true, done: [] });
          } else {
            Host.ui.openPowerMultikeyPage(Device.deviceID, Device.mac);
          }
        }
      },
      [AllOptions.SHARE]: {
        title: strings.share,
        onPress: () => {
          if (preOperations && preOperations[AllOptions.SHARE] instanceof Function) {
            preOperations[AllOptions.SHARE]().then(() => {
              Host.ui.openShareDevicePage();
            });
          } else {
            Host.ui.openShareDevicePage();
          }
        }
      },
      // [AllOptions.BTGATEWAY]: {
      //   title: strings.btGateway,
      //   onPress: () => Host.ui.openBtGatewayPage()
      // },
      // [AllOptions.VOICE_AUTH]: {
      //   title: strings.voiceAuth,
      //   onPress: () => Host.ui.openVoiceCtrlDeviceAuthPage()
      // },
      [AllOptions.IFTTT]: {
        title: strings.ifttt,
        onPress: () => Service.scene.openIftttAutoPage()
      },
      [AllOptions.PRODUCT_BAIKE]: {
        title: strings.productBaike,
        onPress: () => Host.ui.openProductBaikeWebPage(productBaikeUrl)
      },
      [AllOptions.HELP]: {
        title: strings.helpAndFeedback,
        onPress: () => Host.ui.openHelpPage()
      },
      [AllOptions.FIRMWARE_UPGRADE]: {
        title: strings.firmwareUpgrade,
        onPress: () => {
          if (preOperations && preOperations[AllOptions.FIRMWARE_UPGRADE] instanceof Function) {
            preOperations[AllOptions.FIRMWARE_UPGRADE]().then(() => {
              this.chooseFirmwareUpgrade();
            });
          } else {
            this.chooseFirmwareUpgrade();
          }
        }
      },
      [AllOptions.CREATE_GROUP]: {
        title: strings[`create${ modelType[0].toUpperCase() }${ modelType.slice(1) }Group`],
        onPress: () => {
          if (preOperations && preOperations[AllOptions.CREATE_GROUP] instanceof Function) {
            preOperations[AllOptions.CREATE_GROUP]().then(() => {
              this.createGroup();
            });
          } else {
            this.createGroup();
          }
        }
      },
      [AllOptions.MANAGE_GROUP]: {
        title: strings[`manage${ modelType[0].toUpperCase() }${ modelType.slice(1) }Group`],
        onPress: () => {
          if (preOperations && preOperations[AllOptions.MANAGE_GROUP] instanceof Function) {
            preOperations[AllOptions.MANAGE_GROUP]().then(() => {
              this.manageGroup();
            });
          } else {
            this.manageGroup();
          }
        }
      },
      [AllOptions.MORE]: {
        title: strings.more,
        onPress: () => this.openSubPage('MoreSetting')
      },
      // [AllOptions.LEGAL_INFO]: {
      //   title: strings.legalInfo,
      //   onPress: () => this.privacyAndProtocolReview()
      // }
      [AllOptions.STAND_PLUGIN]: {
        _itemType: 'switch',
        title: strings.switchPlugin,
        value: state.standPlugin === '1' ? false : true,
        onValueChange: (value) => {
          Service.smarthome.batchSetDeviceDatas([
            {
              did: Device.deviceID,
              props: {
                "prop.s_commonsetting_stand_plugin": JSON.stringify({ 'useStandPlugin': value ? '2' : '1' })
              } }
          ]).then(() => {
          });
          let eventName = 'plugin_light_abtest_final';
          let params = { 'uid': Service.account.ID, 'did': Device.deviceID, 'model': Device.model, 'abtestswitch': value ? '1' : '0' };
          Service.smarthome.reportEvent(eventName, params);
          DeviceEventEmitter.emit('MIOT_SDK_COMMONSETTING_STANDPLUGIN_CLICK', value ? '2' : '1');
        }
      },
      [AllOptions.MULTIPLEKEY_SWITCH]: {
        _itemType: 'greenSwitch',
        title: formatString(strings.multipleKeyShowOnHome, keyNum),
        value: multipleKeyisOn,
        onValueChange: (value) => {
          let splitFlag = value ? 'split' : 'merge';
          let splitStr = value ? 'split failed' : 'merge failed';
          let did = Device.deviceID;
          if (splitFlag === 'merge' && Device.extraObj?.split?.parentId) {
            // 拆分时使用did
            // 合并时使用parentid, 若不存在则使用did
            did = Device.extraObj.split.parentId;
          }
          let logPara = { 'type': value ? 1 : 0 };
          Service.smarthome.reportMJFStatLog('multiple_switch_ck', logPara);
          Service.callSmartHomeAPI("/v2/home/device_split_merge", { did: did, pattern: splitFlag }).then(() => {
            let param = { 'did': did, 'splitFlag': value ? 1 : 0 };
            Host.notifyMultikeyStateChanged(param);
            Package.exit();
          }).catch((error) => {
            Service.smarthome.reportLog(Device.model, `Service.smarthome.device_split_merge error: ${ splitStr }`);
            Service.smarthome.reportLog(Device.model, `Service.smarthome.device_split_merge error: ${ JSON.stringify(error) }`);
          });
        }
      },
      [AllOptions.DEFAULT_PLUGIN]: {
        title: strings.defaultPlugin,
        value: choiceIndexArray[pluginCategory].title,
        onPress: () => {
          this.setState({
            dialogVisible: true
          });
          Service.smarthome.reportEvent('expose', { tip: '6.18.1.1.15487' });
        }
      }
    };
    // 常用摄像机(初摩象), 不是摄像机不添加, 避免后面多次判断
    let isCamera = ['camera'].indexOf(modelType) !== -1 && ['mxiang.'].indexOf(Device.model) == -1;
    ret[AllOptions.FREQ_CAMERA] = isCamera ? {
      title: strings.favoriteCamera,
      value: freqCameraNeedShowRedPoint ? "" : freqCameraFlag ? strings.open : strings.close,
      onPress: () => {
        Host.ui.openCommonDeviceSettingPage(1);
        Host.ui.clearFreqCameraNeedShowRedPoint();
        this.removeKeyFromShowDot(AllOptions.FREQ_CAMERA);
      }
    } : null;
    // 常用设备
    ret[AllOptions.FREQ_DEVICE] = roomInfo && roomInfo.data && roomInfo.data.roomId ? {
      title: strings.favoriteDevices,
      value: freqFlag ? strings.open : strings.close,
      onPress: () => Host.ui.openCommonDeviceSettingPage(0)
    } : null;
    // 2020/4/20 锁类和保险箱类，安全设置从更多设置中移出来
    if (['lock', 'safe-box', 'safe'].indexOf(modelType) !== -1) {
      ret[AllOptions.SECURITY] = {
        title: strings.security,
        onPress: () => Host.ui.openSecuritySetting()
      };
    }
    return ret;
  }
  constructor(props, context) {
    super(props, context);
    referenceReport('CommonSetting');
    this.state = {
      name: Device.name,
      showDot: Array.isArray(props.showDot) ? props.showDot : [],
      productBaikeUrl,
      modelType,
      roomInfo,
      freqFlag: false,
      freqCameraFlag: false,
      freqCameraNeedShowRedPoint: false,
      standPlugin: false, // 标准插件设置项的值
      showMultipleKey: false, // 是否展示多键开关
      multipleKeyisOn: false, // 多键开关状态
      keyNum: 0, // 多键开关数量
      pluginCategory: 0,
      hasStdPlugin: false,
      dialogVisible: false,
      needShowUpgradeRedDot: false
    };
    console.log(`Device.type: ${ Device.type }`);
    this.commonSetting = this.getCommonSetting(this.state);
  }
  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ showDot: props.showDot });
  }
  /**
   * @description 点击「法律信息」，传入用户协议和隐私政策的文件地址
   */
  // privacyAndProtocolReview() {
  //   const { licenseUrl, policyUrl, option } = this.props.extraOptions;
  //   if (option === undefined) { // 兼容旧写法
  //     Host.ui.privacyAndProtocolReview('', licenseUrl, '', policyUrl);
  //   } else {
  //     Host.ui.previewLegalInformationAuthorization(option);
  //   }
  // }
  /**
   * @description 点击「固件升级」，选择性跳转
   */
  chooseFirmwareUpgrade() {
    // 默认是wifi设备固件升级的原生页面
    const { showUpgrade, upgradePageKey, bleOtaAuthType } = this.props.extraOptions;
    let { modelType } = this.state;
    Device.needUpgrade = false;
    this.setState({ needShowUpgradeRedDot: false });
    if (showUpgrade === false) {
      // 蓝牙统一OTA界面
      if (upgradePageKey === undefined) {
        if (__DEV__ && console.warn) {
          console.warn('请在 extraOptions.upgradePageKey 中填写你想跳转的固件升级页面, 传给 CommonSetting 组件');
        }
        return;
      }
      if (typeof upgradePageKey !== 'string') {
        if (__DEV__ && console.warn) {
          console.warn('upgradePageKey 必须是字符串, 是你在 index.js 的 RootStack 中定义的页面 key');
        }
        return;
      }
      this.removeKeyFromShowDot(AllOptions.FIRMWARE_UPGRADE);
      this.openSubPage(upgradePageKey, {}); // 跳转到开发者指定页面
      if (__DEV__ && console.warn) {
        console.warn('蓝牙统一OTA界面正在火热开发中');
      }
    } else {
      // 20190516，「固件自动升级」不能做成通用功能所以去掉，
      // 那么二级页面「FirmwareUpgrade」只剩下「检查固件升级」一项，遂藏之
      this.removeKeyFromShowDot(AllOptions.FIRMWARE_UPGRADE);
      if (Device.type === '16') { // mesh device
        Host.ui.openBleMeshDeviceUpgradePage();
      } else if (Device.type === '17' && ['light'].indexOf(modelType) !== -1) {
        // 2019/11/21 新灯组2.0需求
        // 虚拟组设备，跳v2.0固件更新页
        Host.ui.openLightGroupUpgradePage();
      }
      else if ([0, 1, 4, 5].includes(bleOtaAuthType)) {
        Host.ui.openBleCommonDeviceUpgradePage({ auth_type: bleOtaAuthType });
      } else {
        Host.ui.openDeviceUpgradePage(1);
      }
    }
  }
  /**
   * 创建组设备
   */
  createGroup() {
    Host.ui.openMeshDeviceGroupPage('add', Device.deviceID, 2);
  }
  /**
   * 管理组设备
   */
  manageGroup() {
    Host.ui.openMeshDeviceGroupPage('edit', Device.deviceID, 2);
  }
  /**
   * @description 从 this.state.showDot 移除某key，从而隐藏小红点
   * @param {string} key
   */
  removeKeyFromShowDot(key) {
    if (key === AllOptions.FIRMWARE_UPGRADE) {
      firmwareUpgradeDotClicked = true;
    }
    const showDotTmp = [...this.state.showDot];
    const index = showDotTmp.indexOf(key);
    if (index !== -1) {
      showDotTmp.splice(index, 1);
      this.setState({ showDot: showDotTmp });
    } else {
      if (key === AllOptions.FIRMWARE_UPGRADE) {
        this.forceUpdate();
      }
    }
  }
  /**
   * @description 打开二级菜单
   * @param {string} page index.js的RootStack中页面定义的key
   */
  openSubPage(page, params = {
    networkInfoConfig: this.props.extraOptions.networkInfoConfig,
    syncDevice: this.props.extraOptions.syncDevice,
    secondOptions: [...(this.props.firstOptions || []), ...(this.props.secondOptions || [])],
    excludeRequiredOptions: this.props.extraOptions.excludeRequiredOptions,
    extraOptions: this.props.extraOptions,
    secondCustomOptions: this.props.secondCustomOptions || []
  }) {
    let excludeRequiredOptions = params.excludeRequiredOptions || [];
    if (this.props.navigation) {
      this.props.navigation.navigate(page, {
        ...params,
        commonSettingStyle: this.props.commonSettingStyle,
        // 2020/4/20 锁类和保险箱类，去掉更多设置页中的安全设置
        excludeRequiredOptions: (['lock', 'safe-box', 'safe'].indexOf(this.state.modelType) !== -1 && excludeRequiredOptions.indexOf(AllOptions.SECURITY) === -1) ? [...excludeRequiredOptions, AllOptions.SECURITY] : excludeRequiredOptions
      });
    } else {
      if (__DEV__ && console.warn) {
        console.warn("props 'navigation' is required for CommonSetting");
      }
    }
  }
  /**
   * @description 弹出「删除设备」弹窗
   */
  openDeleteDevice() {
    const { deleteDeviceMessage } = this.props.extraOptions;
    Host.ui.openDeleteDevice(deleteDeviceMessage);
  }
  componentDidMount() {
    getProductBaikeUrl().then((productBaikeUrl) => {
      this.commonSetting = this.getCommonSetting({
        ...this.state,
        productBaikeUrl: productBaikeUrl
      });
      this.setState({
        productBaikeUrl
      });
    });
    getModelType().then((modelType) => {
      this.commonSetting = this.getCommonSetting({
        ...this.state,
        modelType
      });
      this.setState({
        modelType
      });
    }).catch(() => { });
    getRoomeInfo().then((roomInfo) => {
      this.commonSetting = this.getCommonSetting({
        ...this.state,
        roomInfo
      });
      this.setState({
        roomInfo
      });
    });
    getMultipleKey().then((supportInfo) => {
      let multipleKeyisOn = false;
      let showMultipleKey = false;
      let keyNum = 0;
      if (supportInfo[Device.deviceID]) {
        let splitInfo = supportInfo[Device.deviceID];
        if (splitInfo.keyNum && splitInfo.keyNum > 0) {
          keyNum = splitInfo.keyNum;
        } else {
          return;
        }
        showMultipleKey = true;
        // 父设备的开关状态从splitFlag取
        multipleKeyisOn = splitInfo.splitFlag === 1 ? true : false;
        if (Device.extraObj?.split?.parentId) {
          // 子设备的只能合并，所以只能为开
          multipleKeyisOn = true;
        }
      }
      this.commonSetting = this.getCommonSetting({
        ...this.state,
        showMultipleKey,
        multipleKeyisOn,
        keyNum
      });
      this.setState({
        showMultipleKey,
        multipleKeyisOn,
        keyNum
      });
    }).catch((err) => {
      Service.smarthome.reportLog(Device.model, `Service.smarthome.device_support_split error: ${ err }`);
    });
    getPluginCategory()
      .then((res) => {
        this.commonSetting = this.getCommonSetting({
          ...this.state,
          hasStdPlugin: res.hasStdPlugin,
          pluginCategory: res.pluginCategory
        });
        this.setState({
          hasStdPlugin: res.hasStdPlugin,
          pluginCategory: res.pluginCategory
        });
      }).catch((err) => {
        console.log(err);
      });
    Service.smarthome.batchGetDeviceDatas([{
      did: Device.deviceID,
      props: ['prop.s_commonsetting_stand_plugin']
    }]).then((res) => {
      let result = res[Device.deviceID];
      let config;
      if (result && result['prop.s_commonsetting_stand_plugin']) {
        config = result['prop.s_commonsetting_stand_plugin'];
      }
      if (config) {
        const useStandPlugin = JSON.parse(config)?.useStandPlugin;
        this.commonSetting = this.getCommonSetting({
          ...this.state,
          standPlugin: useStandPlugin
        });
        this.setState({
          standPlugin: useStandPlugin
        });
      }
    });
    // setTimeout(() => {
    //   this.commonSetting = this.getCommonSetting({
    //     ...this.state,
    //     standPlugin: true
    //   });
    //   this.setState({ standPlugin: true });
    // }, 1000 * 3);
    this._updateFreqFlag();
    this.needUpgradeListener = DeviceEventEmitter.addListener('MH_FirmwareNeedUpdateAlert', (params) => {
      if (Device.type === Device.DEVICE_TYPE.BLUETOOTH_SINGLE_MODEL_DEVICE || Device.type === Device.DEVICE_TYPE.BLE_MESH_DEVICE) {
        return;
      }
      if (params && params.needUpgrade) {
        this.setState({ needShowUpgradeRedDot: true });
      }
    });
  }
  _updateFreqFlag() {
    Device.getFreqFlag().then((freqFlagRes) => {
      let freqFlag = freqFlagRes.data;
      this.commonSetting = this.getCommonSetting({
        ...this.state,
        freqFlag
      });
      this.setState({ freqFlag });
    });
    Device.getFreqCameraFlag().then((freqCameraFlagRes) => {
      let freqCameraFlag = freqCameraFlagRes.data;
      this.commonSetting = this.getCommonSetting({
        ...this.state,
        freqCameraFlag
      });
      this.setState({ freqCameraFlag });
    });
    Host.ui.getFreqCameraNeedShowRedPoint().then((freqCameraNeedShowRedPointRes) => {
      let freqCameraNeedShowRedPoint = freqCameraNeedShowRedPointRes.data;
      this.commonSetting = this.getCommonSetting({
        ...this.state,
        freqCameraNeedShowRedPoint
      });
      this.setState({ freqCameraNeedShowRedPoint });
    });
  }
  _onDialogDismiss() {
    this.setState({
      dialogVisible: false
    });
  }
  render() {
    let { modelType, productBaikeUrl, freqCameraNeedShowRedPoint, showMultipleKey, hasStdPlugin, pluginCategory } = this.state;
    let requireKeys1 = [
      AllOptions.FREQ_CAMERA,
      AllOptions.FREQ_DEVICE,
      AllOptions.NAME,
      AllOptions.LOCATION
    ];
    if (productBaikeUrl) {
      requireKeys1.push(AllOptions.PRODUCT_BAIKE);
    }
    if (showMultipleKey) {
      // 展示多键开关
      requireKeys1.push(AllOptions.MULTIPLEKEY_SWITCH);
    }
    if (hasStdPlugin) {
      requireKeys1.push(AllOptions.DEFAULT_PLUGIN);
    }
    // 创建组设备
    // 蓝牙单模和组设备不能创建
    if (['6', '17'].indexOf(Device.type) === -1 && ['light'].indexOf(modelType) !== -1) {
      requireKeys1.push(AllOptions.CREATE_GROUP);
    }
    // 管理组设备
    if (Device.type === '17' && ['light'].indexOf(modelType) !== -1) {
      requireKeys1.push(AllOptions.MANAGE_GROUP);
    }
    const requireKeys2 = [
      AllOptions.MORE,
      AllOptions.HELP,
      AllOptions.SECURITY
    ];
    // 2. 去掉杂质
    let options = [...(this.props.firstOptions || []), ...(this.props.secondOptions || [])].filter((key) => key && Object.values(AllOptions).includes(key));
    // 3. 去除重复
    options = [...new Set(options)];
    // 4. 拼接必选项和可选项
    let keys = [...requireKeys1, ...options, ...requireKeys2, ...(this.props.firstCustomOptions || [])];
    keys = [...new Set(keys)];
    // 5. 权限控制，如果是共享设备或者家庭设备，需要过滤一下
    if (Device.isOwner === false) {
      keys = keys.filter((key) => firstSharedOptions[key]);
    }
    // 6. 根据设备类型进一步过滤
    keys = keys.filter((key) => !(excludeOptions[key] || []).includes(Device.type));
    // 7. 根据开发者特殊需要，隐藏某些必选项
    const { excludeRequiredOptions } = this.props.extraOptions;
    if (excludeRequiredOptions instanceof Array) {
      keys = keys.filter((key) => !(excludeRequiredOptions || []).includes(key));
    }
    // 4.5 所有设置项顺序固定，20190708 / SDK_10023
    keys.sort((keyA, keyB) => {
      let weightA, weightB;
      if (typeof keyA === 'string') {
        weightA = AllOptionsWeight[keyA] || 0;
      } else {
        weightA = keyA.weight || 0;
      }
      if (typeof keyB === 'string') {
        weightB = AllOptionsWeight[keyB] || 0;
      } else {
        weightB = keyB.weight || 0;
      }
      return weightA - weightB;
    });
    // 8. 根据最终的设置项 keys 渲染数据
    const items = keys.map((key) => {
      if (typeof key !== 'string') {
        const item = key;
        return item;
      }
      const item = this.commonSetting[key];
      if (item) {
        item.showDot = (this.state.showDot || []).includes(key);
        // 如果是固件升级设置项，且开发者没有传入是否显示
        if (key === AllOptions.FIRMWARE_UPGRADE && !item.showDot) {
          item.showDot = (Device.needUpgrade || this.state.needShowUpgradeRedDot) && !firmwareUpgradeDotClicked;
        } else if (key === AllOptions.FREQ_CAMERA && !item.showDot) {
          item.showDot = freqCameraNeedShowRedPoint;
        }
      }
      return item;
    }).filter((item) => {
      return !!item;
    }); // 防空
    let tempCommonSettingStyle = this._getCommonSettingStyle();
    return (
      <View style={styles.container}>
        <View style={[styles.titleContainer, tempCommonSettingStyle.titleContainer]}>
          <Text
            style={[styles.title, tempCommonSettingStyle.titleStyle]}
            allowFontScaling={tempCommonSettingStyle.allowFontScaling}>
            {strings.commonSetting}
          </Text>
        </View>
        {/* <Separator style={{ marginLeft: Styles.common.padding }} /> */}
        {
          items.map((item) => {
            if (!item || !item.title) return null;
            const showSeparator = false;// index !== items.length - 1;
            if (item._itemType === 'greenSwitch') {
              return (
                <ListItemWithSwitch
                  key={item.title}
                  title= {item.title}
                  titleNumberOfLines={0}
                  value= {item.value}
                  onValueChange={item.onValueChange}
                />
              );
            } else if (item._itemType === 'switch') {
              return (
                <ListItemWithSwitch
                  key={item.title}
                  title={item.title || ''}
                  allowFontScaling={tempCommonSettingStyle.itemStyle.allowFontScaling}
                  unlimitedHeightEnable={tempCommonSettingStyle.itemStyle.unlimitedHeightEnable}
                  titleStyle={tempCommonSettingStyle.itemStyle.titleStyle}
                  subtitleStyle={tempCommonSettingStyle.itemStyle.subtitleStyle}
                  valueStyle={tempCommonSettingStyle.itemStyle.valueStyle}
                  dotStyle={tempCommonSettingStyle.itemStyle.dotStyle}
                  titleNumberOfLines={tempCommonSettingStyle.itemStyle.titleNumberOfLines}
                  subtitleNumberOfLines={tempCommonSettingStyle.itemStyle.subtitleNumberOfLines}
                  valueNumberOfLines={tempCommonSettingStyle.itemStyle.valueNumberOfLines}
                  useNewType={tempCommonSettingStyle.itemStyle.useNewType}
                  showDot={item.showDot || false}
                  value={item.value}
                  showSeparator={showSeparator}
                  onValueChange={item.onValueChange}
                  {...getAccessibilityConfig({
                    accessible: this.props.accessible
                  })}
                  containerStyle={tempCommonSettingStyle.itemStyle.containerStyle}
                />
              );
            } else {
              return (
                <ListItem
                  key={item.title}
                  title={item.title || ''}
                  allowFontScaling={tempCommonSettingStyle.itemStyle.allowFontScaling}
                  unlimitedHeightEnable={tempCommonSettingStyle.itemStyle.unlimitedHeightEnable}
                  titleStyle={tempCommonSettingStyle.itemStyle.titleStyle}
                  subtitleStyle={tempCommonSettingStyle.itemStyle.subtitleStyle}
                  valueStyle={tempCommonSettingStyle.itemStyle.valueStyle}
                  dotStyle={tempCommonSettingStyle.itemStyle.dotStyle}
                  titleNumberOfLines={tempCommonSettingStyle.itemStyle.titleNumberOfLines}
                  subtitleNumberOfLines={tempCommonSettingStyle.itemStyle.subtitleNumberOfLines}
                  valueNumberOfLines={tempCommonSettingStyle.itemStyle.valueNumberOfLines}
                  valueMaxWidth={tempCommonSettingStyle.itemStyle.valueMaxWidth}
                  useNewType={tempCommonSettingStyle.itemStyle.useNewType}
                  showDot={item.showDot || false}
                  value={item.value}
                  showSeparator={showSeparator}
                  onPress={item.onPress}
                  {...getAccessibilityConfig({
                    accessible: this.props.accessible
                  })}
                  containerStyle={tempCommonSettingStyle.itemStyle.containerStyle}
                />
              );
            }
          })
        }
        {hasStdPlugin ?
          <ChoiceDialog
            visible={this.state.dialogVisible}
            title={strings.selectDefaultHP}
            useNewType={true}
            dialogStyle={{
              allowFontScaling: true,
              unlimitedHeightEnable: false,
              titleStyle: {
                fontSize: 18
              }
            }}
            buttons={[
              {
                text: strings.cancel
              },
              {
                text: strings.ok,
                callback: (result) => {
                  this.setState({
                    dialogVisible: false
                  });
                  const index = result && result[0];
                  if (pluginCategory === index) {
                    return;
                  }
                  pluginCategory = index;
                  Service.smarthome.reportEvent('click', { plugin_form: index, tip: '6.18.1.1.15488' });
                  let params = { homepage_type: index };
                  Service.smarthome.setHomepageSettings(params);
                  this.commonSetting = this.getCommonSetting({
                    ...this.state,
                    pluginCategory: index
                  });
                  setTimeout(() => {
                    Host.ui.openPluginPage(Device.deviceID, Entrance.Main, {
                      dismiss_current_plug: true,
                      open_plugin_source: 2
                    });
                  }, 300);
                }
              }
            ]}
            options={choiceIndexArray}
            selectedIndexArray={[pluginCategory]}
            onDismiss={() => {
              this._onDialogDismiss();
            }}
          /> : null}
        {/* <Separator /> */}
        {!Device.isFamily ?
          (<View style={[styles.bottomContainer, tempCommonSettingStyle.bottomContainer]} {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityRole: AccessibilityRoles.button
          })}>
            <RkButton
              style={styles.buttonContainer}
              onPress={() => this.openDeleteDevice()}
              activeOpacity={0.8}
            >
              <Text
                style={ [styles.buttonText, FontPrimary, { fontWeight: 'bold' }, tempCommonSettingStyle.deleteTextStyle]}
                allowFontScaling={tempCommonSettingStyle.allowFontScaling}
              >
                {Device.type === '17' && Device.isOwner ? (strings[`delete${ (Device.model || '').split('.')[1][0].toUpperCase() }${ (Device.model || '').split('.')[1].slice(1) }Group`]) : strings.deleteDevice}
              </Text>
            </RkButton>
          </View>) : null}
      </View>
    );
  }
  _getCommonSettingStyle() {
    let style = {
      allowFontScaling: true,
      unlimitedHeightEnable: false,
      titleContainer: {},
      titleStyle: {},
      itemStyle: {
        allowFontScaling: true,
        unlimitedHeightEnable: false,
        titleStyle: null,
        subtitleStyle: null,
        valueStyle: null,
        dotStyle: null,
        titleNumberOfLines: 1,
        subtitleNumberOfLines: 2,
        valueNumberOfLines: 2,
        // valueMaxWidth 这里不设置默认值，直接用ListItem 里的
        // valueMaxWidth: '30%',
        useNewType: false
      },
      bottomContainer: {},
      deleteTextStyle: {}
    };
    if (this.props.commonSettingStyle) {
      if (this.props.commonSettingStyle.hasOwnProperty('allowFontScaling')) {
        style.allowFontScaling = this.props.commonSettingStyle.allowFontScaling;
      }
      if (this.props.commonSettingStyle.hasOwnProperty('unlimitedHeightEnable')) {
        style.unlimitedHeightEnable = this.props.commonSettingStyle.unlimitedHeightEnable;
      }
      if (this.props.commonSettingStyle.hasOwnProperty('titleContainer')) {
        style.titleContainer = this.props.commonSettingStyle.titleContainer;
      }
      if (this.props.commonSettingStyle.hasOwnProperty('titleStyle')) {
        style.titleStyle = this.props.commonSettingStyle.titleStyle;
      }
      if (this.props.commonSettingStyle.hasOwnProperty('itemStyle')) {
        style.itemStyle = this.props.commonSettingStyle.itemStyle;
      }
      if (this.props.commonSettingStyle.hasOwnProperty('bottomContainer')) {
        style.bottomContainer = this.props.commonSettingStyle.bottomContainer;
      }
      if (this.props.commonSettingStyle.hasOwnProperty('deleteTextStyle')) {
        style.deleteTextStyle = this.props.commonSettingStyle.deleteTextStyle;
      }
    }
    style.itemStyle.allowFontScaling = style.allowFontScaling;
    style.itemStyle.unlimitedHeightEnable = style.unlimitedHeightEnable;
    return style;
  }
  UNSAFE_componentWillMount() {
    this._deviceNameChangedListener = DeviceEvent.deviceNameChanged.addListener((device) => {
      // this.state.name = device.name;
      // this.commonSetting = this.getCommonSetting(this.state);
      // this.forceUpdate();
      this.commonSetting = this.getCommonSetting({
        ...this.state,
        name: device.name
      });
      this.setState({
        name: device.name
      });
    });
    this._packageGobackFromNativeListerner = PackageEvent.packageViewWillAppear.addListener(() => {
      this._updateFreqFlag();
    });
  }
  componentWillUnmount() {
    this._deviceNameChangedListener.remove();
    this._packageGobackFromNativeListerner && this._packageGobackFromNativeListerner.remove();
    this.needUpgradeListener && this.needUpgradeListener.remove();
  }
}
const styles = dynamicStyleSheet({
  container: {
    flex: 1
    // backgroundColor: '#fff'
  },
  titleContainer: {
    minHeight: 32,
    backgroundColor: Styles.darkMode.backgroundColor,
    justifyContent: 'center',
    paddingLeft: Styles.common.padding
  },
  title: {
    fontSize: 12,
    color: new DynamicColor('#8C93B0', 'rgba(255,255,255,0.5)'),
    lineHeight: 14,
    textAlign: 'left'
  },
  bottomContainer: {
    minHeight: 90,
    backgroundColor: new DynamicColor('#fff', '#000000'), // Styles.common.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    minHeight: 46,
    borderRadius: 23,
    borderWidth: 0.3,
    borderColor: 'transparent', // 'rgba(0,0,0,0.2)',
    backgroundColor: new DynamicColor('#f5f5f5', '#333333'),
    marginHorizontal: Styles.common.padding
  },
  buttonText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    color: new DynamicColor('#F43F31', '#D92719'),
    lineHeight: 18
  }
});