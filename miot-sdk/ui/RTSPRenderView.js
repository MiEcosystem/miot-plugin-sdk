/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @since 10035
 * @module miot/ui/
 * @description RTSP视频渲染组件
 */
//@native begin
import React from 'react';
import { requireNativeComponent, NativeModules, findNodeHandle } from 'react-native';
const merge = require('merge');
const MHRTSPView = requireNativeComponent('MHRTSPView');
//@native end
export default class RTSPRenderView extends React.Component {
    componentWillUnmount() {
        NativeModules.MHRTSPViewManager.stopPlay(
            findNodeHandle(this.refs.rtspView)
        );
    }
    render() {
        nativeProps = merge(this.props, {});
        return <MHRTSPView
        ref="rtspView"
        {...nativeProps} />
        //@native end
    }
    setPath(path) {
        //@native :=> null
        return new Promise((resolve, reject) => {
            if (Platform.OS === 'android') {
            } else {
                NativeModules.MHRTSPViewManager.setPath(
                    findNodeHandle(this.refs.rtspView),
                    path,
                    (success) => {
                        if (success) {
                            resolve();
                        } else {
                            reject();
                        }
                    }
                );
            }
        });
        //@native-end
    }
}