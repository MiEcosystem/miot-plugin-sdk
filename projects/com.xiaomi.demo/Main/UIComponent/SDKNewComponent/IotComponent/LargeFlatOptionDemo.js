'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LargeFlatOption, colorToken, Fonts, FlatSelect, TitleContainer, CardContainer } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const sourceData1 = [
  {
    index: 1,
    title: '标题',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 1
  },
  {
    index: 2,
    title: '标题',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 2
  },
  {
    index: 3,
    title: '标题',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 3
  },
  {
    index: 4,
    title: '标题',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 4
  }
  
];

const sourceData2 = [
  {
    index: 1,
    title: '标题',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 1
  },
  {
    index: 2,
    title: '标题',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 2
  },
  {
    index: 3,
    title: '标题',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 3
  },
  {
    index: 4,
    title: '标题',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 4
  }
];

const sourceData3 = [
  {
    index: 1,
    title: '标题',
    colorType: 'orange',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 1
  },
  {
    index: 2,
    title: '标题',
    colorType: 'orange',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 2
  },
  {
    index: 3,
    title: '标题',
    colorType: 'orange',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 3
  },
  {
    index: 4,
    title: '标题',
    colorType: 'orange',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 4
  }
];

const sourceData4 = [
  {
    index: 1,
    title: '标题',
    colorType: 'orange',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 1
  },
  {
    index: 2,
    title: '标题',
    colorType: 'orange',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 2
  },
  {
    index: 3,
    title: '标题',
    colorType: 'orange',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 3
  },
  {
    index: 4,
    title: '标题',
    colorType: 'orange',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 4
  }
];

const longTitle = '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题';

const LargeFlatOptionDemo = () => {

  const [state, setState] = useState({
    sourceData1,
    sourceData2,
    sourceData3,
    sourceData4,
    disabled: false,
    currentValue: 1
  });

  const transformData = (type) => {
    let data = [];
    switch (type) {
      case 2:
        data = {
          sourceData1: sourceData1.map((item) => ({ ...item, title: longTitle })),
          sourceData2: sourceData2.map((item) => ({ ...item, title: longTitle })),
          sourceData3: sourceData3.map((item) => ({ ...item, title: longTitle })),
          sourceData4: sourceData4.map((item) => ({ ...item, title: longTitle }))
        };
        break;
      default:
        data = {
          sourceData1,
          sourceData2,
          sourceData3,
          sourceData4
        };
    }
    setState((item) => ({
      ...item,
      ...data
    }));
  };

  const onSelect = (value) => {
    console.log(value, 'value======');
    setState((item) => ({
      ...item,
      currentValue: value
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
        <Text style={styles.title}>标题</Text>
        <CardContainer>
          <TitleContainer title="标题"/>
          <FlatSelect value={state.currentValue} disabled={state.disabled} size={'large'} onChange={onSelect}>
            {state.sourceData1.map((item, index) => {
              return <LargeFlatOption key={index} {...item} disabled={state.disabled}/>;
            })}
          </FlatSelect>
        </CardContainer>
        <Text style={styles.title}>去色</Text>
        <CardContainer>
          <FlatSelect value={state.currentValue} disabled={state.disabled} size={'large'} cardType={'outer'} onChange={onSelect}>
            {state.sourceData2.map((item, index) => {
              return <LargeFlatOption key={index} {...item} disabled={state.disabled}/>;
            })}
          </FlatSelect>
        </CardContainer>
        <Text style={styles.title}>标题</Text>
        <CardContainer>
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'large'} onChange={onSelect}>
              {state.sourceData3.map((item, index) => {
                return <LargeFlatOption key={index} colorType="orange" {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
        </CardContainer>
        <Text style={styles.title}>去色</Text>
        <CardContainer>
          <FlatSelect value={state.currentValue} disabled={state.disabled} size={'large'} cardType={'outer'} onChange={onSelect}>
            {state.sourceData4.map((item, index) => {
              return <LargeFlatOption key={index} colorType="orange" {...item} disabled={state.disabled}/>;
            })}
          </FlatSelect>
        </CardContainer>
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
  caseContainer: {
    marginBottom: 12
  }
});

export default LargeFlatOptionDemo;
