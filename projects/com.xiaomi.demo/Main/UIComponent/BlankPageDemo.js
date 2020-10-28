import BlankPage from 'miot/ui/BlankPage';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { View } from 'react-native';
import { ListItem } from "miot/ui/ListItem";
import { Device, Host, Service } from "miot";

export default class BlankPageDemo extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type="dark"
          title={navigation.state.params ? navigation.state.params.title : ''}
          style={{ backgroundColor: '#fff' }}
          onPressLeft={(_) => navigation.goBack()}
        />
    };
  };

  render() {
    return (
      <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <ListItem title={"组合窗帘"} onPress={() => {
          Service.smarthome.createGroupDevice('测试窗帘组', ["1041804921", "1041804919"])
            .then((data) => {
              console.log(data);
            }, (error) => {
              console.log(error);
            });
        }}/>
        <ListItem title={"获取子设备did"} onPress={() => {
          Service.smarthome.querySubDevices("group.1321334680524693504")
            .then((data) => {
              console.log(data);
            }, (error) => {
              console.log(error);
            });
        }}/>
        <ListItem title={"同model下的设备"} onPress={() => {
          Host.ui.getDevicesWithModel("lumi.curtain.hmcn02")
            .then((data) => {
              console.log(data);
            }, (error) => {
              console.log(error);
            });
        }}/>
        <ListItem title={'窗帘组获取子设备'} onPress={() => {
          Device.getDeviceWifi().getVirtualDevices(2)
            .then((data) => {
              console.log(data[0].deviceID);
            }, (error) => {
              console.log(error);
            });
        }}/>
      </View>
    );
  }
}
