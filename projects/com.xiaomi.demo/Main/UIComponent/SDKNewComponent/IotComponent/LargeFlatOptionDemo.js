'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LargeTriggerSelect, colorToken, Fonts, CardHeader, CardContainer, ContainerWithGap } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const sourceData1 = new Array(2).fill({
  title: '文字',
  icon: <Circle fill={colorToken.contentSecondaryNormal} />,
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData2 = new Array(3).fill({
  title: '文字',
  icon: <Circle fill={colorToken.contentSecondaryNormal} />,
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData3 = [
  {
    index: 1,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 1,
  },
  {
    index: 2,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 2,
  },
  {
    index: 3,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 3,
  },
  {
    index: 4,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 4,
  },

];

const sourceData4 = new Array(2).fill({
  title: '文字',
  icon: <Circle fill={colorToken.contentSecondaryNormal} />,
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData5 = new Array(3).fill({
  title: '文字',
  icon: <Circle fill={colorToken.contentSecondaryNormal} />,
}).map((item, i) => ({ ...item, value: i + 1 }));

const sourceData6 = [
  {
    index: 1,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 1,
  },
  {
    index: 2,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 2,
  },
  {
    index: 3,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 3,
  },
  {
    index: 4,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 4,
  },
];

const sourceData7 = [
  {
    index: 1,
    title: '文字',
    colorType: 'orange',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 1,
  },
  {
    index: 2,
    title: '文字',
    colorType: 'orange',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 2,
  },
  {
    index: 3,
    title: '文字',
    colorType: 'blue',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 3,
  },
  {
    index: 4,
    title: '文字',
    colorType: 'green',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 4,
  },
];

const sourceData8 = [
  {
    index: 1,
    title: '文字',
    colorType: 'wathet',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 1,
  },
  {
    index: 2,
    title: '文字',
    colorType: 'purple',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 2,
  },
  {
    index: 3,
    title: '文字',
    colorType: 'blue',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 3,
  },
  {
    index: 4,
    title: '文字',
    colorType: 'orange',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 4,
  },
];

const sourceData9 = [
  {
    index: 1,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 1,
  },
  {
    index: 2,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 2,
  },
  {
    index: 3,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 3,
  },
  {
    index: 4,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 4,
  },
];

const sourceData10 = [
  {
    index: 1,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 1,
  },
  {
    index: 2,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 2,
  },
  {
    index: 3,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 3,
  },
  {
    index: 4,
    title: '文字',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    value: 4,
  },
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
    currentValue: 1,
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
          sourceData10: sourceData10.map((item) => ({ ...item, title: longTitle })),
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
          sourceData10,
        };
    }
    setState((item) => ({
      ...item,
      ...data,
    }));
  };

  const onSelect = (value) => {
    setState((item) => ({
      ...item,
      currentValue: value,
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
        <ContainerWithGap gap={8} title="带标题">
          <CardContainer>
            <CardHeader title="标题"/>
            <LargeTriggerSelect value={state.currentValue} disabled={state.disabled} onChange={onSelect} options={state.sourceData1} />
          </CardContainer>
          <CardContainer>
            <CardHeader title="标题"/>
            <LargeTriggerSelect value={state.currentValue} disabled={state.disabled} onChange={onSelect} options={state.sourceData2} />
          </CardContainer>
          <CardContainer>
            <CardHeader title="标题"/>
            <LargeTriggerSelect value={state.currentValue} disabled={state.disabled} onChange={onSelect} options={state.sourceData3} />
          </CardContainer>
        </ContainerWithGap>
        <ContainerWithGap gap={8} title="独立成卡">
          <CardContainer>
            <LargeTriggerSelect value={state.currentValue} disabled={state.disabled} cardType={'outer'} onChange={onSelect} options={state.sourceData4} />
          </CardContainer>
          <CardContainer>
            <CardContainer>
              <LargeTriggerSelect value={state.currentValue} disabled={state.disabled} cardType={'outer'} onChange={onSelect} options={state.sourceData5} />
            </CardContainer>
          </CardContainer>
          <CardContainer>
            <LargeTriggerSelect value={state.currentValue} disabled={state.disabled} cardType={'outer'} onChange={onSelect} options={state.sourceData6} />
          </CardContainer>
        </ContainerWithGap>
        <ContainerWithGap gap={8} title="颜色配置">
          <CardContainer>
            <CardHeader title="标题"/>
            <LargeTriggerSelect value={state.currentValue} disabled={state.disabled} onChange={onSelect} options={state.sourceData7} />
          </CardContainer>
          <CardContainer>
            <LargeTriggerSelect value={state.currentValue} disabled={state.disabled} cardType={'outer'} onChange={onSelect} options={state.sourceData8} />
          </CardContainer>
        </ContainerWithGap>
        <ContainerWithGap gap={8} title="无数据">
          <CardContainer>
            <CardHeader title="标题"/>
            <LargeTriggerSelect value={0} disabled={state.disabled} onChange={onSelect} options={state.sourceData9} />
          </CardContainer>
          <CardContainer>
            <LargeTriggerSelect value={0} disabled={state.disabled} cardType={'outer'} onChange={onSelect} options={state.sourceData10} />
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
    ...Fonts.mj_text_subtitle_3_R,
  },
  button: {
    fontSize: 14,
    color: colorToken.contentPrimaryNormal,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
  caseContainer: {
    marginBottom: 12,
  },
});

export default LargeFlatOptionDemo;
