'use strict';

import React from 'react';
import { View, Alert } from 'react-native';
import { ButtonGroup, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const twoButtons = [
  { title: '取消', type: 'normal', onPress: () => Alert.alert('取消') },
  { title: '确认', type: 'primary', onPress: () => Alert.alert('确认') },
];

const threeButtons = [
  { title: '取消', type: 'normal', onPress: () => Alert.alert('取消') },
  { title: '删除', type: 'warning', onPress: () => Alert.alert('删除') },
  { title: '确认', type: 'primary', onPress: () => Alert.alert('确认') },
];

const propConfigs = [
  {
    name: 'buttons',
    type: 'pass',
    category: 'content',
    defaultValue: twoButtons,
    passOptions: [
      { label: '两个按钮', value: twoButtons },
      { label: '三个按钮', value: threeButtons },
    ],
  },
  {
    name: 'layout',
    type: 'enum',
    enumOptions: ['horizontal', 'vertical'],
    defaultValue: 'horizontal',
    category: 'state',
  },
];

const ButtonGroupConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={ButtonGroup} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default ButtonGroupConfigDemo;
