import ModeCard from 'miot/ui/Card/ModeCard';
import TitleBar from 'miot/ui/TitleBar';
import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const radiusValue = 10;
const { width, height } = Dimensions.get('window');

class ModeCardDemo extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type="dark"
          title="模式卡片"
          style={{ backgroundColor: '#fff' }}
          onPressLeft={() => navigation.goBack()}
        />
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      modes: [
        {
          description: '自动',
          icon: {
            normal: require('../images/auto.jpg'),
            press: require('../images/auto-press.jpg'),
            active: require('../images/auto-active.jpg'),
            activeDisabled: require('../images/auto-activeDisabled.jpg')
          },
          isDisabled: false,
          isActive: true,
          isPressing: false,
          accessibilityHint: '模式切换为自动'
        },
        {
          description: '睡眠',
          icon: {
            normal: require('../images/sleep.jpg'),
            press: require('../images/sleep-press.jpg'),
            active: require('../images/sleep-active.jpg'),
            activeDisabled: require('../images/sleep-activeDisabled.jpg')
          },
          isDisabled: false,
          isActive: false,
          isPressing: false,
          accessibilityHint: '模式切换为睡眠'
        },
        {
          description: '档位档位档位',
          icon: {
            normal: require('../images/gear.jpg'),
            press: require('../images/gear-press.jpg'),
            active: require('../images/gear-active.jpg'),
            activeDisabled: require('../images/gear-activeDisabled.jpg')
          },
          isDisabled: true,
          isActive: false,
          isPressing: false,
          accessibilityHint: '模式切换为档位'
        }
      ],
      modes2: [
        {
          description: '',
          icon: {
            normal: require('../images/auto.jpg'),
            press: require('../images/auto-press.jpg'),
            active: require('../images/auto-active.jpg'),
            activeDisabled: require('../images/auto-activeDisabled.jpg')
          },
          isDisabled: true,
          isActive: false,
          isPressing: false
        },
        {
          description: '',
          icon: {
            normal: require('../images/sleep.jpg'),
            press: require('../images/sleep-press.jpg'),
            active: require('../images/sleep-active.jpg'),
            activeDisabled: require('../images/sleep-activeDisabled.jpg')
          },
          isDisabled: true,
          isActive: false,
          isPressing: false
        },
        {
          description: '',
          icon: {
            normal: require('../images/gear.jpg'),
            press: require('../images/gear-press.jpg'),
            active: require('../images/gear-active.jpg'),
            activeDisabled: require('../images/gear-activeDisabled.jpg')
          },
          isDisabled: true,
          isActive: false,
          isPressing: false
        },
        {
          description: '',
          icon: {
            normal: require('../images/love.jpg'),
            press: require('../images/love-press.jpg'),
            active: require('../images/love-active.jpg'),
            activeDisabled: require('../images/love-activeDisabled.jpg')
          },
          isDisabled: true,
          isActive: true,
          isPressing: false
        }
      ],
      modes3: [
        {
          description: '自动',
          icon: {
            normal: require('../images/auto.jpg'),
            press: require('../images/auto-press.jpg'),
            active: require('../images/auto-active.jpg'),
            activeDisabled: require('../images/auto-activeDisabled.jpg')
          },
          isDisabled: false,
          isActive: false,
          isPressing: false
        },
        {
          description: '睡眠',
          icon: {
            normal: require('../images/sleep.jpg'),
            press: require('../images/sleep-press.jpg'),
            active: require('../images/sleep-active.jpg'),
            activeDisabled: require('../images/sleep-activeDisabled.jpg')
          },
          isDisabled: false,
          isActive: false,
          isPressing: false
        },
        {
          description: '档位档位档位',
          icon: {
            normal: require('../images/gear.jpg'),
            press: require('../images/gear-press.jpg'),
            active: require('../images/gear-active.jpg'),
            activeDisabled: require('../images/gear-activeDisabled.jpg')
          },
          isDisabled: false,
          isActive: true,
          isPressing: false
        }
      ],
      modes4: [
        {
          description: '自动',
          icon: {
            normal: require('../images/auto.jpg'),
            press: require('../images/auto-press.jpg'),
            active: require('../images/auto-active.jpg'),
            activeDisabled: require('../images/auto-activeDisabled.jpg')
          },
          isDisabled: false,
          isActive: false,
          isPressing: false
        },
        {
          description: '',
          icon: {
            normal: require('../images/sleep.jpg'),
            press: require('../images/sleep-press.jpg'),
            active: require('../images/sleep-active.jpg'),
            activeDisabled: require('../images/sleep-activeDisabled.jpg')
          },
          isDisabled: false,
          isActive: true,
          isPressing: false
        },
        {
          description: '',
          icon: {
            normal: require('../images/gear.jpg'),
            press: require('../images/gear-press.jpg'),
            active: require('../images/gear-active.jpg'),
            activeDisabled: require('../images/gear-activeDisabled.jpg')
          },
          isDisabled: false,
          isActive: false,
          isPressing: false
        },
        {
          description: '',
          icon: {
            normal: require('../images/love.jpg'),
            press: require('../images/love-press.jpg'),
            active: require('../images/love-active.jpg'),
            activeDisabled: require('../images/love-activeDisabled.jpg')
          },
          isDisabled: false,
          isActive: false,
          isPressing: false
        },
        {
          description: '',
          icon: {
            normal: require('../images/collect.jpg'),
            press: require('../images/collect-press.jpg'),
            active: require('../images/collect-active.jpg'),
            activeDisabled: require('../images/collect-activeDisabled.jpg')
          },
          isDisabled: false,
          isActive: false,
          isPressing: false
        }
      ]
    };
  }

  // 按下模式
  pressInDemo = (index, key) => {
    console.log(`pressInDemo ${ index } ${ key }`);
    this.setState((state) => {
      let modes = state[key];
      modes[index].isPressing = true;
      return { [key]: modes };
    });
  }

  // 手指抬起模式
  pressOutDemo = (index, key) => {
    console.log(`pressOutDemo ${ index } ${ key }`);
    this.setState((state) => {
      let modes = state[key];
      let theMode = modes[index];

      theMode.isPressing = false;

      if (theMode.isDisabled || theMode.isActive) {
        // 该模式不可点或已高亮
        return;
      } else {
        // 正常模式
        modes.forEach((mode) => {
          mode.isActive = false;
        });

        theMode.isActive = true;
      }

      return { [key]: modes };
    });
  }

  render() {
    let { modes, modes2, modes3, modes4 } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          // style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollInner}>
            <ModeCard
              modes={modes}
              pressIn={this.pressInDemo}
              pressOut={this.pressOutDemo}
              modesKey="modes"
            />
            <ModeCard
              modes={modes3}
              pressIn={this.pressInDemo}
              pressOut={this.pressOutDemo}
              modesKey="modes3"
              descriptionStyle={{
                color: 'blue'
              }}
              activeDescriptionStyle={{
                color: 'red',
                fontWeight: '700'
              }}
              modeCardStyle={{
                marginTop: 20
              }}
              accessibilityHint="切换模式"
            />
            <ModeCard
              modes={modes4}
              pressIn={this.pressInDemo}
              pressOut={this.pressOutDemo}
              modesKey="modes4"
              showShadow={false}
              modeCardStyle={{
                marginTop: 20
              }}
            />
            <View style={styles.cardTop}>
              <Text style={styles.title}>主标题</Text>
              <Text style={styles.subtitle}>副标题</Text>
            </View>
            <ModeCard
              modes={modes2}
              pressIn={this.pressInDemo}
              pressOut={this.pressOutDemo}
              modesKey="modes2"
              radiusType="bottom"
              showShadow={false}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // padding: 10,
  },
  // scrollContainer: {
  //   flex: 1
  // },
  scrollInner: {
    width,
    height,
    alignItems: 'center',
    paddingVertical: 10
  },
  cardTop: {
    paddingTop: 14,
    paddingLeft: 10,
    borderTopLeftRadius: radiusValue,
    borderTopRightRadius: radiusValue,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 20,
    width: width - 2 * 10
  },
  title: {
    fontSize: 14,
    color: '#333',
    paddingRight: 8,
    marginRight: 8,
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#999',
    lineHeight: 14
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 12
  }
});

export default ModeCardDemo;
