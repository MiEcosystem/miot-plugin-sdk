import Service from 'miot/Service';
import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Platform
} from 'react-native';

export default class MHRoomDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };

    this.loadAllRoom = this.loadAllRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.updateRoomName = this.updateRoomName.bind(this);
  }

  render() {

    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    let fontFamily = {};
    if (Platform.OS === 'android') fontFamily = { fontFamily: 'Kmedium' }

    return (
      <View>
        <TouchableOpacity style={styles.btnStyle} onPress={this.loadAllRoom}>
          <Text style={{ color: '#ffffff' }}>获取房间列表信息</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={this.createRoom}>
          <Text style={{ color: '#ffffff' }}>创建auto_create房间</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={this.updateRoomName}>
          <Text style={{ color: '#ffffff' }}>修改修改auto_create/auto_create_1房间名称</Text>
        </TouchableOpacity>
        <Text style={[{ color: '#333333', marginTop: 10 }, fontFamily]}>{this.state.data}</Text>
      </View>
    );
  }

  // 获取房间列表
  loadAllRoom() {
    Service.room.loadAllRoom(true).then((rooms) => {
      this.setState({
        data: JSON.stringify(rooms)
      });
    }).catch((error) => {
      this.setState({
        data: JSON.stringify(error)
      });
    });
  }

  // 创建房间
  createRoom() {
    Service.room.createRoom('auto_create').then((room) => {
      this.setState({
        data: JSON.stringify(room)
      });
    }).catch((error) => {
      this.setState({
        data: JSON.stringify(error)
      });
    });
  }

  // 修改房间名称
  updateRoomName() {
    Service.room.loadAllRoom(true)
      .then((rooms) => new Promise.resolve(rooms.filter(room => room.name === 'auto_create' || room.name === 'auto_create_1')))
      .then(rooms => {
        if (rooms.length < 1) {
          this.setState({
            data: 'auto_create或auto_create_1房间不存在，请创建'
          });
          return;
        }
        const room = rooms[0];

        room.updateName(room.name === 'auto_create' ? 'auto_create_1' : 'auto_create').then((msg) => {
          this.setState({
            data: JSON.stringify(room)
          });
        }).catch((error) => {
          this.setState({
            data: JSON.stringify(error)
          });
        });

      }).catch((error) => {
        this.setState({
          data: JSON.stringify(error)
        });
      });
  }

}
// eslint-disable-next-line no-var,vars-on-top
var styles = StyleSheet.create({
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
