import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ConfigContext,
  CardContainer,
  CardHeader,
  ContainerWithGap,
  LargeListEntrance,
  TouchableView,
  Fonts,
  radiusToken
} from 'mhui-rn/dist/hyperOS';
import BaseArrow from 'mhui-rn/dist/icons/BaseArrow';
import { referenceReport } from 'mhui-rn/dist/decorators/reportDecorator';
import { AccessibilityRoles, getAccessibilityConfig } from 'mhui-rn/dist/utils/accessibility-helper';
const ITEM_HEIGHT = 140;
const ITEM_GAP = 8;
const ARROW_SIZE = 20;
/**
 * IftttSceneCard
 * 基于 mhui-rn SmartSceneCard 的本地拷贝,用于 SmartScene 自动化推荐入口
 * 双场景推荐展示;hasData=false 时塌陷为入口行
 */
const FlowArrow = ({ disabled }) => {
  const { colorToken } = useContext(ConfigContext);
  const fill = disabled ? colorToken.contentDisabledSecondary : colorToken.contentDisabledPrimary;
  return (
    <View style={styles.flowArrow}>
      <BaseArrow width={ARROW_SIZE} height={ARROW_SIZE} fill={fill} />
    </View>
  );
};
const getStatusColor = (colorToken, tone, disabled) => {
  if (disabled) return colorToken.contentDisabledPrimary;
  if (tone === 'canOpen') return colorToken.accentGreenContent;
  return colorToken.contentQuaternaryNormal;
};
const SceneItem = ({ item, disabled, onPress }) => {
  const { colorToken } = useContext(ConfigContext);
  const statusColor = getStatusColor(colorToken, item.statusTone, disabled);
  const titleColor = disabled ? colorToken.contentDisabledPrimary : colorToken.contentSecondaryNormal;
  const usageColor = disabled ? colorToken.contentDisabledPrimary : colorToken.contentQuaternaryNormal;
  const dividerColor = disabled ? colorToken.contentDisabledSecondary : colorToken.dividerSecondary;
  const triggerIcons = item.triggerIcons && item.triggerIcons.length > 0 ? item.triggerIcons : [];
  const actionIcons = item.actionIcons && item.actionIcons.length > 0 ? item.actionIcons.slice(0, 2) : [];
  return (
    <TouchableView
      disabled={disabled}
      onPress={onPress}
      pressType="button"
      viewStyle={[
        styles.item,
        { backgroundColor: colorToken.fillQuaternary },
        disabled ? styles.disabledOpacity : null
      ]}
      {...getAccessibilityConfig({
        accessibilityRole: AccessibilityRoles.button,
        accessibilityState: { disabled },
        accessibilityLabel: item.title
      })}
    >
      <View style={styles.titleContainer}>
        <Text
          numberOfLines={2}
          allowFontScaling={false}
          style={[Fonts.fontSystem16Medium, { color: titleColor }]}
        >
          {item.title}
        </Text>
        <View style={styles.subtitleRow}>
          {!!item.status && (
            <Text
              numberOfLines={1}
              allowFontScaling={false}
              style={[Fonts.fontSystem12Regular, styles.statusText, { color: statusColor }]}
            >
              {item.status}
            </Text>
          )}
          {!!item.status && (
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />
          )}
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            ellipsizeMode="tail"
            style={[Fonts.fontSystem12Regular, styles.usageText, { color: usageColor }]}
          >
            {item.usage}
          </Text>
        </View>
      </View>
      <View style={styles.iconRow}>
        {triggerIcons.map((icon, index) => (
          <React.Fragment key={`trigger-${ index }`}>{icon}</React.Fragment>
        ))}
        {triggerIcons.length > 0 && actionIcons.length > 0 ? <FlowArrow disabled={disabled} /> : null}
        {actionIcons.map((icon, index) => (
          <React.Fragment key={`action-${ index }`}>
            {index > 0 ? <FlowArrow disabled={disabled} /> : null}
            {icon}
          </React.Fragment>
        ))}
      </View>
    </TouchableView>
  );
};
const IftttSceneCard = (props) => {
  const {
    title = '',
    headerIcon,
    disabled = false,
    wear = false,
    hasData = true,
    items = [],
    onPressHeader,
    onPressItem,
    accessible,
    accessibilityLabel,
    accessibilityHint,
    showLeadingIcon = true
  } = props;
  useEffect(() => {
    referenceReport('IftttSceneCard');
  }, []);
  const cardRadius = wear ? radiusToken.cardExtraLarge : radiusToken.cardLarge;
  const noop = () => {};
  if (!hasData) {
    return (
      <CardContainer viewStyle={{ borderRadius: cardRadius }}>
        <LargeListEntrance
          title={title}
          leadingIcon={showLeadingIcon && headerIcon}
          disabled={disabled}
          onPress={onPressHeader || noop}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
        />
      </CardContainer>
    );
  }
  const showItems = items.length === 2;
  return (
    <CardContainer viewStyle={{ borderRadius: cardRadius }}>
      <CardHeader
        title={title}
        actionType="navigate"
        disabled={disabled}
        leadingIcon={headerIcon}
        onPress={onPressHeader || noop}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      />
      {showItems && (
        <ContainerWithGap horizontal span={2} gap={ITEM_GAP} viewStyle={styles.itemsContainer}>
          {items.map((item, index) => (
            <SceneItem
              key={index}
              item={item}
              disabled={disabled}
              onPress={() => onPressItem && onPressItem(item, index)}
            />
          ))}
        </ContainerWithGap>
      )}
    </CardContainer>
  );
};
const styles = StyleSheet.create({
  itemsContainer: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16
  },
  item: {
    height: ITEM_HEIGHT,
    borderRadius: radiusToken.buttonSmall,
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent: 'space-between'
  },
  titleContainer: {
    paddingHorizontal: 4
  },
  disabledOpacity: {
    opacity: 0.3
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  statusText: {
    flexShrink: 0
  },
  usageText: {
    flexShrink: 1,
    minWidth: 0
  },
  divider: {
    width: 1,
    height: 8,
    marginHorizontal: 6,
    flexShrink: 0
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden'
  },
  flowArrow: {
    transform: [{ rotate: '-90deg' }]
  }
});
export default IftttSceneCard;