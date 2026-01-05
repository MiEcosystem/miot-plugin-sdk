'use strict';

import React, { useCallback, memo, useMemo } from 'react';
import {
  ScrollView,
  Text,
  View, StyleSheet
} from 'react-native';
import { colorToken, ListGroup } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from "miot/ui";
import withDarkModeSupport from "./SDKNewComponent/adaptiveThemeComponent";

const SdkComponentDemo = (props) => {
  const { navigation } = props;

  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  };
  const projectItems = useMemo(() => ([
    { title: '基础库', router: 'BasicDemo' },
    { title: '基础组件库', router: 'BasicComponentDemo' },
    { title: 'IoT组件库', router: 'IotComponentDemo' }
  ]), []);

  const UIDataSource = useMemo(() => {
    return projectItems.map((item) => ({
      ...item,
      key: item.router,
      onPress: () => navigateToScreen(item.router, item.title)
    }));
  }, [projectItems, navigateToScreen]);


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>标插SDK组件库</Text>
      <ListGroup
        dataSource={UIDataSource}
      >
      </ListGroup>
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

export default withDarkModeSupport(SdkComponentDemo);
