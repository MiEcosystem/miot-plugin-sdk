'use strict';

import React from 'react';
import { View } from 'react-native';
import { Input, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui';

const propConfigs = [
  { name: 'placeholder', type: 'string', defaultValue: '请输入内容', category: 'content' },
  {
    name: 'keyboardType',
    type: 'enum',
    enumOptions: ['default', 'numeric', 'number-pad', 'decimal-pad', 'email-address', 'phone-pad'],
    defaultValue: 'default',
    category: 'content',
  },
  { name: 'maxLength', type: 'number', defaultValue: 20, category: 'content' },
  {
    name: 'type',
    type: 'enum',
    enumOptions: ['normal', 'password'],
    defaultValue: 'normal',
    category: 'state',
  },
  {
    name: 'colorDepth',
    type: 'enum',
    enumOptions: ['base', 'low'],
    defaultValue: 'base',
    category: 'state',
  },
  { name: 'showClear', type: 'boolean', defaultValue: true, category: 'state' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
    defaultValue: 'green',
    category: 'state',
  },
  {
    name: 'prefix',
    type: 'pass',
    category: 'render',
    defaultValue: undefined,
    passOptions: [
      { label: '无前缀', value: undefined },
      { label: '区号前缀 +86', value: 'leading' },
    ],
  },
  { name: 'feedbackText', type: 'string', defaultValue: '', category: 'content' },
  {
    name: 'feedbackType',
    type: 'enum',
    enumOptions: ['normal', 'notice', 'warning'],
    defaultValue: 'normal',
    category: 'state',
  },
  {
    name: 'feedbackIconType',
    type: 'enum',
    enumOptions: ['none', 'alert', 'help', 'info'],
    defaultValue: 'none',
    category: 'state',
  },
];

const InputDemo = () => {

  return (
    <View style={styles.container}>
      <TestComponent
        component={Input}
        propConfigs={propConfigs}
      />
    </View>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  inputWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  prefixRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixText: {
    fontSize: 17,
    fontWeight: '500',
    color: colorToken.contentPrimaryNormal,
    marginRight: 4,
  },
});

export default InputDemo;
