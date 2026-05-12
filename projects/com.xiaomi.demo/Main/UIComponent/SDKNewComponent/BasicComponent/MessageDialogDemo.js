'use strict';

import React, { useState } from 'react';
import { View } from 'react-native';
import { MessageDialog, BlockButton, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui';

const defaultButtons = [
  { title: '取消', type: 'normal' },
  { title: '确定', type: 'primary' },
];

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '消息弹窗', category: 'content' },
  { name: 'contentText', type: 'string', defaultValue: '正文，单行时居中对齐。', category: 'content' },
  {
    name: 'align',
    type: 'enum',
    enumOptions: ['center', 'left'],
    defaultValue: 'center',
    category: 'state',
  },
  { name: 'label', type: 'string', defaultValue: '', category: 'content' },
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
];

const MessageDialogDemo = () => {
  const [visible, setVisible] = useState(false);
  const [dialogProps, setDialogProps] = useState({});
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setDialogProps(props)}
      />
      <MessageDialog
        {...dialogProps}
        visible={visible}
        onDismiss={() => setVisible(false)}
        checkboxChecked={checkboxChecked}
        onCheckboxChange={setCheckboxChecked}
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

export default MessageDialogDemo;
