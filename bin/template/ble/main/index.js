import React from 'react';
import { Package, Entrance, Service, Device, Host, PackageEvent } from 'miot';
import { createStackNavigator } from 'react-navigation';
import { FirmwareUpgrade, MoreSetting } from 'miot/ui/CommonSetting';

import MainPage from './MainPage';
import SettingPage from './setting/SettingPage';
import ScenePage from './scene/ScenePage';
import NavigationBar from 'miot/ui/NavigationBar';
import Protocol from '../resources/protocol';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.initData();
  }

  /**
   * 此处决定，进入插件需要进入到哪个页面
   */
  initData() {
    this.initPage = 'MainPage';
    switch (Package.entrance) {
      case Entrance.Main:
        this.initPage = 'MainPage';
        break;
      case Entrance.Scene:
        this.initPage = 'ScenePage';
        break;
      default:
        this.initPage = 'MainPage';
        break;
    }
  }

  UNSAFE_componentWillMount() {
    /**
     * 检测是否需要弹出隐私弹窗
     * 如果您的插件决定使用开发者平台上进行配置隐私协议，则无需调用此API，删除如下一行代码即可
     * 具体文档可以查看：
     * https://iot.mi.com/new/doc/extension-development/basic-functions/law-info
     */
    this.checkToAlertLegalInformationAuthorization();
  }

  render() {
    let RootStack = createRootStack(this.initPage);
    return <RootStack />;
  }

  /**
   * 检查是否需要弹出隐私协议弹出
   */
  checkToAlertLegalInformationAuthorization() {
    Service.smarthome.batchGetDeviceDatas([{ did: Device.deviceID, props: ["prop.s_auth_config"] }]).then((res) => {
      let alreadyAuthed = true;
      let result = res[Device.deviceID];
      let config;
      if (result && result['prop.s_auth_config']) {
        config = result['prop.s_auth_config'];
      }
      if (config) {
        try {
          let authJson = JSON.parse(config);
          alreadyAuthed = authJson.privacyAuthed && true;
        } catch (err) {
          // json解析失败，不处理
        }
      } else {
        alreadyAuthed = false;
      }
      if (alreadyAuthed) {
        return;
      }
      // 需要弹出隐私弹出
      this.alertLegalInformationAuthorization();

    }).catch((error) => {
      Service.smarthome.reportLog(Device.model, `Service.smarthome.batchGetDeviceDatas error: ${ JSON.stringify(error) }`);
    });
  }

  /**
   * 弹出隐私弹窗
   */
  alertLegalInformationAuthorization() {

    Protocol.getProtocol().then((protocol) => {
      Host.ui.alertLegalInformationAuthorization(protocol).then((res) => {
        if (res === 'ok' || res === true || res === 'true') {
          Service.smarthome.batchSetDeviceDatas([{ did: Device.deviceID, props: { "prop.s_auth_config": JSON.stringify({ 'privacyAuthed': true }) } }]);
          PackageEvent.packageAuthorizationAgreed.emit();
        }
      }).catch((error) => {
        // 打开弹出过程中出现了意外错误, 进行上报
        Service.smarthome.reportLog(Device.model, `Host.ui.alertLegalInformationAuthorization error: ${ JSON.stringify(error) }`);
      });
    }).catch((error) => {
      Service.smarthome.reportLog(Device.model, `Service.getServerName() error: ${ JSON.stringify(error) }`);
    });

  }
}

function createRootStack(initPage) {
  return createStackNavigator(
    {
      MainPage: MainPage,
      SettingPage: SettingPage,
      ScenePage: ScenePage,
      FirmwareUpgrade: FirmwareUpgrade,
      MoreSetting: MoreSetting
    },
    {
      initialRouteName: initPage,
      navigationOptions: ({ navigation }) => {

        let { titleProps, title } = navigation.state.params || {};
        // 如果 titleProps和title 都为空， 则不显示页面header部分
        if (!titleProps && !title) return { header: null };

        // 如果titleProps为空， 则title肯定不为空， 初始化titleProps并赋值title
        if (!titleProps) {
          titleProps = {
            title: title
          };
        }

        if (!titleProps.left) {
          titleProps.left = [
            {
              key: NavigationBar.ICON.BACK,
              onPress: () => {
                navigation.goBack();
              }
            }
          ];
        }
        return {
          header: <NavigationBar {...titleProps} />
        };
      },
      // 控制页面切换的动画
      transitionConfig: () => ({
        screenInterpolator: interpolator
      })
    }
  );
}

function interpolator(props) {
  const { layout, position, scene } = props;

  if (!layout.isMeasured) {
    return (props) => {
      const { navigation, scene } = props;

      const focused = navigation.state.index === scene.index;
      const opacity = focused ? 1 : 0;
      // If not focused, move the scene far away.
      const translate = focused ? 0 : 1000000;
      return {
        opacity,
        transform: [{ translateX: translate }, { translateY: translate }]
      };
    };
  }
  const interpolate = (props) => {
    const { scene, scenes } = props;
    const index = scene.index;
    const lastSceneIndexInScenes = scenes.length - 1;
    const isBack = !scenes[lastSceneIndexInScenes].isActive;

    if (isBack) {
      const currentSceneIndexInScenes = scenes.findIndex((item) => item === scene);
      const targetSceneIndexInScenes = scenes.findIndex((item) => item.isActive);
      const targetSceneIndex = scenes[targetSceneIndexInScenes].index;
      const lastSceneIndex = scenes[lastSceneIndexInScenes].index;

      if (
        index !== targetSceneIndex &&
        currentSceneIndexInScenes === lastSceneIndexInScenes
      ) {
        return {
          first: Math.min(targetSceneIndex, index - 1),
          last: index + 1
        };
      } else if (
        index === targetSceneIndex &&
        currentSceneIndexInScenes === targetSceneIndexInScenes
      ) {
        return {
          first: index - 1,
          last: Math.max(lastSceneIndex, index + 1)
        };
      } else if (
        index === targetSceneIndex ||
        currentSceneIndexInScenes > targetSceneIndexInScenes
      ) {
        return null;
      } else {
        return { first: index - 1, last: index + 1 };
      }
    } else {
      return { first: index - 1, last: index + 1 };
    }
  };

  if (!interpolate) return { opacity: 0 };
  const p = interpolate(props);
  if (!p) return;
  const { first, last } = p;
  const index = scene.index;
  const opacity = position.interpolate({
    inputRange: [first, first + 0.01, index, last - 0.01, last],
    outputRange: [0, 1, 1, 0.85, 0]
  });

  const width = layout.initWidth;
  const translateX = position.interpolate({
    inputRange: [first, index, last],
    // outputRange: false ? [-width, 0, width * 0.3] : [width, 0, width * -0.3]
    outputRange: [width, 0, width * -0.3]
  });
  const translateY = 0;

  return {
    opacity,
    transform: [{ translateX }, { translateY }]
  };
}

