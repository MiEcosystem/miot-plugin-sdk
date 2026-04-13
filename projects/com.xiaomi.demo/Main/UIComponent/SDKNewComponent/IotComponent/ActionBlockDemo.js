'use strict';

import React, { useState } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { ActionBlock, LargeTriggerSelect, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';
import { Circle } from 'miot/ui/icons';

const ActionBlockDemo = () => {
  const [largeValue, setLargeValue] = useState('low');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>maxColumns=2（默认）</Text>
      <View style={styles.card}>
        <ActionBlock
          options={[
            { title: '低档', subtitle: '安静', icon: <Circle fill={colorToken.accentBlueFill} />, onPress: () => Alert.alert('低档') },
            { title: '高档', subtitle: '强力', icon: <Circle fill={colorToken.accentOrangeFill} />, onPress: () => Alert.alert('高档') },
          ]}
        />
      </View>

      <Text style={styles.header}>maxColumns=2 + 4个卡片（两行）</Text>
      <View style={styles.card}>
        <ActionBlock
          maxColumns={2}
          options={[
            { title: '制冷', icon: <Circle fill={colorToken.accentBlueFill} />, onPress: () => Alert.alert('制冷') },
            { title: '制热', icon: <Circle fill={colorToken.accentOrangeFill} />, onPress: () => Alert.alert('制热') },
            { title: '除湿', icon: <Circle fill={colorToken.accentGreenFill} />, onPress: () => Alert.alert('除湿') },
            { title: '送风', icon: <Circle fill={colorToken.accentPurpleFill} />, onPress: () => Alert.alert('送风') },
          ]}
        />
      </View>

      <Text style={styles.header}>maxColumns=3</Text>
      <View style={styles.card}>
        <ActionBlock
          maxColumns={3}
          options={[
            { title: '制冷', icon: <Circle fill={colorToken.accentBlueFill} />, onPress: () => Alert.alert('制冷') },
            { title: '制热', icon: <Circle fill={colorToken.accentOrangeFill} />, onPress: () => Alert.alert('制热') },
            { title: '除湿', icon: <Circle fill={colorToken.accentGreenFill} />, onPress: () => Alert.alert('除湿') },
          ]}
        />
      </View>

      <Text style={styles.header}>maxColumns=3 + 带图标</Text>
      <View style={styles.card}>
        <ActionBlock
          maxColumns={3}
          options={[
            { title: '制冷', icon: <Circle fill={colorToken.accentBlueFill} />, onPress: () => Alert.alert('制冷') },
            { title: '制热', icon: <Circle fill={colorToken.accentOrangeFill} />, onPress: () => Alert.alert('制热') },
            { title: '除湿', icon: <Circle fill={colorToken.accentGreenFill} />, onPress: () => Alert.alert('除湿') },
          ]}
        />
      </View>

      <Text style={styles.header}>maxColumns=3 + 带色系</Text>
      <View style={styles.card}>
        <ActionBlock
          maxColumns={3}
          options={[
            { title: '制冷', icon: <Circle fill={colorToken.accentBlueFill} />, colorType: 'blue', onPress: () => Alert.alert('制冷') },
            { title: '制热', icon: <Circle fill={colorToken.accentOrangeFill} />, colorType: 'orange', onPress: () => Alert.alert('制热') },
            { title: '除湿', icon: <Circle fill={colorToken.accentGreenFill} />, colorType: 'green', onPress: () => Alert.alert('除湿') },
          ]}
        />
      </View>

      <Text style={styles.header}>禁用状态</Text>
      <View style={styles.card}>
        <ActionBlock
          disabled
          options={[
            { title: '低档', icon: <Circle fill={colorToken.accentBlueFill} />, onPress: () => {} },
            { title: '高档', icon: <Circle fill={colorToken.accentOrangeFill} />, onPress: () => {} },
          ]}
        />
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
    paddingTop: 20,
  },
  header: {
    fontSize: 14,
    color: colorToken.contentTertiaryNormal,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  card: {
    marginHorizontal: 12,
    backgroundColor: colorToken.surfaceCardPrimary,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default ActionBlockDemo;
