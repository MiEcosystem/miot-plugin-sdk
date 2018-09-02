import React from 'react'
import
 {
   ART,
   Animated,
   Easing, 
   StatusBar, 
   StyleSheet, 
   Platform, 
   View, 
   Text
  } from 'react-native';

import PropTypes from 'prop-types'
const 
{ 
  Surface,
  Shape, 
  Path
 } = ART;

// Shapes
class Circle extends React.Component {


  render() {
    const { radius } = this.props;

    const path = Path()
      .moveTo(0, -radius)
      .arc(0, radius * 2, radius)
      .arc(0, radius * -2, radius)
      .close();

    return <Shape {...this.props} d={path}/>;
  }
}

class Rectangle extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  render() {
    const { width, height } = this.props;

    const path = Path()
      .moveTo(width / -2, height * -1.5)
      .line(0, height)
      .line(width, 0)
      .line(0, height)
      .line(-width, 0)
      .close();

    return <Shape {...this.props} d={path}/>;
  }
}

//Custom Animated Components
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRectangle = Animated.createAnimatedComponent(Rectangle);


//Custom Components
class Pulse extends React.Component {
  static propTypes = {
    size: PropTypes.number
  };

  state = {
    pulse: new Animated.ValueXY({
      x: 0.5,
      y: 1
    })
  };

  static defaultProps = {
    size: 14,
    color: '#000'
  };

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  animate() {
    Animated
      .timing(this.state.pulse, {
        toValue: {
          x: 1,
          y: 0
        },
        duration: 1000
      })
      .start(() => {
        if (!this.unmounted) {
          this.state.pulse.setValue({
            x: 0,
            y: 1
          });
          this.animate();
        }
      });
  }

  render() {
    const { size, color } = this.props;
    const { pulse } = this.state;
    const width = size * 2;
    const height = size * 2;

    return (<Surface
      width={width}
      height={height}>
      <AnimatedCircle
        radius={size}
        fill={color}
        scale={pulse.x}
        opacity={pulse.y}
        x={size}
        y={size}
      />
    </Surface>)
  }
}

class DoubleBounce extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bounces: [
        new Animated.Value(1),
        new Animated.Value(0)
      ]
    }
  }

  static propTypes = {
    size: PropTypes.number
  };

  static defaultProps = {
    size: 14,
    color: '#000000'
  };

  componentDidMount() {
    this.animate(0);
    setTimeout(() => this.animate(1), 1000);
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  animate(index) {
    Animated
      .sequence([
        Animated.timing(this.state.bounces[index], {
          toValue: 1,
          duration: 1000
        }),
        Animated.timing(this.state.bounces[index], {
          toValue: 0,
          duration: 1000
        })
      ])
      .start(() => {
        if (!this.unmounted) {
          this.animate(index);
        }
      });
  }

  render() {
    const { size, color } = this.props;
    const { bounces: [scale1, scale2] } = this.state;
    const width = size * 2;
    const height = size * 2;

    return (
      <Surface width={width} height={height}>
        <AnimatedCircle
          radius={size}
          fill={color}
          scale={scale1}
          opacity={0.6}
          x={size}
          y={size}
        />
        <AnimatedCircle
          radius={size}
          fill={color}
          scale={scale2}
          opacity={0.6}
          x={size}
          y={size}
        />
      </Surface>
    );
  }
}

class Bars extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    spaceBetween: PropTypes.number
  };

  state = {
    bars: [
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size)
    ]
  };

  static defaultProps = {
    spaceBetween: 4,
    size: 20,
    color: '#000'
  };


  componentDidMount() {
    this.state.bars.forEach((val, index) => {
      var timer = setTimeout(() => this.animate(index), index * 240);
      this.timers.push(timer);
    });
  }

  componentWillUnmount() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.unmounted = true;
  }

  timers = [];

  animate(index) {
    Animated
      .sequence([
        Animated.timing(this.state.bars[index], {
          toValue: this.props.size * 2.5,
          duration: 600
        }),
        Animated.timing(this.state.bars[index], {
          toValue: this.props.size,
          duration: 600
        })
      ])
      .start(() => {
        if (!this.unmounted) {
          this.animate(index);
        }
      });
  }

  renderBar(index) {
    const { size, spaceBetween, color } = this.props;
    const width = size / 3;
    const x = width / 2 + (width + spaceBetween) * index;

    return (<AnimatedRectangle
      fill={color}
      width={width}
      height={this.state.bars[index]}
      originY={0.5 * size}
      originX={0.5}
      y={size * 1.5}
      x={x}
    />);
  }

  render() {
    const { size, spaceBetween } = this.props;
    const width = size / 3 * 5 + spaceBetween * 4;
    const height = size * 3;

    return (<Surface
      width={width}
      height={height}>
      {this.renderBar(0)}
      {this.renderBar(1)}
      {this.renderBar(2)}
      {this.renderBar(3)}
      {this.renderBar(4)}
    </Surface>)
  }
}

class Bubbles extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    spaceBetween: PropTypes.number
  };

  state = {
    circles: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0)
    ]
  };

  static defaultProps = {
    spaceBetween: 6,
    size: 11,
    color: '#000'
  };

  componentDidMount() {
    this.state.circles.forEach((val, index) => {
      var timer = setTimeout(() => this.animate(index), index * 300);
      this.timers.push(timer);
    });
  }

  componentWillUnmount() {
    this.timers.forEach((timer) => {
      clearTimeout(timer);
    });

    this.unmounted = true;
  }

  timers = [];

  animate(index) {
    Animated
      .sequence([
        Animated.timing(this.state.circles[index], {
          toValue: 1,
          duration: 600
        }),
        Animated.timing(this.state.circles[index], {
          toValue: 0,
          duration: 600
        })
      ])
      .start(() => {
        if (!this.unmounted) {
          this.animate(index);
        }
      });
  }

  renderBubble(index) {
    const { size, spaceBetween, color } = this.props;
    const scale = this.state.circles[index];
    const offset = {
      x: size + index * (size * 2 + spaceBetween),
      y: size
    };

    return (<AnimatedCircle
      fill={color}
      radius={size}
      scale={scale}
      {...offset}
    />);
  }

  render() {
    const { size, spaceBetween } = this.props;
    const width = size * 6 + spaceBetween * 2;
    const height = size * 2;

    return (<Surface
      width={width}
      height={height}>
      {this.renderBubble(0)}
      {this.renderBubble(1)}
      {this.renderBubble(2)}
    </Surface>)
  }
}

export default class AnimCustomCompDemo extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
      return (
        <View style={styles.container} >
          <StatusBar barStyle='default' />
          <Text style={[styles.textView, {fontSize: 15, textAlign: 'center'}]}>动画: 电子脉冲</Text>
          <Pulse size={40} color='#3f7af1'> </Pulse>
          <Text style={[styles.textView, {fontSize: 15, textAlign: 'center'}]}>动画: 回形波</Text>
          <DoubleBounce size={40} color='#ff0a01'> </DoubleBounce>
          <Text style={[styles.textView, {fontSize: 15, textAlign: 'center'}]}>动画: 条状加载</Text>
          <Bars spaceBetween={4} size={20} color='#3f7af1'> </Bars>
          <Text style={[styles.textView, {fontSize: 15, textAlign: 'center'}]}>动画: 圆形加载</Text>
          <Bubbles spaceBetween={6} size={11} color='#ff7a01'></Bubbles>
        </View>
      );
  }

}

var styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: Platform.OS === 'ios' ? 0 : 0,
        flexDirection:'column',
        alignItems: 'center',
    },
    textView: {
      marginTop: 30,
      marginBottom: 30,
      flexDirection:'column',
      alignItems: 'center',
    },
    text: {
        fontSize: 30,
        textAlign: 'center'
    }
});

// var route = {
//   key: 'AnimCustomCompDemo',
//   component: AnimCustomCompDemo,
//   title: '自定义动画组件',
//   }

// module.exports = {
//   route: route,
// }


// Pulse.propTypes = {
//   radius: PropTypes.number.isRequired,
//   opacity: PropTypes.number
// };