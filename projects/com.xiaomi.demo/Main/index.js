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
import { TitleBarBlack } from 'miot/ui';
import { FirmwareUpgrade, MoreSetting } from "miot/ui/CommonSetting";
import React from 'react';
import { createStackNavigator } from 'react-navigation'; //
import HelloDeveloper from '../CommonModules/HelloDeveloper';
import HelloReactART from '../CommonModules/HelloReactART';
import AddressBookDemo from './AddressBookDemo';
import AnimCustomCompDemo from './AnimationComponentDemo/AnimCustomCompDemo'; //自定义动画组
import AnimEffectsDemo from './AnimationComponentDemo/AnimEffectsDemo'; //动画特效
import AnimEventsDemo from './AnimationComponentDemo/AnimEventsDemo'; //动画事件
import AnimFadeInOutDemo from './AnimationComponentDemo/AnimFadeInOutDemo'; //淡入淡出
import AnimTransformDemo from './AnimationComponentDemo/AnimTransformDemo'; //旋转翻转
import AnimTranslationDemo from './AnimationComponentDemo/AnimTranslationDemo'; //平行移动
import LayoutAnimationDemo from './AnimationComponentDemo/LayoutAnimationDemo'; //其他动画
import ARTCircleDemo from './ARTComponentDemo/ARTCircleDemo'; //圆形：Circle，
import ARTEllipseDemo from './ARTComponentDemo/ARTEllipseDemo'; //椭圆：Ellipse
import ARTGradientDemo from './ARTComponentDemo/ARTGradientDemo'; //LinearGradient：线性渐变,RadialGradient：径向渐变
import ARTGroupDemo from './ARTComponentDemo/ARTGroupDemo'; //分组：Group,
import ARTLineDemo from './ARTComponentDemo/ARTLineDemo'; //直线：Line,多边线：Polyline
import ARTPatternDemo from './ARTComponentDemo/ARTPatternDemo'; //Pattern 图案
import ARTRectDemo from './ARTComponentDemo/ARTRectDemo'; //矩形：Rect，多边形：Polygon,多边线：Polyline
// ART的demo  {
import ARTSVGDemo from './ARTComponentDemo/ARTSVGDemo'; //图片：SVG，
import ARTTextDemo from './ARTComponentDemo/ARTTextDemo'; //文字：Text
// import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import CircularSliderDemo from './CircularSliderDemo';
import CloudDebug from './CloudDebug';
import ControlDemo from './ControlDemo';
import DeviceControl from "./Device/DeviceControl";
import DialogTest from './DialogTest';
import GLAnimated from './gl/Animated';
// import GLAdvancedEffects from './gl/AdvancedEffects';
import GLHearts from './gl/Hearts';
import GLOrientation from './gl/Orientation';
import GLParticles from './gl/Particles';
import GLSimple from './gl/Simple';
import ImageCapInsetDemo from './ImageCapInsetDemo'; // working but no title displayed
import ImagePickerDemo from './ImagePickerDemo';
import MainPage from './MainPage';
import MHAudioDemo from './MHAudioDemo';
import MHMapDemo from './MHMapDemo';
import MHSetting from './MHSetting';
import MoreMenu from './MoreMenu';
import ImagePathDemo from './NewStructureTest';
import OrientationDemo from './OrientationDemo';
// import GLTests from './gl/Tests';
// import OpenLibList from './OpenLibList';
import ParticleDemo from './ParticleDemo';
import ProgressDemo from './ProgressDemo';
import RefreshListView from './RefreshListView';
import SQLiteDemo from './SQLiteDemo';
import SVGDemo from './SVGDemo';
import { GroupExample, HoverExample, PressExample } from './SVGDemo2';
import Dynamic from './swiper/Dynamic/';
import LoadMinimal from './swiper/LoadMinimal/';
import Phone from './swiper/Phone/';
// import PhotoView from './swiper/PhotoView/' // not working
import Swiper from './swiper/Swiper/'; // working but no title displayed
import SwiperNumber from './swiper/SwiperNumber/'; // working but no title displayed
import ThirdPartyDemo from './ThirdPartyDemo';
import AccountDemo from './tutorial/account/AccountDemo';
import BlankDemo from './tutorial/BlankDemo';
import CallSmartHomeAPIDemo from './tutorial/cloud/CallSmartHomeAPIDemo.js';
import DeviceDemo from "./tutorial/device/DeviceDemo";
import JSExecutor from './tutorial/JSExecutor';
import List from "./tutorial/List";
import LocaleServer from './tutorial/LocaleServer';
import NavigateUIDemo from "./tutorial/navigation/ui";
import OperationDemoIndex from './tutorial/operation/OperationDemoIndex';
import PackageDemo from "./tutorial/PackageDemo";
import RPCControl from './tutorial/RPCControl';
import Setting from "./tutorial/Setting";
import FileStorage from './tutorial/storage/FileStorage';
import StorageDemo from './tutorial/storage/StorageDemo';
import TutorialDemo from './tutorial/TutorialDemo';
// import BLEConnectionDemo from './tutorial/operation/bluetooth/BLEConnectionDemo';
import UIDemo from './UIDemo';
import * as Screens from "./uikit/screens";
import AreaView from './Victory-Native/views/area-view';
import AxisView from './Victory-Native/views/axis-view';
import BarView from './Victory-Native/views/bar-view';
import BoxPlotView from './Victory-Native/views/boxplot-view';
import ChartView from './Victory-Native/views/chart-view';
import ContainersView from './Victory-Native/views/containers-view';
import CreateContainerView from './Victory-Native/views/create-container-view';
import ErrorsTooltipsView from './Victory-Native/views/errors-tooltips-view';
import LegendsView from './Victory-Native/views/legends-view';
import LineView from './Victory-Native/views/line-view';
import PieView from './Victory-Native/views/pie-view';
import ScatterView from './Victory-Native/views/scatter-view';
import VideoDemo from './VideoDemo';
import WebViewBridageDemo from './WebViewBridageDemo';

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
        Setting,
        List,
        MoreSetting,
        FirmwareUpgrade,
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
        CloudDebug: CloudDebug,
        storageDemo: StorageDemo,
        fileStorage: FileStorage,
        callSmartHomeAPIDemo: CallSmartHomeAPIDemo,
        RPCControl: RPCControl,
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
        transitionConfig: () => ({
            screenInterpolator: interpolator,
        }),
    }
);


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

    const { first, last } = interpolate(props);
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
