import Service from "miot/Service";
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CommonCell from '../../CommonModules/CommonCell';

export default class MHRoomDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      apiList: []
    };
  }
  componentDidMount() {
    this.setState({
      apiList: [
        {
          name: "获取房间列表", group: 'MHRoom', handle: this.handleObjRes.bind(this), action: () => {
            return Service.room.loadAllRoom(true).then(res => {
              return new Promise.resolve(res.map(item => { return { id: item.homeID, name: item.name, roomid: item.roomID } }))
            })
          }
        },
        {
          name: "创建房间", group: 'MHRoom', handle: this.handleObjRes.bind(this), action: () => {
            return Service.room.createRoom('auto_create')
          }
        },
        {
          name: "修改auto_create房间名称", group: 'MHRoom', handle: this.handleObjRes.bind(this), action: () => {
            return Service.room.loadAllRoom(true).then(res => {
              return new Promise.resolve(res.filter(item => { return item.name === 'auto_create' || item.name === 'auto_create_1' }))
            }).then(rooms => {
              if (rooms.length < 1) {
                return new Promise.reject("房间不存在，请创建")
              }
              let room = rooms[0];
              return room.updateName(room.name === 'auto_create' ? 'auto_create_1' : 'auto_create')
            })
          }
        },

      ]
    })
  }

  handleObjRes(result) {
    var item = [];
    for (var key in result) {
      item.push({ 'key': key, 'value': JSON.stringify(result[key]) });
    }
    this.setState((preState) => {
      return { dataSource: item };
    });
  }

  handleArrRes(result) {
    console.log(result instanceof Array)
    if (!(result instanceof Array)) {
      result = result.list;
      if (!(result instanceof Array)) {
        return;
      }
    }
    var items = [];
    for (var i = 0; i < result.length; i++) {
      var item = result[i];
      items.push({ 'key': i, 'value': "----" })
      for (var key in item) {
        items.push({ 'key': key, 'value': "v:" + JSON.stringify(item[key]) });
      }
    }
    this.setState((preState) => {
      return { dataSource: items };
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ height: 200 }}
          data={this.state.dataSource}
          keyExtractor={item => item.key}
          ItemSeparatorComponent={({ highlighted }) => {
            return (<View style={highlighted ? styles.separatorHighlighted : styles.separator}></View>)

          }}
          renderItem={({ item }) => {
            return (<View style={{ flexDirection: 'row', margin: 10 }}>
              <Text style={{ width: 150 }}>{item.key}:</Text>
              <Text style={{ width: 150 }}>{item.value}</Text>
            </View>);
          }} />
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
                    item.action().then((result) => {
                      console.log("api res", result)
                      item.handle(result)
                    })
                      .catch(err => {
                        console.log("err", err)
                        alert("error: " + JSON.stringify(err))
                      })
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