'use strict';
import { Device, DeviceEvent, Package, DarkMode } from 'miot';
import Host from 'miot/Host';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { strings, Styles } from '../../resources';
import ListItem from '../ListItem/ListItem';
import NavigationBar from '../NavigationBar';
import Separator from '../Separator';
import { secondAllOptions, SETTING_KEYS, AllOptions, AllOptionsWeight } from "./CommonSetting";
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
import DynamicColor, { dynamicColor } from 'miot/ui/Style/DynamicColor';
import { getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
import {MessageDialog} from "../Dialog";
import I18n from '../../resources/Strings';
/**
 * 分享设备的设置项
 * 0: 不显示
 * 1: 显示
 */
const secondSharedOptions = {
  [secondAllOptions.PLUGIN_VERSION]: 1,
  [secondAllOptions.ADD_TO_DESKTOP]: 1,
  [secondAllOptions.AUTO_UPGRADE]: 1,
  [secondAllOptions.CHECK_UPGRADE]: 1,
  // [secondAllOptions.FEEDBACK]: 1,
  [secondAllOptions.PRIVACY_POLICY]: 1,
  [secondAllOptions.SECURITY]: 0,
  [secondAllOptions.TIMEZONE]: 1,
  [secondAllOptions.VOICE_AUTH]: 0,
  [secondAllOptions.BTGATEWAY]: 0,
  [secondAllOptions.LEGAL_INFO]: 0,
  [secondAllOptions.USER_AGREEMENT]: 1,
  [secondAllOptions.USER_EXPERIENCE_PROGRAM]: 1
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
const { second_options } = SETTING_KEYS;
const NETWORK_INFO = 'networkInfo'; // 「网络信息」设置项的 key
/**
 * @export
 * @author Geeook
 * @since 10004
 * @module MoreSetting
 * @description 二级菜单页面——更多设置
 * @property {array} secondOptions - 二级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项
 */
export default class MoreSetting extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let navigationBarStyle;
    if (navigation.state.params.commonSettingStyle && navigation.state.params.commonSettingStyle.moreSettingPageStyle) {
      navigationBarStyle = navigation.state.params.commonSettingStyle.moreSettingPageStyle.navigationBarStyle;
    }
    if (!navigationBarStyle) {
      navigationBarStyle = {};
      if (DarkMode.getColorScheme() === 'dark') {
        navigationBarStyle.backgroundColor = 'xm#000000';
      }
    }
    return {
      header:
        <NavigationBar
          backgroundColor="#ffffff"
          type={NavigationBar.TYPE.LIGHT}
          left={[{
            key: NavigationBar.ICON.BACK,
            onPress: () => navigation.goBack()
          }]}
          title={strings.more}
          {...navigationBarStyle}
        />
    };
  };
  getMoreSetting(state) {
    const sync_device = !!this.props.navigation.state.params.syncDevice;
    return {
      [secondAllOptions.PLUGIN_VERSION]: {
        title: strings.pluginVersion,
        value: String(Package.version),
        hideArrow: true
      },
      [NETWORK_INFO]: {
        title: strings.networkInfo,
        onPress: () => Host.ui.openDeviceNetworkInfoPage()
      },
      [secondAllOptions.SECURITY]: {
        title: strings.security,
        onPress: () => Host.ui.openSecuritySetting()
      },
      // [secondAllOptions.FEEDBACK]: {
      //   title: strings.feedback,
      //   onPress: () => Host.ui.openFeedbackInput()
      // },
      [secondAllOptions.VOICE_AUTH]: {
        title: strings.voiceAuth,
        onPress: Host.ui.openVoiceCtrlDeviceAuthPage,
        hide: !Device.isVoiceDevice
      },
      [secondAllOptions.BTGATEWAY]: {
        title: strings.btGateway,
        onPress: Host.ui.openBtGatewayPage
      },
      [secondAllOptions.TIMEZONE]: {
        title: strings.timezone,
        value: state.timeZone,
        onPress: () => Host.ui.openDeviceTimeZoneSettingPage({ sync_device })
      },
      [secondAllOptions.LEGAL_INFO]: {
        title: strings.legalInfo,
        onPress: () => this.privacyAndProtocolReview()
      },
      [secondAllOptions.ADD_TO_DESKTOP]: {
        title: strings.addToDesktop,
        onPress: () => Host.ui.openAddToDesktopPage()
      }
    };
  }
  constructor(props, context) {
    super(props, context);
    referenceReport('MoreSetting');
    this.state = {
      showPrivacyDialogState: false,
      timeZone: Device.timeZone || '' // 从未设置过时区的话，为空字符串
    };
    this.secondOptions = this.props.navigation.state.params.secondOptions || [secondAllOptions.SECURITY, secondAllOptions.VOICE_AUTH, secondAllOptions.BTGATEWAY, secondAllOptions.TIMEZONE];
    this.excludeRequiredOptions = this.props.navigation.state.params.excludeRequiredOptions || [];
    this.extraOptions = this.props.navigation.state.params.extraOptions || {};
    this.moreSetting = this.getMoreSetting(this.state);
  }
  privacyAndProtocolReview() {
    let { licenseUrl, policyUrl, option } = this.extraOptions;
    // if (option === undefined) { // 兼容旧写法
    //   Host.ui.privacyAndProtocolReview('', licenseUrl, '', policyUrl);
    // } else {
    //   Host.ui.previewLegalInformationAuthorization(option);
    // }
    if (option === undefined) {
      option = { 'privacyURL': policyUrl || '', 'agreementURL': licenseUrl || '' };
    }
    Host.ui.previewLegalInformationAuthorization(option).then((ok) => {
      if(!ok) {
        this.setState({showPrivacyDialogState: true});
      }
    }).catch((err) => {
      this.setState({showPrivacyDialogState: true});
    });
  }
  UNSAFE_componentWillMount() {
    this._deviceTimeZoneChangedListener = DeviceEvent.deviceTimeZoneChanged.addListener((device) => {
      // this.moreSetting = this.getMoreSetting(this.state);
      // this.forceUpdate();
      this.getDeviceTimeZone();
    });
  }
  componentDidMount() {
    this.getDeviceTimeZone();
  }
  getDeviceTimeZone() {
    Device.getDeviceTimeZone()
      .then((result) => {
        console.log(result);
        // this.state.timeZone = (result || {})['timeZone'] || '';
        // this.moreSetting = this.getMoreSetting(this.state);
        // this.forceUpdate();
        this.moreSetting = this.getMoreSetting({
          ...this.state,
          timeZone: (result || {})['timeZone'] || ''
        });
        this.setState({
          timeZone: (result || {})['timeZone'] || ''
        });
      })
      .catch((error) => console.log(`获取设备时区失败，错误：`, error));
  }
  componentWillUnmount() {
    this._deviceTimeZoneChangedListener.remove();
  }
  render() {
    const requireKeys1 = [secondAllOptions.PLUGIN_VERSION, secondAllOptions.SECURITY];
    // 判断是否显示「网络信息」
    // 1 显示
    // 0 不显示
    // -1 默认配置: wifi 设备显示，其余不显示
    const networkInfoConfig = this.props.navigation.state.params.networkInfoConfig;
    if (networkInfoConfig === 1) requireKeys1.push(NETWORK_INFO);
    else if (networkInfoConfig === -1 || networkInfoConfig === undefined) {
      if (['0', '8'].includes(Device.type)) { // 0 wifi 设备 8 双模设备
        requireKeys1.push(NETWORK_INFO);
      }
    }
    const requireKeys2 = [secondAllOptions.LEGAL_INFO, secondAllOptions.ADD_TO_DESKTOP];
    let options = this.secondOptions.filter((key) => key && Object.values(second_options).includes(key)); // 去掉杂质
    options = [...new Set(options)]; // 去除重复
    let keys = [...requireKeys1, ...options, ...requireKeys2, ...(this.props.navigation.state.params.secondCustomOptions || [])];
    keys = [...new Set(keys)]; // 去重
    if (Device.isOwner === false) {
      keys = keys.filter((key) => secondSharedOptions[key]); // 如果是共享设备或者家庭设备，需要过滤一下
    }
    keys = keys.filter((key) => !this.excludeRequiredOptions.includes(key));
    keys = keys.filter((key) => !(excludeOptions[key] || []).includes(Device.type));
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
    const items = keys.map((key) => {
      if (typeof key !== 'string') {
        const item = key;
        return item;
      }
      return this.moreSetting[key];
    }).filter((item) => {
      return item && !item.hide;
    });
    let itemStyle;
    let containerStyle;
    if (this.props.navigation.state.params.commonSettingStyle && this.props.navigation.state.params.commonSettingStyle.moreSettingPageStyle) {
      itemStyle = this.props.navigation.state.params.commonSettingStyle.moreSettingPageStyle.itemStyle;
      containerStyle = this.props.navigation.state.params.commonSettingStyle.moreSettingPageStyle.containerStyle;
    }
    if (!itemStyle) {
      itemStyle = {};
    }
    if (!containerStyle) {
      containerStyle = {};
    }
    return (
      <View style={[styles.container, containerStyle]}>
        {/* <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={[styles.blank, { borderTopWidth: 0 }]} /> */}
        {
          items.map((item, index) => {
            const showSeparator = false;// index !== items.length - 1;
            return (
              <ListItem
                key={item.title + index}
                title={item.title || ''}
                value={item.value}
                onPress={item.onPress}
                showSeparator={showSeparator}
                hideArrow={item.hideArrow}
                allowFontScaling={itemStyle.allowFontScaling}
                unlimitedHeightEnable={itemStyle.unlimitedHeightEnable}
                titleStyle={itemStyle.titleStyle}
                subtitleStyle={itemStyle.subtitleStyle}
                valueStyle={itemStyle.valueStyle}
                containerStyle={itemStyle.containerStyle}
                dotStyle={itemStyle.dotStyle}
                titleNumberOfLines={itemStyle.titleNumberOfLines}
                subtitleNumberOfLines={itemStyle.subtitleNumberOfLines}
                valueNumberOfLines={itemStyle.valueNumberOfLines}
                useNewType={itemStyle.useNewType}
                {...getAccessibilityConfig({
                  accessible: item.accessible
                })}
              />
            );
          })
        }
        {/* <Separator /> */}
        {/* </ScrollView> */}
        {this.renderPrivacyDialog()}
      </View>
    );
  }
  renderPrivacyDialog(){
    return(
      <View>
        <MessageDialog
          visible = {this.state.showPrivacyDialogState}
          message = {I18n.no_privacy_tip_content}
          messageStyle={{ textAlign: 'center', backgroundColor: 'white' }}
          buttons={[
            {
              style: { color: 'lightpink' },
              callback: (_) => this.setState({ showPrivacyDialogState: false })
            }
          ]}
          onDismiss={(_) => this.onDismiss()}
        />
      </View>
    );
  }
  onDismiss() {
    this.setState({
      showPrivacyDialogState: false
    });
  }
}
const styles = dynamicStyleSheet({
  container: {
    backgroundColor: new DynamicColor('white', '#000'),
    flex: 1
  },
  blank: {
    height: 8,
    backgroundColor: new DynamicColor(Styles.common.backgroundColor, '#000'),
    borderTopColor: Styles.common.hairlineColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Styles.common.hairlineColor,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});