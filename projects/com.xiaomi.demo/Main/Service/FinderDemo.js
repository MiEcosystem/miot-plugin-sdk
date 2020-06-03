import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Device, Service, Host } from "miot";
import CommonCell from '../../CommonModules/CommonCell';

export default class FinderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiList: []
    };
  }

  componentDidMount() {
    this.setState({
      apiList: [
        {
          name: "getInitFinderDeviceData",
          group: '初始化防丢器',
          action: () => {
            Service.finder.getInitFinderDeviceData(Device.deviceID).then((res) => {
              alert(`success:${ JSON.stringify(res) }`);
            }).catch((res) => {
              alert(`fail:${ JSON.stringify(res) }`);
            });
          }
                          
        },
        {
          name: "uploadInitedFinderData",
          group: '上传初始化数据到云端',
          action: () => {
            Service.finder.uploadInitedFinderData(Device.deviceID).then((res) => {
              alert(`success:${ JSON.stringify(res) }`);
            }).catch((res) => {
              alert(`fail:${ JSON.stringify(res) }`);
            });
          }
        },
        {
          name: "getFinderLocations",
          group: '获取防丢器的历史位置',
          action: () => {
            Service.finder.getFinderLocations(Device.deviceID, null).then((res) => {
              alert(`success:${ JSON.stringify(res) }`);
            }).catch((res) => {
              alert(`fail:${ JSON.stringify(res) }`);
            });
          }
        },
        {
          name: "getFinderLocationsCommon",
          group: '获取设备的历史地理位置（社区查找）',
          action: () => {
            Service.finder.getFinderLocationsCommon(Device.deviceID, null).then((res) => {
              alert(`success:${ JSON.stringify(res) }`);
            }).catch((res) => {
              alert(`fail:${ JSON.stringify(res) }`);
            });
          }
        },
        {
          name: "setFinderSetting",
          group: '设置防丢器',
          action: () => {
            let settings = {};
            Service.finder.setFinderSetting(Device.deviceID, settings).then((res) => {
              alert(`success:${ JSON.stringify(res) }`);
            }).catch((res) => {
              alert(`fail:${ JSON.stringify(res) }`);
            });
          }
        },
        {
          name: "getFinderSetting",
          group: '获取防丢器相关设置',
          action: () => {
            Service.finder.getFinderSetting(Device.deviceID).then((res) => {
              alert(`success:${ JSON.stringify(res) }`);
            }).catch((res) => {
              alert(`fail:${ JSON.stringify(res) }`);
            });
          }
        },
        {
          name: "isSupportGeoFence",
          group: '手机是否支持地理围栏',
          action: () => {
            Service.finder.isSupportGeoFence().then((res) => {
              alert(`success:${ JSON.stringify(res) }`);
            }).catch((res) => {
              alert(`fail:${ JSON.stringify(res) }`);
            });
          }
        },
        {
          name: "isInGeoFence",
          group: '手机是否处于电子围栏中',
          action: () => {
            Service.finder.isInGeoFence().then((res) => {
              alert(`success:${ JSON.stringify(res) }`);
            }).catch((res) => {
              alert(`fail:${ JSON.stringify(res) }`);
            });
          }
        },
        {
          name: "getCountOfAntiLostFinder",
          group: '获取当前账户有多少个防丢器设置了防丢模式',
          action: () => {
            Service.finder.getCountOfAntiLostFinder().then((res) => {
              alert(`success:${ JSON.stringify(res) }`);
            }).catch((res) => {
              alert(`fail:${ JSON.stringify(res) }`);
            });
          }
        },
        {
          name: "deleteFinderDataByDid",
          group: '删除防丢器数据',
          action: () => {
            Service.finder.deleteFinderDataByDid(Device.deviceID).then((res) => {
              alert(`success:${ JSON.stringify(res) }`);
            }).catch((res) => {
              alert(`fail:${ JSON.stringify(res) }`);
            });
          }
        }
      ]
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.apiList}
          keyExtractor={(item) => item.name}
          ItemSeparatorComponent={({ highlighted }) => {
            return (<View style={highlighted ? styles.separatorHighlighted : styles.separator}></View>);

          }}
          renderItem={({ item }) => {
            let marginT = item.group == undefined ? 2 : 5;
            let title = item.group == undefined ? (undefined) : (<Text style={{ margin: 5 }}>{item.group}</Text>);
            return (
              <View style={{ marginTop: marginT }}>
                {title}
                <CommonCell
                  title={item.name}
                  onPress={() => {
                    item.action();
                  }}
                />
              </View>

            );
          }
          } />

      </View>

    );
  }

}

var styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: 15
  },
  separatorHighlighted: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgb(217, 217, 217)'
  }
});