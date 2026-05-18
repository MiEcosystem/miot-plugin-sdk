'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  SubpageLayout, ListCard, ListItem, ListItemWithWidget,
  SelectList, BlockButton, Separator, StatusAlert, colorToken, Fonts, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const noop = () => {};

const ToggleRow = ({ label, value, onToggle }) => (
  <TouchableOpacity style={styles.toggleRow} onPress={onToggle}>
    <Text style={styles.toggleLabel}>{label}</Text>
    <View style={[styles.toggleDot, value && styles.toggleDotActive]} />
  </TouchableOpacity>
);

const SubpageLayoutConfigDemo = () => {
  const [showBackground, setShowBackground] = useState(false);
  const [showSubHeader, setShowSubHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [contentType, setContentType] = useState('full');
  const [mode, setMode] = useState('auto');

  return (
    <SubpageLayout>
      {showBackground && (
        <SubpageLayout.Background>
          <View style={styles.bgGradient} />
        </SubpageLayout.Background>
      )}
      {showSubHeader && (
        <SubpageLayout.SubHeader>
          <StatusAlert alerts={[{ title: '滤网需要更换，建议尽快处理', leadingIconType: 'warning', warning: true, actionType: 'navigate', onPress: noop }]} />
        </SubpageLayout.SubHeader>
      )}
      <SubpageLayout.Content>
        {contentType === 'full' && (
          <>
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
          </>
        )}
        {contentType === 'simple' && (
          <ListCard title="设置">
            <ListItem title="设置项 1" value="值" onPress={noop} />
            <ListItem title="设置项 2" value="值" onPress={noop} />
            <ListItem title="设置项 3" value="值" onPress={noop} />
          </ListCard>
        )}
        {contentType === 'select' && (
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
        )}
      </SubpageLayout.Content>
      <SubpageLayout.Footer>
        {showFooter && (
          <View style={styles.footer}>
            <BlockButton title="保存设置" type="primary" onPress={() => showToast('保存')} />
          </View>
        )}
        <ScrollView style={styles.panel} contentContainerStyle={styles.panelContent}>
          <Text style={styles.panelTitle}>Slot 控制</Text>
          <ToggleRow label="Background" value={showBackground} onToggle={() => setShowBackground((v) => !v)} />
          <ToggleRow label="SubHeader" value={showSubHeader} onToggle={() => setShowSubHeader((v) => !v)} />
          <ToggleRow label="Footer（按钮）" value={showFooter} onToggle={() => setShowFooter((v) => !v)} />

          <Text style={styles.panelTitle}>Content 内容</Text>
          <View style={styles.optionsRow}>
            {[
              { key: 'full', label: '完整' },
              { key: 'simple', label: '简单' },
              { key: 'select', label: '选择列表' },
            ].map(({ key, label }) => (
              <TouchableOpacity
                key={key}
                style={[styles.optionBtn, contentType === key && styles.optionBtnActive]}
                onPress={() => setContentType(key)}
              >
                <Text style={[styles.optionText, contentType === key && styles.optionTextActive]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SubpageLayout.Footer>
    </SubpageLayout>
  );
};

const styles = dynamicStyleSheet({
  panel: {
    maxHeight: 180,
    backgroundColor: colorToken.surfaceCardPrimary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  panelContent: {
    paddingBottom: 40,
  },
  panelTitle: {
    ...Fonts.fontSystem12Regular,
    color: colorToken.contentTertiaryNormal,
    marginTop: 8,
    marginBottom: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  toggleLabel: { ...Fonts.fontSystem14Medium, color: colorToken.contentPrimaryNormal },
  toggleDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colorToken.fillPrimary,
  },
  toggleDotActive: { backgroundColor: colorToken.accentGreenFill },
  optionsRow: { flexDirection: 'row', marginVertical: 4 },
  optionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colorToken.fillPrimary,
    marginRight: 8,
  },
  optionBtnActive: { backgroundColor: colorToken.accentOsSubtle },
  optionText: { ...Fonts.fontSystem13Medium, color: colorToken.contentTertiaryNormal },
  optionTextActive: { color: colorToken.accentOsContent },
  footer: { paddingHorizontal: 24, paddingVertical: 12 },
  bgGradient: { flex: 1, backgroundColor: colorToken.accentRedSubtle },
});

export default SubpageLayoutConfigDemo;
