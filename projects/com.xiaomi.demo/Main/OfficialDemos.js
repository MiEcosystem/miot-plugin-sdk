'use strict';

import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import { Host, Package, Entrance } from "miot";
import { ListItem } from 'miot/ui/ListItem';
import Separator from 'miot/ui/Separator';
import { Styles } from 'miot/resources';
import NavigationBar from "miot/ui/NavigationBar";
import Logger from './Logger';

export default class OfficialDemos extends React.Component {

  constructor(props, context) {
    super(props, context);
    Logger.trace(this);
    this.props.navigation.setParams({
      title: "插件示例",
      left: [Package.entrance !== Entrance.Main && !Package.pageParams.isBackToMainPage ? {
        key: NavigationBar.ICON.CLOSE,
        onPress: () => Package.exit(),
        accessibilityLabel: '退出',
        accessibilityHint: '退出插件'
      } : {
        key: NavigationBar.ICON.BACK,
        onPress: () => navigation.goBack(),
        accessibilityLabel: '返回',
        accessibilityHint: '返回上一页'
      }
      ]
    });

    this.state = {
      groups: [
        [
          {
            name: '开发示例',
            device: {
              did: "mock.did.xiaomi.demo",
              model: 'mock.model.xiaomi.demo'
            }
          }
        ],
        [
          {
            name: '窗帘',
            device: {
              did: "mock.did.miot.curtain",
              model: 'mock.model.miot.curtain',
              androidUrl: ""
            }
          },
          {
            name: '插座',
            device: {
              did: "mock.did.miot.plug",
              model: 'mock.model.miot.plug',
              androidUrl: ""
            }
          },
          {
            name: '灯泡',
            device: {
              did: "mock.did.miot.light",
              model: 'mock.model.miot.light',
              androidUrl: ""
            }
          }
        ]
      ]
    };
  }

  render() {
    return (
      <View style={Styles.container}>
        <Separator />
        <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>
          {
            this.state.groups.map((group, i) => {
              return (
                <View key={String(i)}>
                  <View style={styles.blank} />
                  {
                    group.map((item) => {
                      return (
                        <ListItem
                          key={item.name}
                          title={item.name}
                          onPress={(_) => {
                            this._openDemo(item.device);
                            Logger.trace(this, this._openDemo, { name: rowData });
                          }}
                        />
                      );
                    })
                  }
                </View>
              );
            })
          }
          <View>
            <Text style={{ margin: 20, color: '#333' }}>
              温馨提示: 所有示例插件代码均可在Github MiEcosystem/miot-plugin-sdk 的 projects 目录下找到
            </Text>
          </View>
        </ScrollView>
      </View >
    );
  }

  _openDemo(device) {
    // Host.ui.openDevice(device.did, device.model, device.params ?? {} )
    let pageParams = {
      did: device.did,
      model: device.model,
      isBackToMainPage: false,
      androidUrl: device.androidUrl
    };
    Host.ui.openPluginPage(device.did, "main", pageParams)
      .then((res) => {
        console.log('success:', res);
      }).catch((err) => {
        alert(JSON.stringify(err));
      });
  }
}

const styles = StyleSheet.create({
  blank: {
    height: 8,
    backgroundColor: Styles.common.backgroundColor,
    borderTopColor: Styles.common.hairlineColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Styles.common.hairlineColor,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
