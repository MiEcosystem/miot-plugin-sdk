'use strict';

import { Device, Host, DeviceEvent } from "miot";
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import {
 ActionSheetIOS, Image, ListView, PixelRatio, StyleSheet, Text, TouchableHighlight, View 
} from 'react-native';
var BUTTONS = [
    '测试对话框',
    '确定'
];

export default class UIDemo extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: <TitleBar type='dark' title={navigation.state.params.title} style={{ backgroundColor: '#fff' }}
                onPressLeft={() => {
 navigation.goBack(); 
}} />
        };
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this._createMenuData();
        this.state = {dataSource: ds.cloneWithRows(this._menuData.map(o => ({ 'name': o.name, 'subtitle': o.subtitle })))};
    }

    componentDidMount() {
        this._multiSwitchNameChangedListener = DeviceEvent.multiSwitchNameChanged.addListener((value, did) => {
            console.log('switch name changed: ' + JSON.stringify(value), 'did: ', did);
            alert(JSON.stringify(value))
        });
    }

    componentWillUnmount() {
        this._multiSwitchNameChangedListener && this._multiSwitchNameChangedListener.remove();
    }

    _createMenuData() {
        this._menuData = [
            {
                'name': '用户协议与隐私政策',
                'subtitle': 'navigate 到 PrivacyDemo',
                'func': () => {
                    this.props.navigation.navigate('PrivacyDemo', { 'title': '用户协议与隐私政策' });
                }
            },
            {
                'name': '是否支持商城',
                'subtitle': 'canOpenStorePage',
                'func': () => {
                    Host.ui.canOpenStorePage().then(isSupport => {
                        alert("是否支持商城: " + isSupport)
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            {
                'name': '弹出删除设备的对话框',
                'subtitle': 'openDeleteDevice',
                'func': () => {
                    Host.ui.openDeleteDevice('title test');
                }
            },
            {
                'name': '弹出删除设备的对话框(带回调)',
                'subtitle': 'openDeleteDeviceWithCallback',
                'func': () => {
                    Host.ui.openDeleteDeviceWithCallback()
                        .then(res => {
 console.log(res) 
})
                        .catch(err => {
 console.log(err) 
});
                }
            },
            {
                'name': '打开分享设备的页面',
                'subtitle': 'openShareDevicePage',
                'func': () => {
                    Host.ui.openShareDevicePage();
                }
            },
            {
                'name': '保持屏幕常亮',
                'subtitle': 'keepScreenNotLock(true)',
                'func': () => {
                    Host.ui.keepScreenNotLock(true);
                }
            },
            {
                'name': '关闭保持屏幕常亮',
                'subtitle': 'keepScreenNotLock(false)',
                'func': () => {
                    Host.ui.keepScreenNotLock(false);
                }
            },
            {
                'name': '打开房间设备管理的页面',
                'subtitle': 'openRoomManagementPage',
                'func': () => {
                    Host.ui.openRoomManagementPage();
                }
            },
            {
                'name': '打开语音设备管理的页面',
                'subtitle': 'openVoiceCtrlDeviceAuthPage',
                'func': () => {
                    Host.ui.openVoiceCtrlDeviceAuthPage();
                }
            },
            {
                'name': '打开添加智能的页面',
                'subtitle': 'openIftttAutoPage',
                'func': () => {
                    Host.ui.openIftttAutoPage();
                }
            },
            {
                'name': '打开反馈页',
                'subtitle': 'openFeedbackInput',
                'func': () => {
                    Host.ui.openFeedbackInput();
                }
            },
            {
                'name': '打开安全管理页',
                'subtitle': 'openSecuritySetting',
                'func': () => {
                    Host.ui.openSecuritySetting();
                }
            },
            {
                'name': '打开常见问题页，别名「使用帮助」',
                'subtitle': 'openHelpPage',
                'func': () => {
                    Host.ui.openHelpPage();
                }
            },
            {
                'name': '打开分享列表页面',
                'subtitle': 'openShareListBar',
                'func': () => {
                    Host.ui.openShareListBar(
                        '小米智能家庭',
                        '小米智能家庭',
                        { uri: 'https://avatars3.githubusercontent.com/u/13726966?s=40&v=4' },
                        'https://iot.mi.com/new/index.html'
                    );
                }
            },
            {
                'name': '打开系统分享文件页面',
                'subtitle': 'openSystemShareWindow',
                'func': () => {
                    const path = Host.file.storageBasePath+'/test.wav';
                    Host.ui.openSystemShareWindow(path);
                }
            },
            {
                'name': '获取设备列表中指定model的设备信息',
                'subtitle': 'getDevicesWithModel',
                'func': () => {
                    Host.ui.getDevicesWithModel(Device.model)
                        .then(res => {
                            alert("success" + JSON.stringify(res));
                        })
                        .catch(err => {
                            alert("err " + err);
                        });
                }
            },
            {
                'name': '打开蓝牙网关页',
                'subtitle': 'openBtGatewayPage',
                'func': () => {
                    Host.ui.openBtGatewayPage();
                }
            },
            {
                'name': '弹窗请求隐私政策和用户协议授权， 支持显示用户体验计划',
                'subtitle': 'alertLegalInformationAuthorization',
                'func': () => {
                    const licenseURL = require('../../../Resources/raw/license_zh.html');
                    const privacyURL = require('../../../Resources/raw/privacy_zh.html');
                    var options = {}
                    options.agreementURL = licenseURL;
                    options.privacyURL = privacyURL;
                    options.experiencePlanURL = licenseURL;
                    options.hideAgreement = false;
                    options.hideUserExperiencePlan = false;
                    Host.ui.alertLegalInformationAuthorization(options).then(res => {
                        alert('成功');
                    }).catch(() => {
                        alert('失败，可能是设备已离线');
                    });
                }
            },
            {
                'name': '查看隐私政策和用户协议信息， 支持显示用户体验计划',
                'subtitle': 'previewLegalInformationAuthorization',
                'func': () => {
                    const licenseURL = require('../../../Resources/raw/license_zh.html');
                    const privacyURL = require('../../../Resources/raw/privacy_zh.html');
                    var options = {}
                    options.agreementURL = licenseURL;
                    options.privacyURL = privacyURL;
                    options.experiencePlanURL = licenseURL;
                    options.hideAgreement = false
                    options.hideUserExperiencePlan = false;
                    Host.ui.previewLegalInformationAuthorization(options).then(res => {
                        alert('成功');
                    }).catch(() => {
                        alert('失败，可能是设备已离线');
                    });
                }
            },
            {
                'name': '打开重命名对话框',
                'subtitle': 'openChangeDeviceName',
                'func': () => {
                    Host.ui.openChangeDeviceName();
                }
            },
            {
                'name': '添加桌面快捷方式',
                'subtitle': 'openAddToDesktopPage',
                'func': () => {
                    Host.ui.openAddToDesktopPage();
                }
            },
            {
                'name': '打开设备检查固件升级页',
                'subtitle': 'openDeviceUpgradePage',
                'func': () => {
                    Host.ui.openDeviceUpgradePage();
                }
            },
            {
                'name': '打开Mesh设备固件升级页。分享的设备点击此接口无反应',
                'subtitle': 'openBleMeshDeviceUpgradePage 只有mesh设备才能打开',
                'func': () => {
                    Host.ui.openBleMeshDeviceUpgradePage();
                }
            },
            {
                'name': '打开通用协议的蓝牙固件OTA页面。分享的设备点击此接口无反应',
                'subtitle': 'openBleCommonDeviceUpgradePage',
                'func': () => {
                    alert(' 蓝牙部分api请参考 com.xiaomi.bledemo 中的示例使用');
                }
            },
            {
                'name': '打开灯组2.0固件升级页。分享的设备点击此接口无反应',
                'subtitle': 'openLightGroupUpgradePage',
                'func': () => {
                    Host.ui.openLightGroupUpgradePage();
                }
            },
            {
                'name': '打开设备时区设置页',
                'subtitle': 'openDeviceTimeZoneSettingPage  {"sync_device": false} ',
                'func': () => {
                    Host.ui.openDeviceTimeZoneSettingPage({ "sync_device": false });
                }
            },
            {
                'name': '打开网关设备产品百科页面',
                'subtitle': 'openProductBaikeWebPage 网关设备',
                'func': () => {
                    let url = 'https://home.mi.com/baike/index.html#/label/gateway';
                    Host.ui.openProductBaikeWebPage(url);
                }
            },
            {
                'name': '打开商城某商品详情页面',
                'subtitle': 'openShopPage 小米台灯',
                'func': () => {
                    Host.ui.openShopPage(102763);
                }
            },
            {
                'name': '打开有品商城搜索结果页面',
                'subtitle': 'openShopSearchPage(\'小米台灯\')',
                'func': () => {
                    Host.ui.openShopSearchPage('小米台灯');
                }
            },
            {
                'name': '打开一次性密码设置页',
                'subtitle': 'openOneTimePassword',
                'func': () => {
                    Host.ui.openOneTimePassword(Device.deviceID, 30, 6);
                }
            },
            {
                'name': '打开默认倒计时页面',
                'subtitle': 'openCountDownPage',
                'func': () => {
                    Host.ui.openCountDownPage(true,
                        {
                            onMethod: "power_on",
                            offMethod: 'power_off',
                            onParam: 'on',
                            offParam: 'off'
                        });
                }
            },
            {
                'name': '打开自定义设置定时页面-Demo1',
                'subtitle': 'openTimerSettingPageWithOptions',
                'func': () => {
                    Host.ui.openTimerSettingPageWithOptions(
                        {
                            onMethod: "power_on",
                            onParam: "on",
                            offMethod: "power_off",
                            offParam: "off",
                            timerTitle: "这是一个自定义标题",
                            displayName: "自定义场景名称"
                        })
                }
            },
            {
                'name': '打开自定义设置定时页面-Demo2',
                'subtitle': 'openTimerSettingPageWithOptions',
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
                        showPeriodTimerType: false
                    }
                    Host.ui.openTimerSettingPageWithOptions(params);
                }
            },
            {
                'name': '多键开关设置',
                'subtitle': 'openPowerMultikeyPage',
                'func': () => {
                    Host.ui.openPowerMultikeyPage(Device.deviceID, Device.mac);
                }
            },
            {
                'name': '打开一个原生类 className（只支持iOS）',
                'subtitle': 'openPageWithClassName',
                'func': () => {
                    Host.ui.openPageWithClassName('MHDeviceTimerSettingNewViewController');
                }
            },
            {
                'name': '打开手机蓝牙设置页面（只支持android）',
                'subtitle': 'openPhoneBluSettingPage',
                'func': () => {
                    Host.ui.openPhoneBluSettingPage();
                }
            },
            {
                'name': '显示打开蓝牙引导(仅ios)',
                'subtitle': 'showBLESwitchGuide',
                'func': () => {
                    Host.ui.showBLESwitchGuide();
                }
            },
            {
                'name': '隐藏提示用户打开蓝牙的动画示意图(仅ios)',
                'subtitle': 'dismissBLESwitchGuide',
                'func': () => {
                    Host.ui.dismissBLESwitchGuide();
                }
            },
            {
                'name': '打开快连成功页面',
                'subtitle': 'openConnectSucceedPage',
                'func': () => {
                    Host.ui.openConnectSucceedPage(Device.model, Device.deviceID);
                }
            },
            {
                'name': '打开添加Zigbee网关插件子设备页面',
                'subtitle': 'openZigbeeConnectDeviceList',
                'func': () => {
                    Host.ui.openZigbeeConnectDeviceList(Device.deviceID);
                }
            },
            {
                'name': '打开设备网络信息页面 此方法只针对wifi设备，combo设备，蓝牙设备请不要调用此方法。',
                'subtitle': 'openDeviceNetworkInfoPage',
                'func': () => {
                    Host.ui.openDeviceNetworkInfoPage();
                }
            },
            {
                'name': '跳转到小米钱包（仅Android）',
                'subtitle': 'openMiPayPageForAndroid',
                'func': () => {
                    let params = {
                        action: 'issue_mifare',
                        type: '1',
                        product_id: '66666-00211',
                        source_channel: 'mijia'
                    };
                    Host.ui.openMiPayPageForAndroid(params).then(res => {
                        console.log(res)
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            {
                'name': '跳转到设备定向推荐界面',
                'subtitle': 'getRecommendScenes & openPluginRecommendScene',
                'func': () => {
                    // TODO ios返回了带code的res，待anroid确认是不是统一
                    // recommendId 通过 Device.getRecommendScenes(Device.model, Device.deviceID).then 来获取
                    Device.getRecommendScenes(Device.model, Device.deviceID).then(res => {
                        if (res.scene_recom && res.scene_recom.length > 0 && res.scene_recom[0] && res.scene_recom[0].info) {
                            console.log("res", res.scene_recom[0].info.sr_id);
                            Host.ui.openPluginRecommendScene(Device.deviceID, parseInt(res.scene_recom[0].info.sr_id));
                        }
 else {
                            alert('res: ' + JSON.stringify(res));
                        }
                    }).catch(error => {
                        alert('error: ' + error);
                    })
                }
            },
            {
                'name': '刷新设备列表',
                'subtitle': 'refreshDeviceList',
                'func': () => {
                    Host.ui.refreshDeviceList().then(res => {
                        alert(res)
                    }).catch(error => {
                        alert(JSON.stringify(error))
                    })
                }
            },
            {
                'name': 'openNewMorePage(仅iOS)',
                'subtitle': '打开更多设置页面（通常包括安全设置，常见问题与用户反馈）',
                'func': () => {
                    Host.ui.openNewMorePage();
                }
            },
            {
                'name': 'openTerminalDeviceSettingPage',
                'subtitle': '打开手机设置页中米家app配置页面',
                'func': () => {
                    Host.ui.openTerminalDeviceSettingPage(1);
                }
            },
            {
                'name': 'openTerminalDeviceSettingPage',
                'subtitle': '打开手机WiFi设置页面',
                'func': () => {
                    Host.ui.openTerminalDeviceSettingPage(2);
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
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{rowData.name}</Text>
                            <Text style={styles.subtitle}>{rowData.subtitle}</Text>
                        </View>
                        <Image style={styles.subArrow} source={require("../../../Resources/sub_arrow.png")} />
                    </View>
                    <View style={styles.separator}></View>
                </View>
            </TouchableHighlight >
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
                destructiveButtonIndex: 1
            },
                buttonIndex => {

                });
    }

}

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
        marginTop: 0
    },

    rowContainer: {
        height: 62,
        alignSelf: 'stretch',
        flexDirection: 'row',
        paddingLeft: 23,
        paddingRight: 23,
        alignItems: 'center',
        flex: 1
    },
    list: {
        alignSelf: 'stretch',
        marginBottom: 20
    },
    title: {
        fontSize: 15,
        color: '#333333',
        alignItems: 'center'
    },
    subtitle: {
        fontSize: 12,
        color: '#666666',
        alignItems: 'center'
    },
    subArrow: {
        width: 7,
        height: 14
    },
    separator: {
        height: 1 / PixelRatio.get(),
        backgroundColor: '#e5e5e5',
        marginLeft: 20
    }
});
