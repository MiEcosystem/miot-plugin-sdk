'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { colorToken, ListCard, ListItem } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from "miot/ui";
import withDarkModeSupport from "./SDKNewComponent/adaptiveThemeComponent";

const SdkComponentDemo = (props) => {
  const { navigation } = props;

  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ListCard title="">
        <ListItem title="token" onPress={() => navigateToScreen('BasicDemo', 'token')} />
        <ListItem title="BaseComponents" onPress={() => navigateToScreen('BasicComponentDemo', 'BaseComponents')} />
        <ListItem title="IoTComponents" onPress={() => navigateToScreen('IotComponentDemo', 'IoTComponents')} />
        {/* <ListItem title="FeatureComponents" onPress={() => navigateToScreen('FeatureComponentDemo', 'FeatureComponents')} /> */}
        {/* <ListItem title="PageLayout" onPress={() => navigateToScreen('LayoutDemo', 'Layout')} /> */}
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

export default withDarkModeSupport(SdkComponentDemo);
