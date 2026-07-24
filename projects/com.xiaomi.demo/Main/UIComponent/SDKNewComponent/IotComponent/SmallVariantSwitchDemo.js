'use strict';

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SmallGridToggle, colorToken, Fonts, SmallGridContainer, CardContainer } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';
import NavigationBar from 'miot/ui/NavigationBar';

const sourceData1 = 
  {
    index: 1,
    title: '标题',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
  };

const sourceData2 = 
  {
    index: 1,
    title: '标题',
    icon: <Circle fill={colorToken.contentSecondaryNormal} />,
    rightIconType: 'arrow',
  };

const sourceData3 = {
  index: 1,
  title: '标题',
  icon: <Circle fill={colorToken.contentSecondaryNormal} />,
  rightIconType: 'select',
  checked: true,
};

const sourceData4 = {
  index: 1,
  title: '标题',
  icon: <Circle fill={colorToken.contentSecondaryNormal} />,
  rightIconType: 'select',
};

const SmallGridToggleDemo = ({ navigation }) => {

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('SmallGridToggleConfigDemo', { title: 'SmallGridToggle 配置调试' }) }],
    });
  }, []);

  const [state, setState] = useState({
    sourceData1: sourceData1,
    sourceData2: sourceData2,
    sourceData3: sourceData3,
    sourceData4: sourceData4,
    disabled: false,
  });

  const transformData = (type) => {
    let data = [];
    switch (type) {
      case 1:
        data = {
          sourceData1: sourceData1,
          sourceData2: sourceData2,
          sourceData3: sourceData3,
          sourceData4: sourceData4,
        };
        break;
      case 2:
        data = {
          sourceData1: { ...sourceData1, title: '标题标题标题标题标题' },
          sourceData2: { ...sourceData2, title: '标题标题标题标题标题' },
          sourceData3: { ...sourceData3, title: '标题标题标题标题标题' },
          sourceData4: { ...sourceData4, title: '标题标题标题标题标题' },
        };
        break;
      default:
        data = {
          sourceData1: sourceData1,
          sourceData2: sourceData2,
          sourceData3: sourceData3,
          sourceData4: sourceData4,
        };
    }
    setState((item) => ({
      ...item,
      ...data,
    }));
  };
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
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
            disabled: !state.disabled,
          }));
        }}>切换禁用态</Text>
        <CardContainer title="4个">
          <SmallGridContainer >
            {new Array(4).fill(state.sourceData1).map((item, index) => {
              return <SmallGridToggle key={index} {...item} disabled={state.disabled}/>;
            })}
          </SmallGridContainer>
        </CardContainer>
        <CardContainer title="5个">
          <SmallGridContainer columns={5}>
            {new Array(5).fill(state.sourceData2).map((item, index) => {
              return <SmallGridToggle key={index} {...item} disabled={state.disabled}/>;
            })}
          </SmallGridContainer>
        </CardContainer>
        <CardContainer title="8个">
          <SmallGridContainer >
            {new Array(8).fill(state.sourceData3).map((item, index) => {
              return <SmallGridToggle key={index} {...item} disabled={state.disabled}/>;
            })}
          </SmallGridContainer>
        </CardContainer>
        <CardContainer title="9个">
          <SmallGridContainer columns={5}>
            {new Array(9).fill(state.sourceData4).map((item, index) => {
              return <SmallGridToggle key={index} {...item} disabled={state.disabled}/>;
            })}
          </SmallGridContainer>
        </CardContainer>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    paddingTop: 30,
    paddingHorizontal: 12,
    backgroundColor: colorToken.surfacePageLow,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentPrimaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    fontSize: 14,
    color: colorToken.contentPrimaryNormal,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
});

export default SmallGridToggleDemo;
