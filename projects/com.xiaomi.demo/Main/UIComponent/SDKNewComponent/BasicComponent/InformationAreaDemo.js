import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colorToken, InformationArea } from 'miot/ui/hyperOSUI';
import { CardContainer } from "mhui-rn/dist/hyperOS";

/**
 * InformationArea 组件演示 Demo
 * 展示自定义宽度和智能换行功能
 */
const InformationAreaDemo = () => {
  const onePerRowItems = [
    { title: '0000', subtitle: '描述(单)' }
  ];
  const twoPerRowItems = [
    { title: '0000', subtitle: '描述(单)' },
    { title: '0000', subtitle: '描述(单)' }
  ];
  const threePerRowItems = [
    { title: '0000', subtitle: '描述(单)' },
    { title: '0000', subtitle: '描述(单)' },
    { title: '0000', subtitle: '描述(单)' }
  ];

  return (
    <ScrollView>
      <InformationArea
        items={threePerRowItems}
        align={'left'}
        onSubtitleIconPress={(item, index) => {
          console.log("点击icon:", index);
        }}
      />
      <InformationArea
        items={twoPerRowItems}
        align={'left'}
      />
      <InformationArea
        items={onePerRowItems}
        align={'left'}
      />
      <InformationArea
        items={threePerRowItems}
        align={'center'}
        titleColor={colorToken?.mjcard_color_green_2}
        subtitleColor={colorToken?.mjcard_color_blue_2}
      />
      <InformationArea
        items={twoPerRowItems}
        align={'center'}
        titleColor={colorToken?.mjcard_color_orange_2}
      />
      <View style={{ flexDirection: 'row' }}>

      </View>
      <InformationArea
        items={onePerRowItems}
        align={'center'}
        onSubtitleIconPress={(item, index) => {
          console.log("点击icon:", index);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
});

export default InformationAreaDemo;
