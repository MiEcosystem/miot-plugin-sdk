'use strict';

import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, Fonts, Stepper, showToast } from "miot/ui/hyperOSUI";
import TestComponent from '../testComponent';
import { Cold } from 'miot/ui/icons';
import NavigationBar from 'miot/ui/NavigationBar';

const StepperDemo = ({ navigation }) => {
  const [targetTemperature, setTargetTemperature] = useState(23);
  const [targetTemperature2, setTargetTemperature2] = useState(50);
  const [longState, setLongState2] = useState(false);

  const changeLongState = useCallback(() => {
    setLongState2((val) => !val);
  }, []);

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('ParamStepperConfigDemo', { title: 'Stepper 配置调试' }) }],
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
          suffixSubscript={<Cold fill={colorToken.accentBlueFill} />}
          value={targetTemperature}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
      </View>
      <Text style={styles.title}>按钮图标可配置</Text>
      <View style={styles.sectionContainer} >
        <Stepper
          step={0.5}
          symbolType="degree"
          suffixSubscript={<Cold fill={colorToken.accentBlueFill} />}
          value={targetTemperature}
          onChange={setTargetTemperature}
          min={20}
          max={30}
          iconType={'leftRight'}
        />
      </View>
      <Text style={styles.title}>中间状态可配置</Text>
      <View style={styles.sectionContainer} >
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
      <View style={styles.sectionContainer} >
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
      <View style={styles.sectionContainer} >
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
      <View style={styles.sectionContainer} >
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
      <View style={styles.sectionContainer} >
        <Stepper
          step={0.5}
          symbolType="degree"
          suffixSubscript={<Cold fill={colorToken.contentTertiaryNormal} />}
          value={targetTemperature}
          disabled={true}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
      </View>
      <Text style={styles.title}>无数据</Text>
      <View style={styles.sectionContainer} >
        <Stepper
          step={0.5}
          value={null}
          disabled={true}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
      </View>
      <View style={{ paddingBottom: 32 }}/>
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
    ...Fonts.fontSystem16Medium,
  },
  title: {
    color: colorToken.accentOsFill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
    ...Fonts.fontSystem13Regular,
  },
  button: {
    fontSize: 14,
    color: colorToken.contentTertiaryNormal,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentSecondaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 10,
    ...Fonts.fontSystem24Medium,
  },
  sectionContainer: {
    backgroundColor: colorToken.surfaceCardPrimary,
    marginHorizontal: 12,
    borderRadius: 16,
  },
  caseContainer: {
    marginBottom: 12,
  },
});

export default StepperDemo;
