'use strict';

import { Device, Host } from "miot";
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
                'name': '显示打开蓝牙引导(仅ios)',
                'func': () => {
                    Host.ui.showBLESwitchGuide();
                }
            },
            {
                'name': '打开快连成功页面',
                'func': () => {
                    Host.ui.openConnectSucceedPage(Device.model, Device.deviceID);
                }
            },
            {
                'name': '打开一次性密码',
                'func': () => {
                    Host.ui.openOneTimePassword(Device.deviceID, 30, 6);
                }
            },

            {
                'name': '用户协议与隐私政策',
                'func': () => {
                    this.props.navigation.navigate('PrivacyDemo', { 'title': '用户协议与隐私政策' });
                }
            },
            {
                'name': '打开定时',
                'func': () => {
                    Host.ui.openTimerSettingPageWithOptions({ onMethod: "power_on", onParam: "on", offMethod: "power_off", offParam: "off", timerTitle: "这是一个自定义标题", displayName: "自定义场景名称" })
                }
            },
            {
                'name': '打开定时-Demo2',
                'func': () => {
                    let params = {
                        onMethod: "power_on",
                        onParam: "on",
                        offMethod: "power_off",
                        offParam: "off",
                        timerTitle: "这是一个自定义标题",
                        displayName: "自定义场景名称",
                        identify: "identify_1",
                        onTimerTips: '',
                        offTimerTips: '定时列表页面、设置时间页面 关闭时间副标题（默认：关闭时间）',
                        listTimerTips: '定时列表页面 定时时间段副标题（默认：开启时段）',
                        bothTimerMustBeSet: false,
                        showOnTimerType: true,
                        showOffTimerType: false,
                        showPeriodTimerType: true,
                    }
                    Host.ui.openTimerSettingPageWithOptions(params);
                }
            },
            {
                'name': '打开默认倒计时',
                'func': () => {
                    Host.ui.openCountDownPage(true, { onMethod: "power_on", offMethod: 'power_off', onParam: 'on', offParam: 'off' });
                }
            },
            {
                'name': '打开自定义倒计时',
                'func': () => {
                    Host.ui.openCountDownPage(true, { onMethod: "power_on", offMethod: 'power_off', onParam: 'on', offParam: 'off', identify: "custom" });
                }
            },
            {
                'name': '多键开关设置',
                'func': () => {
                    Host.ui.openPowerMultikeyPage(Device.deviceID, Device.mac);
                }
            },
            {
                'name': 'zigbee 子设备快连(网关设备)',
                'func': () => {
                    Host.ui.openZigbeeConnectDeviceList(Device.deviceID);
                }
            },
            {
                'name': 'openNewMorePage',
                'func': () => {
                    Host.ui.openNewMorePage();
                }
            },
            {
                'name': '跳转到小米钱包（仅Android）',
                'func': () => {
                    let params = {
                        action: 'issue_mifare',
                        type: '1',
                        product_id: '66666-00211',
                        source_channel: 'mijia',
                    };
                    Host.ui.openMiPayPageForAndroid(params).then((res) => {
                        console.log(res)
                    }).catch((error) => {
                        console.log(error)
                    });
                }
            },
            {
                'name': '是否支持商城',
                'func': () => {
                    Host.ui.canOpenStorePage().then((isSupport) => {
                        alert("是否支持商城: " + isSupport)
                    }).catch((error) => {
                        console.log(error)
                    });
                }
            },
            {
                'name': '跳转到设备定向推荐界面',
                'func': () => {
                    // recommendId 通过 Device.getRecommendScenes(Device.model, Device.deviceID).then 来获取
                    Device.getRecommendScenes(Device.model, Device.deviceID).then((res) => {
                        console.log(res);
                        if (res.scene_recom.length > 0 && res.scene_recom[0].info) {
                            console.log("res", res.scene_recom[0].info.sr_id);
                            Host.ui.openPluginRecommendScene(Device.deviceID, parseInt(res.scene_recom[0].info.sr_id));
                        } else {
                            alert(JSON.stringify(res))
                        }
                    }).catch((error) => {
                        alert(error)
                    })
                }
            },
            {
                'name': '打开有品商品详情页',
                'func': () => {
                    Host.ui.openShopPage(102763); // 小米台灯
                }
            },
            {
                'name': '打开有品搜索结果页',
                'func': () => {
                    Host.ui.openShopSearchPage('小米台灯'); // 小米台灯
                }
            }, {
                'name': '刷新设备列表',
                'func': () => {
                    Host.ui.refreshDeviceList().then((res)=>{
                      alert(JSON.stringify(res))
                    }).catch((error)=>{
                      alert(JSON.stringify(error))
                    })
                }
            }
        ];
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
                        <Image style={styles.subArrow} source={require("../../../Resources/sub_arrow.png")} />
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

    showActionSheet() {
        if (Host.isIOS)
            ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                destructiveButtonIndex: 1,
            },
                (buttonIndex) => {

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
