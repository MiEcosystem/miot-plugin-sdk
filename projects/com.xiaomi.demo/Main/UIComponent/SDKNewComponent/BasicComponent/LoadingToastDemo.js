'use strict';

import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { LoadingToast, ListCard, ListItem, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

const LoadingToastDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <ListCard title="">
        <ListItem title="显示 LoadingToast" onPress={() => setVisible(true)} />
        <ListItem title="显示 LoadingToast (3秒自动关闭)" onPress={() => setVisible(true)} />
      </ListCard>
      <LoadingToast
        visible={visible}
        message="加载中..."
        timeout={3000}
        onDismiss={() => setVisible(false)}
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

export default LoadingToastDemo;
