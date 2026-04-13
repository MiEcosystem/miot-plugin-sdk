'use strict';

import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { CardHeader, Checkbox, colorToken, TestComponent, SubtitleGroup } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const groupIcon = require('../../images/group.png');
const icon = <Image source={groupIcon} style={{ width: 40, height: 40, borderRadius: 8 }} />;
const smallIcon = <Image source={groupIcon} style={{ width: 24, height: 24, borderRadius: 4 }} />;
const svgIcon = <Circle fill={colorToken.contentPrimaryNormal} />;

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '卡片头部', category: 'content' },
  { name: 'subtitle', type: 'string', defaultValue: 'subtitle', passOptions: [
    { label: '场景图标', value: icon },
    { label: '小图标', value: smallIcon },
    { label: '副标题组', value: <SubtitleGroup subtitles={['副标题文字', '副标题文字', '副标题文字']}/> },
  ], category: 'content' },
  { name: 'value', type: 'string', defaultValue: '', category: 'content' },
  { name: 'titleStatus', type: 'string', defaultValue: '', passOptions: [
    { label: '场景图标', value: icon },
    { label: '小图标', value: smallIcon },
    { label: '色块', value: <View style={{ width: 14, height: 14, backgroundColor: colorToken.accentYellowFill, borderRadius: 2 }}/> },
  ], category: 'content' },
  {
    name: 'actionType',
    type: 'enum',
    enumOptions: ['navigate', 'switch', 'none', 'custom'],
    defaultValue: 'navigate',
    category: 'state',
  },
  { name: 'checked', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'badge', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
    defaultValue: 'green',
    category: 'state',
  },
  {
    name: 'onChange',
    type: 'pass',
    defaultValue: (val) => Alert.alert('onChange', String(val)),
    category: 'interaction',
    linkTo: { targetProp: 'checked', pick: (...args) => args[0] },
    passOptions: [{ label: 'onChange', value: (val) => Alert.alert('onChange', String(val)) }],
  },
  { name: 'onPress', type: 'pass', defaultValue: () => Alert.alert('onPress'), category: 'interaction', passOptions: [{ label: 'onPress', value: () => Alert.alert('onPress') }] },
  {
    name: 'leadingIcon',
    type: 'pass',
    category: 'resource',
    defaultValue: svgIcon,
    passOptions: [
      { label: 'SVG图标', value: svgIcon },
      { label: '场景图标', value: icon },
      { label: '小图标', value: smallIcon },
    ],
  },
  {
    name: 'customRender',
    type: 'pass',
    category: 'render',
    passOptions: [
      { label: 'Checkbox', value: <Checkbox checked onChange={() => {}} /> },
      { label: '文字', value: <Text style={{ color: colorToken.accentBlueFill }}>自定义</Text> },
    ],
  },
];

const CardHeaderConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={CardHeader} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default CardHeaderConfigDemo;
