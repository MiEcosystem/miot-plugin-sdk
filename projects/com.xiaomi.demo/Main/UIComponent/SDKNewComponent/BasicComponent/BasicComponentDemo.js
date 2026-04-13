'use strict';

import React from 'react';
import { ScrollView } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { colorToken, ListCard, ListItem } from 'miot/ui/hyperOSUI';

const BasicComponentDemo = (props) => {
  const { navigation } = props;
  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  };

  const commonItems = [
    { title: '列表项 ListItem', router: 'ListItemDemo' },
    { title: '列表项(带控件) ListItemWithWidget', router: 'ListItemWithWidgetDemo' },
    { title: '开关 Switch', router: 'NewSwitchDemo' },
    { title: '按钮 BlockButton', router: 'BlockButtonDemo' },
    { title: '按钮组 ButtonGroup', router: 'ButtonGroupDemo' },
    { title: '小组件 Checkbox', router: 'AtomicDemo' },
    { title: '分割线 Divider', router: 'SeparatorDemo' },
  ];

  const popupItems = [
    { title: '自定义弹窗 ActionCustomDialog', router: 'ActionCustomDialogDemo' },
    { title: '轻消息 Toast', router: 'ToastDemo' },
    // { title: '消息弹窗 MessageDialog', router: 'MessageDialogDemo' },
    // { title: '弹窗 CommonDialog', router: 'DialogDemo' },
    // { title: '加载提示 LoadingToast', router: 'LoadingToastDemo' },
    // { title: '弹出菜单 PopMenus', router: 'PopMenusDemo' },
    // { title: '近手弹窗', router: 'HandPopDemo' },
    // { title: '抽屉 Drawer', router: 'DrawerDemo' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ListCard title="常规组件">
        {commonItems.map((item) => (
          <ListItem key={item.router} title={item.title} onPress={() => navigateToScreen(item.router, item.title)} />
        ))}
      </ListCard>
      <ListCard title="弹出类组件">
        {popupItems.map((item) => (
          <ListItem key={item.router} title={item.title} onPress={() => navigateToScreen(item.router, item.title)} />
        ))}
      </ListCard>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 28,
  },
});

export default BasicComponentDemo;
