import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { InformationArea } from 'miot/ui/hyperOSUI';

/**
 * InformationArea 组件演示 Demo
 * 展示自定义宽度和智能换行功能
 */
const InformationAreaDemo = () => {
  // 示例 1: 一行 2 个
  const OnePerRowItems = [
    { title: '45', subtitle: '温度(°C)' }];
  const twoPerRowItems = [
    { title: '45', subtitle: '温度(°C)' },
    { title: '50', subtitle: '湿度(%)' }
  ];
  const ThreePerRowItems = [
    { title: '45', subtitle: '温度(°C)' },
    { title: '55', subtitle: '湿度(°C)' },
    { title: '55', subtitle: '湿度(°C)' }
  ];
  const FourPerRowItems = [
    { title: '45', subtitle: '温度(°C)' },
    { title: '55', subtitle: '湿度(°C)' },
    { title: '55', subtitle: '湿度(°C)' },
    { title: '55', subtitle: '湿度(°C)' }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIndicator} />
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>默认</Text>
          </View>
        </View>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>1个</Text>
        </View>
        <InformationArea
          items={OnePerRowItems}
        />
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>2个</Text>
        </View>
        <InformationArea
          items={twoPerRowItems}
        />
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>3个</Text>
        </View>
        <InformationArea
          items={ThreePerRowItems}
        />
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>4个</Text>
        </View>
        <InformationArea
          items={FourPerRowItems}
        />
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIndicator} />
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>2个</Text>
          </View>
        </View>
        <InformationArea
          items={twoPerRowItems}
          showDivider={true}
          // 字体颜色
          titleColor={"#0066ff"}
          titleFontWeight={"bold"}
          titleFontSize={100}
          subtitleColor={"#22cc22"}
          subtitleFontSize={20}
          backgroundColor="#F5F5F5"
          borderRadius={12}
          itemWidth={150}
          padding={5}
        />
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIndicator} />
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>3个</Text>
          </View>
        </View>
        <InformationArea
          items={ThreePerRowItems}
          // 字体颜色
          titleColor={"#0066ff"}
          titleFontWeight={"bold"}
          titleFontSize={50}
          subtitleColor={"#22cc22"}
          subtitleFontSize={10}
          backgroundColor="#F5F5F5"
          borderRadius={12}
        />
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIndicator} />
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>4个</Text>
          </View>
        </View>
        <InformationArea
          items={FourPerRowItems}
          // 字体颜色
          backgroundColor="#F5F5F5"
          subtitleFontSize={10}
          borderRadius={12}
          padding={10}
          itemSpacing={20}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionIndicator: {
    width: 4,
    height: 20,
    backgroundColor: '#007AFF',
    borderRadius: 2,
    marginRight: 8
  },
  sectionTitleContainer: {
    flex: 1
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A'
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2
  }
});

export default InformationAreaDemo;
