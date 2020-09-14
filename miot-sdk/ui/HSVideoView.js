import React from 'react';
import { requireNativeComponent, UIManager, findNodeHandle, ViewPropTypes } from "react-native";
import PropTypes from 'prop-types';
const RCTHSVideoView = requireNativeComponent("RCTHSVideoView");
export default class HSVideoView extends React.Component {
  static propTypes = {
    style: PropTypes.any,
    camParams: PropTypes.object,
    fixType: PropTypes.number,
    displayMode: PropTypes.number,
    source: PropTypes.string,
    isPlaying: PropTypes.bool,
    paused: PropTypes.bool,
    muted: PropTypes.bool,
    isScaleZoom: PropTypes.bool,
    fullscreenState: PropTypes.bool,
    onVideoViewClick: PropTypes.func,
    onProgress: PropTypes.func,
    onTimestamp: PropTypes.func,
    onRender: PropTypes.func,
    onCompleted: PropTypes.func,
    onScreenshot: PropTypes.func,
    onError: PropTypes.func,
    ...ViewPropTypes
  }
  constructor(props) {
    super(props);
    this.videoView = null;
  }
  static defaultProps = {
    onVideoViewClick: null,
    onProgress: null,
    onTimestamp: null,
    onRender: null,
    onCompleted: null,
    onScreenshot: null
  }
  render() {
    return (
      <RCTHSVideoView 
        style={this.props.style}
        ref={(ref) => { this.videoView = ref; }}
        {...this.props}
      />
    );
  }
  screenshot(type, path) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.screenshot, [type, path]);
  }
  seekTo(time) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.seekTo, [time]);
  }
  resetZoomScale() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.resetZoomScale, []);
  }
  cleanSurface() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.cleanSurface, []);
  }
  release() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.release, []);
  }
}