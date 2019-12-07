import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  Platform
} from 'react-native';
import {HostEvent} from "miot/Host";

export default class HostEventDemo extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      networkStatePrefix:'当前网络状态为：',
      networkState:''
    }
  }

  componentWillMount() {
    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    this.fontFamily = {};
    if (Platform.OS === 'android') this.fontFamily = { fontFamily: 'Kmedium' }

    // 监听手机网络状态变化
    this.cellPhoneNetworkStateChanged = HostEvent.cellPhoneNetworkStateChanged.addListener((networkInfo) => {

      let networkState = '';
      if(networkInfo.networkState === -1){
        networkState = '数据异常';
      }else if(networkInfo.networkState === 0){
        networkState = '当前网络不可用';
      }else if(networkInfo.networkState === 1){
        networkState = '网络可用，蜂窝网络 2G 3G 4G'
      }else if(networkInfo.networkState === 2){
        networkState = '网络可用，WiFi网络'
      }

      this.setState({
        networkState: JSON.stringify(networkState)
      })
    });
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: '#eeeeee', padding:20}}>
        <Text style={[{color:'#333333', fontSize: 14}, this.fontFamily]}>
          {this.state.networkStatePrefix+this.state.networkState}
        </Text>
      </View>
    );
  }

  componentWillUnmount() {
    if(this.cellPhoneNetworkStateChanged){
      this.cellPhoneNetworkStateChanged.remove();
    }
  }

}