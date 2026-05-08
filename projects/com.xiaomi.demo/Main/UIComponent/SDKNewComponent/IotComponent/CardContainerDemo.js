'use strict';

import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, Fonts, CardContainer, ContainerWithGap } from "miot/ui/hyperOSUI";
import NavigationBar from 'miot/ui/NavigationBar';

const CardContainerDemo = ({ navigation }) => {

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('CardContainerConfigDemo', { title: 'CardContainer 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>Card</Text>
      <ContainerWithGap gap={8} outerMargin={12}>
        <CardContainer>
          <View style={{ flex: 1, height: 180 }}/>
        </CardContainer>
        <ContainerWithGap span={2} gap={8} horizontal={true} >
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
        <CardContainer viewStyle={{ flex: 1 }}>
          <View style={{ height: 64 }}/>
        </CardContainer>
        <CardContainer viewStyle={{ flex: 1 }}>
          <View style={{ height: 64 }}/>
        </CardContainer>
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
    ...Fonts.fontSystem24Medium,
  },
});

export default CardContainerDemo;
