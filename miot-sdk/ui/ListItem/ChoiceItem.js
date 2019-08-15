import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Images, Styles } from '../../resources';
import Checkbox from '../Checkbox/Checkbox';
const thinHeight = 50; // 无副标题时的高度
const fatHeight = 60; // 有副标题时的高度
const checkboxSize = 20;
/**
 * @description 选择列表项的类型
 * @enum {string}
 */
const TYPE = {
  /**
   * 无状态列表项
   */
  STATELESS: 'stateless',
  /**
   * 单选列表项
   */
  SINGLE: 'single',
  /**
   * 多选列表项
   */
  MULTIPLE: 'multiple',
}
Object.freeze(TYPE);
/**
 * @export
 * @author Geeook
 * @since 10022
 * @module ChoiceItem
 * @description 可选择的列表项，可以单选或者多选
 * @param {TYPE} type - 列表项的类型，是单选还是多选
 * @param {string} title - 标题文字
 * @param {string} subtitle - 副标题文字
 * @param {boolean} selected - 是否选中，`TYPE.SINGLE`和`TYPE.MULTIPLE`可用
 * @param {string} color - 选中态颜色，单选时表示选中文字颜色，多选时表示勾选框勾选背景颜色，`TYPE.SINGLE`和`TYPE.MULTIPLE`可用
 * @param {number} icon - 列表项被选中时的选中图标，放在文字前面，`TYPE.SINGLE`可用
 * @param {function} onPress - 点击列表项的回调函数
 */
export default class ChoiceItem extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf([TYPE.STATELESS, TYPE.SINGLE, TYPE.MULTIPLE]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    selected: PropTypes.bool,
    color: PropTypes.string,
    icon: PropTypes.number,
    onPress: PropTypes.func,
  }
  static defaultProps = {
    type: TYPE.STATELESS,
    selected: false,
    color: Styles.common.MHGreen,
    icon: Images.common.selectIcon
  }
  /**
   * @description 选择列表项的类型
   * @enum {string}
   */
  static TYPE = TYPE
  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: props.selected
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.selected !== this.state.selected) {
      this.setState({ selected: newProps.selected });
    }
  }
  renderIcon() {
    if (this.props.type === TYPE.STATELESS) return null;
    if (!this.state.selected
      || this.props.type === TYPE.MULTIPLE) {
      return (
        <View
          style={{
            width: 38,
            height: fatHeight,
          }}
        />);
    }
    const paddingTop = { paddingTop: 20 };
    if (this.props.subtitle) paddingTop.paddingTop = 16;
    return (
      <View style={[styles.iconContainer, paddingTop]}>
        <Image
          source={this.props.icon}
          resizeMode='contain'
          style={styles.icon}
        />
      </View>
    )
  }
  renderText() {
    const color = { color: "#000000" };
    const textAlign = {};
    if (this.state.selected) color.color = this.props.color;
    if (this.props.type === TYPE.STATELESS) textAlign.textAlign = 'center';
    return (
      <View style={styles.textContainer}>
        <Text
          style={[styles.title, color, textAlign]}
          numberOfLines={1}
        >
          {this.props.title}
        </Text>
        {this.props.subtitle
          ? <Text
            style={[styles.subtitle, textAlign]}
            numberOfLines={1}
          >
            {this.props.subtitle}
          </Text>
          : null
        }
      </View>
    )
  }
  renderCheckbox() {
    if (this.props.type !== TYPE.MULTIPLE) return null;
    return (
      <Checkbox
        style={{
          width: checkboxSize,
          height: checkboxSize,
          borderRadius: checkboxSize / 2,
          marginRight: 20
        }}
        checked={this.state.selected}
        checkedColor={this.props.color}
        onValueChange={selected => this._onValueChange(selected)}
      />
    )
  }
  render() {
    const height = { height: thinHeight };
    if (this.props.subtitle) {
      height.height = fatHeight;
    }
    return (
      <TouchableHighlight
        underlayColor='rgba(0,0,0,0.05)'
        onPress={_ => this._onPress()}
      >
        <View style={[styles.container, height]}>
          {this.renderIcon()}
          {this.renderText()}
          {this.renderCheckbox()}
        </View>
      </TouchableHighlight>
    );
  }
  _onValueChange(selected) {
    this.state.selected = selected;
    if (this.props.onPress) {
      this.props.onPress(selected);
    }
  }
  _onPress() {
    const { type } = this.props;
    let selected = this.state.selected;
    if (type !== TYPE.STATELESS) {
      if (type === TYPE.MULTIPLE) selected = !selected;
      if (type === TYPE.SINGLE) selected = true;
      this.setState({ selected });
    }
    if (this.props.onPress) {
      this.props.onPress(selected);
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    width: 38,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  icon: {
    width: 10,
    height: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'stretch',
    fontSize: 15,
    lineHeight: 20
  },
  subtitle: {
    alignSelf: 'stretch',
    fontSize: 12,
    color: "#666666",
    lineHeight: 16
  }
});