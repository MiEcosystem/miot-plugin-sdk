import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class FirstPage extends Component {
  static navigationOptions = {
    tabBarLabel: '智能页1',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
            This is First Page!
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
  }
})