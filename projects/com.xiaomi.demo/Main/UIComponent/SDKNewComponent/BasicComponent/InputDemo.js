'use strict';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui';
import { ListNavigate } from 'mhui-rn/dist/icons';

const PrefixLeading = () => (
  <TouchableOpacity style={styles.prefixRow} activeOpacity={0.7} onPress={() => console.log('切换区号')}>
    <Text style={styles.prefixText}>+86</Text>
    <ListNavigate width={16} height={16} fill={colorToken.contentPrimaryNormal} />
  </TouchableOpacity>
);

const propConfigs = [
  { name: 'placeholder', type: 'string', defaultValue: '请输入内容', category: 'content' },
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
  const [inputProps, setInputProps] = useState({});
  const [value, setValue] = useState('');

  const prefix = inputProps.prefix === 'leading' ? <PrefixLeading /> : undefined;

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setInputProps(props)}
      />
      <View style={styles.inputWrapper}>
        <Input
          value={value}
          placeholder={inputProps.placeholder || '请输入内容'}
          type={inputProps.type || 'normal'}
          colorDepth={inputProps.colorDepth || 'base'}
          showClear={inputProps.showClear !== undefined ? inputProps.showClear : true}
          colorType={inputProps.colorType || 'green'}
          prefix={prefix}
          feedbackText={inputProps.feedbackText || undefined}
          feedbackType={inputProps.feedbackType || 'normal'}
          feedbackIconType={inputProps.feedbackIconType || 'none'}
          onChangeText={setValue}
        />
      </View>
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
