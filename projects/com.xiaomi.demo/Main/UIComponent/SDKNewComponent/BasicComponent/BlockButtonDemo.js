'use strict';

import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { BlockButton, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';
import NavigationBar from 'miot/ui/NavigationBar';

const BlockButtonDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('BlockButtonConfigDemo', { title: 'BlockButton 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Primary</Text>
      <View style={styles.section}>
        <BlockButton title="主要按钮" type="primary" onPress={() => console.log('primary')} />
      </View>

      <Text style={styles.header}>Normal</Text>
      <View style={styles.section}>
        <BlockButton title="默认按钮" type="normal" onPress={() => console.log('normal')} />
      </View>

      <Text style={styles.header}>Disabled</Text>
      <View style={styles.section}>
        <BlockButton title="禁用按钮" type="primary" disabled onPress={() => console.log('disabled')} />
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
  section: {
    marginHorizontal: 16,
  },
});

export default BlockButtonDemo;
