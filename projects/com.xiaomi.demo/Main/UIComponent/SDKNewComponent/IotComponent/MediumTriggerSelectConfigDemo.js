'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { MediumTriggerSelect, colorToken, TestComponent, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const leadingIcon = <Circle fill={colorToken.contentSecondaryNormal} />;

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '文字', category: 'content' },
  { name: 'subtitle', type: 'string', defaultValue: '文字', category: 'content' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'onPress', type: 'pass', defaultValue: () => showToast('onPress'), category: 'interaction', passOptions: [{ label: 'onPress', value: () => showToast('onPress') }] },
  {
    name: 'leadingIcon',
    type: 'pass',
    category: 'resource',
    passOptions: [{ label: '图标', value: leadingIcon }],
  },
];

const MediumTriggerSelectConfigDemo = () => (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
    <TestComponent component={MediumTriggerSelect} propConfigs={propConfigs} />
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default MediumTriggerSelectConfigDemo;
