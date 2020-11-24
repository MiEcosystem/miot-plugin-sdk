import React from 'react';

import {
  View,
  Text, ToastAndroid
} from 'react-native';

import { NumberSpinner } from 'miot/ui';
import { Host } from 'miot';
import Logger from '../Logger';

const SpinnerStatus = new Map([
  [0, '未开始'],
  [1, '开始滚动'],
  [2, '结束滚动']
]);

export default class NumberSpinnerDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      maxMonth: 12,
      unitTextColor: '#f7632a',
      unitFontSize: 20,
      visible: true,
      spinnerStatus: 0
    };
    Logger.trace(this);
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginTop: 20, color: "#666", fontSize: 14 }}>当前状态： {SpinnerStatus.get(this.state.spinnerStatus)}</Text>
        <View style={{ flexDirection: 'row' }}>
          <NumberSpinner
            style={{ width: 100, height: 200 }}
            maxValue={9999}
            minValue={1}
            interval={1}
            defaultValue={80}
            valueFormat={"%1.0f"}
            unit={"年"}
            onChangeStart={() => {
              this.setState({ spinnerStatus: 1 });
            }}
            onNumberChanged={(data) => {
              this.setState({ spinnerStatus: 2 });
              this.updateValueYear(data);
            }}
          />
          <NumberSpinner
            style={{ width: 100, height: 200 }}
            maxValue={this.state.maxMonth}
            minValue={1}
            interval={1}
            defaultValue={6}
            valueFormat={"%1.0f"}
            lineStyle={"none"} // 不推荐使用，  推荐使用 pickerInnerStyle
            unit={"月"}
            onChangeStart={() => {
              this.setState({ spinnerStatus: 1 });
            }}
            onNumberChanged={(data) => {
              this.setState({ spinnerStatus: 2 });
              this.updateValueYear(data);
            }}
          />
          <NumberSpinner
            style={{ width: 100, height: 200 }}
            maxValue={30}
            minValue={1}
            interval={1}
            defaultValue={20}
            valueFormat={"%1.0f"}
            unit={"日"}
            pickerInnerStyle={{ lineColor: "#ff0000", textColor: "#ff0000", selectTextColor: "#00ff00", fontSize: 14, selectFontSize: 18, rowHeight: 54, selectBgColor: "#eeeeee", unitFontSize: 12, unitTextColor: '#f7632a' }}
            onChangeStart={() => {
              this.setState({ spinnerStatus: 1 });
            }}
            onNumberChanged={(data) => {
              this.setState({ spinnerStatus: 2 });
              this.updateValueYear(data);
            }}
          />
        </View>
      </View>
    );
  }

  updateValueYear(data) {
    console.log(`newValue:${ data.newValue }`);
    this.setState({
      unitTextColor: '#666666',
      unitFontSize: 13
    });
    this.showToastAndroid(data);
  }

  updateValueMonth(data) {
    console.log(`newValue:${ data.newValue }`);
    this.showToastAndroid(data);
  }

  updateValueDay(data) {
    console.log(`newValue:${ data.newValue }`);
    this.showToastAndroid(data);
  }

  showToastAndroid(data) {
    if (Host.isAndroid) {
      ToastAndroid.show(`newValue:${ data.newValue },oldValue:${ data.oldValue }`, ToastAndroid.SHORT);
    }
  }
}