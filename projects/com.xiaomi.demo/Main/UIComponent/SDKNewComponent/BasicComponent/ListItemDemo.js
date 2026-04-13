'use strict';

import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { ListItem, Checkbox, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { SubtitleGroup } from 'mhui-rn/dist/hyperOS';
import NavigationBar from 'miot/ui/NavigationBar';

const groupIcon = require('../../images/group.png');
const onPress = () => Alert.alert('onPress');
const onLongPress = () => Alert.alert('onLongPress');
const noop = () => {};
const icon = <Image source={groupIcon} style={{ width: 40, height: 40, borderRadius: 8 }} />;

const longTitle = 'TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle';
const longSubtitle = 'subtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitlesubtitle';
const longValue = 'ValueValueValueValueValueValueValueValueValueValueValueValueValue';

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Group = ({ title, children }) => (
  <View style={styles.group}>
    <Text style={styles.groupTitle}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </View>
);

class ListItemDemo extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    navigation.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => {
            navigation.navigate('ListItemConfigDemo', { title: 'ListItem 配置调试' });
          },
        },
      ],
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* ===== 1. 单配置全覆盖 ===== */}
        <Section title="单配置全覆盖">
          <Group title="leadingIcon">
            <ListItem title="Title" subtitle="subtitle" onPress={onPress} />
            <ListItem title="Title" subtitle="subtitle" onPress={onPress} leadingIcon={icon} />
          </Group>

          <Group title="subtitle">
            <ListItem title="Title" onPress={onPress} />
            <ListItem title="Title" subtitle="subtitle" onPress={onPress} />
            <ListItem title="Title" subtitle={<SubtitleGroup title="自定义渲染" />} onPress={onPress} />
          </Group>

          <Group title="value">
            <ListItem title="Title" onPress={noop} actionType="none" />
            <ListItem title="Title" onPress={noop} actionType="none" value="Value" />
          </Group>

          <Group title="actionType">
            <ListItem title="Title" onPress={onPress} actionType="navigate" />
            <ListItem title="Title" onPress={onPress} actionType="select" />
            <ListItem title="Title" onPress={noop} actionType="none" />
            <ListItem title="Title" onPress={noop} actionType="custom" customRender={<Checkbox checked onChange={noop} />} />
          </Group>

          <Group title="badge">
            <ListItem title="Title" onPress={noop} actionType="none" value="Value" badge={false} />
            <ListItem title="Title" onPress={onPress} value="Value" badge />
          </Group>

          <Group title="disabled">
            <ListItem title="Title" subtitle="subtitle" onPress={onPress} />
            <ListItem title="Title" subtitle="subtitle" onPress={onPress} disabled />
          </Group>

          <Group title="onPress">
            <ListItem title="Title" subtitle="subtitle" onPress={noop} />
            <ListItem title="Title" subtitle="subtitle" onPress={onPress} />
          </Group>

          <Group title="onLongPress">
            <ListItem title="Title" subtitle="subtitle" onPress={onPress} />
            <ListItem title="Title" subtitle="subtitle" onPress={onPress} onLongPress={onLongPress} />
          </Group>
        </Section>

        {/* ===== 2. 依赖配置全覆盖 ===== */}
        <Section title="依赖配置全覆盖">
          <Group title="customRender">
            <ListItem title="Title" onPress={noop} actionType="custom" customRender={<Checkbox checked onChange={noop} />} />
            <ListItem title="Title" onPress={noop} actionType="none" />
          </Group>

          <Group title="delayLongPress">
            <ListItem title="Title" subtitle="subtitle" onPress={onPress} onLongPress={onLongPress} delayLongPress={1000} />
          </Group>

          <Group title="badge + value + actionType">
            <ListItem title="Title" onPress={onPress} value="Value" badge />
          </Group>
        </Section>

        {/* ===== 3. 关键联合覆盖 ===== */}
        <Section title="关键联合覆盖">
          <Group title="disabled + navigate">
            <ListItem title="Title" subtitle="subtitle" onPress={onPress} leadingIcon={icon} disabled />
          </Group>

          <Group title="超长文本">
            <ListItem title={longTitle} subtitle={longSubtitle} onPress={onPress} value={longValue} />
          </Group>

          <Group title="超长 value">
            <ListItem title="Title" subtitle="subtitle" onPress={onPress} leadingIcon={icon} value={longValue} />
          </Group>

          <Group title="value + badge">
            <ListItem title="Title" onPress={onPress} value="Value" badge />
          </Group>

          <Group title="actionType=none + value + badge">
            <ListItem title="Title" subtitle="subtitle" onPress={noop} leadingIcon={icon} actionType="none" value="Value" badge />
          </Group>
        </Section>
      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colorToken.contentPrimaryNormal,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  group: {
    marginBottom: 8,
  },
  groupTitle: {
    fontSize: 12,
    color: colorToken.accentOsFill,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  card: {
    marginHorizontal: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colorToken.surfaceCardPrimary,
  },
});

export default ListItemDemo;
