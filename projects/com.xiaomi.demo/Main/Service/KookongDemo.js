
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Device, Service, Host } from "miot";
import CommonCell from '../../CommonModules/CommonCell';

let KKookongApiKey = 'E1F0EEA5B365121753C181D1485A7964';
let KKookongManagerIdentifier = 'managerIdentify_ac_kookong_xiaomidemo';

export default class KooKongDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      apiList: []
    };
  }

  componentWillUnmount() {
    Service.kookong.removeACManager(KKookongManagerIdentifier);
  }

  componentDidMount() {
    this.setState({
      apiList: [
        {
          name: "registerWithKey",
          group: '注册sdk',
          action: () => {
            Service.kookong.registerWithKey(KKookongApiKey, null)
          }
        },
        {
          name: "createZipACManager",
          group: '创建 带状态控制的空凋控制实例',
          action: () => {
            Service.kookong.createZipACManager(KKookongManagerIdentifier, 'remoteid', {}, null).then((res) => {
              alert('success:' + JSON.stringify(res));
            }).catch((res) => {
              alert('fail:' + JSON.stringify(res));
            })
          }
        },
        {
          name: "createNonACManager",
          group: '创建 不带状态控制的空凋控制实例',
          action: () => {
            Service.kookong.createNonACManager(KKookongManagerIdentifier, null).then((res) => {
              alert('success:' + JSON.stringify(res));
            }).catch((res) => {
              alert('fail:' + JSON.stringify(res));
            })
          }
        },
        {
          name: "removeZipACManager",
          group: '移除 空凋控制实例 一般在退出插件时候调用',
          action: () => {
            Service.kookong.removeACManager(KKookongManagerIdentifier).then((res) => {
              alert('success:' + JSON.stringify(res));
            }).catch((res) => {
              alert('fail:' + JSON.stringify(res));
            })
          }
        },
        {
          name: "canControlWithType",
          group: '判断是否可以支持 风量 风向 温度 的控制',
          action: () => {
            //1：风量  2：风向 3：温度
            Service.kookong.canControlWithType(KKookongManagerIdentifier, 1).then((res) => {
              console.log(JSON.stringify(res));
              alert('success:' + JSON.stringify(res));
            }).catch((res) => {
              alert('fail:' + JSON.stringify(res));
            })
          }
        },
        {
          name: "getCurrentValueWithType",
          group: '获取当前控制的指定type的值',
          action: () => {
            //  type 0：模式 1：风量  2：风向 3：温度 4：开关状态
            Service.kookong.getCurrentValueWithType(KKookongManagerIdentifier, 1).then((res) => {
              alert('success:' + JSON.stringify(res));
            }).catch((res) => {
              alert('fail:' + JSON.stringify(res));
            })
          }
        },
        {
          name: "getAllSupportValueWithType",
          group: '获取当前控制的指定type的所有的能控制的值',
          action: () => {
            // type 0：模式 1：风量  2：风向 5：遥控器参数 6：按键参数  101 获取某些状态下的缺失温度 102 获取无状态控制实例的所有案件集合
            Service.kookong.getAllSupportValueWithType(KKookongManagerIdentifier, 1).then((res) => {
              alert('success:' + JSON.stringify(res));
            }).catch((res) => {
              alert('fail:' + JSON.stringify(res));
            })
          }
        },
        {
          name: "changeStateValueForType",
          group: '发送控制指令',
          action: () => {
            // stateValue 控制值 sdk不对该值做任何处理，直接透传回native
            // type 0：模式 1：风量  2：风向 3：温度 4：开关状态 5：遥控器参数 6：按键参数
            Service.kookong.changeStateValueForType(KKookongManagerIdentifier, 1, 1).then((res) => {
              alert('success:' + JSON.stringify(res));
            }).catch((res) => {
              alert('fail:' + JSON.stringify(res));
            })
          }
        },
      ]
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
                    item.action();
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