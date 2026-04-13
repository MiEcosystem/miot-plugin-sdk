'use strict';

import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { SliderWithToggle, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { SliderIcon } from "mhui-rn/dist/icons";
import { dynamicStyleSheet } from 'miot/ui/Style';

const defaultSliderProps = { value: 50, min: 0, max: 100, step: 1, color: 'blue' };
const defaultButtonProps = { value: true, onValueChange: (val) => Alert.alert('onValueChange', String(val)), colorType: 'blue', icon: <SliderIcon /> };

const propConfigs = [
  {
    name: 'sliderProps',
    type: 'object',
    defaultValue: defaultSliderProps,
    category: 'content',
    objectProps: [
      { name: 'value', type: 'number', defaultValue: 50 },
      { name: 'min', type: 'number', defaultValue: 0 },
      { name: 'max', type: 'number', defaultValue: 100 },
      { name: 'step', type: 'number', defaultValue: 1 },
      {
        name: 'color',
        type: 'enum',
        enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
        defaultValue: 'blue',
      },
      { name: 'disabled', type: 'boolean', defaultValue: false },
      { name: 'active', type: 'boolean', defaultValue: true },
    ],
  },
  {
    name: 'buttonProps',
    type: 'pass',
    category: 'content',
    defaultValue: defaultButtonProps,
    passOptions: [
      { label: '带按钮', value: defaultButtonProps },
      { label: '无按钮', value: undefined },
    ],
  },
  { name: 'spacing', type: 'number', defaultValue: 8, category: 'content' },
];

const SliderWithToggleConfigDemo = () => (
  <ScrollView style={styles.container}>
    <TestComponent component={SliderWithToggle} propConfigs={propConfigs} />
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SliderWithToggleConfigDemo;
