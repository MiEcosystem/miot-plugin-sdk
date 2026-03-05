'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SmallEntrance, colorToken, Fonts, SmallGridContainer, CardContainer, ContainerWithGap } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const title = '标题';
const longTitle = '标题标题标题标题标题标题标题标题标题标题标题标题';
const longText = '文本文本文本文本文本文本文本文本文本文本文本文本';

const sourceData1 = 
  {
    index: 1,
    title,
    icon: <Circle fill={colorToken.mj_color_gray_icon_1} />
  };

const sourceData2 = 
  {
    index: 1,
    title: '文本',
    icon: <Circle fill={colorToken.mj_color_gray_icon_1} />
  };

const sourceData3 = {
  index: 1,
  title,
  icon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
  hideRightIcon: false,
  onPress: () => console.log(4)
};

const sourceData4 = {
  index: 1,
  title,
  icon: <Circle fill={colorToken.mj_color_gray_icon_1} />
};

const SmallEntranceDemo = () => {

  const [state, setState] = useState({
    sourceData1: sourceData1,
    sourceData2: sourceData2,
    sourceData3: sourceData3,
    sourceData4: sourceData4,
    disabled: false
  });

  const transformData = (type) => {
    let data = [];
    switch (type) {
      case 1:
        data = {
          sourceData1: sourceData1,
          sourceData2: sourceData2,
          sourceData3: sourceData3,
          sourceData4: sourceData4
        };
        break;
      case 2:
        data = {
          sourceData1: { ...sourceData1, title: sourceData1.title === title ? longTitle : longText },
          sourceData2: { ...sourceData2, title: sourceData2.title === title ? longTitle : longText },
          sourceData3: { ...sourceData3, title: sourceData3.title === title ? longTitle : longText },
          sourceData4: { ...sourceData4, title: sourceData4.title === title ? longTitle : longText }
        };
        break;
      default:
        data = {
          sourceData1: sourceData1,
          sourceData2: sourceData2,
          sourceData3: sourceData3,
          sourceData4: sourceData4
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
        <ContainerWithGap title="一排" gap={8}>
          <CardContainer>
            <SmallGridContainer columns={2}>
              {new Array(2).fill(state.sourceData1).map((item, index) => {
                return <SmallEntrance key={index} {...item} disabled={state.disabled}/>;
              })}
            </SmallGridContainer>
          </CardContainer>
          <CardContainer>
            <SmallGridContainer columns={3}>
              {new Array(3).fill(state.sourceData1).map((item, index) => {
                return <SmallEntrance key={index} {...item} disabled={state.disabled}/>;
              })}
            </SmallGridContainer>
          </CardContainer>
          <CardContainer>
            <SmallGridContainer columns={4}>
              {new Array(4).fill(state.sourceData2).map((item, index) => {
                return <SmallEntrance key={index} {...item} disabled={state.disabled}/>;
              })}
            </SmallGridContainer>
          </CardContainer>
          <CardContainer>
            <SmallGridContainer columns={4}>
              {new Array(4).fill(state.sourceData1).map((item, index) => {
                return <SmallEntrance key={index} {...item} disabled={state.disabled}/>;
              })}
            </SmallGridContainer>
          </CardContainer>
        </ContainerWithGap>
        <ContainerWithGap title="两排" gap={8}>
          <CardContainer>
            <SmallGridContainer columns={2}>
              {new Array(4).fill(state.sourceData1).map((item, index) => {
                return <SmallEntrance key={index} {...item} disabled={state.disabled}/>;
              })}
            </SmallGridContainer>
          </CardContainer>
          <CardContainer>
            <SmallGridContainer columns={3}>
              {new Array(5).fill(state.sourceData1).map((item, index) => {
                return <SmallEntrance key={index} {...item} disabled={state.disabled}/>;
              })}
            </SmallGridContainer>
          </CardContainer>
          <CardContainer>
            <SmallGridContainer columns={5}>
              {new Array(10).fill(state.sourceData2).map((item, index) => {
                return <SmallEntrance key={index} {...item} disabled={state.disabled}/>;
              })}
            </SmallGridContainer>
          </CardContainer>
          <CardContainer>
            <SmallGridContainer columns={5}>
              {new Array(10).fill(state.sourceData1).map((item, index) => {
                return <SmallEntrance key={index} {...item} disabled={state.disabled}/>;
              })}
            </SmallGridContainer>
          </CardContainer>
        </ContainerWithGap>
        <ContainerWithGap title="三排及以上" gap={8}>
          <CardContainer>
            <SmallGridContainer columns={5}>
              {new Array(15).fill(state.sourceData1).map((item, index) => {
                return <SmallEntrance key={index} {...item} disabled={state.disabled}/>;
              })}
            </SmallGridContainer>
          </CardContainer>
          <CardContainer>
            <SmallGridContainer columns={5}>
              {new Array(18).fill(state.sourceData2).map((item, index) => {
                return <SmallEntrance key={index} {...item} disabled={state.disabled}/>;
              })}
            </SmallGridContainer>
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
  }
});

export default SmallEntranceDemo;
