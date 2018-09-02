// decay(value,config) 静态方法,传入一个初始速度值以及衰减值。动画从初始速度慢慢衰减到0.
// timing(value,config)静态方法,该动画传入一个值，根据过渡曲线函数变化。Easing模块已经定义很多不同的过渡曲线方法，当然也可以自己自定义
// spring(value,config)静态方法,创建一个基于Rebound和Origami实现的Spring动画。该值会将当前动画运行的状态值自动更新到toValue属性中，以确保动画的连贯性。可以链式调用。
// add(a,b)  静态方法,将两个动画值相加，创建一个新的动画值。
// multiply(a,b) 静态方法,将两个动画值进行相乘，创建一个新的动画值
// modulo(a,modulus) 静态方法，进行对参数一的动画值取模(非负值)，创建一个新的动画值
// delay(time)  静态方法，在给定的延迟时间之后执行动画
// sequence(animations) 静态方法，该按照顺序执行一组动画，该需要等待一个动画完成以后才会继续执行下一个动画。如果当前的动画被打断终止了，那么就不会执行后边的动画了。
// parallel(animations,config?)  静态方法，同时执行一组动画，默认情况下，如果其中有任一动画被终止了，那么其余的动画也会被停止。不过我们可以通过stopTogether来改变设置。
// stagger(time,animations) 静态方法，执行一组动画，有可能里边的动画是同时执行。不过会有指定时间的延迟。
// event(argMapping,config?) 静态方法  响应事件值，如下看一下使用方法

/**
 * More inforation:
 * http://reactnative.cn/docs/0.31/animations.html#content
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  TouchableHighlight,
  ToastAndroid,
  Platform,
  UIManager,
} from 'react-native';

class CustomButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

var CustomLayoutAnimation = {
    duration: 800,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  };

export default class LayoutAnimationDemo extends Component {
    constructor(props) {
      super(props);
      this.state={
        views:[],
        num:0,
       }
      // Enable LayoutAnimation under Android
     if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true)
      }
    }
    componentWillUpdate() {
      console.log('componentWillUpdate...');
      LayoutAnimation.easeInEaseOut();
      //或者可以使用如下的自定义的动画效果
      //LayoutAnimation.configureNext(CustomLayoutAnimation);
    }
    _onPressAddView() {
      this.setState({num:Number.parseInt(this.state.num)+1});
    }
    _onPressRemoveView() {
      this.setState({num:Number.parseInt(this.state.num)-1});
    }
    _renderAddedView(i) {
      return (
       <View key={i} style={styles.view}>
          <Text style={{color:'#fff'}}>{i}</Text>
        </View>
     );
    }
    render() {
       this.state.views.length=0;
       for(var i=0;i<this.state.num;i++){
          this.state.views.push(this._renderAddedView(i));
       }
     return (
      <View style={{marginTop:20,margin:10}}>
        <Text style={styles.welcome}>
            LayoutAnimation实例演示
        </Text>
        <CustomButton text="添加View"  onPress={this._onPressAddView.bind(this)}/>
        <CustomButton text="删除View"  onPress={this._onPressRemoveView.bind(this)}/>
        <View style={styles.viewContainer}>
          {this.state.views}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
   button: {
    margin:5,
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cdcdcd',
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  view: {
    height: 50,
    width: 50,
    backgroundColor: 'green',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// var route = {
//   key: 'LayoutAnimationDemo',
//   component: LayoutAnimationDemo,
//   title: '基于布局的动画',
// };

// module.exports = {
//   route: route,
// }
