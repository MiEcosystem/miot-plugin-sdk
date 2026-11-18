'use strict';

import React, { useState } from 'react';
import { Image, ScrollView, View, Text } from 'react-native';
import { ActionCustomDialog, BlockButton, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const defaultButtons = [
  { title: '取消', type: 'normal' },
  { title: '确认', type: 'primary' },
];

const shortChild = (
  <View style={{ paddingHorizontal: 28, alignItems: 'center' }}>
    <Text style={{ fontSize: 14 }}>自定义对话框内容</Text>
  </View>
);

const longChild = (
  <ScrollView style={{ flexGrow: 0 }} contentContainerStyle={{ paddingHorizontal: 28 }}>
    {Array.from({ length: 30 }).map((_, i) => (
      <Text key={i} style={{ fontSize: 14, marginBottom: 8 }}>
        自定义内容行 {i + 1}，用于验证内容超出时的滚动能力。
      </Text>
    ))}
  </ScrollView>
);

const titleIconSample = <Image source={require('../../images/group.png')} style={{ width: 80, height: 80 }} />;

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '对话框标题', category: 'content' },
  { name: 'cancelable', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'canDismiss', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'hasShade', type: 'boolean', defaultValue: true, category: 'state' },
  {
    name: 'colorDepth',
    type: 'enum',
    enumOptions: ['base', 'low'],
    defaultValue: 'base',
    category: 'state',
  },
  {
    name: 'titleIcon',
    type: 'pass',
    category: 'render',
    defaultValue: undefined,
    passOptions: [
      { label: '无头部图标', value: undefined },
      { label: '示例 Image 图标', value: titleIconSample },
    ],
  },
  {
    name: 'buttons',
    type: 'pass',
    category: 'content',
    defaultValue: defaultButtons,
    passOptions: [
      { label: '两个按钮', value: defaultButtons },
      { label: '单个按钮', value: [{ title: '知道了', type: 'primary' }] },
    ],
  },
  {
    name: 'children',
    type: 'pass',
    category: 'render',
    defaultValue: shortChild,
    passOptions: [
      { label: '短内容', value: shortChild },
      { label: '长内容 (ScrollView)', value: longChild },
    ],
  },
];

const ActionCustomDialogConfigDemo = () => {
  const [visible, setVisible] = useState(false);
  const [dialogProps, setDialogProps] = useState({});

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setDialogProps(props)}
      />
      <ActionCustomDialog
        {...dialogProps}
        visible={visible}
        onDismiss={() => setVisible(false)}
        buttons={(dialogProps.buttons || defaultButtons).map((btn) => ({
          ...btn,
          callback: () => setVisible(false),
        }))}
      />
      <View style={styles.buttonWrapper}>
        <BlockButton title="显示弹窗" type="primary" onPress={() => setVisible(true)} />
      </View>
    </View>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  buttonWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
});

export default ActionCustomDialogConfigDemo;
