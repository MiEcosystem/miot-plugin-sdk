/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

import React from 'react';

import {
    AppRegistry, StyleSheet, Text, View, TouchableHighlight, Platform, PixelRatio, Button
} from "react-native";

import { Bluetooth, BluetoothEvent, DeviceEvent, Device, Service } from "miot";

const bt = Device.getBluetoothLE();
const DEMOCHAR='00000001-0000-1000-8000-00805f9b34fb';
export default class MainPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            did: Device.deviceID, chars: {}, services: {}, buttonText: Device.mac, isEnable: false
        }
    }

    componentDidMount() {
        this.showing = true;
        Bluetooth.checkBluetoothIsEnabled().then(result => {
            alert(result)
            this.state.isEnable = result;
            if (result) {
                this.connect();
            } else {
                this.setState({ buttonText: "Bluetooth Status = " + result })
            }
        });
        this._s5 = BluetoothEvent.bluetoothStatusChanged.addListener((data) => {
            console.log("bluetoothStatusChanged", data);
            if (!data) {
                this.setState({ buttonText: "Bluetooth Status = " + data })
            }
        });
        this._s1 = BluetoothEvent.bluetoothSeviceDiscovered.addListener((blut, services) => {
            console.log("bluetoothSeviceDiscovered", blut.mac, services.map(s => s.UUID), bt.isConnected)
            this.setState({ buttonText: 'bluetoothSeviceDiscovered' })
            if (bt.isConnected) {
                services.forEach(s => {
                    this.state.services[s.UUID] = s;
                    if (s.UUID.indexOf("00001000-1720-0206-0100-00805f9bab34")>0) {
                        s.startDiscoverCharacteristics("00002000-1720-0206-0100-00805f9bab34")
                    } else if (s.UUID.indexOf( "00001800-0000-1000-8000-00805f9b34fb")>0) {
                        s.startDiscoverCharacteristics('00002a00-0000-1000-8000-00805f9b34fb', '00002a01-0000-1000-8000-00805f9b34fb')
                    } else if (s.UUID .indexOf('00001801-0000-1000-8000-00805f9b34fb')>0) {
                        s.startDiscoverCharacteristics('00002a05-0000-1000-8000-00805f9b34fb')
                    } else if (s.UUID .indexOf('0000fe95-0000-1000-8000-00805f9b34fb')>0) {
                        s.startDiscoverCharacteristics(DEMOCHAR, '00000020-0000-1000-8000-00805f9b34fb', '00000001-0000-1000-8000-00805f9b34fb', '00000002-0000-1000-8000-00805f9b34fb', '00000013-0000-1000-8000-00805f9b34fb', '00000004-0000-1000-8000-00805f9b34fb', '00000014-0000-1000-8000-00805f9b34fb', '00000015-0000-1000-8000-00805f9b34fb')
                    } else if (s.UUID.indexOf('0000fee1-0000-1000-8000-00805f9b34fb')>0) {
                        s.startDiscoverCharacteristics('0000fedd-0000-1000-8000-00805f9b34fb', '0000fede-0000-1000-8000-00805f9b34fb')
                    }
                })
            } else {
                this.connect();
            }
        })
        this._s2 = BluetoothEvent.bluetoothCharacteristicDiscovered.addListener((bluetooth, service, characters) => {
            console.log("bluetoothCharacteristicDiscovered", characters.map(s => s.UUID), bt.isConnected);
            this.setState({ buttonText: service.UUID + "\n CharacteristicDiscovered" })
            if (bt.isConnected) {
                characters.forEach(c => {
                    this.state.chars[c.UUID] = c;
                })
            } else {
                this.connect();
            }
        })
        this._s3 = BluetoothEvent.bluetoothCharacteristicValueChanged.addListener((bluetooth, service, character, value) => {
            if (service.UUID.indexOf("ffd5")>0){
                console.log("bluetoothCharacteristicValueChanged", character.UUID, value);//刷新界面
            }
        })
        this._s4 = BluetoothEvent.bluetoothSeviceDiscoverFailed.addListener((blut, data) => {
            console.log("bluetoothSeviceDiscoverFailed", data);
        })
        this._s5 = BluetoothEvent.bluetoothCharacteristicDiscoverFailed.addListener((blut, data) => {
            console.log("bluetoothCharacteristicDiscoverFailed", data);
        })
        this._s6 = BluetoothEvent.bluetoothConnectionStatusChanged.addListener((blut, isConnect) => {
            console.log("bluetoothConnectionStatusChanged", blut, isConnect);
            if (bt.mac === blut.mac && !isConnect) {
                this.setState({chars: {}});
            }
        })
    }

    connect() {
        console.log("start connect");
        this.setState({
            buttonText: 'connecting...'
        })
        if (this.showing) {
            if (bt.isConnected) {
                console.log("connected");
                bt.startDiscoverServices("00001000-1720-0206-0100-00805f9bab34", "00001800-0000-1000-8000-00805f9b34fb", "00001801-0000-1000-8000-00805f9b34fb", "0000fe95-0000-1000-8000-00805f9b34fb", "0000fee1-0000-1000-8000-00805f9b34fb");
                this.setState({ buttonText: "connected" })
            } else {
                bt.connect(-1).then((data) => {
                    console.log("connected", data);
                    bt.startDiscoverServices("00001000-1720-0206-0100-00805f9bab34", "00001800-0000-1000-8000-00805f9b34fb", "00001801-0000-1000-8000-00805f9b34fb", "0000fe95-0000-1000-8000-00805f9b34fb", "0000fee1-0000-1000-8000-00805f9b34fb");
                    this.setState({ buttonText: "connected" })
                }).catch((data) => {
                    console.log("error", data);//链接失败的页面
                    if (data.code === -7) {
                        this.setState({ buttonText: "timeout retrying" })
                        this.connect();
                    } else {
                        this.setState({ buttonText: "click retry\n" + JSON.stringify(data) })
                    }
                });
            }
        }
    }

    componentWillUnmount() {
        this.showing = false;
        if (bt.isConnected) {
            bt.disconnect();
            console.log("disconnect");
        }
        this._s1.remove();
        this._s2.remove();
        this._s3.remove();
        this._s4.remove();
        this._s5.remove();
        this._s6.remove();
    }

    render() {
        return (<View style={styles.container}>
            <TouchableHighlight style={{ flex: 1 }} underlayColor='#ffffff' onPress={() => {
                if (this.state.chars[DEMOCHAR]) {
                    this.state.chars[DEMOCHAR].read().then(s => {
                        console.log("read", s)
                        this.setState({
                            buttonText: s
                        })
                    }).catch(err => {
                        console.log("read fail", err)
                        this.setState({
                            buttonText: err
                        })
                    });
                } else {
                    if (this.state.buttonText === "wait" || this.state.buttonText === "connecting..." || this.state.buttonText === "timeout retrying") this.setState({ buttonText: "wait" }); else this.connect();
                }
            }}>
                <Text style={styles.text}>
                    {JSON.stringify(this.state.buttonText)}
                </Text>
            </TouchableHighlight>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#999999',
        marginBottom: 0,
        marginTop: 0,
    }, text: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        color: '#000000',
        alignSelf: 'stretch',
        marginTop: 300,
    },
})

const KEY_OF_MAINPAGE = 'MainPage';
