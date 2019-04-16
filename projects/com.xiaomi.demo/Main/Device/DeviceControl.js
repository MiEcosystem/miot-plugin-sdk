'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    View,
    Image,
    TouchableHighlight,
    PixelRatio,
    ActionSheetIOS,
} from 'react-native';
import { Host, Device } from "miot";
import { TitleBarBlack } from 'miot/ui';
import Service from 'miot/Service';

var BUTTONS = [
    '测试对话框',
    '确定',
];

export default class UIDemo extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: <TitleBarBlack title={navigation.state.params.title} style={{ backgroundColor: '#fff' }}
                onPressLeft={() => { navigation.goBack(); }} />,
        };
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this._createMenuData();
        this.state = {
            dataSource: ds.cloneWithRows(this._menuData.map((o) => (o.name))),
        };
    }

    _createMenuData() {
        this._menuData = [

            {
                'name': '开发板控制Demo',
                'func': () => {
                    this.props.navigation.navigate('ControlDemo', { title: 'ControlDemo' })
                }
            },
            {
                'name': '获取所有子设备',
                'func': () => {
                    Device.getSubDevices().then(res => {
                        console.log('subdevices:', res);
                        alert("子设备共有" + res.length + "个")
                    }).catch(err => {
                        console.log('error:', err)
                        alert("error:" + err);
                    })
                }
            },
            {
                'name': '蓝牙token加密',
                'func': () => {
                    let ble = Device.getBluetoothLE()

                    console.log("ble:", ble, "lock", ble.securityLock);
                    Device.getBluetoothLE().securityLock.encryptMessageWithToken("4C").then(res => {
                        console.log('encript success :', res);
                        alert("success result:" + res.result);
                    }).catch(err => {
                        console.log(err)
                        alert("error:" + err);
                    })
                }
            }
        ];
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <ListView style={styles.list} dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)} />
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight underlayColor='#838383' onPress={() => this._pressRow(rowID)}>
                <View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.title}>{rowData}</Text>
                        <Image style={styles.subArrow} source={require("../../Resources/sub_arrow.png")} />
                    </View>
                    <View style={styles.separator}></View>
                </View>
            </TouchableHighlight>
        );
    }

    _pressRow(rowID) {
        console.log("row" + rowID + "clicked!");
        this._menuData[rowID].func();
    }

    onShowDidButtonPress() {
        this.props.navigation.navigate('helloDeveloper');
    }

    showReactART() {
        this.props.navigation.navigate('helloReactART');
    }

    showActionSheet() {
        if (Host.isIOS)
            ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                destructiveButtonIndex: 1,
            }, (buttonIndex) => {

            });
    }
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopColor: '#f1f1f1',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginBottom: 0,
        marginTop: 0,
    },
    rowContainer: {
        height: 52,
        alignSelf: 'stretch',
        flexDirection: 'row',
        paddingLeft: 23,
        paddingRight: 23,
        alignItems: 'center',
        flex: 1,
    },
    list: {
        alignSelf: 'stretch',
    },

    title: {
        fontSize: 15,
        color: '#333333',
        alignItems: 'center',
        flex: 1,
    },
    subArrow: {
        width: 7,
        height: 14,
    },
    separator: {
        height: 1 / PixelRatio.get(),
        backgroundColor: '#e5e5e5',
        marginLeft: 20,
    }
});
