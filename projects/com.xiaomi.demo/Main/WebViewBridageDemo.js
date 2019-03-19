// react-native 代码
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    WebView, 
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');
export default class WebViewBridageDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webViewData: ''
    };
    this.data = 0;
    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }
  sendMessage() {
    this.webview.postMessage(++this.data);
  }
  handleMessage(e) {
    this.setState({ webViewData: e.nativeEvent.data });
  }
  render() {
    //可测试跳转
    //const uri = {uri:"https://c4.account.xiaomi.com/longPolling/login?ticket=4926acb931c9-b04f-4347-a332-8ee289a4390c&dc=c4"};
    const uri = require('../Resources/index.html')
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.sendMessage}
        >
          <Text>发送数据到WebView</Text>
        </TouchableHighlight>
        <View>
          <Text style={{width:width,textAlign:'center'}}>来自WebView的数据: <Text>{ this.state.webViewData }</Text></Text>
        </View>
        <WebView
          style={styles.webview}
          source={uri}
          ref={webview => this.webview = webview}
          onMessage={this.handleMessage}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 40
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: 250,
    height: 250
  }
});