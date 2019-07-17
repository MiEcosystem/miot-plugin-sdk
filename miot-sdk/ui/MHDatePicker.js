import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Modal, Platform, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { strings, Styles } from '../resources';
import { formatString } from '../resources/Strings';
import Separator from './Separator';
import StringSpinner from "./StringSpinner";
/**
 * @description 时间选择器类型
 * @enum {string}
 */
const TYPE = {
  /**
   * 单个picker
   */
  SINGLE: 'single',
  /**
   * 选择小时分钟，24小时制
   */
  TIME24: 'time24',
  /**
   * 选择小时分钟，12小时制
   */
  TIME12: 'time12',
  /**
   * 选择年月日
   */
  DATE: 'date'
}
Object.freeze(TYPE);
/**
 * @description 单个picker时选择器的类型，也就是显示的单位
 * @enum {string}
 */
const SINGLE_TYPE = {
  /**
   * 月
   */
  MONTH: 'month',
  /**
   * 日
   */
  DAY: 'day',
  /**
   * 时
   */
  HOUR: 'hour',
  /**
   * 分
   */
  MINUTE: 'minute',
  /**
   * 秒
   */
  SECOND: 'second'
}
Object.freeze(SINGLE_TYPE);
/**
 * 
 * @param {number} length 
 * @param {bool} zeroPrefix 是否前补0
 * @param {bool} fromZero 是否从0开始
 */
function constructArray(length, zeroPrefix = true, fromZero = false) {
  const maxLength = (length - (fromZero ? 1 : 0)).toString().length;
  return Array.from({ length }, (v, i) => {
    return ((zeroPrefix ? '0000000000000' : '') + (i + (fromZero ? 0 : 1))).slice(-maxLength);
  });
}
const screenBackgroundColor = 'rgba(0,0,0,0.4)';
const margin = 10;
const borderRadius = 15;
const titleHeightThin = 66;
const titleHeightFat = 85;
const rowHeight = 52;
const pickerContainerHeight = Platform.select({ android: rowHeight * 5, ios: 220 });
const buttonHeight = 50;
const { width, height } = Dimensions.get('window');
const modalWidth = width - margin * 2;
// 选择器样式，固定
const pickerInnerStyle = {
  lineColor: Styles.common.hairlineColor,
  textColor: '#666666',
  fontSize: 15,
  selectTextColor: "#333333",
  selectFontSize: 20,
  unitTextColor: '#333333',
  unitFontSize: 10,
  rowHeight,
  selectBgColor: "#f3f3f3"
}
const months = constructArray(12, 1, 0);
const days = constructArray(31, 1, 0);
const hours24 = constructArray(24, 1, 1);
const timeSystem = [strings.am, strings.pm];
const hours12 = hours24.slice(1, 13);
const minutes = constructArray(60, 1, 1);
const singleDataSource = {
  [SINGLE_TYPE.MONTH]: months,
  [SINGLE_TYPE.DAY]: days,
  [SINGLE_TYPE.HOUR]: constructArray(24, 1, 0),
  [SINGLE_TYPE.MINUTE]: constructArray(60, 1, 0),
  [SINGLE_TYPE.SECOND]: constructArray(60, 1, 0),
}
Object.freeze(singleDataSource);
const days31 = ['01', '03', '05', '07', '08', '10', '12'];
const days30 = ['04', '06', '09', '11'];
const defaultYearOffset = 15;
/**
 * @export
 * @author Geeook
 * @since 10021
 * @module MHDatePicker
 * @description 米家插件常用的时间选择器
 * @param {string} animationType - modal 显示动效, 参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible -  是否显示 modal, 参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} title - 标题
 * @param {bool} showSubtitle - 是否显示副标题，副标题显示的内容固定，和`type`有关 
 * @param {string} confirmColor - 确定按钮的颜色，默认米家绿
 * @param {TYPE} type - 时间选择器类型, enum('single', 'time24', 'time12', 'date')
 * @param {SINGLE_TYPE} singleType - 单个picker时的选择器类型, enum('month', 'day', 'hour', 'minute', 'second')
 * @param {array<string>|array<number>|Date} current - 当前选中值，可传入数字数组，字符串数组，Date实例，对所有时间选择器类型有效
 * @param {array<string>|array<number>|Date} min - 最小值，可传入数字数组，字符串数组，Date实例，只对`'single'`和`'date'`类型生效
 * @param {array<string>|array<number>|Date} max - 最大值，可传入数字数组，字符串数组，Date实例，只对`'single'`和`'date'`类型生效
 * @param {function} onSelect - 选好之后的回调函数，返回所有picker的选中值 组成的数组 / 拼接的字符串 / 以及计算出的Date实例, 详见使用 demo
 * @param {function} onDismiss - 点击`Modal`内容外面/取消按钮/确定按钮，Modal隐藏时的回调函数
 */
export default class MHDatePicker extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    title: PropTypes.string,
    showSubtitle: PropTypes.bool,
    confirmColor: PropTypes.string,
    type: PropTypes.oneOf([TYPE.DATE, TYPE.SINGLE, TYPE.TIME12, TYPE.TIME24]),
    singleType: PropTypes.oneOf([
      SINGLE_TYPE.MONTH,
      SINGLE_TYPE.DAY,
      SINGLE_TYPE.HOUR,
      SINGLE_TYPE.MINUTE,
      SINGLE_TYPE.SECOND
    ]),
    current: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.instanceOf(Date)
    ]),
    min: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.instanceOf(Date)
    ]),
    max: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.instanceOf(Date)
    ]),
    onSelect: PropTypes.func,
    onDismiss: PropTypes.func,
  }
  static defaultProps = {
    animationType: 'fade',
    visible: false,
    title: '开启时间',
    showSubtitle: true,
    confirmColor: Styles.common.MHGreen,
    type: TYPE.TIME24,
    singleType: SINGLE_TYPE.MINUTE,
    onSelect: obj => console.log(obj),
  }
  /**
   * @description 时间选择器类型
   * @enum {string}
   */
  static TYPE = TYPE;
  /**
   * @description 单个picker时选择器的类型，也就是显示的单位
   * @enum {string}
   */
  static SINGLE_TYPE = SINGLE_TYPE;
  constructor(props, context) {
    super(props, context);
    const { currentArray, dataSourceArray } = this.init(props);
    const subtitle = this.getSubtitle(currentArray);
    this.state = {
      visible: this.props.visible,
      dataSourceArray, // 待显示的数据源数组
      currentArray, // 当前选中值数组
      subtitle,
    };
  }
  /**
   * 根据时间选择器类型、app 语言和初始值数组显示不同模板的副标题文案
   * @param {*} arr 
   */
  getSubtitle(arr) {
    if (this.props.type === TYPE.SINGLE) {
      const count = parseInt(arr[0]);
      const unit = count > 1 ? strings[this.props.singleType + 's'] : strings[this.props.singleType]; // 英文单复数单位
      return formatString(strings.singleSubTitle, count, unit);
    }
    return formatString({
      [TYPE.DATE]: strings.dateSubTitle,
      [TYPE.TIME24]: strings.time24SubTitle,
      [TYPE.TIME12]: strings.time12SubTitle,
    }[this.props.type], ...arr);
  }
  /**
   * 根据类型将 Date 实例或者 Array<number> 转换成 ['','','']形式
   * @param {*} cur 
   * @param {string} type 
   */
  convert(cur) {
    const { type } = this.props;
    if (cur instanceof Date) {
      switch (type) {
        case TYPE.DATE:
          return this.convert([cur.getFullYear(), cur.getMonth() + 1, cur.getDate()]);
        case TYPE.TIME24:
          return this.convert([cur.getHours(), cur.getMinutes()]);
        case TYPE.TIME12:
          return this.convertTo12([cur.getHours(), cur.getMinutes()]);
        case TYPE.SINGLE:
          return ['01'];
        default:
          return ['01'];
      }
    }
    else if (cur instanceof Array) {
      switch (type) {
        case TYPE.DATE:
          return cur.slice(0, 3).map((v, i) => i === 0 ? ('' + v) : (('0' + v).slice(-2)));
        case TYPE.TIME24:
          return cur.slice(0, 2).map(v => ('0' + v).slice(-2));
        case TYPE.TIME12:
          return this.convertTo12(cur);
        case TYPE.SINGLE:
          return cur.slice(0, 1).map(v => ('0' + v).slice(-2));
        default:
          return ['01'];
      }
    }
    // 异常处理1
    else if (typeof cur === 'string'
      || typeof cur === 'number') {
      return [cur + ''];
    }
    // 异常处理2
    else {
      return ['01'];
    }
  }
  /**
   * 将24小时制的数组转换成12小时制的数组
   * @param {Array} arr 
   */
  convertTo12(arr) {
    if (arr.length === 2) {
      let newArr = arr.map(v => parseInt(v));
      if (newArr.every(v => Number.isInteger)) {
        let res;
        if (newArr[0] === 0) {
          res = [strings.am, 12, newArr[1]];
        }
        else {
          const timeSystem = newArr[0] > 11 ? strings.pm : strings.am; // 下午 12:34
          const hour = newArr[0] > 12 ? (newArr[0] - 12) + '' : newArr[0] + '';
          const minute = newArr[1] + '';
          res = [timeSystem, hour, minute];
        }
        return res.map((v, i) => i > 0 ? ('0' + v).slice(-2) : v);
      }
    }
    return this.convert(new Date());
  }
  /**
   * 截取部分数组
   * @param {array} arr 
   * @param {*} head 
   * @param {*} tail 
   */
  slice(arr, head, tail) {
    if (head === undefined && tail === undefined) return arr;
    const index = arr.indexOf(('0' + head).slice(-2)) || 0;
    const lastIndex = arr.lastIndexOf(('0' + tail).slice(-2)) || arr.length - 1;
    return arr.slice(index, lastIndex + 1);
  }
  /**
   * 计算出年份的范围
   * @param {*} min 
   * @param {*} max 
   */
  getYears(min, max) {
    this.min = this.convert(min); //留一份滚动比较时候用
    this.max = this.convert(max);
    const minY = Number.parseInt(this.min[0]);
    const maxY = Number.parseInt(this.max[0]);
    return this.generateArray(minY, maxY);
  }
  /**
   * 根据极值生成步长为1的数组，并转换成字符串
   * @param {number} min 
   * @param {number} max 
   */
  generateArray(min, max) {
    if (min > max) {
      console.warn('max < min');
      return [];
    }
    return Array.from({ length: max - min + 1 }, (v, i) => i + min).map(v => v + '');
  }
  /**
   * 初始化数据，包括每个picker的范围和选中值
   */
  init(props) {
    const { type, singleType, current, min, max } = props;
    const currentArray = this.convert(current || new Date());
    switch (type) {
      case TYPE.DATE:
        const yearNow = new Date().getFullYear();
        const minDefault = new Date();
        minDefault.setFullYear(yearNow - defaultYearOffset); // Date 模式下，如果没 min，就往回 defaultYearOffset 年
        const maxDefault = new Date();
        maxDefault.setFullYear(yearNow + defaultYearOffset); // 如果没 max，就往后 defaultYearOffset 年
        const years = this.getYears(min || minDefault, max || maxDefault);
        const dataSourceArray = [years, months, days];
        this.updateDays(currentArray, dataSourceArray);
        this.unitArray = [strings.yearUnit, strings.monthUnit, strings.dayUnit];
        return {
          currentArray,
          dataSourceArray,
        }
      case TYPE.TIME24:
        this.unitArray = [strings.hourUnit, strings.minuteUnit];
        return {
          currentArray,
          dataSourceArray: [hours24, minutes],
        }
      case TYPE.TIME12:
        this.unitArray = ['', strings.hourUnit, strings.minuteUnit];
        return {
          currentArray,
          dataSourceArray: [timeSystem, hours12, minutes],
        }
      case TYPE.SINGLE:
      default:
        this.unitArray = [strings[singleType + 'Unit']];
        return {
          currentArray,
          dataSourceArray: [this.slice(singleDataSource[singleType], min, max)],
        }
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({ visible: newProps.visible });
    }
    if (newProps.current === undefined
      || newProps.current !== this.props.current) {
      const currentArray = this.convert(newProps.current || new Date());
      this.setState({
        currentArray,
        subtitle: this.getSubtitle(currentArray)
      });
    }
  }
  /**
   * 标题部分
   */
  renderTitle() {
    const height = {
      height: this.props.showSubtitle ? titleHeightFat : titleHeightThin
    }
    return (
      <View style={[styles.titleContainer, height]}>
        <Text
          numberOfLines={1}
          style={[Styles.common.title, styles.title]}
        >
          {this.props.title || ''}
        </Text>
        {this.props.showSubtitle
          ? <Text
            numberOfLines={1}
            style={styles.subtitle}
          >
            {this.state.subtitle}
          </Text>
          : null
        }
      </View>
    )
  }
  /**
   * picker 部分
   */
  renderContent() {
    const { currentArray, dataSourceArray } = this.state;
    const length = currentArray.length;
    const actualWidth = modalWidth - (length - 1) * StyleSheet.hairlineWidth; // 去掉分割线的真实宽度
    const normalWidth = actualWidth / length; // 均分宽度
    const yearWidth = normalWidth + 10; // 日期选择器的年份picker宽度稍微大一点
    const monthWidth = (actualWidth - yearWidth) / 2;
    return (
      <View style={styles.pickerContainer}>
        {dataSourceArray.map((dataSource, index) => {
          let style = { width: normalWidth };
          if (this.props.type === TYPE.DATE) {
            if (index === 0) style = { width: yearWidth };
            else style = { width: monthWidth };
          }
          return (
            <View style={[{ flexDirection: 'row' }, style]}>
              <StringSpinner
                key={index + this.unitArray[index]}
                style={style}
                unit={this.unitArray[index]}
                dataSource={dataSource}
                defaultValue={currentArray[index]}
                pickerInnerStyle={pickerInnerStyle}
                onValueChanged={data => this._onValueChanged(index, data)}
              />
              {index < length - 1
                ? <Separator type='column' style={{ height: pickerContainerHeight }} />
                : null
              }
            </View>
          )
        })}
      </View>
    )
  }
  /**
   * 底部按钮
   */
  renderButton() {
    return (
      <View style={styles.buttons}>
        <TouchableHighlight
          style={[styles.button, { borderBottomLeftRadius: borderRadius }]}
          onPress={_ => this.dismiss()}
          underlayColor='rgba(0,0,0,.05)'
        >
          <Text style={styles.buttonText}>
            {strings.cancel}
          </Text>
        </TouchableHighlight>
        <Separator type='column' style={{ height: buttonHeight }} />
        <TouchableHighlight
          style={[styles.button, { borderBottomRightRadius: borderRadius }]}
          onPress={_ => this.confirm()}
          underlayColor='rgba(0,0,0,.05)'
        >
          <Text style={[styles.buttonText, { color: this.props.confirmColor }]}>
            {strings.ok}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
  render() {
    return (
      <Modal
        animationType={this.props.animationType}
        transparent={true}
        visible={this.state.visible}
        onRequestClose={_ => this.dismiss()}
      >
        <View style={styles.background}>
          <TouchableWithoutFeedback
            onPress={_ => this.dismiss()}
          >
            <View style={{ width, height }} />
          </TouchableWithoutFeedback>
          <View style={styles.modal}>
            {this.renderTitle()}
            <Separator />
            {this.renderContent()}
            <Separator />
            {this.renderButton()}
          </View>
        </View>
      </Modal>
    );
  }
  /**
   * 是否是闰年
   * @param {number} y 
   */
  isLeapYear(y) {
    return ((y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0 && y % 3200 !== 0));
  }
  /**
   * 比较`Date`时间数组的时间前后 ['2017','06','01'] > ['2017','05','31']
   * @param {array} arrA 
   * @param {array} arrB 
   */
  compareDateArray(arrA, arrB) {
    return arrA.join('') - arrB.join('');
  }
  /**
   * 计算当前年份和月份下的天数
   * @param {array} newCurrentArray 
   * @param {array<array>} newDataSourceArray 
   */
  updateDays(newCurrentArray, newDataSourceArray) {
    const [year, month, day] = newCurrentArray;
    if (days31.includes(month)) {
      newDataSourceArray[2] = days;
    }
    else if (days30.includes(month)) {
      newDataSourceArray[2] = days.slice(0, 30);
    }
    else {
      // 闰年2月29天, 平年28天
      if (this.isLeapYear(parseInt(year))) {
        newDataSourceArray[2] = days.slice(0, 29);
      }
      else {
        newDataSourceArray[2] = days.slice(0, 28);
      }
    }
    // 5月31日 -> 6月30日
    if (!newDataSourceArray[2].includes(day)) {
      newCurrentArray[2] = newDataSourceArray[2][newDataSourceArray[2].length - 1];
    }
  }
  /**
   * Picker 滚动回调
   * @param {number} index 
   * @param {object} data 
   */
  _onValueChanged(index, data) {
    let newCurrentArray = [...this.state.currentArray];
    newCurrentArray[index] = data.newValue;
    let newDataSourceArray = [...this.state.dataSourceArray];
    this.setState({
      currentArray: newCurrentArray,
      subtitle: this.getSubtitle(newCurrentArray)
    }, _ => {
      if (this.props.type === TYPE.DATE) {
        let needUpdate = false;
        // 判断是否越界
        if (this.compareDateArray(newCurrentArray, this.max) > 0) {
          newCurrentArray = this.max;
          needUpdate = true;
        }
        if (this.compareDateArray(newCurrentArray, this.min) < 0) {
          newCurrentArray = this.min;
          needUpdate = true;
        }
        this.updateDays(newCurrentArray, newDataSourceArray);
        if (newDataSourceArray[2].length !== this.state.dataSourceArray[2].length) {
          needUpdate = true;
        }
        needUpdate && this.setState({
          subtitle: this.getSubtitle(newCurrentArray),
          currentArray: newCurrentArray,
          dataSourceArray: newDataSourceArray,
        });
      }
    });
  }
  /**
   * 隐藏 Modal
   */
  dismiss() {
    this.setState({ visible: false });
    this.props.onDismiss && this.props.onDismiss();
  }
  /**
   * 把时间数组转成 `Date` 实例
   * ['2019','06','03'] -> new Date()
   * ['15','36'] -> new Date()
   * ['下午','03','36'] -> new Date()
   */
  array2Date() {
    const { currentArray } = this.state;
    let date = new Date();
    switch (this.props.type) {
      case TYPE.DATE:
        date.setFullYear(currentArray[0]);
        date.setMonth(parseInt(currentArray[1]) - 1);
        date.setDate(parseInt(currentArray[2]));
        break;
      case TYPE.TIME24:
        date.setHours(currentArray[0]);
        date.setMinutes(currentArray[1]);
        break;
      case TYPE.TIME12:
        let hour = parseInt(currentArray[1]);
        if (currentArray[0] === strings.am) {
          hour = hour === 12 ? 0 : hour;
        }
        else {
          hour = hour < 12 ? hour + 12 : hour;
        }
        date.setHours(hour);
        date.setMinutes(currentArray[2]);
        break;
      case TYPE.SINGLE:
      default:
        return null;
    }
    return date;
  }
  confirm() {
    if (this.props.onSelect) {
      this.props.onSelect({
        rawArray: this.state.currentArray,
        rawString: this.state.subtitle,
        date: this.array2Date()
      });
    }
    this.dismiss();
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: screenBackgroundColor
  },
  modal: {
    position: 'absolute',
    bottom: 20,
    width: modalWidth,
    marginHorizontal: margin,
    backgroundColor: '#fff',
    borderRadius,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'D-DINCondensed-Bold',
  },
  subtitle: {
    width: modalWidth,
    textAlign: 'center',
    fontSize: 13,
    color: '#666'
  },
  pickerContainer: {
    flexDirection: 'row',
    height: pickerContainerHeight,
    justifyContent: 'space-between'
  },
  buttons: {
    height: buttonHeight,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 19,
    color: '#666',
    fontFamily: 'D-DINCondensed-Bold' // TODO: 英文字体，中文加粗效果
  }
});