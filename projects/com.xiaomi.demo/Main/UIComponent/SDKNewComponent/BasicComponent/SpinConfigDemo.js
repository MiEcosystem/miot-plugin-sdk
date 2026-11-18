'use strict';

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Spin, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const childrenContent = (
  <View style={{ padding: 16 }}>
    {Array.from({ length: 6 }, (_, i) => (
      <Text key={i} style={{ fontSize: 14, color: colorToken.contentPrimaryNormal, lineHeight: 32 }}>
        列表项 {i + 1}
      </Text>
    ))}
  </View>
);

const propConfigs = [
  { name: 'spinning', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'text', type: 'string', defaultValue: 'Loading', category: 'content' },
  {
    name: 'children',
    type: 'pass',
    defaultValue: childrenContent,
    category: 'resource',
    passOptions: [{ label: '列表内容', value: childrenContent }],
  },
];

const SpinConfigDemo = () => (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
    <TestComponent component={Spin} propConfigs={propConfigs} />
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SpinConfigDemo;
