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

import React from 'react'
import  {
    Animated,
    Easing,
    View,
    StyleSheet,
    StatusBar,
    Platform,
    Text
} from 'react-native';

export default class AnimFadeInOutDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      fadeInOpacity: new Animated.Value(0),
      fadeOutOpacity: new Animated.Value(1)
    }
  }

  componentDidMount() {
    this.startFadeInAnimation();
    this.startFadeOutAnimation();
  }

  startFadeInAnimation(){
    Animated.timing(this.state.fadeInOpacity, {
        toValue: 1, // 目标值
        duration: 2500, // 动画时间
        easing: Easing.linear // 缓动函数
    }).start(this.handleEndFadeInAnimEnd.bind(this));
  }
  handleEndFadeInAnimEnd(){
    this.state.fadeInOpacity.setValue(0);
    this.startFadeInAnimation();
  }

  startFadeOutAnimation(){
    Animated.timing(this.state.fadeOutOpacity, {
        toValue: 0, // 目标值
        duration: 2500, // 动画时间
        easing: Easing.linear // 缓动函数
    }).start(this.handleEndFadeOutAnimEnd.bind(this));
  }
  handleEndFadeOutAnimEnd(){
    this.state.fadeOutOpacity.setValue(1);
    this.startFadeOutAnimation();
  }


  render() {
      return (
        <View style={styles.container} >
          <StatusBar barStyle='default' />
          <Animated.View style={[styles.mainContianer, {opacity: this.state.fadeOutOpacity, backgroundColor: 'ghostwhite'},]}>
              <Text style={styles.text}>淡出的效果</Text>
          </Animated.View>
          <Animated.View style={[styles.mainContianer, {opacity: this.state.fadeInOpacity, backgroundColor: 'honeydew'}]}>
              <Text style={styles.text}>淡入的效果</Text>
          </Animated.View>
        </View>
      );
  }
}

var styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 64 : 76,
        flexDirection:'column',
        flex:1,
    },
    mainContianer: {
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 30
    }
});

// var route = {
//   key: 'AnimFadeInOutDemo',
//   component: AnimFadeInOutDemo,
//   title: '一般动画－淡入淡出',
// };

