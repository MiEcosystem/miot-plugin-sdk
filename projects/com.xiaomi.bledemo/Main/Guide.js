import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class Guide extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={{ flex: 1 }} underlayColor='#ffffff' onPress={() => {
          this.props.navigation.navigate('mible', { title: '小米蓝牙协议设备' })
        }}>
          <Text style={styles.text}>
            小米蓝牙协议设备
          </Text>
        </TouchableHighlight><TouchableHighlight style={{ flex: 1 }} underlayColor='#ffffff' onPress={() => {
          this.props.navigation.navigate('normalble', { title: '普通蓝牙设备' })
        }}>
          <Text style={styles.text}>
            普通蓝牙设备
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#999999',
    marginBottom: 0,
    marginTop: 0,
  }, text: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    color: '#000000',
    alignSelf: 'stretch',
    marginTop: 300,
  },
  testText: {
    color: '#000000cc',
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
})