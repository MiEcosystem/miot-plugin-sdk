'use strict';

import React, { Component, useMemo } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken, ListGroup } from "miot/ui/hyperOSUI";

const BasicComponentDemo = (props) => {
  const { navigation } = props;
  // 增加标题传递
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title }); // 把标题传递给路由参数
    }
  };
  const PhaseOneItems = [
    { title: '弹窗', router: 'DialogDemo' }

  ];
  const PhaseTwoItems = [
    { title: '近手弹窗', router: 'HandPopDemo' },
    { title: '列表', router: 'ListDemo' },
    { title: '加载弹窗', router: 'LoadingDemo' }
  ];
  const PhaseThreeItems = [
    { title: '按钮', router: 'ButtonDemo' },
    { title: '小组件', router: 'AtomicDemo' },
    { title: '轻消息', router: 'ToastDemo' }
  ];
  const PhaseFourItems = [
    { title: '信息区', router: 'InformationAreaDemo' },
    { title: '切换按钮', router: 'ToggleButtonDemo' },
    { title: '抽屉组件', router: 'DrawerDemo' },
    { title: '手势区',router: 'PanResponderDemo' },
  ];

  const PhaseOneDataSource = useMemo(() => {
    return PhaseOneItems.map((item) => ({ ...item, key: item.router, onPress: () => navigateToScreen(item.router, item.title) }));
  }, []);
  const PhaseTwoDataSource = useMemo(() => {
    return PhaseTwoItems.map((item) => ({ ...item, key: item.router, onPress: () => navigateToScreen(item.router, item.title) }));
  }, []);
  const PhaseThreeDataSource = useMemo(() => {
    return PhaseThreeItems.map((item) => ({ ...item, key: item.router, onPress: () => navigateToScreen(item.router, item.title) }));
  }, []);
  const PhaseFourDataSource = useMemo(() => {
    return PhaseFourItems.map((item) => ({ ...item, key: item.router, onPress: () => navigateToScreen(item.router, item.title) }));
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>标插SDK demo</Text>
      <ListGroup
        title="第一期"
        dataSource={PhaseOneDataSource}/>
      <ListGroup
        title="第二期"
        dataSource={PhaseTwoDataSource}/>
      <ListGroup
        title="第三期"
        dataSource={PhaseThreeDataSource}/>
      <ListGroup
        title="第四期"
        dataSource={PhaseFourDataSource}/>
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

export default BasicComponentDemo;
