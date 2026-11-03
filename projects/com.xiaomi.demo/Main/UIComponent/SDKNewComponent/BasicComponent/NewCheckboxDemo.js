'use strict';

import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Checkbox, colorToken, Fonts } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import NavigationBar from 'miot/ui/NavigationBar';

const NewCheckboxDemo = ({ navigation }) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [selected, setSelected] = useState({ a: false, b: true, c: false });

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('CheckboxConfigDemo', { title: 'Checkbox 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>基础用法</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Checkbox checked={checked1} onChange={setChecked1} />
          <Text style={styles.label}>未选中</Text>
        </View>
        <View style={styles.row}>
          <Checkbox checked={checked2} onChange={setChecked2} />
          <Text style={styles.label}>已选中</Text>
        </View>
      </View>

      <Text style={styles.header}>多选组</Text>
      <View style={styles.card}>
        {['a', 'b', 'c'].map((val) => (
          <View key={val} style={styles.row}>
            <Checkbox checked={selected[val]} onChange={(next) => setSelected((prev) => ({ ...prev, [val]: next }))} />
            <Text style={styles.label}>选项 {val.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.header}>色系</Text>
      <View style={styles.card}>
        {['green', 'blue', 'orange', 'purple', 'wathet'].map((color) => (
          <View key={color} style={styles.row}>
            <Checkbox checked colorType={color} onChange={() => {}} />
            <Text style={styles.label}>{color}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.header}>禁用状态</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Checkbox checked={false} disabled onChange={() => {}} />
          <Text style={styles.label}>禁用未选</Text>
        </View>
        <View style={styles.row}>
          <Checkbox checked disabled onChange={() => {}} />
          <Text style={styles.label}>禁用已选</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
    paddingTop: 12,
  },
  header: {
    ...Fonts.fontSystem12Regular,
    color: colorToken.contentTertiaryNormal,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  card: {
    marginHorizontal: 12,
    backgroundColor: colorToken.surfaceCardPrimary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    ...Fonts.fontSystem16Regular,
    color: colorToken.contentPrimaryNormal,
    marginLeft: 12,
  },
});

export default NewCheckboxDemo;
