'use strict';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { BlockButton, DatePickerDialog, colorToken, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';
import TestComponent from '../testComponent';

const initialDate = new Date(2025, 1, 12, 10, 30);
const formatDate = (date) =>
  `${ date.getFullYear() }-${ String(date.getMonth() + 1).padStart(2, '0') }-${ String(date.getDate()).padStart(2, '0') } ${ String(
    date.getHours(),
  ).padStart(2, '0') }:${ String(date.getMinutes()).padStart(2, '0') }`;
const formatValue = (value) => Array.isArray(value) ? `${ formatDate(value[0]) } ~ ${ formatDate(value[1]) }` : formatDate(value);
const badgeDates = [new Date(2025, 1, 12), new Date(2025, 1, 14)];
const styles = dynamicStyleSheet({
  container: { flex: 1, backgroundColor: colorToken.surfacePageLow },
  result: { paddingHorizontal: 24, paddingTop: 16, color: colorToken.contentSecondaryNormal, fontSize: 14, textAlign: 'center' },
  buttonWrapper: { paddingHorizontal: 24, paddingVertical: 24, alignItems: 'center' },
  buttonContainer: { width: '100%', maxWidth: 336, alignItems: 'center' },
});

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '选择日期', category: 'content' },
  { name: 'selectionMode', type: 'enum', enumOptions: ['single', 'range'], defaultValue: 'single', category: 'state' },
  { name: 'minRangeDays', type: 'number', defaultValue: undefined, category: 'state' },
  { name: 'maxRangeDays', type: 'number', defaultValue: undefined, category: 'state' },
  { name: 'showLunarToggle', type: 'boolean', defaultValue: true, category: 'state' },
  { name: 'colorType', type: 'enum', enumOptions: ['green', 'blue', 'wathet', 'purple', 'orange'], defaultValue: 'green', category: 'state' },
  { name: 'showExactTime', type: 'boolean', defaultValue: false, category: 'state' },
  {
    name: 'value',
    type: 'pass',
    defaultValue: initialDate,
    category: 'content',
    passOptions: [
      { label: '2025-02-12 10:30', value: initialDate },
      { label: '当前时间', value: new Date() },
      { label: '日期范围 02-12 ~ 02-18', value: [initialDate, new Date(2025, 1, 18, 10, 30)] },
      { label: '不传 value（使用 defaultValue）', value: undefined },
    ],
  },
  {
    name: 'defaultValue',
    type: 'pass',
    defaultValue: initialDate,
    category: 'content',
    passOptions: [
      { label: '默认日期 2025-02-12', value: initialDate },
      { label: '默认范围 02-12 ~ 02-18', value: [initialDate, new Date(2025, 1, 18)] },
      { label: '不传（使用当前时间）', value: undefined },
    ],
  },
  {
    name: 'minDate',
    type: 'pass',
    defaultValue: undefined,
    category: 'content',
    passOptions: [
      { label: '不限最小日期', value: undefined },
      { label: '最早 2025-02-01', value: new Date(2025, 1, 1) },
    ],
  },
  {
    name: 'maxDate',
    type: 'pass',
    defaultValue: undefined,
    category: 'content',
    passOptions: [
      { label: '不限最大日期', value: undefined },
      { label: '最晚 2025-02-28', value: new Date(2025, 1, 28) },
    ],
  },
  {
    name: 'badgeDates',
    type: 'pass',
    defaultValue: badgeDates,
    category: 'content',
    passOptions: [
      { label: '无日期标记', value: undefined },
      { label: '显示日期标记', value: badgeDates },
    ],
  },
  {
    name: 'disabledDate',
    type: 'pass',
    defaultValue: undefined,
    category: 'interaction',
    passOptions: [
      { label: '不禁用日期', value: undefined },
      { label: '禁用周末', value: (date) => date.getDay() === 0 || date.getDay() === 6 },
    ],
  },
];

const DatePickerDialogConfigDemo = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialogProps, setDialogProps] = useState({});
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [events, setEvents] = useState([]);
  const previousPropsRef = useRef({});

  useEffect(() => {
    if (mounted) setVisible(true);
  }, [mounted]);

  const handlePropsChange = useCallback((nextProps) => {
    const previous = previousPropsRef.current;
    setDialogProps(nextProps);
    if (nextProps.value !== previous.value || nextProps.defaultValue !== previous.defaultValue || nextProps.selectionMode !== previous.selectionMode) {
      setSelectedDate(nextProps.value ?? nextProps.defaultValue ?? initialDate);
    }
    previousPropsRef.current = nextProps;
  }, []);

  const recordEvent = useCallback((name, value) => {
    const message = value === undefined ? name : `${ name }: ${ formatValue(value) }`;
    setEvents((previous) => [...previous.slice(-5), message]);
  }, []);

  const handleOpen = useCallback(() => {
    setEvents([]);
    setMounted(true);
  }, []);

  const handleChange = useCallback((date) => {
    setSelectedDate(date);
    recordEvent('onChange', date);
  }, [recordEvent]);

  const handleConfirm = useCallback((date) => {
    setSelectedDate(date);
    recordEvent('onConfirm', date);
    showToast(`onConfirm: ${ formatValue(date) }`);
    setVisible(false);
  }, [recordEvent]);

  const handleDismiss = useCallback(() => {
    recordEvent('onDismiss');
    setVisible(false);
    setMounted(false);
  }, [recordEvent]);

  const handleModalShow = useCallback(() => recordEvent('onModalShow'), [recordEvent]);
  const handleModalHide = useCallback(() => recordEvent('onModalHide'), [recordEvent]);

  return (
    <View style={styles.container}>
      <TestComponent component={View} propConfigs={propConfigs} onPropsChange={handlePropsChange} />
      <Text style={styles.result}>当前选择：{formatValue(selectedDate)}</Text>
      <Text style={styles.result}>交互事件：{events.length ? events.join('\n') : '等待交互'}</Text>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <BlockButton title="打开日期选择器" type="primary" onPress={handleOpen} />
        </View>
      </View>
      {mounted && (
        <DatePickerDialog
          {...dialogProps}
          visible={visible}
          value={dialogProps.value === undefined ? undefined : selectedDate}
          onChange={handleChange}
          onDismiss={handleDismiss}
          onModalShow={handleModalShow}
          onModalHide={handleModalHide}
          onConfirm={handleConfirm}
        />
      )}
    </View>
  );
};

export default DatePickerDialogConfigDemo;
