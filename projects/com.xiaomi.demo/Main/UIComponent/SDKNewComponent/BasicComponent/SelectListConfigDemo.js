'use strict';

import React from 'react';
import { View } from 'react-native';
import { SelectList, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const icon = <Circle fill={colorToken.contentPrimaryNormal} />;

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
      { value: 's1', title: '子项 1', trailingValue: '值', showNavigate: true, onPress: () => showToast('子项1') },
      { value: 's2', title: '子项 2', trailingValue: '值', showNavigate: true, onPress: () => showToast('子项2') },
    ],
  },
  { value: 'b', title: '分组 B' },
];

const propConfigs = [
  {
    name: 'options',
    type: 'pass',
    category: 'content',
    defaultValue: simpleOptions,
    passOptions: [
      { label: '简单选项', value: simpleOptions },
      { label: '图标+副标题', value: richOptions },
      { label: '分组选项', value: groupOptions },
    ],
  },
  { name: 'value', type: 'pass', defaultValue: 1, category: 'state',
    passOptions: [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: "'a'", value: 'a' },
    ],
  },
  {
    name: 'selectedAlign',
    type: 'enum',
    enumOptions: ['left', 'right'],
    defaultValue: 'right',
    category: 'state',
  },
  { name: 'isGroup', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'onChange', type: 'pass', defaultValue: (val) => showToast(`onChange: ${ val }`), category: 'interaction', linkTo: { targetProp: 'value' }, passOptions: [{ label: 'onChange', value: (val) => showToast(`onChange: ${ val }`) }] },
  { name: 'onSelect', type: 'pass', category: 'interaction', passOptions: [{ label: 'onSelect', value: (item) => showToast(`onSelect: ${ JSON.stringify(item) }`) }] },
];

const SelectListConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={SelectList} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SelectListConfigDemo;
