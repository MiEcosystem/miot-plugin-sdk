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
  { name: 'placeholder', type: 'string', defaultValue: '请输入', category: 'content' },
  { name: 'defaultValue', type: 'string', defaultValue: '', category: 'content' },
  {
    name: 'inputType',
    type: 'enum',
    enumOptions: ['normal', 'password'],
    defaultValue: 'normal',
    category: 'state',
  },
  { name: 'cancelable', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'canDismiss', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'hasShade', type: 'boolean', defaultValue: true, category: 'state' },
];

const InputDialogDemo = () => {
  const [visible, setVisible] = useState(false);
  const [dialogProps, setDialogProps] = useState({});

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setDialogProps(props)}
      />
      <InputDialog
        {...dialogProps}
        visible={visible}
        onDismiss={() => setVisible(false)}
        onChangeText={(text) => console.log('输入:', text)}
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
