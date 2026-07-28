import native, { buildEvents, getSystemLanguage, isAndroid, isIOS, PackageExitAction, Properties } from '../native';
export const PackageEvent = {
  /**
    * 插件将要加载
    * @event
    */
  packageWillLoad: { local: true },
  /**
    * 插件加载完成事件
    * @event
    */
  packageDidLoaded: { local: true },
  /**
    * 插件将暂时退出前台事件
    * @event
    */
  packageWillPause: { always: true },
  /**
    * 插件将重回前台事件
    * @event
    */
  packageDidResume: { always: true },
  /**
    * SDK弹出的隐私同意时的回调
    * @event
    * @since 10037
    */
  packageAuthorizationAgreed: { always: true },
  /**
    * 用户撤销隐私授权时的回调
    * @event
    * @param autoExit
    */
  packageAuthorizationCancel: {
  },
  /**
    * 插件接收到场景等通知消息
    * @event
    */
  packageReceivedInformation: { always: true, sameas: isIOS ? 'kMHPluginReceivingForegroundPushEvent' : undefined },
  /**
    * 插件将退出事件
    * @event
    */
  packageWillExit: { always: true },
  /**
    * 从 Native 界面返回到插件,可以通过监听此事件更新已加载过的视图，或进行相应的事件处理。
    * @event
    */
  packageViewWillAppear: { always: true, sameas: isIOS ? 'viewWillAppear' : undefined },
  /**
    * 插件收到外部APP跳转带过来的信息
    * @event
    * @since 10053
    */
  packageReceivedOutAppInformation: { always: true },
  /**
    * 从插件页面离开到 Native 界面, iOS Only
    * @since 10038
    * @event
    */
  packageViewWillDisappearIOS: { always: true, sameas: isIOS ? 'packageViewWillDisappearIOS' : undefined },
  /**
    * 插件进入后台(Android only)
    * 在插件内，用户按下home键，米家进入后台会发送该通知
    * @since 10048
    * @event
    */
  packageWillStopAndroid: { always: true, sameas: isIOS ? undefined : 'packageWillStop' }
};