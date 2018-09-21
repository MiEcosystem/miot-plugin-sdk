import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";

export default class Simple extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Hello </Text>
        <Image source={require("../Resources/icon_demo.png")}
               style={{ width: 50, height: 50, backgroundColor: "black" }}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  hello: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

