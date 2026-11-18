'use strict';

import React from 'react';
import { View } from 'react-native';
import { showToast, colorToken, BlockButton } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const ToastTrigger = ({ message, duration }) => (
  <View style={styles.trigger}>
    <BlockButton type="primary" title="显示 Toast" onPress={() => showToast(message, duration)} />
  </View>
);

const propConfigs = [
  { name: 'message', type: 'string', defaultValue: '最短56，最长252', category: 'content' },
  {
    name: 'duration',
    type: 'enum',
    enumOptions: [1, 2],
    defaultValue: 1,
    category: 'state',
  },
];

const ToastDemo = () => (
  <View style={styles.container}>
    <TestComponent component={ToastTrigger} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  trigger: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});

export default ToastDemo;
