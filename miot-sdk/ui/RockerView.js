/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @since 10074
 * @module miot/ui/
 * @description 摇杆组件，在RN中PanResponder在响应事件的同时，其余的Touchable组件无法响应onPress事件，此时可以用这个组件来代替PanResponder手势
 */
import React from "react";
import PropTypes from "prop-types";
import { requireNativeComponent } from "react-native";
const MHRockerView = requireNativeComponent('MHRockerView');
export default class RockerView extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    onGestureStart: PropTypes.func,
    onGestureMove: PropTypes.func,
    onGestureEnd: PropTypes.func
  }
  constructor(props) {
    super(props);
  }
  render() {
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
  }
}