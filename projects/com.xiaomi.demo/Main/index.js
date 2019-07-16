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
import { FirmwareUpgrade, MoreSetting } from "miot/ui/CommonSetting";
import TitleBar from "miot/ui/TitleBar";
import React from 'react';
import { createStackNavigator } from 'react-navigation'; //
import HelloDeveloper from '../CommonModules/HelloDeveloper';
import HelloReactART from '../CommonModules/HelloReactART';
import AccountDemo from './Account';
import AnimCustomCompDemo from './AnimationComponentDemo/AnimCustomCompDemo'; //自定义动画组
import AnimEffectsDemo from './AnimationComponentDemo/AnimEffectsDemo'; //动画特效
import AnimEventsDemo from './AnimationComponentDemo/AnimEventsDemo'; //动画事件
import AnimFadeInOutDemo from './AnimationComponentDemo/AnimFadeInOutDemo'; //淡入淡出
import AnimTransformDemo from './AnimationComponentDemo/AnimTransformDemo'; //旋转翻转
import AnimTranslationDemo from './AnimationComponentDemo/AnimTranslationDemo'; //平行移动
import LayoutAnimationDemo from './AnimationComponentDemo/LayoutAnimationDemo'; //其他动画
import ControlDemo from './Device/ControlDemo';
import DeviceControl from "./Device/DeviceControl";
import DeviceDemo from "./Device/DeviceDemo";
import HostDemo from "./Host";
import FileStorage from './Host/File';
import JSExecutor from './Host/JSExecutor';
import LocaleServer from './Host/Local';
import MHAudioDemo from './Host/MHAudioDemo';
import OrientationDemo from './Host/OrientationDemo';
import StorageDemo from './Host/Storage';
import NavigateUIDemo from "./Host/UI";
import PrivacyDemo from "./Host/UI/privacy";
import VideoDemo from './Host/VideoDemo';
import HostPropsInfoDemo from './Host/HostPropsInfoDemo';
import MainPage from './MainPage';
import MoreMenu from './MoreMenu';
import ImagePathDemo from './NewStructureTest';
// import GLTests from './ThirdPartDemo/openGL/Tests';
// import OpenLibList from './OpenLibList';
import ServiceDemo from './Service';
import MHRoomDemo from "./Service/room";
import CallSmartHomeAPIDemo from './Service/smarthome';
import MiotSpecDemo from './Service/MiotSpecDemo';
import AddressBookDemo from './ThirdPartDemo/AddressBookDemo';
import AnimatedSVGDemo from './ThirdPartDemo/AnimatedSVGDemo';
import ARTCircleDemo from './ThirdPartDemo/ARTComponentDemo/ARTCircleDemo'; //圆形：Circle，
import ARTEllipseDemo from './ThirdPartDemo/ARTComponentDemo/ARTEllipseDemo'; //椭圆：Ellipse
import ARTGradientDemo from './ThirdPartDemo/ARTComponentDemo/ARTGradientDemo'; //LinearGradient：线性渐变,RadialGradient：径向渐变
import ARTGroupDemo from './ThirdPartDemo/ARTComponentDemo/ARTGroupDemo'; //分组：Group,
import ARTLineDemo from './ThirdPartDemo/ARTComponentDemo/ARTLineDemo'; //直线：Line,多边线：Polyline
import ARTPatternDemo from './ThirdPartDemo/ARTComponentDemo/ARTPatternDemo'; //Pattern 图案
import ARTRectDemo from './ThirdPartDemo/ARTComponentDemo/ARTRectDemo'; //矩形：Rect，多边形：Polygon,多边线：Polyline
// ART的demo  {
import ARTSVGDemo from './ThirdPartDemo/ARTComponentDemo/ARTSVGDemo'; //图片：SVG，
import ARTTextDemo from './ThirdPartDemo/ARTComponentDemo/ARTTextDemo'; //文字：Text
// import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import CircularSliderDemo from './ThirdPartDemo/CircularSliderDemo';
import ImagePickerDemo from './ThirdPartDemo/ImagePickerDemo';
import MHMapDemo from './ThirdPartDemo/MHMapDemo';
import GLAnimated from './ThirdPartDemo/openGL/Animated';
// import GLAdvancedEffects from './openGL/AdvancedEffects';
import GLHearts from './ThirdPartDemo/openGL/Hearts';
import GLOrientation from './ThirdPartDemo/openGL/Orientation';
import GLParticles from './ThirdPartDemo/openGL/Particles';
import GLSimple from './ThirdPartDemo/openGL/Simple';
import ParticleDemo from './ThirdPartDemo/ParticleDemo';
import ProgressDemo from './ThirdPartDemo/ProgressDemo';
import ReactNativeCameraDemo from './ThirdPartDemo/ReactNativeCameraDemo';
import LinearGradientDemo from './ThirdPartDemo/LinearGradientDemo';
import ReactNativeBlurDemo from './ThirdPartDemo/ReactNativeBlurDemo';
import SQLiteDemo from './ThirdPartDemo/SQLiteDemo';
import SVGDemo from './ThirdPartDemo/SVGDemo';
import { GroupExample, HoverExample, PressExample } from './ThirdPartDemo/SVGDemo2';
import ThirdPartyDemo from './ThirdPartDemo/ThirdPartyDemo';
import AreaView from './ThirdPartDemo/Victory-Native/views/area-view';
import AxisView from './ThirdPartDemo/Victory-Native/views/axis-view';
import BarView from './ThirdPartDemo/Victory-Native/views/bar-view';
import BoxPlotView from './ThirdPartDemo/Victory-Native/views/boxplot-view';
import ChartView from './ThirdPartDemo/Victory-Native/views/chart-view';
import ContainersView from './ThirdPartDemo/Victory-Native/views/containers-view';
import CreateContainerView from './ThirdPartDemo/Victory-Native/views/create-container-view';
import ErrorsTooltipsView from './ThirdPartDemo/Victory-Native/views/errors-tooltips-view';
import LegendsView from './ThirdPartDemo/Victory-Native/views/legends-view';
import LineView from './ThirdPartDemo/Victory-Native/views/line-view';
import PieView from './ThirdPartDemo/Victory-Native/views/pie-view';
import ScatterView from './ThirdPartDemo/Victory-Native/views/scatter-view';
import WebViewBridageDemo from './ThirdPartDemo/WebViewBridageDemo';
import BlankDemo from './tutorial/BlankDemo';
import NavigationBarDemo from "./tutorial/NavigationBarDemo";
import PackageDemo from "./tutorial/PackageDemo";
import RPCControl from './tutorial/RPCControl';
import Setting from "./tutorial/Setting";
import TitleBarDemo from "./tutorial/TitleBarDemo";
import TutorialDemo from './tutorial/TutorialDemo';
import AbsoluteTouch from './UIComponent/AbsoluteTouch';
import CardPage from "./UIComponent/CardPage";
import CheckboxDemo from "./UIComponent/CheckboxDemo";
import DialogExample from "./UIComponent/DialogExample";
import DialogTest from './UIComponent/DialogTest';
import DialogTest2 from './UIComponent/DialogTest2';
import DialogTest3 from './UIComponent/DialogTest3';
import GearExample from './UIComponent/GearExample';
import ImageCapInsetDemo from './UIComponent/ImageCapInsetDemo'; // working but no title displayed
import List from "./UIComponent/List";
import MHDatePickerDemo from "./UIComponent/MHDatePickerDemo";
import MiotAndroidScrollViewDemo from './UIComponent/MiotAndroidScrollViewDemo';
import ModeCardDemo from './UIComponent/ModeCardDemo';
import NumberSpinnerDemo from "./UIComponent/NumberSpinnerDemo";
import Parallax from "./UIComponent/Parallax";
import RadioExample from "./UIComponent/RadioExample";
import RefreshListView from './UIComponent/RefreshListView';
import StringSpinnerDemo from "./UIComponent/StringSpinnerDemo";
import Dynamic from './UIComponent/swiper/Dynamic/';
import LoadMinimal from './UIComponent/swiper/LoadMinimal/';
import Phone from './UIComponent/swiper/Phone/';
import Swiper from './UIComponent/swiper/Swiper/'; // working but no title displayed
import SwiperNumber from './UIComponent/swiper/SwiperNumber/'; // working but no title displayed
import SwitchDemo from "./UIComponent/SwitchDemo";
import ToastExample from "./UIComponent/ToastExample";
// import BLEConnectionDemo from './tutorial/operation/bluetooth/BLEConnectionDemo';
import UIDemo from './UIComponent/UIDemo';
import CustomContainer from './uikit/components/CustomContainer';
import * as Screens from "./uikit/screens";
import MHSetting from './unuse/MHSetting';

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }
// }

const RootStack = createStackNavigator({
    Home: MainPage,
    Setting,
    List,
    CardPage,
    MoreSetting,
    FirmwareUpgrade,
    CustomContainer,
    Parallax,
    TitleBarDemo,
    GearExample,
    RadioExample,
    CheckboxDemo,
    MHRoomDemo,
    ToastExample,
    SwitchDemo,
    MHDatePickerDemo,
    DialogExample,
    NavigationBarDemo,
    HostDemo,
    ServiceDemo,
    tutorialDemo: TutorialDemo,
    LocaleServer: LocaleServer,
    blankDemo: BlankDemo,
    DeviceControl: DeviceControl,
    NavigateUIDemo: NavigateUIDemo,
    JSExecutor: JSExecutor,
    DeviceDemo: DeviceDemo,
    PackageDemo: PackageDemo,
    accountDemo: AccountDemo,
    ControlDemo: ControlDemo,
    storageDemo: StorageDemo,
    fileStorage: FileStorage,
    callSmartHomeAPIDemo: CallSmartHomeAPIDemo,
    MiotSpecDemo: MiotSpecDemo,
    RPCControl: RPCControl,
    PrivacyDemo,
    // BLEConnectionDemo: BLEConnectionDemo,

    UIDemo: UIDemo,
    MiotAndroidScrollViewDemo: MiotAndroidScrollViewDemo,
    RefreshListView: RefreshListView,
    NumberSpinnerDemo: NumberSpinnerDemo,
    StringSpinnerDemo: StringSpinnerDemo,
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
    AbsoluteTouch
},
    {
        // ThirdPartyDemo
        initialRouteName: 'Home',
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
    render() {
        return <RootStack />;
    }

}
