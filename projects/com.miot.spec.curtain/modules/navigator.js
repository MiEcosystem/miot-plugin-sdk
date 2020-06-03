import React, { Component } from 'react';
import { Device, Package } from 'miot';
// import {TitleBarBlack, TitleBarWhite} from 'miot/ui';
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
    // let TitleBar = navigation.getParam('barColor') === 'white' ? TitleBarWhite : TitleBarBlack;
    let type = navigation.getParam('barColor') === 'white' ? NavigationBar.TYPE.DARK : NavigationBar.TYPE.LIGHT;
    let title = navigation.getParam('title', Device.name);
    let hideRightButton = navigation.getParam('hideRightButton');
    let showDot = navigation.getParam('showDot', false);
    // return (
    //   <TitleBar style={{zIndex: 99999}} title={title || Device.name} onPressLeft={() => {goback(navigation)}} onPressRight={hideRightButton ? null : () => {gosetting(navigation)}} />
    // );
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
