
import React from 'react';
import PropTypes from 'prop-types';
import { PackageEvent, API_LEVEL, Package, Device, Service, Host, Native } from 'miot';
import ImageButton from "miot/ui/ImageButton"

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

const video_url = 
//'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov'
//'https://www.radiantmediaplayer.com/media/bbb-360p.mp4'
//'rtsp://192.168.1.105/mjcamera.mkv'
//'/sdcard/track.mp4'
'rtsp://192.168.0.1:554/livestream/12'

const image_url1 = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=166419709,1971781840&fm=26&gp=0.jpg' // 网络图片
const image_url2 = 'http://192.168.0.1/sd/Photo/PH20200422-122130-000104.png' // 手动放如SD卡一个图片
const image_url3 = 'http://192.168.0.1/sd/Photo/PH20200422-122130-000104.THM' // 图片修改个后缀
const image_url4 = 'http://192.168.0.1/sd/Normal/NO20200101-164309-000055.THM' // Normal 视频修改后缀MP4 为THM
const image_url5 = 'http://192.168.0.1/sd/Event/EV20200101-161945-000036.THM' // Event 视频修改后缀MP4 为THM

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
        path: video_url,
        isPlay: false,
        isMute: false,
        progress: 0,
        duration: 0,
        newProgress: 0,
        testButtonName: "测试转码",
        resizeMode:"none",
        selectedVideoTrack: -1,
        isPathLoad: false
    }

    componentDidMount() {

        this.props.navigation.setParams({
            title: "Camera Name",
            type: 'light',
            style: { backgroundColor: 'transparent' },
            onPressRight: () => {
                alert('asdf2');
                console.log("right menu")
            },
            onPressLeft: () => { 
                this.props.navigation.goBack() 
            },
        })

        that = this;
        DeviceEventEmitter.addListener(kFFmpegProcessCallbackName, function (process) {
            console.log(process);
            that.setState({
                testButtonName: "转码:" + process.process.toFixed(2) + '%'
            });
        });

        this.willBlurSubscription = this.props.navigation.addListener('willBlur', () => {
            if (this.state.isPathLoad) {
                alert('确认先卸载path，等待onPathUnload后退出，否则可能下次播放失败')
            }
            this.setState({
                path: '',
                isPlay: false
            })
        })

        // 下载测试视频
        let path = "http://techslides.com/demos/sample-videos/small.mp4";
        let fileName = "small.mp4"
        Host.file.downloadFile(path, fileName).then((fileInfo) => {
            console.log("downloadFile...fileInfo", fileInfo);
            let path = (Platform.OS === "android" ? 'file://' : '') + Host.file.storageBasePath + '/'
            this.setState({
                path: path + fileName
            })
        }).catch((error) => {
            console.log("downloadFile...error", error);
            alert(JSON.stringify(error))
        });
    }

    componentWillUnmount() {
        this.willBlurSubscription.remove();
    }

    render() {
        return (
            <View style={styles.main}>
                <SafeAreaView style={{ backgroundColor: "black" }}></SafeAreaView>
                <RTSPRenderView
                    ref="rtspDemo"
                    style={styles.videoNormal}
                    path={this.state.path}
                    onPathLoad={e => {
                        // 设置path成功后播放
                        this.setState({
                            isPlay: e.nativeEvent.isSuccess,
                            isPathLoad: e.nativeEvent.isSuccess,
                        })
                        if (e.nativeEvent.isSuccess != true) {
                            alert('设置path失败: ' + JSON.stringify(e.nativeEvent))
                        } else {
                            console.log('设置path成功')
                        }
                    }}
                    onPathUnload={_ => {
                        this.setState({
                            isPathLoad: false
                        })
                        alert('卸载成功')
                    }}
                    isPlay={this.state.isPlay}
                    onPlaySuccess={_ =>
                        console.log('播放成功')
                    }
                    onPlayFail={e =>
                        alert('播放失:' + JSON.stringify(e.nativeEvent))
                    }
                    isMute={this.state.isMute}
                    progress={this.state.newProgress}
                    onChangeDuration={(e) => {
                        console.log("onDuration:", e.nativeEvent);
                        this.setState({
                            duration: e.nativeEvent.duration
                        })
                    }}
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
                                path: this.state.path === '' ? video_url : ''
                            })
                        }}
                        title={ this.state.path === '' ? "加载path" : '卸载path'}
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
                    <Button style={styles.videoToolBarItem}
                        onPress={()=>
                            Service.miotcamera.ffmpegCommand(
                                'ffmpeg -i ' + video_url + ' -target ntsc-vcd ' + NativeModules.MIOTPackage.localFilePath + '/' + Date.now() + '.mpg',
                                kFFmpegProcessCallbackName,
                                (isSuccess, errInfo) => {
                                    this.setState({
                                        testButtonName: isSuccess ? "转码成功" : "转码失败"
                                    })
                                    if (isSuccess != true) {
                                        alert("转码失败:" + JSON.stringify(errInfo))
                                    }
                                }
                            )
                        }
                        title={this.state.testButtonName}
                    />
                </View>

                <View style={styles.videoToolBar}>
                    <Text style={styles.videoToolBarItem}>
                        进度: {this.state.progress.toFixed(2)}
                    </Text>
                    <Text style={styles.videoToolBarItem}>
                        总长度: {this.state.duration.toFixed(2)}
                    </Text>
                    <ImageButton style={styles.image} source={{ uri: image_url1 }} onPress={() => console.log("xxx")} />
                    <ImageButton style={styles.image} source={{ uri: image_url2 }} onPress={() => console.log("xxx")} />
                    <ImageButton style={styles.image} source={{ uri: image_url3 }} onPress={() => console.log("xxx")} />
                    <ImageButton style={styles.image} source={{ uri: image_url4 }} onPress={() => console.log("xxx")} />
                    <ImageButton style={styles.image} source={{ uri: image_url5 }} onPress={() => console.log("xxx")} />
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
    },
    image: { width: 40, height: 40, backgroundColor: 'red' },
});