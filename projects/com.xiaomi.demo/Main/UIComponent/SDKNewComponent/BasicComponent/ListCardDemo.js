'use strict';

import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ListCard, ListItem, colorToken, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import NavigationBar from 'miot/ui/NavigationBar';

const ListCardDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('ListCardConfigDemo', { title: 'ListCard 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>ListCard</Text>

      <Text style={styles.sectionTitle}>titleSize = small（默认）</Text>
      <ListCard title="小标题">
        <ListItem title="列表项 1" onPress={() => {}} />
        <ListItem title="列表项 2" onPress={() => {}} />
      </ListCard>

      <Text style={styles.sectionTitle}>titleSize = medium</Text>
      <ListCard title="中标题" titleSize="medium">
        <ListItem title="列表项 1" onPress={() => {}} />
        <ListItem title="列表项 2" onPress={() => {}} />
      </ListCard>

      <Text style={styles.sectionTitle}>titleSize = large</Text>
      <ListCard title="大标题" titleSize="large">
        <ListItem title="列表项 1" onPress={() => {}} />
        <ListItem title="列表项 2" onPress={() => {}} />
      </ListCard>

      <Text style={styles.sectionTitle}>onPress small（标题可点击）</Text>
      <ListCard title="可点击小标题" onPress={() => showToast('小标题点击')}>
        <ListItem title="列表项 1" onPress={() => {}} />
        <ListItem title="列表项 2" onPress={() => {}} />
      </ListCard>

      <Text style={styles.sectionTitle}>onPress medium（标题可点击）</Text>
      <ListCard title="可点击中标题" titleSize="medium" onPress={() => showToast('中标题点击')}>
        <ListItem title="列表项 1" onPress={() => {}} />
        <ListItem title="列表项 2" onPress={() => {}} />
      </ListCard>

      <Text style={styles.sectionTitle}>onPress large（标题可点击）</Text>
      <ListCard title="可点击大标题" titleSize="large" onPress={() => showToast('大标题点击')}>
        <ListItem title="列表项 1" onPress={() => {}} />
        <ListItem title="列表项 2" onPress={() => {}} />
      </ListCard>

      <Text style={styles.sectionTitle}>customRender（右侧自定义）</Text>
      <ListCard
        title="自定义右侧"
        customRender={<Text style={{ fontSize: 12, color: colorToken.accentGreenFill }}>自定义渲染</Text>}
      >
        <ListItem title="列表项 1" onPress={() => {}} />
        <ListItem title="列表项 2" onPress={() => {}} />
      </ListCard>

      <Text style={styles.sectionTitle}>带 footer</Text>
      <ListCard title="设置" footer="底部提示文字">
        <ListItem title="Wi-Fi" value="已连接" onPress={() => {}} />
        <ListItem title="蓝牙" value="已开启" onPress={() => {}} />
      </ListCard>

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

export default ListCardDemo;
