'use strict';

import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, Stepper, Separator } from "miot/ui/hyperOSUI";
import { Cold } from 'miot/ui/icons';
import NavigationBar from 'miot/ui/NavigationBar';

const SeparatorDemo = ({ navigation }) => {
  const [targetTemperature, setTargetTemperature] = useState(23);

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('DividerConfigDemo', { title: 'Separator 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>分割线</Text>
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
        <Separator />
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
  caseContainer: {
    marginBottom: 40,
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default SeparatorDemo;
