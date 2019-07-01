import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Images, Styles } from '../../resources';
import Separator from '../Separator';
import AbstractDialog from "./AbstractDialog";
const paddingHorizontal = 40; // 内容的左右边距
const paddingBottomSmall = 20; // 内容的上下边距
const paddingBottomLarge = 28; // 内容的上下边距
const iconSize = 55; // 图标尺寸
const optionHeight = iconSize + 40 // 单个选项的高度
const margin = ~~((Styles.dialog.modal.width - paddingHorizontal * 2 - iconSize * 4) / 3);
const testIcon = Images.common.mihome;
/**
 * 分享选项
 * @typedef {Object} Opiton
 * @property {number} icon - 图标的资源, require('../xx/xx.png')
 * @property {string} text - 图标下方的文字说明
 * @property {function} callback - 点击图标的回调函数
 */
/**
 * 按钮
 * @typedef {Object} Button
 * @property {string} text - 按钮的文字
 * @property {style} style - 按钮的样式
 * @property {function} callback - 点击按钮的回调函数
 */
/**
 * @export
 * @author Geeook
 * @since 10021
 * @module ShareDialog
 * @description 分享弹窗，弹窗让用户指定分享渠道
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} title - 标题文字
 * @param {Opiton[]} options - 分享选项，当可选项 >8 个时，允许左右滑动分页
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 */
export default class ShareDialog extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    title: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    buttons: PropTypes.arrayOf(PropTypes.object),
    onDismiss: PropTypes.func,
  }
  static defaultProps = {
    options: Array.from({ length: 6 }, (v, i) => ({
      icon: testIcon,
      text: [`米家`, `微信`, `QQ`, `微博`, `朋友圈`, `收藏`, `即刻`][~~(Math.random() * 7)],
      callback: () => console.log('分享成功')
    }))
  }
  componentWillReceiveProps(newProps) {
    if (newProps.visible === true) {
      // Android modal swiper bug：在 modal 🀄️不显示 swiper 的内容
      // 解决办法：先显示 modal 再显示 swiper
      // reference: https://github.com/leecade/react-native-swiper/issues/435#issuecomment-354585864
      setTimeout(_ => this.setState({ swiperVisible: true }));
    }
    else {
      this.setState({ swiperVisible: false });
    }
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      swiperVisible: false,
      pressed: -1,
    }
    // 分页
    this.pages = Array.from({ length: Math.ceil(props.options.length / 8) }, (v, i) => props.options.slice(8 * i, 8 * i + 8));
  }
  /**
   * 一页 icons
   * @param {Opiton[]} options
   * @param {number} index
   */
  renderIcons(options, index) {
    return (
      <View
        key={index + '0'}
        style={styles.optionsPage}
      >
        {options.map((option, index) => {
          if (option === undefined) return null;
          const marginLeft = index % 4 === 0 ? {} : { marginLeft: margin };
          const scale = this.state.pressed === index ? 0.95 : 1;
          const opacity = this.state.pressed === index ? 0.88 : 1;
          return (
            <TouchableWithoutFeedback
              key={index + (option.text || '')}
              onPress={option.callback}
              onPressIn={_ => this.setState({ pressed: index })}
              onPressOut={_ => this.setState({ pressed: -1 })}
            >
              <View style={[styles.optionContainer, marginLeft]}>
                <Image
                  style={[styles.icon, { transform: [{ scale }] }]}
                  source={option.icon}
                  resizeMode='center'
                />
                <Text
                  style={[styles.optionText, { opacity }]}
                  numberOfLines={1}
                >
                  {option.text || ''}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </View>
    )
  }
  /**
   * 一页或者分页
   * @param {Opiton[]} options
   */
  renderIconsPages(options) {
    if (options.length < 9) return this.renderIcons(options, 0);
    if (!this.state.swiperVisible) return <View style={styles.swiper} />
    return (
      <Swiper
        style={styles.swiper}
        autoplay={false}
        loop={false}
        paginationStyle={styles.paginationStyle}
        dotColor='rgba(0,0,0,0.2)'
        activeDotColor='#32bac0'
        dotStyle={styles.dot}
        activeDotStyle={styles.dot}
      >
        {this.pages.map((options, index) => this.renderIcons(options, index))}
      </Swiper>
    )
  }
  render() {
    const paddingBottom = this.props.options.length > 8
      ? { paddingBottom: paddingBottomLarge }
      : { paddingBottom: paddingBottomSmall };
    return (
      <AbstractDialog
        animationType={this.props.animationType}
        visible={this.props.visible}
        title={this.props.title}
        buttons={this.buttons}
        onDismiss={_ => this._onDismiss()}
      >
        <View
          style={[styles.container, paddingBottom]}>
          {this.renderIconsPages(this.props.options)}
        </View>
        <Separator />
      </AbstractDialog>
    );
  }
  _onDismiss() {
    this.setState({ swiperVisible: false });
    this.props.onDismiss && this.props.onDismiss();
  }
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal,
    backgroundColor: '#fff',
    borderRadius: Styles.dialog.modal.borderRadius,
  },
  swiper: {
    height: optionHeight * 2 + 19,
    paddingBottom: 19,
  },
  optionsPage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionContainer: {
    height: optionHeight,
    alignItems: 'center',
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
  optionText: {
    position: 'absolute',
    bottom: 16,
    width: iconSize,
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 0
  },
  dot: {
    width: 6,
    height: 6,
  }
});