'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MiddleVariantSwitch, colorToken, Fonts, ContainerWithGap, CardContainer } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const longTitle = '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题';
const longSubtitle = '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字';

const sourceData1 = [
  {
    index: 1,
    title: '主文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    onPress: () => console.log(4)
  },
  {
    index: 2,
    title: '主文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'arrow',
    onPress: () => console.log(4)
  },
  {
    index: 3,
    title: '主文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'select',
    onPress: () => console.log(4)
  }
];

const sourceData2 = [
  {
    index: 1,
    title: '主文字',
    subtitle: '列表副文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    onPress: () => console.log(4)
  },
  {
    index: 1,
    title: '主文字',
    subtitle: '列表副文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'arrow',
    onPress: () => console.log(4)
  },
  {
    index: 1,
    title: '主文字',
    subtitle: '列表副文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'select',
    onPress: () => console.log(4)
  }
];

const sourceData3 = [{
  index: 1,
  title: '主文字',
  subtitle: '列表副文字',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
  value: true,
  colorType: 'blue',
  onPress: () => console.log(4)
},
{
  index: 2,
  title: '主文字',
  subtitle: '列表副文字',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
  value: true,
  colorType: 'green',
  rightIconType: 'arrow',
  onPress: () => console.log(4)
},
{
  index: 3,
  title: '主文字',
  subtitle: '列表副文字',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
  value: true,
  colorType: 'orange',
  rightIconType: 'select',
  onPress: () => console.log(4)
}];

const MiddleVariantSwitchDemo = () => {

  const [state, setState] = useState({
    sourceData1: sourceData1,
    sourceData2: sourceData2,
    sourceData3: sourceData3,
    disabled: false
  });

  const transformData = (type) => {
    let data = [];
    switch (type) {
      case 1:
        data = {
          sourceData1: sourceData1,
          sourceData2: sourceData2,
          sourceData3: sourceData3
        };
        break;
      case 2:
        data = {
          sourceData1: sourceData1.map((item) => ({ ...item, title: longTitle })),
          sourceData2: sourceData2.map((item) => ({ ...item, title: longTitle, subtitle: longSubtitle })),
          sourceData3: sourceData3.map((item) => ({ ...item, title: longTitle, subtitle: longSubtitle }))
        };
        break;
      default:
        data = {
          sourceData1: sourceData1,
          sourceData2: sourceData2,
          sourceData3: sourceData3
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
        <ContainerWithGap span={2} gap={8} horizontal={true} title="不带列表副文字">
          {state.sourceData1.map((item, index) => {
            return <CardContainer key={index} viewStyle={{ flex: 1 }}><MiddleVariantSwitch {...item} disabled={state.disabled}/></CardContainer>;
          })}
        </ContainerWithGap>
        <ContainerWithGap span={2} gap={8} horizontal={true} title="带列表副文字">
          {state.sourceData2.map((item, index) => {
            return <CardContainer key={index} viewStyle={{ flex: 1 }}><MiddleVariantSwitch {...item} disabled={state.disabled}/></CardContainer>;
          })}
        </ContainerWithGap>
        <ContainerWithGap span={2} gap={8} horizontal={true} title="激活态可配置颜色">
          {state.sourceData3.map((item, index) => {
            return <CardContainer key={index} viewStyle={{ flex: 1 }}><MiddleVariantSwitch {...item} disabled={state.disabled}/></CardContainer>;
          })}
        </ContainerWithGap>
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
  button: {
    fontSize: 14,
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 15,
    lineHeight: 24
  },
  caseContainer: {
    marginBottom: 12
  }
});

export default MiddleVariantSwitchDemo;
