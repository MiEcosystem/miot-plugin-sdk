import React, { Children, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
import DynamicColor from '../Style/DynamicColor';
import { Styles as CommonStyle } from '../../resources';
import { adjustSize } from '../../utils/sizes';
import { FontDefault } from '../../utils/fonts';
import { System, PackageEvent } from '../..';
export default function Section({ title, showSeparator = true, children }) {
  const filteredChildren = Children.toArray(children).filter((child) => !!child);
  if (!filteredChildren.length) {
    return null;
  }
  const [visible, setVisible] = useState(false);
  const [isHighTextContrast, setIsHighTextContrast] = useState(false);
  function onLayout({ nativeEvent: { layout } }) {
    setVisible(layout.height > 0);
  }
  function fetchHighTextContrastState() {
    System.accessibility.getHighTextContrastState().then((res) => {
      setIsHighTextContrast(res);
    });
  }
  // 无障碍高对比度文字开关监听
  useEffect(() => {
    // 初始时获取高对比度文字状态
    fetchHighTextContrastState();
    // 监听系统事件，当系统事件发生时重新获取高对比度文字状态
    const listener = PackageEvent.packageDidResume.addListener(() => {
      fetchHighTextContrastState();
    });
    return () => {
      listener.remove();
    };
  }, []);
  return (
    <View style={Styles.container}>
      {showSeparator && visible ? (
        <View style={Styles.separator}></View>
      ) : null}
      {title && visible ? (
        <View style={Styles.titleContainer}>
          <Text style={[isHighTextContrast ? Styles.titleAcc : Styles.title, { textAlign: 'left' }]}>{title}</Text>
        </View>
      ) : null}
      <View onLayout={onLayout}>
        {filteredChildren}
      </View>
    </View>
  );
}
Section.propTypes = {
  title: PropTypes.string,
  showSeparator: PropTypes.bool
};
const Styles = dynamicStyleSheet({
  separator: {
    marginVertical: adjustSize(60),
    marginHorizontal: CommonStyle.common.padding,
    height: StyleSheet.hairlineWidth,
    backgroundColor: new DynamicColor('rgba(0, 0, 0, 0.15)', 'rgba(255, 255, 255, 0.15)')
  },
  titleContainer: {
    minHeight: adjustSize(96),
    justifyContent: 'center'
  },
  title: {
    fontFamily: FontDefault,
    fontSize: 12,
    lineHeight: 16,
    color: new DynamicColor('#8C93B0', 'rgba(255, 255, 255, 0.6)'),
    paddingHorizontal: CommonStyle.common.padding
  },
  titleAcc: {
    fontFamily: FontDefault,
    fontSize: 12,
    lineHeight: 16,
    color: new DynamicColor('#4E4E4E', 'rgba(255, 255, 255, 0.6)'),
    paddingHorizontal: CommonStyle.common.padding
  }
});