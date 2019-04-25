'use strict';

import { Device } from "miot";
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default class RPCControl extends React.Component {
    static navigationOptions = ({ navigation }) => {

        return {
            header: <TitleBar type='dark' title={navigation.state.params.title} style={{ backgroundColor: '#fff' }}
                onPressLeft={() => { navigation.goBack(); }} />,
        };
    };

    constructor(props, context) {
        super(props, context);


        this.state = {
            requestStatus: false,
            method: '',
            params: {},
            extra: {},
            paramsString: '',
            extraString: {},
            result: 'None'
        };
    }

    componentDidMount() {
        //   this._deviceStatusListener = DeviceEvent.deviceReceivedMessages.addListener(
        //   (device, map, res) => {
        //       console.log('Device.addListener', device, map, res, this.state.timerRun);
        //       let status = map.get("prop.on")|| {};
        //       let sRGB = "#" + this.getNewRGB(status.rgb >> 16, (status.rgb >> 8) & 0x00ff, (status.rgb & 0x0000ff));
        //         this.setState({"resultViewColor":sRGB});
        //       });
        //     Device.getDeviceWifi().subscribeMessages("prop.on","prop.usb_on"
        // );
    }

    componentWillUnmount() {
        // this._deviceStatusListener.remove();
    }

    render() {
        return (
            <View style={styles.containerAll}>
                <View style={styles.menu}>
                    <Text>默认指令</Text>
                    <Button style={styles.btn} title="清空" onPress={this.clearParams.bind(this)}></Button>
                    <Button style={styles.btn} title="闹钟 属性" onPress={this.setParamsTo_alarm_ops.bind(this)}></Button>
                    <Button style={styles.btn} title="闹钟 倒计时" onPress={this.setParamsTo_get_count_down.bind(this)}></Button>
                    <Button style={styles.btn} title="宜家灯 属性" onPress={this.setPramsTo_light_props.bind(this)}></Button>
                    <Button style={styles.btn} title="宜家灯 开关" onPress={this.setPramsTo_light_toggle.bind(this)}></Button>
                </View>
                <View style={styles.main}>
                    <Text>Main</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="method"
                        value={this.state.method}
                        onChange={this.onMethodTextRChanged.bind(this)}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder="extra 可以为空"
                        value={this.state.extraString}
                        onChange={this.onExtraTextBChanged.bind(this)}
                    ></TextInput>
                    <TextInput
                        style={[styles.input, styles.area]}
                        placeholder="params String"
                        value={this.state.paramsString}
                        multiline={true}
                        numberOfLines={10}
                        onChange={this.onParamsTextGChanged.bind(this)}
                    ></TextInput>

                    <Button style={styles.btn} title="发送普通指令" onPress={this.sendRequest.bind(this)}></Button>
                    <Button style={styles.btn} title="发送Remote指令" onPress={this.sendRemoteRequest.bind(this)}></Button>
                    <Text >result: </Text>
                    <Text >{this.state.result}</Text>
                </View>
            </View>
        );
    }

    sendRequest() {
        var params = this.state.params;
        var method = this.state.method;
        var extra = this.state.extra;
        if (method == '') {
            alert('method 不能为空')
            return;
        }
        console.log('extra', extra)
        Device.getDeviceWifi().callMethod(method, params, extra).then(res => {
            var result = JSON.stringify(res);
            this.setState({ result })
        }).catch(err => {
            console.log('error:', err)
            var result = JSON.stringify(err);
            result = "Error: \n" + result;
            this.setState({ result })
        })
    }

    sendRemoteRequest() {
        var params = this.state.params;
        var method = this.state.method;
        var extra = this.state.extra;
        if (method == '') {
            alert('method 不能为空')
            return;
        }
        Device.getDeviceWifi().callMethodFromCloud(method, params).then(res => {
            var result = JSON.stringify(res);
            this.setState({ result })
        }).catch(err => {
            var result = JSON.stringify(err);
            result = "Error: \n" + result;
            this.setState({ result })
        })
    }

    clearParams() {
        this.setState({ params: {}, extra: {}, paramsString: '', extraString: '', method: '' })
    }
    setParamsTo_alarm_ops() {
        var params = { "operation": "query", "req_type": "alarm", "index": 0 };
        var paramsString = JSON.stringify(params)
        var method = 'alarm_ops'
        var extraString = ''
        this.setState({ params, paramsString, method, extraString })
    }

    setParamsTo_get_count_down() {
        var params = []
        var paramsString = JSON.stringify(params)
        var method = 'get_count_down'
        var extraString = ''
        this.setState({ params, paramsString, method, extraString })
    }

    setPramsTo_light_props() {
        var params = [Device.deviceID, "light_level", "power_status"]
        var paramsString = JSON.stringify(params)
        var extra = { id: Device.deviceID }
        var extraString = JSON.stringify(extra)
        var method = 'get_device_prop'
        this.setState({ params, paramsString, method, extraString, extra })
    }

    setPramsTo_light_toggle() {
        var params = ['toggle']
        var paramsString = JSON.stringify(params)
        var extra = { 'sid': Device.deviceID }
        var extraString = JSON.stringify(extra)
        var method = 'set_power'
        this.setState({ params, paramsString, method, extraString, extra })
    }

    onMethodTextRChanged(event) {
        this.setState({
            method: event.nativeEvent.text
        })
    }

    onParamsTextGChanged(event) {
        var paramsString = event.nativeEvent.text
        try {
            var params = JSON.parse(paramsString)
            this.setState({
                params, paramsString, result: 'None'
            })
        } catch (err) {
            var params = []
            this.setState({
                params, paramsString, result: "prase params failed"
            })
        }
    }

    onExtraTextBChanged(event) {
        var extraString = event.nativeEvent.text
        try {
            var extra = JSON.parse(extraString)
            this.setState({
                extra,
                extraString,
                result: 'None'
            })
        } catch (err) {
            var extra = {}
            this.setState({
                extra,
                extraString,
                result: "prase extra failed"
            })
        }
    }

    onSendDidButtonPress() {
        Device.getDeviceWifi().callMethod("set_rgb", [(this.state.textR << 16 | this.state.textG << 8 | this.state.textB)]).then(json => {
            console.log("rpc result:" + isSuccess + json);
            this.setState({ requestStatus: isSuccess })

        });
    }

}

var styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#838383',
        // marginTop: 66,
    },
    menu: {
        padding: 10,
        backgroundColor: "white",
        alignItems: 'flex-start'
    },
    main: {
        padding: 10,
        flex: 1,
        // backgroundColor: "blue"
    },
    input: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black'
    },
    area: {
        height: 200
    },
    btn: {
        fontSize: 10
    }
});
