'use strict';

import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
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
    { title: '按钮 Button', router: 'ButtonDemo' },
    { title: '按钮 BlockButton', router: 'BlockButtonDemo' },
    { title: '按钮组 ButtonGroup', router: 'ButtonGroupDemo' },
    { title: '分割线 Separator', router: 'SeparatorDemo' },
    { title: '单选 Radio', router: 'RadioDemo' },
    { title: '复选 Checkbox', router: 'NewCheckboxDemo' },
    { title: '空状态 EmptyState', router: 'EmptyStateDemo' },
    { title: '输入框 Input', router: 'InputDemo' },
    { title: '通知栏 NoticeBar', router: 'NoticeBarDemo' },
  ];

  const newItems = [
    { title: '操作列表项 ActionListItem', router: 'ActionListItemDemo' },
    { title: '选择列表 SelectList', router: 'SelectListDemo' },
    { title: '列表卡片 ListCard', router: 'NewListCardDemo' },
    { title: '分段控件 SegmentedControls', router: 'SegmentedControlsConfigDemo' },
    { title: '下拉刷新 PullRefresh', router: 'PullRefreshConfigDemo' },
    { title: '加载 Spin', router: 'SpinConfigDemo' },
    { title: '导航栏 NavigationBar', router: 'NavigationBarConfigDemo' },
  ];

  const popupItems = [
    { title: 'ActionSheet', router: 'IotActionSheetDemo' },
    { title: '自定义弹窗 ActionCustomDialog', router: 'ActionCustomDialogDemo' },
    { title: '轻消息 Toast', router: 'ToastDemo' },
    { title: '消息弹窗 MessageDialog', router: 'MessageDialogDemo' },
    { title: '弹窗 CommonDialog', router: 'DialogDemo' },
    { title: '加载提示 LoadingToast', router: 'LoadingToastDemo' },
    { title: '弹出菜单 PopMenus', router: 'PopMenusEntryDemo' },
    { title: '菜单 Menus', router: 'MenusEntryDemo' },
    { title: '近手弹窗', router: 'HandPopDemo' },
    { title: '抽屉 Drawer', router: 'DrawerDemo' },
    { title: '输入弹窗 InputDialog', router: 'InputDialogDemo' },
    { title: '自定义弹窗 CustomDialog', router: 'CustomDialogDemo' },
    { title: '选择器弹窗 PickerDialog', router: 'PickerDialogDemo' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ListCard title="常规组件">
        {commonItems.map((item) => (
          <ListItem key={item.router} title={item.title} onPress={() => navigateToScreen(item.router, item.title)} />
        ))}
      </ListCard>
      <ListCard title="新增组件">
        {newItems.map((item) => (
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
