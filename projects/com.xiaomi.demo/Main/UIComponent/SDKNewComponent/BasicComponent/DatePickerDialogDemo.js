'use strict';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Host } from 'miot';
import { ScrollView, Text, View } from 'react-native';
import NavigationBar from 'miot/ui/NavigationBar';
import { BlockButton, DatePickerDialog, ListCard, ListItem, colorToken, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

const formatDate = (date) => `${ date.getFullYear() }-${ String(date.getMonth() + 1).padStart(2, '0') }-${ String(date.getDate()).padStart(2, '0') } ${ String(date.getHours()).padStart(2, '0') }:${ String(date.getMinutes()).padStart(2, '0') }`;
const formatValue = (value) => Array.isArray(value) ? `${ formatDate(value[0]) } ~ ${ formatDate(value[1]) }` : formatDate(value);
const badgeDates = [new Date(2025, 1, 12), new Date(2025, 1, 14)];
const dateTimeTitles = {
  zh: '日期与时间',
  zh_CN: '日期与时间',
  zh_tw: '日期與時間',
  zh_hk: '日期與時間',
  en: 'Date & time',
};

const DatePickerDialogDemo = ({ navigation }) => {
  const [activeExample, setActiveExample] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 1, 12, 10, 30));
  const [selectedRange, setSelectedRange] = useState([new Date(2025, 1, 12), new Date(2025, 1, 18)]);
  const [events, setEvents] = useState([]);
  const headerConfigured = useRef(false);
  const dateTimeTitle = dateTimeTitles[Host.locale.language] || dateTimeTitles[Host.locale.language?.split('-')[0]] || dateTimeTitles.en;
  const isRange = activeExample === 'range';

  useEffect(() => {
    if (activeExample) setVisible(true);
  }, [activeExample]);

  const recordEvent = useCallback((name, value) => {
    const message = value === undefined ? name : `${ name }: ${ formatValue(value) }`;
    setEvents((previous) => [...previous.slice(-5), message]);
  }, []);

  const handleChange = useCallback((value) => {
    if (Array.isArray(value)) setSelectedRange(value);
    else setSelectedDate(value);
    recordEvent('onChange', value);
  }, [recordEvent]);

  const handleConfirm = useCallback((value) => {
    if (Array.isArray(value)) setSelectedRange(value);
    else setSelectedDate(value);
    recordEvent('onConfirm', value);
    showToast(`onConfirm: ${ formatValue(value) }`);
    setVisible(false);
  }, [recordEvent]);

  const handleDismiss = useCallback(() => {
    recordEvent('onDismiss');
    setVisible(false);
    setActiveExample(null);
  }, [recordEvent]);

  const handleModalShow = useCallback(() => recordEvent('onModalShow'), [recordEvent]);
  const handleModalHide = useCallback(() => recordEvent('onModalHide'), [recordEvent]);

  useEffect(() => {
    if (headerConfigured.current) return;
    headerConfigured.current = true;
    navigation.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => navigation.navigate('DatePickerDialogConfigDemo', { title: 'DatePickerDialog 配置调试' }),
        },
      ],
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ListCard title="日期选择">
        <ListItem title="月历日期选择（支持农历）" onPress={() => setActiveExample('date')} />
        <ListItem title={dateTimeTitle} onPress={() => setActiveExample('datetime')} />
        <ListItem title="日期范围选择" onPress={() => setActiveExample('range')} />
      </ListCard>
      <Text style={styles.result}>当前日期：{formatValue(selectedDate)}</Text>
      <Text style={styles.result}>当前范围：{formatValue(selectedRange)}</Text>
      <Text style={styles.result}>交互事件：{events.length ? events.join('\n') : '等待交互'}</Text>
      {activeExample && (
        <DatePickerDialog
          visible={visible}
          title={isRange ? '选择日期范围' : activeExample === 'datetime' ? dateTimeTitle : '选择日期'}
          selectionMode={isRange ? 'range' : 'single'}
          value={isRange ? selectedRange : selectedDate}
          showLunarToggle={activeExample === 'date'}
          showExactTime={activeExample === 'datetime'}
          badgeDates={badgeDates}
          onChange={handleChange}
          onConfirm={handleConfirm}
          onDismiss={handleDismiss}
          onModalShow={handleModalShow}
          onModalHide={handleModalHide}
        />
      )}
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <BlockButton title="打开配置调试" type="normal" onPress={() => navigation.navigate('DatePickerDialogConfigDemo')} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: { flex: 1, backgroundColor: colorToken.surfacePageLow },
  content: { paddingHorizontal: 12, paddingTop: 20, paddingBottom: 40 },
  result: { paddingHorizontal: 12, paddingTop: 20, color: colorToken.contentSecondaryNormal, fontSize: 14, textAlign: 'center' },
  buttonWrapper: { paddingHorizontal: 12, paddingTop: 24, alignItems: 'center' },
  buttonContainer: { width: '100%', maxWidth: 336, alignItems: 'center' },
});

export default DatePickerDialogDemo;
