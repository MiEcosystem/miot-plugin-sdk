import React from 'react';
import { createStackNavigator } from 'react-navigation';
import NavigationBar from "miot/ui/NavigationBar";

import { Package } from 'miot';

import Home from './Home';

function createRootStack(initialRouteName) {
  return createStackNavigator({
    Home
  },
  {
    initialRouteName,
    navigationOptions: ({ navigation }) => {
      let params = navigation.state.params || {};
      return {
        header: <NavigationBar 
          {...params}
          backgroundColor={params.backgroundColor || 'transparent'}
          type={params.type || NavigationBar.TYPE.LIGHT}
          titleStyle={params.titleStyle || { fontSize: 15 }}
          left={
            params.left || [
              {
                key: NavigationBar.ICON.BACK,
                onPress: () => navigation.goBack(),
                accessibilityLabel: "返回",
                accessibilityHint: "返回上一页"
              }
            ]
          }
          right={params.right || []}
        />
      };
    }
  });
}

class App extends React.Component {
  render() {
    let RootStack = createRootStack('Home');
    return <RootStack />;
  }
}

Package.entry(App, () => { });
