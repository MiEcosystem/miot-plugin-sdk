'use strict';

import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "miot/ui/hyperOSUI";
import { ListGroup } from "mhui-rn/dist/hyperOS";

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
    { title: '卡片包裹', router: 'ListGroupDemo' }
  ];
  const UIDataSource = useMemo(() => {
    return tokenItems.map((item) => ({ ...item, key: item.router, onPress: () => navigateToScreen(item.router, item.title) }));
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <ListGroup dataSource={UIDataSource}/>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2
  }
});

export default ListDemo;
