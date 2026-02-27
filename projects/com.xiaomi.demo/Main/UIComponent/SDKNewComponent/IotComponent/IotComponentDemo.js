'use strict';

import React, { useCallback, useMemo } from 'react';
import { ScrollView, Text } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, ListGroup } from "miot/ui/hyperOSUI";

const UIItems = [
  { title: '容器', router: 'ContainerDemo' },
  { title: '入口', router: 'EntryDemo' },
  { title: '结构', router: 'StructureDemo' },
  { title: '控制', router: 'ControlerDemo' }
  // { title: '信息', router: 'InfoDemo' }
];

// const mihomeItems = [
//   { title: '智能场景', router: 'SmartSceneDemo' }
// ];

const IotComponentDemo = ({ navigation }) => {

  // 增加标题传递
  const navigateToScreen = useCallback((routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title }); // 把标题传递给路由参数
    }
  }, [navigation]);

  const UIDataSource = useMemo(() => {
    return UIItems.map((item) => ({ ...item, key: item.router, onPress: () => navigateToScreen(item.router, item.title) }));
  }, [navigateToScreen]);

  // const mihomeDataSource = useMemo(() => {
  //   return mihomeItems.map((item) => ({ ...item, key: item.router, onPress: () => navigateToScreen(item.router, item.title) }));
  // }, [navigateToScreen]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Iot组件库</Text>
      <ListGroup
        title="UI控件"
        dataSource={UIDataSource}
      />
      {/* <ListGroup
        title="米家业务组件"
        dataSource={mihomeDataSource}
      /> */}
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
    marginBottom: 20
  }
});

export default IotComponentDemo;
