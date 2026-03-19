'use strict';

import React, { useState } from 'react';
import { ScrollView, Text, View, Alert } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, Fonts, Stepper, TestComponent } from "miot/ui/hyperOSUI";
import { Cold, Percent } from 'miot/ui/icons';
import { useCallback } from 'react';

const propConfigs = [
  { name: 'value', type: 'number', defaultValue: 0 },
  { name: 'onChange', type: 'pass', passDescription: '值变化回调 (value: string | null) => void', linkTo: { targetProp: 'value' } },
  { name: 'step', type: 'number', defaultValue: 1 },
  { name: 'stringMode', type: 'boolean', defaultValue: true },
  { name: 'digits', type: 'number', defaultValue: 2 },
  { name: 'min', type: 'number', defaultValue: 0 },
  { name: 'max', type: 'number', defaultValue: 999.99 },
  // eslint-disable-next-line no-template-curly-in-string
  { name: 'formatter', type: 'pass', passDescription: '格式化函数: (value?: string) => string，如: (v) => `${v}kg`', defaultValue: () => ('频道1') },
  { name: 'prefix', type: 'pass', passDescription: '可选: React.ReactNode', defaultValue: <Cold fill={colorToken.mjcard_color_blue_1} /> },
  { name: 'suffix', type: 'pass', passDescription: '可选: React.ReactNode', defaultValue: <Percent fill={colorToken.mjcard_color_blue_1} /> },
  { name: 'iconType', type: 'enum', enumOptions: ['symbol', 'direction'], defaultValue: 'symbol' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'symbolType', type: 'enum', enumOptions: ['percent', 'celsius', 'custom'], defaultValue: 'custom' },
];

const alert = Alert.alert;
const StepperDemo = ({ navigation }) => {
  const [targetTemperature, setTargetTemperature] = useState(23);
  const [targetTemperature2, setTargetTemperature2] = useState(50);
  const [longState, setLongState2] = useState(false);

  const changeLongState = useCallback(() => {
    setLongState2((val) => !val);
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
          symbolType="celsius"
          suffix={<Cold fill={colorToken.mjcard_color_blue_1} />}
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
          symbolType="celsius"
          suffix={<Cold fill={colorToken.mjcard_color_blue_1} />}
          value={targetTemperature}
          onChange={setTargetTemperature}
          min={20}
          max={30}
          iconType={'direction'}
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
          step={1}
          symbolType="custom"
          formatter={() => longState ? '一二三四五六七一二三四五六七一二三四五六七一二三四五六七一二三四五六七' : '一二三四五六七'}
          value={targetTemperature2}
          onChange={setTargetTemperature2}
          min={0}
          max={100}
        />
      </View>
      <Text style={styles.title}>中间状态英文</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={1}
          symbolType="custom"
          formatter={() => longState ? 'Channel AChannel AChannel AChannel AChannel AChannel A' : 'Channel A'}
          value={targetTemperature2}
          onChange={setTargetTemperature2}
          min={0}
          max={100}
        />
      </View>
      <Text style={styles.title}>中间状态小语种</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={1}
          symbolType="custom"
          formatter={() => longState ? 'واحد اثنان ثلاثة تةواحد اثنان ثلاثة تةواحد اثنان ثلاثة تةواحد اثنان ثلاثة تة' : 'واحد اثنان ثلاثة تة'}
          value={targetTemperature2}
          onChange={setTargetTemperature2}
          min={0}
          max={100}
        />
      </View>
      <Text style={styles.title}>禁用（关）</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={0.5}
          symbolType="celsius"
          suffix={<Cold fill={colorToken.mj_color_gray_icon_6} />}
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
      <View style={styles.caseContainer}>
        <Text style={[styles.header, { marginTop: 12 }]}>Stepper - 步进器</Text>
        <TestComponent component={Stepper} propConfigs={propConfigs}/>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2,
  },
  text: {
    marginLeft: 4,
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 16,
    paddingTop: 12,
    lineHeight: 32,
    ...Fonts.mj_text_custom_16_M,
  },
  title: {
    color: colorToken.mjcard_color_miui_1,
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
    color: colorToken.mj_color_gray_text_2,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 10,
    ...Fonts.mj_text_custom_24_M,
  },
  sectionContainer: {
    backgroundColor: colorToken.mj_color_gray_card_1,
    marginHorizontal: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  stepperContainer: {
    backgroundColor: colorToken.mj_color_gray_card_1,
    marginHorizontal: 12,
  },
  caseContainer: {
    marginBottom: 12,
  },
});

export default StepperDemo;
