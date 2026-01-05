import React, { Component } from 'react';
import { ScrollView, View, Text, Alert, Image } from 'react-native';
import { PopButton } from "miot/ui/hyperOSUI/index";
import NavigationBar from "miot/ui/NavigationBar";
import { colorToken, JestComponent } from "miot/ui/hyperOSUI";
import { dynamicStyleSheet } from "miot/ui";

const alert = Alert.alert;

const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '按钮' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'size', type: 'enum', enumOptions: ['small', 'medium', 'large', 'mini'], defaultValue: 'medium' },
  { name: 'type', type: 'enum', enumOptions: ['normal', 'primary', 'warning', 'light'], defaultValue: 'normal' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'purple', 'orange', 'yellow', 'red', 'wathet', 'white'],
    defaultValue: 'green'
  },
  { name: 'onPress', type: 'pass', passDescription: '点击事件回调', defaultValue: () => alert('点击事件回调') },
  { name: 'onLongPress', type: 'pass', passDescription: '长按事件回调', defaultValue: () => alert('长按事件回调') },
  { name: 'allowFontScaling', type: 'boolean', defaultValue: true },
  { name: 'icon', type: 'pass', passDescription: '图标组件', defaultValue: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} /> },
  { name: 'titleColor', type: 'string' }
];

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
        <Text style={styles.header}>PopButton - 按钮组件</Text>
        <JestComponent component={PopButton} propConfigs={propConfigs} />
      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_1,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  }
});

export default ButtonCustomDemo;
