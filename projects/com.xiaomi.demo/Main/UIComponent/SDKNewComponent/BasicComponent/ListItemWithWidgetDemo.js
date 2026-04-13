'use strict';

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { ListItemWithWidget, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import NavigationBar from 'miot/ui/NavigationBar';

const groupIcon = require('../../images/group.png');
const alert = Alert.alert;
const iconElement = <Image source={groupIcon} style={{ width: 40, height: 40 }} />;

const sourceData1 = [
  { widgetType: 'switch', title: '开关列表项' },
  { widgetType: 'button', title: '按钮列表项', buttonOption: { title: '按钮', onPress: () => console.log('btn'), colorType: 'green', type: 'primarySubtle', size: 'medium' } },
  { widgetType: 'button', title: '小按钮列表项', buttonOption: { title: '全选', onPress: () => console.log('btn'), type: 'default', size: 'small' } },
  { widgetType: 'circularButton', title: '圆形按钮列表项' },
  { title: '带入口的列表项', onPress: () => console.log('press') },
];

const sourceData2 = [
  { widgetType: 'switch', title: '开关列表项', leadingIcon: iconElement },
  { widgetType: 'button', title: '按钮列表项', leadingIcon: iconElement, buttonOption: { title: '按钮', onPress: () => console.log('btn'), colorType: 'green', type: 'primarySubtle', size: 'medium' } },
  { widgetType: 'circularButton', title: '圆形按钮列表项', leadingIcon: iconElement },
  { title: '带入口的列表项', onPress: () => console.log('press'), leadingIcon: iconElement },
];

const propConfigs = [
  // 内容
  { name: 'title', type: 'string', defaultValue: '主标题', category: 'content' },
  { name: 'subtitle', type: 'string', defaultValue: '副标题', category: 'content' },
  // 状态
  { name: 'widgetType', type: 'enum', enumOptions: ['switch', 'button', 'circularButton', 'custom'], defaultValue: 'switch', category: 'state' },
  { name: 'checked', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'colorType', type: 'enum', enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'], defaultValue: 'green', category: 'state' },
  // 交互
  { name: 'onPress', type: 'pass', defaultValue: () => alert('onPress'), category: 'interaction', passOptions: [{ label: 'onPress', value: () => alert('onPress') }] },
  {
    name: 'onChange',
    type: 'pass',
    defaultValue: (val) => Alert.alert('onChange', String(val)),
    category: 'interaction',
    linkTo: { targetProp: 'checked' },
    passOptions: [{ label: 'onChange', value: (val) => Alert.alert('onChange', String(val)) }],
  },
  // 资源
  {
    name: 'leadingIcon',
    type: 'pass',
    category: 'resource',
    passOptions: [
      { label: '图片', value: iconElement },
      { label: '小图片', value: <Image style={{ width: 24, height: 24 }} source={groupIcon} /> },
    ],
  },
  // 渲染
  {
    name: 'customRender',
    type: 'pass',
    category: 'render',
    passOptions: [
      { label: '图片', value: <Image style={{ width: 46, height: 46 }} source={groupIcon} /> },
      { label: '文字', value: <Text style={{ color: colorToken.accentBlueFill }}>v1.2.3</Text> },
    ],
  },
  {
    name: 'buttonOption',
    type: 'object',
    category: 'render',
    objectProps: [
      { name: 'size', type: 'enum', enumOptions: ['small', 'medium', 'large'], defaultValue: 'large' },
      { name: 'type', type: 'enum', enumOptions: ['primary', 'primarySubtle', 'warning', 'default', 'ghost'], defaultValue: 'default' },
      { name: 'title', type: 'string', defaultValue: '按钮' },
      { name: 'colorType', type: 'enum', enumOptions: ['green', 'blue', 'purple', 'orange', 'wathet'] },
      { name: 'disabled', type: 'boolean', defaultValue: false },
    ],
  },
];

const ListItemWithWidgetDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('ListItemWithWidgetConfigDemo', { title: 'ListItemWithWidget 配置调试' }) }],
    });
  }, []);

  return (
    <View style={styles.container}>
      <TestComponent component={ListItemWithWidget} propConfigs={propConfigs} />
    </View>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  top: {
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  button: {
    fontSize: 14,
    color: colorToken.accentBlueFill,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
  data: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colorToken.surfaceCardPrimary,
    marginTop: 12,
  },
});

export default ListItemWithWidgetDemo;
