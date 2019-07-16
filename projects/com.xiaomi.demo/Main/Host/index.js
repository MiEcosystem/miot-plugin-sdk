'use strict';

import Host from 'miot/Host';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { Image, ListView, PixelRatio, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class HostDemo extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: <TitleBar type='dark' title={navigation.state.params.title} style={{ backgroundColor: '#fff' }}
        onPressLeft={() => { navigation.goBack(); }} />,
    };
  };

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this._createMenuData();
    this.state = {
      dataSource: ds.cloneWithRows(this._menuData.map((o) => (o.name))),
    };
  }

  _createMenuData() {
    this._menuData = [
      {
        'name': 'Host Props 信息',
        'func': () => {
          this.props.navigation.navigate('HostPropsInfoDemo', { title: 'Host Props 信息' })
        }
      },
      {
        'name': 'Native导航模块-ui',
        'func': () => {
          this.props.navigation.navigate('NavigateUIDemo', { title: 'Native导航模块-ui' })
        }
      },
      {
        'name': '文件存储与截图-file',
        'func': () => {
          this.props.navigation.navigate('fileStorage', { title: '文件存储与截图-file' })
        }
      },
      {
        'name': '本地KV存储-storage',
        'func': () => {
          this.props.navigation.navigate('storageDemo', { title: '本地KV存储-storage' })
        }
      },
      {
        'name': '本地化相关-local',
        'func': () => {
          this.props.navigation.navigate('LocaleServer', { title: '本地化相关-local' })
        }
      },
      {
        "name": '创建独立js线程',
        'func': () => {
          this.props.navigation.navigate('JSExecutor', { title: "创建独立js线程" })
        }
      },
      {
        "name": 'sim卡信息',
        'func': () => {
          Host.getOperatorsInfo().then(res => {
            console.log(res);
            alert(JSON.stringify(res));
          })
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
      <TouchableHighlight underlayColor='#838383' onPress={() => this._pressRow(rowID)}>
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

};

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
    marginTop: 0,
  },
  rowContainer: {
    height: 52,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 23,
    paddingRight: 23,
    alignItems: 'center',
    flex: 1,
  },
  list: {
    alignSelf: 'stretch',
  },

  title: {
    fontSize: 15,
    color: '#333333',
    alignItems: 'center',
    flex: 1,
  },
  subArrow: {
    width: 7,
    height: 14,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#e5e5e5',
    marginLeft: 20,
  }
});
