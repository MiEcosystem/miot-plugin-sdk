'use strict';

import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { colorToken, Fonts } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

const SYSTEM_FONTS = [
  'fontSystem10Medium', 'fontSystem10Regular',
  'fontSystem11Medium', 'fontSystem11Regular',
  'fontSystem12Medium', 'fontSystem12Regular',
  'fontSystem13Medium', 'fontSystem13Regular',
  'fontSystem14Medium', 'fontSystem14Regular',
  'fontSystem15Medium', 'fontSystem15Regular',
  'fontSystem16Medium', 'fontSystem16Regular',
  'fontSystem17Medium', 'fontSystem17Regular',
  'fontSystem18Medium', 'fontSystem18Regular',
  'fontSystem20Medium', 'fontSystem20Regular',
  'fontSystem22Medium', 'fontSystem22Regular',
  'fontSystem24Medium',
  'fontSystem26Medium',
  'fontSystem32Medium', 'fontSystem32Regular',
];

const NUMERIC_FONTS = [
  'fontNumber24Demibold',
  'fontNumber26Demibold',
  'fontNumber28Demibold',
];

const FontItem = ({ name }) => (
  <View style={styles.item}>
    <Text allowFontScaling={false} style={[Fonts[name], styles.sample]}>中文示例 {name.replace('fontSystem', '').replace('fontNumber', '')}</Text>
    <View style={styles.tokenChip}>
      <Text allowFontScaling={false} style={styles.tokenName}>{name}</Text>
    </View>
  </View>
);

const FontsDemo = () => (
  <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
    <Text allowFontScaling={false} style={styles.heading}>systemFont</Text>
    <View style={styles.list}>
      {SYSTEM_FONTS.map((name, index) => (
        <View key={name} style={[styles.itemWrapper, index > 0 && styles.itemBorder]}>
          <FontItem name={name} />
        </View>
      ))}
    </View>

    <Text allowFontScaling={false} style={styles.heading}>customNumericFont</Text>
    <View style={styles.list}>
      {NUMERIC_FONTS.map((name, index) => (
        <View key={name} style={[styles.itemWrapper, index > 0 && styles.itemBorder]}>
          <FontItem name={name} />
        </View>
      ))}
    </View>
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 14,
    color: colorToken.contentPrimaryNormal,
    marginBottom: 12,
    marginTop: 20,
  },
  list: {
    backgroundColor: colorToken.surfaceCardPrimary,
    borderRadius: 16,
    overflow: 'hidden',
  },
  itemWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  item: {
    flexDirection: 'column',
  },
  sample: {
    color: colorToken.contentPrimaryNormal,
    marginBottom: 8,
  },
  tokenChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tokenName: {
    fontSize: 11,
    color: colorToken.contentTertiaryNormal,
  },
});

export default FontsDemo;
