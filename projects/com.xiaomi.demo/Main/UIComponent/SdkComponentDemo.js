'use strict';

import React from 'react';
import { ScrollView, Text } from 'react-native';
import { colorToken } from 'miot/ui/hyperOSUI';
import { ListItem } from 'miot/ui/ListItem';
import { dynamicStyleSheet } from "miot/ui";
import withDarkModeSupport from "./SDKNewComponent/adaptiveThemeComponent";

const projectItems = [
  { title: '基础库', router: 'BasicDemo' },
  { title: '基础组件库', router: 'BasicComponentDemo' },
  { title: 'IoT组件库', router: 'IotComponentDemo' },
];

const SdkComponentDemo = (props) => {
  const { navigation } = props;

  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>标插SDK组件库</Text>
      {projectItems.map((item) => (
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

export default withDarkModeSupport(SdkComponentDemo);
