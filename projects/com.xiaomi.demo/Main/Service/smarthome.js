import { Device, Service } from "miot";
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
            ]
        })
    }

    handleObjRes(result) {
        var item = [];
        for (var key in result) {
            item.push({ 'key': key, 'value': result[key] });
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
                items.push({ 'key': key, 'value': "v:" + item[key] });
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