//@native begin
import React, { Component, Fragment } from 'react';
import { StyleSheet, View, ScrollView, DeviceEventEmitter, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PropTypes from 'prop-types';
import {Device} from 'miot';
import NavigationBar from './NavigationBar';
import Separator from './Separator';
import { Styles as CommonStyle } from '../resources';
import { DialogComponent } from '../utils/dialog-manager';
import { getNavigation } from '../utils/navigation-helper';
import { adjustSize } from '../utils/sizes';
const window = Dimensions.get('window');
const isIos = Platform.OS === 'ios';
const isIphoneX = isIos && window.width === 375 && window.height === 812;
// export const REQUESTSETBACKGROUND = 'PageWithNormalNavigator_REQUESTSETBACKGROUND';
export const PageWithNormalNavigatorKey = 'PageWithNormalNavigator_key';
export function getBackgroundEventKey() {
  let navigation = getNavigation();
  let {params} = navigation.state;
  let page = navigation.state.routeName;
  let key = (params && params[PageWithNormalNavigatorKey]) ? params[PageWithNormalNavigatorKey] : page;
  return 'PageWithNormalNavigator_REQUESTSETBACKGROUND:' + page;
}
class BackgroundComponent extends Component {
  state = {
    component: null
  };
  componentDidMount() {
    if(!this.props.eventKey) {
      return;
    }
    this.REQUESTSETBACKGROUND = DeviceEventEmitter.addListener(this.props.eventKey, component => {
      this.setState({
        component
      });
    });
  }
  componentWillUnmount() {
    this.REQUESTSETBACKGROUND && this.REQUESTSETBACKGROUND.remove();
    this.REQUESTSETBACKGROUND = null;
  }
  render() {
    let { component } = this.state;
    return (
      <View style={StylesBackground.container}>
        {component}
      </View>
    );
  }
}
// export const REQUESTSETNAVIGATION = 'PageWithNormalNavigator_REQUESTSETNAVIGATION';
const NavigationState = {};
function saveNavigationState(key, state) {
  NavigationState[key] = state;
}
function removeNavigationState() {
  // let navigation = getNavigation();
  // let page = navigation.state.routeName;
  // NavigationState[page] = null;
}
export function getNavigationState() {
  // let navigation = getNavigation();
  // let page = navigation.state.routeName;
  let key = getNavigationEventKey();
  return NavigationState[key];
}
export function getNavigationEventKey() {
  let navigation = getNavigation();
  let {params} = navigation.state;
  let page = navigation.state.routeName;
  let key = (params && params[PageWithNormalNavigatorKey]) ? params[PageWithNormalNavigatorKey] : page;
  return 'PageWithNormalNavigator_REQUESTSETNAVIGATION:' + key;
}
class WrapedNavigation extends Component {
  state = {
    pageKey: getNavigationEventKey()
  };
  static getDerivedStateFromProps(props) {
    return props;
  }
  componentDidMount() {
    if(!this.props.eventKey) {
      return;
    }
    this.REQUESTSETNAVIGATION = DeviceEventEmitter.addListener(this.props.eventKey, props => {
      this.setState(state => {
        return {
          ...state,
          ...props
        };
      });
    });
  }
  componentWillUnmount() {
    this.REQUESTSETNAVIGATION && this.REQUESTSETNAVIGATION.remove();
    this.REQUESTSETNAVIGATION = null;
    removeNavigationState();
  }
  render() {
    let { pageKey, title, backgroundColor, type, withSeperator, ...restNavigatorParams } = this.state;
    saveNavigationState(pageKey, this.state);
    return (
      <Fragment>
        <NavigationBar title={title || Device.name} backgroundColor={backgroundColor || 'transparent'} type={type || NavigationBar.TYPE.LIGHT} {...restNavigatorParams} />
        {withSeperator ? (
          <Separator />
        ) : null}
      </Fragment>
    );
  }
}
export default class PageWithNormalNavigator extends Component {
  static propTypes = {
    // containerStyle: View.propTypes.style,
    // contentStyle: ScrollView.propTypes.style,
    navigatorParams: PropTypes.any,
    backgroundComponent: PropTypes.node
  };
  state = {
    backgroundEventKey: getBackgroundEventKey(),
    navigationEventKey: getNavigationEventKey(),
    height: '100%'
  };
  onLayout = (e) => {
    this.setState({
      height: e.nativeEvent.layout.height
    })
  }
  componentDidMount() {
    let key = getBackgroundEventKey();
  }
  render() {
    let { navigatorParams, containerStyle, contentStyle } = this.props;
    let { backgroundEventKey, navigationEventKey, height: minHeight } = this.state;
    return (
      <View style={[Styles.container, containerStyle]}>
        <BackgroundComponent eventKey={backgroundEventKey} />
        <WrapedNavigation eventKey={navigationEventKey} {...navigatorParams} />
          <ScrollView style={[Styles.content, contentStyle]} alwaysBounceVertical={false} contentContainerStyle={[Styles.contentInner, {
            minHeight
          }]} showsVerticalScrollIndicator={false} onLayout={this.onLayout}>
            {this.props.children}
          </ScrollView>
        <DialogComponent />
      </View>
    );
  }
};
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyle.common.backgroundColor
  },
  safearea: {
    flex: 1
  },
  content: {
    flex: 1
  },
  contentInner: {
    // minHeight: '100%'
    paddingBottom: isIphoneX ? 34 : adjustSize(30)
  }
});
const StylesBackground = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});
//@native end