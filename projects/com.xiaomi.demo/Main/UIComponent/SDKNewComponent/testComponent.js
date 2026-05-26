'use strict';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { showToast, radiusToken } from 'miot/ui/hyperOSUI';
import { ConfigContext } from 'mhui-rn/dist/components/configProvider';

const CATEGORY_LABELS = {
  content: '内容',
  state: '状态',
  interaction: '交互',
  resource: '资源',
  render: '渲染',
};

const CATEGORY_ORDER = ['content', 'state', 'interaction', 'resource', 'render'];

const TestComponent = ({ component: Component, propConfigs, onPropsChange, showPreviewBg = true }) => {
  const [propValues, setPropValues] = useState({});
  const [editingProp, setEditingProp] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const { colorToken } = useContext(ConfigContext);
  const COLORS = useMemo(
    () => ({
      selectedBorder: colorToken.accentOsFill,
      selectedBg: colorToken.accentOsSubtle,
      selectedText: colorToken.accentOsContent,
      unselectedBg: colorToken.fillPrimary,
      unselectedText: colorToken.contentTertiaryNormal,
      titleText: colorToken.contentTertiaryNormal,
      cardBg: colorToken.surfaceCardPrimary,
      cardBorder: colorToken.dividerPrimary,
      inputBg: colorToken.fillPrimary,
      inputBorder: colorToken.dividerPrimary,
      placeholderColor: colorToken.contentQuaternaryNormal,
      pageBg: colorToken.surfacePageLow,
      textColor: colorToken.contentPrimaryNormal,
    }),
    [colorToken]
  );

  useEffect(() => {
    const initialValues = {};
    propConfigs.forEach((config) => {
      switch (config.type) {
        case 'string':
          initialValues[config.name] = config.defaultValue ?? '';
          break;
        case 'number':
          initialValues[config.name] = config.defaultValue ?? 0;
          break;
        case 'boolean':
          initialValues[config.name] = config.defaultValue ?? false;
          break;
        case 'enum':
          initialValues[config.name] = config.defaultValue ?? config.enumOptions?.[0] ?? undefined;
          break;
        case 'pass':
          initialValues[config.name] = config.defaultValue ?? undefined;
          break;
        case 'array':
          initialValues[config.name] = config.defaultValue ?? [];
          break;
        case 'object':
          if (config.defaultValue !== undefined) {
            initialValues[config.name] = config.defaultValue;
          } else if (config.objectProps && config.objectProps.length > 0) {
            const objValue = {};
            config.objectProps.forEach((prop) => {
              if (prop.defaultValue !== undefined) {
                objValue[prop.name] = prop.defaultValue;
              } else {
                switch (prop.type) {
                  case 'string': objValue[prop.name] = ''; break;
                  case 'number': objValue[prop.name] = 0; break;
                  case 'boolean': objValue[prop.name] = false; break;
                  case 'enum': objValue[prop.name] = prop.enumOptions?.[0] ?? undefined; break;
                  case 'pass': objValue[prop.name] = undefined; break;
                  case 'array': objValue[prop.name] = []; break;
                  default: objValue[prop.name] = undefined;
                }
              }
            });
            initialValues[config.name] = objValue;
          } else {
            initialValues[config.name] = {};
          }
          break;
        default:
      }
    });
    setPropValues(initialValues);
  }, [propConfigs]);

  useEffect(() => {
    if (onPropsChange) onPropsChange(propValues);
  }, [propValues, onPropsChange]);

  const handleConfirm = () => {
    if (editingProp) {
      const config = propConfigs.find((c) => c.name === editingProp);
      if (config) {
        if (config.type === 'number') {
          const num = parseFloat(editingValue);
          setPropValues((prev) => ({ ...prev, [editingProp]: isNaN(num) ? 0 : num }));
        } else {
          setPropValues((prev) => ({ ...prev, [editingProp]: editingValue }));
        }
      }
    }
    setEditingProp(null);
    setEditingValue('');
  };

  const handleCancel = () => { setEditingProp(null); setEditingValue(''); };
  const handleSetNull = (propName) => { setPropValues((prev) => ({ ...prev, [propName]: null })); };
  const handleSetUndefined = (propName) => { setPropValues((prev) => ({ ...prev, [propName]: undefined })); };
  const handleBooleanChange = (propName, value) => { setPropValues((prev) => ({ ...prev, [propName]: value })); };
  const handleEnumSelect = (propName, value) => { setPropValues((prev) => ({ ...prev, [propName]: value })); };

  const handleArrayStartEditing = (config) => {
    setEditingProp(config.name);
    const currentValue = propValues[config.name];
    setEditingValue(Array.isArray(currentValue) ? JSON.stringify(currentValue) : '');
  };

  const handleArrayConfirm = () => {
    if (editingProp) {
      try {
        const parsed = JSON.parse(editingValue);
        if (Array.isArray(parsed)) {
          setPropValues((prev) => ({ ...prev, [editingProp]: parsed }));
        } else { showToast('输入必须是数组类型'); return; }
      } catch (e) { showToast('无效的JSON格式'); return; }
    }
    setEditingProp(null);
    setEditingValue('');
  };

  const setDeep = (root, path, val) => {
    if (root == null) return root;
    const keys = path.split('.');
    if (keys.length === 1) {
      const k = keys[0];
      if (Array.isArray(root)) {
        const idx = parseInt(k, 10);
        if (!isNaN(idx) && idx >= 0 && idx < root.length) { const next = [...root]; next[idx] = val; return next; }
      }
      return { ...root, [k]: val };
    }
    const [first, ...rest] = keys;
    const child = Array.isArray(root) ? root[parseInt(first, 10)] : root?.[first];
    if (child == null) return root;
    const updated = setDeep(child, rest.join('.'), val);
    if (Array.isArray(root)) { const idx = parseInt(first, 10); const next = [...root]; next[idx] = updated; return next; }
    return { ...root, [first]: updated };
  };

  const handleObjectPropertyUpdate = (propName, propertyName, value) => {
    setPropValues((prev) => ({ ...prev, [propName]: setDeep(prev[propName], propertyName, value) }));
  };
  const handleObjectPropertyNull = (propName, propertyName) => { handleObjectPropertyUpdate(propName, propertyName, null); };
  const handleObjectPropertyUndefined = (propName, propertyName) => { handleObjectPropertyUpdate(propName, propertyName, undefined); };

  const handleObjectPropertyPassPreset = (propName, propertyName, presetType) => {
    let value;
    switch (presetType) {
      case 'function': value = (...args) => { console.log(`Function ${ propName }.${ propertyName } called with:`, args); }; break;
      case 'reactNode': value = 'ReactNode'; break;
      default: value = undefined;
    }
    handleObjectPropertyUpdate(propName, propertyName, value);
  };

  const handleObjectPropertyPassCustom = (propName, propertyName, customValue) => {
    try { handleObjectPropertyUpdate(propName, propertyName, JSON.parse(customValue)); } catch { handleObjectPropertyUpdate(propName, propertyName, customValue); }
  };

  const buildLinkedCallback = (config) => {
    if (config.type !== 'pass' || !config.linkTo) return propValues[config.name];
    const original = propValues[config.name];
    const { targetProp, pick, transform } = config.linkTo;
    return (...args) => {
      if (typeof original === 'function') original(...args);
      const picked = pick ? pick(...args) : args[0];
      const nextValue = transform ? transform(picked, args) : picked;
      setPropValues((prev) => ({ ...prev, [targetProp]: nextValue }));
    };
  };

  const renderOptionButton = (label, isSelected, onPress, key) => (
    <TouchableOpacity
      key={key}
      style={[styles.optionButton, {
        backgroundColor: isSelected ? COLORS.selectedBg : COLORS.unselectedBg,
        borderWidth: isSelected ? 1 : 0,
        borderColor: isSelected ? COLORS.selectedBorder : 'transparent',
      }]}
      onPress={onPress}
    >
      <Text style={[styles.optionButtonText, { color: isSelected ? COLORS.selectedText : COLORS.unselectedText }]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderPropEditor = (config) => {
    const currentValue = propValues[config.name];
    const isEditing = editingProp === config.name;

    switch (config.type) {
      case 'string':
        return (
          <View style={[styles.propSection, { backgroundColor: COLORS.cardBg, borderBottomColor: COLORS.cardBorder }]}>
            <Text style={[styles.propLabel, { color: COLORS.titleText }]}>{config.name}</Text>
            <View style={styles.optionsRow}>
              <TextInput style={[styles.textInput, { flex: 1, backgroundColor: COLORS.inputBg, borderColor: COLORS.inputBorder, color: COLORS.textColor }]}
                value={typeof currentValue === 'string' ? currentValue : ''} onChangeText={(text) => { setPropValues((prev) => ({ ...prev, [config.name]: text })); }}
                placeholder={currentValue === undefined ? 'undefined' : '输入文本'} placeholderTextColor={COLORS.placeholderColor} />
              {renderOptionButton('undefined', currentValue === undefined, () => handleSetUndefined(config.name))}
            </View>
            {config.passOptions && config.passOptions.length > 0 && (
              <View style={styles.optionsRow}>
                {config.passOptions.map((opt, i) => renderOptionButton(opt.label, currentValue === opt.value, () => setPropValues((prev) => ({ ...prev, [config.name]: opt.value })), `str-opt-${ i }`))}
              </View>
            )}
          </View>
        );
      case 'number':
        return (
          <View style={[styles.propSection, { backgroundColor: COLORS.cardBg, borderBottomColor: COLORS.cardBorder }]}>
            <Text style={[styles.propLabel, { color: COLORS.titleText }]}>{config.name}</Text>
            {isEditing ? (
              <View style={styles.editingContainer}>
                <TextInput style={[styles.textInput, { backgroundColor: COLORS.inputBg, borderColor: COLORS.inputBorder, color: COLORS.textColor }]}
                  value={editingValue} autoFocus keyboardType="numeric" onChangeText={setEditingValue} placeholder="输入数字" placeholderTextColor={COLORS.placeholderColor} />
                <View style={styles.optionsRow}>
                  {renderOptionButton('确认', true, handleConfirm)}
                  {renderOptionButton('取消', false, handleCancel)}
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.optionsRow}>
                  <TextInput style={[styles.textInput, { flex: 1, backgroundColor: COLORS.inputBg, borderColor: COLORS.inputBorder, color: COLORS.textColor }]}
                    value={currentValue === undefined ? '' : String(currentValue)} keyboardType="numeric"
                    onChangeText={(text) => { const num = parseFloat(text); setPropValues((prev) => ({ ...prev, [config.name]: isNaN(num) ? undefined : num })); }}
                    placeholder="undefined" placeholderTextColor={COLORS.placeholderColor} />
                  {renderOptionButton('undefined', currentValue === undefined, () => handleSetUndefined(config.name))}
                </View>
                {config.passOptions && config.passOptions.length > 0 && (
                  <View style={styles.optionsRow}>
                    {config.passOptions.map((opt, i) => renderOptionButton(opt.label, currentValue === opt.value, () => setPropValues((prev) => ({ ...prev, [config.name]: opt.value })), `num-opt-${ i }`))}
                  </View>
                )}
              </View>
            )}
          </View>
        );
      case 'boolean':
        return (
          <View style={[styles.propSection, { backgroundColor: COLORS.cardBg, borderBottomColor: COLORS.cardBorder }]}>
            <Text style={[styles.propLabel, { color: COLORS.titleText }]}>{config.name}</Text>
            <View style={styles.optionsRow}>
              {renderOptionButton('true', currentValue === true, () => handleBooleanChange(config.name, true))}
              {renderOptionButton('false', currentValue === false, () => handleBooleanChange(config.name, false))}
              {renderOptionButton('undefined', currentValue === undefined, () => handleSetUndefined(config.name))}
            </View>
          </View>
        );
      case 'enum':
        return (
          <View style={[styles.propSection, { backgroundColor: COLORS.cardBg, borderBottomColor: COLORS.cardBorder }]}>
            <Text style={[styles.propLabel, { color: COLORS.titleText }]}>{config.name}</Text>
            <View style={styles.optionsRow}>
              {config.enumOptions?.map((option) => renderOptionButton(option, currentValue === option, () => handleEnumSelect(config.name, option), option))}
              {renderOptionButton('undefined', currentValue === undefined, () => handleSetUndefined(config.name))}
            </View>
          </View>
        );
      case 'pass':
        return (
          <View style={[styles.propSection, { backgroundColor: COLORS.cardBg, borderBottomColor: COLORS.cardBorder }]}>
            <Text style={[styles.propLabel, { color: COLORS.titleText }]}>{config.name}</Text>
            <View style={styles.optionsRow}>
              {config.passOptions?.map((opt, i) => renderOptionButton(opt.label, currentValue === opt.value, () => setPropValues((prev) => ({ ...prev, [config.name]: opt.value })), `pass-${ i }`))}
              {renderOptionButton('null', currentValue === null, () => handleSetNull(config.name))}
              {renderOptionButton('undefined', currentValue === undefined, () => handleSetUndefined(config.name))}
            </View>
          </View>
        );
      case 'array': {
        const isEditingArray = editingProp === config.name;
        return (
          <View style={[styles.propSection, { backgroundColor: COLORS.cardBg, borderBottomColor: COLORS.cardBorder }]}>
            <Text style={[styles.propLabel, { color: COLORS.titleText }]}>{config.name}</Text>
            <View style={[styles.passValueDisplay, { borderColor: COLORS.inputBorder }]}>
              <Text style={[styles.passValueText, { color: COLORS.textColor }]}>
                {currentValue === undefined ? 'undefined' : currentValue === null ? 'null' : JSON.stringify(currentValue)}
              </Text>
            </View>
            {isEditingArray ? (
              <View style={styles.editingContainer}>
                <TextInput style={[styles.textInput, { backgroundColor: COLORS.inputBg, borderColor: COLORS.inputBorder, color: COLORS.textColor }]}
                  value={editingValue} autoFocus onChangeText={setEditingValue} placeholder='输入数组 (JSON格式): [1, 2, "three"]' placeholderTextColor={COLORS.placeholderColor} />
                <View style={styles.optionsRow}>
                  {renderOptionButton('确认', true, handleArrayConfirm)}
                  {renderOptionButton('取消', false, handleCancel)}
                </View>
              </View>
            ) : (
              <View style={styles.optionsRow}>
                {renderOptionButton('编辑数组', false, () => handleArrayStartEditing(config))}
                {renderOptionButton('null', currentValue === null, () => handleSetNull(config.name))}
                {renderOptionButton('undefined', currentValue === undefined, () => handleSetUndefined(config.name))}
              </View>
            )}
          </View>
        );
      }
      case 'object':
        return (
          <View style={[styles.propSection, { backgroundColor: COLORS.cardBg, borderBottomColor: COLORS.cardBorder }]}>
            <Text style={[styles.propLabel, { color: COLORS.titleText }]}>{config.name}</Text>
            <View style={[styles.passValueDisplay, { borderColor: COLORS.inputBorder }]}>
              <Text style={[styles.passValueText, { color: COLORS.textColor }]}>
                {currentValue === undefined ? 'undefined' : currentValue === null ? 'null' : JSON.stringify(currentValue)}
              </Text>
            </View>
            {config.objectProps && config.objectProps.length > 0 && (
              <View style={[styles.objectPropsSection, { borderLeftColor: COLORS.cardBorder }]}>
                {config.objectProps.map((propConfig) => {
                  const propValue = propConfig.name.includes('.') ? propConfig.name.split('.').reduce((obj, k) => obj?.[k], currentValue) : currentValue?.[propConfig.name];
                  return (
                    <View key={propConfig.name} style={styles.objectPropItem}>
                      <Text style={[styles.propLabel, { color: COLORS.titleText }]}>{propConfig.name} ({propConfig.type})</Text>
                      {propConfig.type === 'string' && (<View style={styles.optionsRow}><TextInput style={[styles.textInput, { flex: 1, backgroundColor: COLORS.inputBg, borderColor: COLORS.inputBorder, color: COLORS.textColor }]} value={propValue ?? ''} placeholder="输入文本" placeholderTextColor={COLORS.placeholderColor} onChangeText={(text) => handleObjectPropertyUpdate(config.name, propConfig.name, text)} />{renderOptionButton('undefined', propValue === undefined, () => handleObjectPropertyUndefined(config.name, propConfig.name))}</View>)}
                      {propConfig.type === 'number' && (<View style={styles.optionsRow}><TextInput style={[styles.textInput, { flex: 1, backgroundColor: COLORS.inputBg, borderColor: COLORS.inputBorder, color: COLORS.textColor }]} value={propValue?.toString() ?? ''} placeholder="输入数字" placeholderTextColor={COLORS.placeholderColor} keyboardType="numeric" onChangeText={(text) => { const num = parseFloat(text); handleObjectPropertyUpdate(config.name, propConfig.name, isNaN(num) ? undefined : num); }} />{renderOptionButton('undefined', propValue === undefined, () => handleObjectPropertyUndefined(config.name, propConfig.name))}</View>)}
                      {propConfig.type === 'boolean' && (<View style={styles.optionsRow}>{renderOptionButton('true', propValue === true, () => handleObjectPropertyUpdate(config.name, propConfig.name, true))}{renderOptionButton('false', propValue === false, () => handleObjectPropertyUpdate(config.name, propConfig.name, false))}{renderOptionButton('undefined', propValue === undefined, () => handleObjectPropertyUndefined(config.name, propConfig.name))}</View>)}
                      {propConfig.type === 'enum' && propConfig.enumOptions && (<View style={styles.optionsRow}>{propConfig.enumOptions.map((option) => renderOptionButton(option, propValue === option, () => handleObjectPropertyUpdate(config.name, propConfig.name, option), option))}{renderOptionButton('undefined', propValue === undefined, () => handleObjectPropertyUndefined(config.name, propConfig.name))}</View>)}
                      {propConfig.type === 'pass' && (<View>{propConfig.passOptions && propConfig.passOptions.length > 0 && (<View style={styles.optionsRow}>{propConfig.passOptions.map((opt, i) => renderOptionButton(opt.label, propValue === opt.value, () => handleObjectPropertyUpdate(config.name, propConfig.name, opt.value), `sub-pass-${ propConfig.name }-${ i }`))}</View>)}{(!propConfig.passOptions || propConfig.passOptions.length === 0) && (<View style={styles.optionsRow}><TextInput style={[styles.textInput, { flex: 1, backgroundColor: COLORS.inputBg, borderColor: COLORS.inputBorder, color: COLORS.textColor }]} defaultValue="" placeholder="自定义值 (JSON)" placeholderTextColor={COLORS.placeholderColor} onSubmitEditing={(e) => { const text = e.nativeEvent.text.trim(); if (text) handleObjectPropertyPassCustom(config.name, propConfig.name, text); }} /></View>)}<View style={styles.optionsRow}>{(!propConfig.passOptions || propConfig.passOptions.length === 0) && renderOptionButton('f function', typeof propValue === 'function', () => handleObjectPropertyPassPreset(config.name, propConfig.name, 'function'))}{(!propConfig.passOptions || propConfig.passOptions.length === 0) && renderOptionButton('ReactNode', propValue === 'ReactNode', () => handleObjectPropertyPassPreset(config.name, propConfig.name, 'reactNode'))}{renderOptionButton('null', propValue === null, () => handleObjectPropertyNull(config.name, propConfig.name))}{renderOptionButton('undefined', propValue === undefined, () => handleObjectPropertyUndefined(config.name, propConfig.name))}</View></View>)}
                      {propConfig.type === 'array' && (<View><View style={styles.optionsRow}><TextInput style={[styles.textInput, { flex: 1, backgroundColor: COLORS.inputBg, borderColor: COLORS.inputBorder, color: COLORS.textColor }]} value={propValue ? JSON.stringify(propValue) : ''} placeholder="输入数组 (JSON格式)" placeholderTextColor={COLORS.placeholderColor} onChangeText={(text) => { if (text === '') handleObjectPropertyUpdate(config.name, propConfig.name, []); }} onSubmitEditing={(e) => { const text = e.nativeEvent.text.trim(); if (text) { try { const parsed = JSON.parse(text); if (Array.isArray(parsed)) handleObjectPropertyUpdate(config.name, propConfig.name, parsed); else showToast('输入必须是数组类型'); } catch { showToast('无效的JSON格式'); } } }} /></View><View style={styles.optionsRow}>{renderOptionButton('[1,2,3]', false, () => handleObjectPropertyUpdate(config.name, propConfig.name, [1, 2, 3]))}{renderOptionButton('["a","b"]', false, () => handleObjectPropertyUpdate(config.name, propConfig.name, ['a', 'b']))}{renderOptionButton('null', propValue === null, () => handleObjectPropertyNull(config.name, propConfig.name))}{renderOptionButton('undefined', propValue === undefined, () => handleObjectPropertyUndefined(config.name, propConfig.name))}</View></View>)}
                    </View>
                  );
                })}
              </View>
            )}
            {config.passOptions && config.passOptions.length > 0 && (
              <View style={styles.optionsRow}>
                {config.passOptions.map((opt, i) => renderOptionButton(opt.label, currentValue === opt.value, () => setPropValues((prev) => ({ ...prev, [config.name]: opt.value })), `obj-pass-${ i }`))}
              </View>
            )}
            <View style={styles.optionsRow}>
              {renderOptionButton('null', currentValue === null, () => handleSetNull(config.name))}
              {renderOptionButton('undefined', currentValue === undefined, () => handleSetUndefined(config.name))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const groupedConfigs = useMemo(() => {
    const groups = {};
    const uncategorized = [];
    propConfigs.forEach((config) => {
      const cat = config.category;
      if (cat) { if (!groups[cat]) groups[cat] = []; groups[cat].push(config); } else { uncategorized.push(config); }
    });
    return { groups, uncategorized };
  }, [propConfigs]);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.pageBg }]}>
      <View style={[styles.previewSection, { backgroundColor: showPreviewBg ? colorToken.surfaceCardTranslucent : 'transparent' }]}>
        <View style={styles.previewContainer}>
          <Component
            {...propValues}
            {...propConfigs.reduce((acc, config) => {
              if (config.type === 'pass' && config.linkTo) acc[config.name] = buildLinkedCallback(config);
              return acc;
            }, {})}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        {CATEGORY_ORDER.map((cat) => {
          const configs = groupedConfigs.groups[cat];
          if (!configs || configs.length === 0) return null;
          return (
            <View key={cat}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: COLORS.titleText }]}>{CATEGORY_LABELS[cat]}</Text>
              </View>
              {configs.map((config) => (<View key={config.name}>{renderPropEditor(config)}</View>))}
            </View>
          );
        })}
        {groupedConfigs.uncategorized.length > 0 && groupedConfigs.uncategorized.map((config) => <View key={config.name}>{renderPropEditor(config)}</View>)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  previewSection: { marginHorizontal: 12, borderRadius: radiusToken.cardLarge, overflow: 'hidden' },
  previewContainer: { justifyContent: 'center' },
  scrollArea: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  sectionHeader: { paddingVertical: 6, paddingHorizontal: 12 },
  sectionTitle: { fontSize: 12 },
  propSection: { paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 0.5 },
  propLabel: { fontSize: 12, fontWeight: '500', marginBottom: 8 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4, alignItems: 'center' },
  optionButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginHorizontal: 4, marginVertical: 4 },
  optionButtonText: { fontSize: 13 },
  editingContainer: { marginVertical: -4 },
  textInput: { borderWidth: 1, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, fontSize: 13 },
  passValueDisplay: { borderWidth: 1, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 8 },
  passValueText: { fontSize: 12 },
  objectPropsSection: { marginTop: 4, marginBottom: 8, paddingLeft: 12, borderLeftWidth: 2 },
  objectPropItem: { paddingVertical: 8 },
});

export default TestComponent;
