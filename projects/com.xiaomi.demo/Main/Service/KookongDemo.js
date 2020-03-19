
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Device, Service, Host } from "miot";
import CommonCell from '../../CommonModules/CommonCell';
import Package from 'miot/Package';

let KKookongApiKey_Ios_Debug = '60095E329B----51B70CCD9';//开发时请换成实际可用key
let KKookongApiKey_Ios_Release = '87250803----55DFAB036A3';//开发时请换成实际可用key
let KKookongApiKey_Android = '91423A3CBA44F36A45C8CABB572A4B2F';

let KKookongManagerIdentifier = 'managerIdentify_ac_kookong_xiaomidemo';

let KKooKongInitIRData = '{"id":10727}';

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
            if(Host.isAndroid){
              Service.kookong.registerWithKey(KKookongApiKey_Android, null);
            }else{
              if (Package.isDebug) {
                Service.kookong.registerWithKey(KKookongApiKey_Ios_Debug, null);
              } else {
                Service.kookong.registerWithKey(KKookongApiKey_Ios_Release, null);
              }
            }
          }
        },
        {
          name: "createZipACManager",
          group: '创建 带状态控制的空凋控制实例',
          action: () => {
            Service.kookong.createZipACManager(KKookongManagerIdentifier, '10727', JSON.parse(KKooKongInitIRData), null).then((res) => {
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