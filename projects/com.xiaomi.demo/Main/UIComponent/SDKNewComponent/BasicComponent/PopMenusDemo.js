'use strict';

import React, { useRef } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { PopMenus, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

const PopMenusDemo = () => {
  const popMenusRef = useRef(null);
  const triggerRef = useRef(null);

  const data = [
    { id: 1, title: '选项一' },
    { id: 2, title: '选项二' },
    { id: 3, title: '选项三', subtitle: '带副标题' },
    { id: 4, title: '选项四（禁用）', disabled: true },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
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
        ShowTitleText
        ShowSubtitleText
        onSelect={(item) => console.log('选中:', item.title)}
        onDismiss={() => console.log('菜单关闭')}
      />
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
    paddingTop: 20,
  },
  section: {
    padding: 16,
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
