'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "miot/ui/hyperOSUI";
import { ListCard, ListItem } from "mhui-rn/dist/hyperOS";

const DrawerDemo = (props) => {
  const { navigation } = props;
  // 增加标题传递
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title }); // 把标题传递给路由参数
    }
  };
  const tokenItems = [
    { title: '固定高度', router: 'FixedDrawerDemo' },
    { title: '弹性高度', router: 'ElasticDrawerDemo' },
  ];
  return (
    <ScrollView style={styles.container}>
      <ListCard title="">
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
    paddingTop: 10,
  },
});

export default DrawerDemo;
