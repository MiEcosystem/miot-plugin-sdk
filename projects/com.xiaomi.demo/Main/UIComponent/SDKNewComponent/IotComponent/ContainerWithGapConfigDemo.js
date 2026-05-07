'use strict';

import React from 'react';
import { View } from 'react-native';
import { ContainerWithGap, CardContainer, MediumListToggle, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const icon = <Circle fill={colorToken.contentPrimaryNormal} />;
const noop = (val) => showToast(`onChange: ${ val }`);
const onPress = () => showToast('onPress');

const children2 = [
  <CardContainer key={0}><MediumListToggle title="开关1" icon={icon} checked={false} onChange={noop} /></CardContainer>,
  <CardContainer key={1}><MediumListToggle title="开关2" icon={icon} checked={false} onChange={noop} /></CardContainer>,
];

const children3 = [
  <CardContainer key={0}><MediumListToggle title="开关1" icon={icon} checked={false} onChange={noop} /></CardContainer>,
  <CardContainer key={1}><MediumListToggle title="开关2" icon={icon} checked={false} onChange={noop} /></CardContainer>,
  <CardContainer key={2}><MediumListToggle title="开关3" icon={icon} checked={false} onChange={noop} /></CardContainer>,
];

const children4 = [
  <CardContainer key={0}><MediumListToggle title="开关1" icon={icon} checked={false} onChange={noop} /></CardContainer>,
  <CardContainer key={1}><MediumListToggle title="开关2" icon={icon} checked={false} onChange={noop} /></CardContainer>,
  <CardContainer key={2}><MediumListToggle title="开关3" icon={icon} checked={false} onChange={noop} /></CardContainer>,
  <CardContainer key={3}><MediumListToggle title="开关4" icon={icon} checked={false} onChange={noop} /></CardContainer>,
];

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '', category: 'content' },
  { name: 'horizontal', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'useChildGap', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'gap', type: 'number', defaultValue: 8, category: 'content' },
  { name: 'outerMargin', type: 'number', defaultValue: 0, category: 'content' },
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
    <TestComponent component={ContainerWithGap} propConfigs={propConfigs} showPreviewBg={false}/>
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default ContainerWithGapConfigDemo;
