'use strict';

import React from 'react';
import { View, Text } from 'react-native';
import { SelectList, colorToken, showToast, Button } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const icon = <Circle fill={colorToken.contentPrimaryNormal} />;
const customButton = <Button title="操作" size="small" type="primarySubtle" onPress={() => showToast('自定义按钮')} />;
const customText = <Text style={{ fontSize: 12, color: colorToken.accentBlueFill }}>自定义</Text>;

const simpleOptions = [
  { value: 1, title: '选项一' },
  { value: 2, title: '选项二' },
  { value: 3, title: '选项三' },
];

const richOptions = [
  { value: 1, title: '选项一', subtitle: '副标题', leadingIcon: icon },
  { value: 2, title: '选项二', subtitle: '副标题', leadingIcon: icon },
  { value: 3, title: '禁用选项', disabled: true },
];

const groupOptions = [
  {
    value: 'a', title: '分组 A',
    subItems: [
      { title: '子项 1', value: '值', actionType: 'navigate', onPress: () => showToast('子项1') },
      { title: '子项 2', value: '值', actionType: 'select', badge: true, onPress: () => showToast('子项2') },
      { title: '子项 3', actionType: 'none', onPress: () => showToast('子项3') },
    ],
  },
  { value: 'b', title: '分组 B' },
];

const propConfigs = [
  {
    name: 'options',
    type: 'object',
    category: 'content',
    defaultValue: groupOptions,
    objectProps: [
      { name: '0.title', type: 'string', defaultValue: '选项一' },
      { name: '0.subtitle', type: 'string', defaultValue: '' },
      { name: '0.leadingIcon', type: 'pass', defaultValue: undefined, passOptions: [{ label: 'SVG图标', value: icon }] },
      { name: '0.disabled', type: 'boolean', defaultValue: false },
      { name: '0.subItems.0.title', type: 'string', defaultValue: '子项 1' },
      { name: '0.subItems.0.value', type: 'string', defaultValue: '值' },
      { name: '0.subItems.0.actionType', type: 'enum', enumOptions: ['navigate', 'select', 'custom', 'none'], defaultValue: 'navigate' },
      { name: '0.subItems.0.customRender', type: 'pass', defaultValue: undefined, passOptions: [{ label: '按钮', value: customButton }, { label: '文字', value: customText }] },
      { name: '0.subItems.0.badge', type: 'boolean', defaultValue: false },
      { name: '0.subItems.0.disabled', type: 'boolean', defaultValue: false },
    ],
    passOptions: [
      { label: '简单选项', value: simpleOptions },
      { label: '图标+副标题', value: richOptions },
      { label: '分组选项', value: groupOptions },
    ],
  },
  { name: 'value', type: 'pass', defaultValue: 'a', category: 'state',
    passOptions: [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: "a", value: 'a' },
      { label: "b", value: 'b' },
    ],
  },
  {
    name: 'selectedAlign',
    type: 'enum',
    enumOptions: ['left', 'right'],
    defaultValue: 'left',
    category: 'state',
  },
  { name: 'isGroup', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'colorType', type: 'enum', enumOptions: ['green', 'blue', 'purple', 'orange', 'wathet'], defaultValue: 'green', category: 'state' },
  { name: 'onChange', type: 'pass', defaultValue: (val) => showToast(`onChange: ${ val }`), category: 'interaction', linkTo: { targetProp: 'value' }, passOptions: [{ label: 'onChange', value: (val) => showToast(`onChange: ${ val }`) }] },
  { name: 'onSelect', type: 'pass', category: 'interaction', passOptions: [{ label: 'onSelect', value: (item) => showToast(`onSelect: ${ JSON.stringify(item) }`) }] },
];

const SelectListConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={SelectList} propConfigs={propConfigs} showPreviewBg={false}/>
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SelectListConfigDemo;
