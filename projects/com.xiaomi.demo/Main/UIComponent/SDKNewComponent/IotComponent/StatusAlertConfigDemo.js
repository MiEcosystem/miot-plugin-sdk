'use strict';

import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusAlert, colorToken, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const ICON_TYPES = ['warning', 'fault', 'consumable', 'offline', 'reminder', 'custom'];
const ACTION_TYPES = ['none', 'navigate', 'button', 'buttonGroup', 'custom'];
const PRESENTATIONS = ['page', 'modal'];

const MODE_OPTIONS = [
  { label: '单条', value: 'single' },
  { label: '堆叠-2条', value: 'stack2' },
  { label: '堆叠-3条', value: 'stack3' },
  { label: '堆叠-4条', value: 'stack4' },
];

const customActionNode = (
  <Text style={{ fontSize: 12, color: colorToken.accentBluePrimary }}>自定义操作</Text>
);

const customIconNode = (
  <Text style={{ fontSize: 20 }}>🔔</Text>
);

const StatusAlertConfigDemo = () => {
  const [mode, setMode] = useState('single');
  const [title, setTitle] = useState('这是一条状态提示');
  const [overline, setOverline] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [warning, setWarning] = useState(false);
  const [leadingIconType, setLeadingIconType] = useState('reminder');
  const [actionType, setActionType] = useState('none');
  const [trailingNavigate, setTrailingNavigate] = useState(false);
  const [presentation, setPresentation] = useState('page');
  const [stackTitle, setStackTitle] = useState('状态提示');

  const buildSingleAlert = useCallback(() => {
    const item = {
      title,
      actionType,
      warning,
      presentation,
      trailingNavigate,
      onPress: actionType === 'navigate' ? () => showToast('navigate pressed') : undefined,
    };
    if (leadingIconType === 'custom') {
      item.leadingIconType = 'custom';
      item.leadingIcon = customIconNode;
    } else {
      item.leadingIconType = leadingIconType;
    }
    if (overline) item.overline = overline;
    if (subtitle) item.subtitle = subtitle;
    if (actionType === 'button') {
      item.buttons = [{ text: '操作', onPress: () => showToast('按钮点击') }];
    }
    if (actionType === 'buttonGroup') {
      item.buttons = [
        { text: '忽略', onPress: () => showToast('忽略') },
        { text: '重试', onPress: () => showToast('重试') },
      ];
    }
    if (actionType === 'custom') {
      item.customAction = customActionNode;
    }
    return item;
  }, [title, overline, subtitle, warning, leadingIconType, actionType, trailingNavigate, presentation]);

  const alerts = useMemo(() => {
    const first = buildSingleAlert();
    if (mode === 'single') return [first];
    if (mode === 'stack2') {
      return [first, { title: '提示信息 2', leadingIconType: 'fault', warning: true }];
    }
    if (mode === 'stack3') {
      return [
        first,
        { title: '提示信息 2', leadingIconType: 'fault', warning: true },
        { title: '提示信息 3', leadingIconType: 'consumable' },
      ];
    }
    return [
      first,
      { title: '提示信息 2', leadingIconType: 'fault', warning: true },
      { title: '提示信息 3', leadingIconType: 'consumable' },
      { title: '提示信息 4', leadingIconType: 'offline' },
    ];
  }, [mode, buildSingleAlert]);

  const renderChip = (label, selected, onPress, key) => (
    <TouchableOpacity
      key={key}
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.preview}>
        <StatusAlert
          alerts={alerts}
          stackTitle={mode !== 'single' ? stackTitle : undefined}
          onPress={mode !== 'single' ? () => showToast('stack pressed') : undefined}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>模式</Text>
        <View style={styles.chipRow}>
          {MODE_OPTIONS.map((opt) => renderChip(opt.label, mode === opt.value, () => setMode(opt.value), opt.value))}
        </View>
      </View>

      {mode !== 'single' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>stackTitle</Text>
          <TextInput style={styles.input} value={stackTitle} onChangeText={setStackTitle} placeholder="堆叠标题" placeholderTextColor={colorToken.contentQuaternaryNormal} />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="标题文案" placeholderTextColor={colorToken.contentQuaternaryNormal} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>overline</Text>
        <TextInput style={styles.input} value={overline} onChangeText={setOverline} placeholder="不传则不显示" placeholderTextColor={colorToken.contentQuaternaryNormal} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>subtitle</Text>
        <TextInput style={styles.input} value={subtitle} onChangeText={setSubtitle} placeholder="不传则不显示" placeholderTextColor={colorToken.contentQuaternaryNormal} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>presentation</Text>
        <View style={styles.chipRow}>
          {PRESENTATIONS.map((p) => renderChip(p, presentation === p, () => setPresentation(p), p))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>warning</Text>
        <View style={styles.chipRow}>
          {renderChip('true', warning === true, () => setWarning(true), 'w-true')}
          {renderChip('false', warning === false, () => setWarning(false), 'w-false')}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>leadingIconType</Text>
        <View style={styles.chipRow}>
          {ICON_TYPES.map((t) => renderChip(t, leadingIconType === t, () => setLeadingIconType(t), t))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>actionType</Text>
        <View style={styles.chipRow}>
          {ACTION_TYPES.map((t) => renderChip(t, actionType === t, () => setActionType(t), t))}
        </View>
      </View>

      {actionType === 'button' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>trailingNavigate</Text>
          <View style={styles.chipRow}>
            {renderChip('true', trailingNavigate === true, () => setTrailingNavigate(true), 'tn-true')}
            {renderChip('false', trailingNavigate === false, () => setTrailingNavigate(false), 'tn-false')}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  preview: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  section: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 12,
    color: colorToken.contentTertiaryNormal,
    marginBottom: 6,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colorToken.fillPrimary,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  chipSelected: {
    backgroundColor: colorToken.accentOsSubtle,
    borderWidth: 1,
    borderColor: colorToken.accentOsFill,
  },
  chipText: {
    fontSize: 13,
    color: colorToken.contentTertiaryNormal,
  },
  chipTextSelected: {
    color: colorToken.accentOsContent,
  },
  input: {
    borderWidth: 1,
    borderColor: colorToken.dividerPrimary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    color: colorToken.contentPrimaryNormal,
    backgroundColor: colorToken.fillPrimary,
  },
});

export default StatusAlertConfigDemo;
