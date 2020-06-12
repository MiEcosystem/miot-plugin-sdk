import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Clickable from './Clickable';
import { AccessibilityPropTypes, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
const { width: screenWidth } = Dimensions.get('window');
const DEFAULT_SIZE = 50;
const DEFAULT_MARGIN = 12;
/**
 * @export
 * @author Geeook
 * @since 10011
 * @module NormalGear
 * @description 档位控件，点按选择
 * @property {array<string>|array<number>} options - 档位可选项，以字符串数组表示，必填
 * @property {number} margin - 档位选项之间的间距，默认 12, 示意图 |12🛑12⭕️12|
 * @property {number} maxWidth
 * 容器宽度最大值，不传则默认屏幕宽度。
 * 如果所有档位的宽度 + 间距占据的宽度 <= maxWidth，则取实际宽度；
 * 否则容器宽度取 maxWidth，各个档位的宽度和间距自适应减小。
 * @property {style} containerStyle - 容器样式，设置宽高无效
 * @property {style} normalStyle - 普通档位样式，如果没有设置宽高，则默认宽高为 50
 * @property {style} textStyle - 档位文字的样式
 * @property {string} selectColor - 被选择档位的背景色
 * @property {number} selectIndex - 被选择档位的数组下标
 * @property {bool} allowFontScaling - 10040新增 字体大小是否随系统大小变化而变化, 默认值为true
 * @property {number} numberOfLines - 10040新增 文字最多显示的行数
 * @property {function} onSelect - 选择某档位后的回调函数
 */
export default class NormalGear extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    containerStyle: PropTypes.object,
    normalStyle: PropTypes.object,
    textStyle: PropTypes.object,
    margin: PropTypes.number,
    maxWidth: PropTypes.number,
    selectColor: PropTypes.string,
    selectIndex: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
    allowFontScaling: PropTypes.bool,
    numberOfLines: PropTypes.number,
    accessible: AccessibilityPropTypes.accessible,
    clickAccessibilityLables: PropTypes.arrayOf(AccessibilityPropTypes.accessibilityLabel),
    clickAccessibilityHints: PropTypes.arrayOf(AccessibilityPropTypes.accessibilityHint)
  }
  static defaultProps = {
    options: [],
    normalStyle: {},
    margin: DEFAULT_MARGIN,
    maxWidth: screenWidth,
    selectIndex: 0,
    allowFontScaling: true,
    clickAccessibilityLables: [],
    clickAccessibilityHints: []
  }
  constructor(props, context) {
    super(props, context);
    referenceReport('NormalGear');
    if (this.props.options.length === 0) {
      this.showNothing = true;
      return;
    }
    // 计算容器实际宽度，选项实际宽度，实际间距
    const { optionWidth, margin, containerWidth } = this.getCorrectLayout();
    this.optionWidth = optionWidth;
    this.margin = margin;
    this.containerWidth = containerWidth;
    console.log(`选项宽度 ${ optionWidth } 间距 ${ margin } 总体宽度 ${ containerWidth }`);
    // 也不能太拥挤吧
    if (this.optionWidth < 20) {
      this.showNothing = true;
      if (__DEV__ && console.warn) {
        console.warn('在目前maxWidth下显示不了这么多选项，请重新规划');
      }
      return;
    }
    // 初始状态，全部为 false
    this.selectArray = Array.from({ length: this.props.options.length }, () => false);
    const selectArray = Array.from(this.selectArray);
    selectArray[this.props.selectIndex] = true;
    this.state = {
      selectArray
    };
  }
  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.showNothing) return;
    const { selectIndex } = newProps;
    if (selectIndex !== this.props.selectIndex) {
      if (selectIndex < 0 || selectIndex >= this.props.options.length) return;
      this.onPress(selectIndex);
    }
  }
  renderOptions() {
    const style = StyleSheet.flatten([
      this.props.normalStyle,
      {
        width: this.optionWidth,
        height: this.optionWidth,
        borderRadius: this.optionWidth / 2
      }
    ]);
    return this.props.options.map((option, index) => {
      return (
        <Clickable
          key={option}
          allowFontScaling={this.props.allowFontScaling}
          numberOfLines={this.props.numberOfLines}
          select={this.state.selectArray[index]}
          selectColor={this.props.selectColor}
          onPress={() => this.onPress(index)}
          text={option}
          style={style}
          textStyle={this.props.textStyle}
          {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityLabel: this.props.clickAccessibilityLables[index] || option,
            accessibilityHint: this.props.clickAccessibilityHints[index]
          })}
        />
      );
    });
  }
  /**
     * @description 根据选项的宽度、间距和 maxWidth ，计算容器实际宽度，选项实际宽度，实际间距
     * @returns {{optionWidth, margin, containerWidth}}
     */
  getCorrectLayout() {
    const optionWidth = this.props.normalStyle.width || DEFAULT_SIZE; // 选项宽度
    const { margin, maxWidth } = this.props; // 间距、容器最大宽度
    const length = this.props.options.length; // 选项个数
    const containerWidth = (optionWidth + margin) * length + margin; // 容器宽度
    // 如果宽度不溢出，则取原值
    if (containerWidth <= maxWidth) return { optionWidth, margin, containerWidth };
    // 如果宽度溢出，则按照 `optionWidth = 2 * margin` 策略重新计算
    const newOptionWidth = Math.floor(maxWidth / (length + (length + 1) * 0.5));
    const newMargin = newOptionWidth / 2;
    const newContainerWidth = (3 * length + 1) * newMargin;
    return {
      optionWidth: newOptionWidth,
      margin: newMargin,
      containerWidth: newContainerWidth
    };
  }
  render() {
    if (this.showNothing) return null;
    return (
      <View style={[this.props.containerStyle, styles.container, { width: this.containerWidth }]}>
        {this.renderOptions()}
      </View>
    );
  }
  onPress(index) {
    const selectArray = Array.from(this.selectArray); // copy instead of use directly
    selectArray[index] = true;
    this.setState({ selectArray });
    if (this.props.onSelect) {
      this.props.onSelect(index);
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});