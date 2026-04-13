'use strict';

import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { CardContainer, colorToken, Fonts, Slider, TestComponent } from 'miot/ui/hyperOSUI';
import NavigationBar from 'miot/ui/NavigationBar';

const noop = () => {};

const propConfigs = [
  { name: 'value', type: 'number', defaultValue: 50, category: 'content' },
  { name: 'min', type: 'number', defaultValue: 0, category: 'content' },
  { name: 'max', type: 'number', defaultValue: 100, category: 'content' },
  { name: 'step', type: 'number', defaultValue: 1, category: 'content' },
  { name: 'height', type: 'number', defaultValue: 28, category: 'content' },
  { name: 'disabled', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'active', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'discrete', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'pattern', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'showLabel', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'isPercent', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'color',
    type: 'enum',
    enumOptions: ['blue', 'green', 'orange', 'purple', 'wathet'],
    defaultValue: 'blue',
    category: 'state',
  },
  {
    name: 'onChange',
    type: 'pass',
    defaultValue: noop,
    category: 'interaction',
    linkTo: { targetProp: 'value', pick: (...args) => args[0] },
  },
  { name: 'onAfterChange', type: 'pass', defaultValue: noop, category: 'interaction' },
];

const SliderDemo = ({ navigation }) => {
  const [value1, setValue1] = useState(50);
  const [value2, setValue2] = useState(30);
  const [value3, setValue3] = useState(2);
  const [value4, setValue4] = useState(60);

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('IotSliderConfigDemo', { title: 'Slider 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>滑条</Text>

      <Text style={styles.sectionTitle}>无极滑条</Text>
      <CardContainer gap={12}>
        <Text style={styles.label}>默认（蓝色）</Text>
        <View style={styles.sliderWrap}>
          <Slider value={value1} min={0} max={100} active onChange={setValue1} onAfterChange={noop} />
        </View>
      </CardContainer>

      <CardContainer gap={12}>
        <Text style={styles.label}>绿色 / showLabel</Text>
        <View style={styles.sliderWrap}>
          <Slider value={value2} min={0} max={100} active color="green" showLabel onChange={setValue2} onAfterChange={noop} />
        </View>
      </CardContainer>

      <CardContainer gap={12}>
        <Text style={styles.label}>橙色 / isPercent</Text>
        <View style={styles.sliderWrap}>
          <Slider value={value4} min={0} max={100} active color="orange" isPercent showLabel onChange={setValue4} onAfterChange={noop} />
        </View>
      </CardContainer>

      <CardContainer gap={12}>
        <Text style={styles.label}>禁用态</Text>
        <View style={styles.sliderWrap}>
          <Slider value={40} min={0} max={100} disabled active={false} onAfterChange={noop} />
        </View>
      </CardContainer>

      <Text style={styles.sectionTitle}>离散滑条</Text>
      <CardContainer gap={12}>
        <Text style={styles.label}>3 等分</Text>
        <View style={styles.sliderWrap}>
          <Slider value={value3} min={0} max={3} step={1} discrete active onChange={setValue3} onAfterChange={noop} />
        </View>
      </CardContainer>

      <CardContainer gap={12}>
        <Text style={styles.label}>5 等分 / 紫色</Text>
        <View style={styles.sliderWrap}>
          <Slider value={2} min={0} max={5} step={1} pattern={true} showLabel discrete active color="purple" onAfterChange={noop} />
        </View>
      </CardContainer>

      <Text style={styles.sectionTitle}>pattern 纹理</Text>
      <CardContainer gap={12}>
        <Text style={styles.label}>pattern + 无极</Text>
        <View style={styles.sliderWrap}>
          <Slider value={70} min={0} max={100} active pattern onAfterChange={noop} />
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

export default SliderDemo;
