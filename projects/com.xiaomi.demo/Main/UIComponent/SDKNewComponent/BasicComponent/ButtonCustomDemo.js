import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { PopButton } from "miot/ui/hyperOSUI/index";
import theme from "miot/ui/Style/Themes/themeMiHome";
import NavigationBar from "miot/ui/NavigationBar";
import { colorToken } from "mhui-rn/dist/styles/color";
import withDarkModeSupport from "../adaptiveThemeComponent";
import { dynamicStyleSheet } from "miot/ui";

class ButtonCustomDemo extends Component {
  constructor(props) {
    super(props);
    let multilingual = false;
    let disabled = false;
    this.state = {
      multilingual,
      disabled
    };
    this.props.navigation.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => {
            this.setState((prev) => ({
              disabled: !prev.disabled
            }));
          }
        }
      ]
    });
  }
  navigateToScreen(routerName) {
    const { navigation } = this.props;
    if (navigation && routerName) {
      navigation.navigate(routerName, "多色彩");
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <PopButton
          size="large"
          type="primary"
          title={ this.state.multilingual ? "切换多语言切换多语言切换多语言切换多语言" : "切换多语言" }
          disabled={this.state.disabled}
          onPress={() => {
            this.setState((prev) => ({
              multilingual: !prev.multilingual
            }));
          }}
        >
        </PopButton>
        <View style={{ marginTop: 12 }}/>
        <PopButton
          size="large"
          type="normal"
          title={ this.state.multilingual ? "切换禁用态切换禁用态切换禁用态切换禁用态" : "查看颜色配置" }
          disabled={false}
          onPress={() => {
            !this.state.multilingual ? this.navigateToScreen('ButtonColorDemo') : console.log("点击了按钮2");
          }}
        >
        </PopButton>
        <View style={ { marginTop: 12 } }/>
        <PopButton
          size="large"
          type="warning"
          title={ this.state.multilingual ? "文字文字文字文字文字文字文字文字文字" : "文字" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 48 } }/>
        <PopButton
          size="medium"
          type="light"
          colorType="green"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 12 } }/>
        <PopButton
          size="medium"
          type="primary"
          colorType="green"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 12 } }/>
        <PopButton
          size="medium"
          type="warning"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 12 } }/>
        <PopButton
          size="medium"
          type="normal"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 12 } }/>
        <PopButton
          size="medium"
          type="primary"
          colorType="white"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 48 } }/>
        <PopButton
          size="small"
          type="normal"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 12 } }/>
        <PopButton
          size="small"
          type="primary"
          colorType="green"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2
  }
});

export default withDarkModeSupport(ButtonCustomDemo);
