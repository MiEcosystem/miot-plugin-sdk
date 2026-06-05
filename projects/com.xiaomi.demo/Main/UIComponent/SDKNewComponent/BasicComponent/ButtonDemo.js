'use strict';

import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { colorToken, ListCard, ListItem } from "miot/ui/hyperOSUI";
import { dynamicStyleSheet } from "miot/ui";
import NavigationBar from "miot/ui/NavigationBar";

const ButtonDemo = (props) => {
  const { navigation } = props;


  // 增加标题传递
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title }); // 把标题传递给路由参数
    }
  };
  const tokenItems = [
    { title: '基础样式', router: 'ButtonConfigDemo' },
    { title: '颜色设置', router: 'ButtonColorDemo' },
  ];
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
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
});

export default ButtonDemo;
