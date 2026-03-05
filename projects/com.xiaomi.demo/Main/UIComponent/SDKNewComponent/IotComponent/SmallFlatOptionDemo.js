'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SmallFlatOption, colorToken, Fonts, FlatSelect, CardContainer, TitleContainer, ContainerWithGap } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const longTitle = '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题';
const longSubtitle = '副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题';

const sourceData1 = new Array(2).fill({
  title: '标题',
  colorType: 'blue',
  subtitle: '列表副文字',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData2 = new Array(3).fill({
  title: '标题',
  colorType: 'blue',
  subtitle: '列表副文字',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData3 = new Array(2).fill({
  title: '标题',
  subtitle: '列表副文字',
  rightIconType: 'arrow',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />
}).map((item, i) => ({ ...item, value: i + 1 }));


const sourceData4 = new Array(3).fill({
  title: '标题',
  subtitle: '列表副文字',
  rightIconType: 'arrow',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData5 = new Array(2).fill({
  title: '标题',
  subtitle: '列表副文字',
  rightIconType: 'select',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData6 = new Array(3).fill({
  title: '标题',
  subtitle: '列表副文字',
  rightIconType: 'select',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData7 = [
  {
    index: 1,
    title: '标题',
    subtitle: '列表副文字',
    colorType: 'blue',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'arrow',
    value: 1
  },
  {
    index: 2,
    title: '标题',
    subtitle: '列表副文字',
    colorType: 'orange',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'arrow',
    value: 2
  },
  {
    index: 3,
    title: '标题',
    subtitle: '列表副文字',
    colorType: 'green',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'arrow',
    value: 3
  }
];

const SmallFlatOptionDemo = () => {

  const [state, setState] = useState({
    sourceData1,
    sourceData2,
    sourceData3,
    sourceData4,
    sourceData5,
    sourceData6,
    sourceData7,
    disabled: false,
    currentValue: 1
  });

  const transformData = (type) => {
    let data = [];
    switch (type) {
      case 2:
        data = {
          sourceData1: sourceData1.map((item) => ({ ...item, title: longTitle })),
          sourceData2: sourceData2.map((item) => ({ ...item, title: longTitle, subtitle: longSubtitle })),
          sourceData3: sourceData3.map((item) => ({ ...item, title: longTitle, subtitle: longSubtitle })),
          sourceData4: sourceData4.map((item) => ({ ...item, title: longTitle, subtitle: longSubtitle })),
          sourceData5: sourceData5.map((item) => ({ ...item, title: longTitle, subtitle: longSubtitle })),
          sourceData6: sourceData6.map((item) => ({ ...item, title: longTitle, subtitle: longSubtitle })),
          sourceData7: sourceData7.map((item) => ({ ...item, title: longTitle, subtitle: longSubtitle }))
        };
        break;
      default:
        data = {
          sourceData1,
          sourceData2,
          sourceData3,
          sourceData4,
          sourceData5,
          sourceData6,
          sourceData7
        };
    }
    setState((item) => ({
      ...item,
      ...data
    }));
  };

  const onSelect = (value) => {
    setState((item) => ({
      ...item,
      currentValue: value
    }));
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>S</Text>
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
        <ContainerWithGap gap={8} title="副标题无交互">
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'small'} onChange={onSelect}>
              {state.sourceData1.map((item, index) => {
                return <SmallFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'small'} onChange={onSelect}>
              {state.sourceData2.map((item, index) => {
                return <SmallFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
        </ContainerWithGap>
        <ContainerWithGap gap={8} title="副标题带入口">
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'small'} onChange={onSelect}>
              {state.sourceData3.map((item, index) => {
                return <SmallFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'small'} onChange={onSelect}>
              {state.sourceData4.map((item, index) => {
                return <SmallFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
        </ContainerWithGap>
        <ContainerWithGap gap={8} title="副标题带切换">
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'small'} onChange={onSelect}>
              {state.sourceData5.map((item, index) => {
                return <SmallFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'small'} onChange={onSelect}>
              {state.sourceData6.map((item, index) => {
                return <SmallFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
        </ContainerWithGap>
        <ContainerWithGap gap={8} title="颜色配置">
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'small'} onChange={onSelect}>
              {state.sourceData7.map((item, index) => {
                return <SmallFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
        </ContainerWithGap>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    paddingTop: 30,
    paddingHorizontal: 12,
    paddingBottom: 28,
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
  caseContainer: {
    marginBottom: 12
  }
});

export default SmallFlatOptionDemo;
