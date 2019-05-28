/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 23
 * @since 10020
 * @module miot/ui/StringSpinner
 * @description 字符串选择器
 *
 * @example
 *
 <StringSpinner
    style={{width:200, height:100}}
    dataSource={['a','b','c','d']}
    defaultValue={"d"}
    lineColor="#cc0000"
    textColor="#ff0000"
    selectTextColor="#0000FF"
    fontSize={12}
    selectFontSize={30}
    rowHeight={50}
    selectBgColor="#f5f5f5"
    onValueChanged={data=>{
        console.log(`newValue:${data}`);
    }}
 />
 *
 *
 * @property {bool}    visible 是否可见
 * @property {array}   dataSource 数据源
 * @property {object}  defaultValue 默认值
 * @property {func}    onValueChanged 值改变的回调
 * 
 * @property {object}  pickerInnerStyle picker内部属性，包含了以下字段：
 * textColor 文字颜色 默认值 0x000000
 * fontSize  文字大小 默认值 22
 * selectTextColor 文字选中颜色 默认值 0x00aa71
 * selectFontSize  文字选中大小 默认值 22
 * selectBgColor 文字选中背景 默认值 0xffffff
 * lineColor 分割线颜色 默认值 0xe5e5e5
 * rowHeight  行高 默认值 42
 */
export default class StringSpinner extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        dataSource: PropTypes.array,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        onValueChanged: PropTypes.func,
        pickerInnerStyle: PropTypes.object,
        ...ViewPropTypes,
    };
    componentWillMount() {
        this.realprops = { ...this.props };
        let pickerInnerStyle = this.realprops.pickerInnerStyle;
        this.realprops = Object.assign(this.realprops, pickerInnerStyle);
        delete this.realprops.pickerInnerStyle;
        this.realprops.onValueChanged = (event) => {
            if (this.props.onValueChanged) {
                this.props.onValueChanged({ ...event.nativeEvent });
            }
        }
    }
    render() {
         return null
    }
}