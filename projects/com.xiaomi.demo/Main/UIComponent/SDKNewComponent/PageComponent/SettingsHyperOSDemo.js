'use strict';

import React, { useState } from 'react';
import { Service } from 'miot';
import SettingsHyperOS, { AllOptions } from 'miot/ui/SettingsHyperOS';

const options = [
  AllOptions.MEMBER_SET,
  AllOptions.VOICE_AUTH,
  AllOptions.BTGATEWAY,
  AllOptions.SHARE,
  AllOptions.IFTTT,
  AllOptions.FIRMWARE_UPGRADE,
  AllOptions.HELP,
  AllOptions.SECURITY,
  AllOptions.ADD_TO_DESKTOP
];

// options 只能追加,摘掉 isDefault 项必须走 excludeRequiredOptions
const extraOptions = {
  showUpgrade: true,
  bleOtaAuthType: 5,
  deleteDeviceMessage: 'test',
  excludeRequiredOptions: [AllOptions.DEFAULT_PLUGIN],
  option: {
    privacyURL: require('../../../../Resources/raw/privacy_zh.html'),
    agreementURL: require('../../../../Resources/raw/license_zh.html'),
    experiencePlanURL: '',
    hideAgreement: true
  }
};

const showDot = [AllOptions.SHARE];

const deviceInfoCustomOptions = [{
  id: 'infoCustomEntrance',
  title: '更多设备信息页自定义项',
  actionType: 'none',
  onPress: () => Service.scene.openIftttAutoPage()
}];

const SettingsHyperOSDemo = ({ navigation }) => {
  const [switchOn, setSwitchOn] = useState(false);
  // 自定义入口只传数据,样式由 SDK 提供;id 用于埋点与红点去重
  const featureCustomOptions = [{
    id: 'customEntrance',
    title: '设置页自定义项',
    value: '跳转自定义页面',
    badge: true,
    onPress: () => Service.scene.openIftttAutoPage()
  }, {
    id: 'customSwitch',
    title: '自定义开关项',
    actionType: 'switch',
    checked: switchOn,
    onChange: setSwitchOn
  }, {
    id: 'customButton',
    title: '自定义按钮项',
    actionType: 'button',
    buttonOption: {
      title: '执行',
      onPress: () => Service.scene.openIftttAutoPage()
    }
  }];
  return (
    <SettingsHyperOS
      navigation={navigation}
      options={options}
      showDot={showDot}
      extraOptions={extraOptions}
      featureCustomOptions={featureCustomOptions}
      deviceInfoCustomOptions={deviceInfoCustomOptions}
    />
  );
};

// SettingsHyperOS 自绘 NavigationBar,不声明会与 demo 栈的 header 叠成两层
SettingsHyperOSDemo.navigationOptions = { header: null };

export default SettingsHyperOSDemo;
