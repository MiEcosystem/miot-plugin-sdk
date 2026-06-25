'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  PageLayout, ListCard, ListItem, ListItemWithWidget, CardHeader,
  ActionBlock, StatusAlert, colorToken, Fonts,
} from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';

const noop = () => {};

const ToggleRow = ({ label, value, onToggle }) => (
  <TouchableOpacity style={styles.toggleRow} onPress={onToggle}>
    <Text style={styles.toggleLabel}>{label}</Text>
    <View style={[styles.toggleDot, value && styles.toggleDotActive]} />
  </TouchableOpacity>
);

const PageLayoutConfigDemo = ({ navigation }) => {
  const [showBackground, setShowBackground] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [showAlertContainer, setShowAlertContainer] = useState(true);
  const [contentType, setContentType] = useState('rich');

  return (
    <PageLayout>
      {showBackground && (
        <PageLayout.Background>
          <View style={styles.bgGradient} />
        </PageLayout.Background>
      )}
      {showHeader && (
        <PageLayout.Header>
          <View style={styles.headerArea}>
            <Text style={styles.deviceName}>智能空调</Text>
            <Text style={styles.deviceStatus}>制冷中 · 26°C</Text>
          </View>
        </PageLayout.Header>
      )}
      {showAlertContainer && (
        <PageLayout.AlertContainer>
          <StatusAlert alerts={[{ title: '固件版本 2.5.1 可用', leadingIconType: 'reminder', actionType: 'navigate', onPress: noop }]} />
        </PageLayout.AlertContainer>
      )}
      <PageLayout.Content>
        {contentType === 'rich' && <CardHeader title="快捷操作" />}
        {contentType === 'rich' && (
          <ActionBlock
            maxColumns={3}
            options={[
              { title: '制冷', icon: <Circle fill={colorToken.accentBlueFill} />, onPress: noop },
              { title: '制热', icon: <Circle fill={colorToken.accentOrangeFill} />, onPress: noop },
              { title: '送风', icon: <Circle fill={colorToken.accentGreenFill} />, onPress: noop },
            ]}
          />
        )}
        {contentType === 'rich' && (
          <ListCard title="常用设置">
            <ListItem title="温度" value="26°C" onPress={noop} />
            <ListItem title="风速" value="自动" onPress={noop} />
          </ListCard>
        )}
        {contentType === 'rich' && (
          <ListCard title="开关">
            <ListItemWithWidget title="节能模式" onChange={noop} />
            <ListItemWithWidget title="睡眠模式" checked onChange={noop} />
          </ListCard>
        )}
        {contentType === 'simple' && (
          <ListCard title="设置">
            <ListItem title="设置项 1" value="值" onPress={noop} />
            <ListItem title="设置项 2" value="值" onPress={noop} />
          </ListCard>
        )}
      </PageLayout.Content>
      <PageLayout.Footer>
        <ScrollView style={styles.panel} contentContainerStyle={styles.panelContent}>
          <Text style={styles.panelTitle}>Slot 控制</Text>
          <ToggleRow label="Background" value={showBackground} onToggle={() => setShowBackground((v) => !v)} />
          <ToggleRow label="Header" value={showHeader} onToggle={() => setShowHeader((v) => !v)} />
          <ToggleRow label="AlertContainer" value={showAlertContainer} onToggle={() => setShowAlertContainer((v) => !v)} />

          <Text style={styles.panelTitle}>Content 内容</Text>
          <View style={styles.optionsRow}>
            {['rich', 'simple', 'empty'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.optionBtn, contentType === type && styles.optionBtnActive]}
                onPress={() => setContentType(type)}
              >
                <Text style={[styles.optionText, contentType === type && styles.optionTextActive]}>
                  {type === 'rich' ? '丰富' : type === 'simple' ? '简单' : '空'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </PageLayout.Footer>
    </PageLayout>
  );
};

const styles = dynamicStyleSheet({
  panel: {
    maxHeight: 220,
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
  bgGradient: { height: 260, backgroundColor: colorToken.accentBlueSubtle },
  headerArea: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16, alignItems: 'center' },
  deviceName: { ...Fonts.fontSystem20Medium, color: colorToken.contentPrimaryNormal },
  deviceStatus: { ...Fonts.fontSystem14Regular, color: colorToken.accentBlueFill, marginTop: 4 },
});

export default PageLayoutConfigDemo;
