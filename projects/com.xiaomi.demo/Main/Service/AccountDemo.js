import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity, Platform, ScrollView
} from 'react-native';
import { Service } from 'miot';
import id from 'miot/resources/strings/id';

/**
 * 账号管理模块 demo
 */
export default class AccountDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentAccount: {},
      data: ''
    };

    this.getAccountInfoById = this.getAccountInfoById.bind(this);
    this.getAccountInfoList = this.getAccountInfoList.bind(this);
  }

  componentWillMount() {
    Service.account.load().then(res => {
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

    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    let fontFamily = {};
    if (Platform.OS === 'android') fontFamily = { fontFamily: 'Kmedium' };

    return (
      <View style={[styles.listContainer, styles.list]}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: this.state.avatarURL }}
            style={{ width: 50, height: 50, margin: 10 }}
          />
          <View>
            <Text style={[{ marginTop: 10, marginLeft: 10 }, fontFamily]}>
当前用户 ID:
              {this.state.currentAccount.ID}
            </Text>
            <Text style={[{ marginTop: 10, marginLeft: 10 }, fontFamily]}>
当前用户 nickName:
              {this.state.currentAccount.nickName}
            </Text>
            <Text style={[{ marginTop: 10, marginLeft: 10 }, fontFamily]}>
当前用户 avatarURL:
              {this.state.currentAccount.avatarURL}
            </Text>
            <Text style={[{ marginTop: 10, marginLeft: 10 }, fontFamily]}>
当前用户 birth:
              {this.state.currentAccount.birth}
            </Text>
            <Text style={[{ marginTop: 10, marginLeft: 10 }, fontFamily]}>
当前用户 email:
              {this.state.currentAccount.email}
            </Text>
            <Text style={[{ marginTop: 10, marginLeft: 10 }, fontFamily]}>
当前用户 phone:
              {this.state.currentAccount.phone}
            </Text>
            <Text style={[{ margin: 10 }, fontFamily]}>
当前用户 sex:
              {this.state.currentAccount.sex}
            </Text>
            <Text style={[{ margin: 10 }, fontFamily]}>
当前用户 shareTime:
              {this.state.currentAccount.shareTime}
            </Text>
          </View>

        </View>
        <View style={styles.searchRow} />
        <TouchableOpacity style={styles.btnStyle} onPress={this.getAccountInfoById}>
          <Text style={[{ color: '#ffffff' }, fontFamily]}>获取指定某一账号id的信息</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={this.getAccountInfoList}>
          <Text style={[{ color: '#ffffff' }, fontFamily]}>获取批量账号id的信息</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <Text style={[{ color: '#333333', margin: 10, lineHeight: 16, fontSize: 14 }, fontFamily]}>
              {this.state.data}
            </Text>
          </ScrollView>
        </View>

      </View>

    );
  }

  getAccountInfoById() {
    Service.account.getAccountInfoById('894158105').then(res => {
      console.log('res', res);
      this.setState({ data: JSON.stringify(res) });
    }).catch(error => {
      console.log('error', error);
      this.setState({ data: JSON.stringify(error) });
    });
  }

  getAccountInfoList() {
    const ids = ['894158105', '123456', '888'];
    Service.account.getAccountInfoList(ids).then(res => {
      console.log('res', res);
      this.setState({ data: JSON.stringify(res) });
    }).catch(error => {
      console.log('error', error);
      this.setState({ data: JSON.stringify(error) });
    });
  }
}

const styles = StyleSheet.create({
  listContainer: { flex: 1 },
  list: { backgroundColor: '#eeeeee' },
  sectionHeader: {
    backgroundColor: '#eeeeee',
    padding: 5,
    fontWeight: '500',
    fontSize: 11
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
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
    backgroundColor: '#bbbbbb',
    marginLeft: 15
  },
  separatorHighlighted: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgb(217, 217, 217)'
  },
  rowTitleText: {
    fontSize: 17,
    fontWeight: '500'
  },
  rowDetailText: {
    fontSize: 15,
    color: '#888888',
    lineHeight: 20
  },
  searchRow: {
    backgroundColor: '#eeeeee',
    padding: 10
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
    paddingVertical: 0,
    height: 35
  },
  btnStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
