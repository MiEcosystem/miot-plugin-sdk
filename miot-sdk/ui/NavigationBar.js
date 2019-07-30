/**
 * @export
 * @since 10021
 * @author Geeook
 * @module miot/ui/NavigationBar
 * @description 插件导航栏，左侧通常一个按钮，中间标题/副标题，右侧通常一到两个按钮。
 * *和原有 `Titlebar` 对比改动点*
 * - 在原有图标基础上支持更多的图标（共16种），但不支持自定义图标，只能从 `NavigationBar.ICON` 中选择，图标样式也有改动
 * - 传参有改动，删除 `leftTextStyle/leftText/rightTextStyle/rightText/style`，增加 `left/right/backgroundColor`
 * - `type` 含义变更：之前 `dark` 表示白底黑字，容易误导，现在表示*深色背景白色文字*
 * - 考虑到某些多语言不好兼容的问题，导航栏左右侧只支持图标，不再支持文字
 * - 导航栏高度固定，不允许更改，背景色仍然可以自定义
 * @property {string} type - 导航栏类型：`NavigationBar.TYPE.DARK` 表示*深色背景白色文字*，`NavigationBar.TYPE.LIGHT` 相反
 * @property {object} backgroundColor - 导航栏背景色
 * @property {array} left - 左侧按钮的集合，最多显示两个，多余无效 [{ key, disable, showDot, onPress }]
 * @property {array} right - 右侧按钮的集合，最多显示两个，多余无效 [{ key, disable, showDot, onPress }]
 * @property {string} title - 中间的标题
 * @property {string} subtitle - 中间的副标题
 * @property {string} onPressTitle - 点击标题的事件
 * @example
 * ```js
 * <NavigationBar
 *   backgroundColor='transparent'
 *   type={NavigationBar.TYPE.DARK}
 *   left={[
 *     {
 *       key: NavigationBar.ICON.BACK,
 *       onPress: _ => this.props.navigation.goBack()
 *     },
 *     {
 *       key: NavigationBar.ICON.CLOSE,
 *       onPress: _ => console.log('onPress')
 *     }
 *   ]}
 *   right={[
 *     {
 *       key: NavigationBar.ICON.COLLECT,
 *       disable: true,
 *       onPress: _ => console.log('onPress')
 *     },
 *     {
 *       key: NavigationBar.ICON.MORE,
 *       showDot: this.state.showDot,
 *       onPress: _ => console.log('onPress')
 *     }
 *   ]}
 *   title='标题'
 *   subtitle='副标题'
 *   onPressTitle={_ => console.log('onPressTitle')}
 * />
 * ```
 * @see com.xiaomi.demo->教程->NavigationBarDemo
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dimensions, Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Images from '../resources/Images';
import ImageButton from './ImageButton';
/**
 * 导航栏类型
 */
const TYPE = {
  /**
   * 深色背景
   */
  DARK: 'dark',
  /**
   * 浅色背景
   */
  LIGHT: 'light'
}
Object.freeze(TYPE);
/**
 * 图标资源的索引
 */
const ICON = {
  /**
   * 添加
   */
  ADD: 'add',
  /**
   * 返回
   */
  BACK: 'back',
  /**
   * 关闭
   */
  CLOSE: 'close',
  /**
   * 收藏
   */
  COLLECT: 'collect',
  /**
   * 完成
   */
  COMPLETE: 'complete',
  /**
   * 删除
   */
  DELETE: 'delete',
  /**
   * 详情
   */
  DETAIL: 'detail',
  /**
   * 更多
   */
  MORE: 'more',
  /**
   * 下一步
   */
  NEXT: 'next',
  /**
   * 个人中心
   */
  PROFILE: 'profile',
  /**
   * 二维码
   */
  QR: 'qr',
  /**
   * 搜索
   */
  SEARCH: 'search',
  /**
   * 全选
   */
  SELECT_ALL: 'select_all',
  /**
   * 全部选中
   */
  SELECTED_ALL: 'selected_all',
  /**
   * 设置
   */
  SETTING: 'setting',
  /**
   * 分享
   */
  SHARE: 'share',
}
Object.freeze(ICON);
const { light, dark, dot } = Images.navigation; // 图标集合
const { width } = Dimensions.get('window'); // 屏幕宽度
// const statusBarHeight = getStatusBarHeight(true); // 状态栏高度
const navigationBarHeightThin = 52; // 导航栏高度，无副标题
const navigationBarHeightFat = 65; // 导航栏高度，有副标题
const paddingHorizontal = 9; // 导航栏左右内边距
const iconSize = 40; // 图标尺寸
const lightTitleColor = '#000000'; // 浅色背景下标题颜色
const darkTitleColor = '#ffffff'; // 深色背景下标题颜色
const lightSubtitleColor = '#666666'; // 浅色背景下副标题颜色
const darkSubtitleColor = '#ffffff'; // 深色背景下副标题颜色
export default class NavigationBar extends Component {
  static propTypes = {
    type: PropTypes.oneOf([TYPE.DARK, TYPE.LIGHT]),
    style: PropTypes.object,
    left: PropTypes.array,
    right: PropTypes.array,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onPressTitle: PropTypes.func
  }
  static defaultProps = {
    type: TYPE.LIGHT,
    left: [],
    right: [],
  }
  static TYPE = TYPE;
  static ICON = ICON;
  /**
   * @description 根据 type 和 disable 确定 icon
   * @param {array} arr - 按钮集合
   */
  getIconsOfType(arr) {
    const icons = this.isDarkStyle ? dark : light;
    return arr.map(item => {
      const { key, disable } = item;
      if (disable) {
        item.source = icons[key] ? icons[key].disable : null; // 可能key 不存在
        item.highlightedSource = null;
      }
      else {
        item.source = icons[key] ? icons[key].normal : null;
        item.highlightedSource = icons[key] ? icons[key].press : null;
      }
      return item;
    }).filter(item => item.source); // 过滤找到资源的图标
  }
  /**
   * @description 根据处理后的按钮集合数据渲染按钮
   * @param {array} arr - 经过处理后的按钮集合
   */
  renderIcons(arr) {
    const icons = (arr || []).slice(0, 2); // 最多显示两个图标
    return icons.map((icon, i) => {
      // 如果没有找过图标资源，则显示占位空白
      if (!icon.source) {
        return <View key={icon.key + i} style={{ width: iconSize }} />
      }
      return (
        <View
          key={icon.key + i}
          style={{ width: iconSize, height: iconSize }}
        >
          {icon.showDot
            ? <Image
              style={styles.dot}
              resizeMode='contain'
              source={dot}
            />
            : null
          }
          <ImageButton
            disabled={!!icon.disable}
            onPress={icon.onPress}
            style={styles.icon}
            source={icon.source}
            highlightedSource={icon.highlightedSource}
          />
        </View>
      )
    })
  }
  /**
   * 中间标题部分
   */
  renderTitle() {
    const { title, subtitle, onPressTitle } = this.props;
    const titleColor = {
      color: this.isDarkStyle ? darkTitleColor : lightTitleColor
    }
    const subtitleColor = {
      color: this.isDarkStyle ? darkSubtitleColor : lightSubtitleColor
    }
    return (
      <View style={[styles.titleContainer]}>
        <Text
          numberOfLines={1}
          style={[styles.title, titleColor]}
          onPress={onPressTitle}
        >
          {title || ''}
        </Text>
        {subtitle
          ? <Text
            numberOfLines={1}
            style={[styles.subtitle, subtitleColor]}
            onPress={onPressTitle}
          >
            {subtitle}
          </Text>
          : null
        }
      </View>
    )
  }
  /**
   * 导航栏在进入插件的时候就已经生成，并且常驻，所以样式判断逻辑不能写在 constructor 中
   */
  render() {
    this.isDarkStyle = this.props.type === TYPE.DARK;
    StatusBar.setBarStyle(this.isDarkStyle ? 'light-content' : 'dark-content'); // 测试过的机型都有效：华为荣耀V9，红米Note4X，小米Mix2
    if (Platform.OS == 'android') {
      StatusBar.setTranslucent(true); // 测试过的机型几乎都无效：华为荣耀V9，红米Note4X，小米Mix2
    }
    const leftIcons = this.getIconsOfType(this.props.left);
    const rightIcons = this.getIconsOfType(this.props.right);
    leftIcons.length < rightIcons.length && leftIcons.push({}); // 补位空白
    leftIcons.length > rightIcons.length && rightIcons.unshift({});
    let containerHeight = StatusBar.currentHeight || 0;
    containerHeight += this.props.subtitle ? navigationBarHeightFat : navigationBarHeightThin;
    const backgroundColor = this.props.backgroundColor
      ? this.props.backgroundColor
      : (this.isDarkStyle ? '#000000' : '#ffffff');
    // StatusBar.setBackgroundColor(backgroundColor); // 仅对某些机型有效：华为荣耀V9
    const containerStyle = {
      backgroundColor,
      height: containerHeight
    }
    return (
      <SafeAreaView style={[styles.container, containerStyle, { paddingTop: StatusBar.currentHeight }]}>
        {this.renderIcons(leftIcons)}
        {this.renderTitle()}
        {this.renderIcons(rightIcons)}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width,
    paddingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    // lineHeight: 22,
    fontFamily: 'D-DINCondensed-Bold',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12.6,
    lineHeight: 17,
    fontFamily: 'MI-LANTING--GBK1-Light',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    width: iconSize,
    height: iconSize,
  },
  dot: {
    width: iconSize,
    height: iconSize
  }
});