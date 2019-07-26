import { Device, Host } from 'miot';
import { DeviceEvent } from 'miot/Device';
import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { RkButton } from 'react-native-ui-kitten';
import { strings, Styles } from '../../resources';
import ListItem from '../ListItem/ListItem';
import Separator from '../Separator';
const firstOptions = {
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
};
const firstAllOptions = {
  ...firstOptions,
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
   * 法律信息，`必选`
   */
  LEGAL_INFO: 'legalInfo'
};
/**
 * 分享设备的设置项
 * 0: 不显示
 * 1: 显示
 */
const firstSharedOptions = {
  [firstAllOptions.NAME]: 0,
  [firstAllOptions.MEMBER_SET]: 0,
  [firstAllOptions.LOCATION]: 0,
  [firstAllOptions.SHARE]: 0,
  [firstAllOptions.BTGATEWAY]: 0,
  [firstAllOptions.VOICE_AUTH]: 0,
  [firstAllOptions.IFTTT]: 0,
  [firstAllOptions.FIRMWARE_UPGRADE]: 0,
  [firstAllOptions.MORE]: 1,
  [firstAllOptions.HELP]: 1,
  [firstAllOptions.LEGAL_INFO]: 0, // 20190516，分享设备不显示「法律信息」
};
/**
 * 20190708 / SDK_10023
 * 所有设置项顺序固定
 * 权重值越大，排序越靠后，为了可扩展性，权重不能依次递增+1
 */
const firstAllOptionsWeight = {
  [firstAllOptions.NAME]: 0,
  [firstAllOptions.MEMBER_SET]: 3,
  [firstAllOptions.LOCATION]: 6,
  [firstAllOptions.SHARE]: 9,
  [firstAllOptions.BTGATEWAY]: 12,
  [firstAllOptions.VOICE_AUTH]: 15,
  [firstAllOptions.IFTTT]: 18,
  [firstAllOptions.FIRMWARE_UPGRADE]: 21,
  [firstAllOptions.MORE]: 24,
  [firstAllOptions.HELP]: 27,
  [firstAllOptions.LEGAL_INFO]: 30
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
  [firstAllOptions.NAME]: [],
  [firstAllOptions.MEMBER_SET]: [],
  [firstAllOptions.LOCATION]: [],
  [firstAllOptions.SHARE]: [],
  [firstAllOptions.BTGATEWAY]: [],
  [firstAllOptions.VOICE_AUTH]: [],
  [firstAllOptions.IFTTT]: [],
  [firstAllOptions.FIRMWARE_UPGRADE]: [],
  [firstAllOptions.MORE]: [],
  [firstAllOptions.HELP]: [],
  [firstAllOptions.LEGAL_INFO]: ['5', '15', '17'] // 新增策略：灯组、红外遥控器等虚拟设备不显示法律信息，20190619
};
const secondOptions = {
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
const secondAllOptions = {
  ...secondOptions,
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
export const SETTING_KEYS = {
  // 一级菜单
  first_options: firstOptions,
  // 二级菜单
  second_options: secondOptions
};
export { firstAllOptions, secondAllOptions };
/**
 * @export public
 * @doc_name 通用设置
 * @doc_index 25
 * @author Geeook
 * @since 10004
 * @module CommonSetting
 * @description 米家通用设置项
 * @property {array} firstOptions - 一级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项
 * @property {array} secondOptions - 二级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项
 * @property {array} showDot - 定义哪些列表项需要显示小红点。为了便于扩展每个列表项都可以显示小红点，默认全部**不显示**，需要显示传入该列表项的key即可。
 * @property {object} extraOptions - 其他特殊配置项
 * ```js
 * // extraOptions
 * extraOptions: {
 *   showUpgrade: bool // 「固件升级」是否跳转原生固件升级页面。默认值true。一般来说，wifi设备跳转原生固件升级页面，蓝牙设备不跳转原生固件升级页面
 *   upgradePageKey: string // 「固件升级」如果不跳转原生固件升级页面，请传入想跳转页面的key(定义在 index.js 的 RootStack 中)
 *   licenseUrl: 资源id, // 见 miot/Host.ui.privacyAndProtocolReview 的传参说明，SDK_10023 开始废弃
 *   policyUrl: 资源id, // 见 miot/Host.ui.privacyAndProtocolReview 的传参说明，SDK_10023 开始废弃
 *   deleteDeviceMessage: string // 删除设备的弹窗中自定义提示文案，见 miot/Host.ui.openDeleteDevice 的传参说明
 *   ZXhjbHVkZVJlcXVpcmVkT3B0aW9ucw==: [] // %E5%A6%82%E6%9E%9C%E6%83%B3%E8%A6%81%E5%B1%8F%E8%94%BD%E5%BF%85%E9%80%89%E9%A1%B9%EF%BC%8C%E5%9C%A8%E8%BF%99%E9%87%8C%E4%BC%A0%E5%85%A5%20key%20%E5%8D%B3%E5%8F%AF%EF%BC%8C%E4%B8%80%E7%BA%A7%20or%20%E4%BA%8C%E7%BA%A7%E8%8F%9C%E5%8D%95%E7%9A%84%20key%20%E9%83%BD%E5%8F%AF%E4%BB%A5%E3%80%82%E7%89%B9%E6%AE%8A%E9%9C%80%E8%A6%81%EF%BC%8C%E8%B0%A8%E6%85%8E%E4%BD%BF%E7%94%A8
 *   option: object // 见 miot/Host.ui.previewLegalInformationAuthorization 的传参说明
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
    navigation: PropTypes.object.isRequired
  }
  static defaultProps = {
    firstOptions: [
      firstAllOptions.MEMBER_SET,
      firstAllOptions.SHARE,
      firstAllOptions.BTGATEWAY,
      firstAllOptions.VOICE_AUTH,
      firstAllOptions.IFTTT,
      firstAllOptions.FIRMWARE_UPGRADE
    ],
    secondOptions: [
      secondAllOptions.AUTO_UPGRADE,
      secondAllOptions.TIMEZONE,
      secondAllOptions.USER_EXPERIENCE_PROGRAM
    ],
    showDot: [],
    extraOptions: {},
  }
  getCommonSetting(state) {
    return {
      [firstAllOptions.NAME]: {
        title: strings.name,
        value: state.name,
        onPress: _ => Host.ui.openChangeDeviceName()
      },
      [firstAllOptions.LOCATION]: {
        title: strings.location,
        onPress: _ => Host.ui.openRoomManagementPage()
      },
      [firstAllOptions.MEMBER_SET]: {
        title: strings.memberSet,
        onPress: _ => Host.ui.openPowerMultikeyPage(Device.deviceID, Device.mac)
      },
      [firstAllOptions.SHARE]: {
        title: strings.share,
        onPress: _ => Host.ui.openShareDevicePage()
      },
      [firstAllOptions.BTGATEWAY]: {
        title: strings.btGateway,
        onPress: _ => Host.ui.openBtGatewayPage()
      },
      [firstAllOptions.VOICE_AUTH]: {
        title: strings.voiceAuth,
        onPress: _ => Host.ui.openVoiceCtrlDeviceAuthPage()
      },
      [firstAllOptions.IFTTT]: {
        title: strings.ifttt,
        onPress: _ => Host.ui.openIftttAutoPage()
      },
      [firstAllOptions.HELP]: {
        title: strings.help,
        onPress: _ => Host.ui.openHelpPage()
      },
      [firstAllOptions.FIRMWARE_UPGRADE]: {
        title: strings.firmwareUpgrade,
        onPress: _ => this.chooseFirmwareUpgrade()
      },
      [firstAllOptions.MORE]: {
        title: strings.more,
        onPress: _ => this.openSubPage('MoreSetting')
      },
      [firstAllOptions.LEGAL_INFO]: {
        title: strings.legalInfo,
        onPress: _ => this.privacyAndProtocolReview()
      }
    };
  }
  constructor(props, context) {
    super(props, context);
    this.state = { name: Device.name };
    console.log(`Device.type: ${Device.type}`);
    this.commonSetting = this.getCommonSetting(this.state);
  }
  /**
   * @description 点击「法律信息」，传入用户协议和隐私政策的文件地址
   */
  privacyAndProtocolReview() {
    const { licenseUrl, policyUrl, option } = this.props.extraOptions;
    if (option === undefined) { // 兼容旧写法
      Host.ui.privacyAndProtocolReview('', licenseUrl, '', policyUrl);
    }
    else {
      Host.ui.previewLegalInformationAuthorization(option);
    }
  }
  /**
   * @description 点击「固件升级」，选择性跳转
   */
  chooseFirmwareUpgrade() {
    // 默认是wifi设备固件升级的原生页面
    const { showUpgrade, upgradePageKey } = this.props.extraOptions;
    if (showUpgrade === false) {
      // 蓝牙统一OTA界面
      if (upgradePageKey === undefined) {
        console.warn('请在 extraOptions.upgradePageKey 中填写你想跳转的固件升级页面, 传给 CommonSetting 组件');
        return;
      }
      if (typeof upgradePageKey !== 'string') {
        console.warn('upgradePageKey 必须是字符串, 是你在 index.js 的 RootStack 中定义的页面 key');
        return;
      }
      this.openSubPage(upgradePageKey, {}); // 跳转到开发者指定页面
      console.warn('蓝牙统一OTA界面正在火热开发中');
    }
    else {
      // wifi设备固件升级
      // this.openSubPage('FirmwareUpgrade');
      // 20190516，「固件自动升级」不能做成通用功能所以去掉，
      // 那么二级页面「FirmwareUpgrade」只剩下「检查固件升级」一项，遂藏之
      Host.ui.openDeviceUpgradePage();
    }
  }
  /**
   * @description 打开二级菜单
   * @param {string} page index.js的RootStack中页面定义的key
   */
  openSubPage(page, params = { secondOptions: this.props.secondOptions, excludeRequiredOptions: this.props.extraOptions.excludeRequiredOptions }) {
    if (this.props.navigation) {
      this.props.navigation.navigate(page, params);
    }
    else {
      console.warn("props 'navigation' is required for CommonSetting");
    }
  }
  /**
   * @description 弹出「删除设备」弹窗
   */
  openDeleteDevice() {
    const { deleteDeviceMessage } = this.props.extraOptions;
    Host.ui.openDeleteDevice(deleteDeviceMessage);
  }
  render() {
    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    let fontFamily = {};
    if (Platform.OS === 'android') fontFamily = { fontFamily: 'Kmedium' }
    // 1. 装填必选项
    const requireKeys1 = [firstAllOptions.NAME, firstAllOptions.LOCATION];
    const requireKeys2 = [
      firstAllOptions.MORE,
      firstAllOptions.HELP,
      firstAllOptions.LEGAL_INFO
    ];
    // 2. 去掉杂质
    let options = this.props.firstOptions.filter(key => key && Object.values(firstOptions).includes(key));
    // 3. 去除重复
    options = [...new Set(options)];
    // 4. 拼接必选项和可选项
    let keys = [...requireKeys1, ...options, ...requireKeys2];
    // 4.5 所有设置项顺序固定，20190708 / SDK_10023
    keys.sort((keyA, keyB) => firstAllOptionsWeight[keyA] - firstAllOptionsWeight[keyB]);
    // 5. 权限控制，如果是共享设备或者家庭设备，需要过滤一下
    if (Device.isOwner === false) {
      keys = keys.filter(key => firstSharedOptions[key]);
    }
    // 6. 根据设备类型进一步过滤
    keys = keys.filter(key => !excludeOptions[key].includes(Device.type));
    // 7. %E6%A0%B9%E6%8D%AE%E5%BC%80%E5%8F%91%E8%80%85%E7%89%B9%E6%AE%8A%E9%9C%80%E8%A6%81%EF%BC%8C%E9%9A%90%E8%97%8F%E6%9F%90%E4%BA%9B%E5%BF%85%E9%80%89%E9%A1%B9
    const { excludeRequiredOptions } = this.props.extraOptions;
    if (excludeRequiredOptions instanceof Array) {
      keys = keys.filter(key => !excludeRequiredOptions.includes(key));
    }
    // 8. 根据最终的设置项 keys 渲染数据
    const items = keys.map(key => {
      const item = this.commonSetting[key];
      if (item) {
        item.showDot = (this.props.showDot || []).includes(key);
      }
      return item;
    }).filter(item => item); // 防空
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{strings.commonSetting}</Text>
        </View>
        <Separator style={{ marginLeft: Styles.common.padding }} />
        {
          items.map((item, index) => {
            if (!item) return null;
            const showSeparator = index !== items.length - 1;
            return (
              <ListItem
                key={item.title}
                title={item.title || ''}
                showDot={item.showDot || false}
                value={item.value}
                onPress={item.onPress}
                showSeparator={showSeparator}
              />
            );
          })
        }
        <Separator />
        <View style={styles.bottomContainer}>
          <RkButton
            style={styles.buttonContainer}
            onPress={_ => this.openDeleteDevice()}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, fontFamily]}>
              {strings.deleteDevice}
            </Text>
          </RkButton>
        </View>
      </View>
    );
  }
  componentWillMount() {
    this._deviceNameChangedListener = DeviceEvent.deviceNameChanged.addListener(device => {
      this.state.name = device.name;
      this.commonSetting = this.getCommonSetting(this.state);
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this._deviceNameChangedListener.remove();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titleContainer: {
    height: 32,
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
    height: 90,
    backgroundColor: Styles.common.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    height: 42,
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