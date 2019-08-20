'use strict';

import { Device, Host, Service } from "miot";
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { ActionSheetIOS, Image, ListView, PixelRatio, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
var BUTTONS = [
    '测试对话框',
    '确定',
];

export default class UIDemo extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: <TitleBar type='dark' title={navigation.state.params.title} style={{ backgroundColor: '#fff' }}
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
                'name': 'RPC指令控制',
                'func': () => {
                    this.props.navigation.navigate('RPCControl', { title: 'RPC指令控制' })
                }
            },
            {
                'name': '当前设备信息',
                'func': () => {
                    this.props.navigation.navigate('DeviceDemo', { title: '当前设备信息' })
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
                'name': '打开第一个子设备',
                'func': () => {
                    Device.getSubDevices().then(res => {
                        if (res.length) {
                            Host.ui.openDevice(res[0].deviceID, res[0].model, { dismiss_current_plug: false })
                        }
                    }).catch(err => {
                        console.log('error:', err)
                        alert("error:" + err);
                    })
                }
            },
            {
                'name': '打开第一个子设备(退出当前插件)',
                'func': () => {
                    Device.getSubDevices().then(res => {
                        if (res.length) {
                            Host.ui.openDevice(res[0].deviceID, res[0].model, { dismiss_current_plug: true })
                        }
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
            },
            {
                'name': '设备model信息',
                'func': () => {
                    Device.loadRealDeviceConfig(Device.model).then(res => {
                        alert(JSON.stringify(res))
                    })
                }
            },
            {
                'name': '指定model设备列表',
                'func': () => {
                    Device.requestAuthorizedDeviceListData(Device.model).then(res => {
                        alert(JSON.stringify(res))
                    })
                }
            },
            {
                'name': '指定model设备列表v2',
                'func': () => {
                    Host.ui.getDevicesWithModel(Device.model).then(res => {
                        alert(JSON.stringify(res))
                    })
                }
            },
            {
                'name': '打印设备经纬度',
                'func': () => {
                    alert(JSON.stringify({ lat: Device.latitude, lng: Device.longitude }))
                }
            },
            {
                'name': '使用当前手机位置作为设备的新位置信息',
                'func': () => {
                    Device.reportDeviceGPSInfo()
                }
            },
            {
                'name': 'parentDevice',
                'func': () => {
                    if (Device.parentDevice) {
                        alert("当前设备存在 父设备，父设备ID为" + Device.parentDevice.deviceID)
                    } else {
                        alert("当前设备没有parentDevice")
                    }

                }
            },
            {
                'name': 'Android 手机NFC支持',
                'func': () => {
                    Host.phoneHasNfcForAndroid().then((res) => {
                        alert(JSON.stringify(res))
                    }).catch((error) => {
                        alert(JSON.stringify(error))
                    })
                }
            },
            {
                'name': '是否是HomeKit设备',
                'func': () => {
                    Device.checkIsHomeKitDevice().then(res => {
                        alert((res ? "是" : "不是") + ' HomeKit 设备')
                    })
                }
            },
            {
                'name': '是否连接了HomeKit',
                'func': () => {
                    Device.checkHomeKitConnected().then(res => {
                        alert((res ? "已经" : "没有") + ' 连入HomeKit')
                    })
                }
            },
            {
                'name': '添加到HomeKit',
                'func': () => {
                    Device.bindToHomeKit().then((res) => {
                        alert('添加成功')
                    }).catch((error) => {
                        alert("添加失败" + JSON.stringify(error))
                    })
                }
            },
            {
                'name': '打开设备组添加页（支持设备组的设备调用此方法）',
                'func': () => {
                    Host.ui.openAddDeviceGroupPage(Device.model);
                }
            },
            {
                'name': '打开设备组编辑页(设备组才可调用此方法)',
                'func': () => {
                    Device.getVirtualDevices().then(res => {

                        let devices = res.map(stat => {
                            //initDeviceEvents
                            return stat.deviceID;
                        })
                        Host.ui.openEditDeviceGroupPage(devices);
                    }).catch(err => {
                        console.log(err);
                    })
                }
            },
            {
                'name': '打开Mesh设备组添加页（支持mesh设备组的设备调用此方法）',
                'func': () => {
                    Host.ui.openMeshDeviceGroupPage("add", Device.deviceID);
                }
            },
            {
                'name': '打开Mesh设备组编辑页（mesh设备组调用此方法）',
                'func': () => {
                    Host.ui.openMeshDeviceGroupPage("edit", Device.deviceID);
                }
            },
            {
                'name': '获取设备时区信息',
                'func': () => {
                    Device.getDeviceTimeZone().then((res) => {
                        alert(JSON.stringify(res))
                    }).catch((error) => {
                        alert(error)
                    })
                }
            },
            {
                'name': '修改设备名称',
                'func': () => {
                    Device.changeDeviceName("新名称").then((res) => {
                        alert(JSON.stringify(res))
                    }).catch((error) => {
                        alert(error)
                    })
                }
            },
            {
                'name': '获取设备定向推荐信息',
                'func': () => {
                    Device.getRecommendScenes(Device.model, Device.deviceID).then((res) => {
                        alert(JSON.stringify(res))
                    }).catch((error) => {
                        alert(error)
                    })
                }
            },{
                'name': '获取miot-spec设备当前信息',
                'func': async () => {
                    let data = await Service.spec.getCurrentSpecValue(Device.deviceID);
                    alert(JSON.stringify(data));
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
