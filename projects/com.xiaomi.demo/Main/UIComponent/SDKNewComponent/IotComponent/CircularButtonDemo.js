'use strict';

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CircularButton, colorToken, Fonts } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';
import NavigationBar from 'miot/ui/NavigationBar';

const colors = ['green', 'blue', 'orange', 'wathet', 'purple'];
const icon = <Circle fill={colorToken.contentPrimaryNormal} />;

const CircularButtonDemo = ({ navigation }) => {
  const [checkedMap, setCheckedMap] = useState({});

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('CircularButtonConfigDemo', { title: 'CircularButton 配置调试' }) }],
    });
  }, []);

  const toggle = (key) => {
    setCheckedMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>CircularButton</Text>

      <Text style={styles.sectionTitle}>small 尺寸（默认）</Text>
      <View style={styles.row}>
        {colors.map((color) => (
          <View key={color} style={styles.item}>
            <CircularButton
              icon={icon}
              colorType={color}
              checked={!!checkedMap[`s-${ color }`]}
              onChange={() => toggle(`s-${ color }`)}
              size="small"
            />
            <Text style={styles.label}>{color}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>medium 尺寸</Text>
      <View style={styles.row}>
        {colors.map((color) => (
          <View key={color} style={styles.item}>
            <CircularButton
              icon={icon}
              colorType={color}
              checked={!!checkedMap[`m-${ color }`]}
              onChange={() => toggle(`m-${ color }`)}
              size="medium"
            />
            <Text style={styles.label}>{color}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>禁用态</Text>
      <View style={styles.row}>
        <View style={styles.item}>
          <CircularButton icon={icon} checked={false} disabled onChange={() => {}} />
          <Text style={styles.label}>未选中</Text>
        </View>
        <View style={styles.item}>
          <CircularButton icon={icon} checked disabled onChange={() => {}} />
          <Text style={styles.label}>选中</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: { flex: 1, backgroundColor: colorToken.surfacePageLow },
  content: { paddingHorizontal: 12, paddingBottom: 40 },
  header: { fontSize: 24, color: colorToken.contentPrimaryNormal, fontWeight: '500', paddingHorizontal: 15, marginBottom: 20 },
  sectionTitle: { color: colorToken.accentOsFill, paddingHorizontal: 16, paddingVertical: 6, marginTop: 12, ...Fonts.fontSystem14Regular },
  row: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, marginTop: 8 },
  item: { alignItems: 'center', marginRight: 20, marginBottom: 16 },
  label: { fontSize: 11, color: colorToken.contentTertiaryNormal, marginTop: 6 },
});

export default CircularButtonDemo;
