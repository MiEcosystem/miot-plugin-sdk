'use strict';

import React from 'react';
import { View, Alert } from 'react-native';
import { ContainerWithGap, MediumListToggle, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const icon = <Circle fill={colorToken.contentPrimaryNormal} />;
const noop = (val) => Alert.alert('onChange', String(val));
const onPress = () => Alert.alert('onPress');

const children2 = [
  <MediumListToggle key={0} title="开关1" icon={icon} checked={false} onChange={noop} />,
  <MediumListToggle key={1} title="开关2" icon={icon} checked={false} onChange={noop} />,
];

const children3 = [
  <MediumListToggle key={0} title="开关1" icon={icon} checked={false} onChange={noop} />,
  <MediumListToggle key={1} title="开关2" icon={icon} checked={false} onChange={noop} />,
  <MediumListToggle key={2} title="开关3" icon={icon} checked={false} onChange={noop} />,
];

const children4 = [
  <MediumListToggle key={0} title="开关1" icon={icon} checked={false} onChange={noop} />,
  <MediumListToggle key={1} title="开关2" icon={icon} checked={false} onChange={noop} />,
  <MediumListToggle key={2} title="开关3" icon={icon} checked={false} onChange={noop} />,
  <MediumListToggle key={3} title="开关4" icon={icon} checked={false} onChange={noop} />,
];

const propConfigs = [
  { name: 'horizontal', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'useChildGap', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'span', type: 'number', defaultValue: 2, category: 'content' },
  {
    name: 'children',
    type: 'pass',
    category: 'render',
    defaultValue: children2,
    passOptions: [
      { label: '2个子项', value: children2 },
      { label: '3个子项', value: children3 },
      { label: '4个子项', value: children4 },
    ],
  },
];

const ContainerWithGapConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={ContainerWithGap} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default ContainerWithGapConfigDemo;
