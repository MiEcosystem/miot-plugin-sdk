import { Host, Service } from "miot";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";


const { width, height } = Dimensions.get("window");

export default class LocalServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: {}, server: {}, location: 'loading'
    };
  }

  componentDidMount() {
    Service.getServerName().then(server => {
      this.setState({ server: server });
    });
    Host.locale.getLocation().then(locale => {
      this.setState({ location: JSON.stringify(locale) });
    })
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (<View style={[styles.listContainer, styles.list]}>
      <View style={{ flexDirection: "row" }}>
        <ScrollView
          contentContainerStyle={{ alignItems: "stretch", justifyContent: "center" }}>

          <Text style={{ margin: 10, width: width }}> countryName:{this.state.server.countryName}</Text>
          <Text style={{ margin: 10, width: width }}> countryCode: {this.state.server.countryCode}</Text>
          <Text style={{ margin: 10, width: width }}> serverCode: {this.state.server.serverCode}</Text>

          <Text style={{ margin: 10, width: width }}> local.language: {Host.locale.language}</Text>
          <Text style={{ margin: 10, width: width }}> local.timeZone: {Host.locale.timeZone}</Text>
          <Text style={{ margin: 10, width: width }}> local.is24HourTime: {Host.locale.is24HourTime}</Text>
          <Text style={{ margin: 10, width: width }}> local.location: {this.state.location}</Text>
        </ScrollView>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1
  }, list: {
    backgroundColor: "#eeeeee"
  }, sectionHeader: {
    backgroundColor: "#eeeeee", padding: 5, fontWeight: "500", fontSize: 11
  }, row: {
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 8
  }, image: {
    width: 44, height: 44, margin: 15

  }, separator: {
    height: StyleSheet.hairlineWidth, backgroundColor: "#bbbbbb", marginLeft: 15
  }, separatorHighlighted: {
    height: StyleSheet.hairlineWidth, backgroundColor: "rgb(217, 217, 217)"
  }, rowTitleText: {
    fontSize: 17, fontWeight: "500"
  }, rowDetailText: {
    fontSize: 15, color: "#888888", lineHeight: 20
  }, searchRow: {
    backgroundColor: "#eeeeee", padding: 10
  }, searchTextInput: {
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
    paddingVertical: 0,
    height: 35
  }
});
