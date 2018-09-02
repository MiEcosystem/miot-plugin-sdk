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
import { Package } from "miot";

const { width, height } = Dimensions.get("window");

export default class PackageDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      package: Package
    };
  }

  render() {
    console.log(typeof this.state.package.pluginID,"aaaaaaaaaaaaaaaa")
    return (
      <View style={[styles.listContainer, styles.list]}>
        <View style={{ flexDirection: "row" }}>
          <ScrollView contentContainerStyle={{ alignItems: "stretch", justifyContent: "center" }}>
            <Text style={{ margin: 10, width: width }}>当前插件
              pluginID: {this.state.package.pluginID}</Text>
            <Text style={{ margin: 10, width: width }}>当前插件
              packageID: {this.state.package.packageID}</Text>
            <Text style={{ margin: 10, width: width }}>当前插件
              version: {this.state.package.version}</Text>
            <Text style={{ margin: 10, width: width }}>当前插件
              packageName: {this.state.package.packageName}</Text>
            <Text style={{ margin: 10, width: width }}>当前插件
              apiLevel: {this.state.package.apiLevel}</Text>
            <Text style={{ margin: 10, width: width }}>当前插件
              buildType: {this.state.package.buildType}</Text>
            <Text style={{ margin: 10, width: width }}>当前插件
              models: {this.state.package.models}</Text>
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
