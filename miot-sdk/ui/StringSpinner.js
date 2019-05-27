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
        unit={"km"}
        onValueChanged={data=>{
            console.log(`newValue:${data}`);
        }}
    />
 *  
 * 
 * @property {bool} visible 是否可见
 * @property {array} dataSource 数据源
 * @property {object} defaultValue 默认值
 * @property {func} onValueChanged 值改变的回调
 */
export default class StringSpinner extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        dataSource: PropTypes.array,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        onValueChanged: PropTypes.func,
        ...ViewPropTypes,
    };
    render() {
         return null
    }
}