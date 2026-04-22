'use strict';

import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "miot/ui/hyperOSUI";

const BasicComponentDemo = (props) => {
  const { navigation } = props;
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  };

  const componentItems = [
    { title: 'Switch 开关', router: 'AtomicDemo' },
  ];

  // const tokenItems = [
  //   { title: 'Color 色值', router: 'ColorDemo' },
  //   { title: 'Fonts 字体', router: 'FontsDemo' },
  //   { title: 'Radius 圆角', router: 'RadiusDemo' },
  // ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>基础组件</Text>
      <Text style={styles.sectionTitle}>组件</Text>
      {componentItems.map((item) => (
        <Text key={item.router} style={styles.item} onPress={() => navigateToScreen(item.router, item.title)}>
          {item.title}
        </Text>
      ))}
      {/* <Text style={styles.sectionTitle}>Token</Text>
      {tokenItems.map((item) => (
        <Text key={item.router} style={styles.item} onPress={() => navigateToScreen(item.router, item.title)}>
          {item.title}
        </Text>
      ))} */}
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentSecondaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: colorToken.accentOsFill,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  item: {
    fontSize: 16,
    color: colorToken.contentPrimaryNormal,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colorToken.surfaceCardPrimary,
    borderBottomWidth: 0.5,
    borderBottomColor: colorToken.dividerPrimary,
  },
});

export default BasicComponentDemo;
