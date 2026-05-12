'use strict';

import React from 'react';
import { View } from 'react-native';
import { LargeTriggerSelect, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const icon = <Circle fill={colorToken.contentSecondaryNormal} />;

const options2 = [
  { value: 1, title: '选项一', icon },
  { value: 2, title: '选项二', icon },
];

const options3 = [
  { value: 1, title: '选项一', icon },
  { value: 2, title: '选项二', icon },
  { value: 3, title: '选项三', icon },
];

const options4 = [
  { value: 1, title: '选项一', icon, colorType: 'blue' },
  { value: 2, title: '选项二', icon, colorType: 'orange' },
  { value: 3, title: '选项三', icon, colorType: 'green' },
  { value: 4, title: '选项四', icon, colorType: 'purple' },
];

const options5 = [
  { value: 1, title: '制冷', icon },
  { value: 2, title: '制热', icon },
  { value: 3, title: '送风', icon },
  { value: 4, title: '除湿', icon },
  { value: 5, title: '自动', icon },
];

const options6 = [
  { value: 1, title: '低风', icon },
  { value: 2, title: '中风', icon },
  { value: 3, title: '高风', icon },
  { value: 4, title: '自动', icon },
  { value: 5, title: '静音', icon },
  { value: 6, title: '强力', icon },
];

const propConfigs = [
  {
    name: 'options',
    type: 'pass',
    category: 'content',
    defaultValue: options2,
    passOptions: [
      { label: '2个选项', value: options2 },
      { label: '3个选项', value: options3 },
      { label: '4个(多色)', value: options4 },
      { label: '5个选项', value: options5 },
      { label: '6个选项', value: options6 },
    ],
  },
  {
    name: 'value',
    type: 'pass',
    category: 'state',
    defaultValue: 1,
    passOptions: [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '无选中', value: undefined },
    ],
  },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'cardType',
    type: 'enum',
    enumOptions: ['inner', 'outer'],
    defaultValue: 'inner',
    category: 'state',
  },
  {
    name: 'onChange',
    type: 'pass',
    category: 'interaction',
    defaultValue: (val) => showToast(`onChange: ${ val }`),
    linkTo: { targetProp: 'value' },
    passOptions: [{ label: 'onChange', value: (val) => showToast(`onChange: ${ val }`) }],
  },
  {
    name: 'onSelect',
    type: 'pass',
    category: 'interaction',
    passOptions: [{ label: 'onSelect', value: (option) => showToast(`onSelect: ${ JSON.stringify(option) }`) }],
  },
];

const LargeTriggerSelectConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={LargeTriggerSelect} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default LargeTriggerSelectConfigDemo;
