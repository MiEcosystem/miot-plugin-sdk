'use strict';

import React from 'react';
import { View, Image } from 'react-native';
import { LargeListToggle, colorToken, SubtitleGroup, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const groupIcon = require('../../images/group.png');
const icon = <Image source={groupIcon} style={{ width: 40, height: 40, borderRadius: 8 }} />;
const smallIcon = <Image source={groupIcon} style={{ width: 24, height: 24, borderRadius: 4 }} />;
const svgIcon = <Circle fill={colorToken.contentPrimaryNormal} />;

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '大型列表开关', category: 'content' },
  { name: 'subtitle', type: 'string', defaultValue: 'subtitle', passOptions: [
    { label: '副标题组（2项）', value: <SubtitleGroup subtitles={['副标题文字', '副标题文字']} /> },
    { label: '副标题组（3项）', value: <SubtitleGroup subtitles={['副标题文字', '副标题文字', '副标题文字']} /> },
  ], category: 'content' },
  { name: 'checked', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
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
    defaultValue: (val) => showToast(`onChange: ${ val }`),
    category: 'interaction',
    linkTo: { targetProp: 'checked', pick: (...args) => args[0] },
    passOptions: [{ label: 'onChange', value: (val) => showToast(`onChange: ${ val }`) }],
  },
  { name: 'onPress', type: 'pass', defaultValue: () => showToast('onPress'), category: 'interaction', passOptions: [{ label: 'onPress', value: () => showToast('onPress') }] },
  {
    name: 'leadingIcon',
    type: 'pass',
    category: 'resource',
    defaultValue: svgIcon,
    passOptions: [
      { label: 'SVG图标', value: svgIcon },
      { label: '图片图标', value: icon },
      { label: '图片图标（小）', value: smallIcon },
    ],
  },
];

const LargeListToggleConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={LargeListToggle} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default LargeListToggleConfigDemo;
