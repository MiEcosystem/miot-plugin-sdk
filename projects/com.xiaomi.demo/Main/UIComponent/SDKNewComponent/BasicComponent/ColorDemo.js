'use strict';

import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const CARD_BG = '#898989';

const SECTIONS = [
  {
    heading: 'content',
    rows: [
      ['contentDisabledPrimary', 'contentDisabledSecondary', 'contentInverseDisabled', 'contentInverseNormal'],
      ['contentPrimaryNormal', 'contentPrimaryPress', 'contentQuaternaryNormal', 'contentQuaternaryPress'],
      ['contentSecondaryNormal', 'contentSecondaryPress', 'contentTertiaryNormal', 'contentTertiaryPress'],
    ],
  },
  {
    heading: 'surface',
    rows: [
      ['surfaceCardModal', 'surfaceCardPrimary', 'surfaceCardSubtle', 'surfaceCardTranslucent'],
      ['surfaceModalBase', 'surfaceModalLow', 'surfacePageBase', 'surfacePageLow'],
      ['surfacePopover', 'surfaceToast'],
    ],
  },
  {
    heading: 'fill',
    rows: [
      ['fillInverse', 'fillPrimary', 'fillQuaternary', 'fillSecondary'],
      ['fillSwitchDisabled', 'fillSwitchNormal', 'fillTertiary'],
    ],
  },
  {
    heading: 'divider',
    rows: [
      ['dividerPrimary', 'dividerSecondary'],
    ],
  },
  {
    heading: 'accent',
    rows: [
      ['accentBlueContent', 'accentBlueFill', 'accentBlueLow', 'accentBlueSubtle'],
      ['accentGreenContent', 'accentGreenFill', 'accentGreenLow', 'accentGreenSubtle'],
      ['accentOrangeContent', 'accentOrangeFill', 'accentOrangeLow', 'accentOrangeSubtle'],
      ['accentOsContent', 'accentOsFill', 'accentOsLow', 'accentOsSubtle'],
      ['accentPurpleContent', 'accentPurpleFill', 'accentPurpleLow', 'accentPurpleSubtle'],
      ['accentRedContent', 'accentRedFill', 'accentRedLow', 'accentRedSubtle'],
      ['accentWathetContent', 'accentWathetFill', 'accentWathetLow', 'accentWathetSubtle'],
      ['accentYellowContent', 'accentYellowFill', 'accentYellowLow', 'accentYellowSubtle'],
    ],
  },
  {
    heading: 'static',
    rows: [
      ['staticBlack', 'staticBlack10', 'staticBlack30', 'staticBlack40'],
      ['staticBlack50', 'staticBlack80', 'staticWhite', 'staticWhite10'],
      ['staticWhite15', 'staticWhite20', 'staticWhite30', 'staticWhite40'],
      ['staticWhite50', 'staticWhite60', 'staticWhite70', 'staticWhite80'],
    ],
  },
  {
    heading: 'other',
    rows: [
      ['otherBorder', 'otherButtonPressed', 'otherListPressed'],
    ],
  },
  {
    heading: 'mask',
    rows: [
      ['mask'],
    ],
  },
];

const formatLabel = (name) =>
  name.replace(/([A-Z])/g, '/$1').replace(/^([a-z]+)\//, '$1/').toLowerCase().replace(/\/\//g, '/');

const Swatch = ({ name }) => {
  const color = colorToken[name];
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <View style={[styles.swatchColor, styles.swatchColorWrap, { backgroundColor: color }]} />
        <Text style={styles.tokenName}>{formatLabel(name)}</Text>
      </View>
    </View>
  );
};

const ColorDemo = () => (
  <View style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {SECTIONS.map((section) => (
        <View key={section.heading} style={styles.section}>
          <Text style={styles.heading}>{section.heading}</Text>
          {section.rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((tokenName) => (
                <Swatch key={tokenName} name={tokenName} />
              ))}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 14,
  },
  heading: {
    fontSize: 13,
    fontWeight: '500',
    color: CARD_BG,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  cardWrapper: {
    flexBasis: '25%',
    maxWidth: '25%',
    padding: 4,
  },
  card: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 6,
  },
  swatchColorWrap: {
    marginBottom: 6,
  },
  swatchColor: {
    height: 24,
    borderRadius: 8,
  },
  tokenName: {
    fontSize: 10,
    lineHeight: 12,
    color: '#FFFFFF',
  },
});

export default ColorDemo;
