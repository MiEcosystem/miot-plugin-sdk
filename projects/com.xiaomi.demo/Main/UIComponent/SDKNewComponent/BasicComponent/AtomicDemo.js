'use strict';

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { Switch } from 'miot/ui/hyperOSUI';
import { colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';
import NavigationBar from "miot/ui/NavigationBar";

const colors = ['green', 'blue', 'orange', 'wathet', 'purple'];
const alert = Alert.alert;

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
