import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import ImageCapInset from 'react-native-image-capinsets';
import Logger from '../Logger';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chart: {
    width: 200,
    height: 200
  }
});

const data = [
  [0, 1],
  [1, 3],
  [3, 7],
  [4, 9]
];


export default class ImageCapInsetDemo extends Component {
  constructor(props) {
    super(props);
    Logger.trace(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageCapInset
          style={{ width: 200, height: 200 }}
          source={require('../../Resources/spark.png')}
          capInsets={{ top: 8, right: 8, bottom: 8, left: 8 }}
        />
        <Image
          style={{ width: 200, height: 200 }}
          source={require('../../Resources/spark.png')}
        />
      </View>
    );
  }
}
