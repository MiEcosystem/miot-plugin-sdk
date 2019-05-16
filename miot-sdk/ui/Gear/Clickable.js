import PropTypes from 'prop-types';
import React from 'react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
const SIZE = 40;
const TEXT_COLOR = '#bbb';
const BORDER_COLOR = '#ccc';
/**
 * @export
 * @author Geeook
 * @since 10011
 * @module Clickable
 * @description 点击动效
 * @property {bool} select - 是否被选择
 * @property {string} selectColor - 被选择的背景色
 * @property {string} text - 中间的文字内容
 * @property {style} style - 整体容器的样式
 * @property {style} textStyle - 中间的文字大小
 * @property {function} onPress - 点击回调函数
 */
export default class Clickable extends React.Component {
  static propTypes = {
    select: PropTypes.bool,
    selectColor: PropTypes.string,
    style: PropTypes.object,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    textStyle: PropTypes.object,
  }
  static defaultProps = {
    select: false,
    selectColor: '#f0ac3d',
  }
  animatedValue = new Animated.Value(0);
  render() {
    const toValue = this.props.select ? 1 : 0;
    // 文本颜色不能应用 animation
    const color = this.props.select ? '#fff' : TEXT_COLOR;
    // 容器 border 变化
    const boderStyle = this.props.select ? { borderWidth: 0 } : { borderColor: BORDER_COLOR, borderWidth: 1 };
    // 容器 backgroundColor 变化
    const backgroundColor = this.props.select ? this.props.selectColor : '#fff';
    // const backgroundColor = this.animatedValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['#fff', this.props.selectColor]
    // });
    // Animated.timing(this.animatedValue, {
    //   toValue,
    //   duration: 200,
    //   easing: Easing.ease
    // }).start();
    return (
      <Animated.View
        style={[styles.animationContainer, boderStyle, this.props.style, { backgroundColor }]}
      >
        <TouchableWithoutFeedback
          onPress={this.props.onPress}
        >
          <View style={styles.container}>
            <Text style={[styles.text, this.props.textStyle, { color }]}>
              {this.props.text}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  animationContainer: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 11,
  }
});