'use strict';

import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, Stepper, Separator } from "miot/ui/hyperOSUI";
import { Cold } from 'miot/ui/icons';

const SeparatorDemo = ({ navigation }) => {
  const [targetTemperature, setTargetTemperature] = useState(23);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>分割线</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>标题</Text>
        <Stepper
          step={0.5}
          symbolType="celsius"
          suffix={<Cold fill={colorToken.mjcard_color_blue_1} />}
          value={targetTemperature}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
        <Separator style={styles.separator1} />
        <Stepper
          step={0.5}
          symbolType="celsius"
          suffix={<Cold fill={colorToken.mjcard_color_blue_1} />}
          value={targetTemperature}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Stepper
          step={0.5}
          symbolType="celsius"
          suffix={<Cold fill={colorToken.mjcard_color_blue_1} />}
          value={targetTemperature}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
        <Separator style={styles.separator2}/>
        <Stepper
          step={0.5}
          symbolType="celsius"
          suffix={<Cold fill={colorToken.mjcard_color_blue_1} />}
          value={targetTemperature}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2
  },
  text: {
    fontSize: 16,
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 16,
    paddingTop: 12
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_2,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  sectionContainer: {
    backgroundColor: colorToken.mj_color_gray_card_1,
    marginHorizontal: 12,
    borderRadius: 16,
    marginBottom: 12
  },
  separator1: {
    marginHorizontal: 4,
    marginVertical: 20
  },
  separator2: {
    marginHorizontal: 88,
    marginVertical: 16
  }
});

export default SeparatorDemo;
