import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { RkButton } from "react-native-ui-kitten";

export default class TitleBarDemo extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { titleProps } = navigation.state.params || {};
    if (!titleProps) return { header: null };
    return {
      header: <TitleBar {...titleProps} />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      showDot: true,
      index: 0
    };
  }

  testList = [
    {
      title: '默认导航栏',
      onPress: () => this.setNavigation(),
      text: '高度55，黑底白字，左返回，右更多'
    },
    {
      title: '导航栏1-1',
      onPress: () => this.setNavigation1(true),
      text: '白底黑字/带分享按钮/标题超长/副标题超长/显示小红点-字体大小随系统改变而改变'
    },
    {
      title: '导航栏1-2',
      onPress: () => this.setNavigation1(false),
      text: '白底黑字/带分享按钮/标题超长/副标题超长/显示小红点-字体大小不随系统改变而改变'
    },
    {
      title: '导航栏2',
      onPress: () => this.setNavigation2(),
      text: '白底黑字/左右文字按钮/标题超长/副标题超长'
    },
    {
      title: '导航栏3',
      onPress: () => this.setNavigation3(),
      text: '浅底白字/带分享按钮/带关闭按钮/标题超长/副标题超长/显示小红点'
    },
    {
      title: '导航栏4',
      onPress: () => this.setNavigation4(),
      text: '浅底黑字/带分享按钮/带关闭按钮/标题超长/副标题超长/显示小红点'
    },
    {
      title: '导航栏5',
      onPress: () => this.setNavigation5(),
      text: '深底白字/带分享按钮/带关闭按钮/标题超长/副标题超长/显示小红点'
    },
    {
      title: '导航栏6',
      onPress: () => this.setNavigation6(),
      text: '深底黑字/带分享按钮/带关闭按钮/标题超长/副标题超长/显示小红点'
    },
    {
      title: '隐藏/显示\n小红点',
      onPress: () => this.toggleDot(),
      text: '点击隐藏/显示小红点'
    }
  ];
  UNSAFE_componentWillMount() {
    this.setNavigation();
  }

  /**
   * 默认导航栏
   * 高度55，黑底白字，左返回，右更多
   */
  setNavigation() {
    this.props.navigation.setParams({
      titleProps: {
        onPressLeft: () => this.props.navigation.goBack(),
        onPressRight: () => console.log('onPressRight'),
        title: '默认导航栏',
        subTitle: '一个正常的副标题',
        onPressTitle: () => console.log('onPressTitle')
      }
    });
    // this.state.index = 0;
    this.setState({
      index: 0
    });
  }

  /**
   * test case:
   * 白底黑字/带分享按钮/标题超长/副标题超长
   */
  setNavigation1(allowFontScaling) {

    let titleStyle, subtitleStyle, style;
    if (!allowFontScaling) {
      titleStyle = {
        fontSize: 24,
        lineHeight: 28
      };
      subtitleStyle = {
        fontSize: 20,
        lineHeight: 24
      };
      style={
        height:60,
      }
    }

    this.props.navigation.setParams({
      titleProps: {
        type: 'dark',
        onPressLeft: (_) => this.props.navigation.goBack(),
        onPressRight: (_) => console.log('onPressRight'),
        onPressRight2: (_) => console.log('onPressRight2'),
        title: '标题标题154545abcdedasadadadsasd',
        subTitle: '副标题副标题154545abcdedasadadadsasd',
        titleStyle: titleStyle,
        subtitleStyle: subtitleStyle,
        onPressTitle: () => console.log('onPressTitle'),
        showDot: this.state.showDot,
        allowFontScaling: allowFontScaling,
        style: style,
      }
    });
    this.setState({
      index: 1
    });
  }

  /**
   * test case:
   * 白底黑字/左右文字按钮/标题超长/副标题超长
   */
  setNavigation2() {
    this.props.navigation.setParams({
      titleProps: {
        type: 'dark',
        leftText: 'Cancel',
        leftTextStyle: { width: 60 },
        onPressLeft: () => this.props.navigation.goBack(),
        rightText: 'Save',
        rightTextStyle: { width: 60 },
        onPressRight: () => console.log('onPressRight'),
        title: '标题标题154545abcdedasadadadsasd',
        subTitle: '副标题副标题154545abcdedasadadadsasd',
        onPressTitle: () => console.log('onPressTitle')
      }
    });
    // this.state.index = 2;
    this.setState({
      index: 2
    });
  }

  /**
   * test case:
   * 浅色白字/带分享按钮/带关闭按钮/标题超长/副标题超长/显示小红点
   */
  setNavigation3() {
    this.props.navigation.setParams({
      titleProps: {
        type: 'light',
        style: { height: 70, backgroundColor: 'skyblue' },
        onPressLeft: () => this.props.navigation.goBack(),
        onPressLeft2: () => console.log('onPressLeft2'),
        onPressRight: () => console.log('onPressRight'),
        onPressRight2: () => console.log('onPressRight2'),
        title: '标题标题154545abcdedasadadadsasd',
        subTitle: '副标题副标题154545abcdedasadadadsasd',
        onPressTitle: () => console.log('onPressTitle'),
        showDot: this.state.showDot,
        leftAccessible: true,
        leftAccessibilityRole: 'button',
        leftAccessibilityLabel: 'left',
        leftAccessibilityHint: 'press left',
        left2Accessible: true,
        left2AccessibilityRole: 'imagebutton',
        left2AccessibilityLabel: 'left2',
        left2AccessibilityHint: 'press left2',
        rightAccessible: true,
        rightAccessibilityRole: 'button',
        rightAccessibilityLabel: 'right',
        rightAccessibilityHint: 'press right',
        right2Accessible: false,
        right2AccessibilityRole: 'button',
        right2AccessibilityLabel: 'right2',
        right2AccessibilityHint: 'press right2'
      }
    });
    // this.state.index = 3;
    this.setState({
      index: 3
    });
  }

  /**
   * test case:
   * 浅色黑字/带分享按钮/带关闭按钮/标题超长/副标题超长/显示小红点
   */
  setNavigation4() {
    this.props.navigation.setParams({
      titleProps: {
        type: 'dark',
        style: { height: 70, backgroundColor: 'skyblue' },
        onPressLeft: () => this.props.navigation.goBack(),
        onPressLeft2: () => console.log('onPressLeft2'),
        onPressRight: () => console.log('onPressRight'),
        onPressRight2: () => console.log('onPressRight2'),
        title: '标题标题154545abcdedasadadadsasd',
        subTitle: '副标题副标题154545abcdedasadadadsasd',
        onPressTitle: () => console.log('onPressTitle'),
        showDot: this.state.showDot
      }
    });
    // this.state.index = 4;
    this.setState({
      index: 4
    });
  }

  /**
   * test case:
   * 深色白字/带分享按钮/带关闭按钮/标题超长/副标题超长/显示小红点
   */
  setNavigation5() {
    this.props.navigation.setParams({
      titleProps: {
        type: 'light',
        style: { height: 70, backgroundColor: '#222' },
        onPressLeft: () => this.props.navigation.goBack(),
        onPressLeft2: () => console.log('onPressLeft2'),
        onPressRight: () => console.log('onPressRight'),
        onPressRight2: () => console.log('onPressRight2'),
        title: '标题标题154545abcdedasadadadsasd',
        subTitle: '副标题副标题154545abcdedasadadadsasd',
        onPressTitle: () => console.log('onPressTitle'),
        showDot: this.state.showDot
      }
    });
    // this.state.index = 5;
    this.setState({
      index: 5
    });
  }

  /**
   * test case:
   * 深色黑字/带分享按钮/带关闭按钮/标题超长/副标题超长/显示小红点
   */
  setNavigation6() {
    this.props.navigation.setParams({
      titleProps: {
        type: 'dark',
        style: { height: 70, backgroundColor: '#222' },
        onPressLeft: () => this.props.navigation.goBack(),
        onPressLeft2: () => console.log('onPressLeft2'),
        onPressRight: () => console.log('onPressRight'),
        onPressRight2: () => console.log('onPressRight2'),
        title: '标题标题154545abcdedasadadadsasd',
        subTitle: '副标题副标题154545abcdedasadadadsasd',
        onPressTitle: () => console.log('onPressTitle'),
        showDot: this.state.showDot
      }
    });
    // this.state.index = 6;
    this.setState({
      index: 6
    });
  }

  toggleDot() {
    // this.state.showDot = !this.state.showDot;
    // this.testList[this.state.index].onPress();
    this.setState((state) => {
      return {
        showDot: !state.showDot
      };
    }, () => {
      this.testList[this.state.index].onPress();
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Separator />
        <ScrollView>
          {
            this.testList.map((test) => {
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
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}
