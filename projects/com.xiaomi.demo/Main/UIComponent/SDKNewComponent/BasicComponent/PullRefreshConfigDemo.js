'use strict';

import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { PullRefresh, NavigationBar, colorToken, ContainerWithGap } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const PullRefreshConfigDemo = ({ navigation }) => {

  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setCount((prev) => prev + 1);
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PullRefresh
        refreshing={refreshing}
        onRefresh={onRefresh}
        backgroundColor="white"
      >
        <View style={styles.container}>
          <Text style={styles.header}>PullRefresh</Text>

          <ContainerWithGap gap={8} title="下拉刷新">
            <Text style={styles.hint}>向下拖拽页面触发刷新</Text>
            <Text style={styles.count}>已刷新 {count} 次</Text>
          </ContainerWithGap>

        </View>
      </PullRefresh>
    </View>
  );
};

const styles = dynamicStyleSheet({
  container: {
    paddingTop: 30,
    paddingHorizontal: 12,
    paddingBottom: 28,
    backgroundColor: colorToken.surfacePageLow,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentPrimaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  hint: {
    fontSize: 14,
    color: colorToken.contentSecondaryNormal,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
  count: {
    fontSize: 16,
    color: colorToken.contentPrimaryNormal,
    paddingHorizontal: 15,
    marginTop: 8,
    lineHeight: 24,
  },
  listItem: {
    fontSize: 14,
    color: colorToken.contentPrimaryNormal,
    paddingHorizontal: 15,
    paddingVertical: 12,
    lineHeight: 20,
  },
});

export default PullRefreshConfigDemo;
