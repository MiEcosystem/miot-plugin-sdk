'use strict';

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MediumListEntrance, ContainerWithGap, CardContainer, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';
import NavigationBar from 'miot/ui/NavigationBar';

const longTitle = '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题';
const longSubtitle = '副文字副文字副文字副文字副文字副文字副文字副文字副文字副文字副文字副文字副文字副文字副文字';

const sourceData1 = [
  { title: '入口主文字', leadingIcon: <Circle fill={colorToken.contentSecondaryNormal} />, onPress: () => console.log(1) },
  { title: '入口主文字', leadingIcon: <Circle fill={colorToken.contentSecondaryNormal} />, onPress: () => console.log(2) },
];

const sourceData2 = [
  { title: '入口主文字', subtitle: '副文字', leadingIcon: <Circle fill={colorToken.contentSecondaryNormal} />, onPress: () => console.log(1) },
  { title: '入口主文字', subtitle: '副文字', leadingIcon: <Circle fill={colorToken.contentSecondaryNormal} />, onPress: () => console.log(2) },
];

const sourceData3 = [
  { title: '入口主文字', leadingIcon: <Circle fill={colorToken.contentSecondaryNormal} />, onPress: () => console.log(1) },
  { title: '入口主文字', subtitle: '副文字', leadingIcon: <Circle fill={colorToken.contentSecondaryNormal} />, onPress: () => console.log(2) },
  { title: '入口主文字', onPress: () => console.log(3) },
];

const MediumListEntranceDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('MediumListEntranceConfigDemo', { title: 'MediumListEntrance 配置调试' }) }],
    });
  }, []);

  const [state, setState] = useState({
    sourceData1,
    sourceData2,
    sourceData3,
    disabled: false,
  });

  const transformData = (type) => {
    switch (type) {
      case 2:
        setState((prev) => ({
          ...prev,
          sourceData1: sourceData1.map((item) => ({ ...item, title: longTitle })),
          sourceData2: sourceData2.map((item) => ({ ...item, title: longTitle, subtitle: longSubtitle })),
          sourceData3: sourceData3.map((item) => ({ ...item, title: longTitle, subtitle: item.subtitle ? longSubtitle : undefined })),
        }));
        break;
      default:
        setState((prev) => ({ ...prev, sourceData1, sourceData2, sourceData3 }));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.container}>
        <Text style={styles.header}>MediumListEntrance</Text>
        <Text style={styles.button} onPress={() => transformData(1)}>重置</Text>
        <Text style={styles.button} onPress={() => transformData(2)}>长标题</Text>
        <Text style={styles.button} onPress={() => setState((prev) => ({ ...prev, disabled: !prev.disabled }))}>
          切换禁用态
        </Text>

        <ContainerWithGap span={2} gap={8} horizontal title="不带副标题">
          {state.sourceData1.map((item, index) => (
            <CardContainer key={index} viewStyle={{ flex: 1 }}>
              <MediumListEntrance {...item} disabled={state.disabled} />
            </CardContainer>
          ))}
        </ContainerWithGap>

        <ContainerWithGap span={2} gap={8} horizontal title="带副标题">
          {state.sourceData2.map((item, index) => (
            <CardContainer key={index} viewStyle={{ flex: 1 }}>
              <MediumListEntrance {...item} disabled={state.disabled} />
            </CardContainer>
          ))}
        </ContainerWithGap>

        <ContainerWithGap span={2} gap={8} horizontal title="混合样式">
          {state.sourceData3.map((item, index) => (
            <CardContainer key={index} viewStyle={{ flex: 1 }}>
              <MediumListEntrance {...item} disabled={state.disabled} />
            </CardContainer>
          ))}
        </ContainerWithGap>
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
    color: colorToken.accentBlueFill,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
});

export default MediumListEntranceDemo;
