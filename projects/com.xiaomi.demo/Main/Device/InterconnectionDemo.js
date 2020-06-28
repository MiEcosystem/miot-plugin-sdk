import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';

import TitleBar from 'miot/ui/TitleBar';

import { getSupportedDevicesWithLinkage, getSupportedDevices, scan, getLinkage, addLinkage, removeLinkage, setEnable } from 'miot/device/interconnection';

const Category = 'sensor_ht';

export default class InterconnectionDemo extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <TitleBar
          title="设备互联"
          type="dark"
          style={{ backgroundColor: '#fff' }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  state = {
    supportedDevicesWithLinkage: [],
    supportedDevices: [],
    scanDevices: [],
    linkageDevices: []
  };

  listenerScan = null;

  setEnable = (mac, enabled, linked) => {
    if (!linked) {
      return;
    }
    setEnable(mac, !enabled).then(() => {
      this.setState((state) => {
        return {
          supportedDevicesWithLinkage: state.supportedDevicesWithLinkage.map((device) => {
            return {
              ...device,
              enabled: device.mac === mac ? !enabled : device.enabled
            };
          }),
          linkageDevices: state.linkageDevices.map((device) => {
            return {
              ...device,
              enabled: device.mac === mac ? !enabled : device.enabled
            };
          })
        };
      });
    }).catch((e) => {
      console.log('setEnable fail', e);
    });
  }

  addOrRemove = (mac, pdid, linked) => {
    (linked ? removeLinkage : addLinkage)(mac).then(() => {
      this.setState((state) => {
        return {
          supportedDevicesWithLinkage: state.supportedDevicesWithLinkage.map((device) => {
            return {
              ...device,
              linked: device.mac === mac ? !linked : device.linked,
              enabled: device.mac === mac ? (linked ? false : device.enabled) : device.enabled
            };
          }),
          linkageDevices: linked ? state.linkageDevices.filter((device) => {
            return device.mac !== mac;
          }) : [
            ...state.linkageDevices,
            {
              mac,
              pdid,
              enabled: false
            }
          ]
        };
      });
    }).catch((e) => {
      console.log('addOrRemove fail', e);
    });
  }

  getSupportedDevicesWithLinkageList() {
    return this.state.supportedDevicesWithLinkage.map(({ mac, pdid, did, model, enabled, linked }) => {
      return (
        <View key={mac} style={Styles.item}>
          <Text style={Styles.text}>{mac}</Text>
          <Text style={Styles.text}>{pdid}</Text>
          <Text style={Styles.text}>{did}</Text>
          <Text style={Styles.text}>{model}</Text>
          <TouchableOpacity style={Styles.text} onPress={() => {
            this.setEnable(mac, enabled, linked);
          }}><Text>{enabled ? 'Y/Disable' : linked ? 'N/Enable' : 'N'}</Text></TouchableOpacity>
          <TouchableOpacity style={Styles.text} onPress={() => {
            this.addOrRemove(mac, pdid, linked);
          }}><Text>{linked ? 'Y/Remove' : 'N/Add'}</Text></TouchableOpacity>
        </View>
      );
    });
  }

  getSupportedDevicesWithLinkage = () => {
    getSupportedDevicesWithLinkage(Category).then((supportedDevicesWithLinkage) => {
      this.setState({
        supportedDevicesWithLinkage
      });
    }).catch((e) => {
      console.log('getSupportedDevices fail', e);
    });
  }

  getSupportedDeviceList() {
    return this.state.supportedDevices.map(({ mac, pdid, model, did }) => {
      return (
        <View key={mac} style={Styles.item}>
          <Text style={Styles.text}>{mac}</Text>
          <Text style={Styles.text}>{pdid}</Text>
          <Text style={Styles.text}>{did}</Text>
          <Text style={Styles.text}>{model}</Text>
        </View>
      );
    });
  }

  getSupportedDevices = () => {
    getSupportedDevices(Category, true).then((supportedDevices) => {
      this.setState({
        supportedDevices
      });
    }).catch((e) => {
      console.log('getSupportedDevices fail', e);
    });
  }

  getScanList() {
    return this.state.scanDevices.map(({ mac, pdid, rssi }) => {
      return (
        <View key={mac} style={Styles.item}>
          <Text style={Styles.text}>{mac}</Text>
          <Text style={Styles.text}>{pdid}</Text>
          <Text style={Styles.text}>{rssi}</Text>
        </View>
      );
    });
  }

  scan = () => {
    this.listenerScan = scan({
      category: Category
    }, (scanDevices) => {
      console.log('scanDevices success', scanDevices);
      this.setState({
        scanDevices
      });
    }, (e) => {
      console.log('scanDevices fail', e);
    });
  }

  getLinkageList() {
    return this.state.linkageDevices.map(({ mac, pdid, enabled }) => {
      return (
        <View key={mac} style={Styles.item}>
          <Text style={Styles.text}>{mac}</Text>
          <Text style={Styles.text}>{pdid}</Text>
          <Text style={Styles.text}>{String(enabled)}</Text>
        </View>
      );
    });
  }

  getLinkage = () => {
    getLinkage().then((linkageDevices) => {
      console.log('scanDevices success', linkageDevices);
      this.setState({
        linkageDevices
      });
    }).catch((e) => {
      console.log('getLinkage fail', e);
    });
  }

  componentWillUnmount() {
    this.listenerScan && this.listenerScan.remove();
    this.listenerScan = null;
  }

  render() {
    return (
      <ScrollView style={Styles.container}>
        <View style={Styles.section}>
          <TouchableOpacity style={Styles.btn} onPress={this.getSupportedDevicesWithLinkage}>
            <Text style={Styles.btnText}>可关联的设备(包括关联信息)</Text>
          </TouchableOpacity>
          <View style={Styles.list}>
            <View style={Styles.item}>
              <Text style={Styles.text}>Mac</Text>
              <Text style={Styles.text}>Pdid</Text>
              <Text style={Styles.text}>Did</Text>
              <Text style={Styles.text}>Model</Text>
              <Text style={Styles.text}>Enabled</Text>
              <Text style={Styles.text}>Linked</Text>
            </View>
            {this.getSupportedDevicesWithLinkageList()}
          </View>
        </View>
        <View style={Styles.section}>
          <TouchableOpacity style={Styles.btn} onPress={this.getSupportedDevices}>
            <Text style={Styles.btnText}>可关联的设备(根据房间过滤)</Text>
          </TouchableOpacity>
          <View style={Styles.list}>
            <View style={Styles.item}>
              <Text style={Styles.text}>Mac</Text>
              <Text style={Styles.text}>Pdid</Text>
              <Text style={Styles.text}>Did</Text>
              <Text style={Styles.text}>Model</Text>
            </View>
            {this.getSupportedDeviceList()}
          </View>
        </View>
        <View style={Styles.section}>
          <TouchableOpacity style={Styles.btn} onPress={this.scan}>
            <Text style={Styles.btnText}>可关联设备信号扫描</Text>
          </TouchableOpacity>
          <View style={Styles.list}>
            <View style={Styles.item}>
              <Text style={Styles.text}>Mac</Text>
              <Text style={Styles.text}>Pdid</Text>
              <Text style={Styles.text}>Rssi</Text>
            </View>
            {this.getScanList()}
          </View>
        </View>
        <View style={Styles.section}>
          <TouchableOpacity style={Styles.btn} onPress={this.getLinkage}>
            <Text style={Styles.btnText}>已关联设备</Text>
          </TouchableOpacity>
          <View style={Styles.list}>
            <View style={Styles.item}>
              <Text style={Styles.text}>Mac</Text>
              <Text style={Styles.text}>Pdid</Text>
              <Text style={Styles.text}>Enabled</Text>
            </View>
            {this.getLinkageList()}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  section: {
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#fefefe',
    borderRadius: 10
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 10
  },
  btnText: {
    color: '#24a'
  },
  list: {
    marginTop: 10
  },
  item: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  text: {
    flex: 1,
    marginRight: 5
  }
});
