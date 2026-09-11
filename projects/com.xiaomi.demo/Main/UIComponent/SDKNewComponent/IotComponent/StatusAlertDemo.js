'use strict';

import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { StatusAlert, colorToken, Fonts, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';
import NavigationBar from 'miot/ui/NavigationBar';

const buttonGroup = [
  { text: '忽略', onPress: () => showToast('忽略') },
  { text: '设置', onPress: () => showToast('设置') },
];

const StatusAlertDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => navigation.navigate('StatusAlertConfigDemo', { title: 'StatusAlert 配置调试' }),
        },
      ],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>导航操作</Text>
      <StatusAlert
        alerts={[
          {
            overline: '客厅空调',
            title: '设备已离线，请检查网络连接',
            leadingIconType: 'offline',
            actionType: 'navigate',
            onPress: () => showToast('查看详情'),
          },
        ]}
      />

      <Text style={styles.sectionTitle}>单按钮</Text>
      <StatusAlert
        alerts={[
          {
            title: '滤芯寿命不足，请及时更换',
            leadingIconType: 'consumable',
            actionType: 'button',
            buttons: [{ text: '查看', onPress: () => showToast('查看') }],
          },
        ]}
      />

      <Text style={styles.sectionTitle}>按钮组：inlineEnd</Text>
      <StatusAlert
        alerts={[
          {
            title: '发现可用固件',
            leadingIconType: 'reminder',
            actionType: 'buttonGroup',
            actionPlacement: 'inlineEnd',
            buttons: buttonGroup,
          },
        ]}
      />

      <Text style={styles.sectionTitle}>按钮组：below（默认）</Text>
      <StatusAlert
        alerts={[
          {
            overline: '固件更新',
            title: '新版本包含多项稳定性优化，是否前往设置',
            leadingIconType: 'reminder',
            actionType: 'buttonGroup',
            buttons: buttonGroup,
          },
        ]}
      />

      <Text style={styles.sectionTitle}>加载中</Text>
      <StatusAlert
        loading
        loadingText="正在同步设备状态"
        alerts={[]}
      />

      <Text style={styles.sectionTitle}>多条堆叠</Text>
      <StatusAlert
        stackTitle="共2条异常提示"
        alerts={[
          { title: '温度传感器异常', leadingIconType: 'fault', warning: true },
          { title: '设备网络连接异常', leadingIconType: 'offline' },
        ]}
        onPress={() => showToast('查看全部')}
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
  sectionTitle: {
    ...Fonts.fontSystem13Regular,
    color: colorToken.contentTertiaryNormal,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
});

export default StatusAlertDemo;
