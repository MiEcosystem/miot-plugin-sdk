import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import { Styles } from '../../resources';
import AbstractDialog from "./AbstractDialog";
/**
 * @export
 * @author Geeook
 * @since 10021
 * @module LoadingDialog
 * @description 加载弹窗，显示加载旋转动画和提示信息
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} message - 显示文字
 * @param {number} timeout - Modal 隐藏的超时时间，如果不主动设置隐藏的话
 * @param {function} onDismiss - Modal隐藏时的回调函数
 */
export default class LoadingDialog extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    message: PropTypes.string,
    timeout: PropTypes.number,
    onDismiss: PropTypes.func,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: this.props.visible
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({ visible: newProps.visible });
    }
  }
  render() {
    console.log('LoadingDialog render');
    const timeout = this.props.timeout;
    if (timeout && typeof parseInt(timeout) === "number") {
      if (!this.state.visible) {
        this.timer = null;
        clearTimeout(this.timer);
      }
      else {
        if (!this.timer) {
          this.timer = setTimeout(_ => {
            this.setState({ visible: false });
            this.props.onDismiss && this.props.onDismiss();
          }, parseInt(timeout));
        }
      }
    }
    return (
      <AbstractDialog
        animationType={this.props.animationType}
        visible={this.state.visible}
        showTitle={false}
        canDismiss={false}
        showButton={false}
      >
        <View style={styles.container}>
          <BallIndicator
            style={styles.indicator}
            color='rgba(0,0,0,0.6)'
            size={20}
          />
          <Text style={styles.message}>
            {this.props.message || ''}
          </Text>
        </View>
      </AbstractDialog>
    );
  }
  componentWillUnmount() {
    this.timer = null;
    clearTimeout(this.timer);
  }
}
const styles = StyleSheet.create({
  container: {
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 27,
    borderRadius: Styles.dialog.modal.borderRadius,
  },
  indicator: {
    position: 'absolute',
    left: 27,
    height: 20,
  },
  message: {
    marginLeft: 15 + 20,
    fontSize: 15,
    color: 'rgba(0,0,0,0.8)',
  }
});