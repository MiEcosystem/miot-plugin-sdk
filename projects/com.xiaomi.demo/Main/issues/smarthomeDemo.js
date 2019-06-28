import { Service } from 'miot';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class SmarthomeDemo extends Component {
  componentDidMount() {
    /* let param = {
      "app_id": "10030",
      "dids": ["blt.3.sejqgcdg4o00"],
      "params": {
        "api_type": "deviceBind",
        "method": "get",
        "data": {}
      }
    };

    Service.smarthome.callThirdPartyAPI(param).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    }); */

    // console.log(new Date() / 1000);

    let params = {
      "did": '118332901',
      "data_type": "stat_day",
      "key": "feed_stats",
      "time_end": parseInt(new Date() / 1000) + '',
      "time_start": parseInt(Date.parse("2019/05/20") / 1000) + '',
      "limit": 1000 + ''
    };

    Service.smarthome.getUserStatistics(params).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  render() {
    return (
      <View>
        <Text>smarthome 接口测试</Text>
      </View>
    );
  }
}

export default SmarthomeDemo;