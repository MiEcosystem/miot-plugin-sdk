'use strict';

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Input, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui';

const limitInputText = (text, values) => {
  const maxLength = typeof values === 'object' ? values?.maxLength : values;
  if (typeof maxLength !== 'number' || !Number.isFinite(maxLength) || maxLength < 0) {
    return typeof text === 'string' ? text : '';
  }
  return (typeof text === 'string' ? text : '').slice(0, Math.floor(maxLength));
};

const InputDemoPreview = ({ value, maxLength, onChangeText, ...props }) => {
  const limitedValue = limitInputText(value, maxLength);

  console.log('[InputDemo] render', {
    value,
    maxLength,
    limitedValue,
  });

  useEffect(() => {
    if (value !== limitedValue) {
      console.log('[InputDemo] normalize value', {
        value,
        maxLength,
        limitedValue,
      });
      if (typeof onChangeText === 'function') onChangeText(limitedValue);
    }
  }, [limitedValue, onChangeText, value]);

  const handleChangeText = (text) => {
    const limitedText = limitInputText(text, maxLength);
    console.log('[InputDemo] onChangeText', {
      text,
      maxLength,
      limitedText,
    });
    if (typeof onChangeText === 'function') onChangeText(limitedText);
  };

  return <Input {...props} value={limitedValue} maxLength={maxLength} onChangeText={handleChangeText} />;
};

InputDemoPreview.propTypes = {
  value: PropTypes.string,
  maxLength: PropTypes.number,
  onChangeText: PropTypes.func,
};

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
    linkTo: {
      targetProp: 'value',
      pick: (...args) => args[0],
    },
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
  const [inputProps, setInputProps] = useState({});


  return (
    <View style={styles.container}>
      <TestComponent
        component={InputDemoPreview}
        propConfigs={propConfigs}
        onPropsChange={(props) => setInputProps(props)}
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
