import { Device, Service, DeviceEvent } from "miot";
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

export default class CallSmartHomeAPIDemo extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {

        this.subscription = DeviceEvent.deviceReceivedMessages.addListener((device, messages) => {
            console.log(device + messages);
        });
        this._deviceNameChangedListener = DeviceEvent.deviceNameChanged.addListener((device) => {
            console.log("不要以为你改了名字我就不认识你了", device);
            this.props.navigation.setParams({
                name: device.name
            });
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this._deviceNameChangedListener.remove();
        this.subscription && this.subscription.remove();
    }
    render() {
        var setProperty = this._createMenuRow({ key: 1, title: '设置属性' });
        var getProperty = this._createMenuRow({ key: 2, title: '获取属性' });
        var invokeAction = this._createMenuRow({ key: 3, title: '调用方法' });
        var subscribe = this._createMenuRow({ key: 4, title: '订阅' });
        var specString = this._createMenuRow({ key: 5, title: '获取设备spec详情' });
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.containerMenu}>
                    {setProperty}
                    {getProperty}
                    {invokeAction}
                    {subscribe}
                    {specString}
                </View>
            </View>

        )
    }

    _createMenuRow(params) {
        return [(
            <TouchableHighlight key={params.key} style={styles.rowContainer} underlayColor='#838383'
                onPress={() => {
                    this._onOpenSubPage(params)
                }}>
                <View style={styles.rowContainer}>
                    <Text style={styles.title}>{params.title}</Text>
                    <Image style={styles.subArrow} source={require("../../Resources/sub_arrow.png")} />
                </View>
            </TouchableHighlight>), (<View key={"sep_" + params.key} style={styles.separator} />)];
    }

    async _onOpenSubPage(params) {
        const did = Device.deviceID;
        switch (params.key) {
            case 1:
                this.on = !this.on;
                let data = await Service.spec.getCurrentSpecValue('1040002218');
                console.log(data);
                this.setState({
                    data: data,
                });
                return;
                Service.spec.setPropertiesValue([{ did, siid: 2, piid: 1, value: this.on }]).then(res => {
                    console.log('setPropertiesValue', res)
                }).catch(res => {
                    console.log(res, 'catch')
                });
                break;
            case 2:
                Service.spec.getPropertiesValue([{ did, siid: 1, piid: 4 }, { did, siid: 2, piid: 1 }]).then(res => {
                    console.log('getPropertiesValue', res)
                }).catch(res => {
                    console.log(res, 'catch')
                });
                break;
            case 3:
                Service.spec.doAction({ did, siid: 1, aiid: 1, inList: [10] }).then(res => {
                    console.log('doAction', res)
                }).catch(res => {
                    console.log(res, 'catch')
                });
                break;
            case 4:
                Device.getDeviceWifi().subscribeMessages('prop.2.1', 'prop.3.1').then(res => {
                    console.log('subscribeMessages', res)
                }).catch(res => {
                    console.log(res, 'catch')
                });
                break;
            case 5:
                Service.spec.getSpecString(did).then(res => {
                    console.log('getSpecString', JSON.stringify(res));
                }).catch(res => {
                    console.log(res, 'catch');
                });
                break;
            default:
                break;

        }
    }
}

var styles = StyleSheet.create({
    containerAll: {
        flex: 1, flexDirection: 'column', backgroundColor: '#cccccc', marginTop: 0,
    }, containerIconDemo: {
        flex: 1.7,
        flexDirection: 'column',
        backgroundColor: '#191919',
        alignSelf: 'stretch',
        justifyContent: 'center',
    }, containerMenu: {
        height: 180, flexDirection: 'column', backgroundColor: '#ffffff', alignSelf: 'stretch',
    }, iconDemo: {
        width: 270, height: 181, alignSelf: 'center',
    }, iconText: {
        fontSize: 20, textAlign: 'center', color: '#ffffff', marginTop: 20, alignSelf: 'center'
    }, rowContainer: {
        alignSelf: 'stretch', flexDirection: 'row', flex: 1,
    }, title: {
        fontSize: 17,
        alignItems: 'center',
        alignSelf: 'center',
        color: '#000000',
        flex: 1,
        marginLeft: 15
    }, subArrow: {
        width: 9, height: 17, marginRight: 15, alignSelf: 'center',
    }, separator: {
        height: 0.5,
        alignSelf: 'stretch',
        backgroundColor: '#dddddd',
        marginLeft: 15,
        marginRight: 15,
    },
});