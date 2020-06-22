'use strict';

import Host from 'miot/Host';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { Image, ListView, PixelRatio, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class HostDemo extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: <TitleBar type="dark" title={navigation.state.params.title} style={{ backgroundColor: '#fff' }}
        onPressLeft={() => { navigation.goBack(); }} />
    };
  };

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this._createMenuData();
    this.state = {
      dataSource: ds.cloneWithRows(this._menuData.map((o) => (o.name)))
    };
  }

  _createMenuData() {
    this._menuData = [
      {
        'name': 'Host Props 信息',
        'func': () => {
          this.props.navigation.navigate('HostPropsInfoDemo', { title: 'Host Props 信息' });
        }
      },
      {
        'name': 'HostEventDemo-手机系统事件监听',
        'func': () => {
          this.props.navigation.navigate('HostEventDemo', { title: '手机系统事件监听' });
        }
      },
      {
        'name': '音频',
        'func': () => {
          this.props.navigation.navigate('audioDemo', { 'title': '音频Demo' });
        }
      },
      {
        'name': '视频',
        'func': () => {
          this.props.navigation.navigate('videoDemo', { 'title': '视频Demo' });
        }
      },
      {
        'name': '加密',
        'func': () => {
          this.props.navigation.navigate('cryptoDemo', { 'title': '加密Demo' });
        }
      },
      {
        'name': 'Route 到 Native 页面 - Host.ui',
        'func': () => {
          this.props.navigation.navigate('NavigateUIDemo', { title: 'Route 到 Native 页面 - Host.ui' });
        }
      },
      {
        'name': '本地文件存储与截图-file',
        'func': () => {
          this.props.navigation.navigate('FileDemo', { title: '本地文件存储与截图-file' });
        }
      },
      {
        'name': '本地KV存储-storage',
        'func': () => {
          this.props.navigation.navigate('KVStorageDemo', { title: '本地KV存储-storage' });
        }
      },
      {
        'name': '本地化相关-local',
        'func': () => {
          this.props.navigation.navigate('LocaleServer', { title: '本地化相关-local' });
        }
      },
      {
        'name': '相册相关-PhotoDemo',
        'func': () => {
          this.props.navigation.navigate('PhotoDemo', { title: '相册相关-PhotoDemo' });
        }
      },
      {
        "name": '创建独立js线程',
        'func': () => {
          this.props.navigation.navigate('JSExecutor', { title: "创建独立js线程" });
        }
      },
      {
        "name": 'sim卡信息',
        'func': () => {
          Host.getOperatorsInfo().then((res) => {
            console.log(res);
            alert(JSON.stringify(res));
          });
        }
      },
      {
        "name": '打开WebView',
        'func': () => {
          Host.ui.openWebPage("https://home.mi.com/views/article.html?articleId=684095286000000001");
        }
      }
    ];
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <ListView style={styles.list} dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)} />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor="#838383" onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{rowData}</Text>
            <Image style={styles.subArrow} source={require("../../Resources/sub_arrow.png")} />
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowID) {
    this._menuData[rowID].func();
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: '#f1f1f1',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 0,
    marginTop: 0
  },
  rowContainer: {
    height: 52,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 23,
    paddingRight: 23,
    alignItems: 'center',
    flex: 1
  },
  list: {
    alignSelf: 'stretch'
  },

  title: {
    fontSize: 15,
    color: '#333333',
    alignItems: 'center',
    flex: 1
  },
  subArrow: {
    width: 7,
    height: 14
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#e5e5e5',
    marginLeft: 20
  }
});
