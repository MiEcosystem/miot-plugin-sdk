import Service from 'miot/Service';
import Host from 'miot/Host';
import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity
} from 'react-native';
import Logger from '../Logger';

export default class MHRoomDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };

    this.loadAllRoom = this.loadAllRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.updateRoomName = this.updateRoomName.bind(this);
    Logger.trace(this);
  }

  render() {
    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    let fontFamily = {};
    if (Host.isAndroid) fontFamily = { fontFamily: 'Kmedium' };
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <ScrollView style={{ marginTop: 1, width: '90%' }} showsVerticalScrollIndicator={false}>
          {
            [
              [this.loadAllRoom, '获取房间列表信息'],
              [this.createRoom, '创建auto_create房间'],
              [this.updateRoomName, '修改修改auto_create/auto_create_1房间名称']
            ].map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.button} onPress={() => {
                  Logger.trace(this, item[0], { action: item[1] });
                  item[0].bind(this)();
                }}>
                  <Text style={styles.buttonText}>{item[1]}</Text>
                </TouchableOpacity>
              );
            })
          }
          <Text style={{ marginTop: 20, width: '100%', minHeight: 100, padding: 10, borderWidth: 1, borderColor: '#DDD', borderRadius: 5, backgroundColor: '#FFF', color: '#666' }}>
            {this.state.data || '点击按钮查看输出结果'}
          </Text>
        </ScrollView>
      </View>
    );
  }

  // 获取房间列表
  loadAllRoom() {
    Service.room.loadAllRoom(true).then((rooms) => {
      let res = "";
      for (let item of rooms) {
        let cur = `homeID:${ item.homeID },roomID:${ item.roomID },name:${ item.name }\n`;
        res = res.concat(cur);
      }
      this.setState({
        data: res
      });
    }).catch((error) => {
      this.setState({
        data: JSON.stringify(error, null, '\t')
      });
    });
  }

  // 创建房间
  createRoom() {
    Service.room.createRoom('auto_create').then((room) => {
      this.setState({
        data: JSON.stringify(room, null, '\t')
      });
    }).catch((error) => {
      this.setState({
        data: JSON.stringify(error, null, '\t')
      });
    });
  }

  // 修改房间名称
  updateRoomName() {
    Service.room.loadAllRoom(true)
      .then((rooms) => new Promise.resolve(rooms.filter((room) => room.name === 'auto_create' || room.name === 'auto_create_1')))
      .then((rooms) => {
        if (rooms.length < 1) {
          this.setState({
            data: 'auto_create或auto_create_1房间不存在，请创建'
          });
          return;
        }
        const room = rooms[0];
        room.updateName(room.name === 'auto_create' ? 'auto_create_1' : 'auto_create').then((msg) => {
          this.setState({
            data: JSON.stringify(room, null, '\t')
          });
        }).catch((error) => {
          this.setState({
            data: JSON.stringify(error, null, '\t')
          });
        });
      }).catch((error) => {
        this.setState({
          data: JSON.stringify(error, null, '\t')
        });
      });
  }
}

const styles = StyleSheet.create({
  button: {
    color: '#000',
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  buttonText: {
    alignSelf: 'center',
    color: '#555',
    fontSize: 14,
    padding: 5
  }
});
