'use strict';

import React from 'react';
import { View } from 'react-native';
import { Badge, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const propConfigs = [
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
];

const BadgeConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={Badge} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default BadgeConfigDemo;
