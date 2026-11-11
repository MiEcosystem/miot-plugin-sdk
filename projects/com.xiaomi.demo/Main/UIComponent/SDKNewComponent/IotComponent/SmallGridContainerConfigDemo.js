'use strict';

import React from 'react';
import { View } from 'react-native';
import { SmallGridContainer, SmallGridEntrance, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const icon = <Circle fill={colorToken.contentPrimaryNormal} />;
const onPress = () => showToast('onPress');

const makeCnChildren = (count) => {
  const labels = ['灯光', '空调', '窗帘', '扫地机', '加湿器', '风扇'];
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(<SmallGridEntrance key={i} title={labels[i % labels.length]} icon={icon} onPress={onPress} />);
  }
  return items;
};

const makeEnChildren = (count) => {
  const labels = ['Light', 'Air Conditioner', 'Curtain', 'Robot Vacuum', 'Humidifier', 'Fan'];
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(<SmallGridEntrance key={i} title={labels[i % labels.length]} icon={icon} onPress={onPress} />);
  }
  return items;
};

const makeJaChildren = (count) => {
  const labels = ['照明', 'エアコン', 'カーテン', 'ロボット掃除機', '加湿器', '扇風機'];
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(<SmallGridEntrance key={i} title={labels[i % labels.length]} icon={icon} onPress={onPress} />);
  }
  return items;
};

const makeArChildren = (count) => {
  const labels = ['الضوء', 'مكيف الهواء', 'الستارة', 'المكنسة', 'المرطب', 'المروحة'];
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(<SmallGridEntrance key={i} title={labels[i % labels.length]} icon={icon} onPress={onPress} />);
  }
  return items;
};

const children2 = makeCnChildren(2);
const children3 = makeCnChildren(3);
const children4 = makeCnChildren(4);
const children5 = makeCnChildren(5);
const childrenEn4 = makeEnChildren(4);
const childrenEn5 = makeEnChildren(5);
const childrenJa4 = makeJaChildren(4);
const childrenAr4 = makeArChildren(4);

const childrenMixed4 = [
  <SmallGridEntrance key={0} title="灯" icon={icon} onPress={onPress} />,
  <SmallGridEntrance key={1} title="智能空气净化器Pro" icon={icon} onPress={onPress} />,
  <SmallGridEntrance key={2} title="灯光" icon={icon} onPress={onPress} />,
  <SmallGridEntrance key={3} title="温湿度传感器设备" icon={icon} onPress={onPress} />,
];
const childrenMixed5 = [
  <SmallGridEntrance key={0} title="灯" icon={icon} onPress={onPress} />,
  <SmallGridEntrance key={1} title="Air Conditioner" icon={icon} onPress={onPress} />,
  <SmallGridEntrance key={2} title="窗帘" icon={icon} onPress={onPress} />,
  <SmallGridEntrance key={3} title="Robot Vacuum Cleaner" icon={icon} onPress={onPress} />,
  <SmallGridEntrance key={4} title="扫地机" icon={icon} onPress={onPress} />,
];

const propConfigs = [
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'maxColumns', type: 'number', defaultValue: 4, category: 'content' },
  {
    name: 'children',
    type: 'pass',
    category: 'render',
    defaultValue: children4,
    passOptions: [
      { label: '中文 2项', value: children2 },
      { label: '中文 3项', value: children3 },
      { label: '中文 4项', value: children4 },
      { label: '中文 5项', value: children5 },
      { label: 'English 4项', value: childrenEn4 },
      { label: 'English 5项', value: childrenEn5 },
      { label: '日本語 4項', value: childrenJa4 },
      { label: 'العربية 4項', value: childrenAr4 },
      { label: '混合长度 4项', value: childrenMixed4 },
      { label: '混合长度 5项(两行)', value: childrenMixed5 },
    ],
  },
];

const SmallGridContainerConfigDemo = () => (
  <View style={styles.container}>
    <TestComponent component={SmallGridContainer} propConfigs={propConfigs} />
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SmallGridContainerConfigDemo;
