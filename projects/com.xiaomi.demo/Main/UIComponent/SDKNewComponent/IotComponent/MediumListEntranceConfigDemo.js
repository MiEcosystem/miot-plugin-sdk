'use strict';

import React from 'react';
import { View, Image } from 'react-native';
import { MediumListEntrance, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const groupIcon = require('../../images/group.png');
const icon = <Image source={groupIcon} style={{ width: 24, height: 24, borderRadius: 4 }} />;
const svgIcon = <Circle fill={colorToken.contentPrimaryNormal} />;

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '中型入口', category: 'content' },
  { name: 'subtitle', type: 'string', defaultValue: '', category: 'content' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'onPress', type: 'pass', defaultValue: () => showToast('onPress'), category: 'interaction', passOptions: [{ label: 'onPress', value: () => showToast('onPress') }] },
  {
    name: 'leadingIcon',
    type: 'pass',
    category: 'resource',
    defaultValue: svgIcon,
    passOptions: [{ label: 'SVG图标', value: svgIcon }, { label: '图片图标', value: icon }],
  },
];

const MediumListEntranceConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={MediumListEntrance} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default MediumListEntranceConfigDemo;
