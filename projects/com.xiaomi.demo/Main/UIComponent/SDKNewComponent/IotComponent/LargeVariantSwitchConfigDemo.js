'use strict';

import React from 'react';
import { View, Image, Alert } from 'react-native';
import { LargeVariantSwitch, colorToken, TestComponent, SubtitleGroup } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const groupIcon = require('../../images/group.png');
const icon = <Image source={groupIcon} style={{ width: 24, height: 24, borderRadius: 4 }} />;
const svgIcon = <Circle fill={colorToken.contentPrimaryNormal} />;

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '大型变种开关', category: 'content' },
  { name: 'subtitle', type: 'string', defaultValue: '', passOptions: [
    { label: '副标题组', value: <SubtitleGroup subtitles={['副标题文字', '副标题文字', '副标题文字']}/> },
  ], category: 'content' },
  { name: 'value', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
    defaultValue: 'green',
    category: 'state',
  },
  {
    name: 'onValueChange',
    type: 'pass',
    defaultValue: (val) => Alert.alert('onValueChange', String(val)),
    category: 'interaction',
    linkTo: { targetProp: 'value', pick: (...args) => args[0] },
    passOptions: [{ label: 'onValueChange', value: (val) => Alert.alert('onValueChange', String(val)) }],
  },
  { name: 'onPress', type: 'pass', defaultValue: () => Alert.alert('onPress'), category: 'interaction', passOptions: [{ label: 'onPress', value: () => Alert.alert('onPress') }] },
  {
    name: 'leftIconSource',
    type: 'pass',
    category: 'resource',
    defaultValue: svgIcon,
    passOptions: [{ label: 'SVG图标', value: svgIcon }, { label: '图片图标', value: icon }],
  },
  {
    name: 'switchOption',
    type: 'object',
    category: 'render',
    objectProps: [
      { name: 'colorType', type: 'enum', enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'], defaultValue: 'green' },
      { name: 'disabled', type: 'boolean', defaultValue: false },
    ],
  },
];

const LargeVariantSwitchConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={LargeVariantSwitch} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default LargeVariantSwitchConfigDemo;
