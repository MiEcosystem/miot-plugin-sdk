'use strict';

import React from 'react';
import { ScrollView, View } from 'react-native';
import { SmallImageButton, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { SliderIcon, Cold } from 'mhui-rn/dist/icons';
import { dynamicStyleSheet } from 'miot/ui/Style';

const COLOR_MAP = {
  green:  { low: colorToken.accentGreenLow,  content: colorToken.accentGreenContent },
  blue:   { low: colorToken.accentBlueLow,   content: colorToken.accentBlueContent },
  orange: { low: colorToken.accentOrangeLow, content: colorToken.accentOrangeContent },
  wathet: { low: colorToken.accentWathetLow, content: colorToken.accentWathetContent },
  purple: { low: colorToken.accentPurpleLow, content: colorToken.accentPurpleContent },
};

const makeToggleIcon = (colorType, active) => (pressed) => {
  const fill = active
    ? (pressed ? COLOR_MAP[colorType]?.low : COLOR_MAP[colorType]?.content)
    : (pressed ? colorToken.contentSecondaryPress : colorToken.contentSecondaryNormal);
  return <SliderIcon fill={fill} />;
};

const makeToggleIconCold = (colorType, active) => (pressed) => {
  const fill = active
    ? (pressed ? COLOR_MAP[colorType]?.low : COLOR_MAP[colorType]?.content)
    : (pressed ? colorToken.contentSecondaryPress : colorToken.contentSecondaryNormal);
  return <Cold fill={fill} />;
};

const iconButton = (pressed) => (
  <SliderIcon fill={pressed ? colorToken.contentSecondaryPress : colorToken.contentSecondaryNormal} />
);
const iconDisabled = <SliderIcon fill={colorToken.contentDisabledPrimary} />;
const iconLarge = <View style={{ width: 32, height: 32, borderRadius: 4, backgroundColor: '#00B884' }} />;
const iconFit = <View style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: '#0077FF' }} />;
const iconSmall = <View style={{ width: 12, height: 12, borderRadius: 4, backgroundColor: '#FF6600' }} />;

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '灯光', category: 'content' },
  {
    name: 'actionType',
    type: 'enum',
    enumOptions: ['button', 'toggle'],
    defaultValue: 'toggle',
    category: 'state',
  },
  { name: 'active', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
    defaultValue: 'green',
    category: 'state',
  },
  {
    name: 'custom',
    type: 'pass',
    category: 'render',
    defaultValue: makeToggleIcon('green', false),
    passOptions: [
      { label: 'SliderIcon green (inactive)', value: makeToggleIcon('green', false) },
      { label: 'SliderIcon green (active)', value: makeToggleIcon('green', true) },
      { label: 'SliderIcon blue (inactive)', value: makeToggleIcon('blue', false) },
      { label: 'SliderIcon blue (active)', value: makeToggleIcon('blue', true) },
      { label: 'SliderIcon orange (inactive)', value: makeToggleIcon('orange', false) },
      { label: 'SliderIcon orange (active)', value: makeToggleIcon('orange', true) },
      { label: 'Cold wathet (inactive)', value: makeToggleIconCold('wathet', false) },
      { label: 'Cold wathet (active)', value: makeToggleIconCold('wathet', true) },
      { label: 'Cold purple (inactive)', value: makeToggleIconCold('purple', false) },
      { label: 'Cold purple (active)', value: makeToggleIconCold('purple', true) },
      { label: 'button 模式', value: iconButton },
      { label: '禁用态', value: iconDisabled },
      { label: '大图标（32×32）', value: iconLarge },
      { label: '正好（20×20）', value: iconFit },
      { label: '小图标（12×12）', value: iconSmall },
      { label: '无图标', value: undefined },
    ],
  },
  {
    name: 'onPress',
    type: 'pass',
    category: 'interaction',
    defaultValue: () => {},
    passOptions: [
      { label: '有点击', value: () => {} },
      { label: '无点击', value: undefined },
    ],
  },
];

const SmallImageButtonConfigDemo = () => (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
    <TestComponent component={SmallImageButton} propConfigs={propConfigs} />
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SmallImageButtonConfigDemo;
