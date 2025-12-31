'use strict';

import React, { useCallback, memo, useMemo } from 'react';
import { ScrollView, Text } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, ListGroup } from "miot/ui/hyperOSUI";
import withDarkModeSupport from "../adaptiveThemeComponent";

const UIItems = [
  { title: 'L', router: 'EntryLDemo' }
  // { title: 'M', router: 'EntryMDemo' },
  // { title: 'S', router: 'EntrySDemo' }
];


const EntryDemo = ({ navigation }) => {

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
      <Text style={styles.header}>入口</Text>
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

export default withDarkModeSupport(memo(EntryDemo));
