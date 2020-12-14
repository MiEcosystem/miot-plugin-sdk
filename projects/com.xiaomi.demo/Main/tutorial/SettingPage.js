'use strict';

import { Service } from "miot";
import { strings, Styles } from 'miot/resources';
import { SETTING_KEYS } from "miot/ui/CommonSetting";
import CommonSettingPage from "miot/ui/CommonSetting/CommonSettingPage";
import Separator from 'miot/ui/Separator';
import NavigationBar from 'miot/ui/NavigationBar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Logger from '../Logger';

const { first_options, second_options } = SETTING_KEYS;

class CustomComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func
  };
  static defaultProps = {
    title: '自定义组件',
    onPress: () => { }
  };

  render() {
    const { title, onPress } = this.props;
    return (
      <View style={{
        paddingHorizontal: Styles.common.padding,
        backgroundColor: '#f00'
      }}>
        <TouchableOpacity style={{
          height: 50,
          justifyContent: 'center'
        }} onPress={onPress}>
          <Text>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default class Setting extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.props.navigation.setParams({
      title: strings.setting
    });
    this.state = {
      sliderValue: 25,
      switchValue: false,
      showDot: []
    };
    Logger.trace(this);
  }

  gotoSecretPage() {
    this.props.navigation.navigate('ServiceDemo', { title: '接口服务(Service)' });
  }

  render() {
    // 显示部分一级菜单项
    const firstOptions = [
      first_options.FIRMWARE_UPGRADE,
      first_options.VOICE_AUTH,
      first_options.SHARE,
      first_options.BTGATEWAY,
      first_options.IFTTT,
      first_options.MEMBER_SET,
      first_options.BTGATEWAY
    ];
    // 显示部分二级菜单项
    const secondOptions = [
      // second_options.AUTO_UPGRADE,
      second_options.TIMEZONE
    ];
    // 显示固件升级二级菜单
    const extraOptions = {
      showUpgrade: true,
      // upgradePageKey: 'FirmwareUpgrade',
      // licenseUrl: require('../resources/html/license_zh.html'),
      // policyUrl: require('../resources/html/privacy_zh.html'),
      deleteDeviceMessage: 'test',
      excludeRequiredOptions: [],
      option: {
        privacyURL: require('../../Resources/raw/privacy_zh.html'),
        agreementURL: require('../../Resources/raw/license_zh.html'),
        experiencePlanURL: '',
        hideAgreement: true
      },
      syncDevice: true,
      // networkInfoConfig: -1,
      bleOtaAuthType: 5
    };

    const firstCustomOption = [{
      title: '设置页自定义页面 - 可以跳转自定义设置页',
      weight: 5,
      onPress: () => {
        Service.scene.openIftttAutoPage();
      },
      showDot: true
    }];

    const secondCustomOption = [{
      title: '更多设置页自定义页面 - 可以跳转自定义设置页',
      hideArrow: true,
      onPress: () => {
        this.gotoSecretPage();
      },
      // 权重可自己调节，以便确定此项停留在设置页的位置，支持小数
      weight: 13
    }];

    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={[styles.blank, { borderTopWidth: 0 }]} />
          <CommonSettingPage
            navigation={this.props.navigation}
            customSetting={{}}
            commonSetting={{
              firstOptions,
              showDot: this.state.showDot,
              secondOptions,
              extraOptions,
              firstCustomOptions: firstCustomOption,
              secondCustomOptions: secondCustomOption
            }}
          />
          <View style={{ height: 30 }} />
          <CommonSettingPage
            navigation={this.props.navigation}
            customSetting={{
              options: [{
                component: 'ListItem',
                props: {
                  title: 'ListItem',
                  onPress: () => { console.log('CommonSettingPage ListItem pressed'); }
                }
              }, {
                component: CustomComponent,
                props: {
                  title: 'CustomComponentTitle 自定义组件',
                  onPress: () => { console.log('CommonSettingPage CustomComponent pressed'); }
                }
              }, {
                component: 'ListItemWithSwitch',
                props: {
                  title: 'ListItemWithSwitch',
                  value: false,
                  onValueChange: (v) => { console.log('CommonSettingPage ListItemWithSwitch switched: ', v); }
                }
              }, {
                component: 'ListItemWithSlider',
                props: {
                  title: 'ListItemWithSlider',
                  sliderProps: { value: this.state.sliderValue },
                  onSlidingComplete: (v) => this.onSlidingComplete(v),
                  onValueChange: (v) => console.log(v)
                }
              }]
            }}
            commonSetting={{
              firstOptions,
              showDot: this.state.showDot,
              secondOptions,
              extraOptions,
              firstCustomOptions: firstCustomOption,
              secondCustomOptions: secondCustomOption
            }}
          />
        </ScrollView>
      </View>
    );
  }

  onValueChange(value) {
    console.log(value);
  }

  onSlidingComplete(value) {
    console.log(value);
  }

  componentDidMount() {
    // TODO: 拉取功能设置项里面的初始值，比如开关状态，slider的value
    this.setState({
      switchValue: true,
      sliderValue: 75,
      showDot: [
        // 固件升级显示小红点是自动的，依据 Device.needUpgrade, 开发者无需配置
        // first_options.FIRMWARE_UPGRADE
      ]
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.common.backgroundColor,
    flex: 1
  },
  featureSetting: {
    backgroundColor: '#fff'
  },
  blank: {
    height: 8,
    backgroundColor: Styles.common.backgroundColor,
    borderTopColor: Styles.common.hairlineColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Styles.common.hairlineColor,
    borderBottomWidth: StyleSheet.hairlineWidth
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
  }
});
