'use strict';

import React from 'react';
import { View } from 'react-native';
import {
  PageLayout, NavigationBar, ListCard, ListItem, ListItemWithWidget, CardHeader,
  ActionBlock, StatusAlert, colorToken, useCollapsibleTitle,
} from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';
import { BrandProduced } from 'miot/ui/brandProduced';

const noop = () => {};

const PageLayoutDemo = ({ navigation }) => {
  const { scrollHandler, titleVisible, titleOpacity, LargeTitle } = useCollapsibleTitle({ title: '智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调' });

  return (
    <PageLayout onScroll={scrollHandler}>
      <PageLayout.Background>
        <View style={styles.bgGradient} />
      </PageLayout.Background>

      <PageLayout.Navigation>
        <NavigationBar
          title="智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调智能空调"
          titleSize="large"
          collapseTitle
          titleVisible={titleVisible}
          titleOpacity={titleOpacity}
          showBrandLogo
          left={{ key: 'back', onPress: () => navigation.goBack() }}
          right={{ key: 'more', onPress: () => navigation.navigate('PageLayoutConfigDemo', { title: 'PageLayout 配置调试' }) }}
        />
      </PageLayout.Navigation>

      <PageLayout.Header>
        <LargeTitle />
      </PageLayout.Header>

      <PageLayout.AlertContainer>
        <StatusAlert
          stackTitle="共2条异常提示"
          drawerTitle="异常提示"
          alerts={[
            { title: '固件版本 2.5.1 可用，建议升级', leadingIconType: 'reminder', actionType: 'navigate', onPress: noop },
            { title: '滤芯寿命不足，请及时更换', leadingIconType: 'consumable', warning: true, actionType: 'button', buttons: [{ text: '查看', onPress: noop }] },
          ]}
        />
      </PageLayout.AlertContainer>

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
        </ListCard>
      </PageLayout.Content>

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
});

PageLayoutDemo.navigationOptions = { header: null };

export default PageLayoutDemo;
