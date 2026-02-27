'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SmallFlatOption, colorToken, Fonts, FlatSelect, CardContainer, TitleContainer } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const sourceData1 = [
  {
    index: 1,
    title: '标题',
    colorType: 'blue',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 1
  },
  {
    index: 2,
    title: '标题',
    colorType: 'blue',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 2
  }
];

const sourceData2 = [
  {
    index: 1,
    title: '标题',
    subtitle: '副标题',
    colorType: 'blue',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'arrow',
    value: 1
  },
  {
    index: 2,
    title: '标题',
    subtitle: '副标题',
    colorType: 'blue',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'arrow',
    value: 2
  },
  {
    index: 3,
    title: '标题',
    subtitle: '副标题',
    colorType: 'blue',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'arrow',
    value: 3
  }
];

const sourceData3 = [
  {
    index: 1,
    title: '标题',
    subtitle: '副标题',
    colorType: 'blue',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'select',
    value: 1
  },
  {
    index: 2,
    title: '标题',
    subtitle: '副标题',
    colorType: 'blue',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'select',
    value: 2
  },
  {
    index: 3,
    title: '标题',
    subtitle: '副标题',
    colorType: 'blue',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    rightIconType: 'select',
    value: 3
  }
];

const SmallFlatOptionDemo = () => {

  const [state, setState] = useState({
    sourceData1,
    sourceData2,
    sourceData3,
    disabled: false
  });

  const transformData = (type) => {
    let data = [];
    switch (type) {
      case 2:
        data = {
          sourceData1: sourceData1.map((item) => ({ ...item, title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题' })),
          sourceData2: sourceData2.map((item) => ({ ...item, title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题', subtitle: '副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题' })),
          sourceData3: sourceData3.map((item) => ({ ...item, title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题', subtitle: '副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题' }))
        };
        break;
      default:
        data = {
          sourceData1,
          sourceData2,
          sourceData3
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
        <Text style={styles.title}>2个</Text>
        <CardContainer>
          <TitleContainer title="标题"/>
          <FlatSelect value={1} disabled={state.disabled} size={'small'}>
            {state.sourceData1.map((item, index) => {
              return <SmallFlatOption key={index} {...item} disabled={state.disabled}/>;
            })}
          </FlatSelect>
        </CardContainer>
        <Text style={styles.title}>3个</Text>
        <CardContainer>
          <TitleContainer title="标题"/>
          <FlatSelect value={1} disabled={state.disabled} size={'small'}>
            {state.sourceData2.map((item, index) => {
              return <SmallFlatOption key={index} {...item} disabled={state.disabled}/>;
            })}
          </FlatSelect>

        </CardContainer>
        <Text style={styles.title}>3个</Text>
        <CardContainer>
          <TitleContainer title="标题"/>
          <FlatSelect value={[1, 2]} disabled={state.disabled} size={'small'} mode="multiple">
            {state.sourceData3.map((item, index) => {
              return <SmallFlatOption key={index} {...item} disabled={state.disabled}/>;
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

export default SmallFlatOptionDemo;
