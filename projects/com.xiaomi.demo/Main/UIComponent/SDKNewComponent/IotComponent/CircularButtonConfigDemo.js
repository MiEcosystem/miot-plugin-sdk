'use strict';

import React from 'react';
import { View, Image, Alert } from 'react-native';
import { CircularButton, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const groupIcon = require('../../images/group.png');
const icon = <Image source={groupIcon} style={{ width: 24, height: 24, borderRadius: 4 }} />;
const svgIcon = <Circle fill={colorToken.contentPrimaryNormal} />;

const propConfigs = [
  { name: 'checked', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'size',
    type: 'enum',
    enumOptions: ['small', 'medium'],
    defaultValue: 'medium',
    category: 'state',
  },
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
  {
    name: 'icon',
    type: 'pass',
    category: 'resource',
    defaultValue: svgIcon,
    passOptions: [{ label: 'SVG图标', value: svgIcon }, { label: '图片图标', value: icon }],
  },
];

const CircularButtonConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={CircularButton} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default CircularButtonConfigDemo;
