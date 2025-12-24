'use strict';

import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { colorToken } from "miot/ui/hyperOSUI";
import { dynamicStyleSheet } from "miot/ui";
import withDarkModeSupport from "../adaptiveThemeComponent";

// 卡片圆角规范（可按设计图自定义）
const CARD_RADIUS = {
  dialog: 32, // 对话框
  popup: 24, // 浮窗
  device: 20, // 设备卡片
  plugin: 20, // 插件卡片
  input: 18, // 输入框
  cardList: 16, // 卡片列表外层
  notification: 16, // 通知栏
  quickPopup: 16, // 近手弹窗
  toast: 16,
  bigButton: 16,
  filterButton: 12,
  selectorOuter: 16,
  selectorInner: 8
};

// 单个卡片组件
const Card = ({ label, type }) => {
  const radius = CARD_RADIUS[type] || 12;
  return (
    <View style={styles.cardWrapper}>
      {/* 标题写在卡片上方 */}
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.card, { borderRadius: radius }]} />
    </View>
  );
};

const CardDemo = () => {
  const cards = [
    { label: '对话框', type: 'dialog' },
    { label: '浮窗', type: 'popup' },
    { label: '设备卡片', type: 'device' },
    { label: '插件卡片', type: 'plugin' },
    { label: 'input框', type: 'input' },
    { label: '卡片列表外层', type: 'cardList' },
    { label: '通知栏', type: 'notification' },
    { label: '近手弹窗', type: 'quickPopup' },
    { label: 'toast', type: 'toast' },
    { label: '大按钮', type: 'bigButton' },
    { label: '筛选按钮', type: 'filterButton' },
    { label: '选择器外部', type: 'selectorOuter' },
    { label: '选择器内部', type: 'selectorInner' }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cards.map((c, i) => (
        <Card key={i} label={c.label} type={c.type} />
      ))}
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: colorToken.mj_color_gray_bg_2
  },
  cardWrapper: {
    width: '45%',
    marginBottom: 30
  },
  card: {
    width: '100%',
    height: 100,
    backgroundColor: colorToken.mj_color_gray_fill_1
  },
  label: {
    fontSize: 14,
    color: colorToken.mjcard_color_miui_2,
    marginBottom: 8
  }
});

export default withDarkModeSupport(CardDemo);
