'use strict';

import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { CardContainer, colorToken, DataItem, Fonts } from 'miot/ui/hyperOSUI';
import NavigationBar from 'miot/ui/NavigationBar';

const DataItemDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('IotDataItemConfigDemo', { title: 'DataItem 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>数据项</Text>

      <Text style={styles.sectionTitle}>medium 尺寸（默认）</Text>
      <CardContainer gap={0}>
        <View style={styles.row}>
          <View style={styles.cell}><DataItem title="26℃" subtitle="室内温度" /></View>
          <View style={styles.cell}><DataItem title="68%" subtitle="湿度" /></View>
          <View style={styles.cell}><DataItem title="AQI 25" subtitle="空气质量" /></View>
        </View>
      </CardContainer>

      <Text style={styles.sectionTitle}>small 尺寸</Text>
      <CardContainer gap={0}>
        <View style={styles.row}>
          <View style={styles.cell}><DataItem title="PM2.5" subtitle="12 μg/m³" titleSize="small" /></View>
          <View style={styles.cell}><DataItem title="CO₂" subtitle="650 ppm" titleSize="small" /></View>
          <View style={styles.cell}><DataItem title="TVOC" subtitle="0.02 mg/m³" titleSize="small" /></View>
        </View>
      </CardContainer>

      <Text style={styles.sectionTitle}>数字字体 vs 系统字体</Text>
      <CardContainer gap={0}>
        <View style={styles.row}>
          <View style={styles.cell}><DataItem title="28℃" subtitle="数字字体（默认）" /></View>
          <View style={styles.cell}><DataItem title="28℃" subtitle="系统字体" stringMode /></View>
        </View>
      </CardContainer>

      <Text style={styles.sectionTitle}>居中对齐</Text>
      <CardContainer gap={0}>
        <View style={styles.row}>
          <View style={styles.cell}><DataItem title="50%" subtitle="blue" align="center" colorType="blue" /></View>
          <View style={styles.cell}><DataItem title="26℃" subtitle="orange" align="center" colorType="orange" /></View>
          <View style={styles.cell}><DataItem title="68%" subtitle="green" align="center" colorType="green" /></View>
        </View>
      </CardContainer>

      <CardContainer gap={0}>
        <View style={styles.row}>
          <View style={styles.cell}><DataItem title="50%" subtitle="wathet" align="center" colorType="wathet" /></View>
          <View style={styles.cell}><DataItem title="26℃" subtitle="purple" align="center" colorType="purple" /></View>
        </View>
      </CardContainer>

      <Text style={styles.sectionTitle}>可点击（带箭头）</Text>
      <CardContainer gap={0}>
        <DataItem
          title="查看详情"
          subtitle="点击进入详情页"
          onPress={() => {}}
        />
      </CardContainer>

      <Text style={styles.sectionTitle}>禁用态</Text>
      <CardContainer gap={0}>
        <View style={styles.row}>
          <View style={styles.cell}><DataItem title="--" subtitle="温度（离线）" disabled /></View>
          <View style={styles.cell}><DataItem title="--" subtitle="湿度（离线）" disabled /></View>
        </View>
      </CardContainer>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  header: {
    paddingHorizontal: 15,
    marginBottom: 10,
    ...Fonts.fontSystem24Medium,
    color: colorToken.contentSecondaryNormal,
  },
  sectionTitle: {
    color: colorToken.accentOsFill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
    ...Fonts.fontSystem13Regular,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cell: {
    flex: 1,
  },
});

export default DataItemDemo;
