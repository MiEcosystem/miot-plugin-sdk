import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function(Button) {
  return class extends PureComponent {
    render() {
      let { title, on, ...rest } = this.props;
      let titleStyle = on ? Styles.titleOn : Styles.titleOff;
      return (
        <View>
          <Button on={on} {...rest} />
          <Text style={[Styles.title, titleStyle]}>{title}</Text>
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
    fontFamily: 'MI-LANTING--GBK1-Light'
  },
  titleOn: {
    color: '#fff'
  },
  titleOff: {
    color: '#000'
  }
});
