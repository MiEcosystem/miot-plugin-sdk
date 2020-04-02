/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict';
// ART的demo }
import { Entrance, Package } from "miot";
import { FirmwareUpgrade, MoreSetting } from "miot/ui/CommonSetting";
import Setting from "./tutorial/Setting";

import TitleBar from "miot/ui/TitleBar";
import React from 'react';

//设备控制
import RPCControl from './tutorial/RPCControl'; // ui设备控制-RPCControl

// 旧 设置页面T
import MHMapDemo from './ThirdPartDemo/MHMapDemo'; // 旧 设置页面-高德地图

// native 交互服务
import ThirdPartyDemo from './ThirdPartDemo/ThirdPartyDemo';  // 第三方库
import UIDemo from './UIComponent/UIDemo'; // UI入口
import SoftKeyboardAdapterTestDemo from './UIComponent/SoftKeyboardAdapterTestDemo';

// ul
import TitleBarDemo from "./tutorial/TitleBarDemo";  //  ui-导航栏使用
import TabBarDemo from "./tutorial/TabBarDemo";  //  ui-导航栏使用
import List from "./UIComponent/List";  // ui-自定义列表项
import CardPage from "./UIComponent/CardPage"; // ui-自定义列卡片
import IndependentCardDemo from "./UIComponent/IndependentCardDemo"; // ui - 独立卡片
import ModeCardDemo from './UIComponent/ModeCardDemo';  // ui-模式卡片
import RadioExample from "./UIComponent/RadioExample"; // ui-单选框
import CheckboxDemo from "./UIComponent/CheckboxDemo"; // ui-复选框
import GearExample from './UIComponent/GearExample'; // ui-拖拽选择档位组件
import SwitchDemo from "./UIComponent/SwitchDemo"; // ui-开关
import DialogExample from "./UIComponent/DialogExample"; // ui-米家弹窗
import MHDatePickerDemo from "./UIComponent/MHDatePickerDemo"; // ui-时间选择器
import BlankPageEntry from "./UIComponent/BlankPageEntry"; // ui-空白页面示例
import ToastExample from "./UIComponent/ToastExample"; // ui-第三方 toast 组件使用示例
import Parallax from "./UIComponent/Parallax"; // ui-ScrollView 吸附效果 demo
// import RefreshListView from './UIComponent/RefreshListView'; // ui-RefreshListView
import Dynamic from './UIComponent/swiper/Dynamic/';  // ui-swiperDynamic
import LoadMinimal from './UIComponent/swiper/LoadMinimal/'; // ui-swiperLoadMinimal
import Phone from './UIComponent/swiper/Phone/'; // ui-swiperPhone
import Swiper from './UIComponent/swiper/Swiper/'; // ui-swiperSwiper working but no title displayed
import SwiperNumber from './UIComponent/swiper/SwiperNumber/'; // ui-swiperNumber working but no title displayed
import ProgressDemo from './ThirdPartDemo/ProgressDemo';  // ui-ProgressDemo
import DialogTest from './UIComponent/DialogTest'; // ui-DialogTest
import DialogTest2 from './UIComponent/DialogTest2'; // ui-DialogTest2
import DialogTest3 from './UIComponent/DialogTest3'; // ui-DialogTest3
import ImageButtonDemo from './UIComponent/ImageButtonDemo'
import ImageCapInsetDemo from './UIComponent/ImageCapInsetDemo'; // ui-ImageCapInsetDemo working but no title displayed
import NumberSpinnerDemo from "./UIComponent/NumberSpinnerDemo"; // ui-NumberSpinnerDemo
import StringSpinnerDemo from "./UIComponent/StringSpinnerDemo"; // ui-StringSpinnerDemo
import RobotMapDemo from "./UIComponent/RobotMapDemo";
import MiotAndroidScrollViewDemo from './UIComponent/MiotAndroidScrollViewDemo'; // ui-MiotAndroidScrollViewDemo
import AbsoluteTouch from './UIComponent/AbsoluteTouch'; // ui-AbsoluteTouch

// Native 交互
import { createStackNavigator } from 'react-navigation'; //
import HelloDeveloper from '../CommonModules/HelloDeveloper';
import HelloReactART from '../CommonModules/HelloReactART';
import AnimCustomCompDemo from './AnimationComponentDemo/AnimCustomCompDemo'; //自定义动画组
import AnimEffectsDemo from './AnimationComponentDemo/AnimEffectsDemo'; //动画特效
import AnimEventsDemo from './AnimationComponentDemo/AnimEventsDemo'; //动画事件
import AnimFadeInOutDemo from './AnimationComponentDemo/AnimFadeInOutDemo'; //淡入淡出
import AnimTransformDemo from './AnimationComponentDemo/AnimTransformDemo'; //旋转翻转
import AnimTranslationDemo from './AnimationComponentDemo/AnimTranslationDemo'; //平行移动
import FadeSlideDemo from './AnimationComponentDemo/FadeSlideDemo';
import LayoutAnimationDemo from './AnimationComponentDemo/LayoutAnimationDemo'; //其他动画
import ControlDemo from './Device/ControlDemo';
import DeviceControl from "./Device/DeviceControl";
import DeviceDemo from "./Device/DeviceDemo";
/********    Host 部分   ********/
import HostDemo from "./Host";
import HostEventDemo from "./Host/HostEventDemo";
import FileDemo from './Host/FileDemo';
import PhotoDemo from './Host/PhotoDemo';
import HostPropsInfoDemo from './Host/HostPropsInfoDemo';
import FileStorage from './Host/File';
import StorageDemo from './Host/Storage';
import LocaleServer from './Host/Local';
import JSExecutor from './Host/JSExecutor';
import * as Screens from "./uikit/screens";
import MHAudioDemo from './Host/MHAudioDemo';
import VideoDemo from './Host/VideoDemo';
import CryptoDemo from './Host/CryptoDemo';

// 常用功能
import TutorialDemo from './tutorial/TutorialDemo';

// 第三方库
import SQLiteDemo from './ThirdPartDemo/SQLiteDemo';
import OrientationDemo from './Host/OrientationDemo';
import KVStorageDemo from './Host/KVStorageDemo';
import NavigateUIDemo from "./Host/UI";
import PrivacyDemo from "./Host/UI/privacy";
import ImageTest from './issues/imageTest/imageTest';
import SmarthomeDemo from './issues/smarthomeDemo';
import MainPage from './MainPage';
import MoreMenu from './MoreMenu';
import ImagePathDemo from './NewStructureTest';
import { PluginEntrance } from "./PluginEntrance";
// import GLTests from './ThirdPartDemo/openGL/Tests';
// import OpenLibList from './OpenLibList';
/********    Service 部分   ********/
import ServiceDemo from './Service';
import MiotSpecDemo from './Service/MiotSpecDemo';
import MHRoomDemo from "./Service/RoomDemo";
import MHSceneDemo from "./Service/SceneDemo";
import AccountDemo from './Service/AccountDemo';
import KookongDemo from './Service/KookongDemo';
import CallSmartHomeAPIDemo from './Service/smarthome';
import CloudStorageDemo from './Service/CloudStorageDemo';

/********    UI 部分   ********/
import AddressBookDemo from './ThirdPartDemo/AddressBookDemo';
import WebViewBridageDemo from './ThirdPartDemo/WebViewBridageDemo';
import NavigationBarDemo from "./tutorial/NavigationBarDemo";
import BlankDemo from './tutorial/BlankDemo';
import BlankPageDemo from "./UIComponent/BlankPageDemo";
import PackageDemo from "./tutorial/PackageDemo";
// import ReactNativeCameraDemo from './ThirdPartDemo/ReactNativeCameraDemo';
import LinearGradientDemo from './ThirdPartDemo/LinearGradientDemo';
import ReactNativeCameraDemo from './ThirdPartDemo/ReactNativeCameraDemo';
import ReactNativeBlurDemo from './ThirdPartDemo/ReactNativeBlurDemo';
import SVGDemo from './ThirdPartDemo/SVGDemo';
import { GroupExample, HoverExample, PressExample } from './ThirdPartDemo/SVGDemo2';
import LegendsView from './ThirdPartDemo/Victory-Native/views/legends-view';
import AxisView from './ThirdPartDemo/Victory-Native/views/axis-view';
import ContainersView from './ThirdPartDemo/Victory-Native/views/containers-view';
import CreateContainerView from './ThirdPartDemo/Victory-Native/views/create-container-view'; // ios 问题
import ErrorsTooltipsView from './ThirdPartDemo/Victory-Native/views/errors-tooltips-view';
import AreaView from './ThirdPartDemo/Victory-Native/views/area-view';
import RefreshListView from './UIComponent/RefreshListView';
import GLSimple from './ThirdPartDemo/openGL/Simple';  // ios 包有问题
import GLHearts from './ThirdPartDemo/openGL/Hearts';  // ios 包有问题
import GLAnimated from './ThirdPartDemo/openGL/Animated';  // ios 包有问题
import GLParticles from './ThirdPartDemo/openGL/Particles';  // ios 包有问题
import GLOrientation from './ThirdPartDemo/openGL/Orientation';  // ios 包有问题

import LineView from './ThirdPartDemo/Victory-Native/views/line-view';
import PieView from './ThirdPartDemo/Victory-Native/views/pie-view';
import BarView from './ThirdPartDemo/Victory-Native/views/bar-view';
import ScatterView from './ThirdPartDemo/Victory-Native/views/scatter-view';
import BoxPlotView from './ThirdPartDemo/Victory-Native/views/boxplot-view';
import ChartView from './ThirdPartDemo/Victory-Native/views/chart-view';

import ParticleDemo from './ThirdPartDemo/ParticleDemo';
import ImagePickerDemo from './ThirdPartDemo/ImagePickerDemo';

//svg
import ARTSVGDemo from './ThirdPartDemo/ARTComponentDemo/ARTSVGDemo'; //图片：SVG，
import ARTRectDemo from './ThirdPartDemo/ARTComponentDemo/ARTRectDemo'; //矩形：Rect，多边形：Polygon,多边线：Polyline
import ARTCircleDemo from './ThirdPartDemo/ARTComponentDemo/ARTCircleDemo'; //圆形：Circle，
import ARTEllipseDemo from './ThirdPartDemo/ARTComponentDemo/ARTEllipseDemo'; //椭圆：Ellipse
import ARTLineDemo from './ThirdPartDemo/ARTComponentDemo/ARTLineDemo'; //直线：Line,多边线：Polyline
import ARTGroupDemo from './ThirdPartDemo/ARTComponentDemo/ARTGroupDemo'; //分组：Group,
import ARTGradientDemo from './ThirdPartDemo/ARTComponentDemo/ARTGradientDemo'; //LinearGradient：线性渐变,RadialGradient：径向渐变
import ARTPatternDemo from './ThirdPartDemo/ARTComponentDemo/ARTPatternDemo'; //Pattern 图案
import ARTTextDemo from './ThirdPartDemo/ARTComponentDemo/ARTTextDemo'; //文字：Text

// 米家iOS 自定义第三方库<
import CircularSliderDemo from './ThirdPartDemo/CircularSliderDemo';
import AnimatedSVGDemo from './ThirdPartDemo/AnimatedSVGDemo';

import CustomContainer from './uikit/components/CustomContainer';
import MHSetting from './unuse/MHSetting';

function createRootStack(initPage) {
  return createStackNavigator({
    blankDemo: BlankDemo,
    NavigationBarDemo,
    Setting,
    MoreSetting,
    FirmwareUpgrade,
    HostDemo,
    HostEventDemo,
    Home: MainPage,
    tutorialDemo: TutorialDemo,
    accountDemo: AccountDemo,
    DeviceControl,
    ControlDemo,
    RPCControl,
    DeviceDemo,
    moreMenu: MoreMenu,
    helloDeveloper: HelloDeveloper,
    helloReactART: HelloReactART,
    mhMapDemo: MHMapDemo,
    audioDemo: MHAudioDemo,
    videoDemo: VideoDemo,
    imagePathDemo: ImagePathDemo,
    ThirdPartyDemo: ThirdPartyDemo,
    ServiceDemo,
    UIDemo,
    SoftKeyboardAdapterTestDemo: SoftKeyboardAdapterTestDemo,
    TitleBarDemo,
    TabBarDemo,
    List,
    CardPage,
    IndependentCardDemo,
    ModeCardDemo,
    RadioExample,
    CheckboxDemo,
    GearExample,
    SwitchDemo,
    DialogExample,
    MHDatePickerDemo,
    BlankPageEntry,
    ToastExample,
    Parallax,
    NavigateUIDemo,
    PrivacyDemo,
    // RefreshListView,
    // swiper 开始
    swiperDynamic: Dynamic,
    swiperLoadMinimal: LoadMinimal,
    swiperPhone: Phone,
    swiperSwiper: Swiper,
    swiperNumber: SwiperNumber,
    //swiper 结束
    ProgressDemo,
    // 米家iOS 自定义第三方库>
    //dialog
    DialogTest: DialogTest,
    DialogTest2,
    DialogTest3,
    ImageCapInsetDemo,
    ImageButtonDemo,
    NumberSpinnerDemo,
    StringSpinnerDemo,
    RobotMapDemo,
    MiotAndroidScrollViewDemo,
    AbsoluteTouch,
    // 接口服务
    callSmartHomeAPIDemo: CallSmartHomeAPIDemo,
    MHRoomDemo,
    MiotSpecDemo,
    // Native 交互
    HostPropsInfoDemo,
    fileStorage: FileStorage,
    storageDemo: StorageDemo,
    LocaleServer,
    JSExecutor,
    UIKitHome: { screen: Screens.ComponentsScreen },
    // --- 没有验证
    Picker: { screen: Screens.PickerScreen },
    Button: { screen: Screens.ButtonScreen },
    Switch: { screen: Screens.SwitchScreen },
    Choice: { screen: Screens.ChoiceScreen },
    Tab: { screen: Screens.TabScreen },
    Card: { screen: Screens.CardScreen },
    Avatar: { screen: Screens.AvatarScreen },
    Input: { screen: Screens.InputScreen },
    Image: { screen: Screens.ImageScreen },
    Gallery: { screen: Screens.GalleryScreen },
    Settings: { screen: Screens.SettingsScreen },
    ChoiceCustomization: { screen: Screens.ChoiceCustomizationScreen },
    // ---
    // 第三方库 demo 开始
    SQLiteDemo: SQLiteDemo,
    OrientationDemo: OrientationDemo,
    AddressBookDemo: AddressBookDemo,
    WebViewBridageDemo: WebViewBridageDemo,
    // ReactNativeCameraDemo: ReactNativeCameraDemo, // ios包有问题
    LinearGradientDemo: LinearGradientDemo,
    ReactNativeBlurDemo: ReactNativeBlurDemo,
    SVGDemo: SVGDemo,
    PressExample: PressExample,
    HoverExample: HoverExample,
    GroupExample: GroupExample,
    LegendsView: LegendsView,
    AxisView: AxisView,
    ContainersView: ContainersView,
    CreateContainerView: CreateContainerView,
    ErrorsTooltipsView: ErrorsTooltipsView,
    AreaView: AreaView,
    PieView: PieView,
    BarView: BarView,
    ChartView: ChartView,
    LineView: LineView,
    ScatterView: ScatterView,
    BoxPlotView: BoxPlotView,

    GLSimple: GLSimple,  // ios 包有问题
    // // GLAdvancedEffects:GLAdvancedEffects, //  有bug
    GLHearts: GLHearts,  // ios 包有问题
    // GLTests:  GLTests, // 有bug
    GLAnimated: GLAnimated,  // ios 包有问题
    GLParticles: GLParticles,  // ios 包有问题
    GLOrientation: GLOrientation,  // ios 包有问题
    videoDemo: VideoDemo,
    cryptoDemo: CryptoDemo,
    HostPropsInfoDemo: HostPropsInfoDemo,
    ParticleDemo: ParticleDemo,//iOS 特有的,粒子系统
    ImagePickerDemo: ImagePickerDemo,

    // svg
    ARTSVGDemo: ARTSVGDemo,
    ARTRectDemo: ARTRectDemo,
    ARTCircleDemo: ARTCircleDemo,
    ARTEllipseDemo: ARTEllipseDemo,
    ARTLineDemo: ARTLineDemo,
    ARTTextDemo: ARTTextDemo,
    ARTGroupDemo: ARTGroupDemo,
    ARTGradientDemo: ARTGradientDemo,
    ARTPatternDemo: ARTPatternDemo,

    // animation
    AnimFadeInOutDemo: AnimFadeInOutDemo,
    AnimTransformDemo: AnimTransformDemo,
    AnimTranslationDemo: AnimTranslationDemo,
    AnimEffectsDemo: AnimEffectsDemo,
    AnimEventsDemo: AnimEventsDemo,
    LayoutAnimationDemo: LayoutAnimationDemo,
    AnimCustomCompDemo: AnimCustomCompDemo,
    // 第三方库 demo 结束

    // 米家iOS 自定义第三方库<
    CircularSliderDemo: CircularSliderDemo,
    // 米家iOS 自定义第三方库>
    //dialog
    DialogTest: DialogTest,
    DialogTest2,
    DialogTest3,
    ModeCardDemo,
    AnimatedSVGDemo,
    AbsoluteTouch,
    ImageTest,
    SmarthomeDemo,
    Home: MainPage,
    Setting,
    List,
    CardPage,
    IndependentCardDemo,
    MoreSetting,
    FirmwareUpgrade,
    CustomContainer,
    Parallax,
    TitleBarDemo,
    GearExample,
    RadioExample,
    CheckboxDemo,
    ToastExample,
    SwitchDemo,
    MHDatePickerDemo,
    DialogExample,
    NavigationBarDemo,
    HostDemo,
    HostEventDemo: HostEventDemo,
    ServiceDemo,
    MHRoomDemo: MHRoomDemo,
    MHSceneDemo: MHSceneDemo,
    BlankPageEntry,
    BlankPageDemo,
    tutorialDemo: TutorialDemo,
    LocaleServer: LocaleServer,
    blankDemo: BlankDemo,
    DeviceControl: DeviceControl,
    NavigateUIDemo: NavigateUIDemo,
    JSExecutor: JSExecutor,
    DeviceDemo: DeviceDemo,
    PackageDemo: PackageDemo,
    AccountDemo: AccountDemo,
    KookongDemo: KookongDemo,
    CloudStorageDemo: CloudStorageDemo,
    ControlDemo: ControlDemo,
    KVStorageDemo: KVStorageDemo,
    fileStorage: FileStorage,
    FileDemo: FileDemo,
    PhotoDemo: PhotoDemo,
    callSmartHomeAPIDemo: CallSmartHomeAPIDemo,
    MiotSpecDemo: MiotSpecDemo,
    RPCControl: RPCControl,
    PrivacyDemo,
    // BLEConnectionDemo: BLEConnectionDemo,

    UIDemo: UIDemo,
    MiotAndroidScrollViewDemo: MiotAndroidScrollViewDemo,
    SoftKeyboardAdapterTestDemo: SoftKeyboardAdapterTestDemo,
    RefreshListView: RefreshListView,
    NumberSpinnerDemo: NumberSpinnerDemo,
    StringSpinnerDemo: StringSpinnerDemo,
    RobotMapDemo: RobotMapDemo,
    ThirdPartyDemo: ThirdPartyDemo,
    setting: MHSetting,
    moreMenu: MoreMenu,
    // OpenLibList:OpenLibList,
    helloDeveloper: HelloDeveloper,
    helloReactART: HelloReactART,
    mhMapDemo: MHMapDemo,
    audioDemo: MHAudioDemo,
    imagePathDemo: ImagePathDemo,
    //swiper 开始
    swiperDynamic: Dynamic,
    swiperLoadMinimal: LoadMinimal,
    // swiperPhotoView:PhotoView,
    swiperPhone: Phone,
    swiperSwiper: Swiper,
    swiperNumber: SwiperNumber,
    //swiper 结束
    ProgressDemo: ProgressDemo,
    ImageCapInsetDemo: ImageCapInsetDemo,
    ImageButtonDemo,
    UIKitHome: { screen: Screens.ComponentsScreen },
    Picker: { screen: Screens.PickerScreen },
    Button: { screen: Screens.ButtonScreen },
    Switch: { screen: Screens.SwitchScreen },
    Choice: { screen: Screens.ChoiceScreen },
    Tab: { screen: Screens.TabScreen },
    Card: { screen: Screens.CardScreen },
    Avatar: { screen: Screens.AvatarScreen },
    Input: { screen: Screens.InputScreen },
    Image: { screen: Screens.ImageScreen },
    Gallery: { screen: Screens.GalleryScreen },
    Settings: { screen: Screens.SettingsScreen },
    ChoiceCustomization: { screen: Screens.ChoiceCustomizationScreen },

    // 第三方库 demo 开始
    SQLiteDemo: SQLiteDemo,
    OrientationDemo: OrientationDemo,
    AddressBookDemo: AddressBookDemo,
    WebViewBridageDemo: WebViewBridageDemo,
    ReactNativeCameraDemo: ReactNativeCameraDemo,
    LinearGradientDemo: LinearGradientDemo,
    ReactNativeBlurDemo: ReactNativeBlurDemo,
    SVGDemo: SVGDemo,
    PressExample: PressExample,
    HoverExample: HoverExample,
    GroupExample: GroupExample,
    LegendsView: LegendsView,
    AxisView: AxisView,
    ContainersView: ContainersView,
    CreateContainerView: CreateContainerView,
    ErrorsTooltipsView: ErrorsTooltipsView,
    AreaView: AreaView,
    PieView: PieView,
    BarView: BarView,
    ChartView: ChartView,
    LineView: LineView,
    ScatterView: ScatterView,
    BoxPlotView: BoxPlotView,
    GLSimple: GLSimple,
    // GLAdvancedEffects:GLAdvancedEffects, //  有bug
    GLHearts: GLHearts,
    // GLTests:  GLTests, // 有bug
    GLAnimated: GLAnimated,
    GLParticles: GLParticles,
    GLOrientation: GLOrientation,
    videoDemo: VideoDemo,
    HostPropsInfoDemo: HostPropsInfoDemo,
    ParticleDemo: ParticleDemo,//iOS 特有的,粒子系统
    ImagePickerDemo: ImagePickerDemo,

    // svg

    ARTSVGDemo: ARTSVGDemo,
    ARTRectDemo: ARTRectDemo,
    ARTCircleDemo: ARTCircleDemo,
    ARTEllipseDemo: ARTEllipseDemo,
    ARTLineDemo: ARTLineDemo,
    ARTTextDemo: ARTTextDemo,
    ARTGroupDemo: ARTGroupDemo,
    ARTGradientDemo: ARTGradientDemo,
    ARTPatternDemo: ARTPatternDemo,


    // animation
    AnimFadeInOutDemo: AnimFadeInOutDemo,
    AnimTransformDemo: AnimTransformDemo,
    AnimTranslationDemo: AnimTranslationDemo,
    AnimEffectsDemo: AnimEffectsDemo,
    AnimEventsDemo: AnimEventsDemo,
    LayoutAnimationDemo: LayoutAnimationDemo,
    FadeSlideDemo,
    AnimCustomCompDemo: AnimCustomCompDemo,

    // 第三方库 demo 结束

    // 米家iOS 自定义第三方库<
    CircularSliderDemo: CircularSliderDemo,
    // 米家iOS 自定义第三方库>
    //dialog
    DialogTest: DialogTest,
    DialogTest2,
    DialogTest3,
    ModeCardDemo,
    AnimatedSVGDemo,
    AbsoluteTouch,
    ImageTest,
    SmarthomeDemo
  },
    {
      // ThirdPartyDemo
      initialRouteName: initPage,
      // initialRouteName: 'ModeCardDemo',
      navigationOptions: ({ navigation }) => {
        return {
          header: <TitleBar
            title={navigation.state.params ? navigation.state.params.title : ''}
            // style={{ backgroundColor: '#fff' }}
            type='dark'
            onPressLeft={() => {
              navigation.goBack();
            }} />,
        };
      },
      transitionConfig: () => ({
        screenInterpolator: interpolator,
      }),
    });
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
        transform: [{ translateX: translate }, { translateY: translate }],
      };
    };
  }
  const interpolate = (props) => {
    const { scene, scenes } = props;
    const index = scene.index;
    const lastSceneIndexInScenes = scenes.length - 1;
    const isBack = !scenes[lastSceneIndexInScenes].isActive;

    if (isBack) {
      const currentSceneIndexInScenes = scenes.findIndex(item => item === scene);
      const targetSceneIndexInScenes = scenes.findIndex(item => item.isActive);
      const targetSceneIndex = scenes[targetSceneIndexInScenes].index;
      const lastSceneIndex = scenes[lastSceneIndexInScenes].index;

      if (
        index !== targetSceneIndex &&
        currentSceneIndexInScenes === lastSceneIndexInScenes
      ) {
        return {
          first: Math.min(targetSceneIndex, index - 1),
          last: index + 1,
        };
      } else if (
        index === targetSceneIndex &&
        currentSceneIndexInScenes === targetSceneIndexInScenes
      ) {
        return {
          first: index - 1,
          last: Math.max(lastSceneIndex, index + 1),
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
  const { first, last } = p
  const index = scene.index;
  const opacity = position.interpolate({
    inputRange: [first, first + 0.01, index, last - 0.01, last],
    outputRange: [0, 1, 1, 0.85, 0],
  });

  const width = layout.initWidth;
  const translateX = position.interpolate({
    inputRange: [first, index, last],
    outputRange: false ? [-width, 0, width * 0.3] : [width, 0, width * -0.3],
  });
  const translateY = 0;

  return {
    opacity,
    transform: [{ translateX }, { translateY }],
  };
};

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.initData()
  }

  /**
   * 也可以在此判断，需要进入插件哪个页面
   */
  initData() {
    this.initPage = "Home";
    switch (Package.entrance) {
      case Entrance.Scene:
        this.initPage = Entrance.Scene;
        break;
      case PluginEntrance.Setting:
        this.initPage = PluginEntrance.Setting;
        break;
      default:
        this.initPage = "Home";
        break;
    }
    if (Package.pageParams && Package.pageParams.isBackToMainPage) {
      // 需要返回到首页，则首先进入到插件首页，然后插件首页中跳转到真正需要跳转到的page页面
      this.initPage = "Home";
    }
  }

  render() {
    let RootStack = createRootStack(this.initPage);
    return <RootStack />
  }

}
