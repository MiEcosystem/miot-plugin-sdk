'use strict';

import React, { useState, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, Stepper } from "miot/ui/hyperOSUI";
import { Cold, Celsius, Percent } from 'miot/ui/icons';
import { useCallback } from 'react';

const StepperDemo = ({ navigation }) => {
  const [targetTemperature, setTargetTemperature] = useState(23);
  const [targetTemperature2, setTargetTemperature2] = useState(50);
  const suffixFn = useCallback((disable = false) => {
    return <View>
      <Celsius fill={disable ? colorToken.mj_color_gray_icon_6 : colorToken.mj_color_gray_icon_1} width={8} height={8} />
      <View style={{ height: 3 }}/>
      <Cold fill={disable ? colorToken.mjcard_color_blue_3 : colorToken.mjcard_color_blue_1} width={8} height={8}/>
    </View>;
  }, [colorToken]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>步进器</Text>
      <Text style={styles.title}>L</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>标题</Text>
        <Stepper
          step={0.5}
          suffix={suffixFn()}
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
          suffix={suffixFn()}
          value={targetTemperature}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
      </View>
      <Text style={styles.title}>中间状态可配置</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={0.5}
          suffix={<View style={{ height: 24, justifyContent: 'flex-start' }}><Percent fill={colorToken.mj_color_gray_icon_1} /></View>}
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
          suffix={suffixFn()}
          value={23}
          onChange={setTargetTemperature}
          min={23}
          max={23}
        />
      </View>
      <Text style={styles.title}>禁用</Text>
      <View style={styles.stepperContainer} >
        <Stepper
          step={0.5}
          suffix={suffixFn(true)}
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
    marginLeft: 4,
    fontSize: 16,
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 16,
    paddingTop: 12
  },
  title: {
    fontSize: 14,
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
