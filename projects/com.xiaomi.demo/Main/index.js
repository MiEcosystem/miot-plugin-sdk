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

import React from 'react';

import {
  View, Text, AppRegistry, Button,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  Dimensions,
  Animated,
  StyleSheet,
  PixelRatio,
  DeviceEventEmitter,
  Image,
} from 'react-native';

import { createStackNavigator } from 'react-navigation'; //
import MainPage from './MainPage';
import ControlDemo from './ControlDemo';
import CloudDebug from './CloudDebug';
import ThirdPartyDemo from './ThirdPartyDemo';
import MHSetting from './MHSetting';
import VideoDemo from './VideoDemo';
import MHAudioDemo from './MHAudioDemo';
import MoreMenu from './MoreMenu';
import MHMapDemo from './MHMapDemo';
import ImagePathDemo from './NewStructureTest'
import HelloDeveloper from '../CommonModules/HelloDeveloper';
import HelloReactART from '../CommonModules/HelloReactART';
import LineView from './Victory-Native/views/line-view';
import SVGDemo from './SVGDemo';
import PieView from './Victory-Native/views/pie-view';
import BarView from './Victory-Native/views/bar-view';
import ScatterView from './Victory-Native/views/scatter-view';
import ContainersView from './Victory-Native/views/containers-view';
import AxisView from './Victory-Native/views/axis-view';
import AddressBookDemo from './AddressBookDemo';
import CreateContainerView from './Victory-Native/views/create-container-view';
import ErrorsTooltipsView from './Victory-Native/views/errors-tooltips-view';
import ChartView from './Victory-Native/views/chart-view';
import LegendsView from './Victory-Native/views/legends-view';
import WebViewBridageDemo from './WebViewBridageDemo';
import AreaView from './Victory-Native/views/area-view';
import OrientationDemo from './OrientationDemo';
import { GroupExample, HoverExample, PressExample } from './SVGDemo2';
import SQLiteDemo from './SQLiteDemo';
import BoxPlotView from './Victory-Native/views/boxplot-view';
import GLSimple from './gl/Simple';
import GLParticles from './gl/Particles';
import GLAnimated from './gl/Animated';
import GLOrientation from './gl/Orientation';
// import GLAdvancedEffects from './gl/AdvancedEffects';
import GLHearts from './gl/Hearts';
// import GLTests from './gl/Tests';
// import OpenLibList from './OpenLibList';
import ParticleDemo from './ParticleDemo';

// ART的demo  {

import ARTSVGDemo from './ARTComponentDemo/ARTSVGDemo'; //图片：SVG，
import ARTRectDemo from './ARTComponentDemo/ARTRectDemo';//矩形：Rect，多边形：Polygon,多边线：Polyline
import ARTCircleDemo from './ARTComponentDemo/ARTCircleDemo';//圆形：Circle，
import ARTEllipseDemo from './ARTComponentDemo/ARTEllipseDemo';//椭圆：Ellipse
import ARTLineDemo from './ARTComponentDemo/ARTLineDemo';//直线：Line,多边线：Polyline
import ARTTextDemo from './ARTComponentDemo/ARTTextDemo';//文字：Text
import ARTGroupDemo from './ARTComponentDemo/ARTGroupDemo';//分组：Group,
import ARTGradientDemo from './ARTComponentDemo/ARTGradientDemo';//LinearGradient：线性渐变,RadialGradient：径向渐变
import ARTPatternDemo from './ARTComponentDemo/ARTPatternDemo';//Pattern 图案


import AnimFadeInOutDemo from './AnimationComponentDemo/AnimFadeInOutDemo';//淡入淡出
import AnimTransformDemo from './AnimationComponentDemo/AnimTransformDemo';//旋转翻转
import AnimTranslationDemo from './AnimationComponentDemo/AnimTranslationDemo';//平行移动
import AnimEffectsDemo from './AnimationComponentDemo/AnimEffectsDemo';//动画特效
import AnimEventsDemo from './AnimationComponentDemo/AnimEventsDemo';//动画事件
import LayoutAnimationDemo from './AnimationComponentDemo/LayoutAnimationDemo'; //其他动画
import AnimCustomCompDemo from './AnimationComponentDemo/AnimCustomCompDemo'; //自定义动画组
import Dynamic from './swiper/Dynamic/'
import LoadMinimal from './swiper/LoadMinimal/'
import Phone from './swiper/Phone/'
// import PhotoView from './swiper/PhotoView/' // not working
import Swiper from './swiper/Swiper/'  // working but no title displayed
import SwiperNumber from './swiper/SwiperNumber/' // working but no title displayed
import ImageCapInsetDemo from './ImageCapInsetDemo' // working but no title displayed

// ART的demo }

import { TitleBarBlack } from 'miot/ui';
// import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

import CircularSliderDemo from './CircularSliderDemo'
import ImagePickerDemo from './ImagePickerDemo'
import DialogTest from './DialogTest';
import BlankDemo from './tutorial/BlankDemo';
import AccountDemo from './tutorial/account/AccountDemo';
import StorageDemo from './tutorial/storage/StorageDemo';
import TutorialDemo from './tutorial/TutorialDemo';
import LocaleServer from './tutorial/LocaleServer';
import CallSmartHomeAPIDemo from './tutorial/cloud/CallSmartHomeAPIDemo.js';
import OperationDemoIndex from './tutorial/operation/OperationDemoIndex';
// import BLEConnectionDemo from './tutorial/operation/bluetooth/BLEConnectionDemo';
import UIDemo from './UIDemo';
import RefreshListView from './RefreshListView';
import ProgressDemo from './ProgressDemo';
import FileStorage from './tutorial/storage/FileStorage';
import * as Screens from "./uikit/screens";
import DeviceDemo from "./tutorial/device/DeviceDemo";
import PackageDemo from "./tutorial/PackageDemo";

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }
// }

const RootStack = createStackNavigator(
  {
    Home: MainPage,
    tutorialDemo: TutorialDemo,
    LocaleServer: LocaleServer,
    blankDemo: BlankDemo,
    DeviceDemo: DeviceDemo,
    PackageDemo: PackageDemo,
    accountDemo: AccountDemo,
    ControlDemo: ControlDemo,
    CloudDebug: CloudDebug,
    storageDemo: StorageDemo,
    fileStorage: FileStorage,
    callSmartHomeAPIDemo: CallSmartHomeAPIDemo,
    OperationDemoIndex: OperationDemoIndex,
    // BLEConnectionDemo: BLEConnectionDemo,

    UIDemo: UIDemo,
    RefreshListView: RefreshListView,

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
  },
  {
    // ThirdPartyDemo
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => {
      return {
        header: <TitleBarBlack title={navigation.state.params ? navigation.state.params.title : ''} style={{ backgroundColor: '#fff' }}
          onPressLeft={() => {
            navigation.goBack();
          }} />,
      };
    },
    // transitionConfig: () => ({
    //   screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    // }),
  }
);
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }

}
