'use strict';

import React from 'react';
import { View, Image, Alert } from 'react-native';
import { LargeListEntrance, colorToken, SubtitleGroup } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const groupIcon = require('../../images/group.png');
const icon = <Image source={groupIcon} style={{ width: 40, height: 40, borderRadius: 8 }} />;
const smallIcon = <Image source={groupIcon} style={{ width: 24, height: 24, borderRadius: 4 }} />;
const svgIcon = <Circle fill={colorToken.contentPrimaryNormal} />;

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '大型入口', category: 'content' },
  { name: 'subtitle', type: 'string', defaultValue: 'subtitle', passOptions: [
    { label: '场景图标', value: icon },
    { label: '小图标', value: smallIcon },
    { label: '副标题组', value: <SubtitleGroup subtitles={['副标题文字', '副标题文字', '副标题文字']}/> },
  ], category: 'content' },
  { name: 'value', type: 'string', defaultValue: 'Value', category: 'content' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'badge', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'onPress', type: 'pass', defaultValue: () => Alert.alert('onPress'), category: 'interaction', passOptions: [{ label: 'onPress', value: () => Alert.alert('onPress') }] },
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

const LargeListEntranceConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={LargeListEntrance} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default LargeListEntranceConfigDemo;
