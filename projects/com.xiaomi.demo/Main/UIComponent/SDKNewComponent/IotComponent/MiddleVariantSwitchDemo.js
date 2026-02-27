'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MiddleVariantSwitch, colorToken, Fonts, ContainerWithGap, CardContainer } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const sourceData1 = 
  {
    index: 1,
    title: '标题',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    onPress: () => console.log(4)
  };

const sourceData2 = 
  {
    index: 1,
    title: '标题',
    subtitle: '副标题',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'arrow',
    onPress: () => console.log(4)
  };

const sourceData3 = {
  index: 1,
  title: '标题',
  subtitle: '副标题',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
  value: true,
  onPress: () => console.log(4)
};

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
          sourceData1: { ...sourceData1, title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题' },
          sourceData2: { ...sourceData2, title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题', subtitle: '副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题' },
          sourceData3: { ...sourceData3, title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题', subtitle: '副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题' }
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
        <ContainerWithGap span={2} gap={8} horizontal={true} title="标题">
          {new Array(3).fill(state.sourceData1).map((item, index) => {
            return <CardContainer key={index} viewStyle={{ flex: 1 }}><MiddleVariantSwitch {...item} disabled={state.disabled}/></CardContainer>;
          })}
        </ContainerWithGap>
        <ContainerWithGap span={2} gap={8} horizontal={true} title="副标题">
          {new Array(3).fill(state.sourceData2).map((item, index) => {
            return <CardContainer key={index} viewStyle={{ flex: 1 }}><MiddleVariantSwitch {...item} disabled={state.disabled}/></CardContainer>;
          })}
        </ContainerWithGap>
        <ContainerWithGap span={2} gap={8} horizontal={true} title="开关选中">
          {new Array(3).fill(state.sourceData3).map((item, index) => {
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
