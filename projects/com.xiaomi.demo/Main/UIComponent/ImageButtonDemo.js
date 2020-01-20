import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import ImageButton from 'miot/ui/ImageButton'

export default class ImageButtonDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
       <ImageButton source={require('./images/love-activeDisabled.jpg')}  highlightedSource={require('./images/love-active.jpg')} onPress={() => {console.log('onPress')}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
  });
  
  