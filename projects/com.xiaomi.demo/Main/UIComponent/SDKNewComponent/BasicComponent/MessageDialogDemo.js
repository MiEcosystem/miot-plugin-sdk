'use strict';

import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { MessageDialog, ListCard, ListItem, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

const MessageDialogDemo = () => {
  const [visible, setVisible] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);

  const items = [
    {
      title: '基础消息弹窗',
      key: 'basic',
      onPress: () => {
        setShowCheckbox(false);
        setVisible(true);
      },
    },
    {
      title: '带 Checkbox 消息弹窗',
      key: 'checkbox',
      onPress: () => {
        setShowCheckbox(true);
        setVisible(true);
      },
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <ListCard title="">
        {items.map((item) => (
          <ListItem key={item.key} title={item.title} onPress={item.onPress} />
        ))}
      </ListCard>
      <MessageDialog
        visible={visible}
        title="消息弹窗"
        contentText="这是一段消息内容，单行时居中对齐。"
        showCheckbox={showCheckbox}
        checkboxData={{ checked: false, text: '不再提示' }}
        onCheckboxChange={(checked) => console.log('checkbox:', checked)}
        onDismiss={() => setVisible(false)}
        buttons={[
          { title: '取消', callback: () => setVisible(false) },
          { title: '确定', callback: () => setVisible(false) },
        ]}
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
});

export default MessageDialogDemo;
