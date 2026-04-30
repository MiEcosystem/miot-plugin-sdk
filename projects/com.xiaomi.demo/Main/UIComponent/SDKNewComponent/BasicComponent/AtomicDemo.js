'use strict';

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { Switch, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';
import NavigationBar from "miot/ui/NavigationBar";

const colors = ['green', 'blue', 'orange', 'wathet', 'purple'];

const propConfigs = [
  { name: 'checked', type: 'boolean', defaultValue: false },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
    defaultValue: 'green',
  },
  { name: 'onChange', type: 'pass', defaultValue: (val) => Alert.alert('onChange', String(val)), linkTo: { targetProp: 'checked' } },
];

const AtomicDemo = ({ navigation }) => {
  const [disabled, setDisabled] = useState(false);
  const [valueSwitch, setValueSwitch] = useState(colors.map(() => false));

  useEffect(() => {
    navigation.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => setDisabled((prev) => !prev),
        },
      ],
    });
  }, []);

  const renderSwitch = () =>
    colors.map((color, index) => (
      <View key={color} style={{ marginTop: index === 0 ? 0 : 52 }}>
        <Switch
          colorType={color}
          checked={valueSwitch[index]}
          disabled={disabled}
          onChange={() => {
            const newValues = [...valueSwitch];
            newValues[index] = !newValues[index];
            setValueSwitch(newValues);
          }}
        />
      </View>
    ));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Switch - 开关组件</Text>
      <View style={styles.component}>
        <View style={styles.column}>{renderSwitch()}</View>
      </View>
      <Text style={[styles.header, { marginTop: 12 }]}>Switch - 配置调试</Text>
      <TestComponent component={Switch} propConfigs={propConfigs} />
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.surfacePageLow,
  },
  component: {
    flexDirection: 'row',
    paddingHorizontal: 27,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentPrimaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  column: {
    marginRight: 27,
  },
});

export default AtomicDemo;
