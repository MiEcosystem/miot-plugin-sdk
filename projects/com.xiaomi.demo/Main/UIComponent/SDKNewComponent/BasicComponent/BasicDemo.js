'use strict';

import React from 'react';
import { ScrollView, Text } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "miot/ui/hyperOSUI";
import { ListItem } from "miot/ui/ListItem";
import withDarkModeSupport from "../adaptiveThemeComponent";

const BasicDemo = (props) => {
  const { navigation } = props;
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  };
  const tokenItems = [
    { title: '颜色', router: 'ColorDemo' },
    { title: '字体', router: 'FontsDemo' },
    { title: '圆角', router: 'RadiusDemo' },
    { title: '间距', router: 'SpacingDemo' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>基础库</Text>
      {tokenItems.map((item) => (
        <ListItem
          key={item.router}
          title={item.title}
          onPress={() => navigateToScreen(item.router, item.title)}
        />
      ))}
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.surfacePageLow,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentSecondaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginVertical: 20,
  },
});

export default withDarkModeSupport(BasicDemo);
