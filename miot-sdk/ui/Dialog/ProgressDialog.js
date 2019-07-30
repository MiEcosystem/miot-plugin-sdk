import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { Styles } from '../../resources';
import AbstractDialog from "./AbstractDialog";
const padding = 37;
/**
 * @export
 * @author Geeook
 * @since 10021
 * @module ProgressDialog
 * @description 进度条弹窗，显示进度条和提示信息
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} message - 提示信息文字
 * @param {number} progress - 当前进度，默认`0`
 * @param {string} color - progressBar 填充颜色，默认米家绿
 * @param {string} unfilledColor - progressBar 未填充颜色，默认`#f1f1f1`
 * @param {string} textColor - 进度百分比文字颜色，默认米家绿
 * @param {bool} autoDismiss - 是否在进度条读完之后自动隐藏 Modal, 默认`false`
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 */
export default class ProgressDialog extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    message: PropTypes.string,
    progress: PropTypes.number,
    color: PropTypes.string,
    unfilledColor: PropTypes.string,
    textColor: PropTypes.string,
    autoDismiss: PropTypes.bool,
    onDismiss: PropTypes.func,
  }
  static defaultProps = {
    progress: 0,
    color: Styles.common.MHGreen,
    unfilledColor: '#f1f1f1',
    textColor: Styles.common.MHGreen,
    autoDismiss: false,
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
    if (this.props.autoDismiss
      && this.state.visible === true
      && this.props.progress >= 1) { // 传参不一定刚好等于1，可能大于1
      this.timer = setTimeout(_ => {
        this.setState({ visible: false });
        this.props.onDismiss && this.props.onDismiss();
      }, 100);
    }
    const progressText = `${Math.round(this.props.progress * 100)}%`;
    return (
      <AbstractDialog
        animationType={this.props.animationType}
        visible={this.state.visible}
        showTitle={false}
        canDismiss={false}
        showButton={false}
      >
        <View style={styles.container}>
          <View style={styles.messageContainer}>
            <Text
              numberOfLines={1}
              style={[styles.message, { flex: 1 }]}
            >
              {this.props.message || ''}
            </Text>
            <Text
              style={[
                styles.message,
                { width: 45, textAlign: 'right' },
                { color: this.props.textColor }
              ]}
            >
              {progressText}
            </Text>
          </View>
          <Progress.Bar
            progress={this.props.progress}
            color={this.props.color}
            unfilledColor={this.props.unfilledColor}
            width={Styles.dialog.modal.width - padding * 2}
            height={3}
            borderRadius={2.5}
            borderWidth={0.3}
            borderColor='#e5e5e5'
            useNativeDriver={true}
          />
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
    height: 86,
    backgroundColor: '#fff',
    paddingHorizontal: padding,
    justifyContent: 'center',
    borderRadius: Styles.dialog.modal.borderRadius,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  message: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.8)',
  },
});