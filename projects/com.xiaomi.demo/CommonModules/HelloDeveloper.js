'use strict';

import React from 'react';

import {
  StyleSheet,
  Text,
  Image,
  View,
  Component,
  PixelRatio,
} from 'react-native';
import { ImageButton } from 'miot/ui';

// export default class MoreMenu extends React.Component
export default class HelloDeveloper extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    // Image控件的使用，除了指定uri以外，一定还要指定isStatic参数为!MHPluginSDK.devMode，因为调试模式下图片是从local server实时获取，正式上线后就变为本地图片了，故而isStatic的取值是不同的
    return (
      <View style={styles.containerAll}>
        <View style={styles.containerIcon}>
          <Image style={styles.icon} source={require('../Resources/hello_raise.jpg')} />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.title}>你好，开发者{'\n\n'}
            终于等到你的到来，在小米智能硬件平台，您有机会创造出惊艳世界的智能产品。{'\n\n'}
            未来时智能化的时代，我们准备好了，你呢？
          </Text>
        </View>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#838383',
    marginTop: 0,
  },
  containerIcon: {
    flex: 1.3,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
  },
  containerText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    padding: 20,
  },

  icon: {
    alignSelf: 'center',
    width: 152,
    height: 165,
  },

  title: {
    fontSize: 16,
    alignSelf: 'center',
  },

});

var route = {
  key: 'HelloDeveloper',
  title: 'Welcome!',
  component: HelloDeveloper,
}

// module.exports = {
//   component: HelloDeveloper,
//   route: route,
// }
