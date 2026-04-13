'use strict';

import React from 'react';
import { View, Image, Alert } from 'react-native';
import { SmallGridEntrance, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const groupIcon = require('../../images/group.png');
const icon = <Image source={groupIcon} style={{ width: 24, height: 24, borderRadius: 4 }} />;
const icon2 = <Circle fill={colorToken.contentPrimaryNormal} />;

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '小入口', category: 'content' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'onPress', type: 'pass', defaultValue: () => Alert.alert('onPress'), category: 'interaction', passOptions: [{ label: 'onPress', value: () => Alert.alert('onPress') }] },
  {
    name: 'icon',
    type: 'pass',
    category: 'resource',
    passOptions: [{ label: '图标1', value: icon }, { label: '图标2', value: icon2 }],
  },
];

const SmallGridEntranceConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={SmallGridEntrance} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SmallGridEntranceConfigDemo;
