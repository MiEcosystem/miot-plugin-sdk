/**
 * Copyright (c) 2015, Facebook, Inc.  All rights reserved.
 *
 * Facebook, Inc. ("Facebook") owns all right, title and interest, including
 * all intellectual property and other proprietary rights, in and to the React
 * Native CustomComponents software (the "Software").  Subject to your
 * compliance with these terms, you are hereby granted a non-exclusive,
 * worldwide, royalty-free copyright license to (1) use and copy the Software;
 * and (2) reproduce and distribute the Software as part of your own software
 * ("Your Software").  Facebook reserves all rights not expressly granted to
 * you in this license agreement.
 *
 * THE SOFTWARE AND DOCUMENTATION, IF ANY, ARE PROVIDED "AS IS" AND ANY EXPRESS
 * OR IMPLIED WARRANTIES (INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE) ARE DISCLAIMED.
 * IN NO EVENT SHALL FACEBOOK OR ITS AFFILIATES, OFFICERS, DIRECTORS OR
 * EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
'use strict';

let React = require('React');
// var NavigatorNavigationBarStylesAndroid = require('NavigatorNavigationBarStylesAndroid');
let NavigatorNavigationBarStylesIOS = require('NavigatorNavigationBarStylesIOS');
let Platform = require('Platform');
let StyleSheet = require('StyleSheet');
let View = require('View');

let guid = require('guid');

let { Map } = require('immutable');

let COMPONENT_NAMES = ['Title', 'LeftButton', 'RightButton'];

let NavigatorNavigationBarStyles = NavigatorNavigationBarStylesIOS;

let navStatePresentedIndex = function(navState) {
  if (navState.presentedIndex !== undefined) {
    return navState.presentedIndex;
  }
  // TODO: rename `observedTopOfStack` to `presentedIndex` in `NavigatorIOS`
  return navState.observedTopOfStack;
};

let MHNavigationBar = React.createClass({

  propTypes: {
    navigator: React.PropTypes.object,
    routeMapper: React.PropTypes.shape({
      Title: React.PropTypes.func.isRequired,
      LeftButton: React.PropTypes.func.isRequired,
      RightButton: React.PropTypes.func.isRequired
    }).isRequired,
    navState: React.PropTypes.shape({
      routeStack: React.PropTypes.arrayOf(React.PropTypes.object),
      presentedIndex: React.PropTypes.number
    }),
    navigationStyles: React.PropTypes.object,
    style: View.propTypes.style
  },

  statics: {
    Styles: NavigatorNavigationBarStyles,
    StylesIOS: NavigatorNavigationBarStylesIOS
  },

  getDefaultProps() {
    return {
      navigationStyles: NavigatorNavigationBarStyles
    };
  },

  componentWillMount: function() {
    this._reset();
  },

  /**
   * Stop transtion, immediately resets the cached state and re-render the
   * whole view.
   */
  immediatelyRefresh() {
    this._reset();
    this.forceUpdate();
  },

  _reset() {
    this._key = guid();
    this._reusableProps = {};
    this._components = {};
    this._descriptors = {};

    COMPONENT_NAMES.forEach((componentName) => {
      this._components[componentName] = new Map();
      this._descriptors[componentName] = new Map();
    });
  },

  _getReusableProps: function(
    /* string */componentName,
    /* number */index
  ) /* object */ {
    let propStack = this._reusableProps[componentName];
    if (!propStack) {
      propStack = this._reusableProps[componentName] = [];
    }
    let props = propStack[index];
    if (!props) {
      props = propStack[index] = { style: {} };
    }
    return props;
  },

  _updateIndexProgress: function(
    /* number */progress,
    /* number */index,
    /* number */fromIndex,
    /* number */toIndex
  ) {
    let amount = toIndex > fromIndex ? progress : (1 - progress);
    let oldDistToCenter = index - fromIndex;
    let newDistToCenter = index - toIndex;
    let interpolate;
    if (oldDistToCenter > 0 && newDistToCenter === 0 ||
        newDistToCenter > 0 && oldDistToCenter === 0) {
      interpolate = this.props.navigationStyles.Interpolators.RightToCenter;
    } else if (oldDistToCenter < 0 && newDistToCenter === 0 ||
               newDistToCenter < 0 && oldDistToCenter === 0) {
      interpolate = this.props.navigationStyles.Interpolators.CenterToLeft;
    } else if (oldDistToCenter === newDistToCenter) {
      interpolate = this.props.navigationStyles.Interpolators.RightToCenter;
    } else {
      interpolate = this.props.navigationStyles.Interpolators.RightToLeft;
    }

    COMPONENT_NAMES.forEach(function(componentName) {
      let component = this._components[componentName].get(this.props.navState.routeStack[index]);
      let props = this._getReusableProps(componentName, index);
      if (component && interpolate[componentName](props.style, amount)) {
        component.setNativeProps(props);
      }
    }, this);
  },

  updateProgress: function(
    /* number */progress,
    /* number */fromIndex,
    /* number */toIndex
  ) {
    let max = Math.max(fromIndex, toIndex);
    let min = Math.min(fromIndex, toIndex);
    for (let index = min; index <= max; index++) {
      this._updateIndexProgress(progress, index, fromIndex, toIndex);
    }
  },

  render: function() {
    let navBarStyle = {
      height: this.props.navigationStyles.General.TotalNavHeight
    };
    let navState = this.props.navState;
    let components = navState.routeStack.map((route, index) => {
      if (index == navState.routeStack.length - 1) {
        return COMPONENT_NAMES.map((componentName) =>
          this._getComponent(componentName, route, index)
        );
      } else {
        return [];
      }
    });
    // var components = COMPONENT_NAMES.map(componentName=> this._getComponent(componentName, navState.routeStack[navState.routeStack.length-1], navState.routeStack.length-1));

    return (
      <View
        key={this._key}
        style={[styles.navBarContainer, navBarStyle, this.props.style]}>
        {components}
      </View>
    );
  },

  _getComponent: function(
    /* string */componentName,
    /* object */route,
    /* number */index
  ) /* ?Object */ {
    if (this._descriptors[componentName].includes(route)) {
      return this._descriptors[componentName].get(route);
    }

    let rendered = null;

    let content = this.props.routeMapper[componentName](
      this.props.navState.routeStack[index],
      this.props.navigator,
      index,
      this.props.navState
    );
    if (!content) {
      return null;
    }

    let initialStage = index === navStatePresentedIndex(this.props.navState) ?
      this.props.navigationStyles.Stages.Center :
      this.props.navigationStyles.Stages.Left;
    rendered = (
      <View
        ref={(ref) => {
          this._components[componentName] = this._components[componentName].set(route, ref);
        }}
        pointerEvents="box-none"
        style={initialStage[componentName]}>
        {content}
      </View>
    );

    this._descriptors[componentName] = this._descriptors[componentName].set(route, rendered);
    return rendered;
  }

});


var styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  }
});

module.exports = MHNavigationBar;
