'use strict';

import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { colorToken, ListCard, ListItem } from 'miot/ui/hyperOSUI';

const LayoutDemo = ({ navigation }) => {
  const navigateToScreen = useCallback((routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  }, [navigation]);

  const layoutItems = [
    { title: 'PageLayout', router: 'PageLayoutDemo' },
    { title: 'SubpageLayout', router: 'SubpageLayoutDemo' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ListCard title="布局组件">
        {layoutItems.map((item) => (
          <ListItem key={item.router} title={item.title} onPress={() => navigateToScreen(item.router, item.title)} />
        ))}
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

export default LayoutDemo;
