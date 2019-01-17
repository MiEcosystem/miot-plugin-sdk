import React from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView, Dimensions
} from "react-native";
import { Device, DeviceProperties} from "miot";
const { width, height } = Dimensions.get("window");

export default class DeviceDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: Device,
      deviceOwner: "",
      callMethodResult: "请求中",
      callMethodFromCloudResult: "请求中"
    };
    Device.getDeviceWifi().callMethod("get_prop", ["humidity", "rgb", "temperature"]).then((res) => {
      this.setState({ callMethodResult: res });
    }).catch(err => {console.log('error:', err)});
    Device.getDeviceWifi().callMethodFromCloud("get_prop", ["humidity", "rgb", "temperature"]).then((res) => {
      this.setState({ callMethodFromCloudResult: res });
    }).catch(err => {console.log('error:', err)});
    this.state.device.owner.load().then(res => {
      this.setState({ deviceOwner: res });
    }).catch(err => {console.log('error:', err)});

  }

  componentWillMount() {
      console.log("componentWillMount...")
      this.eventSubscription = DeviceProperties.addListener(["on", "mode"], (deviceProps, changeProps)=>{
            console.log("changeProps", changeProps.getChangeProps())
      })

      let map = new Map();
      map.set("on", 1)
      map.set("mode", 2)
      map.set("off", 3)
      DeviceProperties.setProperties(map).notifyPropertiesChanged();

  }

  componentWillUnmount() {
      console.log("componentWillUnmount...")
      this.eventSubscription.remove();
  }

    render() {
    return (
      <View style={[styles.listContainer, styles.list]}>
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: this.state.device.iconURL }}
                 style={{ width: 50, height: 50, margin: 10 }}/>
          <ScrollView contentContainerStyle={{ alignItems: "stretch", justifyContent: "center" }}>
            <Text style={{ margin: 10, width: width }}>当前设备
              deviceID: {this.state.device.deviceID}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              model: {this.state.device.model}</Text>
            <View style={{ flexDirection: "row" }}>
              <Image source={{ uri: this.state.deviceOwner.avatarURL }}
                     style={{ width: 50, height: 50, margin: 10}}/>
              <View>
                <Text style={{ margin: 10, width: width }}>owner id: {this.state.deviceOwner.ID}</Text>
                <Text
                  style={{ margin: 10, width: width }}>owner avatarURL: {this.state.deviceOwner.avatarURL}</Text>
                <Text
                  style={{ margin: 10, width: width }}>owner nickName: {this.state.deviceOwner.nickName}</Text>
                <Text style={{ margin: 10, width: width }}>owner birth: {this.state.deviceOwner.birth}</Text>
                <Text style={{ margin: 10, width: width }}>owner email: {this.state.deviceOwner.email}</Text>
                <Text style={{ margin: 10, width: width }}>owner phone: {this.state.deviceOwner.phone}</Text>
                <Text style={{ margin: 10, width: width }}>owner sex: {this.state.deviceOwner.sex}</Text>
                <Text
                  style={{ margin: 10, width: width }}>id: {this.state.deviceOwner.shareTime}</Text>
              </View>
            </View>
            <Text style={{ margin: 10, width: width }}>当前设备
              userId: {this.state.device.userId}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              extra: {this.state.device.extra}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              name: {this.state.device.name}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              event: {this.state.device.event}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              token: {this.state.device.token}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              iconURL: {Device.iconURL}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              permitLevel: {this.state.device.permitLevel}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              isSetPinCode: {this.state.device.isSetPinCode}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              parentId: {this.state.device.parentId}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              parentModel: {this.state.device.parentModel}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              showMode: {this.state.device.showMode}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              mac: {this.state.device.mac}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              version: {this.state.device.version}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              propInfo: {JSON.stringify(this.state.device.propInfo)}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              IP: {this.state.device.IP}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              RSSI: {this.state.device.RSSI}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              SSID: {this.state.device.SSID}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              BSSID: {this.state.device.BSSID}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              pid: {this.state.device.pid}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              lastModified: {this.state.device.lastModified}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              location: {this.state.device.location}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              latitude: {this.state.device.latitude}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              longitude: {this.state.device.longitude}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              isOnline: {this.state.device.isOnline.toString()}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              resetFlag: {this.state.device.resetFlag}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              isOwner: {this.state.device.isOwner.toString()}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              isFamily: {this.state.device.isFamily.toString()}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              isShared: {this.state.device.isShared.toString()}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              isBinded2: {this.state.device.isBinded2.toString()}</Text>
            <Text style={{ margin: 10, width: width }}>当前设备
              isReadOnlyShared: {this.state.device.isReadonlyShared.toString()}</Text>

          </ScrollView>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
  list: {
    backgroundColor: "#eeeeee"
  },
  sectionHeader: {
    backgroundColor: "#eeeeee",
    padding: 5,
    fontWeight: "500",
    fontSize: 11
  },
  row: {
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  image: {
    width: 44,
    height: 44,
    margin: 15

  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#bbbbbb",
    marginLeft: 15
  },
  separatorHighlighted: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgb(217, 217, 217)"
  },
  rowTitleText: {
    fontSize: 17,
    fontWeight: "500"
  },
  rowDetailText: {
    fontSize: 15,
    color: "#888888",
    lineHeight: 20
  },
  searchRow: {
    backgroundColor: "#eeeeee",
    padding: 10
  },
  searchTextInput: {
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
    paddingVertical: 0,
    height: 35
  }
});
