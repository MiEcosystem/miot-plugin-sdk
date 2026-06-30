'use strict';

import React from 'react';
import { Text, View } from 'react-native';
import { StatusAlert, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const customActionNode = (
  <Text allowFontScaling={false} style={{ fontSize: 12, color: colorToken.accentBluePrimary }}>自定义操作</Text>
);
const customIconNode = (
  <Text allowFontScaling={false} style={{ fontSize: 20 }}>🔔</Text>
);

const alertDefault = {
  title: '这是一条状态提示',
  leadingIconType: 'reminder',
  actionType: 'none',
  warning: false,
  presentation: 'page',
  trailingNavigate: false,
  onPress: undefined,
};

const alertWithOverline = {
  ...alertDefault,
  overline: '设备提醒',
};

const alertWithSubtitle = {
  ...alertDefault,
  subtitle: '这是一段辅助说明文案',
};

const alertWithButton = {
  ...alertDefault,
  actionType: 'button',
  buttons: [{ text: '操作', onPress: () => showToast('按钮点击') }],
};

const alertWithButtonGroup = {
  ...alertDefault,
  actionType: 'buttonGroup',
  buttons: [
    { text: '忽略', onPress: () => showToast('忽略') },
    { text: '重试', onPress: () => showToast('重试') },
  ],
};

const alertWithCustomAction = {
  ...alertDefault,
  actionType: 'custom',
  customAction: customActionNode,
};

const alertWithCustomIcon = {
  ...alertDefault,
  leadingIconType: 'custom',
  leadingIcon: customIconNode,
};

const alertsStack2 = [
  alertDefault,
  { title: '提示信息 2', leadingIconType: 'fault', warning: true },
];

const alertsStack3 = [
  ...alertsStack2,
  { title: '提示信息 3', leadingIconType: 'consumable' },
];

const alertsStack4 = [
  ...alertsStack3,
  { title: '提示信息 4', leadingIconType: 'offline' },
];

const onNavigatePress = () => showToast('navigate pressed');
const onStackPress = () => showToast('stack pressed');

const StatusAlertAdapter = ({ alerts, stackTitle, onPress }) => (
  <StatusAlert
    alerts={alerts}
    stackTitle={alerts?.length > 1 ? stackTitle : undefined}
    onPress={alerts?.length > 1 ? onPress : undefined}
  />
);

const propConfigs = [
  {
    name: 'alerts',
    type: 'object',
    category: 'content',
    defaultValue: [alertDefault],
    objectProps: [
      { name: '0.title', type: 'string', defaultValue: alertDefault.title },
      { name: '0.overline', type: 'string', defaultValue: undefined },
      { name: '0.subtitle', type: 'string', defaultValue: undefined },
      { name: '0.presentation', type: 'enum', enumOptions: ['page', 'modal'], defaultValue: 'page' },
      { name: '0.warning', type: 'boolean', defaultValue: false },
      { name: '0.leadingIconType', type: 'enum', enumOptions: ['warning', 'fault', 'consumable', 'offline', 'reminder', 'custom'], defaultValue: 'reminder' },
      { name: '0.leadingIcon', type: 'pass', defaultValue: undefined, passOptions: [{ label: 'custom icon', value: customIconNode }] },
      { name: '0.actionType', type: 'enum', enumOptions: ['none', 'navigate', 'button', 'buttonGroup', 'custom'], defaultValue: 'none' },
      { name: '0.buttons', type: 'pass', defaultValue: undefined, passOptions: [{ label: '单按钮', value: alertWithButton.buttons }, { label: '按钮组', value: alertWithButtonGroup.buttons }] },
      { name: '0.customAction', type: 'pass', defaultValue: undefined, passOptions: [{ label: 'custom action', value: customActionNode }] },
      { name: '0.trailingNavigate', type: 'boolean', defaultValue: false },
      { name: '0.onPress', type: 'pass', defaultValue: undefined, passOptions: [{ label: 'navigate press', value: onNavigatePress }] },
    ],
    passOptions: [
      { label: '单条', value: [alertDefault] },
      { label: '带overline', value: [alertWithOverline] },
      { label: '带subtitle', value: [alertWithSubtitle] },
      { label: '按钮', value: [alertWithButton] },
      { label: '按钮组', value: [alertWithButtonGroup] },
      { label: '自定义操作', value: [alertWithCustomAction] },
      { label: '自定义图标', value: [alertWithCustomIcon] },
      { label: '堆叠-2条', value: alertsStack2 },
      { label: '堆叠-3条', value: alertsStack3 },
      { label: '堆叠-4条', value: alertsStack4 },
    ],
  },
  {
    name: 'stackTitle',
    type: 'string',
    category: 'content',
    defaultValue: '状态提示',
  },
  {
    name: 'onPress',
    type: 'pass',
    category: 'interaction',
    defaultValue: undefined,
    passOptions: [{ label: 'stack press', value: onStackPress }],
  },
];

const StatusAlertConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={StatusAlertAdapter} propConfigs={propConfigs} showPreviewBg={false} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default StatusAlertConfigDemo;
