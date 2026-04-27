'use strict';

import React from 'react';
import { View } from 'react-native';
import { Separator, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const SeparatorConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={Separator} propConfigs={[]} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SeparatorConfigDemo;
