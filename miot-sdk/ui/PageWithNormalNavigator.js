//@native begin
import React, {Component, Fragment} from 'react';
import {StyleSheet, View, ScrollView, DeviceEventEmitter} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import PropTypes from 'prop-types';
import Device from '../Device';
import NavigationBar from './NavigationBar';
import Separator from './Separator';
import {Styles as CommonStyle} from '../resources';
import {DialogComponent} from '../utils/dialog-manager';
import {getNavigation} from '../utils/navigation-helper';
import {adjustSize} from '../utils/sizes';
// export const REQUESTSETBACKGROUND = 'PageWithNormalNavigator_REQUESTSETBACKGROUND';
export function getBackgroundEventKey() {
  let navigation = getNavigation();
  let page = navigation.state.routeName;
  return 'PageWithNormalNavigator_REQUESTSETBACKGROUND:' + page;
}
class BackgroundComponent extends Component {
  state = {
    component: null
  };
  componentDidMount() {
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
    let {component} = this.state;
    return (
      <View style={StylesBackground.container}>
        {component}
      </View>
    );
  }
}
// export const REQUESTSETNAVIGATION = 'PageWithNormalNavigator_REQUESTSETNAVIGATION';
const NavigationState = {};
function saveNavigationState(page, state) {
  NavigationState[page] = state;
}
function removeNavigationState() {
  // let navigation = getNavigation();
  // let page = navigation.state.routeName;
  // NavigationState[page] = null;
}
export function getNavigationState() {
  let navigation = getNavigation();
  let page = navigation.state.routeName;
  return NavigationState[page];
}
export function getNavigationEventKey() {
  let navigation = getNavigation();
  let page = navigation.state.routeName;
  return 'PageWithNormalNavigator_REQUESTSETNAVIGATION:' + page;
}
class WrapedNavigation extends Component {
  state = {
    pageKey: getNavigation().state.routeName
  };
  static getDerivedStateFromProps(props) {
    return props;
  }
  componentDidMount() {
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
    let {pageKey, title, backgroundColor, type, withSeperator, ...restNavigatorParams} = this.state;
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
    navigationEventKey: getNavigationEventKey()
  };
  componentDidMount() {
    let key = getBackgroundEventKey();
  }
  render() {
    let {navigatorParams, containerStyle, contentStyle} = this.props;
    let {backgroundEventKey, navigationEventKey} = this.state;
    return (
      <View style={[Styles.container, containerStyle]}>
        <BackgroundComponent eventKey={backgroundEventKey} />
        <WrapedNavigation eventKey={navigationEventKey} {...navigatorParams} />
        <SafeAreaView style={Styles.safearea}>
          <ScrollView style={[Styles.content, contentStyle]} alwaysBounceVertical={false} contentContainerStyle={Styles.contentInner} showsVerticalScrollIndicator={false}>
            {this.props.children}
          </ScrollView>
        </SafeAreaView>
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
    minHeight: '100%',
    paddingBottom: adjustSize(30)
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