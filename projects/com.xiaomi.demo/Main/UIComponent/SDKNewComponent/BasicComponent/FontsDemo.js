'use strict';

import React from 'react';
import PropTypes from 'prop-types';
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
  'fontSystem24Medium', 'fontSystem24Regular',
  'fontSystem26Medium', 'fontSystem26Regular',
  'fontSystem32Medium', 'fontSystem32Regular',
];

const SYSTEM_BASE_FONTS = [
  'fontSystemThin', 'fontSystemLight', 'fontSystemRegular', 'fontSystemMedium',
];

const NUMERIC_FONTS = [
  'fontNumber16Demibold', 'fontNumber18Demibold', 'fontNumber20Demibold',
  'fontNumber24Demibold',
  'fontNumber26Demibold',
  'fontNumber28Demibold',
  'fontNumber16Medium', 'fontNumber18Medium', 'fontNumber20Medium',
  'fontNumber24Medium', 'fontNumber26Medium', 'fontNumber28Medium',
];

const NUMERIC_BASE_FONTS = [
  'fontNumberMedium', 'fontNumberDemibold',
];

const FontItem = ({ name, sample = `中文示例 ${ name.replace('fontSystem', '').replace('fontNumber', '') }` }) => (
  <View style={styles.item}>
    <Text allowFontScaling={false} style={[Fonts[name], styles.sample]}>{sample}</Text>
    <View style={styles.tokenChip}>
      <Text allowFontScaling={false} style={styles.tokenName}>{name}</Text>
    </View>
  </View>
);

FontItem.propTypes = {
  name: PropTypes.string.isRequired,
  sample: PropTypes.string,
};

const FontsDemo = () => (
  <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
    <Text allowFontScaling={false} style={styles.heading}>systemFontBase</Text>
    <View style={styles.list}>
      {SYSTEM_BASE_FONTS.map((name, index) => (
        <View key={name} style={[styles.itemWrapper, index > 0 && styles.itemBorder]}>
          <FontItem name={name} />
        </View>
      ))}
    </View>

    <Text allowFontScaling={false} style={styles.heading}>systemFont</Text>
    <View style={styles.list}>
      {SYSTEM_FONTS.map((name, index) => (
        <View key={name} style={[styles.itemWrapper, index > 0 && styles.itemBorder]}>
          <FontItem name={name} />
        </View>
      ))}
    </View>

    <Text allowFontScaling={false} style={styles.heading}>numberFontBase</Text>
    <View style={styles.list}>
      {NUMERIC_BASE_FONTS.map((name, index) => (
        <View key={name} style={[styles.itemWrapper, index > 0 && styles.itemBorder]}>
          <FontItem name={name} sample={`1234567890 ${ name.replace('fontNumber', '') }`} />
        </View>
      ))}
    </View>

    <Text allowFontScaling={false} style={styles.heading}>customNumericFont</Text>
    <View style={styles.list}>
      {NUMERIC_FONTS.map((name, index) => (
        <View key={name} style={[styles.itemWrapper, index > 0 && styles.itemBorder]}>
          <FontItem name={name} sample={`1234567890 ${ name.replace('fontNumber', '') }`} />
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
