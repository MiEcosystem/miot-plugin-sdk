'use strict';

import React from 'react';
import { View } from 'react-native';
import { NoticeBar, colorToken, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui';
import { Cold } from 'mhui-rn/dist/icons';

const DEFAULT_TITLE = '这是一条通知消息';
const DEFAULT_ON_PRESS = () => showToast('onPress');
const DEFAULT_ON_CLOSE = () => showToast('onClose');
const NOTICE_ICON = <Cold width={18} height={18} />;

const propConfigs = [
  {
    name: 'title',
    type: 'string',
    defaultValue: DEFAULT_TITLE,
    category: 'content',
  },
  {
    name: 'status',
    type: 'enum',
    enumOptions: ['default', 'emphasis', 'notice', 'warning'],
    defaultValue: 'default',
    category: 'state',
  },
  {
    name: 'actionType',
    type: 'enum',
    enumOptions: ['none', 'navigate', 'close'],
    defaultValue: 'none',
    category: 'state',
  },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
    defaultValue: 'green',
    category: 'state',
  },
  {
    name: 'leadingIcon',
    type: 'pass',
    category: 'render',
    defaultValue: undefined,
    passOptions: [
      { label: '无图标', value: undefined },
      { label: '有图标', value: NOTICE_ICON },
    ],
  },
  {
    name: 'onPress',
    type: 'pass',
    defaultValue: DEFAULT_ON_PRESS,
    category: 'interaction',
    passOptions: [{ label: 'onPress', value: DEFAULT_ON_PRESS }],
  },
  {
    name: 'onClose',
    type: 'pass',
    defaultValue: DEFAULT_ON_CLOSE,
    category: 'interaction',
    passOptions: [{ label: 'onClose', value: DEFAULT_ON_CLOSE }],
  },
];

const NoticeBarDemo = () => (
  <View style={styles.container}>
    <TestComponent component={NoticeBar} propConfigs={propConfigs} showPreviewBg={false}/>
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default NoticeBarDemo;
