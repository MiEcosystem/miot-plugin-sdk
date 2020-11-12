import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity, ScrollView
} from 'react-native';
import { Service } from 'miot';
import Separator from 'miot/ui/Separator';
import Logger from '../Logger';

/**
 * 账号管理模块 demo
 */
export default class AccountDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentAccount: {},
      data: []
    };
    this.getAccountInfoById = this.getAccountInfoById.bind(this);
    this.getAccountInfoList = this.getAccountInfoList.bind(this);
    Logger.trace(this);
  }

  componentDidMount() {
    Service.account.load().then((res) => {
      this.setState({
        currentAccount: {
          avatarURL: res.avatarURL,
          ID: res.ID,
          nickName: res.nickName,
          birth: res.birth,
          email: res.email,
          phone: res.phone,
          sex: res.sex,
          shareTime: res.shareTime
        }
      });
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Separator />
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            (this.state.currentAccount ? [this.state.currentAccount] : []).concat(this.state.data).map((item, index) => {
              return {
                title: index == 0 ? '当前用户' : `用户${ index }`,
                img: item.avatarURL ? (typeof item.avatarURL === 'string' ? item.avatarURL : item.avatarURL.size_orig) : null,
                items: Object.keys(item && item).map((key) => {
                  return [key, item[key]];
                })
              };
            }).map((section, index) => {
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
                          <Text>{typeof item[1] === 'string' ? item[1] : JSON.stringify(item[1], null, '\t')}</Text>
                        </View>);
                    })
                  }
                </View>);
            })
          }
        </ScrollView>
        <Separator />
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <TouchableOpacity style={styles.button} onPress={this.getAccountInfoById}><Text style={styles.buttonText}>获取指定某一账号id的信息</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.getAccountInfoList}><Text style={styles.buttonText}>获取批量账号id的信息</Text></TouchableOpacity>
        </View>
      </View>
    );
  }

  getAccountInfoById() {
    Service.account.getAccountInfoById('894158105').then((res) => {
      console.log('res', JSON.stringify(res));
      this.setState({ data: [res] });
    }).catch((error) => {
      console.log('error', error);
      this.setState({ data: [error] });
    });
  }

  getAccountInfoList() {
    const ids = ['894158105', '123456', '888'];
    Service.account.getAccountInfoList(ids).then((res) => {
      console.log('res', res);
      this.setState({ data: res });
    }).catch((error) => {
      console.log('error', error);
      this.setState({ data: [error] });
    });
  }
}

const styles = StyleSheet.create({
  button: {
    color: '#000',
    width: '90%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#555',
    fontSize: 18
  }
});
