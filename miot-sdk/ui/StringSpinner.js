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
 * @property {string}  textColor 文字颜色 默认值 0x000000
 * @property {number}  fontSize  文字大小 默认值 22
 * @property {string}  selectTextColor 文字选中颜色 默认值 0x00aa71
 * @property {number}  selectFontSize  文字选中大小 默认值 22
 * @property {string}  selectBgColor 文字选中背景 默认值 0xffffff
 * @property {string}  lineColor 分割线颜色 默认值 0xe5e5e5
 * @property {number}  rowHeight  行高 默认值 42
 */
export default class StringSpinner extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        dataSource: PropTypes.array,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        onValueChanged: PropTypes.func,
        textColor: PropTypes.string,
        fontSize: PropTypes.number,
        selectTextColor: PropTypes.string,
        selectFontSize: PropTypes.number,
        selectBgColor: PropTypes.string,
        lineColor: PropTypes.string,
        rowHeight: PropTypes.number,
        ...ViewPropTypes,
    };
    componentWillMount() {
        this.realprops = { ...this.props };
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