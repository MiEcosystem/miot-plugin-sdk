'use strict';

import React from 'react';
import { ScrollView, Text } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "miot/ui/hyperOSUI";

const UIItems = [
  { title: 'LargeListEntrance 大型入口', router: 'LargeEntranceDemo' },
  { title: 'LargeListToggle 大型开关', router: 'LargeVariantSwitchDemo' },
  { title: 'Stepper 步进器', router: 'StepperDemo' },
  { title: 'Separator 分割线', router: 'SeparatorDemo' },
];

const IotComponentDemo = ({ navigation }) => {
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>IoT 组件</Text>
      {UIItems.map((item) => (
        <Text key={item.router} style={styles.item} onPress={() => navigateToScreen(item.router, item.title)}>
          {item.title}
        </Text>
      ))}
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

export default IotComponentDemo;
