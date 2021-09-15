/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @since 10054
 * @module miot/ui/
 * @description 轨迹图组件
 */
export default class OrbitView extends React.Component {
  static propTypes = {
    lineColor: PropTypes.string,
    lineWidth: PropTypes.number,
    scale: PropTypes.number,
    deviceWidth: PropTypes.number,
    deviceHeight: PropTypes.number,
    maxPressure: PropTypes.number,
    revokeTimes: PropTypes.number
  }
  render() {
  }
  /**
   * 渲染点
   * @param {<PointObject[]>} points : 路径所包含的点的数组{x:1,y:2,pressure:, state:{Int}}
   */
  displayPoints(points) {
     return null
  }
  /**
   * 是否可撤销
   * @return {object} 成功时：bool, 失败时 [string, null, string]
   * @readonly
   */
  canRevoke() {
     return Promise
  }
  /**
   * 撤销
   */
  revoke() {
     return null
  }
  /**
   * 清除
   */
  clear() {
     return null
  }
}