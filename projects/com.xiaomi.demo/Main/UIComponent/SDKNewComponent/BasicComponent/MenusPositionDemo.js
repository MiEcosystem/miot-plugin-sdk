'use strict';

import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Menus, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

const POSITIONS = ['top', 'bottom', 'left', 'right'];

const data = [
  { id: 1, title: '编辑', actionType: 'button' },
  { id: 2, title: '复制', actionType: 'button' },
  { id: 3, title: '删除', actionType: 'button' },
];

const MenusPositionDemo = () => {
  const menusRef = useRef(null);
  const triggerRefs = useRef({});

  const showMenus = (position) => {
    const ref = triggerRefs.current[position];
    if (ref && menusRef.current) {
      menusRef.current.showFrom(ref, { position });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {POSITIONS.map((position) => (
        <TouchableOpacity
          key={position}
          ref={(r) => { triggerRefs.current[position] = r; }}
          style={styles.trigger}
          onPress={() => showMenus(position)}
        >
          <Text style={styles.triggerText}>position: {position}</Text>
        </TouchableOpacity>
      ))}
      <Menus
        ref={menusRef}
        data={data}
        onPress={(item) => console.log('press:', item.title)}
        onDismiss={() => console.log('dismiss')}
      />
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  content: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  trigger: {
    backgroundColor: colorToken.surfaceCardPrimary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 12,
    alignItems: 'center',
  },
  triggerText: {
    fontSize: 16,
    color: colorToken.contentPrimaryNormal,
  },
});

export default MenusPositionDemo;
