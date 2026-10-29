'use strict';

import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ButtonGroup, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';
import NavigationBar from 'miot/ui/NavigationBar';

const ButtonGroupDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('ButtonGroupConfigDemo', { title: 'ButtonGroup 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>horizontal - 2 个按钮</Text>
      <View style={styles.section}>
        <ButtonGroup
          layout="horizontal"
          buttons={[
            { title: '取消', onPress: () => console.log('取消') },
            { title: '确定', onPress: () => console.log('确定') },
          ]}
        />
      </View>

      <Text style={styles.header}>horizontal - 1 个按钮</Text>
      <View style={styles.section}>
        <ButtonGroup
          layout="horizontal"
          buttons={[{ title: '知道了', onPress: () => console.log('知道了') }]}
        />
      </View>

      <Text style={styles.header}>vertical - 3 个按钮</Text>
      <View style={styles.section}>
        <ButtonGroup
          layout="vertical"
          buttons={[
            { title: '主要操作', onPress: () => console.log('主要') },
            { title: '次要操作', onPress: () => console.log('次要') },
            { title: '第三操作', onPress: () => console.log('第三') },
          ]}
        />
      </View>

      <Text style={styles.header}>vertical - 2 个按钮</Text>
      <View style={styles.section}>
        <ButtonGroup
          layout="vertical"
          buttons={[
            { title: '确定', onPress: () => console.log('确定') },
            { title: '取消', onPress: () => console.log('取消') },
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
  section: {
    marginHorizontal: 16,
  },
});

export default ButtonGroupDemo;
