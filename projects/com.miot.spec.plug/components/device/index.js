import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Image from './image';

export default class extends PureComponent {
  render() {
    let props = this.props;
    let { on } = props;
    let titleStyle = on ? Styles.titleOn : Styles.titleOff;
    return (
      <View>
        <Image on={on} />
        <View style={Styles.title}>
          <Text style={[Styles.titleText, titleStyle]}>{props.title}</Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 3
  },
  titleText: {
    fontSize: 17,
    textAlign: 'center'
  },
  titleOn: {
    color: '#fff'
  },
  titleOff: {
    color: '#000'
  }
});
