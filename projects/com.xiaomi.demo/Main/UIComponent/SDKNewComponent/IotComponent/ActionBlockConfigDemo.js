'use strict';

import React from 'react';
import { View } from 'react-native';
import { ActionBlock, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle, Cold } from 'miot/ui/icons';

const iconCircle = <Circle fill={colorToken.contentPrimaryNormal} width={20} height={20} />;
const iconCold = <Cold fill={colorToken.contentPrimaryNormal} width={20} height={20} />;
const noop = () => {};

const options2 = [
  { title: '选项一', subtitle: '副标题', icon: iconCircle, onPress: () => showToast('选项一') },
  { title: '选项二', subtitle: '副标题', icon: iconCircle, onPress: () => showToast('选项二') },
];

const options3 = [
  { title: '选项一', icon: iconCircle, onPress: () => showToast('选项一') },
  { title: '选项二', icon: iconCircle, onPress: () => showToast('选项二') },
  { title: '选项三', icon: iconCircle, onPress: () => showToast('选项三') },
];

const multiColor4 = [
  { title: '选项一', subtitle: '描述', icon: iconCircle, colorType: 'blue', onPress: () => showToast('选项一') },
  { title: '选项二', subtitle: '描述', icon: iconCircle, colorType: 'orange', onPress: () => showToast('选项二') },
  { title: '选项三', subtitle: '描述', icon: iconCircle, colorType: 'green', onPress: () => showToast('选项三') },
  { title: '选项四', subtitle: '描述', icon: iconCircle, colorType: 'purple', onPress: () => showToast('选项四') },
];

const grid6 = [
  { title: '制冷', icon: iconCircle, onPress: noop },
  { title: '制热', icon: iconCircle, onPress: noop },
  { title: '送风', icon: iconCircle, onPress: noop },
  { title: '除湿', icon: iconCircle, onPress: noop },
  { title: '自动', icon: iconCircle, onPress: noop },
  { title: '睡眠', icon: iconCircle, onPress: noop },
];

const propConfigs = [
  {
    name: 'options',
    type: 'object',
    category: 'content',
    defaultValue: options2,
    objectProps: [
      { name: '0.title', type: 'string', defaultValue: '选项一' },
      { name: '0.subtitle', type: 'string', defaultValue: '副标题' },
      { name: '0.icon', type: 'pass', defaultValue: iconCircle, passOptions: [{ label: 'Circle', value: iconCircle }, { label: 'Cold', value: iconCold }] },
      { name: '0.actionType', type: 'enum', enumOptions: ['none', 'navigate', 'select'], defaultValue: 'none' },
      { name: '0.colorType', type: 'enum', enumOptions: ['blue', 'orange', 'green', 'purple', 'wathet'], defaultValue: undefined },
      { name: '0.onPress', type: 'pass', defaultValue: () => showToast('选项一'), passOptions: [{ label: 'onPress', value: () => showToast('选项一') }] },
    ],
    passOptions: [
      { label: '2个(带副标题)', value: options2 },
      { label: '3个(无副标题)', value: options3 },
      { label: '4个(多色)', value: multiColor4 },
      { label: '6个(三列)', value: grid6 },
    ],
  },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'maxColumns',
    type: 'enum',
    enumOptions: ['2', '3'],
    defaultValue: '2',
    category: 'state',
  },
];

const ActionBlockConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={ActionBlock} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default ActionBlockConfigDemo;
