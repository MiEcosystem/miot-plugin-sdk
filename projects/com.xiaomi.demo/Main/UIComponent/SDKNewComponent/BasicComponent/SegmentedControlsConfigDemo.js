'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { SegmentedControls, colorToken, TestComponent, showToast } from 'miot/ui/hyperOSUI';

const SafeSegmentedControls = (props) => {
  if (!props.options || !Array.isArray(props.options)) return null;
  return <SegmentedControls {...props} />;
};
import { dynamicStyleSheet } from 'miot/ui/Style';

const defaultOptions = [
  { label: '选项一', value: 'opt1' },
  { label: '选项二', value: 'opt2' },
  { label: '选项三', value: 'opt3' },
];

const propConfigs = [
  {
    name: 'options',
    type: 'pass',
    defaultValue: defaultOptions,
    category: 'content',
    passOptions: [
      { label: '两个选项', value: [{ label: '选项一', value: 'opt1' }, { label: '选项二', value: 'opt2' }] },
      { label: '三个选项', value: [{ label: '选项一', value: 'opt1' }, { label: '选项二', value: 'opt2' }, { label: '选项三', value: 'opt3' }] },
      { label: '四个选项', value: [{ label: '选项一', value: 'opt1' }, { label: '选项二', value: 'opt2' }, { label: '选项三', value: 'opt3' }, { label: '选项四', value: 'opt4' }] },
      { label: '五个选项', value: [{ label: '选项一', value: 'opt1' }, { label: '选项二', value: 'opt2' }, { label: '选项三', value: 'opt3' }, { label: '选项四', value: 'opt4' }, { label: '选项五', value: 'opt5' }] },
    ],
  },
  { name: 'activeValue', type: 'string', defaultValue: 'opt1', category: 'state' },
  {
    name: 'onChange',
    type: 'pass',
    category: 'interaction',
    defaultValue: (value) => console.log('onChange', value),
    linkTo: { targetProp: 'activeValue', pick: (...args) => args[0] },
    passOptions: [{ label: 'onChange', value: (value) => showToast(`onChange: ${ value }`) }],
  },
];

const SegmentedControlsConfigDemo = () => (
  <ScrollView style={styles.container}>
    <TestComponent component={SafeSegmentedControls} propConfigs={propConfigs} fullWidth />
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SegmentedControlsConfigDemo;
