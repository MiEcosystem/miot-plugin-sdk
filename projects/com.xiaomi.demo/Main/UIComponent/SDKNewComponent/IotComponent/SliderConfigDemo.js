'use strict';

import React from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Slider, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const propConfigs = [
  { name: 'value', type: 'number', defaultValue: 50, category: 'content' },
  { name: 'min', type: 'number', defaultValue: 0, category: 'content' },
  { name: 'max', type: 'number', defaultValue: 100, category: 'content' },
  { name: 'step', type: 'number', defaultValue: 20, category: 'content' },
  { name: 'height', type: 'number', defaultValue: 28, category: 'content' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'active', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'discrete', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'pattern', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'showLabel', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'isPercent', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'color',
    type: 'enum',
    enumOptions: ['blue', 'green', 'orange', 'purple', 'wathet'],
    defaultValue: 'blue',
    category: 'state',
  },
  {
    name: 'mark',
    type: 'pass',
    category: 'resource',
    defaultValue: [0, 20, 40, 60, 80, 100],
    passOptions: [
      { label: '[0, 20, 40, 60, 80, 100]', value: [0, 20, 40, 60, 80, 100] },
      { label: '[0, 33, 66, 100]', value: [0, 33, 66, 100] },
    ],
  },
  {
    name: 'onChange',
    type: 'pass',
    defaultValue: (val) => Alert.alert('onChange', String(val)),
    category: 'interaction',
    linkTo: { targetProp: 'value', pick: (...args) => args[0] },
    passOptions: [{ label: 'onChange', value: (val) => Alert.alert('onChange', String(val)) }],
  },
  { name: 'onAfterChange', type: 'pass', defaultValue: (val) => Alert.alert('onAfterChange', String(val)), category: 'interaction', passOptions: [{ label: 'onAfterChange', value: (val) => Alert.alert('onAfterChange', String(val)) }] },
];

const SliderConfigDemo = () => (
  <ScrollView style={styles.container}>
    <TestComponent component={Slider} propConfigs={propConfigs}/>
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SliderConfigDemo;
