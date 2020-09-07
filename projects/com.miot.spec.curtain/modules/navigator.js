import React, { Component } from 'react';
import { Device, Package } from 'miot';
import NavigationBar from 'miot/ui/NavigationBar';

function goback(navigation) {
  if (navigation.state.routeName === 'App') {
    Package.exit();
  } else {
    navigation.goBack();
  }
}

function gosetting(navigation) {
  navigation.navigate('Setting');
}

export default class extends Component {
  render() {
    let navigation = this.props.navigation;
    let type = navigation.getParam('barColor') === 'white' ? NavigationBar.TYPE.DARK : NavigationBar.TYPE.LIGHT;
    let title = navigation.getParam('title', Device.name);
    let hideRightButton = navigation.getParam('hideRightButton');
    let showDot = navigation.getParam('showDot', false);
    return (
      <NavigationBar type={type} title={title} backgroundColor="transparent" left={[{
        key: NavigationBar.ICON.BACK,
        onPress: () => {
          goback(navigation);
        }
      }]} right={hideRightButton ? [] : [{
        key: NavigationBar.ICON.MORE,
        showDot,
        onPress: () => {
          navigation.setParams({
            showDot: false
          });
          gosetting(navigation);
        }
      }]} />
    );
  }
}
