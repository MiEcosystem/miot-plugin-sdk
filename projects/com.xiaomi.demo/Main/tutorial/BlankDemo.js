import React from 'react';

import {
  View,
  Text
} from 'react-native';
import ListItem from 'miot/ui/ListItem/ListItem';

export default class BlankDemo extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>空白界面</Text>
      </View>
    );
  }
}