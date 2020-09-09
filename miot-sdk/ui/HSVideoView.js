import React from 'react';
import { requireNativeComponent, UIManager, findNodeHandle } from "react-native";
import PropTypes from 'prop-types';
import HSVideoViewModule from './HSVideoViewModule';
const RCTHSVideoView = requireNativeComponent("RCTHSVideoView");
const kPlayProgressCallback = 'playProgressCallback';
const kPlayTimestampCallback = 'playTimestampCallback';
const kVideoViewTouchCallback = 'videoViewTouchCallback';
const kPlayCompletedCallback = 'playCompletedCallback';
const kVideoRenderCallback = 'videoRenderCallback';
export default class HSVideoView extends React.Component {
  constructor(props) {
    super(props);
    this.videoView = null;
    this.playProgressCallback = null;
    this.playTimestapmCallback = null;
    this.playCompletedCallback = null;
    this.videoViewTouchCallback = null;
    this.videoRenderCallBack = null;
  }
  static propTypes = {
    style: PropTypes.any,
    onVideoViewTouch: PropTypes.func
  }
  static defaultProps = {
    onVideoViewTouch: null
  }
  render() {
    return(
      <RCTHSVideoView 
        style={this.props.style}
        ref={(ref) => { this.videoView = ref; }}
      />
    )
  }
  setDisplayMode(type) {
    HSVideoViewModule.setDisplayMode(type);
  }
  setCamParam(camType, panoX, panoY, panoR) {
    HSVideoViewModule.setCamParam(camType, panoX, panoY, panoR);
  }
  setVideoSize(width, height) {
    HSVideoViewModule.setVideoSize(width, height);
  }
  setFixType(type) {
    HSVideoViewModule.setFixType(type);
  }
  renderYUVData(data, width, height) {
    HSVideoViewModule.renderYUVData(data, width, height);
  }
  resetZoomScale() {
    HSVideoViewModule.resetZoomScale();
  }
  cleanSurface() {
    HSVideoViewModule.cleanSurface();
  }
  screenshot(type, path) {
    return new Promise((resolve, reject) => {
      HSVideoViewModule.screenshot(type, path).then((result) => {
        resolve(result);
      });
    }).catch((error) => {
      reject(error);
    });
  }
  isPlaying() {
    return new Promise((resolve, reject) => {
      HSVideoViewModule.isPlaying().then((result) => {
        resolve(result);
      });
    }).catch((error) => {
      reject(error);
    })
  }
  startVideo(path) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.startVideo, [path]);
  }
  stopVideo() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.stopVideo, []);
  }
  resumeVideo() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.resumeVideo, []);
  }
  pauseVideo() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.pauseVideo, []);
  }
  startAudio() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.startAudio, []);
  }
  stopAudio() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.stopAudio, []);
  }
  seekTo(time) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.seekTo, [time]);
  }
  release() {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this.videoView), UIManager.RCTHSVideoView.Commands.release, []);
  }
}