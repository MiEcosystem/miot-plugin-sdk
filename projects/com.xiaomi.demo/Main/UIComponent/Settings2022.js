import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Service } from 'miot';
import { strings, Styles } from 'miot/resources';
import { SETTING_KEYS } from "miot/ui/CommonSetting";
import Settings from 'miot/ui/Settings';

const { first_options, second_options } = SETTING_KEYS;

export default class Settings2022 extends Component {
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
      hideArrow: true
    }];
    return (
      <ScrollView contentContainerStyle={{
        backgroundColor: '#fff',
        paddingBottom: 33
      }}>
        <Settings {...{
          firstOptions,
          secondOptions,
          extraOptions,
          firstCustomOptions: firstCustomOption,
          secondCustomOptions: secondCustomOption
        }}></Settings>
      </ScrollView>
    );
  }
}
