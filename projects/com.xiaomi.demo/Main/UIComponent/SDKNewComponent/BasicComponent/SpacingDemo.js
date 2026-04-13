'use strict';

import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

// 按设计稿从大到小排列
const SPACING_LIST = [32, 30, 28, 26, 24, 20, 18, 16, 14, 12, 10, 8, 7, 6, 5, 4, 3, 2, 1, 0];

const BAR_COLOR = '#FF1820';

const SpacingDemo = () => (
  <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
    {SPACING_LIST.map((value) => (
      <View key={value} style={styles.row}>
        <Text style={styles.tokenName}>{value}</Text>
        <View style={styles.trackContainer}>
          <View style={[styles.bar, { width: value }]} />
        </View>
      </View>
    ))}
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfaceCardPrimary,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginBottom: 12,
  },
  tokenName: {
    width: 40,
    fontSize: 16,
    color: '#121212',
  },
  trackContainer: {
    flex: 1,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    height: 20,
    backgroundColor: BAR_COLOR,
    borderRadius: 2,
  },
});

export default SpacingDemo;
