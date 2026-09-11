'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationBar, colorToken, TestComponent, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const navIconOptions = [
  { label: 'back', value: { key: 'back', onPress: () => showToast('back') } },
  { label: 'cancel', value: { key: 'cancel', onPress: () => showToast('cancel') } },
  { label: 'confirm', value: { key: 'confirm', onPress: () => showToast('confirm') } },
  { label: 'more', value: { key: 'more', onPress: () => showToast('more') } },
  { label: 'preferences', value: { key: 'preferences', onPress: () => showToast('preferences') } },
  { label: 'preferencesSelected', value: { key: 'preferencesSelected', onPress: () => showToast('preferencesSelected') } },
  { label: 'listcheck', value: { key: 'listcheck', onPress: () => showToast('listcheck') } },
  { label: 'add', value: { key: 'add', onPress: () => showToast('add') } },
  { label: 'info', value: { key: 'info', onPress: () => showToast('info') } },
  { label: 'delete', value: { key: 'delete', onPress: () => showToast('delete') } },
  { label: 'help', value: { key: 'help', onPress: () => showToast('help') } },
  { label: 'search', value: { key: 'search', onPress: () => showToast('search') } },
  { label: 'disabled back', value: { key: 'back', disable: true, onPress: () => showToast('disabled back') } },
  { label: 'disabled more', value: { key: 'more', disable: true, onPress: () => showToast('disabled more') } },
];

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
    passOptions: navIconOptions,
  },
  {
    name: 'right',
    type: 'pass',
    category: 'interaction',
    passOptions: navIconOptions,
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
