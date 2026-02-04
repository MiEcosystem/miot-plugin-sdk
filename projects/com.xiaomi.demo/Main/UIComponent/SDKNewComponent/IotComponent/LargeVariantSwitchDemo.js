'use strict';

import React, { useState, cloneElement } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { LargeVariantSwitch, colorToken, Fonts, TestComponent, SubtitleGroup } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const alert = Alert.alert;
const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '主标题' },
  { name: 'subtitle', type: 'string', defaultValue: '副标题内容' },
  { name: 'value', type: 'string', defaultValue: '右侧文案' },
  { name: 'onPress', type: 'pass', passDescription: '点击事件回调', defaultValue: () => alert('onPress') },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'hideRightIcon', type: 'boolean', defaultValue: false },
  { name: 'forceHideRightIconOnPressInvalid', type: 'boolean', defaultValue: false },
  { name: 'showDot', type: 'boolean', defaultValue: false },
  { name: 'leftIconSource', type: 'pass', passDescription: '左侧图标组件（React.ReactElement）' },
  { name: 'customRenderer', type: 'pass', passDescription: '右侧自定义渲染', defaultValue: <Image style={{ resizeMode: 'contain', width: 46, height: 46 }} source={require('../../images/group.png')} /> },
  { name: 'accessible', type: 'boolean', defaultValue: true },
  { name: 'accessibilityLabel', type: 'string', defaultValue: '列表项' },
  { name: 'accessibilityHint', type: 'string' }
];

const longTitle = '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题';
const longSubtitle = '标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字标题副文字';
const longSubtitles = '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字';

const source1Data1 = [
  {
    index: 1,
    title: '列表主文字',
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />
  },
  {
    index: 2,
    title: '列表主文字',
    subtitle: '列表副文字',
    value: '状态',
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />
  },
  {
    index: 3,
    title: '列表主文字',
    subtitle: <SubtitleGroup subtitles={['列表副', '列表副']}/>,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />
  },
  {
    index: 4,
    title: '列表主文字',
    value: '状态',
    subtitle: <SubtitleGroup subtitles={['列表副', '列表副', '列表副']}/>,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />
  },
  {
    index: 5,
    title: '列表主文字列表主文字表主文字表主文字表主文字表主文字',
    value: '状态',
    subtitle: <SubtitleGroup subtitles={['列表副', '列表副', '列表副']}/>,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4)
  }
];

const source1Data2 = [
  {
    index: 1,
    title: '列表主文字'
  },
  {
    title: '列表主文字',
    subtitle: '列表副文字',
    value: '状态'
  },
  {
    index: 3,
    title: '列表主文字',
    subtitle: <SubtitleGroup subtitles={['列表副', '列表副']}/>
  },
  {
    index: 4,
    title: '列表主文字',
    value: '状态',
    subtitle: <SubtitleGroup subtitles={['列表副', '列表副', '列表副']}/>
  },
  {
    index: 5,
    title: '列表主文字',
    value: '状态',
    subtitle: <SubtitleGroup subtitles={['列表副', '列表副', '列表副']}/>,
    onPress: () => console.log(4)
  }
];

const source2Data1 = [
  {
    index: 1,
    title: longTitle,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />
  },
  {
    index: 2,
    title: longTitle,
    subtitle: longSubtitle,
    
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />
  },
  {
    index: 3,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles]}/>,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />
  },
  {
    index: 4,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles, longSubtitles]}/>,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />
  },
  {
    index: 5,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles, longSubtitles]}/>,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4)
  }
];

const source2Data2 = [
  {
    index: 1,
    title: longTitle
  },
  {
    index: 2,
    title: longTitle,
    subtitle: longSubtitle
  },
  {
    index: 3,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles]}/>
  },
  {
    index: 4,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles, longSubtitles]}/>
  },
  {
    index: 5,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitles, longSubtitles, longSubtitles]}/>,
    onPress: () => console.log(4)
  }
];

const LargeEntranceDemo = () => {

  const [state, setState] = useState({
    sourceData1: source1Data1,
    sourceData2: source1Data2,
    disabled: false,
    switchValue: false
  });

  const transformData = (type) => {
    let data = [];
    switch (type) {
      case 1:
        data = {
          sourceData1: source1Data1,
          sourceData2: source1Data2
        };
        break;
      case 2:
        data = {
          sourceData1: source2Data1,
          sourceData2: source2Data2
        };
        break;
      default:
        data = {
          sourceData1: source1Data1,
          sourceData2: source1Data2
        };
    }
    setState((item) => ({
      ...item,
      ...data
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
            disabled: !state.disabled
          }));
        }}>切换禁用态</Text>
        <Text style={styles.title}>带图标</Text>
        <View style={styles.data}>
          {state.sourceData1.map((item, index) => {
            return <LargeVariantSwitch
              key={index}
              {...item}
              disabled={state.disabled}
              value={state.switchValue}
              onValueChange={(val) => {
                setState((item) => ({
                  ...item,
                  switchValue: val
                }));
              }}/>;
          })}
        </View>
        <Text style={styles.title}>不带图标</Text>
        <View style={styles.data}>
          {state.sourceData2.map((item, index) => {
            return <LargeVariantSwitch
              key={index}
              {...item}
              disabled={state.disabled}
              value={state.switchValue}
              onValueChange={(val) => {
                setState((item) => ({
                  ...item,
                  switchValue: val
                }));
              }}/>;
          })}
        </View>
        {/* <View style={styles.caseContainer}>
          <Text style={[styles.header, { marginTop: 12 }]}>LargeVariantSwitch - 入口</Text>
          <TestComponent component={LargeVariantSwitch} propConfigs={propConfigs}/>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    paddingTop: 30,
    paddingHorizontal: 12,
    backgroundColor: colorToken.mj_color_gray_bg_2
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_1,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 16,
    paddingTop: 12
  },
  title: {
    color: colorToken.mjcard_color_miui_1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
    ...Fonts.mj_text_subtitle_3_R
  },
  button: {
    fontSize: 14,
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 15,
    lineHeight: 24
  },
  data: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colorToken.mj_color_gray_card_1
  },
  caseContainer: {
    marginBottom: 12
  }
});

export default LargeEntranceDemo;
