import React from 'react';
import { View, Text } from 'react-native';
import { SDKContextConsumer, SDKContext } from 'miot/sdkContext';

export default class DarkModeContextAPIExample extends React.Component {

  static contextType = SDKContext

  componentDidMount() {
    console.log(this.context.colorScheme);
  }
  render() {
    return (
      <SDKContextConsumer>
        {
          ({ colorScheme }) => (
            <View>
              <Text>使用 context(https://reactjs.org/docs/context.html) 获取颜色模式</Text>
              <Text>Consumer: colorScheme: {colorScheme}</Text>
              <Text>context: colorScheme: {this.context.colorScheme}</Text>
            </View>
          )
        }
      </SDKContextConsumer>

    );
  }
}