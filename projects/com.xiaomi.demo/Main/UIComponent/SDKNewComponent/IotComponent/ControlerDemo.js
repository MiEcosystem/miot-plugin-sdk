'use strict';

import React, { useCallback, useMemo } from 'react';
import { ScrollView, Text } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, ListGroup } from "miot/ui/hyperOSUI";

const UIItems = [
  { title: '子开关', router: 'LargeVariantSwitchDemo' },
  { title: '步进器', router: 'StepperDemo' }
];

const ControlerDemo = ({ navigation }) => {

  // 增加标题传递
  const navigateToScreen = useCallback((routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title }); // 把标题传递给路由参数
    }
  }, [navigation]);

  const dataSource = useMemo(() => {
    return UIItems.map((item) => ({ ...item, key: item.router, onPress: () => navigateToScreen(item.router, item.title) }));
  }, [navigateToScreen]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>结构</Text>
      <ListGroup
        dataSource={dataSource}
      />
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

export default ControlerDemo;
