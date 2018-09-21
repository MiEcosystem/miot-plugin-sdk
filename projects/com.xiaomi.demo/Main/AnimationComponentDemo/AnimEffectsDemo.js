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
	  Image
} from 'react-native'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default class AnimEffectsDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      translateValue: new Animated.ValueXY({x:0, y:0}), // 二维坐标
      bounceValue: new Animated.Value(0),
			rotateValue: new Animated.Value(0),
			fadeOutOpacity: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.startAnimation();
  }



	startAnimation(){
		this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
		this.state.rotateValue.setValue(0);
		this.state.translateValue.setValue({x:0, y:0});
		this.state.fadeOutOpacity.setValue(1);

		Animated.sequence(
			[
				Animated.sequence([  //  组合动画 parallel（同时执行）、sequence（顺序执行）、stagger（错峰，其实就是插入了delay的parrllel）和delay（延迟）
					Animated.spring( //  基础的单次弹跳物理模型
						this.state.bounceValue,
						{
							toValue: 0.8,
							friction: 1, // 摩擦力，默认为7.
							tension: 40, // 张力，默认40。
						}
					),
					Animated.delay(1000), // 配合sequence，延迟1秒
					Animated.timing( // 从时间范围映射到渐变的值。
						this.state.rotateValue,
						{
							toValue: 1,
							duration: 800, // 动画持续的时间（单位是毫秒），默认为500
							easing: Easing.out(Easing.quad), // 一个用于定义曲线的渐变函数
							delay: 0, // 在一段时间之后开始动画（单位是毫秒），默认为0。
						}
					),
          Animated.delay(1000), // 配合sequence，延迟1秒
					Animated.decay( // 以一个初始速度开始并且逐渐减慢停止。  S=vt-（at^2）/2   v=v - at
						this.state.translateValue,
						{
							velocity: 10, // 起始速度，必填参数。
							deceleration: 0.8, // 速度衰减比例，默认为0.997。
						}
					),

				]),
        Animated.delay(1000), // 配合sequence，延迟1秒
				Animated.timing(
					this.state.fadeOutOpacity,
					{
						toValue: 0,
						duration: 2000,
						easing: Easing.linear, // 线性的渐变函数
					}
				),
        Animated.delay(1000), // 配合sequence，延迟1秒
			]
		).start(() => this.startAnimation()); // 循环执行动画

		// 监听值的变化
		this.state.rotateValue.addListener((state) => {
			console.log("rotateValue=>" + state.value);
		});

		// ValueXY
		this.state.translateValue.addListener((value) => {
			console.log("translateValue=>x:" + value.x + " y:" + value.y);
		});

		this.state.fadeOutOpacity.addListener((state) => {
			console.log("fadeOutOpacity=>" + state.value);
		});
	}

  render() {
      return (
        <View style={styles.container} >
          <StatusBar barStyle='default' />
          <Text style={[styles.textView, {fontSize: 15, textAlign: 'center'}]}>spring/timing/decay演示</Text>
          <Animated.View                         // 可选的基本组件类型: Image, Text, View(可以包裹任意子View)
              style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [  // scale, scaleX, scaleY, translateX, translateY, rotate, rotateX, rotateY, rotateZ
                      {scale: this.state.bounceValue},  // 缩放
                      {rotate: this.state.rotateValue.interpolate({ // 旋转，使用插值函数做值映射
                              inputRange: [0, 1],
                              outputRange: ['0deg', '360deg'],
                          })
                      },
                      {translateX: this.state.translateValue.x}, // x轴移动
                      {translateY: this.state.translateValue.y}, // y轴移动
                    ],
                    opacity: this.state.fadeOutOpacity, // 透明度
                  }}>
                <Image
                  source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
                style={{width: 300, height: 300}}
                />
            </Animated.View>
        </View>
      );
  }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: Platform.OS === 'ios' ? 64 : 76,
        flexDirection:'column',
        justifyContent: 'center',
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
//   key: 'AnimEffectsDemo',
//   component: AnimEffectsDemo,
//   title: '动画类型－三种特效',
// };

// module.exports = {
//   route: route,
// }
