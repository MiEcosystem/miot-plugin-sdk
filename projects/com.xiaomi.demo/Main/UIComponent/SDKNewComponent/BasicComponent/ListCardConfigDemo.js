'use strict';

import React from 'react';
import { View, Text, Image } from 'react-native';
import { ListCard, ListItem, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const childContent = [
  <ListItem key={0} title="列表项 1" onPress={() => {}} />,
  <ListItem key={1} title="列表项 2" onPress={() => {}} />,
  <ListItem key={2} title="列表项 3" onPress={() => {}} />,
];

const childContent2 = [
  <ListItem key={0} title="设置项 A" value="值A" onPress={() => {}} />,
  <ListItem key={1} title="设置项 B" value="值B" onPress={() => {}} />,
];

const customRenderNode = <Text style={{ fontSize: 12, color: colorToken.accentGreenFill }}>自定义</Text>;
const customRenderNode2 = <Text style={{ fontSize: 12, color: colorToken.accentGreenFill }}>自定义自定义自定义自定义自定义自定义自定义自定义自定义自定义自定义自定义自定义</Text>;
const groupIcon = require('../../images/group.png');
const icon = <Image source={groupIcon} style={{ width: 40, height: 40, borderRadius: 8 }} />;
const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '卡片标题', category: 'content' },
  { name: 'footer', type: 'string', defaultValue: '', category: 'content' },
  {
    name: 'titleSize',
    type: 'enum',
    enumOptions: ['small', 'medium', 'large'],
    defaultValue: 'small',
    category: 'state',
  },
  { name: 'onPress', type: 'pass', category: 'interaction', passOptions: [{ label: 'onPress', value: () => showToast('标题点击') }] },
  {
    name: 'customRender',
    type: 'pass',
    category: 'render',
    passOptions: [{ label: '自定义短文字', value: customRenderNode }, { label: '自定义长文字', value: customRenderNode2 }, { label: '图标', value: icon }],
  },
  {
    name: 'children',
    type: 'pass',
    category: 'render',
    defaultValue: childContent,
    passOptions: [
      { label: '3个列表项', value: childContent },
      { label: '2个带值列表项', value: childContent2 },
    ],
  },
];

const ListCardConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={ListCard} propConfigs={propConfigs} showPreviewBg={false} borderRadius={12}/>
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default ListCardConfigDemo;
