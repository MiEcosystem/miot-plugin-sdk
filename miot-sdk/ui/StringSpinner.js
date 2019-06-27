/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 23
 * @since 10020
 * @module miot/ui/StringSpinner
 * @description 字符串选择器,兼容NumberSpinner（支持NumberSpinner的所有属性）
 *
 * @example
 *
 <StringSpinner
    style={{ width: 300, height: 300, backgroundColor: '#ffffff', }}
    dataSource={['a', 'b', 'c', 'd']}
    defaultValue={'c'}
    pickerInnerStyle={{ lineColor: "#cc0000", textColor: "#ff0000", selectTextColor: "#0000FF", fontSize: 12, selectFontSize: 30, rowHeight: 70, selectBgColor: "#f5f5f5" }}
    onValueChanged={(data) => { this.updateOneValue(data) }}
/>
 *
 *
 * @property {bool}    visible 是否可见
 * @property {style} style - 开关样式，仅支持宽高
 * @property {array<string>}   dataSource 数据源
 * @property {string}  defaultValue 默认值
 * @property {func}    onValueChanged 值改变的回调
 * @property {string}    unit 单位 默认：无
 * @property {string}  pickerInnerStyle.textColor 文字颜色 默认值 #000000
 * @property {string}  pickerInnerStyle.selectTextColor 文字选中颜色 默认值 #00aa71
 * @property {string}  pickerInnerStyle.selectBgColor 文字选中背景 默认值 #ffffff
 * @property {string}  pickerInnerStyle.unitTextColor 单位字体颜色 默认值 #00aa71
 * @property {string}  pickerInnerStyle.lineColor 分割线颜色 默认值 #e5e5e5
 * @property {number}  pickerInnerStyle.fontSize 文字大小 默认值 22
 * @property {number}  pickerInnerStyle.selectFontSize 文字选中大小 默认值 22
 * @property {number}  pickerInnerStyle.unitFontSize 单位字体大小 默认值 12
 * @property {number}  pickerInnerStyle.rowHeight 行高 默认值 42
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
    render() {
         return null
    }
}