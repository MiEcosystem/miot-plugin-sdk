
import React from 'react';
import PropTypes from 'prop-types';
import { PackageEvent, API_LEVEL, Package, Device, Service, Host, Native } from 'miot';

import {
    requireNativeComponent, findNodeHandle,
    NativeModules,
    DeviceEventEmitter,
    StyleSheet,
    View, ViewPropTypes, Text, Button
} from 'react-native';

import Orientation from 'react-native-orientation';

import { SafeAreaView } from 'react-native';

import RTSPRenderView from 'miot/ui/RTSPRenderView';

const kFFmpegProcessCallbackName = 'kFFmpegProcessCallbackName';

export default class RTSPPage extends React.Component {
    static navigationOptions = {
        headerTransparent: true
    };

    static propTypes = {
        isPlay: PropTypes.bool,
        isMute: PropTypes.bool,
        progress: PropTypes.number,
        duration: PropTypes.number,
        ...ViewPropTypes,
    };

    state = {
        path: '',
        isPlay: false,
        isMute: false,
        progress: 0,
        duration: 0,
        newProgress: 0,
        testButtonName: "测试转码",
        resizeMode:"none",
        selectedVideoTrack: -1
    }

    componentDidMount() {

        this.props.navigation.setParams({
            title: "Camera Name",
            type: 'light',
            style: { backgroundColor: 'transparent' },
            onPressRight: () => {
                alert('asdf2');
                console.log("right menu")
            }
        })

        Orientation.lockToPortrait()

        that = this;
        DeviceEventEmitter.addListener(kFFmpegProcessCallbackName, function (process) {
            console.log(process);
            that.setState({
                testButtonName: "转码:" + process.process
            });
        });

        this.exitListener = PackageEvent.packageWillExit.addListener(()=>{
          this.exitListener.remove();
          this.refs.rtspDemo.stopPlay();
        })
    }

    componentWillUnmount() {
        Orientation.lockToPortrait()
        this.refs.rtspDemo.stopPlay();
    }

    render() {
        return (
            <View style={styles.main}>
                <SafeAreaView style={{ backgroundColor: "black" }}></SafeAreaView>
                <RTSPRenderView
                    ref="rtspDemo"
                    style={styles.videoNormal}
                    path={this.state.path}
                    isPlay={this.state.isPlay}
                    onPlaySuccess={_ =>
                        alert('播放成功')
                    }

                    onPlayFail={_ =>
                        alert('播放失败')
                    }

                    isMute={this.state.isMute}
                    progress={this.state.newProgress}
                    onChangeDuration={(e) => {
                      console.log("onDuration:", e.nativeEvent);
                      this.setState({
                        duration: e.nativeEvent.duration
                      })
                    }
                        
                    }
                    onChangeProgress={(e) =>{
                      console.log("onChangeProgress:", e.nativeEvent);

                      this.setState({
                        progress: e.nativeEvent.progress
                      })
                     }
                        
                    }

                    onLoad={(e) => {
                      console.log("onLoad", e.nativeEvent);
                    }}

                    onEnd={(e) => {
                      console.log("onEnd");
                      this.setState({
                        progress: 0,
                        isPlay: false,
                        newProgress:0,
                      })
                    }}

                    resizeMode={this.state.resizeMode}

                    selectedVideoTrack = {this.state.selectedVideoTrack}
                >
                </RTSPRenderView>
                <View style={styles.videoToolBar}>
                    <Button style={styles.videoToolBarItem}
                        onPress={() => {
                            this.setState({
                                //rtsp://192.168.1.105/mjcamera.mkv
                                path: '/sdcard/track.mp4'
                            })
                        }}
                        title="设置path"
                    />
                    <Button style={styles.videoToolBarItem}
                        onPress={() => {
                            this.setState({
                                isPlay: !this.state.isPlay
                            })
                        }}
                        title={this.state.isPlay ? "暂停" : "播放"}
                    />
                    <Button style={styles.videoToolBarItem}
                        onPress={() => {
                            this.setState({
                                isMute: !this.state.isMute
                            })
                        }}
                        title={this.state.isMute ? "声音" : "静音"}
                    />
                    <Button style={styles.videoToolBarItem}
                        onPress={() => {
                            this.setState({
                                newProgress: this.state.progress + 10
                            })
                        }}
                        title="快进10"
                    />
                    <Text style={styles.videoToolBarItem}>
                        {this.state.progress} / { this.state.duration }
                    </Text>
                    <Button style={styles.videoToolBarItem}
                        onPress={()=>
                            Service.miotcamera.ffmpegCommand(
                                'ffmpeg -i rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov -target ntsc-vcd ' + NativeModules.MIOTPackage.localFilePath + '/' + Date.now() + '.mpg',
                                kFFmpegProcessCallbackName,
                                (isSuccess, errInfo) => {
                                    this.setState({
                                        testButtonName: isSuccess ? "转码成功" : "转码失败:" + JSON.stringify(errInfo)
                                    })
                                }
                            )
                        }
                        title={this.state.testButtonName}
                    />
                </View>

                <View style={styles.videoToolBar}>
                    <Button style={styles.videoToolBarItem}
                        onPress={() => {
                          if (this.state.resizeMode === "none") {
                            this.state.resizeMode = "contain";
                          } else if (this.state.resizeMode === "contain") {
                            this.state.resizeMode = "cover";
                          } else if (this.state.resizeMode === "cover") {
                            this.state.resizeMode = "stretch";
                          } else if (this.state.resizeMode === "stretch") {
                            this.state.resizeMode = "none";
                          } 
                            this.setState({
                                //rtsp://192.168.1.105/mjcamera.mkv
                                resizeMode:this.state.resizeMode
                            })
                        }}
                        title="sizeMode"
                    />

                    <Button style={styles.videoToolBarItem}
                        onPress={()=>{
                           this.setState({
                             selectedVideoTrack: this.state.selectedVideoTrack >= 0? (1- this.state.selectedVideoTrack): 0
                           })
                        }}
                        title={"videotrack"}
                        />
                    
                </View>
                <SafeAreaView></SafeAreaView>
            </View>
        )
    }

    handleChange(event) {
        this.setState({
            progress: this.state.progress + 1
        })
        console.log(event)
    }
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        height: "100%",
    },

    videoNormal: {
        backgroundColor: 'black',
        flexDirection: "column",
        justifyContent: 'space-between',
        width: "100%",
        height: 250,
        //aspectRatio: 1920.0 / 1080.0
    },

    videoToolBar: {
        backgroundColor: '#EEE',
        alignSelf: "flex-end",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: 40
    },
    videoToolBarItem: {
        width: 0,
        flexGrow: 1,
        flexShrink: 1,
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 1,
        marginRight: 5,
    }
});