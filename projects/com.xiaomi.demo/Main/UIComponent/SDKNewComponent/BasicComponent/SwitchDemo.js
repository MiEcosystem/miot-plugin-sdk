'use strict';

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Switch, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';
import NavigationBar from 'miot/ui/NavigationBar';

const COLOR_TYPES = ['green', 'blue', 'wathet', 'purple', 'orange'];

const SwitchDemo = ({ navigation }) => {
  const [values, setValues] = useState(COLOR_TYPES.reduce((acc, c) => ({ ...acc, [c]: false }), {}));
  const [disabledOn, setDisabledOn] = useState(true);
  const [disabledOff, setDisabledOff] = useState(false);

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('SwitchConfigDemo', { title: 'Switch 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.sectionLabel}>各色系开关</Text>
      <View style={styles.card}>
        {COLOR_TYPES.map((colorType) => (
          <View key={colorType} style={styles.row}>
            <Text style={styles.label}>{colorType}</Text>
            <Switch
              checked={values[colorType]}
              onChange={(val) => setValues((prev) => ({ ...prev, [colorType]: val }))}
              colorType={colorType}
            />
          </View>
        ))}
      </View>

      <Text style={styles.sectionLabel}>禁用态</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>禁用 - 开</Text>
          <Switch checked={disabledOn} onChange={setDisabledOn} disabled />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>禁用 - 关</Text>
          <Switch checked={disabledOff} onChange={setDisabledOff} disabled />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 32,
  },
  sectionLabel: {
    fontSize: 14,
    color: colorToken.accentOsContent,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  card: {
    marginHorizontal: 12,
    backgroundColor: colorToken.surfaceCardPrimary,
    borderRadius: 16,
    paddingVertical: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    color: colorToken.contentPrimaryNormal,
  },
});

export default SwitchDemo;
