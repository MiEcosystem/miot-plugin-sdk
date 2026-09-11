'use strict';

import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { NavigationBar, ListCard, ListItem, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

const SdkNavigationBarDemo = ({ navigation }) => {
  const openConfigDemo = () => {
    navigation.navigate('NavigationBarConfigDemo', { title: 'NavigationBar 配置调试' });
  };

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: openConfigDemo }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>标准右侧图标</Text>
      <NavigationBar
        title="设备详情"
        left={{ key: NavigationBar.ICON.BACK }}
        right={{ key: NavigationBar.ICON.MORE, onPress: openConfigDemo }}
      />

      <Text style={styles.sectionTitle}>右侧自定义内容</Text>
      <NavigationBar
        title="设备详情"
        left={{ key: NavigationBar.ICON.BACK }}
        right={{
          key: NavigationBar.ICON.CUSTOM,
          customRender: <Text style={styles.customAction}>编辑</Text>,
        }}
      />

      <Text style={styles.sectionTitle}>品牌图圆角描边</Text>
      <NavigationBar title="设备详情" showBrandLogo />
      <NavigationBar title="设备详情" showBrandLogo isRounded />

      <ListCard title="当前覆盖">
        <ListItem title="配置调试" value="点击进入" onPress={openConfigDemo} />
        <ListItem title="titleSize" value="normal / large" onPress={() => {}} />
        <ListItem title="right" value="标准图标 / custom" onPress={() => {}} />
        <ListItem title="isRounded" value="品牌图圆角描边开关" onPress={() => {}} />
        <ListItem title="colorStrategy" value="auto / forceDark" onPress={() => {}} />
      </ListCard>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  content: {
    paddingBottom: 40,
  },
  sectionTitle: {
    color: colorToken.contentTertiaryNormal,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  customAction: {
    color: colorToken.contentPrimaryNormal,
    paddingVertical: 8,
  },
});

export default SdkNavigationBarDemo;
