'use strict';
import { Device, DeviceEvent, Package } from 'miot';
import Host from 'miot/Host';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { strings, Styles } from '../../resources';
import ListItem from '../ListItem/ListItem';
import NavigationBar from '../NavigationBar';
import Separator from '../Separator';
import { secondAllOptions, SETTING_KEYS } from "./CommonSetting";
import { getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
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
  [secondAllOptions.USER_AGREEMENT]: 1,
  [secondAllOptions.USER_EXPERIENCE_PROGRAM]: 1
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
        onPress: Host.ui.openVoiceCtrlDeviceAuthPage
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
      timeZone: Device.timeZone || '' // 从未设置过时区的话，为空字符串
    };
    this.secondOptions = this.props.navigation.state.params.secondOptions || [secondAllOptions.SECURITY, secondAllOptions.VOICE_AUTH, secondAllOptions.BTGATEWAY, secondAllOptions.TIMEZONE];
    this.excludeRequiredOptions = this.props.navigation.state.params.excludeRequiredOptions || [];
    this.extraOptions = this.props.navigation.state.params.extraOptions || {};
    this.moreSetting = this.getMoreSetting(this.state);
  }
  privacyAndProtocolReview() {
    const { licenseUrl, policyUrl, option } = this.extraOptions;
    if (option === undefined) { // 兼容旧写法
      Host.ui.privacyAndProtocolReview('', licenseUrl, '', policyUrl);
    } else {
      Host.ui.previewLegalInformationAuthorization(option);
    }
  }
  UNSAFE_componentWillMount() {
    this._deviceTimeZoneChangedListener = DeviceEvent.deviceTimeZoneChanged.addListener((device) => {
      // this.state.timeZone = device.timeZone;
      // this.moreSetting = this.getMoreSetting(this.state);
      // this.forceUpdate();
      this.moreSetting = this.getMoreSetting({
        ...this.state,
        timeZone: device.timeZone
      });
      this.setState({
        timeZone: device.timeZone
      });
    });
  }
  componentDidMount() {
    // android 无法直接获取常量 Device.timeZone
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
    let keys = [...requireKeys1, ...options, ...requireKeys2];
    keys = [...new Set(keys)]; // 去重
    if (Device.isOwner === false) {
      keys = keys.filter((key) => secondSharedOptions[key]); // 如果是共享设备或者家庭设备，需要过滤一下
    }
    keys = keys.filter((key) => !this.excludeRequiredOptions.includes(key));
    const items = keys.map((key) => this.moreSetting[key]).filter((item) => item);
    let itemStyle;
    if (this.props.navigation.state.params.commonSettingStyle && this.props.navigation.state.params.commonSettingStyle.moreSettingPageStyle) {
      itemStyle = this.props.navigation.state.params.commonSettingStyle.moreSettingPageStyle.itemStyle;
    }
    if (!itemStyle) {
      itemStyle = {};
    }
    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={[styles.blank, { borderTopWidth: 0 }]} />
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
                  hideArrow={item.hideArrow}
                  allowFontScaling={itemStyle.allowFontScaling}
                  unlimitedHeightEnable={itemStyle.unlimitedHeightEnable}
                  titleStyle={itemStyle.titleStyle}
                  subtitleStyle={itemStyle.subtitleStyle}
                  valueStyle={itemStyle.valueStyle}
                  dotStyle={itemStyle.dotStyle}
                  titleNumberOfLines={itemStyle.titleNumberOfLines}
                  subtitleNumberOfLines={itemStyle.subtitleNumberOfLines}
                  valueNumberOfLines={itemStyle.valueNumberOfLines}
                  {...getAccessibilityConfig({
                    accessible: item.accessible
                  })}
                />
              );
            })
          }
          <Separator />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.common.backgroundColor,
    flex: 1
  },
  blank: {
    height: 8,
    backgroundColor: Styles.common.backgroundColor,
    borderTopColor: Styles.common.hairlineColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Styles.common.hairlineColor,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});