'use strict';

import React from 'react';
import { View } from 'react-native';
import { Input, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const propConfigs = [
  {
    name: 'value',
    type: 'string',
    defaultValue: '',
    category: 'content',
  },
  {
    name: 'onChangeText',
    type: 'pass',
    defaultValue: () => {},
    category: 'interaction',
    linkTo: { targetProp: 'value', pick: (...args) => args[0] },
    passOptions: [{ label: '受控输入', value: () => {} }],
  },
  { name: 'placeholder', type: 'string', defaultValue: '请输入内容', category: 'content' },
  {
    name: 'keyboardType',
    type: 'enum',
    enumOptions: ['default', 'numeric', 'number-pad', 'decimal-pad', 'email-address', 'phone-pad'],
    defaultValue: 'default',
    category: 'content',
  },
  { name: 'maxLength', type: 'number', defaultValue: 6, category: 'content' },
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

const InputConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={Input} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default InputConfigDemo;
