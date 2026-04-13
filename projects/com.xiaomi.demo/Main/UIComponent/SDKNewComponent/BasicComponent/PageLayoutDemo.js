'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { colorToken, ListCard, ListItem } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

const PageLayoutDemo = (props) => {
  const { navigation } = props;
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ListCard title="">
        <ListItem title="布局1" onPress={() => navigateToScreen('', '布局1')} />
        <ListItem title="布局2" onPress={() => navigateToScreen('', '布局2')} />
        <ListItem title="布局3" onPress={() => navigateToScreen('', '布局3')} />
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

export default PageLayoutDemo;
