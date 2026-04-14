'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LargeListToggle, colorToken, Fonts, SubtitleGroup } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const source1Data1 = [
  { title: '列表主文字', leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} /> },
  { title: '列表主文字', subtitle: '列表副文字', leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} /> },
  { title: '列表主文字', subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字']}/>, leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} /> },
  { title: '列表主文字', subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字', '列表副文字']}/>, leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} />, onPress: () => {} },
];

const source1Data2 = [
  { title: '列表主文字' },
  { title: '列表主文字', subtitle: '列表副文字' },
  { title: '列表主文字', subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字']}/> },
  { title: '列表主文字', subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字', '列表副文字']}/>, onPress: () => {} },
];

const LargeVariantSwitchDemo = () => {
  const [disabled, setDisabled] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>LargeListToggle</Text>
        <Text style={styles.button} onPress={() => setDisabled(!disabled)}>
          {disabled ? '启用' : '禁用'}
        </Text>
        <Text style={styles.title}>带图标</Text>
        <View style={styles.data}>
          {source1Data1.map((item, index) => (
            <LargeListToggle
              key={index}
              {...item}
              disabled={disabled}
              checked={switchValue}
              onChange={(val) => setSwitchValue(val)}
            />
          ))}
        </View>
        <Text style={styles.title}>不带图标</Text>
        <View style={styles.data}>
          {source1Data2.map((item, index) => (
            <LargeListToggle
              key={index}
              {...item}
              disabled={disabled}
              checked={switchValue}
              onChange={(val) => setSwitchValue(val)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    paddingTop: 30,
    paddingHorizontal: 12,
    backgroundColor: colorToken.surfacePageLow,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentPrimaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  title: {
    color: colorToken.accentOsFill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
    ...Fonts.fontSystem14Regular,
  },
  button: {
    fontSize: 14,
    color: colorToken.accentBlueFill,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
  data: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colorToken.surfaceCardPrimary,
  },
});

export default LargeVariantSwitchDemo;
