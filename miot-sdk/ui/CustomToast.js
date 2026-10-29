import React, { useRef, useEffect, useState } from 'react';
import { Text, View, Animated, Easing } from 'react-native';
import { adjustSize } from '../utils/sizes';
import { FontMiSansWRegular } from '../utils/fonts';
import PropTypes from 'prop-types';
import { dynamicStyleSheet } from './Style/DynamicStyleSheet';
import DynamicColor from './Style/DynamicColor';
export default function CustomToast({
  position,
  containerStyle,
  textStyle,
  text,
  duration = 1500,
  onDismiss,
  visible
}) {  
  const [timeoutId, setTimeoutId] = useState(null);
  const [animatedOpacity] = useState(new Animated.Value(1));
  let unmount = useRef().current;
  useEffect(() => {
    if (unmount) {
      return;
    }
    if (visible) {
      timeoutId && clearTimeout(timeoutId);
      animatedOpacity.setValue(1);
      setTimeoutId(setTimeout(
        () => {
          Animated.timing(animatedOpacity, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear
          }).start(() => {
            onDismiss && onDismiss();
          });
        },
        duration
      ));
    }
    return () => {
      timeoutId && clearTimeout(timeoutId);
      unmount = true;
    };
  }, [visible]);
  return visible ? (
    <View style={[styles.container, position !== undefined ? { left: position } : {}]}>
      <Animated.View
        style={[
          styles.textContainer,
          { opacity: animatedOpacity },
          containerStyle
        ]}
      >
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </Animated.View>
    </View>
  ) : null;
}
CustomToast.propTypes = {
  position: PropTypes.number,
  visible: PropTypes.bool,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.array,
  text: PropTypes.string,
  duration: PropTypes.number,
  onDismiss: PropTypes.func
};
const styles = dynamicStyleSheet({
  container: {
    zIndex: 666,
    position: 'absolute',
    alignItems: 'center',
    width: '100%'
  },
  textContainer: {
    minHeight: adjustSize(135),
    minWidth: adjustSize(360),
    maxWidth: adjustSize(810),
    paddingHorizontal: adjustSize(45),
    paddingVertical: adjustSize(36),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: new DynamicColor('rgba(242, 242, 242, 1)', '#1A1A1A'),
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: adjustSize(36)
  },
  text: {
    fontSize: 16,
    color: new DynamicColor('rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.8)'),
    textAlign: 'center',
    fontFamily: FontMiSansWRegular
  }
});