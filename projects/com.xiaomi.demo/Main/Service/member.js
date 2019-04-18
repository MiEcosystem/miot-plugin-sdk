import { Service } from "miot";
import { MemberType } from "miot/service/smarthome";
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';


export default class MemberAPIDemo extends React.Component {
  constructor(props) {
    super(props);
    this.members = []
    this.state = {
      dataSource: [],
      apiList: []
    };
  }
  componentDidMount() {
    console.log(Service.member)
    this.setState({
      apiList: [
        { name: "获取成员", handle: this.handleArrRes.bind(this), action: () => { return Service.smarthome.loadMembers(MemberType.Person) } },
        {
          name: "创建成员", handle: this.handleObjRes.bind(this), action: () => {
            return Service.smarthome.createMember(MemberType.Person, {
              name: 'hahahahah'
            })
          }
        },
        {
          name: "更新成员", handle: this.handleObjRes.bind(this), action: () => {
            return Service.smarthome.loadMembers(MemberType.Person).then(res => {
              if (res instanceof Array && res.length > 0) {
                let p = res[0];
                console.log('update:', p)
                return Service.smarthome.updateMember(MemberType.Person, p.id, { name: p.name + "." })
              } else {
                return Promise.reject("no member to update")
              }

            })
          }
        },
        {
          name: "删除成员", handle: this.handleObjRes.bind(this), action: () => {
            return Service.smarthome.loadMembers(MemberType.Person).then(res => {
              if (res instanceof Array && res.length > 0) {
                let p = res[0];
                console.log('delete:', p.id)
                return Service.smarthome.deleteMember(MemberType.Person, [p.id])
              } else {
                return Promise.reject("no member to delete")
              }

            })

          }
        }
      ]
    })
  }

  handleObjRes(result) {
    var item = [];
    for (var key in result) {
      item.push({ 'key': key, 'value': result[key] });
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
        items.push({ 'key': key, 'value': "v:" + item[key] });
      }
    }
    this.setState((preState) => {
      return { dataSource: items };
    });
  }

  render() {
    return (
      <View>

        <FlatList
          data={this.state.dataSource}
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
          ItemSeparatorComponent={({ highlighted }) => {
            return (<View style={highlighted ? styles.separatorHighlighted : styles.separator}></View>)

          }}
          renderItem={({ item }) => {
            return (
              <Button title={item.name} onPress={() => {
                item.action().then((result) => {
                  console.log("res", result)
                  item.handle(result)
                })
                  .catch(err => {
                    console.log("err", err)
                    alert("error:", err)
                  })
              }} />
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