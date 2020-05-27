import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function(Button) {
  return class extends PureComponent {
    render() {
      let { title, ...rest } = this.props;
      return (
        <View>
          <Button {...rest} />
          <Text style={Styles.title}>{title}</Text>
        </View>
      );
    }
  };
}

const Styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: -5,
    color: '#fff',
    fontFamily: 'MI-LANTING--GBK1-Light'
  }
});
