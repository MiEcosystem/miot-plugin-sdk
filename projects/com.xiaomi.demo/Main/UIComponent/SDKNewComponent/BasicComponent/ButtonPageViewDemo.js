import React from 'react';
import { Alert, View, Dimensions } from 'react-native';
import { Buttons } from 'miot/ui/hyperOSUI';
import { colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';
import Orientation from "react-native-orientation";

class ButtonPageViewDemo extends React.Component {
  constructor(props) {
    super(props);
    const init = Orientation.getInitialOrientation();
    this.state = {
      horizontal: false,          // 布局横竖
      orientation: init,          // 当前设备方向
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._handleOrientationChange);
    this.dimensionsListener = Dimensions.addEventListener('change', this._handleDimensionChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._handleOrientationChange);
    this.dimensionsListener?.remove();
  }

  // 屏幕尺寸变化
  _handleDimensionChange = ({ window }) => {
    const isLandscape = window.width > window.height;
    const newOrientation = isLandscape ? 'LANDSCAPE' : 'PORTRAIT';
    this.setState({
      orientation: newOrientation,
      width: window.width,
      height: window.height,
    });
  };

  // 物理旋转（补充）
  _handleOrientationChange = (orientation) => {
    // 防抖处理
    if (this.rotationTimeout) clearTimeout(this.rotationTimeout);
    this.rotationTimeout = setTimeout(() => {
      this.setState({
        orientation,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
    }, 300);
  };

  // 切换按钮布局横竖
  toggleLayout = () => {
    this.setState(prev => ({ horizontal: !prev.horizontal }));
  };

  // 切换设备屏幕方向
  toggleScreen = () => {
    const { orientation } = this.state;
    if (orientation === "PORTRAIT") {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    // 延迟刷新状态，保证屏幕旋转完成
    setTimeout(() => {
      const { width, height } = Dimensions.get('window');
      const newOrientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
      this.setState({ orientation: newOrientation, width, height });
    }, 300); // 可根据旋转速度调整
  };

  _getOrientation = () => {
    Orientation.getOrientation((err, orientation) => {
      Alert.alert(`Orientation is ${orientation}`);
    });
  };

  renderButtons() {
    const { horizontal, orientation } = this.state;
    if (horizontal) {
      return [
        { title: '切换竖布局', onPress: this.toggleLayout },
        { title: '文字' },
      ];
    }
    return [
      { title: '切换横布局', onPress: this.toggleLayout },
      {
        title: orientation === "PORTRAIT" ? '切换横屏' : '切换竖屏',
        onPress: this.toggleScreen
      },
      { title: '文字' },
    ];
  }

  render() {
    const { horizontal } = this.state;
    const buttons = this.renderButtons();

    return (
      <View style={styles.container}>
        <Buttons
          buttons={buttons}
          horizontal={horizontal} // 如果 Buttons 支持横竖布局
        />
      </View>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colorToken.mj_color_gray_bg_2,
  },
});

export default ButtonPageViewDemo;
