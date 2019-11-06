
    import React from 'react';
    import { API_LEVEL, Package, Device, Service, Host } from 'miot';
    import { View, Text, Button } from 'react-native';
    import { DeviceEventEmitter } from 'react-native';
    import { MISSCommand } from "miot/service/miotcamera";
    import CameraRenderView from 'miot/ui/CameraRenderView';
    import { MISSCodec, MISSSampleRate, MISSDataBits, MISSAudioChannel } from 'miot/ui/CameraRenderView';
    import base64js from 'base64-js';

    const kConnectionCallBackName = 'connectionCallBack';
    const kCommandReceiveCallBackName = 'commandReceiveCallBack';

    class App extends React.Component {

        componentDidMount() {
            console.log('did mount')
            that = this;
            DeviceEventEmitter.addListener(kConnectionCallBackName, function(connectionState){
                console.log('get callback');
                console.log(connectionState);
                that.setState({
                    pstate: connectionState.state
                });
            });

            DeviceEventEmitter.addListener(kCommandReceiveCallBackName, ({command, data}) => {
                if (command == MISSCommand.MISS_CMD_SPEAKER_START_RESP) {
                    console.log('receive start speaker');
                    var ba = base64js.toByteArray(data);
                    if (ba.length > 0) {
                        console.log('receive start speaker 0');
                        console.log(ba[0]);
                        if (ba[0] == 0) {
                            this.refs.openGLViewRef.startAudioRecord();
                        }
                    }
                } else {
                    console.log('receive command:' + command + ' data:' + JSON.stringify(data));
                }
            });
        }

        state = {
            pstate: 0
        }

        _connectCallBack(state) {
            setState({
                pstate: state
            })
        }

        render() {
            return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'powderblue' }}>
            <Text>hello, this is a tiny plugin project of MIOT</Text>
            <Text>API_LEVEL:{API_LEVEL}</Text>
            <Text>NATIVE_API_LEVEL:{Host.apiLevel}</Text>
            <Text>{Package.packageName}</Text>
            <Text>models:{Package.models}</Text>
            <Text>did:{Device.deviceID}</Text>
            <Text>connection state:{this.state.pstate}</Text>
            <CameraRenderView
                ref="openGLViewRef"
                maximumZoomScale={3.0}
                style={{width: 350, height:(350.0/1920.0*1080.0), backgroundColor: 'red', justifyContent: 'center'}}
                videoCodec={MISSCodec.MISS_CODEC_VIDEO_H264}
                audioCodec={MISSCodec.MISS_CODEC_AUDIO_G711A}
                audioRecordSampleRate={MISSSampleRate.FLAG_AUDIO_SAMPLE_8K}
                audioRecordChannel={MISSAudioChannel.FLAG_AUDIO_CHANNEL_MONO}
                audioRecordDataBits={MISSDataBits.FLAG_AUDIO_DATABITS_16} >
            </CameraRenderView>
            <Button
                onPress={() => {
                    Service.miotcamera.connectToDeviceWithStateChangeCallBack(kConnectionCallBackName);
                    Service.miotcamera.bindP2PCommandReceiveCallback(kCommandReceiveCallBackName);
                }}
                title="connect"
            />
            <Button
                onPress={() => {
                    Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_VIDEO_START, {}).then( retCode => {
                        console.log("get send callback");
                        console.log(retCode);
                    });
                    this.refs.openGLViewRef.startRender();
                }}
                title="start"
            />
            <Button
                onPress={() => {
                    Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_VIDEO_STOP, {}).then( retCode => {
                        console.log("get send callback");
                        console.log(retCode);
                    });
                    this.refs.openGLViewRef.stopRender();
                }}
                title="stop"
            />
            <Button
                onPress={() => {
                    Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_AUDIO_START, {}).then( retCode => {
                        console.log("get send callback");
                        console.log(retCode);
                    });
                    this.refs.openGLViewRef.startAudioPlay();
                }}
                title="start audio"
            />
            <Button
                onPress={() => {
                    Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_AUDIO_STOP, {}).then( retCode => {
                        console.log("get send callback");
                        console.log(retCode);
                    });
                    this.refs.openGLViewRef.stopAudioPlay();
                }}
                title="stop audio"
            />
            <Button
                onPress={() => {
                    Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_SPEAKER_START_REQ, {}).then( retCode => {
                        console.log("get send callback");
                        console.log(retCode);
                    });
                }}
                title="start speak"
            />
            <Button
                onPress={() => {
                    Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_SPEAKER_STOP, {}).then( retCode => {
                        console.log("get send callback");
                        console.log(retCode);
                    });
                    this.refs.openGLViewRef.stopAudioRecord();
                }}
                title="stop speak"
            />
            </View>
            )
        }
    }
    Package.entry(App, () => {
        
    })
    