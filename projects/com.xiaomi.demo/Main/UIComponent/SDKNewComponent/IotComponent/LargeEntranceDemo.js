'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { LargeEntrance, colorToken, Fonts, TestComponent, SubtitleGroup } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const alert = Alert.alert;
const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '蓝牙开关' },
  { name: 'subtitle', type: 'string', defaultValue: '开启后可连接蓝牙设备' },
  { name: 'value', type: 'string', defaultValue: '状态' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'onPress', type: 'pass', passDescription: '列表项点击事件（可选）', defaultValue: () => alert('onPress') },
  { name: 'customRenderer', type: 'pass', passDescription: '右侧自定义渲染', defaultValue: <Image style={{ resizeMode: 'contain', width: 46, height: 46 }} source={require('../../images/group.png')} /> },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'red', 'blue', 'wathet', 'purple', 'white', 'orange', 'yellow'],
    defaultValue: 'green',
  },
  { name: 'leftIconSource', type: 'pass', passDescription: '左侧图标组件（SVG）', defaultValue: <Circle fill={colorToken.mj_color_gray_icon_1} /> },
  {
    name: 'accessibilityTitle',
    type: 'object',
    objectProps: [
      { name: 'accessible', type: 'boolean', defaultValue: true },
      { name: 'accessibilityLabel', type: 'string', defaultValue: '主标题' },
      { name: 'accessibilityHint', type: 'string' },
    ],
  },
  {
    name: 'accessibilitySubtitle',
    type: 'object',
    objectProps: [
      { name: 'accessible', type: 'boolean', defaultValue: true },
      { name: 'accessibilityLabel', type: 'string', defaultValue: '副标题' },
      { name: 'accessibilityHint', type: 'string' },
    ],
  },
  {
    name: 'accessibilityText',
    type: 'object',
    objectProps: [
      { name: 'accessible', type: 'boolean', defaultValue: true },
      { name: 'accessibilityLabel', type: 'string', defaultValue: '右侧文案' },
      { name: 'accessibilityHint', type: 'string' },
    ],
  },
];

const longTitle = '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题';
const longSubtitle = '标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字';
const longSubtitles = '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字';
const longValue = '状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态';
const source1Data1 = [
  {
    index: 1,
    title: '列表主文字',
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4),
  },
  {
    index: 2,
    title: '列表主文字',
    subtitle: '列表副文字',
    value: '状态',
    showDot: true,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4),
  },
  {
    index: 3,
    title: '列表主文字',
    subtitle: '列表副文字',
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4),
  },
  {
    index: 4,
    title: '列表主文字',
    value: '状态',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字']}/>,
    hideRightIcon: false,
    showDot: true,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4),
  },
  {
    index: 5,
    title: '列表主文字',
    value: '状态',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字', '列表副文字']}/>,
    hideRightIcon: false,
    showDot: true,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4),
  },
];

const source1Data2 = [
  {
    index: 1,
    title: '列表主文字',
    onPress: () => console.log(4),
  },
  {
    title: '列表主文字',
    showDot: true,
    value: '状态',
    onPress: () => console.log(4),
  },
  {
   
    index: 3,
    title: '列表主文字',
    subtitle: '标题副文字',
    onPress: () => console.log(4),
  },
  {
    index: 4,
    title: '列表主文字',
    value: '状态',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字']}/>,
    showDot: true,
    onPress: () => console.log(4),
  },
  {
    index: 5,
    title: '列表主文字',
    value: '状态',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字', '列表副文字']}/>,
    showDot: true,
    onPress: () => console.log(4),
  },
];

const source2Data1 = [
  {
    index: 1,
    title: longTitle,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4),
  },
  {
    index: 2,
    title: longTitle,
    subtitle: longSubtitle,
    value: longValue,
    showDot: true,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4),
  },
  {
    index: 3,
    title: longTitle,
    subtitle: longSubtitle,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4),
  },
  {
    index: 4,
    title: longTitle,
    value: longValue,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles]}/>,
    hideRightIcon: false,
    showDot: true,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4),
  },
  {
    index: 5,
    title: longTitle,
    value: longValue,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles, longSubtitles]}/>,
    hideRightIcon: false,
    showDot: true,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4),
  },
];

const source2Data2 = [
  {
    index: 1,
    title: longTitle,
    onPress: () => console.log(4),
  },
  {
    index: 2,
    title: longTitle,
    subtitle: longSubtitle,
    value: longValue,
    showDot: true,
    onPress: () => console.log(4),
  },
  {
    index: 3,
    title: longTitle,
    subtitle: longSubtitle,
    onPress: () => console.log(4),
  },
  {
    index: 4,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles]}/>,
    value: longValue,
    hideRightIcon: false,
    showDot: true,
    onPress: () => console.log(4),
  },
  {
    index: 5,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles, longSubtitles]}/>,
    value: longValue,
    hideRightIcon: false,
    showDot: true,
    onPress: () => console.log(4),
  },
];

const LargeEntranceDemo = () => {

  const [state, setState] = useState({
    sourceData1: source1Data1,
    sourceData2: source1Data2,
    disabled: false,
  });

  const transformData = (type) => {
    let data = [];
    switch (type) {
      case 1:
        data = {
          sourceData1: source1Data1,
          sourceData2: source1Data2,
        };
        break;
      case 2:
        data = {
          sourceData1: source2Data1,
          sourceData2: source2Data2,
        };
        break;
      default:
        data = {
          sourceData1: source1Data1,
          sourceData2: source1Data2,
        };
    }
    setState((item) => ({
      ...item,
      ...data,
    }));
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>L</Text>
        <Text style={styles.button} onPress={() => {
          transformData(1);
        }}>重置</Text>
        <Text style={styles.button} onPress={() => {
          transformData(2);
        }}>长标题</Text>
        <Text style={styles.button} onPress={() => {
          setState((item) => ({
            ...item,
            disabled: !state.disabled,
          }));
        }}>切换禁用态</Text>
        <Text style={styles.title}>带图标</Text>
        <View style={styles.data}>
          {state.sourceData1.map((item, index) => {
            return <LargeEntrance key={index} {...item} disabled={state.disabled}/>;
          })}
        </View>
        <Text style={styles.title}>不带图标</Text>
        <View style={styles.data}>
          {state.sourceData2.map((item, index) => {
            return <LargeEntrance key={index} {...item} disabled={state.disabled}/>;
          })}
        </View>
        <View style={styles.caseContainer}>
          <Text style={[styles.header, { marginTop: 12 }]}>LargeEntrance - 入口L</Text>
          <TestComponent component={LargeEntrance} propConfigs={propConfigs}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    paddingTop: 30,
    paddingHorizontal: 12,
    backgroundColor: colorToken.mj_color_gray_bg_2,
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_1,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    color: colorToken.mjcard_color_miui_1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
    ...Fonts.mj_text_subtitle_3_R,
  },
  button: {
    fontSize: 14,
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
  data: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colorToken.mj_color_gray_card_1,
  },
  caseContainer: {
    marginBottom: 12,
  },
});

export default LargeEntranceDemo;
