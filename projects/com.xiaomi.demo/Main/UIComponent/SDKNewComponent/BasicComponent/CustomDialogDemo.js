'use strict';

import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { CustomDialog, BlockButton, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui';

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '自定义弹窗', category: 'content' },
  {
    name: 'colorDepth',
    type: 'enum',
    enumOptions: ['base', 'low'],
    defaultValue: 'base',
    category: 'state',
  },
  { name: 'canDismiss', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'hasShade', type: 'boolean', defaultValue: true, category: 'state' },
];

const CustomDialogDemo = () => {
  const [visible, setVisible] = useState(false);
  const [dialogProps, setDialogProps] = useState({});

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setDialogProps(props)}
      />
      <CustomDialog
        {...dialogProps}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        <View style={styles.customContent}>
          <Text style={styles.customText}>这里是自定义内容区域</Text>
          <Text style={styles.customText}>可以放置任意 React 组件</Text>
          <View style={styles.placeholder} />
        </View>
      </CustomDialog>
      <View style={styles.buttonWrapper}>
        <BlockButton title="显示自定义弹窗" type="primary" onPress={() => setVisible(true)} />
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
  customContent: {
    padding: 20,
    alignItems: 'center',
  },
  customText: {
    fontSize: 16,
    color: colorToken.contentSecondaryNormal,
    marginBottom: 8,
  },
  placeholder: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: colorToken.fillTertiary,
    marginTop: 12,
  },
});

export default CustomDialogDemo;
