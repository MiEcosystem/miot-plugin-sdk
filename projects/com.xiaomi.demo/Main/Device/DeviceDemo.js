import React from "react";

import {
  View,
  Text,
  Image,
  ScrollView, Dimensions
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Device, DeviceProperties } from "miot";
import MIOT from "miot";
import Logger from '../Logger';

export default class DeviceDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: Device,
      deviceOwner: "",
      callMethodResult: "请求中",
      callMethodFromCloudResult: "请求中",
      roomInfo: ""
    };
    Logger.trace(this);
  }

  componentWillMount() {
    console.log("componentWillMount...");
    console.log(MIOT);
    console.log(Device);
    Device.getDeviceWifi().callMethod("get_prop", ["humidity", "rgb", "temperature"]).then((res) => {
      this.setState({ callMethodResult: res });
    }).catch((err) => { console.log('error:', err); });
    Device.getDeviceWifi().callMethodFromCloud("get_prop", ["humidity", "rgb", "temperature"]).then((res) => {
      this.setState({ callMethodFromCloudResult: res });
    }).catch((err) => { console.log('error:', err); });
    this.state.device.owner.load().then((res) => {
      this.setState({ deviceOwner: res });
    }).catch((err) => { console.log('error:', err); });

    // 实时获取设备网络信息
    Device.getDeviceWifi().readDeviceNetWorkInfo(this.state.device.deviceID).then((ret) => {
      console.log("readDeviceNetWorkInfo  ret", ret);
      this.setState({
        wifiStrength: ret.wifiStrength
      });
    }).catch((error) => {
      console.log("readDeviceNetWorkInfo  error", error);
    });

    Device.getRoomInfoForCurrentHome().then((roomInfo) => {
      this.setState({ roomInfo: roomInfo });
    });

    this.eventSubscription = DeviceProperties.addListener(["on", "mode"], (deviceProps, changeProps) => {
      console.log("changeProps", changeProps.getChangeProps());
    });

    let map = new Map();
    map.set("on", 1);
    map.set("mode", 2);
    map.set("off", 3);
    DeviceProperties.setProperties(map).notifyPropertiesChanged();
  }

  componentWillUnmount() {
    console.log("componentWillUnmount...");
    this.eventSubscription.remove();
  }

  formatOrderTime() {
    const date = new Date(this.state.device.orderTime * 1000);
    return `${ this.state.device.orderTime.toString() }-${ date.getUTCFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", marginTop: 2 }}>
          <ScrollView contentContainerStyle={{ alignItems: "stretch", justifyContent: "center" }}>
            {
              [
                {
                  img: this.state.deviceOwner.avatarURL,
                  title: 'Device Owner 信息',
                  items: [
                    ['id', this.state.deviceOwner.ID],
                    ['avatarURL', this.state.deviceOwner.avatarURL],
                    ['nickName', this.state.deviceOwner.nickName],
                    ['birth', this.state.deviceOwner.birth],
                    ['email', this.state.deviceOwner.email],
                    ['phone', this.state.deviceOwner.phone],
                    ['sex', this.state.deviceOwner.sex],
                    ['shareTime', this.state.deviceOwner.shareTime]
                  ]
                },
                {
                  img: this.state.device.iconURL,
                  title: 'Device 信息',
                  items: [
                    ['deviceID', this.state.device.deviceID],
                    ['model', this.state.device.model],
                    ['userId', this.state.device.userId],
                    ['name', this.state.device.name],
                    ['event', this.state.device.event],
                    ['token', this.state.device.token],
                    ['iconURL', this.state.device.iconURL],
                    ['isSetPinCode', this.state.device.isSetPinCode],
                    ['parentId', this.state.device.parentId],
                    ['showMode', this.state.device.showMode],
                    ['mac', this.state.device.mac],
                    ['version', this.state.device.version],
                    ['IP', this.state.device.IP],
                    ['RSSI', this.state.device.RSSI],
                    ['SSID', this.state.device.SSID],
                    ['BSSID', this.state.device.BSSID],
                    ['pid', this.state.device.pid],
                    ['lastModified', this.state.device.lastModified],
                    ['location', this.state.device.location],
                    ['latitude', this.state.device.latitude],
                    ['longitude', this.state.device.longitude],
                    ['isOnline', this.state.device.isOnline.toString()],
                    ['isOwner', this.state.device.isOwner.toString()],
                    ['isFamily', this.state.device.isFamily.toString()],
                    ['isShared', this.state.device.isShared.toString()],
                    ['isBinded2', this.state.device.isBinded2.toString()],
                    ['isReadOnlyShared', this.state.device.isReadonlyShared.toString()],
                    ['是否是根设备', this.state.device.isRootDevice.toString()],
                    ['设备绑定时间orderTime', this.formatOrderTime()]
                  ]
                },
                {
                  title: 'Device 其它信息',
                  items: [
                    ['信号强度', this.state.wifiStrength]
                  ]
                },
                {
                  title: 'Parent Device 信息',
                  items: [
                    ['parentModel', this.state.device.parentDevice && this.state.device.parentDevice.model]
                  ]
                },
                {
                  title: 'Room 信息',
                  items: Object.keys(this.state.roomInfo && this.state.roomInfo.data).map((key) => {
                    return [key, this.state.roomInfo.data[key]];
                  })
                }
              ].map((section, index) => {
                return (
                  <View>
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {
                        section.img ?
                          <Image source={{ uri: section.img }}
                            style={{ width: 50, height: 50, margin: 10, borderRadius: 10, borderWidth: 1, borderColor: '#DDD' }} />
                          : null
                      }
                      <Text style={{ margin: 10, textAlign: 'center' }}>{section.title}</Text>
                    </View>
                    {
                      section.items.map((item, index) => {
                        return (
                          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 48, marginTop: 1, padding: 10, width: '100%', backgroundColor: index % 2 == 0 ? '#FFF' : '#FFFFFFE0' }}>
                            <Text>{`${ item[0] }:    `}</Text>
                            <Text>{`${item[1]}`}</Text>
                          </View>);
                      })
                    }
                  </View>);
              })
            }
          </ScrollView>
        </View >
      </View >
    );
  }
}