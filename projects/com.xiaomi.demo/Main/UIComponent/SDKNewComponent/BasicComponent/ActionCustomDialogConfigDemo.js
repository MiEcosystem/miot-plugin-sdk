'use strict';

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ActionCustomDialog, BlockButton, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const defaultButtons = [
  { title: '取消', type: 'normal' },
  { title: '确认', type: 'primary' },
];

const customChild = (
  <View style={{ padding: 20, alignItems: 'center' }}>
    <Text style={{ fontSize: 14 }}>自定义对话框内容</Text>
  </View>
);

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
    defaultValue: customChild,
    passOptions: [{ label: '自定义内容', value: customChild }],
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
