
import TitleBar from "miot/ui/TitleBar";
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

/**
 * iOS: windowHeight === screenHeight
 * android: screenHeight - windowHeight = 底部导航条（非全面屏下虚拟按键）的高度
 */
const { width: windowWidth, height: windowHeight } = Dimensions.get('window'); // 视窗尺寸
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen'); // 屏幕尺寸
const statusBarHeight = getStatusBarHeight(true); // 状态栏高度
const titleBarHeight = 44; // 顶部导航栏的高度，在 `TitleBar` 中有定义 TODO: TitleBar 提供静态方法获取导航栏高度
const backgroundContentHeight = 400; // 背景层的高度
const safeAreaHeight = 0; // 安全区域的高度
const contentInsetBottom = backgroundContentHeight + safeAreaHeight; // ScrollView 内容固定的位置
const scrollViewHeight = windowHeight - statusBarHeight - titleBarHeight; // ScrollView 的高度

/**
 * @author Geeook
 * @name Parallax Android demo
 * @description ScrollView 透明背景，交互方案
 * 注意点
 * 1. scrollViewHeight 的确定
 * 2. scrollView 内容上方垫补透明的区域，高度等于上方视图的高度，即 backgroundContentHeight
 * 3. scrollView 内容高度较小时，底部需要垫补空白，高度等于 scrollViewHeight - 内容实际高度
 */
export default class ParallaxAndroid extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type='dark'
          title='ScrollView 吸附效果demo'
          style={{ backgroundColor: '#fff' }}
          onPressLeft={_ => navigation.goBack()}
        />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollMode: false,
      contentInsetY: contentInsetBottom,
    }
    this.myRef = React.createRef()
  }

  render() {
    // console.warn('windowHeight', windowHeight);
    // console.warn('screenHeight', screenHeight);
    // console.warn('statusBarHeight', statusBarHeight);
    // console.warn('titleBarHeight', titleBarHeight);
    // console.warn('scrollViewHeight', scrollViewHeight);
    return (
      <View style={{ width: windowWidth, height: windowHeight, backgroundColor: '#fff' }}>
        {this.state.scrollMode && this._renderBackground()}
        {/* <View style={{ height: safeAreaHeight, width: windowWidth, backgroundColor: 'red' }} /> */}
        <ScrollView
          // ref="scrollView"
          ref={this.myRef}
          style={styles.foregroundContainer}
          showsVerticalScrollIndicator={false}
          onScroll={e => this._onScroll(e)}
          onScrollEndDrag={() => this._onScrollEndDrag()}
          onScrollBeginDrag={() => this._onScrollBeginDrag()}
        >
          {this._renderForegroundContent()}
        </ScrollView>
        {!this.state.scrollMode && this._renderBackground({ position: 'absolute', top: 0 })}
      </View>
    )
  }

  _renderBackground(props) {
    return (
      <View style={[styles.backgroundContainer, props]}>
        <TouchableHighlight
          underlayColor='#f2f2f2'
          onPress={_ => alert('press background')}
        >
          <View style={styles.backgroundContent}>
            <Text>{props ? '浮在上面' : '沉到下面'}</Text>
          </View>
        </TouchableHighlight>
      </View >
    )
  }

  _renderForegroundContent() {
    const contentHeight = 60 * 6 + 15 * 8; // 计算实际内容的高度
    const bottomBlankHeight = scrollViewHeight - contentHeight > 0 ? scrollViewHeight - contentHeight : 0; // 计算底部垫补空白的高度
    return (
      <View>
        <View style={styles.topBlank}>
          <Text>顶部透明占位</Text>
        </View>
        <View style={styles.foregroundContent}>
          {Array.from({ length: 6 }, (item, index) => index).map(item => {
            return (
              <TouchableHighlight
                key={item}
                underlayColor="#fff"
                onPress={_ => this._onPress(item)}
                style={{ marginBottom: 15 }}
              >
                <View style={styles.foregroundContentCard}>
                  <Text>{item}</Text>
                </View>
              </TouchableHighlight>
            )
          })}
        </View>
        <View style={[styles.bottomBlank, { height: bottomBlankHeight }]} >
          <Text>底部白色背景占位</Text>
        </View>
      </View>
    )
  }

  _onPress(item) {
    alert('press ' + item);
  }

  _onScrollBeginDrag() {
    this.setState({ scrollMode: true });
  }

  /**
   * 综合考虑速度和位移
   */
  _onScroll(e) {
    this.contentOffsetY = e['nativeEvent']['contentOffset']['y'] + e['nativeEvent']['velocity']['y'] * 40;
  }

  _onScrollEndDrag() {
    const { current } = this.myRef || {}
    if (this.contentOffsetY < contentInsetBottom * 0.5) {
      current && current.scrollTo({ x: 0, y: 0, animated: true });
      this.setState({ scrollMode: false });
    }
    else if (this.contentOffsetY < contentInsetBottom) {
      console.log("top");
      current && current.scrollTo({ x: 0, y: contentInsetBottom, animated: true });
    }
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: windowWidth,
    backgroundColor: 'lightpink',
    height: backgroundContentHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundContent: {
    backgroundColor: 'lightblue',
    height: backgroundContentHeight / 2,
    width: windowWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foregroundContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    // backgroundColor: "green",
    height: scrollViewHeight,
  },
  topBlank: {
    height: backgroundContentHeight,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  foregroundContent: {
    width: windowWidth,
    backgroundColor: 'lightblue',
    padding: 15,
  },
  bottomBlank: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  foregroundContentCard: {
    borderRadius: 20,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
})