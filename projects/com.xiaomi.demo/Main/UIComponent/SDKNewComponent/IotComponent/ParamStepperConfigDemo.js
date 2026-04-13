'use strict';

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { ParamStepper, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle, Celsius, Cold } from 'miot/ui/icons';

const prefixNode = <Text style={{ fontSize: 14, color: colorToken.contentTertiaryNormal }}>约</Text>;
const suffixNode = <Text style={{ fontSize: 14, color: colorToken.contentTertiaryNormal }}>℃</Text>;
const subscriptIcon = <Cold fill={colorToken.accentBlueContent} />;

const propConfigs = [
  { name: 'value', type: 'number', defaultValue: 25, category: 'content' },
  { name: 'min', type: 'number', defaultValue: 0, category: 'content' },
  { name: 'max', type: 'number', defaultValue: 100, category: 'content' },
  { name: 'step', type: 'number', defaultValue: 1, category: 'content' },
  { name: 'digits', type: 'number', defaultValue: 0, category: 'content' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'stringMode', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'iconType',
    type: 'enum',
    enumOptions: ['plusMinus', 'leftRight'],
    defaultValue: 'plusMinus',
    category: 'state',
  },
  {
    name: 'symbolType',
    type: 'enum',
    enumOptions: ['percent', 'degree', 'custom'],
    defaultValue: 'degree',
    category: 'state',
  },
  {
    name: 'onChange',
    type: 'pass',
    defaultValue: (val) => Alert.alert('onChange', String(val)),
    category: 'interaction',
    linkTo: { targetProp: 'value', pick: (...args) => args[0] },
    passOptions: [{ label: 'onChange', value: (val) => Alert.alert('onChange', String(val)) }],
  },
  {
    name: 'prefix',
    type: 'pass',
    category: 'resource',
    passOptions: [{ label: '约', value: prefixNode }],
  },
  {
    name: 'suffix',
    type: 'pass',
    category: 'resource',
    passOptions: [{ label: '℃', value: suffixNode }],
  },
  {
    name: 'suffixSubscript',
    type: 'pass',
    category: 'resource',
    passOptions: [{ label: '雪花图标', value: subscriptIcon }],
  },
  {
    name: 'formatter',
    type: 'pass',
    category: 'render',
    passOptions: [{ label: '补零格式化', value: (v) => (v != null ? String(v).padStart(2, '0') : '') }, { label: '文本格式', value: (v) => ('文本内容超长展示') }],
  },
];

const ParamStepperConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={ParamStepper} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default ParamStepperConfigDemo;
