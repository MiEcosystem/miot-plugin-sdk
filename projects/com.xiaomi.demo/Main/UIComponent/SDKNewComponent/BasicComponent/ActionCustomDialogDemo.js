'use strict';

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ActionCustomDialog, ListCard, ListItem, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';
import NavigationBar from 'miot/ui/NavigationBar';

const ActionCustomDialogDemo = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('ActionCustomDialogConfigDemo', { title: 'ActionCustomDialog 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <ListCard title="">
        <ListItem title="自定义内容弹窗" onPress={() => setVisible(true)} />
      </ListCard>
      <ActionCustomDialog
        visible={visible}
        title="自定义弹窗"
        onDismiss={() => setVisible(false)}
        buttons={[
          { title: '取消', callback: () => setVisible(false) },
          { title: '确定', callback: () => setVisible(false) },
        ]}
      >
        <View style={styles.customContent}>
          <Text style={styles.customText}>这里是自定义内容区域</Text>
          <Text style={styles.customText}>可以放置任意 React 组件</Text>
        </View>
      </ActionCustomDialog>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
    paddingTop: 20,
  },
  customContent: {
    paddingHorizontal: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },
  customText: {
    fontSize: 16,
    color: colorToken.contentSecondaryNormal,
    marginBottom: 8,
  },
});

export default ActionCustomDialogDemo;
