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

'use strict';
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

export default class AnimTranslationDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      anim: [1,2,3].map(() => new Animated.Value(0)) // 初始化3个值
    }
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation(){
    var timing = Animated.timing;
    Animated.sequence([
        Animated.stagger(200, this.state.anim.map(left => {
            return timing(left, {
                toValue: 1,
                duration: 400,
              });
            }).concat(
                this.state.anim.map(left => {
                    return timing(left, {
                        toValue: 0,
                        duration: 400,
                    });
                })
            )), // 三个view滚到右边再还原，每个动作间隔400ms
            Animated.delay(800), // 延迟800ms，配合sequence使用
            timing(this.state.anim[0], {
                toValue: 1,
                duration: 400,
            }),
            timing(this.state.anim[1], {
                toValue: -1,
                duration: 400,
            }),
            timing(this.state.anim[2], {
                toValue: 0.5,
                duration: 400,
            }),
            Animated.delay(800),
            Animated.parallel(this.state.anim.map((anim) => timing(anim, {
                toValue: 0
            }))), // 同时回到原位置
            Animated.delay(800),
        ]
    ).start(() => this.startAnimation());
  }

  createViews(){
    var views = this.state.anim.map(function(value, i) {
        return (
            <Animated.View
                key={i}
                style={[styles.mainContainer, styles['view' + i], {
                    left: value.interpolate({
                        inputRange: [0,1],
                        outputRange: [0,200]
                    })
                }]}>
                <Text style={[styles.text, styles.textView]}>平移的View{i + 1}😺</Text>
            </Animated.View>
        );
    });

    return views;
  }

  render() {
    return (
      <View style={styles.container}>
         <Text style={[styles.textView, styles.text]}>基于timing的流程控制sequence/delay/stagger/parallel演示</Text>
         {this.createViews()}
     </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 64 : 76,
        flexDirection:'column',
        flex:1,
        alignItems: 'center',
    },
    mainContainer: {
      height: 40,
      width: 120,
      marginTop: 40,
      flexDirection:'column',
      alignItems: 'center',
    },
    view0: {
        backgroundColor: 'red',
    },
    view1: {
        backgroundColor: 'green',
    },
    view2: {
        backgroundColor: 'yellow',
    },
    textView: {
      marginTop: 10,
      flexDirection:'column',
      alignItems: 'center',
    },
    text: {
        fontSize: 15,
        textAlign: 'center'
    }
});

// var route = {
//   key: 'AnimTranslationDemo',
//   component: AnimTranslationDemo,
//   title: '组合动画－平行移动',
// };


