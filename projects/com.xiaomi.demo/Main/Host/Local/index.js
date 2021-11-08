import { Host, Service } from "miot";
import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { ListItem } from 'miot/ui/ListItem';
import Separator from 'miot/ui/Separator';
import Logger from '../../Logger';

export default class LocalServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: {}, server: {}, location: 'loading'
    };
    Logger.trace(this);
  }

  componentDidMount() {
    Service.getServerName().then((server) => {
      this.setState({ server: server });
    });
    Host.locale.getLocation().then((locale) => {
      this.setState({ location: JSON.stringify(locale) });
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Separator />
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            [
              {
                title: 'server 信息',
                items: [
                  ['countryName', this.state.server.countryName],
                  ['countryCode', this.state.server.countryCode],
                  ['serverCode', this.state.server.serverCode]
                ]
              },
              {
                title: 'locale 信息',
                items: [
                  ['language', Host.locale.language],
                  ['systemLanguage', Host.locale.systemLanguage],
                  ['timeZone', Host.locale.timeZone],
                  ['is24HourTime', Host.locale.is24HourTime.toString()],
                  ['location', this.state.location]
                ]
              }
            ].map((section, index) => {
              return (
                <View key={index}>
                  <Text style={{ margin: 5, paddingLeft: 15 }}>{section.title}</Text>
                  {
                    section.items.map((item, index) => {
                      return <ListItem
                        key={index}
                        title={item[0]}
                        value={item[1]}
                        hideArrow={true}
                      />;
                    })
                  }
                </View>
              );
            })
          }
          <TouchableOpacity style={styles.button} onPress={() => {
            Logger.trace(this, this.render, { action: 'request' });
            Host.locale.getSystemTimeZone().then((res) => {
              console.log("res", res);
              alert(JSON.stringify(res));
            }).catch((error) => {
              console.log("error", error);
              alert(JSON.stringify(error));
            });
          }}>
            <Text style={styles.buttonText}>获取手机时区信息</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {
            Logger.trace(this, this.render, { action: 'request' });
            let params = {
              latitude: 31.166535,
              longitude: 121.403838,
              coordType: 6
            };
            Host.locale.getAddressByCoordinate(params).then((res) => {
              console.log("res", res);
              alert(JSON.stringify(res));
            }).catch((error) => {
              console.log("error", error);
              alert(JSON.stringify(error));
            });
          }}>
            <Text style={styles.buttonText}>通过经纬度获取地理信息</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    color: '#000',
    width: '90%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#555',
    fontSize: 14,
    padding: 5
  }
});