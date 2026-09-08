'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { SliderWithToggle, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { SliderIcon } from "mhui-rn/dist/icons";
import { showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const noop = () => {};
const defaultSliderProps = {
  value: 60, min: 0, max: 100, step: 20, color: 'blue',
  disabled: false, active: true, discrete: false, pattern: true,
  showLabel: true, isPercent: false,
  mark: [0, 20, 40, 60, 80, 100],
  onChange: (val) => showToast(`onChange: ${ val }`),
  onAfterChange: (val) => showToast(`onAfterChange: ${ val }`),
};
const iconChecked = <SliderIcon fill={colorToken.contentInversePrimary} />;
const iconUnchecked = <SliderIcon fill={colorToken.contentSecondaryNormal} />;
const defaultButtonProps = { checked: true, onChange: noop, colorType: 'blue', icon: iconChecked };

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
      { name: 'step', type: 'number', defaultValue: 20 },
      { name: 'disabled', type: 'boolean', defaultValue: false },
      { name: 'active', type: 'boolean', defaultValue: true },
      { name: 'discrete', type: 'boolean', defaultValue: false },
      { name: 'pattern', type: 'boolean', defaultValue: true },
      { name: 'showLabel', type: 'boolean', defaultValue: true },
      { name: 'isPercent', type: 'boolean', defaultValue: false },
      {
        name: 'color',
        type: 'enum',
        enumOptions: ['blue', 'green', 'orange', 'purple', 'wathet'],
        defaultValue: 'blue',
      },
      {
        name: 'mark',
        type: 'pass',
        defaultValue: [0, 20, 40, 60, 80, 100],
        passOptions: [
          { label: '[0, 20, 40, 60, 80, 100]', value: [0, 20, 40, 60, 80, 100] },
          { label: '[0, 33, 66, 100]', value: [0, 33, 66, 100] },
        ],
      },
      {
        name: 'onChange',
        type: 'pass',
        defaultValue: (val) => showToast(`onChange: ${ val }`),
        passOptions: [{ label: 'onChange', value: (val) => showToast(`onChange: ${ val }`) }],
      },
      {
        name: 'onAfterChange',
        type: 'pass',
        defaultValue: (val) => showToast(`onAfterChange: ${ val }`),
        passOptions: [{ label: 'onAfterChange', value: (val) => showToast(`onAfterChange: ${ val }`) }],
      },
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
          { label: 'SliderIcon（checked 白色）', value: iconChecked },
          { label: 'SliderIcon（unchecked 默认色）', value: iconUnchecked },
          { label: '无图标', value: undefined },
        ],
        defaultValue: iconChecked,
      },
    ],
  }
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
