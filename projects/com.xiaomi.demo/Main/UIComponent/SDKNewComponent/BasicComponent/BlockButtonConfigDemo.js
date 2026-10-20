'use strict';

import React from 'react';
import { View } from 'react-native';
import { BlockButton, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '按钮', category: 'content' },
  {
    name: 'type',
    type: 'enum',
    enumOptions: ['primary', 'warning', 'normal'],
    defaultValue: 'normal',
    category: 'state',
  },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
    defaultValue: 'green',
    category: 'state',
  },
  { name: 'onPress', type: 'pass', defaultValue: () => showToast('onPress'), category: 'interaction', passOptions: [{ label: 'onPress', value: () => showToast('onPress') }] },
  { name: 'onLongPress', type: 'pass', defaultValue: () => showToast('onLongPress'), category: 'interaction', passOptions: [{ label: 'onLongPress', value: () => showToast('onLongPress') }] },
];

const BlockButtonConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={BlockButton} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default BlockButtonConfigDemo;
