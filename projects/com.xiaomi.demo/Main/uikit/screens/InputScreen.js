import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput
} from "react-native";

import { RkTheme } from "react-native-ui-kitten";
import { UtilStyles } from "../style/styles";

export class InputScreen extends Component {
  static navigationOptions = {
    title: "Inputs"
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }

  render() {
    return (
      <ScrollView
        ref={"scrollView"}
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>

        <View style={UtilStyles.section}>
          <Text rkType='header'>Default input</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={{ flex: 1 }}>
              <TextInput autoCorrect={false}
                         autoCapitalize={"none"} placeholder='Login' clearButtonMode='always'/>
              <TextInput secureTextEntry={true} placeholder='Password' clearButtonMode='always'/>
            </View>
          </View>
        </View>

      </ScrollView>

    );
  }
}

let styles = StyleSheet.create({
  inputIcon: {
    fontSize: 15,
    color: "#0000003a",
    marginLeft: 4
  },
  searchIcon: {
    marginLeft: 16
  }
});
