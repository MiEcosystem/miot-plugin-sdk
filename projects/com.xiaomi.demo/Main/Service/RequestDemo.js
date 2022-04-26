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
                '常规：兼容 callsmartHome', [
                  ['正常请求', ["/v2/device/getsettingv2", { did: Device.deviceID }]],
                  ['api不在白名单报错', ["/v2/device/getsettingv2_1", { did: Device.deviceID }]],
                  ['默认配置(切换APP地区测试其它服务)', ["/v2/device/getsettingv2", { did: Device.deviceID, switch_to_call_specific_api: {} }]],
                  ['pv 环境', ["/v2/device/getsettingv2", { did: Device.deviceID, switch_to_call_specific_api: { prefix: 'pv' } }]],
                  ['自定义 host', ["/v2/device/getsettingv2", { did: Device.deviceID, switch_to_call_specific_api: { host: 'us.api.io.mi.com/app' } }]]
                ]
              ],
              [
                '常规: get post param cookie 等(model不在callSpec...白名单报错)',
                [
                  ['get+params(在url中)', ["http://api.baidu.com/", 'get', { a: 'b', header: { Accept: 'text/html' } }]],
                  ['post+params(在body中)', ["http://api.baidu.com/", 'post', { a: 'b' }]],
                  ['post+params在下一级(不会被上一级的字段污染)', ["http://api.baidu.com/", 'post', { params: { a: 'b' }, c: 'd' }]],
                  ['post+自定义header(header 字段不会作为 param)', ["http://api.baidu.com/", 'post', { header: { a: 'b' }, c: 'd' }]],
                  ['post+自定义header cookie', ["http://api.baidu.com/", 'post', { a: 'b', header: { cookie: 'e=f;g=h;' }, c: 'd' }]],
                  ['post+自定义header cookie(覆盖合并本地cookie)', ["https://api.io.mi.com/app/v2/device/getsettingv2", 'post', { mi_http2_0_encrypt_sub_url: '/v2/device/getsettingv2', did: Device.deviceID, header: { cookie: 'locale=xxxxxx; g=h;' }, c: 'd' }]],
                  ['get+IP请求 允许私有证书 allow_private_certificates', ["http://192.168.28.1/", 'get', { a: 'b', allow_private_certificates: true, header: { Accept: '*/*' } }]]
                ]
              ],
              [
                '常规：host需要serviceToken在cookie和params中(model不在getSid...白名单会报错)',
                [
                  ['get请求, 合并到cookie 和 query', ["https://api.miwifi.com/r/api/misystem/get_usb_u2", 'get', { mi_http2_0_encrypt_sub_url: '/r/api/misystem/get_usb_u2', deviceId: Device.deviceID.replace("miwifi.", ""), header: { Accept: '*/*' } }]],
                  ['get请求+自定义cookie, 合并到cookie 和 query', ["https://api.miwifi.com/r/api/misystem/get_usb_u2", 'get', { mi_http2_0_encrypt_sub_url: '/r/api/misystem/get_usb_u2', deviceId: Device.deviceID.replace("miwifi.", ""), header: { Accept: '*/*', cookie: 'userId=894158105;serviceToken=sXEJM' } }]],
                  ['post请求，合并到cookie 和 body', ["https://api2.mina.mi.com/remote/ubus", 'post', { a: 'b', header: { 'Content-Type': 'application/x-www-form-urlencoded' } }]],
                  ['post请求+子params，合并到cookie 和 body', ["https://api2.mina.mi.com/remote/ubus", 'post', { a: 'b', header: { 'Content-Type': 'application/x-www-form-urlencoded' }, params: { c: 'd' } }]]
                ]
              ],
              [
                '常规错误', [
                  ['method不支持', ["http://api.baidu.com/", 'put', {}]],
                  ['url 错误(缺少host)', ["http://v2/device/getsettingv2", 'put', {}]],
                  ['url 错误(格式错误)', ["http:// api.baidu.com/", 'put', {}]],
                  ['非白名单host被全局拦截', ["https://a.b.com/", 'post', { a: 'b' }]]
                ]
              ],
              [
                '网络服务失败', [
                  ['cookie 无效', ["https://api.io.mi.com/app/v2/device/latest_ver", 'post', { did: 'ssss', header: { cookie: 'serviceToken=1;userId=2;yetAnotherServiceToken=3;' }, c: 'd' }]],
                  ['host 服务找不到 code', ["https://xxx.baidu.com/", 'post', { a: 'b' }]]
                ]
              ]
            ].map((item, section) => {
              return (
                <View key={section} style={{ marginBottom: 20 }}>
                  <Text style={{ width: '100%', textAlign: 'center', padding: 5, fontSize: 18 }}> {item[0]} </Text>
                  {
                    item[1].map((item, index) => {
                      return <TouchableOpacity key={index} style={styles.button} onPress={() => {
                        Logger.trace(this, item[0], { action: item[1] });
                        let request = section == 0
                          ? Service.callSmartHomeAPI(...item[1])
                          : Service.callSpecificAPI(...item[1]);
                        request.then((res) => {
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
