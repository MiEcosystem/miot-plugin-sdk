'use strict';

import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { colorToken, radiusToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

// 按设计稿字母排序
const RADIUS_LIST = [
  'buttonLarge',
  'buttonMedium',
  'buttonSmall',
  'cardExtraLarge',
  'cardExtraSmall',
  'cardLarge',
  'cardMedium',
  'cardSmall',
  'dialog',
  'drawer',
  'floatingWindow',
  'input',
  'menuContainer',
  'menuItem',
  'noticeBar',
  'rounded',
  'segmentedContainer',
  'segmentedItem',
  'selectorContainer',
  'selectorItem',
  'statusButton',
  'toast',
];

const RadiusDemo = () => (
  <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
    {RADIUS_LIST.map((name) => (
      <View key={name} style={[styles.card, { borderRadius: radiusToken[name] }]}>
        <Text style={styles.tokenName}>{name}</Text>
      </View>
    ))}
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 28,
  },
  card: {
    height: 80,
    backgroundColor: '#898989',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenName: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default RadiusDemo;
