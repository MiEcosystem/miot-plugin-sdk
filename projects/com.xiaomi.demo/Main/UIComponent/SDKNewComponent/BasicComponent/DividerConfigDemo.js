'use strict';

import React from 'react';
import { View } from 'react-native';
import { Divider, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const DividerConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={Divider} propConfigs={[]} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default DividerConfigDemo;
