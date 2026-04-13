'use strict';

import React from 'react';
import { ScrollView, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "miot/ui/hyperOSUI";
import { ListCard, ListItem } from "mhui-rn/dist/hyperOS";

const ListDemo = (props) => {
  const { navigation } = props;
  // 增加标题传递
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title }); // 把标题传递给路由参数
    }
  };
  const tokenItems = [
    { title: '基础样式', router: 'ListItemDemo' },
    { title: '卡片包裹', router: 'ListCardDemo' },
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <ListCard title="">
          {tokenItems.map((item) => (
            <ListItem key={item.router} title={item.title} onPress={() => navigateToScreen(item.router, item.title)} />
          ))}
        </ListCard>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default ListDemo;
