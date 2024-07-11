import React from 'react';
import { Package, Entrance, Service, Device, Host, PackageEvent, PrivacyEvent, CLOUD_PRIVACY_EVENT_TYPES } from 'miot';
import { createStackNavigator } from 'react-navigation';
import { FirmwareUpgrade, MoreSetting } from 'miot/ui/CommonSetting';

import MainPage from './MainPage';
import SettingPage from './setting/SettingPage';
import ScenePage from './scene/ScenePage';
import NavigationBar from 'miot/ui/NavigationBar';


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
     * 插件上线必须在云端配置在线隐私
     * 具体文档可以查看：
     * https://iot.mi.com/new/doc/extension-development/basic-functions/law-info
     * SDK自身会处理隐私弹窗相关逻辑，开发者可以通过监听弹窗事件来做一些自己的逻辑
     */
    this._cloudPrivacyEvent = PrivacyEvent.cloudPrivacyEvent.addListener((message) => {
      console.log(`收到云端隐私通知数据：${ JSON.stringify(message) }`);
      if (!message) {
        console.log(`收到云端隐私通知数据为空`);
        return;
      }
      switch (message.eventType) {
        // 已经同意过云端隐私弹窗或者点击同意云端隐私弹窗
        case CLOUD_PRIVACY_EVENT_TYPES.AGREED:
          break;
        // 没有同意过云端隐私弹窗,需要弹窗,且弹窗成功
        case CLOUD_PRIVACY_EVENT_TYPES.POP_DIALOG_SUCCESS:
          break;
        // 获取同意状态失败或者弹窗失败
        case CLOUD_PRIVACY_EVENT_TYPES.FAILED:
          break;
        default:
          break;
      }
    });
  }

  componentWillUnmount() {
    this._cloudPrivacyEvent && this._cloudPrivacyEvent.remove();
  }

  render() {
    let RootStack = createRootStack(this.initPage);
    return <RootStack />;
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

