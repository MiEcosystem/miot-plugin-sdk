'use strict';

import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { CardContainer, colorToken, Fonts, SliderWithToggle, TestComponent } from 'miot/ui/hyperOSUI';
import NavigationBar from 'miot/ui/NavigationBar';

const noop = () => {};

const defaultSliderProps = {
  value: 50,
  min: 0,
  max: 100,
  step: 1,
  color: 'blue',
  onChange: noop,
  onAfterChange: noop,
};

const defaultButtonProps = {
  value: true,
  colorType: 'blue',
  onValueChange: noop,
};

const propConfigs = [
  { name: 'spacing', type: 'number', defaultValue: 8, category: 'content' },
  {
    name: 'sliderProps',
    type: 'object',
    objectProps: [
      { name: 'value', type: 'number', defaultValue: 50 },
      { name: 'min', type: 'number', defaultValue: 0 },
      { name: 'max', type: 'number', defaultValue: 100 },
      { name: 'step', type: 'number', defaultValue: 1 },
      { name: 'disabled', type: 'boolean', defaultValue: false },
      { name: 'active', type: 'boolean', defaultValue: true },
      { name: 'discrete', type: 'boolean', defaultValue: false },
      {
        name: 'color',
        type: 'enum',
        enumOptions: ['blue', 'green', 'orange', 'purple', 'wathet'],
        defaultValue: 'blue',
      },
    ],
  },
  {
    name: 'buttonProps',
    type: 'object',
    objectProps: [
      { name: 'value', type: 'boolean', defaultValue: true },
      { name: 'disabled', type: 'boolean', defaultValue: false },
      {
        name: 'colorType',
        type: 'enum',
        enumOptions: ['blue', 'green', 'orange', 'purple', 'wathet'],
        defaultValue: 'blue',
      },
    ],
  },
];

const SliderWithToggleDemo = ({ navigation }) => {
  const [lightOn, setLightOn] = useState(true);
  const [lightDisabled, setLightDisabled] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const [fanDisabled, setFanDisabled] = useState(true);
  const [active, setActive] = useState(true);
  const [continuousValue, setContinuousValue] = useState(50);
  const [discreteValue, setDiscreteValue] = useState(2);

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('IotSliderWithToggleConfigDemo', { title: 'SliderWithToggle 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>滑条 + 开关</Text>

      <Text style={styles.sectionTitle}>无极滑条</Text>
      <CardContainer gap={12}>
        <Text style={styles.label}>仅滑条（蓝色）</Text>
        <View style={styles.sliderWrap}>
          <SliderWithToggle
            sliderProps={{
              value: continuousValue,
              min: 0,
              max: 100,
              active,
              color: 'blue',
              onChange: setContinuousValue,
              onAfterChange: noop,
            }}
          />
        </View>
      </CardContainer>

      <CardContainer gap={12}>
        <Text style={styles.label}>右侧带开关（开 → 可拖动）</Text>
        <View style={styles.sliderWrap}>
          <SliderWithToggle
            sliderProps={{
              value: 60,
              min: 0,
              max: 100,
              active,
              disabled: lightDisabled,
              color: 'orange',
              onAfterChange: noop,
            }}
            buttonProps={{
              value: lightOn,
              colorType: 'orange',
              onValueChange: (val) => { setLightOn(val); setLightDisabled(!val); },
            }}
          />
        </View>
      </CardContainer>

      <CardContainer gap={12}>
        <Text style={styles.label}>右侧带开关（关 → 禁用）</Text>
        <View style={styles.sliderWrap}>
          <SliderWithToggle
            sliderProps={{
              value: 30,
              min: 0,
              max: 100,
              active,
              disabled: fanDisabled,
              color: 'green',
              onAfterChange: noop,
            }}
            buttonProps={{
              value: fanOn,
              colorType: 'green',
              onValueChange: (val) => { setFanOn(val); setFanDisabled(!val); },
            }}
          />
        </View>
      </CardContainer>

      <Text style={styles.sectionTitle}>离散滑条</Text>
      <CardContainer gap={12}>
        <Text style={styles.label}>3 等分</Text>
        <View style={styles.sliderWrap}>
          <SliderWithToggle
            sliderProps={{
              value: discreteValue,
              min: 0,
              max: 3,
              step: 1,
              discrete: true,
              active,
              color: 'blue',
              onChange: setDiscreteValue,
              onAfterChange: noop,
            }}
          />
        </View>
      </CardContainer>

      <CardContainer gap={12}>
        <Text style={styles.label}>5 等分 + 开关（紫色）</Text>
        <View style={styles.sliderWrap}>
          <SliderWithToggle
            sliderProps={{
              value: 2,
              min: 0,
              max: 5,
              step: 1,
              discrete: true,
              active,
              color: 'purple',
              onAfterChange: noop,
            }}
            buttonProps={{
              value: true,
              colorType: 'purple',
              onValueChange: noop,
            }}
          />
        </View>
      </CardContainer>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentSecondaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 10,
    ...Fonts.mj_text_custom_24_M,
  },
  sectionTitle: {
    color: colorToken.accentOsFill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
    ...Fonts.mj_text_custom_13_R,
  },
  label: {
    color: colorToken.contentPrimaryNormal,
    paddingHorizontal: 16,
    paddingTop: 12,
    ...Fonts.mj_text_custom_16_M,
  },
  sliderWrap: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  caseContainer: {
    marginBottom: 12,
  },
});

export default SliderWithToggleDemo;
