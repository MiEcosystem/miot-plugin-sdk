'use strict';

import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { colorToken, ListGroup } from "miot/ui/hyperOSUI";
import { dynamicStyleSheet } from "miot/ui";

const ButtonDemo = (props) => {
  const { navigation } = props;

  // 增加标题传递
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title }); // 把标题传递给路由参数
    }
  };
  const tokenItems = [
    { title: '基础样式', router: 'ButtonCustomDemo' },
    { title: '页面效果', router: 'ButtonPageViewDemo' }
  ];
  const UIDataSource = useMemo(() => {
    return tokenItems.map((item) => ({
      ...item,
      key: item.router,
      onPress: () => { navigateToScreen(item.router, item.title); }
    }));
  }, []);
  return (
    <ScrollView style={styles.container}>
      <ListGroup dataSource={UIDataSource}/>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2
  }
});

export default ButtonDemo;
