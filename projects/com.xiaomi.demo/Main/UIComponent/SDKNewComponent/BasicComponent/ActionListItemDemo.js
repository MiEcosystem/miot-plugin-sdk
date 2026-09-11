'use strict';

import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ActionListItem, ListCard, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import NavigationBar from 'miot/ui/NavigationBar';


const ActionListItemDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('ActionListItemConfigDemo', { title: 'ActionListItem 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>ActionListItem</Text>

      <Text style={styles.sectionTitle}>normal 状态</Text>
      <ListCard title="">
        <ActionListItem title="重置设备" onPress={() => showToast('重置设备')} />
      </ListCard>

      <Text style={styles.sectionTitle}>warning 状态</Text>
      <ListCard title="">
        <ActionListItem title="删除设备" status="warning" onPress={() => showToast('删除设备')} />
      </ListCard>

      <Text style={styles.sectionTitle}>不同色系</Text>
      <ListCard title="">
        <ActionListItem title="蓝色" colorType="blue" onPress={() => {}} />
        <ActionListItem title="橙色" colorType="orange" onPress={() => {}} />
        <ActionListItem title="紫色" colorType="purple" onPress={() => {}} />
      </ListCard>

      <Text style={styles.sectionTitle}>禁用</Text>
      <ListCard title="">
        <ActionListItem title="禁用操作" disabled onPress={() => {}} />
        <ActionListItem title="禁用警告" status="warning" disabled onPress={() => {}} />
      </ListCard>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: { flex: 1, backgroundColor: colorToken.surfacePageLow, paddingHorizontal: 12 },
  header: { fontSize: 24, color: colorToken.contentPrimaryNormal, fontWeight: '500', paddingHorizontal: 15, marginBottom: 20 },
  sectionTitle: { color: colorToken.accentOsFill, paddingHorizontal: 16, paddingVertical: 6, marginTop: 12, fontSize: 14 },
});

export default ActionListItemDemo;
