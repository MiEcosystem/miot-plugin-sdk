'use strict';

import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { CardContainer, colorToken, DataGroup, Fonts } from 'miot/ui/hyperOSUI';
import NavigationBar from 'miot/ui/NavigationBar';

const noop = () => {};

const DataGroupDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('IotDataGroupConfigDemo', { title: 'DataGroup 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>数据组</Text>

      <Text style={styles.sectionTitle}>2 项（居左）</Text>
      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: '26°C', subtitle: '室内温度' },
            { title: '68%', subtitle: '湿度' },
          ]}
        />
      </CardContainer>

      <Text style={styles.sectionTitle}>3 项（居左）</Text>
      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: '26°C', subtitle: '温度' },
            { title: '68%', subtitle: '湿度' },
            { title: 'AQI 25', subtitle: '空气质量', stringMode: true },
          ]}
        />
      </CardContainer>

      <Text style={styles.sectionTitle}>3 项（含customContainer）</Text>
      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: '26°C', subtitle: '室内温度' },
            { title: '68%', subtitle: '湿度' },
            { title: '1013', subtitle: '气压 hPa', stringMode: true },
          ]}
          customContainer ={<Text style={{ fontSize: 12, color: '#fff', backgroundColor: '#4a90e2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>自定义</Text>}
        />
      </CardContainer>

      <Text style={styles.sectionTitle}>居中对齐 + 色系</Text>
      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: '50%', subtitle: '亮度', align: 'center', colorType: 'blue' },
            { title: '26°C', subtitle: '温度', align: 'center', colorType: 'orange' },
            { title: '68%', subtitle: '湿度', align: 'center', colorType: 'green' },
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

      <Text style={styles.sectionTitle}>含可点击项</Text>
      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: '查看详情', subtitle: '点击进入', onPress: noop },
            { title: '历史记录', subtitle: '7天趋势', onPress: noop },
          ]}
        />
      </CardContainer>

      <Text style={styles.sectionTitle}>含禁用项</Text>
      <CardContainer gap={0}>
        <DataGroup
          items={[
            { title: '--', subtitle: '温度（离线）', disabled: true },
            { title: '--', subtitle: '湿度（离线）', disabled: true },
            { title: 'AQI 25', subtitle: '空气质量' },
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

export default DataGroupDemo;
