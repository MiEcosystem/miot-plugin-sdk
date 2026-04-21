'use strict';

import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, Stepper, Separator, TestComponent } from "miot/ui/hyperOSUI";
import { Cold } from 'miot/ui/icons';

const SeparatorDemo = ({ navigation }) => {
  const [targetTemperature, setTargetTemperature] = useState(23);

  const propConfigs = [
    { 
      name: 'style',
      type: 'object',
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>分割线</Text>
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
        <Separator/>
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
      <View style={styles.sectionContainer}>
        <Stepper
          step={0.5}
          symbolType="degree"
          suffixSubscript={<Cold fill={colorToken.accentBlueFill} />}
          value={targetTemperature}
          onChange={setTargetTemperature}
          min={20}
          max={30}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <Separator/>
        </View>
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
      <View style={styles.caseContainer}>
        <Text style={[styles.header, { marginTop: 12 }]}>Separator - 分割线</Text>
        <TestComponent component={Separator} propConfigs={propConfigs}/>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.surfacePageLow,
  },
  text: {
    fontSize: 16,
    color: colorToken.contentPrimaryNormal,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentSecondaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionContainer: {
    backgroundColor: colorToken.surfaceCardPrimary,
    marginHorizontal: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  separator1: {
    marginHorizontal: 4,
    marginVertical: 20,
  },
  separator2: {
    marginHorizontal: 88,
    marginVertical: 16,
  },
  caseContainer: {
    marginBottom: 40,
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SeparatorDemo;
