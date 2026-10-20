'use strict';

import React, { useEffect } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { EmptyState, EmptyImageType, colorToken, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';
import NavigationBar from 'miot/ui/NavigationBar';

const allTypes = Object.entries(EmptyImageType).map(([label, value]) => ({
  label,
  value,
}));

const EmptyStateDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('EmptyStateConfigDemo', { title: 'EmptyState 配置调试' }) }],
    });
  }, []);
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>基础用法</Text>

      <Text style={styles.header}>None 类型（不显示图片）</Text>
      <View style={styles.card}>
        <EmptyState imageType={EmptyImageType.None} description="暂无搜索结果" />
      </View>

      <Text style={styles.header}>None 类型（不显示图片）</Text>
      <View style={styles.card}>
        <EmptyState imageType={EmptyImageType.None} description="这周很关键；冲刺一下；全流程AI Native化，确保用户能够方便快捷地使用我们的产品" />
      </View>

      <Text style={styles.header}>仅描述（默认图片）</Text>
      <View style={styles.card}>
        <EmptyState description="暂无搜索结果" />
      </View>

      <Text style={styles.header}>预设类型 + 描述</Text>
      <View style={styles.card}>
        <EmptyState imageType={EmptyImageType.NoNetwork} description="网络不可用" />
      </View>

      <Text style={styles.header}>预设类型 + 描述 + 按钮</Text>
      <View style={styles.card}>
        <EmptyState
          imageType={EmptyImageType.Error}
          description="加载失败，请稍后重试"
          showButton
          buttonTitle="重试"
          onButtonPress={() => showToast('重试')}
        />
      </View>

      <Text style={styles.sectionTitle}>自定义插图</Text>

      <Text style={styles.header}>customImage（自定义图片，优先级高于 imageType）</Text>
      <View style={styles.card}>
        <EmptyState
          customImage={<Image source={require('../../images/loading.png')} style={{ width: 80, height: 80 }} resizeMode="contain" />}
          description="customImage 自定义图片资源"
        />
      </View>

      <Text style={styles.header}>customImage（自定义渲染）</Text>
      <View style={styles.card}>
        <EmptyState
          customImage={
            <View style={styles.emojiWrapper}>
              <Text style={styles.emoji}>📭</Text>
            </View>
          }
          description="customImage 自定义渲染"
        />
      </View>

      <Text style={styles.sectionTitle}>自定义尺寸</Text>

      <Text style={styles.header}>大尺寸插图 (160×120)</Text>
      <View style={styles.card}>
        <EmptyState
          imageType={EmptyImageType.Home}
          imageWidth={160}
          imageHeight={120}
          description="大尺寸插图"
        />
      </View>

      <Text style={styles.sectionTitle}>多行描述</Text>

      <Text style={styles.header}>长文本（最多 3 行）</Text>
      <View style={styles.card}>
        <EmptyState
          imageType={EmptyImageType.Log}
          description="这是一段很长的描述文本，用于测试多行文本的显示效果。组件最多支持显示三行文本，超出部分会被截断省略。"
        />
      </View>

      <Text style={styles.sectionTitle}>全部预设插图类型</Text>
      {allTypes.map(({ label, value }) => (
        <View key={value}>
          <Text style={styles.header}>{label}</Text>
          <View style={styles.card}>
            <EmptyState imageType={value} description={label} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colorToken.contentPrimaryNormal,
    marginHorizontal: 4,
    marginTop: 24,
    marginBottom: 4,
  },
  header: {
    fontSize: 14,
    color: colorToken.contentTertiaryNormal,
    marginHorizontal: 4,
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colorToken.surfaceCardPrimary,
    borderRadius: 16,
    overflow: 'hidden',
  },
  emojiWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colorToken.fillSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 32,
  },
});

export default EmptyStateDemo;
