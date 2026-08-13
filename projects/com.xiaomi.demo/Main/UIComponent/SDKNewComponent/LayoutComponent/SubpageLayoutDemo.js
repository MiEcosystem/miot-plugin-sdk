'use strict';

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  SubpageLayout, ListCard, ListItem, ListItemWithWidget,
  SelectList, BlockButton, Separator, useCollapsibleTitle,
} from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import NavigationBar from 'miot/ui/NavigationBar';

const noop = () => {};

const SubpageLayoutDemo = ({ navigation }) => {
  const [mode, setMode] = useState('auto');
  const { scrollHandler, titleVisible, titleOpacity, LargeTitle } = useCollapsibleTitle({ title: '高级设置' });

  useEffect(() => {
    navigation.setParams({
      title: '高级设置',
      titleSize: 'large',
      collapseTitle: true,
      titleVisible: false,
      titleOpacity: 0,
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('SubpageLayoutConfigDemo', { title: 'SubpageLayout 配置调试' }) }],
    });
  }, []);

  useEffect(() => {
    navigation.setParams({ titleVisible, titleOpacity });
  }, [titleVisible]);

  return (
    <SubpageLayout onScroll={scrollHandler}>
      <SubpageLayout.Header>
        <LargeTitle />
      </SubpageLayout.Header>

      <SubpageLayout.Content>
        <ListCard title="模式选择">
          <SelectList
            options={[
              { value: 'auto', title: '自动模式' },
              { value: 'cool', title: '制冷模式' },
              { value: 'heat', title: '制热模式' },
              { value: 'fan', title: '送风模式' },
            ]}
            value={mode}
            onChange={setMode}
            selectedAlign="left"
          />
        </ListCard>

        <ListCard title="温度控制">
          <ListItem title="目标温度" value="26°C" onPress={noop} />
          <ListItem title="风速" value="自动" actionType="select" onPress={noop} />
          <Separator />
          <ListItemWithWidget title="静音运行" onChange={noop} />
          <ListItemWithWidget title="节能模式" checked onChange={noop} />
        </ListCard>

        <ListCard title="高级设置">
          <ListItem title="定时开机" value="未设置" onPress={noop} />
          <ListItem title="定时关机" value="未设置" onPress={noop} />
          <ListItem title="温度校准" value="0°C" onPress={noop} />
        </ListCard>
      </SubpageLayout.Content>

      <SubpageLayout.Footer>
        <View style={styles.footer}>
          <BlockButton title="保存设置" type="primary" onPress={noop} />
        </View>
      </SubpageLayout.Footer>
    </SubpageLayout>
  );
};

const styles = dynamicStyleSheet({
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
});

export default SubpageLayoutDemo;
