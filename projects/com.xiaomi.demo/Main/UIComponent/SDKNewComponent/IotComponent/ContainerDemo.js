'use strict';

import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, Fonts, CardContainer, ContainerWithGap } from "miot/ui/hyperOSUI";

const ContainerDemo = ({ navigation }) => {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>容器</Text>
      <ContainerWithGap gap={8} outerMargin={12}>
        <CardContainer>
          <View style={{ flex: 1, height: 100 }}/>
        </CardContainer>
        <ContainerWithGap span={2} gap={8} horizontal={true} >
          <CardContainer viewStyle={{ flex: 1 }}>
            <View style={{ flex: 1, height: 100 }}/>
          </CardContainer>
          <CardContainer viewStyle={{ flex: 1 }}>
            <View style={{ flex: 1, height: 100 }}/>
          </CardContainer>
          <CardContainer viewStyle={{ flex: 1 }}>
            <View style={{ flex: 1, height: 100 }}/>
          </CardContainer>
          <CardContainer viewStyle={{ flex: 1 }}>
            <View style={{ flex: 1, height: 100 }}/>
          </CardContainer>
        </ContainerWithGap>
        <CardContainer viewStyle={{ flex: 1 }}>
          <View style={{ flex: 1, height: 50 }}/>
        </CardContainer>
        <CardContainer viewStyle={{ flex: 1 }}>
          <View style={{ height: 50 }}/>
        </CardContainer>
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

export default ContainerDemo;
