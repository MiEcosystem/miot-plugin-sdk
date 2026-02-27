'use strict';

import React, { Component, useMemo } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "miot/ui/hyperOSUI";
import { ListGroup } from "mhui-rn/dist/hyperOS";

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
  const UIDataSource = useMemo(() => {
    return tokenItems.map((item) => ({
      ...item,
      key: item.router,
      onPress: () => navigateToScreen(item.router, item.title)

    }));
  }, []);
  return (
    <ScrollView style={styles.container}>
      <ListGroup
        dataSource={UIDataSource}
      />
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2,
    paddingTop: 10,
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_2,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  sectionContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: "transparent",
    paddingVertical: 5
  },
  sectionTitle: {
    fontSize: 12,
    color: colorToken.mjcard_color_miui_2,
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: colorToken.mj_color_gray_card_1
  },
  itemText: {
    fontSize: 16,
    color: colorToken.mj_color_gray_text_1
  },
  arrow: {
    fontSize: 16,
    color: colorToken.mj_color_gray_icon_4
  }
});

export default DrawerDemo;
