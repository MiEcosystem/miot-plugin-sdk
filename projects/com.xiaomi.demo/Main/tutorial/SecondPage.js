import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class SecondPage extends Component {
  static navigationOptions = {
    tabBarLabel: '页面2'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
            This is Second Page!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
  }
})