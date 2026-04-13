'use strict';

import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, Fonts, CardContainer, ContainerWithGap } from "miot/ui/hyperOSUI";
import NavigationBar from 'miot/ui/NavigationBar';

const GroupContainerDemo = ({ navigation }) => {

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('ContainerWithGapConfigDemo', { title: 'ContainerWithGap 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Group标题</Text>
      <ContainerWithGap gap={8} outerMargin={12}>
        <CardContainer title={"分组标题"}>
          <View style={{ flex: 1, height: 180 }}/>
        </CardContainer>
        <ContainerWithGap span={2} gap={8} horizontal={true} title={"分组标题"}>
          <CardContainer viewStyle={{ flex: 1 }}>
            <View style={{ flex: 1, height: 64 }}/>
          </CardContainer>
          <CardContainer viewStyle={{ flex: 1 }}>
            <View style={{ flex: 1, height: 64 }}/>
          </CardContainer>
          <CardContainer viewStyle={{ flex: 1 }}>
            <View style={{ flex: 1, height: 64 }}/>
          </CardContainer>
          <CardContainer viewStyle={{ flex: 1 }}>
            <View style={{ flex: 1, height: 64 }}/>
          </CardContainer>
        </ContainerWithGap>
        <ContainerWithGap 
          span={2}
          gap={8}
          horizontal={true}
          title={"分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题分组标题"}
        >
          <CardContainer viewStyle={{ flex: 1 }}>
            <View style={{ flex: 1, height: 64 }}/>
          </CardContainer>
          <CardContainer viewStyle={{ flex: 1 }}>
            <View style={{ height: 64 }}/>
          </CardContainer>
        </ContainerWithGap>
      </ContainerWithGap>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.surfacePageLow,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentSecondaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 10,
    ...Fonts.mj_text_custom_24_M,
  },
});

export default GroupContainerDemo;
