import React from 'react';
import { View, Text } from 'react-native';
import { DynamicStyleSheet, useDynamicStyleSheet, useDarkModeContext, DynamicValue } from "react-native-dark-mode";

export default function Extra() {
  const mode = useDarkModeContext();
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  return <View style={styles.container}>
    <Text style={styles.text}>Forced mode: {mode}</Text>
  </View>;
}

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: new DynamicValue('white', 'black'),
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    color: new DynamicValue('black', 'white')
  }
});
