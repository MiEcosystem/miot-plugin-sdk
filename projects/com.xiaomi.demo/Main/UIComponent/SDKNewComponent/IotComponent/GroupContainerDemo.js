'use strict';

import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, Fonts, CardContainer, ContainerWithGap } from "miot/ui/hyperOSUI";

const GroupContainerDemo = ({ navigation }) => {

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
    backgroundColor: colorToken.mj_color_gray_bg_2
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_2,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 10,
    ...Fonts.mj_text_custom_24_M
  }
});

export default GroupContainerDemo;
