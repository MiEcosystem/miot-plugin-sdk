'use strict';

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { ListItemWithWidget, Checkbox, colorToken, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';
import NavigationBar from 'miot/ui/NavigationBar';

const groupIcon = require('../../images/group.png');
const icon = <Image source={groupIcon} style={{ width: 40, height: 40, borderRadius: 8 }} />;
const svgIcon = <Circle fill={colorToken.contentPrimaryNormal} />;
const noop = () => {};

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

const ListItemWithWidgetDemo = ({ navigation }) => {
  const [switchVal, setSwitchVal] = useState(false);
  const [circularVal, setCircularVal] = useState(false);

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('ListItemWithWidgetConfigDemo', { title: 'ListItemWithWidget 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* ===== 1. widgetType 全覆盖 ===== */}
      <Section title="widgetType 全覆盖">
        <Group title="switch">
          <ListItemWithWidget widgetType="switch" title="开关列表项" checked={switchVal} onChange={setSwitchVal} />
        </Group>

        <Group title="button">
          <ListItemWithWidget widgetType="button" title="按钮列表项" onChange={noop} buttonOption={{ title: '按钮', onPress: () => showToast('button'), type: 'primarySubtle', size: 'medium', colorType: 'green' }} />
        </Group>

        <Group title="circularButton">
          <ListItemWithWidget widgetType="circularButton" title="圆形按钮列表项" checked={circularVal} onChange={setCircularVal} circularButtonOption={{ icon: svgIcon }} />
        </Group>

        <Group title="custom">
          <ListItemWithWidget widgetType="custom" title="自定义控件" onChange={noop} customRender={<Checkbox checked onChange={noop} />} />
        </Group>

        <Group title="无 widgetType（默认 navigate）">
          <ListItemWithWidget title="带入口的列表项" onChange={noop} onPress={() => showToast('onPress')} />
        </Group>
      </Section>

      {/* ===== 2. leadingIcon ===== */}
      <Section title="leadingIcon">
        <Group title="图片图标">
          <ListItemWithWidget widgetType="switch" title="开关列表项" leadingIcon={icon} checked={switchVal} onChange={setSwitchVal} />
        </Group>

        <Group title="SVG 图标">
          <ListItemWithWidget widgetType="switch" title="开关列表项" leadingIcon={svgIcon} checked={switchVal} onChange={setSwitchVal} />
        </Group>
      </Section>

      {/* ===== 3. colorType ===== */}
      <Section title="colorType">
        <Group title="各色系开关">
          {['green', 'blue', 'wathet', 'purple', 'orange'].map((color) => (
            <ListItemWithWidget key={color} widgetType="switch" title={color} checked colorType={color} onChange={noop} />
          ))}
        </Group>
      </Section>

      {/* ===== 4. disabled ===== */}
      <Section title="disabled">
        <Group title="禁用态">
          <ListItemWithWidget widgetType="switch" title="禁用开关" checked={false} onChange={noop} disabled />
          <ListItemWithWidget widgetType="button" title="禁用按钮" onChange={noop} disabled buttonOption={{ title: '按钮', onPress: noop }} />
          <ListItemWithWidget widgetType="circularButton" title="禁用圆形按钮" checked={false} onChange={noop} disabled circularButtonOption={{ icon: svgIcon }} />
        </Group>
      </Section>

      {/* ===== 5. subtitle ===== */}
      <Section title="subtitle">
        <Group title="带副标题">
          <ListItemWithWidget widgetType="switch" title="标题" subtitle="副标题文字" checked={switchVal} onChange={setSwitchVal} />
        </Group>
      </Section>

      {/* ===== 6. switchOption ===== */}
      <Section title="switchOption">
        <Group title="自定义开关色系">
          <ListItemWithWidget widgetType="switch" title="蓝色开关" checked={switchVal} onChange={setSwitchVal} switchOption={{ colorType: 'blue' }} />
        </Group>
      </Section>

      {/* ===== 7. buttonOption 变体 ===== */}
      <Section title="buttonOption 变体">
        <Group title="不同尺寸和类型">
          <ListItemWithWidget widgetType="button" title="小按钮 default" onChange={noop} buttonOption={{ title: '全选', onPress: () => showToast('全选'), type: 'default', size: 'small' }} />
          <ListItemWithWidget widgetType="button" title="中按钮 primary" onChange={noop} buttonOption={{ title: '操作', onPress: () => showToast('操作'), type: 'primary', size: 'medium' }} />
          <ListItemWithWidget widgetType="button" title="警告按钮" onChange={noop} buttonOption={{ title: '删除', onPress: () => showToast('删除'), type: 'warning', size: 'small' }} />
        </Group>
      </Section>
    </ScrollView>
  );
};

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

export default ListItemWithWidgetDemo;
