'use strict';

import React from 'react';
import { View } from 'react-native';
import { EmptyState, EmptyImageType, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const propConfigs = [
  {
    name: 'imageType',
    type: 'enum',
    enumOptions: [
      'none', 'message', 'contacts', 'image', 'content', 'noNetwork', 'upgrade',
      'download', 'time', 'alert', 'home', 'log', 'error', 'success',
    ],
    defaultValue: 'message',
    category: 'state',
  },
  { name: 'description', type: 'string', defaultValue: '暂无数据', category: 'content' },
  { name: 'showButton', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'buttonTitle', type: 'string', defaultValue: '重试', category: 'content' },
  { name: 'imageWidth', type: 'number', defaultValue: 60, category: 'content' },
  { name: 'imageHeight', type: 'number', defaultValue: 60, category: 'content' },
  {
    name: 'onButtonPress',
    type: 'pass',
    category: 'interaction',
    passOptions: [{ label: 'onButtonPress', value: () => showToast('onButtonPress') }],
  },
];

const EmptyStateConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={EmptyState} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default EmptyStateConfigDemo;
