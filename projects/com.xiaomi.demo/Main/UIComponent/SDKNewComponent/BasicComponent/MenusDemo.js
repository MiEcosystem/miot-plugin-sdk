'use strict';

import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Menus, colorToken } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui';
import { Cold, Close, More } from 'mhui-rn/dist/icons';

const ICON_OPTIONS = {
  none: undefined,
  icon1: <Cold width={24} height={24} />,
  icon2: <Close width={24} height={24} />,
  icon3: <More width={24} height={24} />,
};

const propConfigs = [
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'wathet', 'purple', 'white', 'orange'],
    defaultValue: 'green',
    category: 'state',
  },
  { name: 'item1_title', type: 'string', defaultValue: '编辑', category: 'content' },
  { name: 'item1_actionType', type: 'enum', enumOptions: ['button', 'toggle', 'select'], defaultValue: 'button', category: 'content' },
  { name: 'item1_icon', type: 'enum', enumOptions: ['none', 'icon1', 'icon2', 'icon3'], defaultValue: 'none', category: 'content' },
  { name: 'item1_disabled', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item1_selected', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item1_group', type: 'string', defaultValue: '', category: 'content' },
  { name: 'item1_showSeparator', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item2_title', type: 'string', defaultValue: '复制', category: 'content' },
  { name: 'item2_actionType', type: 'enum', enumOptions: ['button', 'toggle', 'select'], defaultValue: 'button', category: 'content' },
  { name: 'item2_icon', type: 'enum', enumOptions: ['none', 'icon1', 'icon2', 'icon3'], defaultValue: 'none', category: 'content' },
  { name: 'item2_disabled', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item2_selected', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item2_group', type: 'string', defaultValue: '', category: 'content' },
  { name: 'item2_showSeparator', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item3_title', type: 'string', defaultValue: '删除', category: 'content' },
  { name: 'item3_actionType', type: 'enum', enumOptions: ['button', 'toggle', 'select'], defaultValue: 'button', category: 'content' },
  { name: 'item3_icon', type: 'enum', enumOptions: ['none', 'icon1', 'icon2', 'icon3'], defaultValue: 'none', category: 'content' },
  { name: 'item3_disabled', type: 'boolean', defaultValue: true, category: 'content' },
  { name: 'item3_selected', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item3_group', type: 'string', defaultValue: '', category: 'content' },
  { name: 'item3_showSeparator', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item4_title', type: 'string', defaultValue: '分享', category: 'content' },
  { name: 'item4_actionType', type: 'enum', enumOptions: ['button', 'toggle', 'select'], defaultValue: 'button', category: 'content' },
  { name: 'item4_icon', type: 'enum', enumOptions: ['none', 'icon1', 'icon2', 'icon3'], defaultValue: 'none', category: 'content' },
  { name: 'item4_disabled', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item4_selected', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item4_group', type: 'string', defaultValue: '', category: 'content' },
  { name: 'item4_showSeparator', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item5_title', type: 'string', defaultValue: '收藏', category: 'content' },
  { name: 'item5_actionType', type: 'enum', enumOptions: ['button', 'toggle', 'select'], defaultValue: 'toggle', category: 'content' },
  { name: 'item5_icon', type: 'enum', enumOptions: ['none', 'icon1', 'icon2', 'icon3'], defaultValue: 'none', category: 'content' },
  { name: 'item5_disabled', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item5_selected', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item5_group', type: 'string', defaultValue: '', category: 'content' },
  { name: 'item5_showSeparator', type: 'boolean', defaultValue: false, category: 'content' },
];

const buildData = (p) => {
  const items = [];
  for (let i = 1; i <= 5; i += 1) {
    const title = p[`item${ i }_title`];
    if (!title) continue;
    items.push({
      id: i,
      title,
      actionType: p[`item${ i }_actionType`] || 'button',
      leadingIcon: ICON_OPTIONS[p[`item${ i }_icon`] || 'none'],
      disabled: p[`item${ i }_disabled`] || false,
      selected: p[`item${ i }_selected`] || false,
      group: p[`item${ i }_group`] || undefined,
      showSeparator: p[`item${ i }_showSeparator`] || false,
    });
  }
  return items.length > 0 ? items : [{ id: 1, title: '编辑', actionType: 'button' }];
};

const MenusDemo = () => {
  const menusRef = useRef(null);
  const triggerRef = useRef(null);
  const [menusProps, setMenusProps] = useState({});

  const data = buildData(menusProps);

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setMenusProps(props)}
      />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          ref={triggerRef}
          style={styles.trigger}
          onPress={() => menusRef.current?.showFrom(triggerRef.current)}
        >
          <Text style={styles.triggerText}>点击弹出菜单</Text>
        </TouchableOpacity>
      </View>
      <Menus
        ref={menusRef}
        data={data}
        colorType={menusProps.colorType || 'green'}
        onPress={(item) => console.log('button:', item.title)}
        onToggle={(item, selected) => console.log('toggle:', item.title, selected)}
        onSelect={(item) => console.log('select:', item.title)}
        onDismiss={() => console.log('菜单关闭')}
      />
    </View>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  buttonWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  trigger: {
    backgroundColor: colorToken.surfaceCardPrimary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  triggerText: {
    fontSize: 16,
    color: colorToken.contentPrimaryNormal,
  },
});

export default MenusDemo;
