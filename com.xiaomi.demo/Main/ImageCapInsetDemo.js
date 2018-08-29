import ImageCapInset from 'react-native-image-capinsets';
import {Text,Image,StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  chart: {
    width: 200,
    height: 200,
  },
});

const data = [
  [0, 1],
  [1, 3],
  [3, 7],
  [4, 9],
];


export default class ImageCapInsetDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageCapInset
          style={{width:200,height:200}}
          source={require('../Resources/spark.png')}
          capInsets={{ top: 8, right: 8, bottom: 8, left: 8 }}
        />
        <Image
          style={{width:200,height:200}}
          source={require('../Resources/spark.png')}
        />
      </View>
    );
  }
}
