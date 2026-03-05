'use strict';

import React, { useState, cloneElement } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { TitleContainer, colorToken, Fonts, TestComponent, SubtitleGroup } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const longTitle = '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题';
const longSubtitle = '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字';
const longValueText = '状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态';

const sourceData1 = [
  {
    index: 1,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    title: '标题'
  },
  {
    title: '标题',
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    statusRender: '状态说明'
  },
  {
    index: 3,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    title: '标题',
    subtitle: '列表副文字',
    onPress: () => console.log(4),
    type: 'switch'
  },
  {
    index: 4,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    title: '标题',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字']}/>,
    showDot: false,
    onPress: () => console.log(4)
  },
  {
    index: 5,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    title: '标题',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字', '列表副文字']}/>,
    valueText: '状态',
    showDot: true,
    hideRightIcon: false,
    onPress: () => console.log(4)
  },
  {
    index: 6,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    title: '标题',
    statusRender: <View style={{ width: 14, height: 14, backgroundColor: colorToken.mjcard_color_yellow_1, borderRadius: 2 }}></View>,
    type: 'switch'
  }
];

const sourceData2 = [
  {
    index: 1,
    title: '标题'
  },
  {
    title: '标题',
    statusRender: '状态说明'
  },
  {
    index: 3,
    title: '标题',
    subtitle: '列表副文字',
    onPress: () => console.log(4),
    type: 'switch'
  },
  {
    index: 4,
    title: '标题',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字']}/>,
    showDot: false,
    onPress: () => console.log(4)
  },
  {
    index: 5,
    title: '标题',
    subtitle: <SubtitleGroup subtitles={['列表副文字', '列表副文字', '列表副文字']}/>,
    valueText: '状态',
    showDot: true,
    hideRightIcon: false,
    onPress: () => console.log(4)
  },
  {
    index: 6,
    title: '标题',
    statusRender: <View style={{ width: 14, height: 14, backgroundColor: colorToken.mjcard_color_yellow_1, borderRadius: 2 }}></View>,
    type: 'switch'
  }
];

const source2Data1 = [
  {
    index: 1,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    title: longTitle
  },
  {
    title: '标题标题标题标题标题标题',
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    statusRender: '状态说明'
  },
  {
    index: 3,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    title: longTitle,
    subtitle: longSubtitle,
    onPress: () => console.log(4),
    type: 'switch'
  },
  {
    index: 4,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitle, longSubtitle]}/>,
    showDot: false,
    onPress: () => console.log(4)
  },
  {
    index: 5,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitle, longSubtitle, longSubtitle]}/>,
    valueText: longValueText,
    showDot: true,
    hideRightIcon: false,
    onPress: () => console.log(4)
  },
  {
    index: 6,
    leftIconSource: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    title: longTitle,
    statusRender: <View style={{ width: 14, height: 14, backgroundColor: colorToken.mjcard_color_yellow_1, borderRadius: 2 }}></View>,
    type: 'switch'
  }
];

const source2Data2 = [
  {
    index: 1,
    title: longTitle
  },
  {
    title: longTitle,
    statusRender: '状态说明状态说明状态说明状态说明状态说明状态说明'
  },
  {
    index: 3,
    title: longTitle,
    subtitle: longSubtitle,
    onPress: () => console.log(4),
    type: 'switch'
  },
  {
    index: 4,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitle, longSubtitle]}/>,
    showDot: false,
    onPress: () => console.log(4)
  },
  {
    index: 5,
    title: longTitle,
    subtitle: <SubtitleGroup subtitles={[longSubtitle, longSubtitle, longSubtitle]}/>,
    valueText: longValueText,
    showDot: true,
    hideRightIcon: false,
    onPress: () => console.log(4)
  },
  {
    index: 6,
    title: longTitle,
    statusRender: <View style={{ width: 14, height: 14, backgroundColor: colorToken.mjcard_color_yellow_1, borderRadius: 2 }}></View>,
    type: 'switch'
  }
];

const TitleContainerDemo = () => {

  const [state, setState] = useState({
    sourceData1: sourceData1,
    sourceData2: sourceData2,
    disabled: false,
    switchValue: false
  });

  const transformData = (type) => {
    let data = [];
    switch (type) {
      case 1:
        data = {
          sourceData1: sourceData1,
          sourceData2: sourceData2
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
          sourceData1: sourceData1,
          sourceData2: sourceData2
        };
    }
    setState((item) => ({
      ...item,
      ...data
    }));
  };

  const onValueChange = (val) => {
    setState((item) => ({
      ...item,
      switchValue: val
    }));
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>卡片标题</Text>
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
        <Text style={styles.title}>无图标</Text>
        <View style={styles.data}>
          {state.sourceData2.map((item, index) => {
            let newProps = {};
            if (item.type === 'switch') {
              newProps = {
                value: state.switchValue,
                onValueChange
              };
            }
            return <TitleContainer key={index} {...item} disabled={state.disabled} {...newProps}/>;
          })}
        </View>
        <Text style={styles.title}>有图标</Text>
        <View style={styles.data}>
          {state.sourceData1.map((item, index) => {
            return <TitleContainer key={index} {...item} disabled={state.disabled}/>;
          })}
        </View>
        <View style={{ height: 28 }}/>
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

export default TitleContainerDemo;
