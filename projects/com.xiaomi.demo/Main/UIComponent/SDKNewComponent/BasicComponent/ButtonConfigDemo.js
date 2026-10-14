'use strict';

import React from 'react';
import { View } from 'react-native';
import { Button, colorToken, TestComponent, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '按钮', category: 'content' },
  {
    name: 'size',
    type: 'enum',
    enumOptions: ['small', 'medium', 'large'],
    defaultValue: 'large',
    category: 'state',
  },
  {
    name: 'type',
    type: 'enum',
    enumOptions: ['primary', 'primarySubtle', 'warning', 'default', 'ghost'],
    defaultValue: 'default',
    category: 'state',
  },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'purple', 'orange', 'wathet'],
    defaultValue: 'green',
    category: 'state',
  },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'onPress',
    type: 'pass',
    defaultValue: () => showToast('onPress'),
    category: 'interaction',
    passOptions: [{ label: 'onPress', value: () => showToast('onPress') }],
  },
  {
    name: 'onLongPress',
    type: 'pass',
    defaultValue: () => showToast('onLongPress'),
    category: 'interaction',
    passOptions: [{ label: 'onLongPress', value: () => showToast('onLongPress') }],
  },
];

const ButtonConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={Button} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default ButtonConfigDemo;
