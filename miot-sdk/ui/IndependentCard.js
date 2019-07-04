import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Styles } from '../resources';
import Switch from './Switch';
/**
 * @export
 * @author Li Yue
 * @since 10020
 * @module IndependentCard
 * @description 独立卡片
 * @property {string} radiusType - 卡片圆角类型：四个圆角、没有圆角、只有上圆角、只有下圆角。对应值：all（默认）, none, top, bottom
 * @property {int} picture - require 引用图形，默认值：-1
 * @property {string} title1 - 主标题文字，默认值：''
 * @property {string} title2 - 副标题文字，默认值：''
 * @property {string} switchKey - 开关状态对应的 key，默认值：''
 * @property {bool} value - 开关状态，默认值 false
 * @property {function} changeValue - 改变开关状态的函数，默认值 function(){}
 * @property {string} onTintColor - 开关打开时的背景颜色
 * @property {string} tintColor - 开关关闭时的背景颜色
 * @property {style} switchStyle - 开关样式，仅支持宽高
 * @property {bool} disabled - 是否禁用开关，默认值 false
 * @property {bool} disabledCard - 卡片的禁用状态，默认值 false
 */
const radiusValue = 10;
const pictureLength = 40;
const OFF_COLOR = '#f0f0f0';
class IndependentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: {}
    };
  }
  componentDidMount() {
    //根据 radiusType 设置卡片圆角
    let radius = {};
    this.setState((state, props) => {
      let { radiusType } = props;
      switch (radiusType) {
        case 'none':
          radius = {};
          break;
        case 'top':
          radius = {
            borderTopLeftRadius: radiusValue,
            borderTopRightRadius: radiusValue,
          };
          break;
        case 'bottom':
          radius = {
            borderBottomLeftRadius: radiusValue,
            borderBottomRightRadius: radiusValue,
          };
          break;
        default:
          radius = {
            borderRadius: radiusValue
          };
      }
      return { radius };
    });
  }
  //改变开关状态
  changeSwitchValue = () => {
    let { value, changeValue, switchKey } = this.props;
    if (changeValue) {
      //传入了 changeValue 函数
      changeValue(value, switchKey);
    }
  }
  render() {
    let { radius } = this.state;
    let { picture, title1, title2, value, onTintColor, tintColor, switchStyle, disabled, disabledCard } = this.props;
    let subTitleRN = <Text
      style={styles.title2}
      numberOfLines={1}
    >{title2}</Text>;
    let subTitle = title2 ? subTitleRN : null;
    let opacity = disabledCard ? .3 : 1;
    return (
      <View style={[
        styles.card,
        // radius,
        { opacity }
      ]}>
        <Image
          source={picture}
          style={styles.picture}
        />
        <View style={styles.title}>
          <Text
            numberOfLines={1}
            style={styles.title1}
          >{title1}</Text>
          {subTitle}
        </View>
        <View style={styles.switchView}>
          <Switch
            value={value}
            onValueChange={this.changeSwitchValue}
            onTintColor={onTintColor}
            tintColor={tintColor}
            style={switchStyle}
            disabled={disabled}
          />
        </View>
      </View>
    );
  }
}
IndependentCard.defaultProps = {
  radiusType: 'all',
  picture: -1,
  title1: '',
  title2: '',
  value: false,
  switchKey: '',
  changeValue: function () { },
  onTintColor: Styles.common.MHGreen,
  tintColor: OFF_COLOR,
  switchStyle: {},
  disabled: false,
  disabledCard: false
}
IndependentCard.propTypes = {
  radiusType: PropTypes.string,
  picture: PropTypes.number,
  title1: PropTypes.string,
  title2: PropTypes.string,
  switchKey: PropTypes.string,
  value: PropTypes.bool,
  changeValue: PropTypes.func,
  onTintColor: PropTypes.string,
  tintColor: PropTypes.string,
  switchStyle: PropTypes.object,
  disabled: PropTypes.bool,
  disabledCard: PropTypes.bool
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picture: {
    width: pictureLength,
    height: pictureLength,
    borderRadius: pictureLength / 2,
    marginRight: 14,
  },
  title: {
    flex: 1,
  },
  title1: {
    fontSize: 15,
    color: 'black',
  },
  title2: {
    fontSize: 12,
    color: '#666'
  },
  switchView: {
    paddingLeft: 30,
  }
});
export default IndependentCard;