/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @since 10074
 * @module miot/ui/
 * @description 摇杆组件，仅供追觅皮皮灯设备使用
 */
// native begin
import React from "react";
import PropTypes from "prop-types";
import { requireNativeComponent } from "react-native";
const MHRockerView = requireNativeComponent('MHRockerView');
// native end
export default class RockerView extends React.Component {
  static propTypes = {
    enableClick: PropTypes.bool,
    enableDrag: PropTypes.bool,
    onClick: PropTypes.func,
    onGestureStart: PropTypes.func,
    onGestureMove: PropTypes.func,
    onGestureEnd: PropTypes.func
  }
  render() {
    // native begin
    const { onClick, onGestureStart, onGestureMove, onGestureEnd } = this.props;
    return (<MHRockerView
      { ...this.props }
      onClick={ (evt) => {
        if (onClick) {
          onClick(evt.nativeEvent);
        }
      } }
      onGestureStart={ (evt) => {
        if (onGestureStart) {
          onGestureStart(evt.nativeEvent);
        }
      } }
      onGestureMove={ (evt) => {
        if (onGestureMove) {
          onGestureMove(evt.nativeEvent);
        }
      } }
      onGestureEnd={ (evt) => {
        if (onGestureEnd) {
          onGestureEnd(evt.nativeEvent);
        }
      } }
    />);
    // native end
  }
}