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
    style={{ width: 300, height: 300, backgroundColor: '#ffffff', }}
    dataSource={['a', 'b', 'c', 'd']}
    defaultValue={'c'}
    pickerInnerStyle={{ lineColor: "#cc0000", textColor: "#ff0000", selectTextColor: "#0000FF", fontSize: 12, selectFontSize: 30, rowHeight: 70, selectBgColor: "#f5f5f5" }}
    onValueChanged={(data) => { this.updateOneValue(data) }}
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
    render() {
         return null
    }
}