import React from 'react';

import {
  View,
  Text, ScrollView
} from 'react-native';

import { StringSpinner } from 'miot/ui';
import Logger from '../Logger';

const SpinnerStatus = new Map([
  [0, '未开始'],
  [1, '开始滚动'],
  [2, '结束滚动']
]);

export default class StringSpinnerDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oneValue: "",
      selectBgColor: "#ff0000",
      spinnerStatus: 0
    };
    Logger.trace(this);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView ref={'myScrollView'} bounces={true}>
          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <StringSpinner
              visible={false}
              style={{ width: 120, height: 200, backgroundColor: '#ffffff' }}
              dataSource={['a', 'b', 'c', 'd', 'e', 'f', 'g']}
              defaultValue={'c'}
              onChangeStart={() => {
                this.setState({ spinnerStatus: 1 });
              }}
              onValueChanged={(data) => {
                this.setState({ spinnerStatus: 2 });
                this.updateOneValue(data);
              }}
            />

            <StringSpinner
              style={{ width: 120, height: 200, marginLeft: 10, backgroundColor: '#ffffff' }}
              dataSource={['a', 'b', 'c', 'd', 'e', 'f', 'g']}
              defaultValue={'c'}
              unit={"斤"}
              pickerInnerStyle={{ lineColor: "#ff0000", textColor: "#ff0000", selectTextColor: "#00ff00", fontSize: 14, selectFontSize: 18, rowHeight: 54, selectBgColor: "#eeeeee", unitFontSize: 12, unitTextColor: '#f7632a' }}
              onChangeStart={() => {
                this.setState({ spinnerStatus: 1 });
              }}
              onValueChanged={(data) => {
                this.setState({ spinnerStatus: 2 });
                this.updateOneValue(data);
              }}
            />
          </View>
          <Text style={{ marginTop: 20, color: "#666", fontSize: 14 }}>当前状态： {SpinnerStatus.get(this.state.spinnerStatus)}</Text>
          <Text style={{ marginTop: 20, color: "#666", fontSize: 14 }}>{`选中的值为：${ this.state.oneValue }`}</Text>

          <View style={{ height: 200, backgroundColor: '#999' }} />
          <View style={{ height: 200, backgroundColor: '#a12' }} />
          <View style={{ height: 200, backgroundColor: '#cda' }} />
          <View style={{ height: 200, backgroundColor: '#999' }} />
          <View style={{ height: 200, backgroundColor: '#1ac' }} />
          <View style={{ height: 200, backgroundColor: '#5aa' }} />
          <View style={{ height: 200, backgroundColor: '#8b2' }} />
          <View style={{ height: 200, backgroundColor: '#cb2' }} />
          <View style={{ height: 200, backgroundColor: '#1b2' }} />
        </ScrollView>
      </View >
    );
  }

  updateOneValue(data) {
    console.log(data);
    this.setState({ oneValue: data.newValue });
  }
  // updateMutiValue(data) {
  //     console.log(data);
  //     this.setState({ mutiValue: data.newValue.join("-") });
  // }
}

