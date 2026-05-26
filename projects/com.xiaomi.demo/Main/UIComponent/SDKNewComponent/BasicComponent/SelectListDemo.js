'use strict';

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SelectList, colorToken, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import NavigationBar from 'miot/ui/NavigationBar';
import { Circle } from 'miot/ui/icons';

const icon = <Circle fill={colorToken.contentPrimaryNormal} />;

const rightOptions = [
  { value: 1, title: '选项一' },
  { value: 2, title: '选项二', subtitle: '副标题描述' },
  { value: 3, title: '选项三', leadingIcon: icon },
];

const leftOptions = [
  { value: 'a', title: '分组 A' },
  { value: 'b', title: '分组 B' },
  { value: 'c', title: '分组 C' },
];

const groupOptions = [
  {
    value: 'g1', title: '空调模式',
    subItems: [
      { title: '制冷', value: '26°C', actionType: 'navigate', onPress: () => showToast('制冷') },
      { title: '制热', value: '28°C', actionType: 'select', badge: true, onPress: () => showToast('制热') },
      { title: '送风', actionType: 'none', onPress: () => showToast('送风') },
    ],
  },
  { value: 'g2', title: '风扇模式' },
  { value: 'g3', title: '除湿模式' },
];

const SelectListDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('SelectListConfigDemo', { title: 'SelectList 配置调试' }) }],
    });
  }, []);

  const [rightVal, setRightVal] = useState(1);
  const [leftVal, setLeftVal] = useState('a');
  const [groupVal, setGroupVal] = useState('g1');
  const [rightGroupVal, setRightGroupVal] = useState(1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>SelectList</Text>

      <Text style={styles.sectionTitle}>右对勾 + 独立卡片（默认）</Text>
      <SelectList options={rightOptions} value={rightVal} onChange={setRightVal} />

      <Text style={styles.sectionTitle}>右对勾 + 聚合</Text>
      <SelectList options={rightOptions} value={rightGroupVal} onChange={setRightGroupVal} isGroup />

      <Text style={styles.sectionTitle}>右对勾 + 图标 + 副标题</Text>
      <SelectList
        options={[
          { value: 1, title: '带图标', leadingIcon: icon },
          { value: 2, title: '带副标题', subtitle: '描述文字' },
          { value: 3, title: '图标+副标题', leadingIcon: icon, subtitle: '描述' },
        ]}
        value={1}
        onChange={() => {}}
      />

      <Text style={styles.sectionTitle}>左对勾 + 聚合</Text>
      <SelectList options={leftOptions} value={leftVal} onChange={setLeftVal} selectedAlign="left" isGroup />

      <Text style={styles.sectionTitle}>左对勾 + 独立卡片 + subItems</Text>
      <SelectList options={groupOptions} value={groupVal} onChange={setGroupVal} selectedAlign="left" />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: { flex: 1, backgroundColor: colorToken.surfacePageLow },
  content: { paddingHorizontal: 12, paddingBottom: 28 },
  header: { fontSize: 24, color: colorToken.contentPrimaryNormal, fontWeight: '500', paddingHorizontal: 15, marginBottom: 20 },
  sectionTitle: { color: colorToken.accentOsFill, paddingHorizontal: 16, paddingVertical: 6, marginTop: 12, fontSize: 14 },
});

export default SelectListDemo;
