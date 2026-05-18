'use strict';

import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import { NoticeBar, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui';
import { Cold } from 'mhui-rn/dist/icons';

const SHORT_TITLE = '这是一条通知消息';
const LONG_TITLE = '这是一条很长很长的通知消息，用来测试文字溢出时的 3 行省略效果，超过 3 行会以省略号结尾，超过 3 行会以省略号结尾';

const buildPropConfigs = (currentStatus) => [
  {
    name: 'title',
    type: 'enum',
    enumOptions: ['短文本', '长文本（测 3 行省略）'],
    defaultValue: '短文本',
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
  ...(currentStatus === 'emphasis'
    ? [
        {
          name: 'colorType',
          type: 'enum',
          enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'],
          defaultValue: 'green',
          category: 'state',
        },
      ]
    : []),
  {
    name: 'leadingIcon',
    type: 'pass',
    category: 'render',
    defaultValue: undefined,
    passOptions: [
      { label: '无图标', value: undefined },
      { label: '有图标', value: 'icon' },
    ],
  },
];

const NoticeBarDemo = () => {
  const [barProps, setBarProps] = useState({});

  const leadingIcon = barProps.leadingIcon === 'icon' ? <Cold width={18} height={18} /> : undefined;
  const title = barProps.title === '长文本（测 3 行省略）' ? LONG_TITLE : SHORT_TITLE;
  const status = barProps.status || 'default';

  const propConfigs = useMemo(() => buildPropConfigs(status), [status]);

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setBarProps(props)}
      />
      <View style={styles.previewWrapper}>
        <NoticeBar
          title={title}
          status={status}
          actionType={barProps.actionType || 'none'}
          colorType={barProps.colorType || 'green'}
          leadingIcon={leadingIcon}
          onPress={() => console.log('点击导航')}
          onClose={() => console.log('关闭通知')}
        />
      </View>
    </View>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  previewWrapper: {
    paddingVertical: 24,
  },
});

export default NoticeBarDemo;
