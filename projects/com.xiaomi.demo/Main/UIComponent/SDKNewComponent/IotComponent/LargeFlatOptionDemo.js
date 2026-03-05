'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LargeFlatOption, colorToken, Fonts, FlatSelect, TitleContainer, CardContainer, ContainerWithGap } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const sourceData1 = new Array(2).fill({
  title: '文字',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData2 = new Array(3).fill({
  title: '文字',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData3 = [
  {
    index: 1,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 1
  },
  {
    index: 2,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 2
  },
  {
    index: 3,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 3
  },
  {
    index: 4,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 4
  }
  
];

const sourceData4 = new Array(2).fill({
  title: '文字',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData5 = new Array(3).fill({
  title: '文字',
  icon: <Circle fill={colorToken.mj_color_gray_icon_2} />
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData6 = [
  {
    index: 1,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 1
  },
  {
    index: 2,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 2
  },
  {
    index: 3,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 3
  },
  {
    index: 4,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 4
  }
];

const sourceData7 = [
  {
    index: 1,
    title: '文字',
    colorType: 'orange',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 1
  },
  {
    index: 2,
    title: '文字',
    colorType: 'yellow',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 2
  },
  {
    index: 3,
    title: '文字',
    colorType: 'blue',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 3
  },
  {
    index: 4,
    title: '文字',
    colorType: 'green',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 4
  }
];

const sourceData8 = [
  {
    index: 1,
    title: '文字',
    colorType: 'wathet',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 1
  },
  {
    index: 2,
    title: '文字',
    colorType: 'purple',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 2
  },
  {
    index: 3,
    title: '文字',
    colorType: 'red',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 3
  },
  {
    index: 4,
    title: '文字',
    colorType: 'orange',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 4
  }
];

const sourceData9 = [
  {
    index: 1,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 1
  },
  {
    index: 2,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 2
  },
  {
    index: 3,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 3
  },
  {
    index: 4,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 4
  }
];

const sourceData10 = [
  {
    index: 1,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 1
  },
  {
    index: 2,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 2
  },
  {
    index: 3,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 3
  },
  {
    index: 4,
    title: '文字',
    icon: <Circle fill={colorToken.mj_color_gray_icon_2} />,
    value: 4
  }
];

const longTitle = '文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字';

const LargeFlatOptionDemo = () => {

  const [state, setState] = useState({
    sourceData1,
    sourceData2,
    sourceData3,
    sourceData4,
    sourceData5,
    sourceData6,
    sourceData7,
    sourceData8,
    sourceData9,
    sourceData10,
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
          sourceData4: sourceData4.map((item) => ({ ...item, title: longTitle })),
          sourceData5: sourceData5.map((item) => ({ ...item, title: longTitle })),
          sourceData6: sourceData6.map((item) => ({ ...item, title: longTitle })),
          sourceData7: sourceData7.map((item) => ({ ...item, title: longTitle })),
          sourceData8: sourceData8.map((item) => ({ ...item, title: longTitle })),
          sourceData9: sourceData9.map((item) => ({ ...item, title: longTitle })),
          sourceData10: sourceData10.map((item) => ({ ...item, title: longTitle }))
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
          sourceData7,
          sourceData8,
          sourceData9,
          sourceData10
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
        <ContainerWithGap gap={8} title="带标题">
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'large'} onChange={onSelect}>
              {state.sourceData1.map((item, index) => {
                return <LargeFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'large'} onChange={onSelect}>
              {state.sourceData2.map((item, index) => {
                return <LargeFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'large'} onChange={onSelect}>
              {state.sourceData3.map((item, index) => {
                return <LargeFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
        </ContainerWithGap>
        <ContainerWithGap gap={8} title="独立成卡">
          <CardContainer>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'large'} cardType={'outer'} onChange={onSelect}>
              {state.sourceData4.map((item, index) => {
                return <LargeFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
          <CardContainer>
            <CardContainer>
              <FlatSelect value={state.currentValue} disabled={state.disabled} size={'large'} cardType={'outer'} onChange={onSelect}>
                {state.sourceData5.map((item, index) => {
                  return <LargeFlatOption key={index} {...item} disabled={state.disabled}/>;
                })}
              </FlatSelect>
            </CardContainer>
          </CardContainer>
          <CardContainer>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'large'} cardType={'outer'} onChange={onSelect}>
              {state.sourceData6.map((item, index) => {
                return <LargeFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
        </ContainerWithGap>
        <ContainerWithGap gap={8} title="颜色配置">
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'large'} onChange={onSelect}>
              {state.sourceData7.map((item, index) => {
                return <LargeFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
          <CardContainer>
            <FlatSelect value={state.currentValue} disabled={state.disabled} size={'large'} cardType={'outer'} onChange={onSelect}>
              {state.sourceData8.map((item, index) => {
                return <LargeFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
        </ContainerWithGap>
        <ContainerWithGap gap={8} title="无数据">
          <CardContainer>
            <TitleContainer title="标题"/>
            <FlatSelect value={0} disabled={state.disabled} size={'large'} onChange={onSelect}>
              {state.sourceData9.map((item, index) => {
                return <LargeFlatOption key={index} {...item} disabled={state.disabled}/>;
              })}
            </FlatSelect>
          </CardContainer>
          <CardContainer>
            <FlatSelect value={0} disabled={state.disabled} size={'large'} cardType={'outer'} onChange={onSelect}>
              {state.sourceData10.map((item, index) => {
                return <LargeFlatOption key={index} {...item} disabled={state.disabled}/>;
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

export default LargeFlatOptionDemo;
