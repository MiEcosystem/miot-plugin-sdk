'use strict';

import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { ListItem, Checkbox, colorToken, TestComponent, SubtitleGroup } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const groupIcon = require('../../images/group.png');
const icon = <Image source={groupIcon} style={{ width: 40, height: 40, borderRadius: 8 }} />;
const smallIcon = <Image source={groupIcon} style={{ width: 24, height: 24, borderRadius: 4 }} />;
const avatarIcon = <Image source={groupIcon} style={{ width: 40, height: 40, borderRadius: 20 }} />;

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: 'Title', category: 'content' },
  { name: 'subtitle', type: 'string', defaultValue: 'subtitle', passOptions: [
    { label: '场景图标', value: icon },
    { label: '小图标', value: smallIcon },
    { label: '副标题组', value: <SubtitleGroup subtitles={['副标题文字', '副标题文字', '副标题文字']}/> },
  ], category: 'content' },
  { name: 'value', type: 'string', defaultValue: 'Value', category: 'content' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'badge', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'actionType', type: 'enum', enumOptions: ['navigate', 'select', 'none', 'custom'], defaultValue: 'navigate', category: 'state' },
  { name: 'onPress', type: 'pass', defaultValue: () => Alert.alert('onPress'), category: 'interaction', passOptions: [{ label: 'onPress', value: () => Alert.alert('onPress') }] },
  { name: 'onLongPress', type: 'pass', defaultValue: () => Alert.alert('onLongPress'), category: 'interaction', passOptions: [{ label: 'onLongPress', value: () => Alert.alert('onLongPress') }] },
  {
    name: 'leadingIcon',
    type: 'pass',
    category: 'resource',
    passOptions: [
      { label: '场景图标', value: icon },
      { label: '小图标', value: smallIcon },
      { label: '头像', value: avatarIcon },
    ],
  },
  {
    name: 'customRender',
    type: 'pass',
    category: 'render',
    passOptions: [
      { label: 'Checkbox', value: <Checkbox checked onChange={() => {}} /> },
      { label: '图片', value: <Image style={{ width: 46, height: 46 }} source={groupIcon} /> },
      { label: '文字', value: <Text style={{ color: colorToken.accentBlueFill }}>v1.2.3</Text> },
    ],
  },
];

const ListItemConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={ListItem} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default ListItemConfigDemo;
