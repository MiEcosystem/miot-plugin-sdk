'use strict';

import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { PopMenus, colorToken } from 'miot/ui/hyperOSUI';
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
  { name: 'ShowTitleText', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'ShowSubtitleText', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'ShowIcon', type: 'boolean', defaultValue: false, category: 'state' },
  { name: 'colorType', type: 'enum', enumOptions: ['green', 'blue', 'wathet', 'purple', 'white', 'orange'], defaultValue: 'green', category: 'state' },
  { name: 'item1_title', type: 'string', defaultValue: '选项一', category: 'content' },
  { name: 'item1_subtitle', type: 'string', defaultValue: '', category: 'content' },
  { name: 'item1_icon', type: 'enum', enumOptions: ['none', 'icon1', 'icon2', 'icon3'], defaultValue: 'none', category: 'content' },
  { name: 'item1_disabled', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item2_title', type: 'string', defaultValue: '选项二', category: 'content' },
  { name: 'item2_subtitle', type: 'string', defaultValue: '', category: 'content' },
  { name: 'item2_icon', type: 'enum', enumOptions: ['none', 'icon1', 'icon2', 'icon3'], defaultValue: 'none', category: 'content' },
  { name: 'item2_disabled', type: 'boolean', defaultValue: false, category: 'content' },
  { name: 'item3_title', type: 'string', defaultValue: '选项三', category: 'content' },
  { name: 'item3_subtitle', type: 'string', defaultValue: '', category: 'content' },
  { name: 'item3_icon', type: 'enum', enumOptions: ['none', 'icon1', 'icon2', 'icon3'], defaultValue: 'none', category: 'content' },
  { name: 'item3_disabled', type: 'boolean', defaultValue: false, category: 'content' },
];

const buildData = (p, selectedId) => {
  const items = [];
  for (let i = 1; i <= 3; i += 1) {
    const title = p[`item${ i }_title`];
    if (!title) continue;
    items.push({
      id: i,
      title,
      subtitle: p[`item${ i }_subtitle`] || undefined,
      icon: ICON_OPTIONS[p[`item${ i }_icon`] || 'none'],
      disabled: p[`item${ i }_disabled`] || false,
      selected: i === selectedId,
    });
  }
  return items.length > 0 ? items : [{ id: 1, title: '选项一' }];
};

const PopMenusDemo = () => {
  const popMenusRef = useRef(null);
  const triggerRef = useRef(null);
  const [menuProps, setMenuProps] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const data = buildData(menuProps, selectedId);

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setMenuProps(props)}
      />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          ref={triggerRef}
          style={styles.trigger}
          onPress={() => popMenusRef.current?.showFrom(triggerRef.current)}
        >
          <Text style={styles.triggerText}>点击弹出菜单</Text>
        </TouchableOpacity>
      </View>
      <PopMenus
        ref={popMenusRef}
        data={data}
        ShowTitleText={menuProps.ShowTitleText !== undefined ? menuProps.ShowTitleText : true}
        ShowSubtitleText={menuProps.ShowSubtitleText || false}
        ShowIcon={menuProps.ShowIcon || false}
        colorType={menuProps.colorType || 'green'}
        onSelect={(item) => {
          setSelectedId(item.id);
          console.log('选中:', item.title);
        }}
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

export default PopMenusDemo;
