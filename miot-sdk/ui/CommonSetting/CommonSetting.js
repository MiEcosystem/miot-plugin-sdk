import { Device, Host, DeviceEvent, Service } from 'miot';
// import {Device,DeviceEvent} from 'miot'
// import {Host} from 'miot';
import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { RkButton } from 'react-native-ui-kitten';
import { strings, Styles } from '../../resources';
import ListItem from '../ListItem/ListItem';
import Separator from '../Separator';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
let modelType = '';
function getModelType() {
  return new Promise((resolve) => {
    if (modelType) {
      resolve(modelType);
      return;
    }
    Service.spec.getSpecString(Device.deviceID).then((instance) => {
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
getModelType().then(() => { }).catch(() => { });
// 2020/02/04 灯组2.0需求，去掉cn的判断
// let countryCode = '';
// function getCountryCode() {
//   return new Promise((resolve, reject) => {
//     if (countryCode) {
//       resolve(countryCode);
//       return;
//     }
//     Service.getServerName().then(({ countryCode }) => {
//       countryCode = (countryCode || '').toLowerCase();
//       resolve(countryCode);
//     }).catch(reject);
//   });
// }
// getCountryCode().then(() => { }).catch(() => { });
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
  MANAGE_GROUP: 'manageGroup'
};
const firstAllOptionsInner = {
  ...firstOptionsInner,
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
  PRIVACY_POLICY: 'privacyPolicy'
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
  [AllOptions.LEGAL_INFO]: 0 // 20190516，分享设备不显示「法律信息」
};
/**
 * 20190708 / SDK_10023
 * 所有设置项顺序固定
 * 权重值越大，排序越靠后，为了可扩展性，权重不能依次递增+1
 */
const firstAllOptionsWeight = {
  [AllOptions.NAME]: 0,
  [AllOptions.CREATE_GROUP]: 1,
  [AllOptions.MANAGE_GROUP]: 1,
  [AllOptions.MEMBER_SET]: 3,
  [AllOptions.LOCATION]: 6,
  [AllOptions.SHARE]: 9,
  // [AllOptions.BTGATEWAY]: 12,
  // [AllOptions.VOICE_AUTH]: 15,
  [AllOptions.IFTTT]: 18,
  [AllOptions.FIRMWARE_UPGRADE]: 21,
  [AllOptions.HELP]: 24,
  [AllOptions.MORE]: 27,
  [AllOptions.SECURITY]: 28
  // [AllOptions.LEGAL_INFO]: 30
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
 * @property {number} valueNumberOfLines - 10040新增 设置value字体显示的最大行数 默认为1
 */
/**
 * MoreSettingPageStyle - 10040新增 二级页面 更多设置 页面的样式
 * @typedef {Object} MoreSettingPageStyle
 * @property {style} navigationBarStyle - 标题的自定义样式 -可参考 NavigationBar 样式
 * @property {ItemStyle} itemStyle - 列表中 item样式
 */
/**
 * CommonSettingStyle - 10040新增
 * @typedef {Object} CommonSettingStyle
 * @property {bool} allowFontScaling - 10040新增 设置字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {bool} unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @property {style} titleStyle - 10040新增 CommonSetting中 "通用设置" 字体的样式
 * @property {ItemStyle} itemStyle - 10040新增 CommonSetting中 列表item 的样式
 * @property {object} deleteTextStyle - 10040新增 CommonSetting中 "删除设备" 字体的样式
 * @property {object} moreSettingPageStyle - 10040新增 CommonSetting中 二级页面 更多设置 页面的样式
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
 * @property {array} firstOptions - 一级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项
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
    accessible: AccessibilityPropTypes.accessible
  }
  static defaultProps = {
    firstOptions: [
      AllOptions.SHARE,
      AllOptions.BTGATEWAY,
      AllOptions.VOICE_AUTH,
      AllOptions.IFTTT,
      AllOptions.FIRMWARE_UPGRADE,
      // AllOptions.CREATE_GROUP,
      // AllOptions.MANAGE_GROUP,
      AllOptions.AUTO_UPGRADE,
      AllOptions.TIMEZONE,
      AllOptions.SECURITY,
      AllOptions.USER_EXPERIENCE_PROGRAM
    ],
    secondOptions: [
      AllOptions.SHARE,
      AllOptions.BTGATEWAY,
      AllOptions.VOICE_AUTH,
      AllOptions.IFTTT,
      AllOptions.FIRMWARE_UPGRADE,
      // AllOptions.CREATE_GROUP,
      // AllOptions.MANAGE_GROUP,
      AllOptions.AUTO_UPGRADE,
      AllOptions.TIMEZONE,
      AllOptions.SECURITY,
      AllOptions.USER_EXPERIENCE_PROGRAM
    ],
    showDot: [],
    extraOptions: {}
  }
  getCommonSetting(state) {
    let { modelType } = state || {};
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
        onPress: () => Host.ui.openPowerMultikeyPage(Device.deviceID, Device.mac)
      },
      [AllOptions.SHARE]: {
        title: strings.share,
        onPress: () => Host.ui.openShareDevicePage()
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
        onPress: () => Host.ui.openIftttAutoPage()
      },
      [AllOptions.HELP]: {
        title: strings.helpAndFeedback,
        onPress: () => Host.ui.openHelpPage()
      },
      [AllOptions.FIRMWARE_UPGRADE]: {
        title: strings.firmwareUpgrade,
        onPress: () => this.chooseFirmwareUpgrade()
      },
      [AllOptions.CREATE_GROUP]: {
        title: strings[`create${ modelType[0].toUpperCase() }${ modelType.slice(1) }Group`],
        onPress: () => this.createGroup()
      },
      [AllOptions.MANAGE_GROUP]: {
        title: strings[`manage${ modelType[0].toUpperCase() }${ modelType.slice(1) }Group`],
        onPress: () => this.manageGroup()
      },
      [AllOptions.MORE]: {
        title: strings.more,
        onPress: () => this.openSubPage('MoreSetting')
      }
      // [AllOptions.LEGAL_INFO]: {
      //   title: strings.legalInfo,
      //   onPress: () => this.privacyAndProtocolReview()
      // }
    };
    // 2020/4/20 锁类和保险箱类，安全设置从更多设置中移出来
    if (['lock', 'safe-box'].indexOf(modelType) !== -1) {
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
      // countryCode,
      modelType
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
      // wifi设备固件升级
      // this.openSubPage('FirmwareUpgrade');
      // 20190516，「固件自动升级」不能做成通用功能所以去掉，
      // 那么二级页面「FirmwareUpgrade」只剩下「检查固件升级」一项，遂藏之
      this.removeKeyFromShowDot(AllOptions.FIRMWARE_UPGRADE);
      if (Device.type === '16') { // mesh device
        Host.ui.openBleMeshDeviceUpgradePage();
      } else if (Device.type === '17' && ['light'].indexOf(modelType) !== -1) {
        // 2019/11/21 新灯组2.0需求
        // 虚拟组设备，跳v2.0固件更新页
        Host.ui.openLightGroupUpgradePage();
      } else if ([0, 1, 4, 5].includes(bleOtaAuthType)) {
        Host.ui.openBleCommonDeviceUpgradePage({ auth_type: bleOtaAuthType });
      } else {
        Host.ui.openDeviceUpgradePage();
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
    extraOptions: this.props.extraOptions
  }) {
    let excludeRequiredOptions = params.excludeRequiredOptions || [];
    if (this.props.navigation) {
      this.props.navigation.navigate(page, {
        ...params,
        commonSettingStyle: this.props.commonSettingStyle,
        // 2020/4/20 锁类和保险箱类，去掉更多设置页中的安全设置
        excludeRequiredOptions: (['lock', 'safe-box'].indexOf(this.state.modelType) !== -1 && excludeRequiredOptions.indexOf(AllOptions.SECURITY) === -1) ? [...excludeRequiredOptions, AllOptions.SECURITY] : excludeRequiredOptions
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
    // getCountryCode().then(countryCode => {
    //   this.setState({
    //     countryCode
    //   });
    // }).catch(() => { });
    getModelType().then((modelType) => {
      this.commonSetting = this.getCommonSetting({
        ...this.state,
        modelType
      });
      this.setState({
        modelType
      });
    }).catch(() => { });
  }
  render() {
    let { modelType } = this.state;
    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    let fontFamily = {};
    if (Platform.OS === 'android') fontFamily = { fontFamily: 'Kmedium' };
    let requireKeys1 = [AllOptions.NAME, AllOptions.LOCATION];
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
      AllOptions.HELP
    ];
    // 2. 去掉杂质
    let options = [...(this.props.firstOptions || []), ...(this.props.secondOptions || [])].filter((key) => key && Object.values(AllOptions).includes(key));
    // 3. 去除重复
    options = [...new Set(options)];
    // 4. 拼接必选项和可选项
    let keys = [...requireKeys1, ...options, ...requireKeys2];
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
      return (firstAllOptionsWeight[keyA] || 0) - (firstAllOptionsWeight[keyB] || 0);
    });
    // 8. 根据最终的设置项 keys 渲染数据
    const items = keys.map((key) => {
      const item = this.commonSetting[key];
      if (item) {
        item.showDot = (this.state.showDot || []).includes(key);
        // 如果是固件升级设置项，且开发者没有传入是否显示
        if (key === AllOptions.FIRMWARE_UPGRADE && !item.showDot) {
          item.showDot = Device.needUpgrade;
        }
      }
      return item;
    }).filter((item) => {
      return !!item;
    }); // 防空
    let tempCommonSettingStyle = this._getCommonSettingStyle();
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, tempCommonSettingStyle.titleStyle]}
            allowFontScaling={tempCommonSettingStyle.allowFontScaling}>
            {strings.commonSetting}
          </Text>
        </View>
        <Separator style={{ marginLeft: Styles.common.padding }} />
        {
          items.map((item, index) => {
            if (!item || !item.title) return null;
            const showSeparator = index !== items.length - 1;
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
                showDot={item.showDot || false}
                value={item.value}
                onPress={item.onPress}
                showSeparator={showSeparator}
                {...getAccessibilityConfig({
                  accessible: this.props.accessible
                })}
              />
            );
          })
        }
        <Separator />
        {!Device.isFamily ?
          (<View style={styles.bottomContainer} {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityRole: AccessibilityRoles.button
          })}>
            <RkButton
              style={styles.buttonContainer}
              onPress={() => this.openDeleteDevice()}
              activeOpacity={0.8}
            >
              <Text
                style={[styles.buttonText, fontFamily, tempCommonSettingStyle.deleteTextStyle]}
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
        valueNumberOfLines: 1
      },
      deleteTextStyle: {}
    };
    if (this.props.commonSettingStyle) {
      if (this.props.commonSettingStyle.hasOwnProperty('allowFontScaling')) {
        style.allowFontScaling = this.props.commonSettingStyle.allowFontScaling;
      }
      if (this.props.commonSettingStyle.hasOwnProperty('unlimitedHeightEnable')) {
        style.unlimitedHeightEnable = this.props.commonSettingStyle.unlimitedHeightEnable;
      }
      if (this.props.commonSettingStyle.hasOwnProperty('titleStyle')) {
        style.titleStyle = this.props.commonSettingStyle.titleStyle;
      }
      if (this.props.commonSettingStyle.hasOwnProperty('itemStyle')) {
        style.itemStyle = this.props.commonSettingStyle.itemStyle;
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
  }
  componentWillUnmount() {
    this._deviceNameChangedListener.remove();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: '#fff'
  },
  titleContainer: {
    minHeight: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: Styles.common.padding
  },
  title: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.5)',
    lineHeight: 14
  },
  bottomContainer: {
    minHeight: 90,
    backgroundColor: Styles.common.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    minHeight: 55,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    marginHorizontal: Styles.common.padding
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    // fontFamily: 'MI-LANTING--GBK1-Bold',
    flex: 1,
    textAlign: 'center',
    color: '#F43F31',
    lineHeight: 18
  }
});