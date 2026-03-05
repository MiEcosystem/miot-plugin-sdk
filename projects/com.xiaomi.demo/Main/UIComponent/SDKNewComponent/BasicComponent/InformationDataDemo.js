'use strict';

import React, { useMemo } from 'react';
import { ScrollView, Text } from 'react-native';
import { colorToken, ListGroup } from "miot/ui/hyperOSUI";
import { dynamicStyleSheet } from "miot/ui";
import InformationAreaDemo from "./InformationAreaDemo";

const InformationDataDemo = (props) => {
  const { navigation } = props;

  // 增加标题传递
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title }); // 把标题传递给路由参数
    }
  };
  const tokenItems = [
    { title: '中字号', router: 'InformationAreaDemo' },
    { title: '小字号', router: '' }
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
      <Text style={styles.header}>数据</Text>
      <ListGroup dataSource={UIDataSource}/>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2,
    flex: 1
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_2,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  }
});

export default InformationDataDemo;
