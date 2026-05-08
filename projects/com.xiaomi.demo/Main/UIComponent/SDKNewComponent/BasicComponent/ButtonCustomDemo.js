import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button } from "miot/ui/hyperOSUI/index";
import NavigationBar from "miot/ui/NavigationBar";
import { colorToken, showToast } from "miot/ui/hyperOSUI";
import TestComponent from '../testComponent';
import { dynamicStyleSheet } from "miot/ui";


const propConfigs = [
  { name: 'title', type: 'string', defaultValue: '按钮' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'size', type: 'enum', enumOptions: ['small', 'medium', 'large'], defaultValue: 'medium' },
  { name: 'type', type: 'enum', enumOptions: ['primary', 'primarySubtle', 'warning', 'default', 'ghost'], defaultValue: 'default' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'blue', 'purple', 'orange', 'wathet'],
    defaultValue: 'green',
  },
  { name: 'onPress', type: 'pass', defaultValue: () => showToast('onPress'), passOptions: [{ label: 'onPress', value: () => showToast('onPress') }] },
  { name: 'onLongPress', type: 'pass', defaultValue: () => showToast('onLongPress'), passOptions: [{ label: 'onLongPress', value: () => showToast('onLongPress') }] },
  { name: 'allowFontScaling', type: 'boolean', defaultValue: true },
  { name: 'titleColor', type: 'string' },
];

class ButtonCustomDemo extends Component {
  constructor(props) {
    super(props);
    let multilingual = false;
    let disabled = false;
    this.state = {
      multilingual,
      disabled,
    };
    this.props.navigation.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => {
            this.setState((prev) => ({
              disabled: !prev.disabled,
            }));
          },
        },
      ],
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
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Button
          size="large"
          type="primary"
          title={ this.state.multilingual ? "切换多语言切换多语言切换多语言切换多语言" : "切换多语言" }
          disabled={this.state.disabled}
          onPress={() => {
            this.setState((prev) => ({
              multilingual: !prev.multilingual,
            }));
          }}
        >
        </Button>
        <View style={{ marginTop: 12 }}/>
        <Button
          size="large"
          type="normal"
          title={ this.state.multilingual ? "切换禁用态切换禁用态切换禁用态切换禁用态" : "查看颜色配置" }
          disabled={this.state.disabled}
          onPress={() => {
            !this.state.multilingual ? this.navigateToScreen('ButtonColorDemo') : console.log("点击了按钮2");
          }}
        >
        </Button>
        <View style={ { marginTop: 12 } }/>
        <Button
          size="large"
          type="warning"
          title={ this.state.multilingual ? "文字文字文字文字文字文字文字文字文字" : "文字" }
          disabled={this.state.disabled}
        >
        </Button>
        <View style={ { marginTop: 48 } }/>
        <Button
          size="medium"
          type="primarySubtle"
          colorType="green"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </Button>
        <View style={ { marginTop: 12 } }/>
        <Button
          size="medium"
          type="primary"
          colorType="green"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </Button>
        <View style={ { marginTop: 12 } }/>
        <Button
          size="medium"
          type="warning"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </Button>
        <View style={ { marginTop: 12 } }/>
        <Button
          size="medium"
          type="normal"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </Button>
        <View style={ { marginTop: 12 } }/>
        <Button
          size="medium"
          type="primary"
          colorType="blue"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </Button>
        <View style={ { marginTop: 48 } }/>
        <Button
          size="small"
          type="normal"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </Button>
        <View style={ { marginTop: 12 } }/>
        <Button
          size="small"
          type="primary"
          colorType="green"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </Button>
        <View style={ { marginTop: 48 } }/>
        <Button
          size="small"
          type="default"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </Button>
        <Text style={styles.header}>Button - 按钮组件</Text>
        <TestComponent component={Button} propConfigs={propConfigs} />
      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.surfacePageLow,
    flex: 1,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentPrimaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
});

export default ButtonCustomDemo;
