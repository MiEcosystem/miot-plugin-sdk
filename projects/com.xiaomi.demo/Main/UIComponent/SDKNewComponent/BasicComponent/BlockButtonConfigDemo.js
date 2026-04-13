'use strict';

import React from 'react';
import { View, Image, Alert } from 'react-native';
import { BlockButton, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const groupIcon = require('../../images/group.png');
const icon = <Image source={groupIcon} style={{ width: 24, height: 24 }} />;

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
  { name: 'onPress', type: 'pass', defaultValue: () => Alert.alert('onPress'), category: 'interaction', passOptions: [{ label: 'onPress', value: () => Alert.alert('onPress') }] },
  { name: 'onLongPress', type: 'pass', defaultValue: () => Alert.alert('onLongPress'), category: 'interaction', passOptions: [{ label: 'onLongPress', value: () => Alert.alert('onLongPress') }] },
  {
    name: 'icon',
    type: 'pass',
    category: 'resource',
    passOptions: [{ label: '图标', value: icon }],
  },
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
