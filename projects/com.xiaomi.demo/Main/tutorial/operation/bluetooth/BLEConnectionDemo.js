import React from "react";
import {
  View,
  StyleSheet
} from "react-native";
import {Device, Bluetooth} from "miot";

// const { width, height } = Dimensions.get("window");

export default class BLEConnectionDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // device:Device
    };
  }

  render() {
    return (
      <View></View>
    );
  }

  componentDidMount() {
    // Bluetooth.startScan();
    // Device.bluetooh.readRSSI.then(resolve, reject){
    //
    // }

  }

}

const styles = StyleSheet.create({

});
