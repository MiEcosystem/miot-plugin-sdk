import React from 'react';
import { View } from 'react-native';
import CardComponent from './CardComponent';
import { Images } from "../../../../resources";
import { dynamicStyleSheet } from '../../../Style';
const Styles = dynamicStyleSheet({
  automationComponentStyle: {
    width: '100%',
    paddingHorizontal: 12,
    marginBottom: 8
  }
});
/**
 * 自动化卡片容器组件
 * 通用的卡片封装，用于展示各种自动
 */
const AutomationCard = ({
  title,
  subtitle,
  onPress,
  children,
  icon = Images.common.right_arrow,
  style,
  rightButton
}) => {
  return (
    <View style={[Styles.automationComponentStyle, style]}>
      <CardComponent
        icon={icon}
        title={title}
        subtitle={subtitle}
        onPress={onPress}
        rightButton={rightButton}
      >
        {children}
      </CardComponent>
    </View>
  );
};
export default AutomationCard;