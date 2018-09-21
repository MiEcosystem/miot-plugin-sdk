import React from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  FlatList
} from "react-native";
import { Service } from "miot";

export default class FetchUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "avatarURL": "",
      "ID": "",
      "nickName": "",
      "birth": "",
      "email": "",
      "phone": "",
      "sex": "",
      "shareTime": ""
    };
    Service.account.load().then(res => {
      this.setState({
        "avatarURL": res.avatarURL,
        "ID":  res.ID,
        "nickName":  res.nickName,
        "birth": res.birth,
        "email":  res.email,
        "phone":  res.phone,
        "sex":  res.sex,
        "shareTime":  res.shareTime
      });
    });
  }

  // fetchUserInfo() {
  //
  //   this.setState(preState => {
  //     return { "uid": "", "name": "", "imageUrl": "" };
  //   });
  //   var uids = this.state.uid.split(",");
  //
  //   MHPluginSDK.fetchUserInfo(uids, (isSuccess, response) => {
  //     if (isSuccess) {
  //       this.setState(preState => {
  //         var newData = [];
  //         for (let i = 0; i < response.length; i++) {
  //           newData.push({
  //             "uid": response[i]["userid"],
  //             "name": response[i]["nickname"],
  //             "imageUrl": response[i]["icon"]
  //           });
  //         }
  //
  //         return {
  //           "data": newData
  //         };
  //       });
  //     }
  //   });
  //
  // }

  render() {
    return (
      <View style={[styles.listContainer, styles.list]}>
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: this.state.avatarURL }}
                 style={{ width: 50, height: 50, margin: 10 }}/>
          <View>
            <Text style={{ margin: 10 }}>当前用户 ID: {this.state.ID}</Text>
            <Text style={{ margin: 10 }}>当前用户 nickName: {this.state.nickName}</Text>
            <Text style={{ margin: 10 }}>当前用户 avatarURL: {this.state.avatarURL}</Text>
            <Text style={{ margin: 10 }}>当前用户 birth: {this.state.birth}</Text>
            <Text style={{ margin: 10 }}>当前用户 email: {this.state.email}</Text>
            <Text style={{ margin: 10 }}>当前用户 phone: {this.state.phone}</Text>
            <Text style={{ margin: 10 }}>当前用户 sex: {this.state.sex}</Text>
            <Text style={{ margin: 10 }}>当前用户 shareTime: {this.state.shareTime}</Text>
          </View>

        </View>
        <View style={styles.searchRow}>
          {/*<TextInput style={[styles.searchTextInput]}*/}
                     {/*placeholder='输入要查询的uid，多个查询使用uid以逗号分开'*/}
                     {/*onChangeText={*/}
                       {/*(text) => {*/}
                         {/*this.setState(*/}
                           {/*(preState) => {*/}
                             {/*return { "uid": text };*/}
                           {/*}*/}
                         {/*);*/}

                       {/*}*/}
                     {/*}*/}
          {/*/>*/}
        </View>
        {/*<Button style={styles.button} title="查询" onPress={() => {*/}
          {/*this.fetchUserInfo();*/}
        {/*}}/>*/}
        {/*{this._renderFlatList()}*/}

      </View>

    );
  }

  _keyExtractor = (item, index) => item.id;

  // _renderFlatList(): ?React.Element<any> {
  //   if (this.state.data.length == 0) {
  //     return (<View><Text style={{ margin: 10 }}>没有数据</Text>
  //     </View>);
  //   }
  //   return (
  //     <FlatList
  //       ItemSeparatorComponent={ItemSeparator}
  //       style={styles.list}
  //       data={this.state.data}
  //       keyExtractor={this._keyExtractor}
  //       renderItem={({ item }) => {
  //
  //         return (<View style={[{ flexDirection: "row" }]}>
  //           <Image style={styles.image} source={{ uri: item.imageUrl }}/>
  //           <View style={{ flexDirection: "column" }}>
  //             <Text style={[styles.rowTitleText, {}]}>name: {item.name}</Text>
  //             <Text style={[styles.rowDetailText]}>userId:{item.uid}</Text>
  //           </View>
  //         </View>);
  //
  //       }
  //       }/>
  //   );
  // }
}
const ItemSeparator = ({ highlighted }) => (
  <View style={highlighted ? styles.separatorHighlighted : styles.separator}/>
);

var styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
  list: {
    backgroundColor: "#eeeeee"
  },
  sectionHeader: {
    backgroundColor: "#eeeeee",
    padding: 5,
    fontWeight: "500",
    fontSize: 11
  },
  row: {
    backgroundColor: "white",
    justifyContent: "center",
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
    backgroundColor: "#bbbbbb",
    marginLeft: 15
  },
  separatorHighlighted: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgb(217, 217, 217)"
  },
  rowTitleText: {
    fontSize: 17,
    fontWeight: "500"
  },
  rowDetailText: {
    fontSize: 15,
    color: "#888888",
    lineHeight: 20
  },
  searchRow: {
    backgroundColor: "#eeeeee",
    padding: 10
  },
  searchTextInput: {
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
    paddingVertical: 0,
    height: 35
  }
});
