'use strict';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

const entries = [
  { key: 'MenusDemo', title: 'Menus 配置调试' },
  { key: 'MenusPositionDemo', title: 'Menus 位置演示' },
];

const MenusEntryDemo = ({ navigation }) => (
  <View style={styles.container}>
    {entries.map(({ key, title }) => (
      <TouchableOpacity
        key={key}
        style={styles.item}
        onPress={() => navigation.navigate(key, { title })}
      >
        <Text style={styles.itemText}>{title}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
    padding: 16,
  },
  item: {
    backgroundColor: colorToken.surfaceCardPrimary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
    color: colorToken.contentPrimaryNormal,
  },
});

export default MenusEntryDemo;
