'use strict';

import React from 'react';
import { View, Alert } from 'react-native';
import { Checkbox, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const propConfigs = [
  { name: 'label', type: 'string', defaultValue: '选项', category: 'content' },
  { name: 'checked', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
    defaultValue: 'green',
    category: 'state',
  },
  {
    name: 'onValueChange',
    type: 'pass',
    defaultValue: (val) => Alert.alert('onValueChange', String(val)),
    category: 'interaction',
    linkTo: { targetProp: 'checked', pick: (...args) => args[0] },
    passOptions: [{ label: 'onValueChange', value: (val) => Alert.alert('onValueChange', String(val)) }],
  },
];

const CheckboxConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={Checkbox} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default CheckboxConfigDemo;
