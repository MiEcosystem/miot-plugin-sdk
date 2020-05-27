import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Package, PackageEvent, Host } from 'miot';
import { MoreSetting } from 'miot/ui/CommonSetting';

// views
import App from './views/app';
import Setting from './views/setting';

import { PROTOCOLCACHEKEY } from './modules/consts';

PackageEvent.packageAuthorizationCancel.addListener(() => {
  Host.storage.set(PROTOCOLCACHEKEY, false);
  Package.exit();
});


const RootStack = createStackNavigator({
  App,
  Setting,
  MoreSetting
}, {
  initialRouteName: 'App',
  navigationOptions: ({ navigation }) => {
    return {
      headerMode: 'none',
      header: null
    };
  }
});

Package.entry(RootStack, () => {

});
