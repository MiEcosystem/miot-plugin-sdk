import React from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import { Package, Service } from "miot";

const { width, height } = Dimensions.get("window");

export default class XimaAudioDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      package: Package
    };
  }

    componentWillMount() {
        Service.ximalaya.registry("1a48d5cad75f5b34a8c933edcbcad3db","f9aaa0634b685990071053600d71ed80")
    }

    componentWillUnmount() {

    }

  render() {
    return (
      <View style={[styles.listContainer, styles.list]}>
        <View style={{ flexDirection: "row" }}>
          <ScrollView contentContainerStyle={{ alignItems: "stretch", justifyContent: "center" }}>
            <Button style={{ margin: 10, width: width }} onPress={()=>{Service.ximalaya.setPlayMode(3)}}>setPlayMode</Button>
            <Button style={{ margin: 10, width: width }}>当前插件
              packageID: {this.state.package.packageID}</Button>
            <Button style={{ margin: 10, width: width }}>当前插件
              version: {this.state.package.version}</Button>
            <Button style={{ margin: 10, width: width }}>当前插件
              packageName: {this.state.package.packageName}</Button>
            <Button style={{ margin: 10, width: width }}>当前插件
              apiLevel: {this.state.package.apiLevel}</Button>
            <Button style={{ margin: 10, width: width }}>当前插件
              buildType: {this.state.package.buildType}</Button>
            <Button style={{ margin: 10, width: width }}>当前插件
              models: {this.state.package.models}</Button>
          </ScrollView>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
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
