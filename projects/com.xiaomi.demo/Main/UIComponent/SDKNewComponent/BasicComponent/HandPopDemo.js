'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, ListCard, ListItem } from "miot/ui/hyperOSUI";

const HandPopDemo = (props) => {
  const { navigation } = props;
  // 增加标题传递
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title }); // 把标题传递给路由参数
    }
  };
  const tokenItems = [
    { title: '基础样式', router: 'HandPopCustomDemo' },
    { title: '点击效果', router: 'HandPopClickDemo' },
    { title: '触发条件', router: 'HandPopTriggerDemo' },
  ];
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
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
  },
});

export default HandPopDemo;
