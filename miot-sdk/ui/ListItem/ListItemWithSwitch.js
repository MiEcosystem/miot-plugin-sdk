'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Styles } from '../../resources';
import Separator from '../Separator';
import Switch from '../Switch';
const { width } = Dimensions.get('window');
const THIN_HEIGHT = 50;
const PADDING = 24;
/**
 * @export public
 * @doc_name 列表控件
 * @doc_index 2
 * @doc_directory ui
 * @author Geeook
 * @since 10004
 * @module ListItemWithSwitch
 * @description 带开关的列表项
 * @property {string} title - 左侧主标题
 * @property {string} subtitle - 左侧副标题，主标题下方
 * @property {string} valueText - 主标题右侧文案
 * @property {bool} value - 开关状态，默认值 false
 * @property {bool} disabled - 是否禁用开关，默认值 false
 * @property {function} onPress - 列表项点击事件，不传则不具有点击态（disabled）
 * @property {function} onValueChange - 开关切换事件
 * @property {bool} showSeparator - 是否显示分割线，默认值 true
 * @property {component} separator - 自定义分割线，不传将显示默认样式的分割线
 * @property {style} containerStyle - 列表项的自定义样式
 * @property {style} titleStyle - 主标题的自定义样式
 * @property {style} subtitleStyle - 副标题的自定义样式
 * @property {style} valueTextStyle - 主标题右侧文案的自定义样式
 * @property {style} switchStyle - 主标题右侧文案的自定义样式
 */
export default class ListItemWithSwitch extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    valueText: PropTypes.string,
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    onValueChange: PropTypes.func.isRequired,
    showSeparator: PropTypes.bool,
    separator: PropTypes.element,
    containerStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    subtitleStyle: PropTypes.object,
    valueTextStyle: PropTypes.object,
    switchStyle: PropTypes.object,
  }
  static defaultProps = {
    title: '',
    subtitle: '',
    valueText: '',
    value: false,
    disabled: false,
    showSeparator: true,
    containerStyle: {},
    titleStyle: {},
    subtitleStyle: {},
    valueTextStyle: {},
    switchStyle: {},
  }
  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     value: this.props.value,
  //   }
  // }
  render() {
    let extraContainerStyle = {
      height: THIN_HEIGHT,
    };
    if (this.props.subtitle) {
      extraContainerStyle = {
        paddingVertical: 8,
        height: 60,
      }
    }
    let extraStyle = {}
    if (this.props.valueText) {
      extraStyle.maxWidth = (width - PADDING * 2) * 0.4;
      if (this.props.containerStyle.width) {
        extraStyle.maxWidth = (this.props.containerStyle.width - PADDING * 2) * 0.4;
      }
    }
    if (Platform.OS === 'android') {
      extraStyle.fontFamily = 'Kmedium';
    }
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <TouchableHighlight
          disabled={!this.props.onPress}
          underlayColor={Styles.common.underlayColor}
          onPress={this.props.onPress}
        >
          <View style={[styles.container, this.props.containerStyle, extraContainerStyle]}>
            <View style={styles.left}>
              <View style={[styles.up]}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={[Styles.common.title, extraStyle, this.props.titleStyle]}
                >
                  {this.props.title}
                </Text>
                {this.props.valueText ?
                  <View style={[styles.up]}>
                    <View style={styles.separatorCol} />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode='tail'
                      style={[Styles.common.subtitle, this.props.valueTextStyle, { flex: 1 }]}
                    >
                      {this.props.valueText}
                    </Text>
                  </View>
                  : null
                }
              </View>
              {this.props.subtitle ?
                <Text
                  numberOfLines={2}
                  ellipsizeMode='tail'
                  style={[Styles.common.subtitle, this.props.subtitleStyle]}
                >
                  {this.props.subtitle}
                </Text>
                : null
              }
            </View>
            <View style={styles.right}>
              <Switch
                style={this.props.switchStyle}
                value={this.props.value}
                disabled={this.props.disabled}
                onValueChange={value => this._onValueChange(value)}
              />
            </View>
          </View>
        </TouchableHighlight>
        {this.renderSeparator()}
      </View>
    );
  }
  renderSeparator() {
    if (!this.props.showSeparator) return null;
    return this.props.separator || <Separator style={{ marginLeft: Styles.common.padding }} />
  }
  // // 父组件更新数据
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.value !== this.state.value) {
  //     this.setState({ value: nextProps.value });
  //   }
  // }
  _onValueChange(value) {
    // this.setState({ value });
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  }
}
var styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: PADDING,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 4,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  up: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  separatorCol: {
    height: 14,
    width: 0.5,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});