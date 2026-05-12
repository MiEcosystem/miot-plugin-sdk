'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { SliderWithToggle, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { SliderIcon } from "mhui-rn/dist/icons";
import { dynamicStyleSheet } from 'miot/ui/Style';

const noop = () => {};
const defaultSliderProps = { value: 50, min: 0, max: 100, step: 1, color: 'blue' };
const defaultButtonProps = { checked: true, onChange: noop, colorType: 'blue', icon: <SliderIcon /> };

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
    type: 'object',
    defaultValue: defaultButtonProps,
    category: 'content',
    objectProps: [
      { name: 'checked', type: 'boolean', defaultValue: true },
      { name: 'disabled', type: 'boolean', defaultValue: false },
      {
        name: 'colorType',
        type: 'enum',
        enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
        defaultValue: 'blue',
      },
      {
        name: 'icon',
        type: 'pass',
        passOptions: [
          { label: 'SliderIcon', value: <SliderIcon /> },
          { label: '无图标', value: undefined },
        ],
        defaultValue: <SliderIcon />,
      },
    ],
  },
  { name: 'spacing', type: 'number', defaultValue: 8, category: 'content' },
];

const SliderWithToggleConfigDemo = () => (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
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
