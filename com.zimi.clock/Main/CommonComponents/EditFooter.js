'use strict';

import React from 'react';

import {
  PixelRatio,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import MHGlobalData from '../CommonComponents/MHGlobalData';

export default class EditFooter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => this.props.onPress()}
        style={[styles.footer, { height: MHGlobalData.EDIT_FOOTER_HEIGHT }]}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={ this.props.iconUri }
            style={styles.icon}
          />
          <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.5)" }}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1 / PixelRatio.get(),
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  icon: {
    width: 29,
    height: 29,
  }
});
