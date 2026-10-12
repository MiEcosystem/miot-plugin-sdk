'use strict';

import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ActionSheet, colorToken, Fonts, showToast } from 'miot/ui/hyperOSUI';
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';

// ─── 选项：type 类型验收 ─────────────────────────────────────────────
const optionsDefault = [
  { label: '选项一（default）', type: 'default', onPress: () => showToast('onPress: 选项一') },
  { label: '选项二（default）', type: 'default', onPress: () => showToast('onPress: 选项二') },
];

const optionsWarning = [
  { label: '普通选项', type: 'default', onPress: () => showToast('onPress: 普通') },
  { label: '警告选项（warning）', type: 'warning', onPress: () => showToast('onPress: 警告') },
];

const optionsEmphasisBlue = [
  { label: '普通选项', type: 'default', onPress: () => showToast('onPress: 普通') },
  { label: '强调蓝色', type: 'emphasis', colorType: 'blue', onPress: () => showToast('onPress: 蓝色强调') },
  { label: '强调蓝色（禁用）', type: 'emphasis', colorType: 'blue', disabled: true },
];

const optionsEmphasisGreen = [
  { label: '普通选项', type: 'default', onPress: () => showToast('onPress: 普通') },
  { label: '强调绿色', type: 'emphasis', colorType: 'green', onPress: () => showToast('onPress: 绿色强调') },
  { label: '强调绿色（禁用）', type: 'emphasis', colorType: 'green', disabled: true },
];

const optionsEmphasisOrange = [
  { label: '普通选项', type: 'default', onPress: () => showToast('onPress: 普通') },
  { label: '强调橙色', type: 'emphasis', colorType: 'orange', onPress: () => showToast('onPress: 橙色强调') },
  { label: '强调橙色（禁用）', type: 'emphasis', colorType: 'orange', disabled: true },
];

const optionsEmphasisPurple = [
  { label: '普通选项', type: 'default', onPress: () => showToast('onPress: 普通') },
  { label: '强调紫色', type: 'emphasis', colorType: 'purple', onPress: () => showToast('onPress: 紫色强调') },
  { label: '强调紫色（禁用）', type: 'emphasis', colorType: 'purple', disabled: true },
];

const optionsEmphasisWathet = [
  { label: '普通选项', type: 'default', onPress: () => showToast('onPress: 普通') },
  { label: '强调天蓝', type: 'emphasis', colorType: 'wathet', onPress: () => showToast('onPress: 天蓝强调') },
  { label: '强调天蓝（禁用）', type: 'emphasis', colorType: 'wathet', disabled: true },
];

// ─── 选项：disabled 验收 ─────────────────────────────────────────────
const optionsDisabledDefault = [
  { label: '正常 default', type: 'default', onPress: () => showToast('onPress: 正常default') },
  { label: '禁用 default', type: 'default', disabled: true },
];

const optionsDisabledWarning = [
  { label: '正常 warning', type: 'warning', onPress: () => showToast('onPress: 正常warning') },
  { label: '禁用 warning', type: 'warning', disabled: true },
];

// ─── 选项：多语言/超长文字验收 ────────────────────────────────────────
const optionsLongChinese = [
  { label: '这是一段非常非常非常非非常非常非常非常非常非常长的中文选项文字，用于验证超长多行文本的显示效果是否正确用于验证超长多行文本的显示效果是否正确', onPress: () => showToast('onPress: 超长中文') },
  { label: '删除（警告）', type: 'warning', onPress: () => showToast('onPress: 删除') },
];

const optionsLongEnglish = [
  { label: 'This is an extremely long English option label designed to verify that multi-line text rendering works correctly and the layout does not break when content exceeds three lines', onPress: () => showToast('onPress: Long EN') },
  { label: 'Delete (Warning)', type: 'warning', onPress: () => showToast('onPress: Delete') },
];

const optionsLongArabic = [
  { label: 'هذا نص عربي طويل جداً يهدف إلى التحقق من صحة عرض النصوص الطويلة متعددة الأسطر وضمان أن التخطيط لا ينكسر عند تجاوز المحتوى لثلاثة أسطر أو أكثر في القائمة', onPress: () => showToast('onPress: Arabic') },
  { label: 'حذف (تحذير)', type: 'warning', onPress: () => showToast('onPress: Delete') },
];

const optionsLongJapanese = [
  { label: 'これは非常に長い日本語のオプションラベルで、複数行のテキストレンダリングが正しく機能することを確認し、コンテンツが三行を超えた場合でもレイアウトが崩れないことを検証するためのものです', onPress: () => showToast('onPress: Japanese') },
  { label: '削除（警告）', type: 'warning', onPress: () => showToast('onPress: Delete') },
];

// ─── propConfigs ─────────────────────────────────────────────────────
const propConfigs = [
  {
    name: 'title',
    type: 'string',
    defaultValue: '请选择操作',
    category: 'content',
  },
  {
    name: 'options',
    type: 'pass',
    category: 'content',
    defaultValue: optionsDefault,
    passOptions: [
      // type 类型
      { label: 'type: default × 2', value: optionsDefault },
      { label: 'type: default + warning', value: optionsWarning },
      // emphasis colorType
      { label: 'emphasis blue', value: optionsEmphasisBlue },
      { label: 'emphasis green', value: optionsEmphasisGreen },
      { label: 'emphasis orange', value: optionsEmphasisOrange },
      { label: 'emphasis purple', value: optionsEmphasisPurple },
      { label: 'emphasis wathet', value: optionsEmphasisWathet },
      // disabled
      { label: 'disabled: default', value: optionsDisabledDefault },
      { label: 'disabled: warning', value: optionsDisabledWarning },
      // 多语言/超长
      { label: '超长中文', value: optionsLongChinese },
      { label: 'Long English', value: optionsLongEnglish },
      { label: 'Arabic RTL', value: optionsLongArabic },
      { label: 'Long Japanese', value: optionsLongJapanese },
    ],
  },
  {
    name: 'cancelText',
    type: 'string',
    defaultValue: '取消',
    category: 'content',
  },
];

const ActionSheetConfigDemo = () => {
  const [visible, setVisible] = useState(false);
  const [sheetProps, setSheetProps] = useState({});

  return (
    <View style={styles.container}>
      <TestComponent
        component={View}
        propConfigs={propConfigs}
        onPropsChange={(props) => setSheetProps(props)}
      />
      <ActionSheet
        {...sheetProps}
        visible={visible}
        onCancel={() => setVisible(false)}
      />
      <TouchableOpacity style={styles.trigger} onPress={() => setVisible(true)}>
        <Text style={styles.triggerText}>点击拉起 ActionSheet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  trigger: {
    marginHorizontal: 24,
    marginVertical: 24,
    borderRadius: 12,
    backgroundColor: colorToken.accentBlueSubtle,
    paddingVertical: 14,
    alignItems: 'center',
  },
  triggerText: {
    ...Fonts.fontSystem16Medium,
    color: colorToken.accentBlueContent,
  },
});

export default ActionSheetConfigDemo;
