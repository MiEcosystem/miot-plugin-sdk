import React, { useImperativeHandle, useRef } from 'react';
import { findNodeHandle, requireNativeComponent, UIManager } from 'react-native';
import PropTypes from 'prop-types';
import { AccessibilityPropTypes, getAccessibilityConfig } from '../utils/accessibility-helper';
import { isIOS } from "../native";
const RCTColorPickerView = requireNativeComponent('RCTColorPickerView');
const RCTWhitePickerView = requireNativeComponent('RCTWhitePickerView');
const ColorPickerView = (
  { style, type = 'color', onInit, onColorChange, onColorChangeStart, accessible, accessibilityLabel, accessibilityHint, disable, showIndicator = true },
  ref
) => {
  const view = useRef(null);
  const colorPickerConfig = () => {
    const colorTmpConfigParams = [
      ['#EDF4FF', '#EDF4FF', '#FEFDD9', '#FBD26C', '#FFB127', '#FF9E42', '#F67F00'],
      [0.0, 0.166, 0.332, 0.5, 0.666, 0.832, 1.0],
      10.0
    ];
    const colorConfigParams = [
      ['#E6312E', '#E6842E', '#E6D72E', '#98E62E', '#2EE62F', '#2EE67C', '#2ED5E6', '#2E79E6', '#302EE6', '#7D2EE6', '#E62EE3', '#E62EB5', '#E6312E'],
      [],
      10.0
    ];
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(view.current),
      UIManager.getViewManagerConfig(
        type === 'color' ? 'RCTColorPickerView' : 'RCTWhitePickerView'
      ).Commands.configDrawPicker,
      type === 'color' ? colorConfigParams : colorTmpConfigParams
    );
  };
  useImperativeHandle(ref, () => ({
    setColor: (color) => {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(view.current),
        UIManager.getViewManagerConfig(
          type === 'color' ? 'RCTColorPickerView' : 'RCTWhitePickerView'
        ).Commands.showColor,
        [color]
      );
    }
  }));
  if (type === 'color') {
    return (
      <RCTColorPickerView
        ref={view}
        style={style}
        disable={disable}
        showIndicator={showIndicator}
        onInit={() => {
          if (onInit) {
            onInit();
          }
          // 设置颜色值，渐变范围，高斯模糊半径
          colorPickerConfig();
        }}
        onColorChange={(data) => {
          if (onColorChange) {
            onColorChange(data.nativeEvent.color, data.nativeEvent.trackType, data.nativeEvent.position);
          }
        }}
        onChangeStart={(data) => {
          if (onColorChangeStart) {
            onColorChangeStart(data.nativeEvent.color);
          }
        }}
        onLayout={() => {
          if (isIOS) {
            colorPickerConfig();
          }
        }}
        {...getAccessibilityConfig({
          accessible,
          accessibilityLabel,
          accessibilityHint
        })}
      />
    );
  } else {
    return (
      <RCTWhitePickerView
        ref={view}
        style={style}
        disable={disable}
        showIndicator={showIndicator}
        onInit={() => {
          if (onInit) {
            onInit();
          }
          // 设置颜色值，渐变范围，高斯模糊半径
          colorPickerConfig();
        }}
        onColorChange={(data) => {
          if (onColorChange) {
            onColorChange(data.nativeEvent.color, data.nativeEvent.trackType, data.nativeEvent.position);
          }
        }}
        onChangeStart={ (data) => {
          if (onColorChangeStart) {
            onColorChangeStart(data.nativeEvent.color);
          }
        }}
        {...getAccessibilityConfig({
          accessible,
          accessibilityLabel,
          accessibilityHint
        })}
      />
    );
  }
};
export const ColorPicker = React.forwardRef(ColorPickerView);
ColorPicker.propTypes = {
  style: PropTypes.any,
  type: PropTypes.oneOf(['color', 'white']),
  disable: PropTypes.bool,
  showIndicator: PropTypes.bool,
  onInit: PropTypes.func,
  onColorChange: PropTypes.func,
  onChangeStart: PropTypes.func,
  accessible: AccessibilityPropTypes.accessible,
  accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
  accessibilityHint: AccessibilityPropTypes.accessibilityHint
};