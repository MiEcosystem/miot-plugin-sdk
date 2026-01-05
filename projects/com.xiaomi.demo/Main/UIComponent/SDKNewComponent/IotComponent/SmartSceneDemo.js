'use strict';

import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "miot/ui/hyperOSUI";
import { SmartSceneCard } from 'miot/ui/smartSceneCard';

const SmartSceneDemo = ({ navigation }) => {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>智能场景</Text>
      <View style={styles.content}>
        <SmartSceneCard />
      </View>
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
    marginBottom: 20
  },
  content: {
    paddingHorizontal: 12
  }
});

export default SmartSceneDemo;
