'use strict';

import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { ActionSheet, CardContainer, colorToken, Fonts, ListItem } from 'miot/ui/hyperOSUI';
import NavigationBar from 'miot/ui/NavigationBar';

const ActionSheetDemo = ({ navigation }) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('IotActionSheetConfigDemo', { title: 'ActionSheet 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.header}>操作面板</Text>

      <Text style={styles.sectionTitle}>基础用法</Text>
      <CardContainer gap={0}>
        <ListItem title="无标题 · 默认选项" onPress={() => setVisible1(true)} />
        <ListItem title="带标题 · 含警告选项" onPress={() => setVisible2(true)} />
      </CardContainer>

      <Text style={styles.sectionTitle}>强调色 & 禁用</Text>
      <CardContainer gap={0}>
        <ListItem title="emphasis 蓝色强调" onPress={() => setVisible3(true)} />
        <ListItem title="含禁用项" onPress={() => setVisible4(true)} />
      </CardContainer>

      {/* 无标题基础 */}
      <ActionSheet
        visible={visible1}
        options={[
          { label: '复制', onPress: () => setVisible1(false) },
          { label: '分享', onPress: () => setVisible1(false) },
          { label: '收藏', onPress: () => setVisible1(false) },
        ]}
        onCancel={() => setVisible1(false)}
      />

      {/* 带标题 + warning */}
      <ActionSheet
        visible={visible2}
        title="请选择操作"
        options={[
          { label: '编辑设备名称', onPress: () => setVisible2(false) },
          { label: '移除设备', type: 'warning', onPress: () => setVisible2(false) },
        ]}
        onCancel={() => setVisible2(false)}
      />

      {/* emphasis 蓝色 */}
      <ActionSheet
        visible={visible3}
        title="场景模式"
        options={[
          { label: '回家模式', type: 'emphasis', colorType: 'blue', onPress: () => setVisible3(false) },
          { label: '离家模式', type: 'emphasis', colorType: 'orange', onPress: () => setVisible3(false) },
          { label: '睡眠模式', type: 'emphasis', colorType: 'purple', onPress: () => setVisible3(false) },
        ]}
        onCancel={() => setVisible3(false)}
      />

      {/* 禁用项 */}
      <ActionSheet
        visible={visible4}
        title="设备操作"
        options={[
          { label: '开启定时', onPress: () => setVisible4(false) },
          { label: '固件升级（不可用）', disabled: true },
          { label: '恢复出厂设置', type: 'warning', onPress: () => setVisible4(false) },
        ]}
        onCancel={() => setVisible4(false)}
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
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 15,
    marginBottom: 10,
    ...Fonts.fontSystem24Medium,
    color: colorToken.contentSecondaryNormal,
  },
  sectionTitle: {
    color: colorToken.accentOsFill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
    ...Fonts.fontSystem13Regular,
  },
});

export default ActionSheetDemo;
