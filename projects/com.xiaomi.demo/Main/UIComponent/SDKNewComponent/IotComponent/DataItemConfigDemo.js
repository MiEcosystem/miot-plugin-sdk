'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { DataItem, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const noop = () => {};

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '26℃', category: 'content' },
  { name: 'subtitle', type: 'string', defaultValue: '室内温度', category: 'content' },
  {
    name: 'titleSize',
    type: 'enum',
    enumOptions: ['medium', 'small'],
    defaultValue: 'medium',
    category: 'content',
  },
  { name: 'stringMode', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'align',
    type: 'enum',
    enumOptions: ['left', 'center'],
    defaultValue: 'left',
    category: 'state',
  },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'colorType',
    type: 'pass',
    category: 'state',
    defaultValue: undefined,
    passOptions: [
      { label: '默认（无色系）', value: undefined },
      { label: 'blue', value: 'blue' },
      { label: 'green', value: 'green' },
      { label: 'orange', value: 'orange' },
      { label: 'purple', value: 'purple' },
      { label: 'wathet', value: 'wathet' },
    ],
  },
  {
    name: 'onPress',
    type: 'pass',
    category: 'interaction',
    defaultValue: undefined,
    passOptions: [
      { label: '无点击', value: undefined },
      { label: '有点击（显示箭头）', value: noop },
    ],
  },
];

const DataItemConfigDemo = () => (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
    <TestComponent component={DataItem} propConfigs={propConfigs} />
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default DataItemConfigDemo;
