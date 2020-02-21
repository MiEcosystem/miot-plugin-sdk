import PropTypes from 'prop-types';
import React from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from 'react-native';
import Styles from '../../resources/Styles';
import Block from "./Block";
import LinearGradient from 'react-native-linear-gradient';
import {transformHexToDigtal, transformDigtalToHex, colorGetterforRange} from '../../utils/colors';
/**
 * @description 容器和滑块的圆角类型
 * @enum {string}
 */
const TYPE = {
    /**
    * 圆形 ⭕️
    */
    CIRCLE: 'circle',
    /**
     * 方形 ⬜️
     */
    RECTANGLE: 'rectangle'
}
/**
 * @description 滑动内容的类型
 * @enum {string}
 */
const CONTENTTYPE = {
    /**
    * 数值
    */
    NUM: 'num',
    /**
     * 颜色
     */
    COLOR: 'color',
    /**
     * 色温
     */
    COLORTEM: 'colorTem'
}
const COLORRANGE = {
    "0.00": '#FFA100',
    "0.10": '#FFFA00',
    "0.20": '#9AFF00',
    "0.30": '#01FF00',
    "0.40": '#00FDA4',
    "0.50": '#00EEFF',
    "0.60": '#007CFF',
    "0.70": '#0600F9',
    "0.80": '#BF00FC',
    "0.90": '#FF0081',
    "1.00": '#FF0000'
}
const COLORTEMRANGE = {
    "0.00": '#FFAE00',
    "0.50": '#F6EFD6',
    "1.00": '#8AB2D4'
}
Object.freeze(TYPE);
Object.freeze(CONTENTTYPE);
const { width: screenWidth } = Dimensions.get('window');
const DEFAULT_SIZE = 40; // 滑块默认大小
const MIN_MARGIN = 5; // 滑块和容器的最小间距
const MARGIN = 7.5; // 滑块和容器的默认间距
const MAX_MARGIN = 10; // 滑块和容器的最大间距
const DEFAULT_HEIGHT = DEFAULT_SIZE + MARGIN * 2; // 容器默认高度
const DEFAULT_BLOCK_COLOR = '#fff'; // 滑块默认颜色
/**
 * @export
 * @author Geeook
 * @since 10022
 * @module SlideGear
 * @description 档位控件，滑动选择
 * @property {TYPE} type - 容器和滑块的圆角类型
 * @property {array<string>} options - 档位可选项，以字符串数组表示，必填
 * @property {bool} showEndText - 是否显示两端的文字，即`options`的第一个和最后一个，默认`true`
 * @property {style} containerStyle - 容器样式，设置背景颜色无效
 * @property {style} blockStyle - 滑块样式，尺寸始终比容器小
 * @property {string} minimumTrackTintColor - 滑块左侧填充颜色
 * @property {string} leftTextColor - 最左侧文字颜色，`showEndText = true`时有效
 * @property {string} maximumTrackTintColor - 滑块右侧填充颜色
 * @property {string} rightTextColor - 最右侧文字颜色，`showEndText = true`时有效
 * @property {number} value - 被选择档位的数组下标, `0<=value<=options.length -1` 或者是位于optionMin、optionMax直接的某一个值
 * @property {boolean} disabled - 是否禁用交互，默认`false`
 * @property {function} onValueChange - 滑动时的回调函数
 * @property {function} onSlidingComplete - 滑动结束的回调函数
 * @property {number} optionMin - 按范围和步长进行拖拽时的最小范围
 * @property {number} optionMax - 按范围和步长进行拖拽时的最大范围
 * @property {number} optionStep - 按范围和步长进行拖拽时的步长
 * @property {number} contentType - 滑动内容的类型，数值（默认）、颜色、色温
 * @property {object} colorRangeObject - 颜色对象
 * @property {object} colorTemRangeObject - 色温对象
 */
export default class SlideGear extends React.Component {
    static propTypes = {
        type: PropTypes.oneOf([TYPE.CIRCLE, TYPE.RECTANGLE]),
        options: PropTypes.array.isRequired,
        showEndText: PropTypes.bool,
        containerStyle: PropTypes.object,
        blockStyle: PropTypes.object,
        minimumTrackTintColor: PropTypes.string,
        leftTextColor: PropTypes.string,
        maximumTrackTintColor: PropTypes.string,
        rightTextColor: PropTypes.string,
        value: PropTypes.number,
        disabled: PropTypes.bool,
        onValueChange: PropTypes.func,
        onSlidingComplete: PropTypes.func.isRequired,
        optionMin: PropTypes.number,
        optionMax: PropTypes.number,
        optionStep: PropTypes.number,
        contentType: PropTypes.oneOf([CONTENTTYPE.NUM, CONTENTTYPE.COLOR, CONTENTTYPE.COLORTEM]),
        colorRangeObject: PropTypes.object,
        colorTemRangeObject: PropTypes.object
    }
    static defaultProps = {
        type: TYPE.CIRCLE,
        options: [],
        showEndText: true,
        containerStyle: {},
        blockStyle: {},
        minimumTrackTintColor: Styles.common.MHGreen,
        leftTextColor: '#eee',
        maximumTrackTintColor: '#dfe2e3',
        rightTextColor: '#999',
        value: 0,
        disabled: false,
        optionMin: 0,
        optionMax: 0,
        optionStep: 0,
        contentType: CONTENTTYPE.NUM,
        colorRangeObject: COLORRANGE,
        colorTemRangeObject: COLORTEMRANGE,
    }
    /**
     * @description 容器和滑块的圆角类型
     * @enum {string}
     */
    static TYPE = TYPE
    static CONTENTTYPE = CONTENTTYPE
    constructor(props, context) {
        super(props, context);
        if (this.props.options.length === 0) {
            if(!this.props.optionStep) {
                console.warn('options 为空数组 且无 optionStep');
                this.showNothing = true;
                return;
            } else { // option为range、step形式
                this.optionMin = this.props.optionMin;
                this.optionMax = this.props.optionMax;
                this.optionStep = this.props.optionStep;
                this.length = (this.optionMax - this.optionMin) / this.optionStep + 1
            }
        } else { // options为数组形式
            this.options = this.props.options;
            this.length = this.props.options.length;
        }
        const { margin, blockWidth, blockHeight, containerHeight } = this.getCorrectLayout();
        this.margin = margin;
        this.blockWidth = blockWidth;
        this.blockHeight = blockHeight;
        this.containerHeight = containerHeight;
        
        console.log(`滑块高度: ${blockHeight}\n滑块宽度: ${blockWidth}\n滑块周围间距: ${margin}\n容器高度: ${containerHeight}`);
        this.state = {
            pan: new Animated.Value(0),
            moveX: new Animated.Value(0),
            value: this.props.value,
            dragToValueMin: 0,
            dragToValueMax: 0,
        };
        this.translateX = 0; // 记录拖拽距离
        this.offset = 0; // 手势触摸点和中心左边偏差值
        this.constructPanResponder(props);
    }
    /**
     * 根据传参动态创建手势控制器
     * @param {object} props
     */
    constructPanResponder(props) {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: () => !props.disabled,
            onMoveShouldSetPanResponderCapture: () => !props.disabled,
            onShouldBlockNativeResponder: () => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
            onPanResponderMove: Animated.event([null, { dx: this.state.pan, moveX: this.state.moveX }]),
            onPanResponderRelease: this._onPanResponderRelease.bind(this),
            onPanResponderTerminate: this._onPanResponderRelease.bind(this)
        });
    }
    /**
     * 接收 options / value 动态变化
     * @param {object} newProps
     */
    componentWillReceiveProps(newProps) {
      console.log(11111111, newProps);
        if (this.sliding) {  // 为了避免不必要的冲突，在滑动时，拒绝一切外部状态更新
            return;
        }
        const { value, disabled } = newProps;
        if (disabled !== this.props.disabled) {
            this.constructPanResponder(newProps);
        }
        if(this.optionStep) { // option为range、step形式
            const { optionMin, optionMax, optionStep } = newProps;
            if(optionMin === this.state.optionMin &&
               optionMax === this.state.optionMax &&
               optionStep === this.state.optionStep &&
               value === this.props.value) {
                   return
            }
            this.optionMin = optionMin;
            this.optionMax = optionMax;
            this.optionStep = optionStep;
            this.length = (this.optionMax - this.optionMin) / this.optionStep + 1
            if (value !== this.props.value) {
                this.state.value = value;
            }
        } else { // options为数组形式
            const { options } = newProps;
            if ((value === this.state.value) && this.isSameArray(options, this.props.options)) return; // 没有变化
            if (!this.isSameArray(options, this.props.options)) { // options 变化
                if (!(options instanceof Array) || options.length === 0) { // 更新后的 options 不是数组或者是空数组
                    console.warn('options 不是数组或者是空数组');
                    this.showNothing = true;
                    return;
                }
                else { // options 正确更新
                    this.showNothing = false;
                    this.options = options;
                    this.length = options.length;
                }
            }
            if (value !== this.props.value) { // value 变化
                if (value < 0 || value >= this.length) { // 更新后的 value 越界
                    console.warn('value 不在 options 范围内');
                    this.state.value = 0; // 如果越界，设置一个默认值
                }
                else {
                    this.state.value = value; // value 正确更新
                }
            }
        }
        this.calculateCoord(this.containerLayout); // 根据更新后的 options 和 value 重新计算 滑块坐标  和各个选项坐标或者间隙d
    }
    /**
     * 判断两个数组是否完全相等
     * @param {array} arr1
     * @param {array} arr2
     */
    isSameArray(arr1, arr2) {
        if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false;
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
    componentWillMount() {
        // 拖拽变化值监听
        this.state.pan.addListener(e => {
            const { dragToValueMin: min, dragToValueMax: max } = this.state;
            if (e.value >= min && e.value <= max) {
                this.translateX = e.value;
            }
            else {
                this.translateX = e.value < min ? min : max;
            }
            this._background.setNativeProps({
                width: this.translateX + this.margin * 2 + this.blockWidth - this.state.dragToValueMin
            })
        });
        // 拖拽手势坐标监听
        this.state.moveX.addListener(e => {
            const index = this.getClosetIndex(e.value); // 滑块滑动后的物理值（options数组情况下是数组的下标，option为范围时是范围内的具体值）
            if (this.props.onValueChange) {
                if(this.props.contentType === CONTENTTYPE.COLOR) { // 根据滑块滑动后的物理值，计算该值对应的颜色值
                    const colorValue = this.getColorFromValue(index)
                    this.props.onValueChange(colorValue);
                } else {
                    this.props.onValueChange(index);
                }
                
            }
        });
    }
    /**
     * @description 
     * options数组情况下：获取距离拖拽元素最近的选项下标
     *                  根据释放时的绝对坐标和各个选项的绝对坐标距离做对比
     * options范围情况下：根据step计算出范围内的某一值
     */
    getClosetIndex(moveX) {
        const adjustCoord = moveX - this.offset; // 拖拽过程中Block的中心点坐标
        console.log("拖拽过程中Block的中心点坐标adjustCoord: ", adjustCoord)
        if(this.optionStep) { // 返回范围内的value值
            let value
            if(adjustCoord <= this.firstCoord) {
                value = this.optionMin
            } else if(adjustCoord >= this.endCoord) {
                value = this.optionMax
            } else {
                const index = Math.round((adjustCoord - this.firstCoord) / this.d)
                value = index * this.optionStep + this.optionMin
                if(value > this.optionMax) value = this.optionMax
            }
            console.log("get step value: ", value)
            return value
        } else { // 返回options数组的某个下标
            const diffs = this.coords.map(coord => Math.abs(coord - adjustCoord));
            return diffs.indexOf(Math.min(...diffs));
        }
    }
    /**
     * @description contentType为“color”类型时，物理滑块范围比如0至#fff：即optionMin=0至optionMax=16777215，这时滑块滑动的物理范围计算是按此范围计算，
     * 但是颜色值是按照this.props.colorRange渐变的，所以需要将物理范围的value值即滑块的位置转变成真正的渐变颜色colorValue
     */
    getColorFromValue(value) {
        const getter = colorGetterforRange(this.props.colorRangeObject)
        const colorHex =  getter.getColorFromPercent((value - this.props.optionMin) / (this.props.optionMax - this.props.optionMin) * 100)
        const colorValue = transformHexToDigtal(colorHex)
        return colorValue
    }
    /**
     * @description contentType为“color”类型时，物理滑块范围比如0至#fff：即optionMin=0至optionMax=16777215，这时滑块滑动的物理范围计算是按此范围计算，
     * 但是组件的属性值this.props.value是真正的颜色值colorValue，所以需要按照this.props.colorRange渐变的算法，计算出物理范围的value值即滑块的位置（optionMin=0至optionMax=16777215之间的某值）
     */
    getValueFromColor(colorValue) {
        const getter = colorGetterforRange(this.props.colorRangeObject)
        const percent =  getter.getPercentFromColor(transformDigtalToHex(colorValue))
        const value = this.props.optionMin + (this.props.optionMax - this.props.optionMin) * (percent / 100)
        return value
    }
    /**
     * @description 手势开始回调
     */
    _onPanResponderGrant(e, gesture) {
        // 每次拖拽手势开始时，需要重置
        this.sliding = true; // 表示正在滑动交互
        this.state.pan.setOffset(this.translateX);
        this.state.pan.setValue(0);
        // 为了准确确定释放位置，需要在起手的时候，计算出手势触摸点和中心点的偏差
        const { pageX } = e.nativeEvent;
        this.offset = pageX - this.currentCoord;
        console.log('⬇️⬇️⬇️⬇️⬇️⬇️⬇️滑动开始⬇️⬇️⬇️⬇️⬇️⬇️⬇️');
        console.log(`滑块中心坐标: ${this.currentCoord}\n触摸点坐标: ${pageX}\nthis.translateX: ${this.translateX}`);
    }
    /**
     * @description 手势释放回调
     */
    _onPanResponderRelease(e, gesture) {
        const coord = gesture.moveX - this.offset;
        console.log("计算currentCoord时的coord：", coord)
        if(this.optionStep) {
            if (coord >= this.firstCoord && coord <= this.endCoord) {
                this.currentCoord = coord;
            }
            else {
                console.log("coord越界")
                this.currentCoord = coord < this.firstCoord ? this.firstCoord : this.endCoord;
                console.log("currentCoord: ", this.currentCoord)
            }
        } else {
            const min = this.coords[0];
            const max = this.coords[this.length - 1];
            if (coord >= min && coord <= max) {
                this.currentCoord = coord;
            }
            else {
                this.currentCoord = coord < min ? min : max;
            }
        }
        const index = this.getClosetIndex(gesture.moveX);
        if(this.props.contentType !== CONTENTTYPE.COLOR) {
            this.state.value = index;
        }
        if (this.props.onSlidingComplete) {
            if(this.props.contentType === CONTENTTYPE.COLOR) {
                const colorValue = this.getColorFromValue(index)
                this.state.value = colorValue
                this.props.onSlidingComplete(colorValue);
            } else {
                this.props.onSlidingComplete(index);
                this.state.value = index;
            }
        }
        this.offset = 0;
        console.log(`手势结束坐标: ${coord}\n滑块最终坐标: ${this.currentCoord}\n离滑块最近的选项下标: ${index}`);
        console.log('⬆️⬆️⬆️⬆️⬆️⬆️⬆️滑动结束⬆️⬆️⬆️⬆️⬆️⬆️⬆️');
        this.sliding = false;
    }
    /**
     * @description 根据选项的宽度、间距和 maxWidth ，计算容器实际宽度，选项实际宽度，实际间距
     * @returns {{margin,blockWidth, blockHeight,containerHeight, containerWidth}}
     */
    getCorrectLayout() {
        const containerHeight = this.props.containerStyle.height || DEFAULT_HEIGHT; // 容器高度 50
        const blockWidth = this.props.blockStyle.width || DEFAULT_SIZE; // 滑块宽度
        // 重新计算
        let margin = ~~(containerHeight / 10); //5
        margin = margin > MAX_MARGIN ? MAX_MARGIN : margin;  //5
        margin = margin < MIN_MARGIN ? MIN_MARGIN : margin; //5
        const blockHeight = containerHeight - margin * 2; //50 - 10
        return {
            margin,
            blockWidth: this.props.type === TYPE.CIRCLE ? blockHeight : blockWidth,
            blockHeight,
            containerHeight,
        };
    }
    _onLayout() {
        this._container.measure((x, y, w, h, px, py) => {
            this.calculateCoord({ x, y, w, h, px, py });
        })
    }
    /**
     * @description 计算整个容器的大小和在屏幕上的位置，从而确定每个选项的圆心坐标
     */
    calculateCoord(obj) {
        if(!obj) {
          return;
        }
        const { x, y, w, h } = obj;
        this.containerLayout = obj;
        const offset = this.margin * 2 + this.blockWidth;
        const startCoord = x + offset / 2;
        const d = this.optionStep ? (w - offset) / this.length : (w - offset) / (this.length - 1);
        this.d = d
        console.log(`容器起始坐标: ${x}\n实际宽度: ${w}\n各选项中心坐标间距: ${d}`);
        if (d <= 0) {
            console.warn('容器实际宽度 < 滑块宽度，滑块无法移动，请仔细检查 containerStyle 或者增加容器的宽度');
        }
        if(!this.optionStep) {
            this.coords = this.options.map((v, i) => d > 0 ? (startCoord + d * i) : 0);
            console.log('各选项中心坐标', this.coords);
            this.currentCoord = this.coords[this.state.value];
        } else {
            this.firstCoord = startCoord
            this.endCoord = startCoord + d * this.length
            if(this.props.contentType !== CONTENTTYPE.COLOR) {
                this.currentCoord = startCoord + d * ((this.state.value - this.optionMin) / this.optionStep)
            } else {
                const value = this.getValueFromColor(this.state.value) // 从传入的颜色十进制值换算出滑块的位置value
                this.currentCoord = startCoord + d * (Math.round((value - this.optionMin) / this.optionStep))
            }
            
        }
        
        this.totalWidth = w;
        this.getDragRange();
    }
    /**
     * @description 计算可拖拽的范围
     */
    getDragRange(callback) {
        if(!this.optionStep) {
            this.setState({
                dragToValueMin: this.coords[0] - this.currentCoord || 0,
                dragToValueMax: this.coords[this.length - 1] - this.currentCoord || 0,
            }, _ => {
                console.log(`滑块中心坐标: ${this.currentCoord}\n可滑动范围: ${this.state.dragToValueMin} ~ ${this.state.dragToValueMax}`);
                callback && callback();
                this.state.pan.setOffset(0);
                this.state.pan.setValue(0);
            });
        } else {
            console.log("计算drag范围时的currentCoord： ", this.currentCoord)
            this.setState({
                dragToValueMin: this.firstCoord - this.currentCoord || 0,
                dragToValueMax: this.endCoord - this.currentCoord || 0,
            }, _ => {
                console.log(`滑块中心坐标: ${this.currentCoord}\n可滑动范围: ${this.state.dragToValueMin} ~ ${this.state.dragToValueMax}`);
                callback && callback();
                this.state.pan.setOffset(0);
                this.state.pan.setValue(0);
            });
        }
        
    }
    /**
     * @description 滑块
     */
    renderDraggable() {
        const { dragToValueMin: min, dragToValueMax: max } = this.state;
        // 在没有找到自我定位的时候，要在舞台后面低调
        if (min === undefined) return null;
        // 可拖拽元素初始绝对定位
        const position = {
            position: 'absolute',
            // left: -min,
            left: - min - this.margin,
            top: - this.margin
        }
        // 显示区域
        const innerCircle = this.props.type === TYPE.CIRCLE
            ? {
                width: this.blockHeight,
                height: this.blockHeight,
                borderRadius: this.blockHeight / 2,
            }
            : {
                width: this.blockWidth,
                height: this.blockHeight,
                borderRadius: 0,
            }
        // 手势响应区域
        const touchArea = {
            // width: this.blockWidth + this.margin * 2, //40 + 10
            width: this.blockWidth + this.margin * 4, //40 + 20
            // height: this.containerHeight, //50
            height: this.containerHeight + this.margin * 2, //50 + 10
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
        }
        // 动效
        const panStyle = {
            transform: [
                {
                    translateX: this.state.pan.interpolate({
                        inputRange: [min - 1, min, max, max + 1],
                        outputRange: [min, min, max, max],
                    })
                }
            ]
        }
        return (
            <Block
                panHandlers={this.panResponder.panHandlers}
                style={[position, panStyle]}
            >
                <View style={touchArea}>
                    <View
                        style={[
                            { backgroundColor: DEFAULT_BLOCK_COLOR },
                            this.props.blockStyle,
                            innerCircle
                        ]}
                    />
                </View>
            </Block>
        )
    }
    /**
     * 滑块左侧背景
     */
    renderBackground() {
      const { dragToValueMin: min, dragToValueMax: max } = this.state;
      // 在没有找到自我定位的时候，要在舞台后面低调
      if (min === undefined) return null;
        return (
            <Animated.View
                ref={background => this._background = background}
                style={{
                    position: 'absolute',
                    // width: this.margin * 2 + this.blockWidth - (this.state.dragToValueMin || 0),
                    width: this.state.pan.interpolate({
                      inputRange: [min - 1, min, max, max + 1],
                      outputRange: [this.margin * 2 + this.blockWidth, this.margin * 2 + this.blockWidth, this.totalWidth, this.totalWidth]
                    }),
                    height: this.containerHeight,
                    borderRadius: this.props.type === TYPE.CIRCLE ? this.containerHeight / 2 : 0,
                    backgroundColor: this.props.contentType === CONTENTTYPE.NUM ? this.props.minimumTrackTintColor : ''
                }}
            >
                {this.props.showEndText
                    ? <View
                        style={[
                            styles.textContainer,
                            {
                                margin: this.margin,
                                alignSelf: 'flex-start',
                                width: this.blockWidth + this.margin * 2,
                                height: this.blockHeight,
                            }
                        ]}
                    >
                        <Text style={[
                            styles.text,
                            {
                                color: this.props.leftTextColor,
                            }
                        ]}>
                            {this.optionStep ? this.optionMin : this.options[0]}
                        </Text>
                    </View>
                    : null
                }
            </Animated.View>
        )
    }
    /**
     * 最右侧文字
     */
    renderRightText() {
        let width = this.blockWidth + this.margin * 2
        if (this.optionStep && this.optionMax > 999999) {
            width += 20
        }
        return (
            <View
                style={[
                    styles.textContainer,
                    {
                        margin: this.margin,
                        alignSelf: 'flex-end',
                        width: width,
                        height: this.blockHeight,
                    }
                ]}
            >
            {
                this.props.showEndText
                ? <Text style={[
                    styles.text,
                    {
                        color: this.props.rightTextColor,
                    }
                    ]}>
                        {this.optionStep ? this.optionMax : this.options[this.length - 1]}
                 </Text>
                : null
            }
                
            </View>
        )
    }
    render() {
        if (this.showNothing) return null;
        const containerStyle = {
            height: this.containerHeight,
            borderRadius: this.props.type === TYPE.CIRCLE ? this.containerHeight / 2 : 0,
            backgroundColor: this.props.contentType === CONTENTTYPE.NUM ? this.props.maximumTrackTintColor : ''
        };
        const opacity = this.props.disabled ? 0.3 : 1;
        return (
            
                <View
                    onLayout={_ => this._onLayout()}
                    ref={container => this._container = container}
                    style={[
                        this.props.containerStyle,
                        containerStyle,
                        { opacity }
                    ]}
                >
                    {
                        this.props.contentType === CONTENTTYPE.NUM
                        ? (
                            <View>
                                {this.renderRightText()}
                                {this.renderBackground()}
                                {this.renderDraggable()}
                            </View>
                        )
                        : (
                            <LinearGradient
                             start={{x: 0, y: 0}}
                             end={{x: 1, y: 0}}
                             locations={this.props.contentType === CONTENTTYPE.COLOR
                                ? Object.keys(this.props.colorRangeObject).map(value => Number(value))
                                : Object.keys(this.props.colorTemRangeObject).map(value => Number(value))
                             }
                             colors={this.props.contentType === CONTENTTYPE.COLOR ? Object.values(this.props.colorRangeObject) : Object.values(this.props.colorTemRangeObject)}
                             style={{ borderRadius: this.props.type === TYPE.CIRCLE ? this.containerHeight / 2 : 0 }}
                            >
                                {this.renderRightText()}
                                {this.renderBackground()}
                                {this.renderDraggable()}
                            </LinearGradient>
                        )
                    }
                    
                </View>
        );
    }
}
const styles = StyleSheet.create({
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        width: '100%',
        textAlign: 'center'
    }
})