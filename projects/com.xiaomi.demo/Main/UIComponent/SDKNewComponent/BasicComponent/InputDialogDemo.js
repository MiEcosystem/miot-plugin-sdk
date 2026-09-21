'use strict';

import React, { useState } from 'react';
import { View } from 'react-native';
import { InputDialog, BlockButton, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui';

const defaultButtons = [
  { title: '取消', type: 'normal' },
  { title: '确认', type: 'primary' },
];

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '输入弹窗', category: 'content' },
  {
    name: 'inputProps',
    type: 'object',
    category: 'content',
    objectProps: [
      { name: 'placeholder', type: 'string', defaultValue: '请输入' },
      { name: 'value', type: 'string', defaultValue: '' },
      { name: 'type', type: 'enum', enumOptions: ['normal', 'password'], defaultValue: 'normal' },
      { name: 'autoFocus', type: 'boolean', defaultValue: false },
      { name: 'showClear', type: 'boolean', defaultValue: true },
      { name: 'colorDepth', type: 'enum', enumOptions: ['base', 'low'], defaultValue: 'low' },
      { name: 'feedbackText', type: 'string', defaultValue: '' },
      { name: 'feedbackType', type: 'enum', enumOptions: ['normal', 'notice', 'warning'], defaultValue: 'normal' },
      { name: 'feedbackIconType', type: 'enum', enumOptions: ['none', 'alert', 'help', 'info'], defaultValue: 'none' },
    ],
  },
  { name: 'cancelable', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'canDismiss', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'hasShade', type: 'boolean', defaultValue: true, category: 'state' },
];

const InputDialogDemo = () => {
  const [visible, setVisible] = useState(false);
  const [dialogProps, setDialogProps] = useState({});

  const inputProps = {
    ...(dialogProps.inputProps || {}),
    onChangeText: (text) => console.log('输入:', text),
  };

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setDialogProps(props)}
      />
      <InputDialog
        {...dialogProps}
        inputProps={inputProps}
        visible={visible}
        onDismiss={() => setVisible(false)}
        buttons={(dialogProps.buttons || defaultButtons).map((btn) => ({
          ...btn,
          callback: () => setVisible(false),
        }))}
      />
      <View style={styles.buttonWrapper}>
        <BlockButton title="显示输入弹窗" type="primary" onPress={() => setVisible(true)} />
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

export default InputDialogDemo;
