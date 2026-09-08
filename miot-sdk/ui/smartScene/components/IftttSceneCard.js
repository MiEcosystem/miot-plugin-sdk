import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  ConfigContext,
  CardContainer,
  CardHeader,
  ContainerWithGap,
  LargeListEntrance,
  TouchableView,
  Fonts,
  radiusToken,
} from 'miot/ui/hyperOSUI';
import SmartSceneIcon from 'mhui-rn/dist/icons/SmartScene';
import { referenceReport } from 'mhui-rn/dist/decorators/reportDecorator';
import { AccessibilityRoles, getAccessibilityConfig } from 'mhui-rn/dist/utils/accessibility-helper';
const ITEM_HEIGHT = 140;
const ITEM_GAP = 8;
const ARROW_SIZE = 16;
/**
 * IftttSceneCard
 * 基于 mhui-rn SmartSceneCard 的本地拷贝,用于 SmartScene 自动化推荐入口
 * 双场景推荐展示;hasData=false 时塌陷为入口行
 */
const FlowArrow = ({ disabled }) => {
  const { colorToken } = useContext(ConfigContext);
  const fill = colorToken.contentDisabledSecondary;
  return (
    <View style={styles.flowArrow}>
      <Svg width={ARROW_SIZE} height={ARROW_SIZE} viewBox="0 0 16 16" fill="none">
        <Path
          d="M6.3999 5.44767V10.5523C6.3999 11.1204 7.06671 11.4264 7.49736 11.0559L10.4643 8.50357C10.7724 8.23854 10.7724 7.76146 10.4643 7.49643L7.49736 4.9441C7.06671 4.57363 6.3999 4.87959 6.3999 5.44767Z"
          fill={fill}
        />
      </Svg>
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
      pressType="list"
      viewStyle={{ borderRadius: radiusToken.buttonSmall }}
    >
      <View style={[
        styles.item,
        { backgroundColor: colorToken.fillQuaternary },
        disabled ? styles.disabledOpacity : null,
      ]}
      {...getAccessibilityConfig({
        accessibilityRole: AccessibilityRoles.button,
        accessibilityState: { disabled },
        accessibilityLabel: item.title,
      })}>
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
            <React.Fragment key={`action-${ index }`}>{icon}</React.Fragment>
          ))}
        </View>
      </View>
      
    </TouchableView>
  );
};
const DefaultHeaderIcon = ({ disabled }) => {
  const { colorToken } = useContext(ConfigContext);
  return (
    <View style={styles.defaultHeaderIcon}>
      <SmartSceneIcon
        width={20}
        height={20}
        fill={disabled ? colorToken.contentDisabledPrimary : colorToken.contentPrimaryNormal}
      />
    </View>
  );
};
const IftttSceneCard = (props) => {
  const {
    title = '',
    disabled = false,
    wear = false,
    hasData = true,
    items = [],
    onPressHeader,
    onPressItem,
    accessible,
    accessibilityLabel,
    accessibilityHint,
    showLeadingIcon = true,
  } = props;
  useEffect(() => {
    referenceReport('IftttSceneCard');
  }, []);
  const cardRadius = wear ? radiusToken.cardExtraLarge : radiusToken.cardLarge;
  const noop = () => {};
  const resolvedIcon = showLeadingIcon ? <DefaultHeaderIcon disabled={disabled} /> : null;
  const headerOnPress = onPressHeader || noop;
  const renderHeader = (HeaderComponent, headerProps) => {
    const header = (
      <HeaderComponent
        {...headerProps}
        onPress={undefined}
      />
    );
    if (disabled) {
      return header;
    }
    return (
      <TouchableWithoutFeedback onPress={headerOnPress}>
        <View>{header}</View>
      </TouchableWithoutFeedback>
    );
  };
  const showItems = items.length === 2;
  if (!hasData) {
    return (
      <CardContainer viewStyle={{ borderRadius: cardRadius }}>
        {renderHeader(LargeListEntrance, {
          title,
          leadingIcon: resolvedIcon,
          disabled,
          accessible,
          accessibilityLabel,
          accessibilityHint,
        })}
      </CardContainer>
    );
  }
  return (
    <CardContainer viewStyle={{ borderRadius: cardRadius }}>
      {renderHeader(CardHeader, {
        title,
        actionType: 'navigate',
        disabled,
        leadingIcon: resolvedIcon,
        accessible,
        accessibilityLabel,
        accessibilityHint,
      })}
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
  defaultHeaderIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsContainer: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  item: {
    height: ITEM_HEIGHT,
    borderRadius: radiusToken.buttonSmall,
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  titleContainer: {
    paddingHorizontal: 4,
  },
  disabledOpacity: {
    opacity: 0.3,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusText: {
    flexShrink: 0,
  },
  usageText: {
    flexShrink: 1,
    minWidth: 0,
  },
  divider: {
    width: 1,
    height: 8,
    marginHorizontal: 6,
    flexShrink: 0,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  flowArrow: {
    marginHorizontal: 0,
  },
});
export default IftttSceneCard;