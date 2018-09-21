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
import {
    Animated,
    Easing,
    View,
    StyleSheet,
    StatusBar,
    Platform,
    Text,
    Dimensions,
	  Image,
    PanResponder
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class DraggableView extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       pan: new Animated.ValueXY(), // inits to zero
     };
     this.state.panResponder = PanResponder.create({
       onStartShouldSetPanResponder: () => true,
       onPanResponderMove: Animated.event([null, {
         dx: this.state.pan.x, // x,y are Animated.Value
         dy: this.state.pan.y,
       }]),
       onPanResponderRelease: (event, gestureState) => {
         Animated.spring(
           this.state.pan,         // Auto-multiplexed
           {toValue: {x: 0, y: 0}} // Back to zero
         ).start();
       },
     });
   }
   render() {
     return (
       <Animated.View
         {...this.state.panResponder.panHandlers}
         style={this.state.pan.getLayout()}>
         {this.props.children}
       </Animated.View>
     );
   }
 }

 export default class AnimEventsDemo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    }
  }

  render() {
      return (
        <View style={styles.container} >
          <StatusBar barStyle='default' />
          <Text style={[styles.textView, {fontSize: 15, textAlign: 'center'}]}>Animated动画支持跟踪功能</Text>
          <DraggableView>
            <Image
              source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
              style={{width: 100, height: 100}}
            />
            </DraggableView>
        </View>
      );
  }

}

var styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: Platform.OS === 'ios' ? 64 : 76,
        flexDirection:'column',
    },
    textView: {
      marginTop: 10,
      flexDirection:'column',
      alignItems: 'center',
    },
    text: {
        fontSize: 30,
        textAlign: 'center'
    }
});

// var route = {
//   key: 'AnimEventsDemo',
//   component: AnimEventsDemo,
//   title: '动画事件－绑定事件',
// };
