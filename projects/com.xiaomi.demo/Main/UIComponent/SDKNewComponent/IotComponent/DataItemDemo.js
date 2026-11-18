'use strict';

import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { CardContainer, colorToken, DataGroup, Fonts } from 'miot/ui/hyperOSUI';
import NavigationBar from 'miot/ui/NavigationBar';

const DataItemDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('IotDataItemConfigDemo', { title: 'DataItem 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.header}>数据项</Text>

      <Text style={styles.sectionTitle}>medium 尺寸（默认）</Text>
      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: '26℃', subtitle: '室内温度' },
            { title: '68%', subtitle: '湿度' },
            { title: 'AQI 25', subtitle: '空气质量' },
          ]}
        />
      </CardContainer>

      <Text style={styles.sectionTitle}>large 尺寸</Text>
      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: '26℃', subtitle: '数字字体', titleSize: 'large' },
            { title: '运行中', subtitle: '系统字体', titleSize: 'large', stringMode: true },
          ]}
        />
      </CardContainer>

      <Text style={styles.sectionTitle}>small 尺寸</Text>
      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: 'PM2.5', subtitle: '12 μg/m³', titleSize: 'small', stringMode: true },
            { title: 'CO₂', subtitle: '650 ppm', titleSize: 'small', stringMode: true },
            { title: 'TVOC', subtitle: '0.02 mg/m³', titleSize: 'small', stringMode: true },
          ]}
        />
      </CardContainer>

      <Text style={styles.sectionTitle}>数字字体 vs 系统字体</Text>
      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: '28℃', subtitle: '数字字体（默认）' },
            { title: '28℃', subtitle: '系统字体', stringMode: true },
          ]}
        />
      </CardContainer>

      <Text style={styles.sectionTitle}>居中对齐</Text>
      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: '50%', subtitle: 'blue', align: 'center', colorType: 'blue' },
            { title: '26℃', subtitle: 'orange', align: 'center', colorType: 'orange' },
            { title: '68%', subtitle: 'green', align: 'center', colorType: 'green' },
          ]}
        />
      </CardContainer>

      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: '50%', subtitle: 'wathet', align: 'center', colorType: 'wathet' },
            { title: '26℃', subtitle: 'purple', align: 'center', colorType: 'purple' },
          ]}
        />
      </CardContainer>

      <Text style={styles.sectionTitle}>可点击（带箭头）</Text>
      <CardContainer gap={0}>
        <DataGroup items={[{ title: '查看详情', subtitle: '点击进入详情页', onPress: () => {} }]} />
      </CardContainer>

      <Text style={styles.sectionTitle}>禁用态</Text>
      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: '--', subtitle: '温度（离线）', disabled: true },
            { title: '--', subtitle: '湿度（离线）', disabled: true },
          ]}
        />
      </CardContainer>
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
    paddingBottom: 40,
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
});

export default DataItemDemo;
