
import React from 'react';
import { API_LEVEL, Package, Device, Service, Host } from 'miot';
import { StyleSheet, View, Text, Button } from 'react-native';
import { DeviceEventEmitter, Platform } from 'react-native';
import { MISSCommand, AlarmEventType } from "miot/service/miotcamera";
import CameraRenderView from 'miot/ui/CameraRenderView';
import { MISSCodec, MISSSampleRate, MISSDataBits, MISSAudioChannel } from 'miot/ui/CameraRenderView';
import base64js from 'base64-js';
import room from 'miot/service/room';
import Orientation from 'react-native-orientation';
import th from 'miot/resources/strings/th';

import { SafeAreaView } from 'react-native';

const kConnectionCallBackName = 'connectionCallBack';
const kCommandReceiveCallBackName = 'commandReceiveCallBack';
const kRDTDataReceiveCallBackName = 'rdtDataReceiveCallBack';

export default class MainPage extends React.Component {
    static navigationOptions = {
        headerTransparent: true
    };

    state = {
        pstate: 0,
        error: 0,
        showPlayToolBar: true,
        fullScreen: false
    }

    componentDidMount() {
        this.props.navigation.setParams({
            title: "Camera Name",
            type: 'light',
            style: {backgroundColor: 'transparent'},
            onPressRight: () => {
                console.log("right menu")
            }
        })

        Orientation.lockToPortrait()

        console.log('did mount')
        that = this;
        DeviceEventEmitter.addListener(kConnectionCallBackName, function (connectionState) {
            console.log('reach connectionCallback get callback');
            console.log(connectionState);
            that.setState({
                pstate: connectionState.state,
                error: connectionState.error
            });
        });

        DeviceEventEmitter.addListener(kCommandReceiveCallBackName, ({ command, data }) => {
            console.log('reach serverCmd callback');
            if (command == MISSCommand.MISS_CMD_SPEAKER_START_RESP) {
                console.log(' receive start speaker');
                console.log('data:' + data);
                var ba = base64js.toByteArray(data);
                if (ba.length > 0) {
                    console.log('receive start speaker 0');
                    console.log(ba[0]);
                    if (Platform.OS === 'android') {
                        if (ba[0] == 48) {
                            console.log("start call in android");
                            this.refs.openGLViewRef.startAudioRecord();
                        }
                    } else {
                        if (ba[0] == 0) {
                            this.refs.openGLViewRef.startAudioRecord();
                        }
                    }
                }
            } else {
                console.log('receive command:' + command + ' data:' + JSON.stringify(data));
            }
        });

        DeviceEventEmitter.addListener(kRDTDataReceiveCallBackName, ({ data }) => {
            console.log('receive rdt data');
            console.log(data);
        });

        this._sendRDTCommand.bind(this);
    }

    componentWillUnmount() {
        Orientation.lockToPortrait()
    }

    _sendRDTCommand() {
        Service.miotcamera.bindRDTDataReceiveCallback(kRDTDataReceiveCallBackName);
        var buf = new ArrayBuffer(8);
        var data = new Uint32Array(buf);
        data[0] = 6;
        data[1] = 4;
        var base64Data = base64js.fromByteArray(new Uint8Array(buf));
        Service.miotcamera.sendRDTCommandToDevice(base64Data).then((retCode) => {
            console.log('send rdt result');
            console.log(retCode);
        });
    }

    _videoToolbar() {
        if (this.state.showPlayToolBar) {
            return (
                <View style={styles.videoToolBar}>
                    <View style={styles.videoToolBarItem}>
                        <Button
                            onPress={() => {
                                Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_VIDEO_START, {}).then(retCode => {
                                    console.log("video start get send callback");
                                    console.log(retCode);
                                });
                                this.refs.openGLViewRef.startRender();
                            }}
                            title="Video: start"
                        />
                        <Button
                            onPress={() => {
                                Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_VIDEO_STOP, {}).then(retCode => {
                                    console.log("video stop get send callback");
                                    console.log(retCode);
                                });
                                this.refs.openGLViewRef.stopRender();
                            }}
                            title="stop"
                        />
                    </View>
                    <View style={styles.videoToolBarItem}>
                        <Button
                            onPress={() => {
                                Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_AUDIO_START, {}).then(retCode => {
                                    console.log("audio start get send callback");
                                    console.log(retCode);
                                });
                                this.refs.openGLViewRef.startAudioPlay();
                            }}
                            title="Audio: start"
                        />
                        <Button
                            onPress={() => {
                                Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_AUDIO_STOP, {}).then(retCode => {
                                    console.log("audio stop get send callback");
                                    console.log(retCode);
                                });
                                this.refs.openGLViewRef.stopAudioPlay();
                            }}
                            title="stop"
                        />
                    </View>
                    <View style={styles.videoToolBarItem}>
                        <Button
                            onPress={() => {
                                this.setState({
                                    fullScreen: !this.state.fullScreen
                                })
                                this.props.navigation.setParams({
                                    show: !this.state.fullScreen,
                                })
                                if (this.state.fullScreen) {
                                    Orientation.lockToPortrait()
                                } else {
                                    Orientation.lockToLandscape()
                                }
                            }}
                            title="Full"
                        />
                    </View>
                </View>)
        } else {
            return (<View></View>)
        }
    }

    render() {
        return (
            <View style={styles.main}>
                <SafeAreaView style={{backgroundColor:"black"}}></SafeAreaView>
                <CameraRenderView
                    ref="openGLViewRef"
                    maximumZoomScale={3.0}
                    style={this.state.fullScreen ? styles.videoFullScreen : styles.videoNormal}
                    videoCodec={MISSCodec.MISS_CODEC_VIDEO_H264}
                    audioCodec={MISSCodec.MISS_CODEC_AUDIO_G711A}
                    audioRecordSampleRate={MISSSampleRate.FLAG_AUDIO_SAMPLE_8K}
                    audioRecordChannel={MISSAudioChannel.FLAG_AUDIO_CHANNEL_MONO}
                    audioRecordDataBits={MISSDataBits.FLAG_AUDIO_DATABITS_16}
                    fullscreenState={this.state.fullScreen}
                    correctRadius={1.2}
                    osdx={0.243}
                    osdy={0.03964}
                    onClick={(e) => {
                        this.setState({
                            showPlayToolBar: !this.state.showPlayToolBar
                        })
                        console.log("did single tap on camera view x: %d y:%d", e.nativeEvent.x, e.nativeEvent.y)
                    }}
                >
                    <Text style={{ width: "100%", color: 'white', backgroundColor: "#10101010" }}>
                        Connection state:{this.state.pstate}{"\n"}
                        Error:{this.state.error}
                    </Text>
                    {this._videoToolbar()}
                </CameraRenderView>

                <View style={styles.body}>
                    <Text style={styles.bodyText}>
                        hello, this is a tiny plugin project of MIOT{"\n"}
                        API_LEVEL:{API_LEVEL}{"\n"}
                        NATIVE_API_LEVEL:{Host.apiLevel}{"\n"}
                        {Package.packageName}{"\n"}
                        models:{Package.models}{"\n"}
                        did:{Device.deviceID}{"\n"}
                        follow the steps:{"\n\n"}
                        {`1 click "connect"\n2 click "bind P2P"\n  2.1 start/stop playing\n  2.2 start/stop audio\n  2.3 start/stop speak\n3 send RTD command\n4 jump pages`}
                    </Text>
                    <View style={styles.bodyControl}>
                        <Button
                            onPress={() => {
                                Service.miotcamera.connectToDeviceWithStateChangeCallBack(kConnectionCallBackName);
                            }}
                            title="connect"
                        />
                        <Button
                            onPress={() => {
                                Service.miotcamera.disconnectToDevice();
                            }}
                            title="disconnect"
                        />
                        <Button
                            onPress={() => {
                                Service.miotcamera.bindP2PCommandReceiveCallback(kCommandReceiveCallBackName);
                            }}
                            title="bind P2P"
                        />
                        <Button
                            onPress={() => {
                                this.sendRDTCommand();
                            }}
                            title="send rdt"
                        />
                        <Button
                            onPress={() => {
                                this.props.navigation.push('MainPage', { title: 'PlayBack' })
                            }}
                            title="navigate"
                        />
                    </View>
                </View>

                <View style={styles.bottomBar}>
                    <View style={styles.bottomBarItem}>
                        <Button
                            onPress={() => {
                                Service.miotcamera.showCloudStorage(true, false)
                            }}
                            title="cloud"
                        />
                    </View>
                    <View style={styles.bottomBarItem}>
                        <Button
                            style={styles.bottomBarItem}
                            onPress={() => {
                                Service.miotcamera.showCloudStorageSetting()
                            }}
                            title="cloud setting"
                        />
                    </View>
                    <View style={styles.bottomBarItem}>
                        <Button
                            onPress={() => {
                                Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_SPEAKER_START_REQ, {}).then(retCode => {
                                    console.log("speaker on get send callback");
                                    console.log(retCode);
                                });
                                // start Audio Record at MISS_CMD_SPEAKER_START_RESP 
                            }}
                            title="Speak: start"
                        />
                        <Button
                            onPress={() => {
                                Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_SPEAKER_STOP, {}).then(retCode => {
                                    console.log("speaker off get send callback");
                                    console.log(retCode);
                                });
                                this.refs.openGLViewRef.stopAudioRecord();
                                this.setState({
                                    audioRecording: this.refs.openGLViewRef.audioRecording
                                })
                            }}
                            title="stop"
                        />
                    </View>
                    <View style={styles.bottomBarItem}>
                        <Button
                            style={styles.bottomBarItem}
                            onPress={() => {
                                Service.miotcamera.showAlarmVideos(AlarmEventType.EventType_BabyCry | AlarmEventType.EventType_Face)
                            }}
                            title="alarm"
                        />
                    </View>
                    <View style={styles.bottomBarItem}>
                        <Button
                            style={styles.bottomBarItem}
                            onPress={() => {
                                Service.miotcamera.showFaceRecognize(false)
                            }}
                            title="face"
                        />
                    </View>
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
        aspectRatio: 1920.0 / 1080.0
    },
    videoFullScreen: {
        backgroundColor: 'black',
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%"
    },
    videoToolBar: {
        backgroundColor: '#FFF1',
        alignSelf: "flex-end",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: 80
    },
    videoToolBarItem: {
        width: 0,
        flexGrow: 1,
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
        marginRight: 5,
    },
    
    body: {
        backgroundColor: '#ffa',
        width: "100%",
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between", padding: 10
    },
    bodyText: { 
        color: "gray", 
        fontSize: 13
    },
    bodyControl: { 
        flexDirection: "column", 
    },

    bottomBar: {
         width: "100%", 
         flexDirection: "row"
    },
    bottomBarItem: {
        margin: 2,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        flexGrow: 1,
        width: 0,
        height: 60
    }
});