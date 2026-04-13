'use strict';

import React from 'react';
import { View, Alert } from 'react-native';
import { SmallGridContainer, SmallGridEntrance, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const icon = <Circle fill={colorToken.contentPrimaryNormal} />;
const onPress = () => Alert.alert('onPress');

const makeChildren = (count) => {
  const labels = ['灯光', '空调', '窗帘', '扫地机', '加湿器', '风扇'];
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(<SmallGridEntrance key={i} title={labels[i % labels.length]} icon={icon} onPress={onPress} />);
  }
  return <View>{items}</View>;
};

const children2 = makeChildren(2);
const children3 = makeChildren(3);
const children4 = makeChildren(4);
const children5 = makeChildren(5);
const children6 = makeChildren(6);

const propConfigs = [
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'maxColumns', type: 'number', defaultValue: 4, category: 'content' },
  {
    name: 'children',
    type: 'pass',
    category: 'render',
    defaultValue: children4,
    passOptions: [
      { label: '2个子项', value: children2 },
      { label: '3个子项', value: children3 },
      { label: '4个子项', value: children4 },
      { label: '5个子项', value: children5 },
    ],
  },
];

const SmallGridContainerConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={SmallGridContainer} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SmallGridContainerConfigDemo;
