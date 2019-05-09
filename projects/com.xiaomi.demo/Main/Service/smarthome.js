import { Device, Service } from "miot";
import Host from "miot/Host";
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';


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
                { name: "点击查询设备对应model最新固件版本信息", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getLatestVersion(Device.model) } },
                { name: "点击查询当前设备固件版本信息", handle: this.handleArrRes.bind(this), action: () => { return Service.smarthome.getAvailableFirmwareForDids([Device.deviceID]) } },
                { name: "点击查询设备最新版本信息V2", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getLatestVersionV2(Device.deviceID) } },
                { name: "点击查询当前用户信息", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getUserInfo(Service.account.ID) } },
                { name: "点击查询当前用户信息", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getUserInfo(Service.account.ID) } },
                {
                    name: "Batch 设置信息", handle: this.handleObjRes.bind(this), action: () => {
                        return Service.smarthome.batchSetDeviceDatas([{ did: Device.deviceID, props: { "prop.s_string": 'name', "prop.s_json": JSON.stringify({ 'jname': 'test' }) } }])
                    }
                },
                {
                    name: "Batch 获取信息", handle: this.handleObjRes.bind(this), action: () => {
                        return Service.smarthome.batchGetDeviceDatas([{ did: Device.deviceID, props: ["prop.s_string", "prop.s_json"] }])
                    }
                },
                {
                    name: "getDeviceSettingV2", handle: this.handleObjRes.bind(this), action: () => {
                        return Service.smarthome.getDeviceSettingV2({ did: Device.deviceID, settings: ['test'] })
                    }
                },
                {
                    name: "当前服务器国家码", handle: this.handleObjRes.bind(this), action: () => {
                        return Host.getCurrentCountry().then(res => {
                            return new Promise.resolve({ "res": res })
                        })
                    }
                },
                {
                    name: "getDeviceDataRaw", handle: this.handleObjRes.bind(this), action: () => {
                        let params = {
                            "uid": Service.account.ID,               // 用户id
                            "did": Device.deviceID,         // 设备ID
                            "type": "store",             // 查询事件；当查询属性时type用prop
                            "key": "opt_log",             // 事件名称；当查询属性时value填具体属性，比如"aqi"
                            "time_start": 1464658990,    // 开始UTC时间
                            "time_end": 1464663600,      // 结束UTC时间
                            "limit": 20                  // 最多返回结果数目，上限500。注意按需填写，返回数据越多查询越慢
                        }
                        return Service.smarthome.getDeviceDataRaw(params).then(res => {
                            return new Promise.resolve({ "getDeviceDataRaw res": res })
                        })
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
            <View>

                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={({ highlighted }) => {
                        return (<View style={highlighted ? styles.separatorHighlighted : styles.separator}></View>)

                    }}
                    renderItem={({ item }) => {
                        return (<View style={{ flexDirection: 'row', margin: 10 }}>
                            <Text style={{ width: 150 }}>{item.key}:</Text>
                            <Text style={{ width: 150 }}>{item.value}</Text>
                        </View>);
                    }} />
                <FlatList
                    data={this.state.apiList}
                    ItemSeparatorComponent={({ highlighted }) => {
                        return (<View style={highlighted ? styles.separatorHighlighted : styles.separator}></View>)

                    }}
                    renderItem={({ item }) => {
                        return (
                            <Button title={item.name} onPress={() => {
                                item.action().then((result) => {
                                    console.log("res", result)
                                    item.handle(result)
                                })
                                    .catch(err => {
                                        console.log("err", err)
                                        alert("error:", err)
                                    })
                            }} />
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