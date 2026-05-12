'use strict';

import React, { useState } from 'react';
import { View } from 'react-native';
import { LoadingToast, BlockButton, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui';

const propConfigs = [
  { name: 'message', type: 'string', defaultValue: '加载中...', category: 'content' },
  { name: 'duration', type: 'string', defaultValue: '3000', category: 'state' },
  { name: 'cancelable', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'hasShade', type: 'boolean', defaultValue: true, category: 'state' },
];

const LoadingToastDemo = () => {
  const [visible, setVisible] = useState(false);
  const [toastProps, setToastProps] = useState({});

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setToastProps(props)}
      />
      <LoadingToast
        visible={visible}
        message={toastProps.message || '加载中...'}
        duration={Number(toastProps.duration) || undefined}
        cancelable={toastProps.cancelable !== undefined ? toastProps.cancelable : true}
        hasShade={toastProps.hasShade !== undefined ? toastProps.hasShade : true}
        onDismiss={() => {
          setVisible(false);
          console.log('LoadingToast dismissed');
        }}
        onTimeout={() => {
          setVisible(false);
          console.log('LoadingToast timeout');
        }}
      />
      <View style={styles.buttonWrapper}>
        <BlockButton title="显示加载" type="primary" onPress={() => setVisible(true)} />
      </View>
    </View>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  buttonWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
});

export default LoadingToastDemo;
