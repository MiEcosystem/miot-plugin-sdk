'use strict';

import React, { useState, cloneElement, useEffect } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { LargeListToggle, colorToken, Fonts, SubtitleGroup } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';
import NavigationBar from 'miot/ui/NavigationBar';

const alert = Alert.alert;
const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '主标题' },
  { name: 'subtitle', type: 'string', passDescription: '副标题（字符串或 SubtitleGroup）', defaultValue: '副标题内容' },
  { name: 'value', type: 'boolean', defaultValue: false },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'forceHideRightIconOnPressInvalid', type: 'boolean', defaultValue: false },
  { name: 'leadingIcon', type: 'pass', passDescription: '左侧图标组件（React.ReactElement）' },
  { name: 'accessible', type: 'boolean', defaultValue: true },
  { name: 'accessibilityLabel', type: 'string', defaultValue: '列表项' },
  { name: 'accessibilityHint', type: 'string' },
];

const longTitle = '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题';
const longSubtitle = '标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字';
const longSubtitles = '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字';

const source1Data1 = [
  {
    index: 1,
    title: '列表主文字',
    leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} />,
  },
  {
    index: 2,
    title: '列表主文字',
    subtitle: '列表副文字',
    value: '状态',
    leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} />,
  },
  {
    index: 3,
    title: '列表主文字',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字']}/>,
    leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} />,
  },
  {
    index: 4,
    title: '列表主文字',
    value: '状态',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字', '列表副文字']}/>,
    leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} />,
  },
  {
    index: 5,
    title: '列表主文字列表主文字表主文字表主文字表主文字表主文字',
    value: '状态',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字', '列表副文字']}/>,
    leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} />,
    onPress: () => console.log(4),
  },
];

const source1Data2 = [
  {
    index: 1,
    title: '列表主文字',
  },
  {
    title: '列表主文字',
    subtitle: '列表副文字',
    value: '状态',
  },
  {
    index: 3,
    title: '列表主文字',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字']}/>,
  },
  {
    index: 4,
    title: '列表主文字',
    value: '状态',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字', '列表副文字']}/>,
  },
  {
    index: 5,
    title: '列表主文字',
    value: '状态',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字', '列表副文字']}/>,
    onPress: () => console.log(4),
  },
];

const source2Data1 = [
  {
    index: 1,
    title: longTitle,
    leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} />,
  },
  {
    index: 2,
    title: longTitle,
    subtitle: longSubtitle,
    
    leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} />,
  },
  {
    index: 3,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles]}/>,
    leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} />,
  },
  {
    index: 4,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles, longSubtitles]}/>,
    leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} />,
  },
  {
    index: 5,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles, longSubtitles]}/>,
    leadingIcon: <Circle fill={colorToken.contentPrimaryNormal} />,
    onPress: () => console.log(4),
  },
];

const source2Data2 = [
  {
    index: 1,
    title: longTitle,
  },
  {
    index: 2,
    title: longTitle,
    subtitle: longSubtitle,
  },
  {
    index: 3,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles]}/>,
  },
  {
    index: 4,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles, longSubtitles]}/>,
  },
  {
    index: 5,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles, longSubtitles]}/>,
    onPress: () => console.log(4),
  },
];

const LargeVariantSwitchDemo = ({ navigation }) => {

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('LargeVariantSwitchConfigDemo', { title: 'LargeVariantSwitch 配置调试' }) }],
    });
  }, []);

  const [state, setState] = useState({
    sourceData1: source1Data1,
    sourceData2: source1Data2,
    disabled: false,
    switchValue: false,
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
            return <LargeListToggle
              key={index}
              {...item}
              disabled={state.disabled}
              checked={state.switchValue}
              onChange={(val) => {
                setState((item) => ({
                  ...item,
                  switchValue: val,
                }));
              }}/>;
          })}
        </View>
        <Text style={styles.title}>不带图标</Text>
        <View style={styles.data}>
          {state.sourceData2.map((item, index) => {
            return <LargeListToggle
              key={index}
              {...item}
              disabled={state.disabled}
              checked={state.switchValue}
              onChange={(val) => {
                setState((item) => ({
                  ...item,
                  switchValue: val,
                }));
              }}/>;
          })}
        </View>
        {/* <View style={styles.caseContainer}>
          <Text style={[styles.header, { marginTop: 12 }]}>LargeListToggle - 入口</Text>
          <TestComponent component={LargeListToggle} propConfigs={propConfigs}/>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    paddingTop: 30,
    paddingHorizontal: 12,
    backgroundColor: colorToken.surfacePageLow,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentPrimaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: colorToken.contentPrimaryNormal,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    color: colorToken.accentOsFill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
    ...Fonts.fontSystem13Regular,
  },
  button: {
    fontSize: 14,
    color: colorToken.contentPrimaryNormal,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
  data: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colorToken.surfaceCardPrimary,
  },
  caseContainer: {
    marginBottom: 12,
  },
});

export default LargeVariantSwitchDemo;
