'use strict';

import React, { useState } from 'react';
import { View } from 'react-native';
import { PickerDialog, BlockButton, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui';

const oneColumn = [
  { title: '选项', options: ['选项A', '选项B', '选项C', '选项D', '选项E'], defaultValue: '选项A' },
];

const twoColumns = [
  { title: '小时', options: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')), defaultValue: '08' },
  { title: '分钟', options: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')), defaultValue: '30' },
];

const threeColumns = [
  { title: '年', options: ['2024', '2025', '2026'], defaultValue: '2026' },
  { title: '月', options: Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')), defaultValue: '04' },
  { title: '日', options: Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')), defaultValue: '14' },
];

const fourColumns = [
  { title: '年', options: ['2024', '2025', '2026'], defaultValue: '2026' },
  { title: '月', options: Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')), defaultValue: '04' },
  { title: '日', options: Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')), defaultValue: '14' },
  { title: '时', options: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')), defaultValue: '08' },
];

const longTextOneColumn = [
  {
    title: '这是一个非常长的列标题用于测试省略号显示效果',
    options: [
      '超长选项文本一用来测试文本溢出处理效果展示更长的内容',
      '另一个非常长的选项文本展示截断与省略号的差异',
      '中等长度的选项文本',
      '短选项',
    ],
    defaultValue: '短选项',
  },
];

const longTextTwoColumns = [
  {
    title: '城市名称较长测试',
    options: ['北京市朝阳区', '上海市浦东新区', '深圳市南山区科技园', '广州市天河区珠江新城商圈'],
    defaultValue: '北京市朝阳区',
  },
  {
    title: '区域名称较长测试',
    options: ['朝阳区', '海淀中关村科技园区', '西城金融街道办事处', '东城区东直门街道'],
    defaultValue: '朝阳区',
  },
];

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '选择器弹窗', category: 'content' },
  { name: 'cancelable', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'hasShade', type: 'boolean', defaultValue: true, category: 'state' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
    defaultValue: 'green',
    category: 'state',
  },
  {
    name: 'columns',
    type: 'pass',
    category: 'content',
    defaultValue: twoColumns,
    passOptions: [
      { label: '单列', value: oneColumn },
      { label: '两列（时分）', value: twoColumns },
      { label: '三列（年月日）', value: threeColumns },
      { label: '四列（年月日时）', value: fourColumns },
      { label: '长文本单列', value: longTextOneColumn },
      { label: '长文本两列', value: longTextTwoColumns },
    ],
  },
];

const PickerDialogDemo = () => {
  const [visible, setVisible] = useState(false);
  const [dialogProps, setDialogProps] = useState({});

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setDialogProps(props)}
      />
      <PickerDialog
        {...dialogProps}
        columns={dialogProps.columns || twoColumns}
        visible={visible}
        onDismiss={() => setVisible(false)}
        onChange={(values, colIdx) => console.log('变化:', values, '列:', colIdx)}
        onConfirm={(values) => {
          console.log('确认:', values);
          setVisible(false);
        }}
        buttons={[
          { title: '取消', type: 'normal', callback: () => setVisible(false) },
          { title: '确认', type: 'primary' },
        ]}
      />
      <View style={styles.buttonWrapper}>
        <BlockButton title="显示选择器" type="primary" onPress={() => setVisible(true)} />
      </View>
    </View>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  buttonWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
});

export default PickerDialogDemo;
