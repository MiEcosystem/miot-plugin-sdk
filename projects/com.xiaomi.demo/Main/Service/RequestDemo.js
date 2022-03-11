import { Device, Service } from 'miot';
import React from 'react';
import {
  StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity
} from 'react-native';

import Logger from '../Logger';

export default class MHRoomDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
    Logger.trace(this);

  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ marginVertical: 20, width: '100%', height: 200, padding: 10, borderWidth: 1, borderColor: '#DDD', borderRadius: 5, backgroundColor: '#FFF', color: '#666' }}>
          {this.state.data || '点击按钮查看输出结果'}
        </Text>
        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
          {
            [
              [
                '常规：兼容 callsmartHome 小米服务端域名', [
                  ['post, path形式, 自动cookie)', ["/v2/device/latest_ver", 'post', { did: Device.deviceID }]],
                  ['不在 apiRepo 白名单内，报错', ["/v2/device/latest_ver11", 'post', {}]]
                ]
              ],
              [
                '常规：其他host(model不在requestSpecific白名单报错)',
                [
                  ['get+params(在url中)', ["http://api.baidu.com/", 'get', { a: 'b', header: { Accept: 'text/html' } }]],
                  ['post+params(在body中)', ["http://api.baidu.com/", 'post', { a: 'b' }]],
                  ['post+params在下一级(不会被上一级的字段污染)', ["http://api.baidu.com/", 'post', { params: { a: 'b' }, c: 'd' }]],
                  ['post+自定义header(header 字段不会作为 param)', ["http://api.baidu.com/", 'post', { header: { a: 'b' }, c: 'd' }]],
                  ['post+自定义header cookie', ["http://api.baidu.com/", 'post', { a: 'b', header: { cookie: 'e=f;g=h;' }, c: 'd' }]],
                  ['post+自定义header cookie(覆盖合并本地cookie)', ["/v2/device/latest_ver", 'post', { did: Device.deviceID, header: { cookie: 'locale=xxxxxx; g=h;' }, c: 'd' }]],
                  ['get+IP请求 允许私有证书 allow_private_certificates', ["http://192.168.28.1/", 'get', { a: 'b', allow_private_certificates: true, header: { Accept: '*/*' } }]]
                ]
              ],
              [
                '常规：host需要serviceToken在cookie和params中(model不在getSid...白名单报错)',
                [
                  ['get请求, 合并到cookie 和 query', ["https://api2.mina.mi.com/admin/v2/device_list", 'get', { master: 0, requestId: 'app_ios_GvJxKNa6oyUkcOiCW4BPSCeie5Kcl8', header: { Accept: '*/*' } }]],
                  ['get请求+自定义cookie, 合并到cookie 和 query', ["https://api2.mina.mi.com/admin/v2/device_list", 'get', { master: 0, requestId: 'app_ios_GvJxKNa6oyUkcOiCW4BPSCeie5Kcl8', header: { Accept: '*/*', cookie: 'userId=894158105;serviceToken=sXEJM' } }]],
                  ['post请求，合并到cookie 和 body', ["https://api2.mina.mi.com/remote/ubus", 'post', { a: 'b', header: { 'Content-Type': 'application/x-www-form-urlencoded' } }]],
                  ['post请求+子params，合并到cookie 和 body', ["https://api2.mina.mi.com/remote/ubus", 'post', { a: 'b', header: { 'Content-Type': 'application/x-www-form-urlencoded' }, params: { c: 'd' } }]]
                ]
              ],
              [
                '网络失败', [
                  ['cookie 无效', ["/v2/device/latest_ver", 'post', { did: 'ssss', header: { cookie: 'serviceToken=1;userId=2;yetAnotherServiceToken=3;' }, c: 'd' }]],
                  ['服务找不到', ["http://xxx.baidu.com/", 'post', { a: 'b' }]]
                ]
              ]
            ].map((item, index) => {
              return (
                <View key={index} style={{ marginBottom: 20 }}>
                  <Text style={{ width: '100%', textAlign: 'center', padding: 5, fontSize: 18 }}> {item[0]} </Text>
                  {
                    item[1].map((item, index) => {
                      return <TouchableOpacity key={index} style={styles.button} onPress={() => {
                        Logger.trace(this, item[0], { action: item[1] });
                        Service.callSpecificAPI(item[1][0], item[1][1], item[1][2]).then((res) => {
                          this.setState({ data: JSON.stringify(res, null, '\t') });
                          console.log(JSON.stringify(res, null, '\t'));
                        }).catch((err) => {
                          this.setState({ data: JSON.stringify(err, null, '\t') });
                          console.log(JSON.stringify(err, null, '\t'));
                        });
                      }}>
                        <Text style={styles.buttonText}>{item[0]}</Text>
                      </TouchableOpacity>;
                    })
                  }
                </View>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderColor: '#6661',
    borderWidth: 0.5,
    backgroundColor: '#FFF',
    padding: 15
  },
  buttonText: {
    alignSelf: 'flex-start',
    color: '#333',
    fontSize: 16,
    padding: 5,
    alignItems: 'center'
  }
});
