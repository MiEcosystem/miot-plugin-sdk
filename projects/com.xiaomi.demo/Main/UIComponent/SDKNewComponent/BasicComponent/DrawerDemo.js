'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Drawer, BlockButton, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui';

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '抽屉标题', category: 'content' },
  {
    name: 'type',
    type: 'enum',
    enumOptions: ['elastic', 'fixed'],
    defaultValue: 'elastic',
    category: 'state',
  },
  {
    name: 'colorDepth',
    type: 'enum',
    enumOptions: ['base', 'low'],
    defaultValue: 'low',
    category: 'state',
  },
  {
    name: 'heightLevel',
    type: 'enum',
    enumOptions: ['high', 'medium'],
    defaultValue: 'medium',
    category: 'state',
  },
  {
    name: 'leftIconType',
    type: 'enum',
    enumOptions: ['cancel', 'back', 'confirm'],
    defaultValue: 'cancel',
    category: 'state',
  },
  {
    name: 'rightIconType',
    type: 'pass',
    category: 'state',
    defaultValue: undefined,
    passOptions: [
      { label: '无', value: undefined },
      { label: 'more', value: 'more' },
      { label: 'confirm', value: 'confirm' },
    ],
  },
];

const DrawerDemo = () => {
  const [visible, setVisible] = useState(false);
  const [drawerProps, setDrawerProps] = useState({});

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setDrawerProps(props)}
      />
      <Drawer
        {...drawerProps}
        visible={visible}
        onClose={() => setVisible(false)}
        onLeftPress={() => setVisible(false)}
      >
        <ScrollView style={styles.drawerContent}>
          {Array.from({ length: 10 }, (_, i) => (
            <View key={i} style={styles.contentItem}>
              <Text style={styles.contentText}>列表项 {i + 1}</Text>
            </View>
          ))}
        </ScrollView>
      </Drawer>
      <View style={styles.buttonWrapper}>
        <BlockButton title="打开抽屉" type="primary" onPress={() => setVisible(true)} />
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
  drawerContent: {
    flexShrink: 1,
    paddingHorizontal: 24,
  },
  contentItem: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colorToken.dividerPrimary,
  },
  contentText: {
    fontSize: 16,
    color: colorToken.contentPrimaryNormal,
  },
});

export default DrawerDemo;
