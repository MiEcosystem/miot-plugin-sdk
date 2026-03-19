'use strict';

import React, { useMemo } from 'react';
import { ScrollView, Text } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "miot/ui/hyperOSUI";
import withDarkModeSupport from "../adaptiveThemeComponent";
import { ListGroup } from "mhui-rn/dist/hyperOS";
const BasicDemo = (props) => {
  const { navigation } = props;
  // 增加标题传递
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  };
  const tokenItems = [
    { title: '颜色', router: 'ColorDemo' },
    { title: '字体', router: 'FontsDemo' },
    { title: '圆角', router: 'RadiusDemo' }
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
      <Text style={styles.header}>基础库</Text>
      <ListGroup
        dataSource={UIDataSource}/>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_2,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginVertical: 20
  }
});

export default withDarkModeSupport(BasicDemo);
