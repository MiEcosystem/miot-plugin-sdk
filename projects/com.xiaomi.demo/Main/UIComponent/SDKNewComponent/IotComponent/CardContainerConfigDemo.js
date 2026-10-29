'use strict';

import React from 'react';
import { View, Text } from 'react-native';
import { CardContainer, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const childContent = (
  <View style={{ padding: 16 }}>
    <Text style={{ fontSize: 14 }}>卡片内容区域</Text>
  </View>
);

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '卡片标题', category: 'content' },
  {
    name: 'children',
    type: 'pass',
    category: 'render',
    defaultValue: childContent,
    passOptions: [{ label: '示例内容', value: childContent }],
  },
];

const CardContainerConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={CardContainer} propConfigs={propConfigs} showPreviewBg={false}/>
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default CardContainerConfigDemo;
