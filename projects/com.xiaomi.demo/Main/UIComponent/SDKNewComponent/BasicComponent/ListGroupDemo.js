'use strict';

import React, { useState, useEffect } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { ListCard, ListItem, ListItemWithWidget, colorToken, TestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const groupIcon = require('../../images/group.png');

const sourceGroup1data1 = [
  { key: 1, widgetType: 'switch', title: '列表主文字' },
  { key: 2, title: '列表主文字' },
  { key: 3, title: '列表主文字' },
];
const sourceGroup2data1 = [
  { key: 1, widgetType: 'switch', title: '列表主文字' },
  { key: 2, widgetType: 'switch', title: '列表主文字' },
  { key: 3, widgetType: 'switch', title: '列表主文字' },
];

const sourceGroup1data2 = [
  { key: 1, widgetType: 'switch', title: '列表主文字', leadingIcon: <Image source={groupIcon} style={{ width: 40, height: 40 }} /> },
  { key: 2, widgetType: 'switch', title: '列表主文字', leadingIcon: <Image source={groupIcon} style={{ width: 40, height: 40 }} /> },
  { key: 3, widgetType: 'switch', title: '列表主文字', leadingIcon: <Image source={groupIcon} style={{ width: 40, height: 40 }} /> },
];
const sourceGroup2data2 = [
  { key: 1, widgetType: 'switch', title: '列表主文字', leadingIcon: <Image source={groupIcon} style={{ width: 40, height: 40 }} /> },
  { key: 2, widgetType: 'switch', title: '列表主文字', leadingIcon: <Image source={groupIcon} style={{ width: 40, height: 40 }} /> },
  { key: 3, widgetType: 'switch', title: '列表主文字', leadingIcon: <Image source={groupIcon} style={{ width: 40, height: 40 }} /> },
];

const longTitle = '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字';
const longSubtitle = '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字';

const sourceGroup1data3 = [
  { key: 1, widgetType: 'switch', title: longTitle, subtitle: longSubtitle },
  { key: 2, widgetType: 'switch', title: longTitle, subtitle: longSubtitle },
  { key: 3, widgetType: 'switch', title: longTitle, subtitle: longSubtitle },
];

const sourceGroup2data3 = [
  { key: 1, widgetType: 'switch', title: longTitle, subtitle: longSubtitle },
  { key: 2, widgetType: 'switch', title: longTitle, subtitle: longSubtitle },
  { key: 3, widgetType: 'switch', title: longTitle, subtitle: longSubtitle },
];

const sourceGroup1data4 = [
  { key: 1, widgetType: 'switch', title: longTitle, subtitle: longSubtitle, leadingIcon: <Image source={groupIcon} style={{ width: 40, height: 40 }} /> },
  { key: 2, widgetType: 'switch', title: longTitle, subtitle: longSubtitle, leadingIcon: <Image source={groupIcon} style={{ width: 40, height: 40 }} /> },
  { key: 3, widgetType: 'switch', title: longTitle, subtitle: longSubtitle, leadingIcon: <Image source={groupIcon} style={{ width: 40, height: 40 }} /> },
];

const sourceGroup2data4 = [
  { key: 1, widgetType: 'switch', title: longTitle, subtitle: longSubtitle, leadingIcon: <Image source={groupIcon} style={{ width: 40, height: 40 }} /> },
  { key: 2, widgetType: 'switch', title: longTitle, subtitle: longSubtitle, leadingIcon: <Image source={groupIcon} style={{ width: 40, height: 40 }} /> },
  { key: 3, widgetType: 'switch', title: longTitle, subtitle: longSubtitle, leadingIcon: <Image source={groupIcon} style={{ width: 40, height: 40 }} /> },
];

const ListCardDemo = () => {
  const [state, setState] = useState({
    dataSource1: [],
    dataSource2: [],
  });

  const onChange = (val) => {
    setState((c) => ({
      dataSource1: c.dataSource1.map((item) => ({ ...item, checked: val })),
      dataSource2: c.dataSource2.map((item) => ({ ...item, checked: val })),
    }));
  };

  const transformData = (type) => {
    let data1 = [];
    let data2 = [];
    switch (type) {
      case 1:
        data1 = sourceGroup1data1;
        data2 = sourceGroup2data1;
        break;
      case 2:
        data1 = sourceGroup1data2;
        data2 = sourceGroup2data2;
        break;
      case 3:
        data1 = sourceGroup1data3;
        data2 = sourceGroup2data3;
        break;
      case 4:
        data1 = sourceGroup1data4;
        data2 = sourceGroup2data4;
        break;
      default:
        data1 = sourceGroup1data1;
        data2 = sourceGroup2data1;
    }
    setState({
      dataSource1: data1.map((item) => ({ ...item, checked: false, onChange })),
      dataSource2: data2.map((item) => ({ ...item, checked: false, onChange })),
    });
  };

  useEffect(() => {
    transformData(1);
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>基础样式</Text>
        <Text style={styles.button} onPress={() => {
          transformData(1);
        }}>重置</Text>
        <Text style={styles.button} onPress={() => {
          transformData(2);
        }}>切换图标</Text>
        <Text style={styles.button} onPress={() => {
          transformData(3);
        }}>切换长标题</Text>
        <Text style={styles.button} onPress={() => {
          transformData(4);
        }}>切换图标长标题</Text>
        <ListCard
          title="分组标题"
          footer="自动亮度下，移动滑动条微调亮度，调整后的屏幕亮度仍会随周围环境的亮度变化而变化">
          {state.dataSource1.map((item) => (
            <ListItemWithWidget key={item.key} {...item} />
          ))}
        </ListCard>
        <View style={{ marginTop: 12 }}>
          <ListCard
            title="分组标题"
            footer="自动亮度下，移动滑动条微调亮度，调整后的屏幕亮度仍会随周围环境的亮度变化而变化">
            {state.dataSource2.map((item) => (
              <ListItemWithWidget key={item.key} {...item} disabled />
            ))}
          </ListCard>
        </View>
      </View>
      <View style={styles.caseContainer}>
        <Text style={styles.header}>ListCard Props 调试</Text>
        <TestComponent
          component={ListCard}
          propConfigs={[
            { name: 'title', type: 'string', defaultValue: '分组标题' },
            { name: 'titleSize', type: 'enum', enumOptions: ['small', 'medium', 'large'], defaultValue: 'medium' },
            { name: 'footer', type: 'string', defaultValue: '底部说明文案' },
          ]}
          onPropsChange={(props) => console.log(props)}
        >
          <ListItem title="列表项 1" onPress={() => console.log('1')} />
          <ListItem title="列表项 2" onPress={() => console.log('2')} />
          <ListItem title="列表项 3" onPress={() => console.log('3')} />
        </TestComponent>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    paddingTop: 30,
    backgroundColor: colorToken.surfacePageLow,
    minHeight: '100%',
  },
  header: {
    fontSize: 24,
    color: colorToken.contentPrimaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    fontSize: 14,
    color: colorToken.contentPrimaryNormal,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
  caseContainer: {
    marginTop: 20,
    marginBottom: 12,
  },
});

export default ListCardDemo;
