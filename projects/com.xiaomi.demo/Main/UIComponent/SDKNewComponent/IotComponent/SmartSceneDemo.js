'use strict';

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { dynamicStyleSheet } from 'miot/ui';
import { colorToken, Fonts, ContainerWithGap } from 'miot/ui/hyperOSUI';
import NavigationBar from 'miot/ui/NavigationBar';
import IftttSceneCard from '../../../../../../miot-sdk/ui/smartScene/components/IftttSceneCard';
import Images, { getImage } from '../../../../../../miot-sdk/ui/smartScene/images';

// ============== mock data helpers ==============

// 36x36 场景图标，模拟 Figma 中的设备图标样式
const SceneIcon1 = () => (
  <View style={styles.sceneIconImg}>
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
      <Rect width={36} height={36} rx={9} fill="#E8F5E9" />
      {/* <Path d="M18 10C14.686 10 12 12.686 12 16v4c0 .552.448 1 1 1h2v-6a3 3 0 116 0v6h2c.552 0 1-.448 1-1v-4c0-3.314-2.686-6-6-6z" fill="#4CAF50" /> */}
      <Path d="M15 21h6v3c0 1.105-.895 2-2 2s-2-.895-2-2v-3z" fill="#81C784" />
      <Circle cx="18" cy="13" r="1.5" fill="#2E7D32" />
    </Svg>
  </View>
);

const SceneIcon2 = () => (
  <View style={styles.sceneIconImg}>
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
      <Rect width={36} height={36} rx={9} fill="#FFF3E0" />
      <Path d="M12 12h12v4H12zM12 17h12v1H12zM12 19h12v5H12z" fill="#FF9800" />
      <Circle cx="18" cy="14" r="1.5" fill="#E65100" />
      <Path d="M15 21h6l-1 3h-4z" fill="#FFB74D" />
    </Svg>
  </View>
);

const SceneIcon3 = () => (
  <View style={styles.sceneIconImg}>
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
      <Rect width={36} height={36} rx={9} fill="#E3F2FD" />
      <Path d="M18 9c-2.5 0-4.5 1.5-5.5 3.5h11c-1-2-3-3.5-5.5-3.5z" fill="#2196F3" />
      <Path d="M12 14h12v8c0 2.5-2.5 4.5-6 4.5s-6-2-6-4.5v-8z" fill="#64B5F6" />
      <Circle cx="18" cy="18" r="2" fill="#1565C0" />
    </Svg>
  </View>
);

const SceneIcon4 = () => (
  <View style={styles.sceneIconImg}>
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
      <Rect width={36} height={36} rx={9} fill="#FCE4EC" />
      <Path d="M21 10c-2.761 0-5 2.239-5 5 0 1.5.66 2.84 1.7 3.77L18 26l-2.3-7.23A5 5 0 0121 10z" fill="#E91E63" />
      <Circle cx="21" cy="15" r="2" fill="#880E4F" />
    </Svg>
  </View>
);

const SceneIcon5 = () => (
  <View style={styles.sceneIconImg}>
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
      <Rect width={36} height={36} rx={9} fill="#F3E5F5" />
      <Rect x={9} y={9} width={18} height={18} rx={3} fill="#9C27B0" />
      <Path d="M9 14h18M9 19h18M9 24h18" stroke="#CE93D8" strokeWidth={1.5} />
      <Circle cx="18" cy="18" r="2.5" fill="#4A148C" />
    </Svg>
  </View>
);

const sceneIcons = [<SceneIcon1 />, <SceneIcon2 />, <SceneIcon3 />, <SceneIcon4 />, <SceneIcon5 />];
const SceneIcon = ({ index }) => sceneIcons[index % sceneIcons.length];

const HeaderIcon = () => (
  <View style={styles.headerIconOuter}>
    <Image source={Images['mi-log']} style={styles.headerIconInner} />
  </View>
);

// Layout: [trigger] → [action1] → [action2]
// trigger: 左边最多 1 个, action: 右边 1~2 个, 总共最多 3 个 icon
const buildTriggerIcons = (count = 1) =>
  Array.from({ length: count }, (_, i) => <SceneIcon key={`trigger-${i}`} index={i} />);

const buildActionIcons = (count = 2) =>
  Array.from({ length: count }, (_, i) => <SceneIcon key={`action-${i}`} index={i + 1} />);

const normalItem = (overrides = {}) => ({
  title: '回家场景',
  status: '已开启',
  statusTone: 'active',
  usage: '1.2万人使用',
  triggerIcons: buildTriggerIcons(1),
  actionIcons: buildActionIcons(2),
  ...overrides,
});

const longTitle = '超长场景名称超长场景名称超长场景名称超长场景名称超长场景名称超长场景名称';
const longUsage = '9999.9万人使用';

const longTitleItem = {
  ...normalItem(),
  title: longTitle,
  usage: longUsage,
};

// 只有 1 个 trigger + 1 个 action (总共 2 个 icon)
const canOpenItem = {
  title: '离家场景',
  status: '可开启',
  statusTone: 'canOpen',
  usage: '856人使用',
  triggerIcons: buildTriggerIcons(1),
  actionIcons: buildActionIcons(1),
};

// 没有 trigger, 只有 1 个 action (总共 1 个 icon)
const emptyStatusItem = {
  title: '睡眠场景',
  status: '',
  statusTone: 'normal',
  usage: '12人使用',
  triggerIcons: [],
  actionIcons: buildActionIcons(1),
};

// 1 个 trigger + 1 个 action (总共 2 个 icon)
const fewIconsItem = {
  title: '观影场景',
  status: '已开启',
  statusTone: 'active',
  usage: '3.5万人使用',
  triggerIcons: buildTriggerIcons(1),
  actionIcons: buildActionIcons(1),
};

// 1 个 trigger + 2 个 action (总共 3 个 icon, 满状态)
const manyIconsItem = {
  title: '聚会场景',
  status: '已开启',
  statusTone: 'active',
  usage: '520人使用',
  triggerIcons: buildTriggerIcons(1),
  actionIcons: buildActionIcons(2),
};

// ============== SmartSceneDemo ==============

const SmartSceneDemo = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({
      right: [],
    });
  }, []);

  const [state, setState] = useState({
    useLongTitle: false,
  });

  const toggleLongTitle = () => setState(s => ({ ...s, useLongTitle: !s.useLongTitle }));
  const reset = () => setState({ useLongTitle: false });

  const { useLongTitle } = state;

  const itemA = useLongTitle ? longTitleItem : normalItem();
  const itemB = useLongTitle
    ? { ...canOpenItem, title: longTitle, usage: longUsage }
    : canOpenItem;

  const defaultItems = [itemA, itemB];

  // Common props for the card
  const cardProps = {
    title: '智能场景',
    onPressHeader: () => console.log('onPressHeader'),
    onPressItem: (item, index) => console.log('onPressItem', index, item),
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      {/* ========== Controls ========== */}
      <Text style={styles.header}>智能场景</Text>
      <View style={styles.controlRow}>
        <Text style={styles.button} onPress={reset}>重置</Text>
        <Text style={styles.button} onPress={toggleLongTitle}>
          {useLongTitle ? '正常文案' : '长标题'}
        </Text>
      </View>

      {/* ========== 1. hasData = true (大卡模式) ========== */}
      <Text style={styles.sectionTitle}>hasData = true · 大卡模式</Text>

      <Text style={styles.subTitle}>showLeadingIcon = true (默认)</Text>
      <View style={styles.dataCard}>
        <IftttSceneCard
          {...cardProps}
          showLeadingIcon={true}
          hasData={true}
          items={defaultItems}
        />
      </View>

      <Text style={styles.subTitle}>showLeadingIcon = false</Text>
      <View style={styles.dataCard}>
        <IftttSceneCard
          {...cardProps}
          showLeadingIcon={false}
          hasData={true}
          items={defaultItems}
        />
      </View>

      {/* ========== 2. hasData = false (入口模式) ========== */}
      <Text style={styles.sectionTitle}>hasData = false · 入口模式</Text>

      <Text style={styles.subTitle}>showLeadingIcon = true (默认)</Text>
      <View style={styles.dataCard}>
        <IftttSceneCard
          {...cardProps}
          showLeadingIcon={true}
          hasData={false}
          items={[]}
        />
      </View>

      <Text style={styles.subTitle}>showLeadingIcon = false</Text>
      <View style={styles.dataCard}>
        <IftttSceneCard
          {...cardProps}
          showLeadingIcon={false}
          hasData={false}
          items={[]}
        />
      </View>

      {/* ========== 3. SceneItem 内部变体 ========== */}
      <Text style={styles.sectionTitle}>SceneItem 内部变体</Text>

      <Text style={styles.subTitle}>canOpen = true (可开启) + openStatus = false (未开启)</Text>
      <View style={styles.dataCard}>
        <IftttSceneCard
          {...cardProps}
          hasData={true}
          items={[
            normalItem({ status: '可开启', statusTone: 'canOpen' }),
            normalItem({ status: '', statusTone: 'normal' }),
          ]}
        />
      </View>

      <Text style={styles.subTitle}>openStatus = true (已开启=绿色) + 少图标 (1 trigger + 1 action)</Text>
      <View style={styles.dataCard}>
        <IftttSceneCard
          {...cardProps}
          hasData={true}
          items={[fewIconsItem, emptyStatusItem]}
        />
      </View>

      <Text style={styles.subTitle}>满图标 (1 trigger + 2 action, 共 3 个)</Text>
      <View style={styles.dataCard}>
        <IftttSceneCard
          {...cardProps}
          hasData={true}
          items={[manyIconsItem, normalItem()]}
        />
      </View>

          </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  headerIconOuter: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerIconInner: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  sceneIconImg: {
    width: 36,
    height: 36,
    borderRadius: 9,
    resizeMode: 'contain',
  },
  page: {
    backgroundColor: colorToken.surfacePageLow,
  },
  content: {
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 12,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentSecondaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 12,
    ...Fonts.fontSystem24Medium,
  },
  controlRow: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    fontSize: 14,
    color: colorToken.accentBlueFill,
    lineHeight: 24,
  },
  sectionTitle: {
    color: colorToken.accentOsFill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
    ...Fonts.fontSystem13Regular,
  },
  subTitle: {
    color: colorToken.contentQuaternaryNormal,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginTop: 8,
    ...Fonts.fontSystem12Regular,
  },
  dataCard: {
    marginTop: 4,
  },
});

export default SmartSceneDemo;