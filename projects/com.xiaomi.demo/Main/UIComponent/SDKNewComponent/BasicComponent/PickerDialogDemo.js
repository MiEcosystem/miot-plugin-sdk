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
