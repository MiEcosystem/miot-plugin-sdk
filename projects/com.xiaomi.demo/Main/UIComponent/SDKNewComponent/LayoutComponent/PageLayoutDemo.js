'use strict';

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import {
  PageLayout, ListCard, ListItem, ListItemWithWidget, CardHeader,
  ActionBlock, StatusAlert, colorToken, Fonts,
} from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';
import NavigationBar from 'miot/ui/NavigationBar';
import { BrandProduced } from 'miot/ui/brandProduced';

const noop = () => {};

const PageLayoutDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('PageLayoutConfigDemo', { title: 'PageLayout 配置调试' }) }],
    });
  }, []);

  return (
    <PageLayout>
      {/* Background 层 - 背景图 */}
      <PageLayout.Background>
        <View style={styles.bgGradient} />
      </PageLayout.Background>

      {/* Header 区域 - 设备信息（可滚走） */}
      <PageLayout.Header>
        <View style={styles.headerArea}>
          <View style={styles.deviceIcon}>
            <Circle fill={colorToken.staticWhite} width={40} height={40} />
          </View>
          <Text style={styles.deviceName}>智能空调</Text>
          <Text style={styles.deviceStatus}>制冷中 · 26°C</Text>
        </View>
      </PageLayout.Header>

      {/* SubHeader 区域 - 状态提示（吸顶） */}
      <PageLayout.SubHeader>
        <StatusAlert alerts={[{ title: '固件版本 2.5.1 可用，建议升级', leadingIconType: 'reminder', actionType: 'navigate', onPress: noop }]} />
      </PageLayout.SubHeader>

      {/* Content 区域 - 主内容 */}
      <PageLayout.Content>
        <CardHeader title="快捷操作" />
        <ActionBlock
          maxColumns={3}
          options={[
            { title: '制冷', icon: <Circle fill={colorToken.accentBlueFill} />, onPress: noop },
            { title: '制热', icon: <Circle fill={colorToken.accentOrangeFill} />, onPress: noop },
            { title: '送风', icon: <Circle fill={colorToken.accentGreenFill} />, onPress: noop },
          ]}
        />

        <ListCard title="常用设置">
          <ListItem title="温度" value="26°C" onPress={noop} />
          <ListItem title="风速" value="自动" onPress={noop} />
          <ListItem title="模式" value="制冷" actionType="select" onPress={noop} />
          <ListItem title="定时关机" value="未设置" onPress={noop} />
        </ListCard>

        <ListCard title="设备控制">
          <ListItemWithWidget title="睡眠模式" onChange={noop} />
          <ListItemWithWidget title="节能模式" onChange={noop} />
          <ListItemWithWidget title="自动清洁" checked onChange={noop} />
        </ListCard>

        <ListCard title="关于设备">
          <ListItem title="设备名称" value="客厅空调" onPress={noop} />
          <ListItem title="IP 地址" value="192.168.1.105" actionType="none" onPress={noop} />
          <ListItem title="固件版本" value="2.4.0" onPress={noop} />
          <ListItem title="MAC 地址" value="AA:BB:CC:DD:EE:FF" actionType="none" onPress={noop} />
        </ListCard>
      </PageLayout.Content>

      {/* Footer 区域 */}
      <PageLayout.Footer>
        <BrandProduced />
      </PageLayout.Footer>
    </PageLayout>
  );
};

const styles = dynamicStyleSheet({
  bgGradient: {
    height: 260,
    backgroundColor: colorToken.accentBlueSubtle,
  },
  headerArea: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  deviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colorToken.accentBlueFill,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceName: {
    ...Fonts.fontSystem20Medium,
    color: colorToken.contentPrimaryNormal,
  },
  deviceStatus: {
    ...Fonts.fontSystem14Regular,
    color: colorToken.accentBlueFill,
    marginTop: 4,
  },
});

export default PageLayoutDemo;
