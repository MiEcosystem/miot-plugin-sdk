import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Drawer } from 'miot/ui/hyperOSUI';
import { Buttons } from 'miot/ui/hyperOSUI';
import { colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

const ElasticDrawerDemo = () => {
  const [visible, setVisible] = useState(false);
  const [drawerType, setDrawerType] = useState('elastic');

  const showElasticDrawer = () => {
    setDrawerType('elastic');
    setVisible(true);
  };

  const showFixedDrawer = () => {
    console.log('显示固定抽屉');
    setDrawerType('fixed');
    setVisible(true);
  };

  const buttons = [
    { title: '弹性抽屉', onPress: showElasticDrawer },
    { title: '固定抽屉(70%)', onPress: showFixedDrawer }
  ];

  return (
    <View style={styles.container}>
      <Buttons buttons={buttons} />

      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        title={drawerType === 'elastic' ? '弹性抽屉' : '固定抽屉'}
        subtitle={drawerType === 'elastic' ? '高度根据内容动态调整' : '固定高度档位'}
        type={drawerType}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.contentText}>
            {drawerType === 'elastic'
              ? '弹性抽屉：高度会根据内容自动调整，支持全屏显示'
              : '固定抽屉：有三个固定档位（顶部、70%、隐藏），默认显示70%高度档位'}
          </Text>

          <Text style={styles.contentText}>抽屉支持以下功能：</Text>

          <View style={styles.item}>
            <Text style={styles.itemText}>✓ 拖拽手势</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>✓ 点击遮罩关闭</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>✓ 自定义标题和副标题</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>✓ 左右操作按钮</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>✓ 平滑动画效果</Text>
          </View>

          <Text style={styles.contentText}>示例内容区域：</Text>

          {Array.from({ length: 10 }).map((_, i) => (
            <View key={i} style={styles.item}>
              <Text style={styles.itemText}>列表项 {i + 1}</Text>
            </View>
          ))}
        </ScrollView>
      </Drawer>
    </View>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorToken.mj_color_gray_bg_2
  },
  content: {
    padding: 16,
  },
  contentText: {
    fontSize: 16,
    color: colorToken.mj_color_gray_text_2,
    marginBottom: 12,
    lineHeight: 22,
  },
  item: {
    padding: 12,
    backgroundColor: colorToken.mj_color_gray_bg_3,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    color: colorToken.mj_color_gray_text_2,
  },
});

export default ElasticDrawerDemo;
