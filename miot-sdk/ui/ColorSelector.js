/**
 * 色彩选择器 （新版）
 * Note：支持多个或一个滑块在同一个色盘上移动，但是同一时间仅可移动一个滑块。
 *    1. 当滑块数量只有一个时，可以支持点击色盘空白区域而更改颜色，且支持在空白区域开始滑动。同时支持拖动滑块更改颜色
 *    2. 当滑块数量多于一个时，不能点击色盘空白区域和更改颜色，且仅支持拖动滑块而更改颜色。
 * Note：回调发出： 当颜色更改时  会发出 onColorChange 回调 （滑块颜色改变时回调（若不指定初始化颜色，滑块初始化会按照随机颜色进行初始化，这时也会发生回调））
 *                当拖动开始时  会发出 onTrackStart  回调 （空白区域滑动和滑块滑动都会发出该回调）
 *                当拖动结束时  会发出 onTrackEnd    回调 （空白区域滑动和滑块滑动都会发出该回调）
 * Note: 该组件暂不支持无障碍
 * @since 10080
 * @param {<object>} style
 * @param {<string>} type 预留字段，10080 只支持rgb
 * @param {<bool>} disable 是否可用，不接受任何触摸事件，但是可能会发出回调
 * @param {<array>} colors 传入的渐变颜色范围，若不指定，将使用默认的rgb色盘 目前只支持3位或6位RGB色 eg：['#ff0000', '#ffff00', '#ffffff']
 * @param {<array>} positions 可选参数，传入的渐变颜色的位置返回，是一个[0, 1]的增量数组。
 *                            若传入positions，其长度必须和colors length一致 eg: [0.0, 0.3, 1.0]
 *                            若不传，将默认为等差数列排列colors
 * @param {<number>} indicatorRadius 指定颜色选择器的圆形指示器的半径大小，默认为23
 * @param {<bool>} allowIndicatorOverlap 是否允许多个指示器之间可以重叠。默认无法重叠，这个属性通常在多个指示器共存的时候有效果
 * @param {<bool>} showIndicator 是否显示选择滑块，默认不显示
 * @param {<bool>} showIndicatorText 滑块上是否显示文字，默认不显示，若 showIndicatorView 为false，则文字一定不显示
 * @param {<array>} indicatorTexts 滑块上文字的集合，若传入的数量和滑块的数量不一致，则不足的地方显示为空
 * @param {<func>} onColorChange 颜色改变时的回调，
 *                              参数：(color, index, colors)
 *                                分别代表 当前改变的颜色，当前改变的滑块的index，所有滑块的颜色集合
 *                               color颜色返回值格式为FFFFF 10092版本开始统一改为#FFFFFF格式
 * @param {<func>} onTrackStart 滑块开始拖动的时候的回调
 *                              参数：（index） 当前移动的滑块的index
 * @param {<func>} onTrackEnd 滑块结束拖动时的回调
 *                              参数：（index） 当前移动的滑块的index
 */
export default class ColorSelector extends React.Component {
  static propTypes = {
    style: PropTypes.any,
    type: PropTypes.oneOf(['rgb']),
    disable: PropTypes.bool,
    colors: PropTypes.array,
    positions: PropTypes.array,
    indicatorRadius: PropTypes.number,
    allowIndicatorOverlap: PropTypes.bool,
    showIndicator: PropTypes.bool,
    showIndicatorText: PropTypes.bool,
    showBorder: PropTypes.bool,
    showWhite: PropTypes.bool,
    indicatorTexts: PropTypes.array,
    onColorChange: PropTypes.func,
    onTrackStart: PropTypes.func,
    onTrackEnd: PropTypes.func,
    accessible: PropTypes.bool,
    accessibilityLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    accessibilityHint: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }
  render() {
    let {
      style,
      type,
      disable,
      colors,
      positions,
      indicatorRadius,
      allowIndicatorOverlap,
      showIndicatorText,
      showIndicator,
      indicatorTexts,
      onColorChange,
      showBorder,
      showWhite,
      onTrackStart,
      onTrackEnd,
      accessible,
      accessibilityLabel,
      accessibilityHint
    } = this.props;
    if (type === undefined || type === 'rgb') {
      colors = (colors || []).length > 0 ? colors : (isIOS ?
        ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#E62EE3', '#E62EB5', '#E6312E'] :
        ['#E6312E', '#E6842E', '#E6D72E', '#98E62E', '#2EE62F', '#2EE67C', '#2ED5E6', '#2E79E6', '#302EE6', '#7D2EE6', '#E62EE3', '#E62EB5', '#E6312E']);
    }
  }
  /**
   * 变换触摸点的数量
   * 若 number > indicatorColors.length 则number多余部分随机显示颜色
   * 若 number < indicatorColors.length 则number不足部分不改变颜色
   * note：若number与实际点不一致，该方法会初始化所有点，重绘界面
   * note：若只想改变点的颜色而不改变点的数量，推荐使用方法 setColorWithIndex
   * @param {<number>} number : 要改变的点的数量，最小值为0，为 0 时移除所有点
   * @param {<array>} indicatorColors : 改变点的初始化颜色
   */
  setIndicatorNumberWithColors(number, indicatorColors = []) {
    number = Math.max(0, number);
    indicatorColors = indicatorColors || [];
     return null
     return null