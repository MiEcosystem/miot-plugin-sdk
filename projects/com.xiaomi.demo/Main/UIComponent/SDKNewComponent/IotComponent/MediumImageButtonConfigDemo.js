'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { MediumImageButton, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { SliderIcon } from 'mhui-rn/dist/icons';
import { dynamicStyleSheet } from 'miot/ui/Style';

const icon = <SliderIcon fill={colorToken.contentPrimaryNormal} width={32} height={32} />;
const noop = () => {};

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '空调', category: 'content' },
  { name: 'subtitle', type: 'string', defaultValue: '正在运行', category: 'content' },
  {
    name: 'actionType',
    type: 'enum',
    enumOptions: ['button', 'toggle'],
    defaultValue: 'toggle',
    category: 'state',
  },
  { name: 'active', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
    defaultValue: 'blue',
    category: 'state',
  },
  {
    name: 'leadingIcon',
    type: 'pass',
    category: 'render',
    defaultValue: icon,
    passOptions: [
      { label: 'SVG图标', value: icon },
      { label: '无图标', value: undefined },
    ],
  },
  { name: 'onPress', type: 'pass', defaultValue: noop, category: 'interaction' },
];

const MediumImageButtonConfigDemo = () => (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
    <TestComponent component={MediumImageButton} propConfigs={propConfigs} />
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default MediumImageButtonConfigDemo;
