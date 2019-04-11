'use strict';
import { Device, Host } from "miot";
import { DeviceEvent } from "miot/Device";
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RkButton } from 'react-native-ui-kitten';
import { strings, Styles } from "../../resources";
import ListItem from "../ListItem/ListItem";
import Separator from "../Separator";
const firstOptions = {
  /**
   * 按键设置，多键开关必选，其余设备必不选
   */
  MEMBER_SET: 'memberSet',
  /**
   * 设备共享
   */
  SHARE: 'share',
  /**
   * 蓝牙网关
   */
  BTGATEWAY: 'btGateway',
  /**
   * 语音授权
   */
  VOICE_AUTH: 'voiceAuth',
  /**
   * 智能场景
   */
  IFTTT: 'ifttt',
};
const firstAllOptions = {
  ...firstOptions,
  /**
   * 设备名称，必选
   */
  NAME: 'name',
  /**
   * 位置管理，必选
   */
  LOCATION: 'location',
  /**
   * 使用帮助，必选
   */
  HELP: 'help',
  /**
   * 固件升级，必选
   */
  FIRMWARE_UPGRADE: 'firmwareUpgrade',
  /**
   * 更多设置，必选
   */
  MORE: 'more',
  /**
   * 法律信息，必选
   */
  LEGAL_INFO: 'legalInfo',
}
const secondOptions = {
  /**
   * 固件升级——固件自动升级
   */
  AUTO_UPGRADE: 'autoUpgrade',
  /**
   * 更多设置——设备时区
   */
  TIMEZONE: 'timezone',
  /**
   * 法律信息——加入用户体验计划
   */
  USER_EXPERIENCE_PROGRAM: 'userExperienceProgram',
}
const secondAllOptions = {
  ...secondOptions,
  /**
   * 固件升级——检查固件更新，必选
   */
  CHECK_UPGRADE: 'checkUpgrade',
  /**
   * 更多设置——安全设置，必选
   */
  SECURITY: 'security',
  /**
   * 更多设置——反馈问题，必选
   */
  FEEDBACK: 'feedback',
  /**
   * 更多设置——添加桌面快捷方式，必选
   */
  ADD_TO_DESKTOP: 'addToDesktop',
  /**
   * 法律信息——用户协议，必选
   */
  USER_AGREEMENT: 'userAgreement',
  /**
   * 法律信息——隐私政策，必选
   */
  PRIVACY_POLICY: 'privacyPolicy',
}
export const SETTING_KEYS = {
  // 一级菜单
  first_options: firstOptions,
  // 二级菜单
  second_options: secondOptions
}
export { firstAllOptions, secondAllOptions };
/**
 * @export
 * @author Geeook
 * @since 20190404
 * @module CommonSetting
 * @description 米家通用设置项
 * @property {array} firstOptions - 一级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项
 * @property {array} secondOptions - 二级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项
 * @property {object} extraOptions - 其他特殊配置项
 * ```js
 * {
 *   showUpgrade: bool // 固件升级是否显示二级菜单。默认值true
 *   licenseUrl: 资源id, // 见 miot/Host.ui.privacyAndProtocolReview 的传参说明
 *   policyUrl: 资源id, // 见 miot/Host.ui.privacyAndProtocolReview 的传参说明
 *   deleteDeviceMessage: string // 删除设备的弹窗中自定义提示文案，见 miot/Host.ui.openDeleteDevice 的传参说明
 * }
 * ```
 * **注意：如果需要显示「更多设置」「固件升级」的二级菜单页面，需要从 miot/ui/CommonSetting 中导出 MoreSetting 和 FirmwareUpgrade 页面，**
 * **并放在项目入口文件index.js的RootStack中。**
 * @see com.xiaomi.demo->教程->插件通用设置项
 */
export default class CommonSetting extends React.Component {
  static propTypes = {
    firstOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    extraOptions: PropTypes.object,
  }
  static defaultProps = {
    firstOptions: [
      firstAllOptions.MEMBER_SET,
      firstAllOptions.SHARE,
      firstAllOptions.BTGATEWAY,
      firstAllOptions.VOICE_AUTH,
      firstAllOptions.IFTTT,
    ],
    secondOptions: [
      secondAllOptions.AUTO_UPGRADE,
      secondAllOptions.TIMEZONE,
      secondAllOptions.USER_EXPERIENCE_PROGRAM,
    ]
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
        onPress: _ => console.warn('unavailable temporarily')
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
    }
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: Device.name,
    }
    this.commonSetting = this.getCommonSetting(this.state);
  }
  /**
   * @description 点击「法律信息」，传入用户协议和隐私政策的文件地址
   */
  privacyAndProtocolReview() {
    const { licenseUrl, policyUrl } = this.props.extraOptions || {};
    Host.ui.privacyAndProtocolReview('', licenseUrl, '', policyUrl);
  }
  /**
   * @description 点击「固件升级」，选择性跳转
   */
  chooseFirmwareUpgrade() {
    // 默认是wifi设备固件升级的二级页面
    const { showUpgrade } = this.props.extraOptions || {};
    if (showUpgrade === false) {
      // 蓝牙统一OTA界面
      console.warn('bt dfu ui is unavailable temporarily');
    }
    else {
      // wifi设备固件升级
      this.openSubPage('FirmwareUpgrade');
    }
  }
  /**
   * @description 打开二级菜单
   * @param {string} page index.js的RootStack中页面定义的key
   */
  openSubPage(page) {
    if (this.props.navigation) {
      const params = { secondOptions: this.props.secondOptions };
      this.props.navigation.navigate(page, params);
    } else {
      console.warn("props 'navigation' is required for CommonSetting");
    }
  }
  /**
   * @description 弹出「删除设备」弹窗
   */
  openDeleteDevice() {
    const { deleteDeviceMessage } = this.props.extraOptions || {};
    Host.ui.openDeleteDevice(deleteDeviceMessage);
  }
  render() {
    const requireKeys1 = [firstAllOptions.NAME, firstAllOptions.LOCATION];
    const requireKeys2 = [
      firstAllOptions.FIRMWARE_UPGRADE,
      firstAllOptions.MORE,
      firstAllOptions.HELP,
      firstAllOptions.LEGAL_INFO
    ];
    const keys = [...requireKeys1, ...this.props.firstOptions, ...requireKeys2];
    const items = keys.map(key => {
      if (key !== undefined &&
        this.commonSetting[key] !== undefined) {
        return this.commonSetting[key];
      }
    });
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{strings.commonSetting}</Text>
        </View>
        <Separator style={{ marginLeft: Styles.common.padding }} />
        {
          items.map((item, index) => {
            const showSeparator = index !== items.length - 1;
            return (
              <ListItem
                key={item.title + index}
                title={item.title || ''}
                value={item.value}
                onPress={item.onPress}
                showSeparator={showSeparator}
              />
            )
          })
        }
        <Separator />
        <View style={styles.bottomContainer}>
          <RkButton
            style={styles.buttonContainer}
            contentStyle={styles.buttonText}
            onPress={_ => this.openDeleteDevice()}
            activeOpacity={0.8}
          >{strings.deleteDevice}</RkButton>
        </View>
      </View>
    );
  }
  componentWillMount() {
    this._deviceNameChangedListener = DeviceEvent.deviceNameChanged.addListener((device) => {
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
    paddingLeft: Styles.common.padding,
  },
  title: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.5)',
    lineHeight: 14,
  },
  bottomContainer: {
    height: 90,
    backgroundColor: Styles.common.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    height: 42,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    marginHorizontal: Styles.common.padding,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    // fontFamily: 'MI-LANTING--GBK1-Bold',
    color: '#F43F31',
    lineHeight: 18,
  }
});