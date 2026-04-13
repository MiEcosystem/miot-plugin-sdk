'use strict';

import React from 'react';
import { ScrollView, Text } from 'react-native';
import { colorToken, ListCard, ListItem } from "miot/ui/hyperOSUI";
import { dynamicStyleSheet } from "miot/ui";

const InformationDemo = (props) => {
  const { navigation } = props;

  // 增加标题传递
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title }); // 把标题传递给路由参数
    }
  };
  const tokenItems = [
    { title: '数据', router: 'InformationDataDemo' },
  ];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>信息</Text>
      <ListCard>
        {tokenItems.map((item) => (
          <ListItem key={item.router} title={item.title} onPress={() => navigateToScreen(item.router, item.title)} />
        ))}
      </ListCard>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.surfacePageLow,
    flex: 1,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentSecondaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
});

export default InformationDemo;
