import NavigationBar from "miot/ui/NavigationBar";
import Separator from 'miot/ui/Separator';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { RkButton } from "react-native-ui-kitten";

export default class NavigationBarDemo extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { titleProps } = navigation.state.params || {};
    if (!titleProps) return { header: null }
    return {
      header: <NavigationBar {...titleProps} />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      transparent: false,
      backgroundColor: '#fff',
      showDot: true,
      index: 0,
    }
  }

  testList = [
    {
      title: '常用导航栏',
      onPress: _ => this.setNavigation(),
      text: '白底黑字，左返回'
    },
    {
      title: '基本导航栏',
      onPress: _ => this.setNavigation1(),
      text: '白底黑字/左返回/标题/右更多/显示小红点'
    },
    {
      title: '测试1',
      onPress: _ => this.setNavigation2(),
      text: '标题超长/副标题超长/左右按钮数量不一致'
    },
    {
      title: '测试2',
      onPress: _ => this.setNavigation3(),
      text: '标题超长/副标题超长/左右各两按钮/禁用收藏按钮'
    },
    {
      title: '测试3',
      onPress: _ => this.setNavigation4(),
      text: '自定义浅色背景'
    },
    {
      title: '测试4',
      onPress: _ => this.setNavigation5(),
      text: '黑底白字'
    },
    {
      title: '测试5',
      onPress: _ => this.setNavigation6(),
      text: '自定义深色背景'
    },
    {
      title: '测试6',
      onPress: _ => this.setNavigation7(),
      text: '全屏背景/透明导航栏'
    },
    {
      title: '边界测试',
      onPress: _ => this.setNavigation8(),
      text: '存在无效的图标key/多个图标/无其余参数'
    },
    {
      title: '隐藏/显示\n小红点',
      onPress: _ => this.toggleDot(),
      text: '点击隐藏/显示小红点'
    },
  ];

  componentWillMount() {
    this.setNavigation();
  }

  /**
   * 常用导航栏
   * 白底黑字，左返回
   */
  setNavigation() {
    this.props.navigation.setParams({
      titleProps: {
        left: [
          {
            key: NavigationBar.ICON.BACK,
            onPress: _ => this.props.navigation.goBack()
          }
        ],
        title: '常用导航栏',
      }
    });
    this.setState({
      index: 0,
      backgroundColor: '#fff',
      transparent: false,
    });
  }

  /**
   * test case:
   * 白底黑字/左返回/标题/右更多/显示小红点
   */
  setNavigation1() {
    this.props.navigation.setParams({
      titleProps: {
        left: [
          {
            key: NavigationBar.ICON.BACK,
            onPress: _ => this.props.navigation.goBack()
          }
        ],
        right: [
          {
            key: NavigationBar.ICON.MORE,
            showDot: this.state.showDot,
            onPress: _ => console.log('onPress')
          }
        ],
        title: '基本导航栏',
      }
    });
    this.setState({
      index: 1,
      backgroundColor: '#fff',
      transparent: false,
    });
  }

  /**
   * test case:
   * 标题超长/副标题超长/左右按钮数量不一致
   */
  setNavigation2() {
    this.props.navigation.setParams({
      titleProps: {
        left: [
          {
            key: NavigationBar.ICON.BACK,
            onPress: _ => this.props.navigation.goBack()
          }
        ],
        right: [
          {
            key: NavigationBar.ICON.COLLECT,
            onPress: _ => console.log('onPress')
          },
          {
            key: NavigationBar.ICON.MORE,
            showDot: this.state.showDot,
            onPress: _ => console.log('onPress')
          }
        ],
        title: '标题超长/副标题超长/左右按钮数量不一致/标题超长/副标题超长/左右按钮数量不一致',
        subtitle: '标题超长/副标题超长/左右按钮数量不一致/标题超长/副标题超长/左右按钮数量不一致',
        onPressTitle: _ => console.log('onPressTitle'),
      }
    });
    this.setState({
      index: 2,
      backgroundColor: '#fff',
      transparent: false,
    });
  }

  /**
   * test case:
   * 标题超长/副标题超长/左右各两按钮/禁用收藏按钮
   */
  setNavigation3() {
    this.props.navigation.setParams({
      titleProps: {
        left: [
          {
            key: NavigationBar.ICON.BACK,
            onPress: _ => this.props.navigation.goBack()
          },
          {
            key: NavigationBar.ICON.CLOSE,
            onPress: _ => console.log('onPress')
          }
        ],
        right: [
          {
            key: NavigationBar.ICON.COLLECT,
            disable: true,
            onPress: _ => console.log('onPress')
          },
          {
            key: NavigationBar.ICON.MORE,
            showDot: this.state.showDot,
            onPress: _ => console.log('onPress')
          }
        ],
        title: '标题超长/副标题超长/左右各两按钮标题超长/副标题超长/左右各两按钮',
        subtitle: '标题超长/副标题超长/左右各两按钮标题超长/副标题超长/左右各两按钮',
        onPressTitle: _ => console.log('onPressTitle'),
      }
    });
    this.setState({
      index: 3,
      backgroundColor: '#fff',
      transparent: false,
    });
  }

  /**
   * test case:
   * 自定义浅色背景
   */
  setNavigation4() {
    this.props.navigation.setParams({
      titleProps: {
        backgroundColor: 'lightblue',
        left: [
          {
            key: NavigationBar.ICON.BACK,
            onPress: _ => this.props.navigation.goBack()
          },
          {
            key: NavigationBar.ICON.CLOSE,
            onPress: _ => console.log('onPress')
          }
        ],
        right: [
          {
            key: NavigationBar.ICON.COLLECT,
            onPress: _ => console.log('onPress')
          },
          {
            key: NavigationBar.ICON.MORE,
            showDot: this.state.showDot,
            onPress: _ => console.log('onPress')
          }
        ],
        title: '标题超长/副标题超长/左右各两按钮标题超长/副标题超长/左右各两按钮',
        subtitle: '标题超长/副标题超长/左右各两按钮标题超长/副标题超长/左右各两按钮',
        onPressTitle: _ => console.log('onPressTitle'),
      }
    });
    this.setState({
      index: 4,
      backgroundColor: '#fff',
      transparent: false,
    });
  }

  /**
    * test case:
    * 黑底白字
    */
  setNavigation5() {
    this.props.navigation.setParams({
      titleProps: {
        type: NavigationBar.TYPE.DARK,
        left: [
          {
            key: NavigationBar.ICON.BACK,
            onPress: _ => this.props.navigation.goBack()
          },
          {
            key: NavigationBar.ICON.CLOSE,
            onPress: _ => console.log('onPress')
          }
        ],
        right: [
          {
            key: NavigationBar.ICON.COLLECT,
            onPress: _ => console.log('onPress')
          },
          {
            key: NavigationBar.ICON.MORE,
            showDot: this.state.showDot,
            onPress: _ => console.log('onPress')
          }
        ],
        title: '标题超长/副标题超长/左右各两按钮标题超长/副标题超长/左右各两按钮',
        subtitle: '标题超长/副标题超长/左右各两按钮标题超长/副标题超长/左右各两按钮',
        onPressTitle: _ => console.log('onPressTitle'),
      }
    });
    this.setState({
      index: 5,
      backgroundColor: '#fff',
      transparent: false,
    });
  }

  /**
  * test case:
  * 自定义深色背景
  */
  setNavigation6() {
    this.props.navigation.setParams({
      titleProps: {
        type: NavigationBar.TYPE.DARK,
        backgroundColor: 'blue',
        left: [
          {
            key: NavigationBar.ICON.BACK,
            onPress: _ => this.props.navigation.goBack()
          },
          {
            key: NavigationBar.ICON.CLOSE,
            onPress: _ => console.log('onPress')
          }
        ],
        right: [
          {
            key: NavigationBar.ICON.COLLECT,
            onPress: _ => console.log('onPress')
          },
          {
            key: NavigationBar.ICON.MORE,
            showDot: this.state.showDot,
            onPress: _ => console.log('onPress')
          }
        ],
        title: '标题超长/副标题超长/左右各两按钮标题超长/副标题超长/左右各两按钮',
        subtitle: '标题超长/副标题超长/左右各两按钮标题超长/副标题超长/左右各两按钮',
        onPressTitle: _ => console.log('onPressTitle'),
      }
    });
    this.setState({
      index: 6,
      backgroundColor: '#fff',
      transparent: false,
    });
  }

  /**
  * test case:
  * 全屏背景/透明导航栏
  */
  setNavigation7() {
    this.props.navigation.setParams({ titleProps: undefined });
    this.setState({
      index: 7,
      backgroundColor: '#f0ac3d',
      transparent: true,
    });
  }

  /**
  * test case:
  * 存在无效的图标key/多个图标/无其余参数
  */
  setNavigation8() {
    this.props.navigation.setParams({
      titleProps: {
        left: [
          {
          },
          {
            key: ''
          },
          {
            key: 'sdasds'
          },
          {
            key: null
          },
          {
            key: undefined
          },
          {
            key: {}
          },
          {
            key: []
          },
          {
            key: NavigationBar.ICON.BACK,
            onPress: _ => this.props.navigation.goBack()
          }
        ],
        right: [
          {
          },
          {
            key: ''
          },
          {
            key: 'sdasds'
          },
          {
            key: null
          },
          {
            key: undefined
          },
          {
            key: {}
          },
          {
            key: []
          },
          {
            key: NavigationBar.ICON.MORE,
            showDot: this.state.showDot,
            onPress: _ => console.log('onPress')
          }
        ]
      }
    });
    this.setState({
      index: 8,
      backgroundColor: '#fff',
      transparent: false,
    });
  }

  toggleDot() {
    this.state.showDot = !this.state.showDot;
    this.testList[this.state.index].onPress();
  }

  renderCustomNavigation() {
    if (!this.state.transparent) return null;
    return (
      <NavigationBar
        backgroundColor='transparent'
        // type={NavigationBar.TYPE.DARK}
        left={[
          {
            key: NavigationBar.ICON.BACK,
            onPress: _ => this.props.navigation.goBack()
          },
          {
            key: NavigationBar.ICON.CLOSE,
            onPress: _ => console.log('onPress')
          }
        ]}
        right={[
          {
            key: NavigationBar.ICON.COLLECT,
            onPress: _ => console.log('onPress')
          },
          {
            key: NavigationBar.ICON.MORE,
            showDot: this.state.showDot,
            onPress: _ => console.log('onPress')
          }
        ]}
        title='标题超长/副标题超长/左右各两按钮标题超长/副标题超长/左右各两按钮'
        subtitle='标题超长/副标题超长/左右各两按钮标题超长/副标题超长/左右各两按钮'
        onPressTitle={_ => console.log('onPressTitle')}
      />
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: this.state.backgroundColor, flex: 1 }}>
        {this.renderCustomNavigation()}
        <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {
            this.testList.map(test => {
              return (
                <View
                  key={test.title}
                  style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15, paddingHorizontal: 15 }}
                >
                  <RkButton
                    style={{ width: 110, height: 50 }}
                    onPress={test.onPress}
                  >
                    {test.title || ''}
                  </RkButton>
                  <Text style={{ flex: 1, marginHorizontal: 10 }}>
                    {test.text || ''}
                  </Text>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
}
