import { Device, Service } from "miot";
import Host from "miot/Host";
import { MemberType } from "miot/service/smarthome";
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CommonCell from '../../CommonModules/CommonCell';

export default class CallSmartHomeAPIDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            apiList: []
        };
    }
    componentDidMount() {
        this.setState({
            apiList: [

                { name: "获取关联蓝牙列表", group: '蓝牙网关', handle: this.handleObjRes.bind(this), action: () => { return Device.getLinkedBTDevices() } },

                { name: "点击查询当前用户信息", group: '用户信息', handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getUserInfo(Service.account.ID) } },
                { name: "点击查询用户信息列表", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getUserInfoList([Service.account.ID, '894158105']) } },

                { name: "点击查询设备新版本信息", group: '固件信息', handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.checkDeviceVersion(Device.deviceID, Device.type) } },
                { name: "点击查询设备最新版本信息V2", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getLatestVersionV2(Device.deviceID) } },
                { name: "点击查询设备固件版本信息", handle: this.handleArrRes.bind(this), action: () => { return Service.smarthome.getAvailableFirmwareForDids([Device.deviceID]) } },
                { name: "点击查询设备对应model最新固件版本信息", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getLatestVersion(Device.model) } },

                { name: "设置device setting", group: '设置设备信息', handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.setDeviceSetting({ did: Device.deviceID, settings: { 'testK': 'testV' } }) } },
                { name: "获取device setting", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getDeviceSettingV2({ did: Device.deviceID, settings: ["testK"] }) } },
                { name: "删除device setting", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.delDeviceSetting({ did: Device.deviceID, settings: ["testK"] }) } },
                { name: "Batch 设置信息", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.batchSetDeviceDatas([{ did: Device.deviceID, props: { "prop.s_string": 'name', "prop.s_json": JSON.stringify({ 'jname': 'test' }) } }]) } },
                { name: "Batch 获取信息", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.batchGetDeviceDatas([{ did: Device.deviceID, props: ["prop.s_string", "prop.s_json"] }]) } },

                { name: "设置用户收藏", group: '用户收藏', handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.setUserColl({ did: Device.deviceID, name: 'testName', content: "testContent" }) } },
                { name: "获取用户收藏", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getUserColl({ did: Device.deviceID }) } },
                { name: "删除用户收藏", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getUserColl({ did: Device.deviceID }).then(result => { if (result.length > 0) { return Service.smarthome.delUserColl({ did: Device.deviceID, coll_id: result[0].coll_id }) } else { return new Promise.reject("用户收藏为空") } }) } },

                { name: "获取成员", group: '成员', handle: this.handleArrRes.bind(this), action: () => { return Service.smarthome.loadMembers(MemberType.Person) } },
                {
                    name: "创建成员", handle: this.handleObjRes.bind(this), action: () => {
                        return Service.smarthome.createMember(MemberType.Person, {
                            name: 'hahahahah'
                        })
                    }
                },
                {
                    name: "更新成员", handle: this.handleObjRes.bind(this), action: () => {
                        return Service.smarthome.loadMembers(MemberType.Person).then(res => {
                            if (res instanceof Array && res.length > 0) {
                                let p = res[0];
                                console.log('update:', p)
                                return Service.smarthome.updateMember(MemberType.Person, p.id, { name: p.name + "." })
                            } else {
                                return Promise.reject("no member to update")
                            }

                        })
                    }
                },
                {
                    name: "删除成员", handle: this.handleObjRes.bind(this), action: () => {
                        return Service.smarthome.loadMembers(MemberType.Person).then(res => {
                            if (res instanceof Array && res.length > 0) {
                                let p = res[0];
                                console.log('delete:', p.id)
                                return Service.smarthome.deleteMember(MemberType.Person, [p.id])
                            } else {
                                return Promise.reject("no member to delete")
                            }

                        })

                    }
                },
                { name: "获取定位信息", group: '其他', handle: this.handleObjRes.bind(this), action: () => { return Host.locale.getLocation() } },
                { name: "getDeviceDataRaw", handle: this.handleObjRes.bind(this), action: () => { let params = { "uid": Service.account.ID, "did": Device.deviceID, "type": "store", "key": "opt_log", "time_start": 1464658990, "time_end": 1464663600, "limit": 20 }; return Service.smarthome.getDeviceDataRaw(params).then(res => { return new Promise.resolve({ "getDeviceDataRaw res": res }) }) } },
                { name: "上报设备数据", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.reportRecords(Device.deviceID, [{ type: "prop", key: "b", value: "c" }]) } },
                { name: "获取支持语音的设备-语音设备可用", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getVoiceCtrlDevices(Device.deviceID) } },
                { name: "当前服务器国家码", handle: this.handleObjRes.bind(this), action: () => { return Host.getCurrentCountry().then(res => { return new Promise.resolve({ "res": res }) }) } },
                { name: "获取AppConfig配置文件信息", handle: this.handleObjRes.bind(this), action: () => {
                    let params = {
                      name: "local_timer_config",
                      lang:'zh_CN',
                      version:"1",
                      result_level:'0'
                    }
                    return Service.smarthome.getAppConfig(params);
                  }
                },
            ]
        })
    }

    handleObjRes(result) {
        var item = [];
        for (var key in result) {
            item.push({ 'key': key, 'value': JSON.stringify(result[key]) });
        }
        this.setState((preState) => {
            return { dataSource: item };
        });
    }

    handleArrRes(result) {
        console.log(result instanceof Array)
        if (!(result instanceof Array)) {
            result = result.list;
            if (!(result instanceof Array)) {
                return;
            }
        }
        var items = [];
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            items.push({ 'key': i, 'value': "----" })
            for (var key in item) {
                items.push({ 'key': key, 'value': "v:" + JSON.stringify(item[key]) });
            }
        }
        this.setState((preState) => {
            return { dataSource: items };
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ height: 200 }}
                    data={this.state.dataSource}
                    keyExtractor={item => item.key}
                    ItemSeparatorComponent={({ highlighted }) => {
                        return (<View style={highlighted ? styles.separatorHighlighted : styles.separator}></View>)

                    }}
                    renderItem={({ item }) => {
                        return (<View style={{ flexDirection: 'row', margin: 10 }}>
                            <Text style={{ width: 150 }}>{item.key}:</Text>
                            <Text style={{ width: 150 ,fontFamily:'normal'}}>{item.value}</Text>
                        </View>);
                    }} />
                <FlatList
                    data={this.state.apiList}
                    keyExtractor={item => item.name}
                    ItemSeparatorComponent={({ highlighted }) => {
                        return (<View style={highlighted ? styles.separatorHighlighted : styles.separator}></View>)

                    }}
                    renderItem={({ item }) => {
                        let marginT = item.group == undefined ? 2 : 5
                        let title = item.group == undefined ? (undefined) : (<Text style={{ margin: 5 }}>{item.group}</Text>);
                        return (
                            <View style={{ marginTop: marginT }}>
                                {title}
                                <CommonCell
                                    title={item.name}
                                    onPress={() => {
                                        item.action().then((result) => {
                                            console.log("api res", result)
                                            item.handle(result)
                                        })
                                            .catch(err => {
                                                console.log("err", err)
                                                alert("error:", err)
                                            })
                                    }}
                                />
                            </View>

                        )
                    }
                    } />

            </View>

        )
    }
}
var styles = StyleSheet.create({
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginLeft: 15,
    },
    separatorHighlighted: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgb(217, 217, 217)',
    },
});