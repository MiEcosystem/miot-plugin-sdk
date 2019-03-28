/**
 * @export
 * @module miot/ui/NumberSpinner
 * @description 数字选择器
 * @example
 * 
    <NumberSpinner
        style={{width:200, height:100}}
        maxValue={30}
        minValue={1}
        defaultValue={5}
        unit={"km"}
        onNumberChanged={data=>{
            console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`);
        }}
    />
 * 
 */
export default class NumberSpinner extends React.Component {
  static defaultProps = {
    valueFormat: Platform.select({ ios: '%0.0f' })
  }
  static propTypes = {
    /**
     * 是否可见
     * @member {bool}
     */
    visible: PropTypes.bool,
    /**
     * 单位
     * @member {string}
     */
    label: PropTypes.string,
    /**
     * max
     * @member {int}
     */
    maxValue: PropTypes.number,
    /**
     * min
     * @member {int}
     */
    minValue: PropTypes.number,
    /**
     * 步长，默认为1
     * @member {int}
     */
    interval: PropTypes.number,
    /**
     * 缺省值
     * @member {int}
     */
    defaultValue: PropTypes.number,
    /**
     * 格式
     * @member {string}
     */
    valueFormat: PropTypes.string,
    /**
     * 回调
     * @member {func} 
     * 
     */
    onNumberChanged: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
     return null
  }
}