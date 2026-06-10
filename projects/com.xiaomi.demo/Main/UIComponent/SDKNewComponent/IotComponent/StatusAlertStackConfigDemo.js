'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { StatusAlertStack, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

const alertsData = [
  { title: '提示信息 1', warning: false, leadingIconType: 'reminder', actionType: 'navigate', presentation: 'page' },
  { title: '提示信息 2', warning: true, leadingIconType: 'fault', actionType: 'none', presentation: 'page' },
  { title: '提示信息 3', warning: false, leadingIconType: 'consumable', actionType: 'none', presentation: 'page' },
];

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '状态提示', category: 'content' },
  {
    name: 'alerts',
    type: 'pass',
    defaultValue: alertsData,
    category: 'content',
    passOptions: [
      {
        label: '3条提示',
        value: alertsData,
      },
      {
        label: '1条提示',
        value: [{ title: '单条提示信息', warning: false, leadingIconType: 'reminder', actionType: 'navigate' }],
      },
      {
        label: '2条提示',
        value: [
          { title: '提示信息 1', warning: false, leadingIconType: 'reminder', actionType: 'navigate' },
          { title: '提示信息 2', warning: true, leadingIconType: 'fault', actionType: 'none' },
        ],
      },
    ],
  },
  {
    name: 'onPress',
    type: 'pass',
    defaultValue: () => showToast('onPress'),
    category: 'interaction',
    passOptions: [{ label: 'onPress', value: () => showToast('onPress') }],
  },
];

const StatusAlertStackConfigDemo = () => (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
    <TestComponent component={StatusAlertStack} propConfigs={propConfigs} />
  </ScrollView>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default StatusAlertStackConfigDemo;
