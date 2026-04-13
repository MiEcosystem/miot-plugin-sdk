'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "miot/ui/hyperOSUI";
import withDarkModeSupport from "../adaptiveThemeComponent";
import { ListCard, ListItem } from "mhui-rn/dist/hyperOS";

const BasicDemo = (props) => {
  const { navigation } = props;
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ListCard title="">
        <ListItem title="color" onPress={() => navigateToScreen('ColorDemo', 'color')} />
        <ListItem title="font" onPress={() => navigateToScreen('FontsDemo', 'font')} />
        <ListItem title="radius" onPress={() => navigateToScreen('RadiusDemo', 'radius')} />
        <ListItem title="spacing" onPress={() => navigateToScreen('SpacingDemo', 'spacing')} />
      </ListCard>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 28,
  },
});

export default withDarkModeSupport(BasicDemo);
