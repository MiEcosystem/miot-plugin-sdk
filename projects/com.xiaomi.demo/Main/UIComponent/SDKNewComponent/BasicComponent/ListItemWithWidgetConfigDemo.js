'use strict';

import React from 'react';
import { View, Text, Image } from 'react-native';
import { ListItemWithWidget, Radio, Switch, colorToken, SubtitleGroup, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const groupIcon = require('../../images/group.png');
const icon = <Image source={groupIcon} style={{ width: 40, height: 40, borderRadius: 8 }} />;
const smallIcon = <Image source={groupIcon} style={{ width: 24, height: 24, borderRadius: 4 }} />;
const svgIcon = <Circle fill={colorToken.contentPrimaryNormal} />;

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: 'Title', category: 'content' },
  { name: 'subtitle', type: 'string', defaultValue: 'subtitle', passOptions: [
    { label: '场景图标', value: icon },
    { label: '小图标', value: smallIcon },
    { label: '副标题组', value: <SubtitleGroup subtitles={['副标题文字', '副标题文字', '副标题文字']}/> },
  ], category: 'content' },
  {
    name: 'widgetType',
    type: 'enum',
    enumOptions: ['switch', 'button', 'circularButton', 'custom'],
    defaultValue: 'switch',
    category: 'state',
  },
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
  { name: 'onLongPress', type: 'pass', defaultValue: undefined, category: 'interaction', passOptions: [{ label: 'onLongPress', value: () => showToast('onLongPress') }] },
  { name: 'delayLongPress', type: 'number', defaultValue: undefined, category: 'interaction' },
  {
    name: 'leadingIcon',
    type: 'pass',
    category: 'resource',
    passOptions: [
      { label: 'SVG图标', value: svgIcon },
      { label: '图片图标', value: icon },
      { label: '图片图标（小）', value: smallIcon },
    ],
  },
  {
    name: 'customRender',
    type: 'pass',
    category: 'render',
    passOptions: [
      { label: 'Radio', value: <Radio checked onChange={() => {}} /> },
      { label: '文字', value: <Text style={{ color: colorToken.accentBlueFill }}>自定义</Text> },
    ],
  },
  {
    name: 'switchOption',
    type: 'object',
    category: 'render',
    objectProps: [
    ],
  },
  {
    name: 'buttonOption',
    type: 'object',
    category: 'render',
    objectProps: [
      { name: 'title', type: 'string', defaultValue: '按钮' },
      { name: 'size', type: 'enum', enumOptions: ['small', 'medium', 'large'], defaultValue: 'small' },
      { name: 'type', type: 'enum', enumOptions: ['primary', 'primarySubtle', 'warning', 'default', 'ghost'], defaultValue: 'primary' },
    ],
  },
  {
    name: 'circularButtonOption',
    type: 'object',
    category: 'render',
    objectProps: [
      { name: 'icon', type: 'pass', passOptions: [{ label: 'SVG图标', value: svgIcon }, { label: '图片图标', value: icon }], defaultValue: svgIcon },
      { name: 'size', type: 'enum', enumOptions: ['small', 'medium'], defaultValue: 'small' },
    ],
  },
];

const ListItemWithWidgetConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={ListItemWithWidget} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default ListItemWithWidgetConfigDemo;
