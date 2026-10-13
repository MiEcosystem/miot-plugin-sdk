'use strict';

import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Device, Service } from 'miot';
import SettingsHyperOS from 'miot/ui/SettingsHyperOS';
import featureInnerOptions from 'miot/ui/SettingsHyperOS/featureOptions';
import commonInnerOptions from 'miot/ui/SettingsHyperOS/commonOptions';
import useModelType from 'miot/hooks/useModelType';
import useDeviceRoomInfo from 'miot/hooks/useDeviceRoomInfo';
import { colorToken, Fonts, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const LABELS = {
  memberSet: '按键设置',
  multipleKeySplit: '多键拆分',
  createGroup: '创建群组',
  manageGroup: '管理群组',
  btGateway: '蓝牙网关',
  bleMeshGateway: 'Mesh 网关',
  voiceAuth: '语音授权',
  deviceCall: '设备来电',
  deviceService: '设备服务',
  share: '共享设备',
  ifttt: '智能场景',
  firmwareUpgrade: '固件升级',
  help: '使用帮助',
  security: '安全设置',
  addToDesktop: '添加到桌面',
  usedOnMiHome: '在米家中使用',
  freqDevice: '常用设备',
  freqCamera: '常用摄像机',
  defaultPlugin: '默认插件',
  pairMode: '配对模式',
};

// 门控元数据直接取自 SDK，避免在 demo 里维护一份会漂移的副本
const buildItems = (innerOptions) => Object.entries(innerOptions)
  .filter(([, option]) => !!option.exportKey)
  .map(([key, option]) => ({
    key,
    exportKey: option.exportKey,
    label: LABELS[key] || key,
    isDefault: !!option.isDefault,
    option,
  }));

const FEATURE_ITEMS = buildItems(featureInnerOptions);
const COMMON_ITEMS = buildItems(commonInnerOptions);
const ALL_ITEMS = [...FEATURE_ITEMS, ...COMMON_ITEMS];

const OTA_AUTH_TYPES = [0, 1, 4, 5];

const PRIVACY_URL = require('../../../../Resources/raw/privacy_zh.html');
const AGREEMENT_URL = require('../../../../Resources/raw/license_zh.html');

// 部分入口与设备/spec 强绑定，真机只能命中一部分。这里按门控条件反推出几组档位，
// 轮着切就能把 11 个声明式入口都点出来；档位之间有互斥项，单台设备不可能同时满足
const MOCK_PROFILES = [
  {
    id: 'switch',
    label: '开关面板',
    desc: '按键设置 / 多键拆分 / 蓝牙网关 / 语音授权 / 配对模式',
    fields: {
      type: '1',
      model: 'xiaomi.switch.b1',
      deviceID: 'M.switch01',
      isOwner: true,
      isVoiceDevice: true,
      deviceConfigInfo: { bt_gateway: 1, mesh_gateway: 0, permission_control: 0 },
    },
  },
  {
    id: 'lightNew',
    label: '灯 · 可建组',
    desc: '创建群组（type 非 6/17）',
    fields: {
      type: '1',
      model: 'yeelink.light.lamp1',
      deviceID: '123456001',
      isOwner: true,
      isVoiceDevice: false,
      deviceConfigInfo: { bt_gateway: 1, mesh_gateway: 0, permission_control: 0 },
    },
  },
  {
    id: 'lightGroup',
    label: '灯 · 已建组',
    desc: '管理群组（type=17）；此档创建群组必然消失',
    fields: {
      type: '17',
      model: 'yeelink.light.lamp1',
      deviceID: '123456002',
      isOwner: true,
      isVoiceDevice: false,
      deviceConfigInfo: { bt_gateway: 1, mesh_gateway: 0, permission_control: 0 },
    },
  },
  {
    id: 'philips',
    label: '飞利浦灯',
    desc: '设备来电（仅 philips.light.flat）',
    fields: {
      type: '1',
      model: 'philips.light.flat',
      deviceID: '123456003',
      isOwner: true,
      isVoiceDevice: false,
      deviceConfigInfo: { bt_gateway: 1, mesh_gateway: 0, permission_control: 0 },
    },
  },
  {
    id: 'mesh',
    label: 'Mesh 网关',
    desc: 'Mesh 网关（与蓝牙网关互斥）',
    fields: {
      type: '1',
      model: 'xiaomi.gateway.mesh1',
      deviceID: '123456004',
      isOwner: true,
      isVoiceDevice: false,
      deviceConfigInfo: { bt_gateway: 1, mesh_gateway: 1, permission_control: 0 },
    },
  },
  {
    id: 'camera',
    label: '摄像机',
    desc: '常用摄像机（品类 camera）',
    fields: {
      type: '1',
      model: 'chuangmi.camera.ipc019',
      deviceID: '123456005',
      isOwner: true,
      isVoiceDevice: false,
      deviceConfigInfo: { bt_gateway: 1, mesh_gateway: 0, permission_control: 0 },
    },
  },
  {
    id: 'cloud',
    label: '云设备',
    desc: '在米家中使用（type=14）',
    fields: {
      type: '14',
      model: 'xiaomi.aircondition.c1',
      deviceID: '123456006',
      isOwner: true,
      isVoiceDevice: false,
      deviceConfigInfo: { bt_gateway: 1, mesh_gateway: 0, permission_control: 0 },
    },
  },
];

const MOCK_FIELDS = ['type', 'model', 'deviceID', 'isOwner', 'isVoiceDevice', 'deviceConfigInfo'];

// 这些字段在 BasicDevice.prototype 上是 getter，给实例定义同名 own property 即可遮蔽，
// delete 之后自动回落到原 getter，所以离开本页要复原，避免污染其他 demo 页
const applyMockDevice = (profile) => {
  MOCK_FIELDS.forEach((field) => {
    delete Device[field];
  });
  if (!profile) {
    return;
  }
  Object.entries(profile.fields).forEach(([field, value]) => {
    Object.defineProperty(Device, field, { value, configurable: true, enumerable: true });
  });
};

const buildInitialVisible = () => ALL_ITEMS.reduce((acc, item) => {
  acc[item.key] = true;
  return acc;
}, {});

// 复刻 getItems 的过滤条件，用来告诉使用者「打开了却不显示」的原因
const getBlockedReason = (option, ctx) => {
  const { type, modelType, isOwner, isHomeManager } = ctx;
  const {
    types, notTypes, modelTypes, notModelTypes, ownerOnly, homeManagerAllowed, validator,
  } = option;
  if (types && !types.includes(type)) {
    return `需 type ∈ ${ JSON.stringify(types) }，当前 ${ type }`;
  }
  if (notTypes && notTypes.includes(type)) {
    return `type ${ type } 被排除`;
  }
  if (modelTypes && !modelTypes.includes(modelType)) {
    return `需品类 ∈ ${ JSON.stringify(modelTypes) }，当前 ${ modelType || '未知' }`;
  }
  if (notModelTypes && notModelTypes.includes(modelType)) {
    return `品类 ${ modelType } 被排除`;
  }
  if (ownerOnly && !(isOwner || isHomeManager && homeManagerAllowed)) {
    return homeManagerAllowed ? '仅设备拥有者或家庭管理员' : '仅设备拥有者';
  }
  if (validator instanceof Function) {
    // validator 直接解引用 Device.model / deviceID，字段缺失时会抛，诊断不能因此整页崩
    try {
      if (!validator({ modelType })) {
        return 'validator 未通过（设备能力不匹配）';
      }
    } catch (e) {
      return 'validator 执行异常（设备信息缺失）';
    }
  }
  return null;
};

const Chip = ({ label, active, onPress }) => (
  <TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
    <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const OptionRow = ({ item, visible, dot, blockedReason, onToggleVisible, onToggleDot }) => (
  <View style={styles.row}>
    <View style={styles.rowHead}>
      <Text style={styles.rowText} numberOfLines={1}>
        {item.label}
        <Text style={styles.rowKey}> {item.exportKey}</Text>
      </Text>
      <Chip label={visible ? '开' : '关'} active={visible} onPress={onToggleVisible} />
      <Chip label="红点" active={dot} onPress={onToggleDot} />
    </View>
    {visible && blockedReason ? (
      <Text style={styles.blocked}>不显示：{blockedReason}</Text>
    ) : null}
    {visible && !blockedReason && item.option.Component ? (
      <Text style={styles.hint}>门控通过，但该项由组件自渲染，可能因内部数据为空仍不显示</Text>
    ) : null}
  </View>
);

const SettingsHyperOSDemo = ({ navigation }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [visibleMap, setVisibleMap] = useState(buildInitialVisible);
  const [dotMap, setDotMap] = useState({});
  const [showDeleteButton, setShowDeleteButton] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(true);
  const [hideAgreement, setHideAgreement] = useState(true);
  const [otaAuthType, setOtaAuthType] = useState(5);
  const [customPreset, setCustomPreset] = useState('full');
  const [switchOn, setSwitchOn] = useState(false);
  const [mockProfileId, setMockProfileId] = useState(null);

  const modelType = useModelType();
  const { permitLevel } = useDeviceRoomInfo() || {};

  // 切档后立即改 Device 再触发重渲染，这样本次渲染读到的就是新字段
  const selectMockProfile = (id) => {
    const profile = MOCK_PROFILES.find((p) => p.id === id) || null;
    applyMockDevice(profile);
    setMockProfileId(profile ? profile.id : null);
  };

  useEffect(() => () => applyMockDevice(null), []);

  const activeProfile = MOCK_PROFILES.find((p) => p.id === mockProfileId) || null;

  const gateCtx = useMemo(() => ({
    type: Device.type,
    modelType,
    isOwner: Device.isOwner,
    isHomeManager: permitLevel === 9,
  }), [modelType, permitLevel, mockProfileId]);

  const blockedMap = useMemo(() => ALL_ITEMS.reduce((acc, item) => {
    acc[item.key] = getBlockedReason(item.option, gateCtx);
    return acc;
  }, {}), [gateCtx]);

  const toggleVisible = (key) => setVisibleMap((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleDot = (key) => setDotMap((prev) => ({ ...prev, [key]: !prev[key] }));

  // options 与 defaultOptions 取并集，默认项传了也去不掉，
  // 想去掉只能进 excludeRequiredOptions —— 两个数组语义相反，所以按 isDefault 分流
  const options = useMemo(
    () => ALL_ITEMS.filter((item) => !item.isDefault && visibleMap[item.key]).map((item) => item.key),
    [visibleMap]
  );
  const excludeRequiredOptions = useMemo(
    () => ALL_ITEMS.filter((item) => item.isDefault && !visibleMap[item.key]).map((item) => item.key),
    [visibleMap]
  );
  // showDots 的解构默认值只兜 undefined，传 null 会在 showDots.includes 处抛错
  const showDot = useMemo(
    () => Object.keys(dotMap).filter((key) => dotMap[key]),
    [dotMap]
  );

  const extraOptions = useMemo(() => ({
    showUpgrade,
    bleOtaAuthType: otaAuthType,
    deleteDeviceMessage: 'test',
    excludeRequiredOptions,
    option: {
      privacyURL: PRIVACY_URL,
      agreementURL: AGREEMENT_URL,
      experiencePlanURL: '',
      hideAgreement,
    },
  }), [showUpgrade, otaAuthType, hideAgreement, excludeRequiredOptions]);

  // 自定义项不过设备门控，是本 demo 里最稳定能看到变化的部分；
  // 开关项的 checked/onChange 被原样透传，state 必由这里持有
  const featureCustomOptions = useMemo(() => {
    if (customPreset === 'none') {
      return [];
    }
    const entrance = {
      id: 'customEntrance',
      title: '设置页自定义项',
      value: '跳转自定义页面',
      badge: true,
      onPress: () => Service.scene.openIftttAutoPage(),
    };
    if (customPreset === 'entrance') {
      return [entrance];
    }
    return [entrance, {
      id: 'customSwitch',
      title: '自定义开关项',
      actionType: 'switch',
      checked: switchOn,
      onChange: setSwitchOn,
    }, {
      id: 'customButton',
      title: '自定义按钮项',
      actionType: 'button',
      buttonOption: {
        title: '执行',
        onPress: () => showToast('自定义按钮触发'),
      },
    }];
  }, [customPreset, switchOn]);

  const deviceInfoCustomOptions = useMemo(() => [{
    id: 'infoCustomEntrance',
    title: '更多设备信息页自定义项',
    actionType: 'none',
    onPress: () => Service.scene.openIftttAutoPage(),
  }], []);

  const blockedCount = ALL_ITEMS.filter((item) => visibleMap[item.key] && blockedMap[item.key]).length;

  const renderGroup = (title, items) => (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item) => (
        <OptionRow
          key={item.key}
          item={item}
          visible={!!visibleMap[item.key]}
          dot={!!dotMap[item.key]}
          blockedReason={blockedMap[item.key]}
          onToggleVisible={() => toggleVisible(item.key)}
          onToggleDot={() => toggleDot(item.key)}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.root}>
      {/* 切档后必须重挂,Component 型选项的数据 hook 只在挂载时取一次 */}
      <SettingsHyperOS
        key={mockProfileId || 'real'}
        navigation={navigation}
        options={options}
        showDot={showDot}
        extraOptions={extraOptions}
        featureCustomOptions={featureCustomOptions}
        deviceInfoCustomOptions={deviceInfoCustomOptions}
        showDeleteButton={showDeleteButton}
      />

      <View style={styles.panel}>
        <TouchableOpacity style={styles.panelHandle} onPress={() => setPanelOpen((v) => !v)}>
          <Text style={styles.panelHandleText}>
            {panelOpen ? '收起配置面板 ▾' : `配置面板 ▴  ${ blockedCount } 项因设备门控不显示`}
          </Text>
        </TouchableOpacity>

        {panelOpen ? (
          <ScrollView style={styles.panelBody} contentContainerStyle={styles.panelContent}>
            <Text style={styles.note}>
              本面板只存在于 demo，作用是调 props 后观察设置页变化；真实插件直接写死 props 即可。
              「开/关」控制是否传入，不等于一定看得见 —— 被设备门控挡下时该行下方给出原因。
            </Text>

            <Text style={styles.sectionTitle}>模拟设备（临时覆盖 Device 字段，离开本页自动复原）</Text>
            <View style={styles.chipRow}>
              <Chip label="真实设备" active={!mockProfileId} onPress={() => selectMockProfile(null)} />
              {MOCK_PROFILES.map((profile) => (
                <Chip
                  key={profile.id}
                  label={profile.label}
                  active={mockProfileId === profile.id}
                  onPress={() => selectMockProfile(profile.id)}
                />
              ))}
            </View>
            <Text style={styles.note}>
              {activeProfile ? `可点出：${ activeProfile.desc }` : '未模拟，按真机实际能力显示'}
              {'\n'}当前 type={String(Device.type)} model={String(Device.model)} 品类={modelType || '未知'}
              {Device.isOwner ? ' 拥有者' : ' 非拥有者'}{permitLevel === 9 ? ' 家庭管理员' : ''}
              {'\n'}档位间存在互斥（管理群组要 type=17，创建群组要 type≠17；Mesh 网关与蓝牙网关只能二选一），
              单台设备无法同时点出所有入口，需轮换档位。另有 9 项由组件自渲染、数据取自后端接口，
              模拟设备只能让其通过门控，不保证显示。
            </Text>

            {renderGroup('「功能设置」区的 SDK 内置项（7 个，自定义项追加在这区末尾）', FEATURE_ITEMS)}
            {renderGroup('「通用设置」区的 SDK 内置项（13 个，该区不支持自定义项）', COMMON_ITEMS)}

            <Text style={styles.sectionTitle}>
              featureCustomOptions：插件自传的自定义项（不受门控，改完必然生效）
            </Text>
            <View style={styles.chipRow}>
              {[
                { key: 'none', label: '不传' },
                { key: 'entrance', label: '仅入口项' },
                { key: 'full', label: '入口+开关+按钮' },
              ].map(({ key, label }) => (
                <Chip key={key} label={label} active={customPreset === key} onPress={() => setCustomPreset(key)} />
              ))}
            </View>

            <Text style={styles.sectionTitle}>其他 props</Text>
            <View style={styles.chipRow}>
              <Chip
                label={`showDeleteButton: ${ showDeleteButton }`}
                active={showDeleteButton}
                onPress={() => setShowDeleteButton((v) => !v)}
              />
              <Chip
                label={`showUpgrade: ${ showUpgrade }`}
                active={showUpgrade}
                onPress={() => setShowUpgrade((v) => !v)}
              />
              <Chip
                label={`hideAgreement: ${ hideAgreement }`}
                active={hideAgreement}
                onPress={() => setHideAgreement((v) => !v)}
              />
            </View>

            <Text style={styles.sectionTitle}>bleOtaAuthType</Text>
            <View style={styles.chipRow}>
              {OTA_AUTH_TYPES.map((type) => (
                <Chip
                  key={type}
                  label={String(type)}
                  active={otaAuthType === type}
                  onPress={() => setOtaAuthType(type)}
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>实际传入组件的值</Text>
            <Text style={styles.code}>options: {JSON.stringify(options)}</Text>
            <Text style={styles.code}>excludeRequiredOptions: {JSON.stringify(excludeRequiredOptions)}</Text>
            <Text style={styles.code}>showDot: {JSON.stringify(showDot)}</Text>
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
};

// SettingsHyperOS 自绘 NavigationBar,不声明会与 demo 栈的 header 叠成两层
SettingsHyperOSDemo.navigationOptions = { header: null };

const styles = dynamicStyleSheet({
  root: { flex: 1 },
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colorToken.surfaceCardPrimary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: { paddingVertical: 10, alignItems: 'center' },
  panelHandleText: { ...Fonts.fontSystem12Regular, color: colorToken.contentTertiaryNormal },
  panelBody: { maxHeight: 340 },
  panelContent: { paddingHorizontal: 16, paddingBottom: 32 },
  note: {
    ...Fonts.fontSystem12Regular,
    color: colorToken.contentTertiaryNormal,
    marginBottom: 4,
    lineHeight: 17,
  },
  sectionTitle: {
    ...Fonts.fontSystem12Regular,
    color: colorToken.contentTertiaryNormal,
    marginTop: 12,
    marginBottom: 4,
  },
  row: { paddingVertical: 4 },
  rowHead: { flexDirection: 'row', alignItems: 'center' },
  rowText: { ...Fonts.fontSystem13Medium, color: colorToken.contentPrimaryNormal, flex: 1 },
  rowKey: { ...Fonts.fontSystem12Regular, color: colorToken.contentQuaternaryNormal },
  blocked: { ...Fonts.fontSystem12Regular, color: colorToken.accentOrangeContent, marginTop: 2 },
  hint: { ...Fonts.fontSystem12Regular, color: colorToken.contentQuaternaryNormal, marginTop: 2 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -3 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colorToken.fillPrimary,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  chipActive: { backgroundColor: colorToken.accentOsSubtle },
  chipText: { ...Fonts.fontSystem12Regular, color: colorToken.contentTertiaryNormal },
  chipTextActive: { color: colorToken.accentOsContent },
  code: { ...Fonts.fontSystem12Regular, color: colorToken.contentSecondaryNormal, marginTop: 2 },
});

export default SettingsHyperOSDemo;
