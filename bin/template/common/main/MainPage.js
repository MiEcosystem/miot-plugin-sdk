import React from 'react';
import { API_LEVEL, Package, Host, Device, PackageEvent } from 'miot';
import { View, Text, Image, StyleSheet } from 'react-native';
import NavigationBar from 'miot/ui/NavigationBar';
import Separator from 'miot/ui/Separator';

/**
 * SDK 提供的多语言 和 插件提供的多语言
 */
import { strings as SdkStrings, Styles as SdkStyles } from 'miot/resources';
import PluginStrings from '../resources/strings';
/**
 * SDK 支持的字体
 */
import * as SdkFontStyle from 'miot/utils/fonts';

export default class MainPage extends React.Component {

  /**
   * 页面内部自定义Header
   * @param navigation
   * @returns {{header: *}|{header: null}}
   */
  static navigationOptions = ({ navigation }) => {
    const { titleProps } = navigation.state.params || {};
    if (!titleProps) return { header: null };
    return {
      header: <NavigationBar {...titleProps} />
    };
  };

  constructor(props) {
    super(props);

    this.initNavigationBar();
  }

  initNavigationBar() {
    this.props.navigation.setParams({
      titleProps: {
        title: Device.name,
        left: [
          {
            key: NavigationBar.ICON.BACK,
            onPress: () => {
              Package.exit();
            }
          }
        ],
        right: [
          {
            key: NavigationBar.ICON.MORE,
            onPress: () => {
              // 跳转到设置页
              this.props.navigation.navigate('SettingPage', { title: SdkStrings.setting });
            }
          }
        ]
      }
    });
  }

  UNSAFE_componentWillMount() {
    this.packageAuthorizationAgreed = PackageEvent.packageAuthorizationAgreed.addListener(() => {
      // 隐私弹窗-用户点击同意
      console.log('user agree protocol...');
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <Separator/>
        <View style={{ marginTop: 20, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Image
            style={{ width: 350, height: 200 }}
            source={require('../resources/images/welcome.png')} />
        </View>
        <View style={{ padding: 20 }}>
          <Text style={styles.textStyle1}>{PluginStrings.hello}</Text>
          <Text style={styles.textStyle}>当前使用的SDK版本号(API_LEVEL):{API_LEVEL}</Text>
          <Text style={styles.textStyle}>当前米家APP支持的SDK版本号(NATIVE_API_LEVEL):{Host.apiLevel}</Text>
          <Text style={styles.textStyle}>当前插件的版本号(Plugin Version):{Package.version}</Text>
          <Text style={styles.textStyle}>插件包名:{Package.packageName}</Text>
          <Text style={styles.textStyle}>插件支持的设备models:{Package.models}</Text>
        </View>

      </View>
    );
  }

  componentWillUnmount() {
    // 取消监听
    this.packageAuthorizationAgreed && this.packageAuthorizationAgreed.remove();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SdkStyles.common.backgroundColor,
    flex: 1
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 18,
    color: '#666666',
    marginBottom: 10
  },
  textStyle1: {
    fontSize: 20,
    lineHeight: 22,
    color: '#333333',
    fontFamily: SdkFontStyle.FontKmedium,
    marginBottom: 20
  }
});



