'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { SmallImageButton, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { SliderIcon } from 'mhui-rn/dist/icons';
import { dynamicStyleSheet } from 'miot/ui/Style';

const icon = <SliderIcon fill={colorToken.contentSecondaryNormal} />;
const noop = () => {};

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '灯光', category: 'content' },
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
    defaultValue: 'green',
    category: 'state',
  },
  {
    name: 'custom',
    type: 'pass',
    category: 'render',
    defaultValue: icon,
    passOptions: [
      { label: '有图标', value: icon },
      { label: '无图标', value: undefined },
    ],
  },
  { name: 'onPress', type: 'pass', defaultValue: noop, category: 'interaction' },
];

const SmallImageButtonConfigDemo = () => (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
    <TestComponent component={SmallImageButton} propConfigs={propConfigs} />
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SmallImageButtonConfigDemo;
