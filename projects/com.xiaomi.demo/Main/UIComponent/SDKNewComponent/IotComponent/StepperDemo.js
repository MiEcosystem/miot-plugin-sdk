'use strict';

import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, View, Alert } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, Fonts, Stepper, TestComponent } from "miot/ui/hyperOSUI";
import { Cold } from 'miot/ui/icons';
import NavigationBar from 'miot/ui/NavigationBar';

const alert = Alert.alert;
const StepperDemo = ({ navigation }) => {
  const [targetTemperature, setTargetTemperature] = useState(23);
  const [targetTemperature2, setTargetTemperature2] = useState(50);
  const [longState, setLongState2] = useState(false);

  const changeLongState = useCallback(() => {
    setLongState2((val) => !val);
  }, []);

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('ParamStepperConfigDemo', { title: 'ParamStepper 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>步进器</Text>
      <Text style={styles.button} onPress={changeLongState}>切换长文本</Text>
      <Text style={styles.title}>L</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>标题</Text>
        <Stepper
          step={0.5}
          symbolType="degree"
          suffix={<Cold fill={colorToken.accentBlueFill} />}
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
          symbolType="degree"
          suffix={<Cold fill={colorToken.accentBlueFill} />}
          value={targetTemperature}
          onChange={setTargetTemperature}
          min={20}
          max={30}
          iconType={'leftRight'}
        />
      </View>
      <Text style={styles.title}>中间状态可配置</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={1}
          symbolType="percent"
          value={targetTemperature2}
          onChange={setTargetTemperature2}
          min={0}
          max={100}
        />
      </View>
      <Text style={styles.title}>中间状态纯文本</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={0.5}
          symbolType="degree"
          suffix={<Cold fill={colorToken.accentBlueFill} />}
          value={23}
          onChange={setTargetTemperature}
          closed={true}
        />
      </View>
      <Text style={styles.title}>禁用（关）</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={0.5}
          symbolType="degree"
          suffix={<Cold fill={colorToken.contentDisabledPrimary} />}
          value={targetTemperature}
          disabled={true}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
      </View>
      <Text style={styles.title}>无数据</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={0.5}
          value={null}
          disabled={true}
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
    backgroundColor: colorToken.surfacePageLow,
  },
  text: {
    marginLeft: 4,
    color: colorToken.contentPrimaryNormal,
    paddingHorizontal: 16,
    paddingTop: 12,
    lineHeight: 32,
    ...Fonts.mj_text_custom_16_M,
  },
  title: {
    color: colorToken.accentOsFill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
    ...Fonts.mj_text_custom_13_R,
  },
  button: {
    fontSize: 14,
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentSecondaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 10,
    ...Fonts.mj_text_custom_24_M,
  },
  sectionContainer: {
    backgroundColor: colorToken.surfaceCardPrimary,
    marginHorizontal: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  stepperContainer: {
    backgroundColor: colorToken.surfaceCardPrimary,
    marginHorizontal: 12,
  },
  caseContainer: {
    marginBottom: 12,
  },
});

export default StepperDemo;
