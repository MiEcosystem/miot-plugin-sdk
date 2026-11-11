'use strict';

import React from 'react';
import { ScrollView, Text } from 'react-native';
import { DataGroup, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const items2 = [
  { title: '26°C', subtitle: '室内温度' },
  { title: '68%', subtitle: '湿度' },
];
const items3 = [
  { title: '26°C', subtitle: '温度' },
  { title: '68%', subtitle: '湿度' },
  { title: 'AQI 25', subtitle: '空气质量', stringMode: true },
];
const items4 = [
  { title: '26°C', subtitle: '温度' },
  { title: '68%', subtitle: '湿度' },
  { title: '1013', subtitle: '气压', stringMode: true },
];
const itemsColored = [
  { title: '50%', subtitle: '亮度', align: 'center', colorType: 'blue' },
  { title: '26°C', subtitle: '温度', align: 'center', colorType: 'orange' },
  { title: '68%', subtitle: '湿度', align: 'center', colorType: 'green' },
];
const itemsDisabled = [
  { title: '--', subtitle: '温度（离线）', disabled: true },
  { title: '--', subtitle: '湿度（离线）', disabled: true },
];
const itemsSmall = [
  { title: 'PM2.5', subtitle: '12 μg/m³', size: 'small' },
  { title: 'CO₂', subtitle: '650 ppm', size: 'small' },
  { title: 'TVOC', subtitle: '0.02 mg/m³', size: 'small' },
];
const itemsLongTitle = [
  { title: '99999.99 kWh', subtitle: '累计用电量', stringMode: true },
  { title: '2026-05-06 12:30', subtitle: '最后运行时间', stringMode: true },
  { title: 'Connecting...', subtitle: '网络状态', stringMode: true },
];
const itemsLongSubtitle = [
  { title: '26°C', subtitle: '这是一段非常非常非常长的副标题描述文字用于验证截断' },
  { title: '68%', subtitle: '另一段超级很长很长很长的副标题描述内容文字' },
];
const itemsEnglish = [
  { title: '72°F', subtitle: 'Indoor Temperature' },
  { title: '68%', subtitle: 'Humidity' },
  { title: 'AQI 25', subtitle: 'Air Quality', stringMode: true },
];
const itemsJapanese = [
  { title: '26°C', subtitle: '室内温度' },
  { title: '68%', subtitle: '湿度' },
  { title: 'AQI 25', subtitle: '空気質量', stringMode: true },
];
const itemsArabic = [
  { title: '26°C', subtitle: 'درجة الحرارة' },
  { title: '68%', subtitle: 'الرطوبة' },
  { title: 'AQI 25', subtitle: 'جودة الهواء', stringMode: true },
];

const DataGroupConfigDemo = () => {
  const customContainerNode = <Text style={{ fontSize: 12, color: '#888' }}>自定义区域</Text>;
  const customContainerWithBg = <Text style={{ fontSize: 12, color: '#fff', backgroundColor: '#4a90e2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>带背景色</Text>;
  const customContainerOversize = <Text style={{ fontSize: 12, color: '#fff', backgroundColor: '#e24a4a', paddingHorizontal: 16, paddingVertical: 12, width: 200, height: 200 }}>超长超宽自定义区域内容文字很多很多很多</Text>;

  const propConfigs = [
    {
      name: 'items',
      type: 'pass',
      category: 'content',
      defaultValue: items3,
      passOptions: [
        { label: '2项', value: items2 },
        { label: '3项', value: items3 },
        { label: '彩色', value: itemsColored },
        { label: 'small', value: itemsSmall },
        { label: '禁用', value: itemsDisabled },
        { label: '超长 title', value: itemsLongTitle },
        { label: '超长 subtitle', value: itemsLongSubtitle },
        { label: '英文', value: itemsEnglish },
        { label: '日文', value: itemsJapanese },
        { label: '阿拉伯文 RTL', value: itemsArabic },
      ],
    },
    {
      name: 'customContainer',
      type: 'pass',
      category: 'content',
      defaultValue: undefined,
      passOptions: [
        { label: '无', value: undefined },
        { label: '有', value: customContainerNode },
        { label: '背景色', value: customContainerWithBg },
        { label: '超高超宽', value: customContainerOversize },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TestComponent component={DataGroup} propConfigs={propConfigs} />
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default DataGroupConfigDemo;
