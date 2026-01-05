'use strict';

import React, { useState, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, Stepper } from "miot/ui/hyperOSUI";

import { Cold, Right, Left } from 'miot/ui/icons';

const StepperDemo = ({ navigation }) => {
  const [targetTemperature, setTargetTemperature] = useState(23);
  const [targetTemperature2, setTargetTemperature2] = useState(50);
  const suffix = useMemo(() => {
    return <View>
      <Text style={{ color: colorToken.mj_color_gray_text_4 }}>{'°'}</Text>
      <Cold fill={colorToken.mjcard_color_blue_1} width={8} height={8}/>
    </View>;
  }, [colorToken.mj_color_gray_text_4, colorToken.mjcard_color_blue_1]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>步进器</Text>
      <Text style={styles.title}>L</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>标题</Text>
        <Stepper
          step={0.5}
          suffix={suffix}
          value={targetTemperature}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
      </View>
      <Text style={styles.title}>按钮图标可配置</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={0.5}
          suffix={suffix}
          value={targetTemperature}
          onChange={setTargetTemperature}
          min={20}
          max={30}
          MinusRenderIcon={Left}
          PlusRenderIcon={Right}
        />
      </View>
     
      <Text style={styles.title}>中间状态可配置</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={0.5}
          suffix={<Text style={{ color: colorToken.mj_color_gray_text_4 }}>{'%'}</Text>}
          value={targetTemperature2}
          onChange={setTargetTemperature2}
          min={0}
          max={100}
        />
      </View>
     
      <Text style={styles.title}>禁用</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={0.5}
          suffix={suffix}
          value={targetTemperature}
          disabledMinus={true}
          disabledPlus={true}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
      </View>
     
      <Text style={styles.title}>禁用</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={0.5}
          suffix={suffix}
          value={targetTemperature}
          disabled={true}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
      </View>
      
      <Text style={styles.title}>空态</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={0.5}
          value={null}
          disabled={true}
          emptyValue="--"
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
  title: {
    color: colorToken.mjcard_color_miui_1,
    paddingHorizontal: 16,
    paddingVertical: 6
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_2,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  sectionContainer: {
    backgroundColor: colorToken.mj_color_gray_bg_1,
    marginHorizontal: 12,
    borderRadius: 16,
    marginBottom: 12
  },
  stepperContainer: {
    backgroundColor: colorToken.mj_color_gray_bg_1,
    marginHorizontal: 12
  }
});

export default StepperDemo;
