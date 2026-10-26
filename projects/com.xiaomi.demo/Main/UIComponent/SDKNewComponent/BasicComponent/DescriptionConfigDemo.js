'use strict';

import React from 'react';
import { View } from 'react-native';
import { Description, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const createHighlight = (label) => ({
  onPress: () => {
    console.log(`[DescriptionConfigDemo] ${ label } onPress`);
    showToast(`点击了${ label }`);
  },
});

const propConfigs = [
  { name: 'desc', type: 'string', defaultValue: '开启后将自动更新，详情请查看[1隐私政策]和[2用户协议]', category: 'content' },
  { name: 'singleLine', type: 'enum', enumOptions: ['center', 'left'], defaultValue: 'center', category: 'content' },
  {
    name: 'bracketType',
    type: 'string',
    category: 'content',
    passOptions: [
      { label: '不解析（默认）', value: '' },
      { label: '[]', value: '[]' },
      { label: '{}', value: '{}' },
      { label: '()', value: '()' },
      { label: '$$', value: '$$' },
    ],
  },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'colorType', type: 'enum', enumOptions: ['green', 'blue', 'purple', 'orange', 'wathet'], defaultValue: 'green', category: 'state' },
  {
    name: 'highlights',
    type: 'pass',
    category: 'interaction',
    defaultValue: [
      createHighlight('隐私政策'),
      createHighlight('用户协议'),
    ],
    passOptions: [
      {
        label: '2个高亮回调',
        value: [
          createHighlight('隐私政策'),
          createHighlight('用户协议'),
        ],
      },
      {
        label: '1个高亮回调',
        value: [
          createHighlight('隐私政策'),
        ],
      },
      {
        label: '无高亮',
        value: undefined,
      },
    ],
  },
];

const DescriptionConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={Description} propConfigs={propConfigs} showPreviewBg={false}/>
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default DescriptionConfigDemo;
