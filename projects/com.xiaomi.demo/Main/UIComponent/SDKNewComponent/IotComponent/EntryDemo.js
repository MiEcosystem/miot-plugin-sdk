'use strict';

import React, { useCallback } from 'react';
import { ScrollView, Text } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, ListCard, ListItem } from "miot/ui/hyperOSUI";

const UIItems = [
  { title: 'L', router: 'LargeEntranceDemo' },
  // { title: 'M', router: 'EntryMDemo' },
  { title: 'S', router: 'SmallEntranceDemo' },
];


const EntryDemo = ({ navigation }) => {

  // 增加标题传递
  const navigateToScreen = useCallback((routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title }); // 把标题传递给路由参数
    }
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>入口</Text>
      <ListCard>
        {UIItems.map((item) => (
          <ListItem key={item.router} title={item.title} onPress={() => navigateToScreen(item.router, item.title)} />
        ))}
      </ListCard>
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
    marginBottom: 20,
  },
});

export default EntryDemo;
