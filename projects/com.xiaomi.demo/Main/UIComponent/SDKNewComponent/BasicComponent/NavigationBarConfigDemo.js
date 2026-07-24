'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationBar, colorToken, TestComponent, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '页面标题', category: 'content' },
  {
    name: 'titleSize',
    type: 'enum',
    defaultValue: 'normal',
    category: 'render',
    enumOptions: ['normal', 'large'],
  },
  { name: 'showBrandLogo', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'colorStrategy',
    type: 'enum',
    defaultValue: 'auto',
    category: 'render',
    enumOptions: ['auto', 'forceDark'],
  },
  {
    name: 'left',
    type: 'pass',
    defaultValue: { key: 'back', onPress: () => showToast('返回') },
    category: 'interaction',
    passOptions: [
      { label: 'back', value: { key: 'back', onPress: () => showToast('返回') } },
      { label: 'cancel', value: { key: 'cancel', onPress: () => showToast('取消') } },
      { label: 'confirm', value: { key: 'confirm', onPress: () => showToast('确认') } },
    ],
  },
  {
    name: 'right',
    type: 'pass',
    category: 'interaction',
    passOptions: [
      { label: 'more', value: { key: 'more', onPress: () => showToast('更多') } },
      { label: 'confirm', value: { key: 'confirm', onPress: () => showToast('确认') } },
    ],
  },
  {
    name: 'onPressTitle',
    type: 'pass',
    category: 'interaction',
    passOptions: [{ label: 'onPressTitle', value: () => showToast('点击标题') }],
  },
];

const NavigationBarConfigDemo = () => (
  <ScrollView style={styles.container}>
    <TestComponent component={NavigationBar} propConfigs={propConfigs} fullWidth/>
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default NavigationBarConfigDemo;
