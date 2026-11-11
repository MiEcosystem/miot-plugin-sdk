'use strict';

import React from 'react';
import { View } from 'react-native';
import { ActionListItem, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '删除设备', category: 'content' },
  { name: 'status', type: 'enum', enumOptions: ['normal', 'warning'], defaultValue: 'normal', category: 'state' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
    defaultValue: 'green',
    category: 'state',
  },
  { name: 'onPress', type: 'pass', defaultValue: () => showToast('onPress'), category: 'interaction', passOptions: [{ label: 'onPress', value: () => showToast('onPress') }] },
];

const ActionListItemConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={ActionListItem} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default ActionListItemConfigDemo;
