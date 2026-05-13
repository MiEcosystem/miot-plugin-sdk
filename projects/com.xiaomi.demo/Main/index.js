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

"use strict";
// ART的demo }
import { Entrance, Package } from "miot";
import {
  FirmwareUpgrade,
  FirmwareUpgradeAuto,
  FirmwareUpgradeRecord,
  MoreSetting,
  CurtainGroupPage,
} from "miot/ui/CommonSetting";
import BTInterconnection from "miot/ui/BTInterconnection";
import BraceletInterconnection from "miot/ui/BraceletInterconnection";
import Setting from "./tutorial/Setting";
import SettingPage from "./tutorial/SettingPage";
import { DarkMode } from "miot";
import { darkModeDemoPathList } from "./UIComponent/SDKNewComponent/adaptiveThemeComponent";

import React from "react";

// 设备控制
import RPCControl from "./tutorial/RPCControl"; // ui设备控制-RPCControl

// 旧 设置页面T
import MHMapDemo from "./ThirdPartDemo/MHMapDemo"; // 旧 设置页面-高德地图

// native 交互服务
import ThirdPartyDemo from "./ThirdPartDemo/ThirdPartyDemo"; // 第三方库
import UIDemo from "./UIComponent/UIDemo"; // UI入口
import SoftKeyboardAdapterTestDemo from "./UIComponent/SoftKeyboardAdapterTestDemo";

// ul
import TitleBarDemo from "./tutorial/TitleBarDemo"; //  ui-导航栏使用
import TabBarDemo from "./tutorial/TabBarDemo"; //  ui-导航栏使用

import Settings2022 from './UIComponent/Settings2022';
import SupportedFont from './UIComponent/SupportedFont';
import SdkComponentDemo from "./UIComponent/SdkComponentDemo";

// List
import ListDemoEntry from "./UIComponent/List/ListDemoEntry";
import CustomListDemo from "./UIComponent/List/CustomListDemo";
import RefreshListViewDemo from "./UIComponent/List/RefreshListViewDemo";
import AdaptedFontListDemo from "./UIComponent/List/AdaptedFontListDemo";

// 卡片相关
import CardDemoEntry from "./UIComponent/Card/CardDemoEntry"; // ui-Card-入口
import CustomCardDemo from "./UIComponent/Card/CustomCardDemo"; // ui-Card-自定义卡片
import IndependentCardDemo from "./UIComponent/Card/IndependentCardDemo"; // ui-Card-独立卡片
import ModeCardDemo from "./UIComponent/Card/ModeCardDemo"; // ui-Card-模式卡片
import AdaptedFontCardDemo from "./UIComponent/Card/AdaptedFontCardDemo"; // ui-Card-模式卡片
import GearCardDemo from "./UIComponent/Card/GearCardDemo"; // ui-Card-滑动档位卡片
import ListCardDemo from "./UIComponent/Card/ListCardDemo"; // ui-Card-list档位卡片
import CardButtonDemo from "./UIComponent/Card/CardButtonDemo"; // CardButton卡片
import SelectWithButtonDemo from "./UIComponent/Card/SelectWithButtonDemo"; // SelectWithButton卡片
import SliderWithHeaderDemo from "./UIComponent/Card/SliderWithHeaderDemo"; // SliderWithHeader卡片
import SliderWithoutBlockDemo from "./UIComponent/Card/SliderWithoutBlockDemo"; // SliderWithoutBlock卡片

import RadioExample from "./UIComponent/RadioExample"; // ui-单选框
import CheckboxDemo from "./UIComponent/CheckboxDemo"; // ui-复选框
import GearExample from "./UIComponent/GearExample"; // ui-拖拽选择档位组件
import SwitchDemo from "./UIComponent/SDKNewComponent/BasicComponent/SwitchDemo";
import DialogExample from "./UIComponent/DialogExample"; // ui-米家弹窗
import MHDatePickerDemo from "./UIComponent/MHDatePickerDemo"; // ui-时间选择器
import BlankPageEntry from "./UIComponent/BlankPageEntry"; // ui-空白页面示例
import ToastExample from "./UIComponent/ToastExample"; // ui-第三方 toast 组件使用示例
import Parallax from "./UIComponent/Parallax"; // ui-ScrollView 吸附效果 demo
import Dynamic from "./UIComponent/swiper/Dynamic/"; // ui-swiperDynamic
import LoadMinimal from "./UIComponent/swiper/LoadMinimal/"; // ui-swiperLoadMinimal
import Phone from "./UIComponent/swiper/Phone/"; // ui-swiperPhone
import Swiper from "./UIComponent/swiper/Swiper/"; // ui-swiperSwiper working but no title displayed
import SwiperNumber from "./UIComponent/swiper/SwiperNumber/"; // ui-swiperNumber working but no title displayed
import ProgressDemo from "./ThirdPartDemo/ProgressDemo"; // ui-ProgressDemo
import DialogTest from "./UIComponent/DialogTest"; // ui-DialogTest
import DialogTest2 from "./UIComponent/DialogTest2"; // ui-DialogTest2
import DialogTest3 from "./UIComponent/DialogTest3"; // ui-DialogTest3
import ImageButtonDemo from "./UIComponent/ImageButtonDemo";
import ImageCapInsetDemo from "./UIComponent/ImageCapInsetDemo"; // ui-ImageCapInsetDemo working but no title displayed
import NumberSpinnerDemo from "./UIComponent/NumberSpinnerDemo"; // ui-NumberSpinnerDemo
import StringSpinnerDemo from "./UIComponent/StringSpinnerDemo"; // ui-StringSpinnerDemo
import ColorPickerDemo from "./UIComponent/ColorPickerDemo";
import ColorSelectorDemo from "./UIComponent/ColorSelectorDemo";

import MiotAndroidScrollViewDemo from "./UIComponent/MiotAndroidScrollViewDemo"; // ui-MiotAndroidScrollViewDemo
import AbsoluteTouch from "./UIComponent/AbsoluteTouch"; // ui-AbsoluteTouch
import RobotMapDemo from "./UIComponent/RobotMapDemo"; // 扫地机地图
// import SparkLines from "./UIComponent/SparkLines";
import YMDDatePickerDemo from "./UIComponent/YMDDatePicker";
// import Tabs from "./UIComponent/Tabs";

// Native 交互
import { createStackNavigator } from "react-navigation"; //
import HelloDeveloper from "../CommonModules/HelloDeveloper";
import HelloReactART from "../CommonModules/HelloReactART";
import AnimCustomCompDemo from "./AnimationComponentDemo/AnimCustomCompDemo"; // 自定义动画组
import AnimEffectsDemo from "./AnimationComponentDemo/AnimEffectsDemo"; // 动画特效
import AnimEventsDemo from "./AnimationComponentDemo/AnimEventsDemo"; // 动画事件
import AnimFadeInOutDemo from "./AnimationComponentDemo/AnimFadeInOutDemo"; // 淡入淡出
import AnimTransformDemo from "./AnimationComponentDemo/AnimTransformDemo"; // 旋转翻转
import AnimTranslationDemo from "./AnimationComponentDemo/AnimTranslationDemo"; // 平行移动
import FadeSlideDemo from "./AnimationComponentDemo/FadeSlideDemo";
import LayoutAnimationDemo from "./AnimationComponentDemo/LayoutAnimationDemo"; // 其他动画
import ControlDemo from "./Device/ControlDemo";
import DeviceControl from "./Device/DeviceControl";
import DeviceDemo from "./Device/DeviceDemo";
import InterconnectionDemo from "./Device/InterconnectionDemo";
import NewGBControlDemo from "./Device/NewGBControlDemo";
/** ******    Host 部分   ******* */
import HostDemo from "./Host";
import HostEventDemo from "./Host/HostEventDemo";
import FileDemo from "./Host/FileDemo";
import PhotoDemo from "./Host/PhotoDemo";
import PadScrollDemo from "./Host/PadScrollDemo";
import RockerViewDemo from "./Host/RockerViewDemo";
import HostPropsInfoDemo from "./Host/HostPropsInfoDemo";
import LocaleServer from "./Host/Local";
import JSExecutor from "./Host/JSExecutor";
import * as Screens from "./uikit/screens";
import MHAudioDemo from "./Host/MHAudioDemo";
import VideoDemo from "./Host/VideoDemo";
import VideoThumbnailDemo from "./Host/VideoThumbnailDemo";
import CryptoDemo from "./Host/CryptoDemo";
import TraceDemo from "./Host/TraceDemo";
import DarkModeDemo from "./Host/DarkMode";
import DownloadFontDemo from "./Host/DownloadFontDemo"; //  字体下载测试

// 常用功能
import TutorialDemo from "./tutorial/TutorialDemo";
// 新版SDK
import BasicComponentDemo from "./UIComponent/SDKNewComponent/BasicComponent/BasicComponentDemo";
import BasicDemo from "./UIComponent/SDKNewComponent/BasicComponent/BasicDemo";
import FontsDemo from "./UIComponent/SDKNewComponent/BasicComponent/FontsDemo";
import ColorDemo from "./UIComponent/SDKNewComponent/BasicComponent/ColorDemo";
import RadiusDemo from "./UIComponent/SDKNewComponent/BasicComponent/RadiusDemo";
import ActionListItemDemo from "./UIComponent/SDKNewComponent/BasicComponent/ActionListItemDemo";
import SelectListDemo from "./UIComponent/SDKNewComponent/BasicComponent/SelectListDemo";
import SubpageLayoutDemo from "./UIComponent/SDKNewComponent/LayoutComponent/SubpageLayoutDemo";
import PageLayoutDemo from "./UIComponent/SDKNewComponent/LayoutComponent/PageLayoutDemo";
import LayoutDemo from "./UIComponent/SDKNewComponent/LayoutComponent/LayoutDemo";
import NewListCardDemo from "./UIComponent/SDKNewComponent/BasicComponent/ListCardDemo";
import ActionListItemConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/ActionListItemConfigDemo";
import SelectListConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/SelectListConfigDemo";
import ListCardConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/ListCardConfigDemo";
import SubpageLayoutConfigDemo from "./UIComponent/SDKNewComponent/LayoutComponent/SubpageLayoutConfigDemo";
import PageLayoutConfigDemo from "./UIComponent/SDKNewComponent/LayoutComponent/PageLayoutConfigDemo";
import DialogDemo from "./UIComponent/SDKNewComponent/BasicComponent/DialogDemo";
import HandPopDemo from "./UIComponent/SDKNewComponent/BasicComponent/HandPopDemo";
import HandPopCustomDemo from "./UIComponent/SDKNewComponent/BasicComponent/HandPopCustomDemo";
import HandPopClickDemo from "./UIComponent/SDKNewComponent/BasicComponent/HandPopClickDemo";
import HandPopTriggerDemo from "./UIComponent/SDKNewComponent/BasicComponent/HandPopTriggerDemo";
import LoadingDemo from "./UIComponent/SDKNewComponent/BasicComponent/LoadingDemo";
import ListDemo from "./UIComponent/SDKNewComponent/BasicComponent/ListDemo";
import ListItemDemo from "./UIComponent/SDKNewComponent/BasicComponent/ListItemDemo";
import ListItemConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/ListItemConfigDemo";
import ListItemWithWidgetConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/ListItemWithWidgetConfigDemo";
import BlockButtonConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/BlockButtonConfigDemo";
import ButtonGroupConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/ButtonGroupConfigDemo";
import SwitchConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/SwitchConfigDemo";
import CheckboxConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/CheckboxConfigDemo";
import NewCheckboxDemo from "./UIComponent/SDKNewComponent/BasicComponent/NewCheckboxDemo";
import RadioDemo from "./UIComponent/SDKNewComponent/BasicComponent/RadioDemo";
import RadioConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/RadioConfigDemo";
import ToastConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/ToastConfigDemo";
import DividerConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/DividerConfigDemo";
import ActionCustomDialogConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/ActionCustomDialogConfigDemo";
import LargeListEntranceConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/LargeListEntranceConfigDemo";
import SmallGridEntranceConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/SmallGridEntranceConfigDemo";
import ParamStepperConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/ParamStepperConfigDemo";
import CardContainerConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/CardContainerConfigDemo";
import ContainerWithGapConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/ContainerWithGapConfigDemo";
import SmallGridContainerConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/SmallGridContainerConfigDemo";
import LargeListToggleConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/LargeListToggleConfigDemo";
import MediumListToggleConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/MediumListToggleConfigDemo";
import SmallGridToggleConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/SmallGridToggleConfigDemo";
import MediumListEntranceDemo from "./UIComponent/SDKNewComponent/IotComponent/MediumListEntranceDemo";
import MediumListEntranceConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/MediumListEntranceConfigDemo";
import CircularButtonDemo from "./UIComponent/SDKNewComponent/IotComponent/CircularButtonDemo";
import CircularButtonConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/CircularButtonConfigDemo";
import CardHeaderConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/CardHeaderConfigDemo";
import IotSliderConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/SliderConfigDemo";
import IotSliderWithToggleConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/SliderWithToggleConfigDemo";
import LargeVariantSwitchConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/LargeVariantSwitchConfigDemo";
import ButtonDemo from "./UIComponent/SDKNewComponent/BasicComponent/ButtonDemo";
import ButtonConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/ButtonConfigDemo";
import ButtonColorDemo from "./UIComponent/SDKNewComponent/BasicComponent/ButtonColorDemo";
import ButtonCustomDemo from "./UIComponent/SDKNewComponent/BasicComponent/ButtonCustomDemo";
import ButtonPageViewDemo from "./UIComponent/SDKNewComponent/BasicComponent/ButtonPageViewDemo";
import ToastDemo from "./UIComponent/SDKNewComponent/BasicComponent/ToastDemo";

import MediumTriggerSelectConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/MediumTriggerSelectConfigDemo";
import PullRefreshConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/PullRefreshConfigDemo";
import SegmentedControlsConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/SegmentedControlsConfigDemo";
import SpinConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/SpinConfigDemo";
import NavigationBarConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/NavigationBarConfigDemo";
import StatusAlertConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/StatusAlertConfigDemo";

import DrawerDemo from "./UIComponent/SDKNewComponent/BasicComponent/DrawerDemo";
import FixedDrawerDemo from "./UIComponent/SDKNewComponent/BasicComponent/FixedDrawerDemo";
import ElasticDrawerDemo from "./UIComponent/SDKNewComponent/BasicComponent/ElasticDrawerDemo";
import PanResponderDemo from "./UIComponent/SDKNewComponent/BasicComponent/PanResponderDemo";
import CabinetAirConditioner from "./UIComponent/SDKNewComponent/BasicComponent/CabinetAirConditioner";
import SeparatorDemo from "./UIComponent/SDKNewComponent/BasicComponent/SeparatorDemo";
// Iot 组件
import IotComponentDemo from "./UIComponent/SDKNewComponent/IotComponent/IotComponentDemo";
import IotSliderDemo from "./UIComponent/SDKNewComponent/IotComponent/SliderDemo";
import IotSliderWithToggleDemo from "./UIComponent/SDKNewComponent/IotComponent/SliderWithToggleDemo";
import IotActionSheetDemo from "./UIComponent/SDKNewComponent/BasicComponent/ActionSheetDemo";
import IotActionSheetConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/ActionSheetConfigDemo";
import IotMediumImageButtonDemo from "./UIComponent/SDKNewComponent/IotComponent/MediumImageButtonDemo";
import IotMediumImageButtonConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/MediumImageButtonConfigDemo";
import IotSmallImageButtonDemo from "./UIComponent/SDKNewComponent/IotComponent/SmallImageButtonDemo";
import IotSmallImageButtonConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/SmallImageButtonConfigDemo";
import IotDataItemDemo from "./UIComponent/SDKNewComponent/IotComponent/DataItemDemo";
import IotDataItemConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/DataItemConfigDemo";
import IotDataGroupDemo from "./UIComponent/SDKNewComponent/IotComponent/DataGroupDemo";
import IotDataGroupConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/DataGroupConfigDemo";
import LargeEntranceDemo from "./UIComponent/SDKNewComponent/IotComponent/LargeEntranceDemo";
import StepperDemo from "./UIComponent/SDKNewComponent/IotComponent/StepperDemo";
import LargeVariantSwitchDemo from "./UIComponent/SDKNewComponent/IotComponent/LargeVariantSwitchDemo";
import SmallGridContainerDemo from "./UIComponent/SDKNewComponent/IotComponent/SmallGridContainerDemo";
import CardContainerDemo from "./UIComponent/SDKNewComponent/IotComponent/CardContainerDemo";
import GroupContainerDemo from "./UIComponent/SDKNewComponent/IotComponent/GroupContainerDemo";
import TitleContainerDemo from "./UIComponent/SDKNewComponent/IotComponent/TitleContainerDemo";
import SmallEntranceDemo from "./UIComponent/SDKNewComponent/IotComponent/SmallEntranceDemo";
import SmallVariantSwitchDemo from "./UIComponent/SDKNewComponent/IotComponent/SmallVariantSwitchDemo";
import MiddleVariantSwitchDemo from "./UIComponent/SDKNewComponent/IotComponent/MiddleVariantSwitchDemo";
import SmallFlatOptionDemo from "./UIComponent/SDKNewComponent/IotComponent/SmallFlatOptionDemo";
import LargeTriggerSelectDemo from "./UIComponent/SDKNewComponent/IotComponent/LargeTriggerSelectDemo";
import LargeTriggerSelectConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/LargeTriggerSelectConfigDemo";
import ActionBlockDemo from "./UIComponent/SDKNewComponent/IotComponent/ActionBlockDemo";
import ActionBlockConfigDemo from "./UIComponent/SDKNewComponent/IotComponent/ActionBlockConfigDemo";
import VariantSwitchDemo from "./UIComponent/SDKNewComponent/IotComponent/VariantSwitchDemo";
import ToggleButtonDemo from "./UIComponent/SDKNewComponent/BasicComponent/ToggleButtonDemo";
import EmptyStateDemo from "./UIComponent/SDKNewComponent/BasicComponent/EmptyStateDemo";
import EmptyStateConfigDemo from "./UIComponent/SDKNewComponent/BasicComponent/EmptyStateConfigDemo";
import SpacingDemo from "./UIComponent/SDKNewComponent/BasicComponent/SpacingDemo";
import FeatureComponentDemo from "./UIComponent/SDKNewComponent/BasicComponent/FeatureComponentDemo";
import ActionCustomDialogDemo from "./UIComponent/SDKNewComponent/BasicComponent/ActionCustomDialogDemo";
import BlockButtonDemo from "./UIComponent/SDKNewComponent/BasicComponent/BlockButtonDemo";
import ButtonGroupDemo from "./UIComponent/SDKNewComponent/BasicComponent/ButtonGroupDemo";
import ListItemWithWidgetDemo from "./UIComponent/SDKNewComponent/BasicComponent/ListItemWithWidgetDemo";
import LoadingToastDemo from "./UIComponent/SDKNewComponent/BasicComponent/LoadingToastDemo";
import MessageDialogDemo from "./UIComponent/SDKNewComponent/BasicComponent/MessageDialogDemo";
import MenusDemo from "./UIComponent/SDKNewComponent/BasicComponent/MenusDemo";
import MenusPositionDemo from "./UIComponent/SDKNewComponent/BasicComponent/MenusPositionDemo";
import MenusEntryDemo from "./UIComponent/SDKNewComponent/BasicComponent/MenusEntryDemo";
import InputDemo from "./UIComponent/SDKNewComponent/BasicComponent/InputDemo";
import InputDialogDemo from "./UIComponent/SDKNewComponent/BasicComponent/InputDialogDemo";
import CustomDialogDemo from "./UIComponent/SDKNewComponent/BasicComponent/CustomDialogDemo";
import PickerDialogDemo from "./UIComponent/SDKNewComponent/BasicComponent/PickerDialogDemo";
import NoticeBarDemo from "./UIComponent/SDKNewComponent/BasicComponent/NoticeBarDemo";
import PopMenusDemo from "./UIComponent/SDKNewComponent/BasicComponent/PopMenusDemo";
import PopMenusPositionDemo from "./UIComponent/SDKNewComponent/BasicComponent/PopMenusPositionDemo";
import PopMenusEntryDemo from "./UIComponent/SDKNewComponent/BasicComponent/PopMenusEntryDemo";
import NewSwitchDemo from "./UIComponent/SDKNewComponent/BasicComponent/SwitchDemo";
// 第三方库
import SQLiteDemo from "./ThirdPartDemo/SQLiteDemo";
import OrientationDemo from "./Host/OrientationDemo";
import KVStorageDemo from "./Host/KVStorageDemo";
import NavigateUIDemo from "./Host/UI";
import PrivacyDemo from "./Host/UI/privacy";
import MainPage from "./MainPage";
import MoreMenu from "./MoreMenu";
import ImagePathDemo from "./NewStructureTest";
import { PluginEntrance } from "./PluginEntrance";
// import GLTests from './ThirdPartDemo/openGL/Tests';
// import OpenLibList from './OpenLibList';
/** ******    Service 部分   ******* */
import ServiceDemo from "./Service";
import MiotSpecDemo from "./Service/MiotSpecDemo";
import MiotSpecV3Demo from "./Service/MiotSpecV3Demo/";
import MHRoomDemo from "./Service/RoomDemo";
import MHSceneDemo from "./Service/SceneDemo";
import AccountDemo from "./Service/AccountDemo";
import KookongDemo from "./Service/KookongDemo";
// import AlarmPhoneDemo from './Service/AlarmPhoneDemo';
import CallSmartHomeAPIDemo from "./Service/smarthome";
import CloudStorageDemo from "./Service/CloudStorageDemo";

/** ******    UI 部分   ******* */
import WebViewBridageDemo from "./ThirdPartDemo/WebViewBridageDemo";
import NavigationBarDemo from "./tutorial/NavigationBarDemo";
import BlankDemo from "./tutorial/BlankDemo";
import SystemDemo from "./tutorial/SystemDemo";
import BlankPageDemo from "./UIComponent/BlankPageDemo";
import ColorPicker from "./UIComponent/ColorPicker";
import BackHandlerDemo from "./UIComponent/BackHandlerDemo";
import PackageDemo from "./tutorial/PackageDemo";
// import ReactNativeCameraDemo from './ThirdPartDemo/ReactNativeCameraDemo';
import LinearGradientDemo from "./ThirdPartDemo/LinearGradientDemo";
import ReactNativeCameraDemo from "./ThirdPartDemo/ReactNativeCameraDemo";
import ReactNativeBlurDemo from "./ThirdPartDemo/ReactNativeBlurDemo";
import SVGDemo from "./ThirdPartDemo/SVGDemo";
import {
  GroupExample,
  HoverExample,
  PressExample,
} from "./ThirdPartDemo/SVGDemo2";
import LegendsView from "./ThirdPartDemo/Victory-Native/views/legends-view";
import AxisView from "./ThirdPartDemo/Victory-Native/views/axis-view";
import ContainersView from "./ThirdPartDemo/Victory-Native/views/containers-view";
import CreateContainerView from "./ThirdPartDemo/Victory-Native/views/create-container-view"; // ios 问题
import ErrorsTooltipsView from "./ThirdPartDemo/Victory-Native/views/errors-tooltips-view";
import AreaView from "./ThirdPartDemo/Victory-Native/views/area-view";
import GLSimple from "./ThirdPartDemo/openGL/Simple"; // ios 包有问题
import GLHearts from "./ThirdPartDemo/openGL/Hearts"; // ios 包有问题
import GLAnimated from "./ThirdPartDemo/openGL/Animated"; // ios 包有问题
import GLParticles from "./ThirdPartDemo/openGL/Particles"; // ios 包有问题
import GLOrientation from "./ThirdPartDemo/openGL/Orientation"; // ios 包有问题

import LineView from "./ThirdPartDemo/Victory-Native/views/line-view";
import PieView from "./ThirdPartDemo/Victory-Native/views/pie-view";
import BarView from "./ThirdPartDemo/Victory-Native/views/bar-view";
import ScatterView from "./ThirdPartDemo/Victory-Native/views/scatter-view";
import BoxPlotView from "./ThirdPartDemo/Victory-Native/views/boxplot-view";
import ChartView from "./ThirdPartDemo/Victory-Native/views/chart-view";

import ParticleDemo from "./ThirdPartDemo/ParticleDemo";
import ImagePickerDemo from "./ThirdPartDemo/ImagePickerDemo";

// svg
import ARTSVGDemo from "./ThirdPartDemo/ARTComponentDemo/ARTSVGDemo"; // 图片：SVG，
import ARTRectDemo from "./ThirdPartDemo/ARTComponentDemo/ARTRectDemo"; // 矩形：Rect，多边形：Polygon,多边线：Polyline
import ARTCircleDemo from "./ThirdPartDemo/ARTComponentDemo/ARTCircleDemo"; // 圆形：Circle，
import ARTEllipseDemo from "./ThirdPartDemo/ARTComponentDemo/ARTEllipseDemo"; // 椭圆：Ellipse
import ARTLineDemo from "./ThirdPartDemo/ARTComponentDemo/ARTLineDemo"; // 直线：Line,多边线：Polyline
import ARTGroupDemo from "./ThirdPartDemo/ARTComponentDemo/ARTGroupDemo"; // 分组：Group,
import ARTGradientDemo from "./ThirdPartDemo/ARTComponentDemo/ARTGradientDemo"; // LinearGradient：线性渐变,RadialGradient：径向渐变
import ARTPatternDemo from "./ThirdPartDemo/ARTComponentDemo/ARTPatternDemo"; // Pattern 图案
import ARTTextDemo from "./ThirdPartDemo/ARTComponentDemo/ARTTextDemo"; // 文字：Text
import HoughCirclesDemo from "./ThirdPartDemo/opencv/HoughCirclesDemo";
import HoughCircles2Demo from "./ThirdPartDemo/opencv/HoughCircles2Demo";
import CvImageManipulationsDemo from "./ThirdPartDemo/opencv/CvImageManipulationsDemo";
import CvCameraPreviewDemo from "./ThirdPartDemo/opencv/CvCameraPreviewDemo";
import CvFaceDetectionDemo from "./ThirdPartDemo/opencv/CvFaceDetectionDemo";
import CvFaceLandmarksDemo from "./ThirdPartDemo/opencv/CvFaceLandmarksDemo";

// 米家iOS 自定义第三方库<
import CircularSliderDemo from "./ThirdPartDemo/CircularSliderDemo";
import AnimatedSVGDemo from "./ThirdPartDemo/AnimatedSVGDemo";
import PdfViewerDemo from "./ThirdPartDemo/PdfViewerDemo";
// import ImageFilterDemo from './ThirdPartDemo/ImageFilterDemo';

import CustomContainer from "./uikit/components/CustomContainer";

// 官方Demo
import OfficialDemos from "./OfficialDemos";

import Logger from "./Logger";
import { NavigationBar } from "miot/ui/hyperOSUI";
function createRootStack(initPage) {
  return createStackNavigator(
    {
      blankDemo: BlankDemo,
      systemDemo: SystemDemo,
      NavigationBarDemo,
      Setting,
      SettingPage,
      MoreSetting,
      Settings2022,
      SupportedFont,
      CurtainGroupPage,
      FirmwareUpgrade,
      // 新版SDK
      BasicComponentDemo,
      BasicDemo,
      ButtonDemo,
      ButtonConfigDemo,
      ToastDemo,
      ButtonColorDemo,
      ButtonCustomDemo,
      ButtonPageViewDemo,
      SdkComponentDemo,
      ColorDemo,
      RadiusDemo,
      ActionListItemDemo,
      SelectListDemo,
      SubpageLayoutDemo,
      PageLayoutDemo,
      LayoutDemo,
      NewListCardDemo,
      ActionListItemConfigDemo,
      SelectListConfigDemo,
      ListCardConfigDemo,
      SubpageLayoutConfigDemo,
      PageLayoutConfigDemo,
      DialogDemo,
      HandPopDemo,
      HandPopClickDemo,
      HandPopCustomDemo,
      HandPopTriggerDemo,
      FontsDemo,
      LoadingDemo,
      ListDemo,
      ListItemDemo,
      ListItemConfigDemo,
      ListItemWithWidgetConfigDemo,
      BlockButtonConfigDemo,
      ButtonGroupConfigDemo,
      SwitchConfigDemo,
      CheckboxConfigDemo,
      NewCheckboxDemo,
      RadioDemo,
      RadioConfigDemo,
      ToastConfigDemo,
      DividerConfigDemo,
      ActionCustomDialogConfigDemo,
      LargeListEntranceConfigDemo,
      SmallGridEntranceConfigDemo,
      ParamStepperConfigDemo,
      CardContainerConfigDemo,
      ContainerWithGapConfigDemo,
      SmallGridContainerConfigDemo,
      LargeListToggleConfigDemo,
      MediumListToggleConfigDemo,
      SmallGridToggleConfigDemo,
      MediumListEntranceDemo,
      MediumListEntranceConfigDemo,
      CircularButtonDemo,
      CircularButtonConfigDemo,
      CardHeaderConfigDemo,
      IotSliderConfigDemo,
      IotSliderWithToggleConfigDemo,
      LargeVariantSwitchConfigDemo,
      IotSliderDemo,
      IotSliderWithToggleDemo,
      IotActionSheetDemo,
      IotActionSheetConfigDemo,
      IotMediumImageButtonDemo,
      IotMediumImageButtonConfigDemo,
      IotSmallImageButtonDemo,
      IotSmallImageButtonConfigDemo,
      IotDataItemDemo,
      IotDataItemConfigDemo,
      IotDataGroupDemo,
      IotDataGroupConfigDemo,
      CabinetAirConditioner,
      MediumTriggerSelectConfigDemo,
      SegmentedControlsConfigDemo,
      PullRefreshConfigDemo,
      SpinConfigDemo,
      StatusAlertConfigDemo,
      NavigationBarConfigDemo,
      // Iot 组件
      IotComponentDemo,
      LargeEntranceDemo,
      StepperDemo,
      LargeVariantSwitchDemo,
      SmallGridContainerDemo,
      CardContainerDemo,
      GroupContainerDemo,
      TitleContainerDemo,
      SmallEntranceDemo,
      SmallVariantSwitchDemo,
      MiddleVariantSwitchDemo,
      SmallFlatOptionDemo,
      LargeTriggerSelectDemo,
      LargeTriggerSelectConfigDemo,
      ActionBlockDemo,
      ActionBlockConfigDemo,
      VariantSwitchDemo,
      ToggleButtonDemo,
      EmptyStateDemo,
      EmptyStateConfigDemo,
      SpacingDemo,
      DrawerDemo,
      FixedDrawerDemo,
      ElasticDrawerDemo,
      PanResponderDemo,
      // SmartSceneDemo,
      SeparatorDemo,
      FeatureComponentDemo,
      ActionCustomDialogDemo,
      BlockButtonDemo,
      ButtonGroupDemo,
      ListItemWithWidgetDemo,
      LoadingToastDemo,
      MessageDialogDemo,
      MenusDemo,
      MenusPositionDemo,
      MenusEntryDemo,
      InputDemo,
      InputDialogDemo,
      CustomDialogDemo,
      PickerDialogDemo,
      NoticeBarDemo,
      PopMenusDemo,
      PopMenusPositionDemo,
      PopMenusEntryDemo,
      NewSwitchDemo,
      // FirmwareUpgradeAuto,
      FirmwareUpgradeRecord,
      HostDemo,
      HostEventDemo,
      PadScrollDemo,
      RockerViewDemo: RockerViewDemo,
      Home: MainPage,
      accountDemo: AccountDemo,
      DeviceControl,
      ControlDemo,
      RPCControl,
      DeviceDemo,
      NewGBControlDemo,
      InterconnectionDemo,
      BTInterconnection,
      BraceletInterconnection,
      moreMenu: MoreMenu,
      helloDeveloper: HelloDeveloper,
      helloReactART: HelloReactART,
      mhMapDemo: MHMapDemo,
      audioDemo: MHAudioDemo,
      videoDemo: VideoDemo,
      videoThumbnailDemo: VideoThumbnailDemo,
      imagePathDemo: ImagePathDemo,
      ThirdPartyDemo: ThirdPartyDemo,
      ServiceDemo,
      UIDemo,
      SoftKeyboardAdapterTestDemo: SoftKeyboardAdapterTestDemo,
      TabBarDemo,
      RadioExample,
      CheckboxDemo,
      GearExample,
      SwitchDemo,
      DialogExample,
      BlankPageEntry,
      ToastExample,
      NavigateUIDemo,
      PrivacyDemo,
      // swiper 开始
      swiperDynamic: Dynamic,
      swiperLoadMinimal: LoadMinimal,
      swiperPhone: Phone,
      swiperSwiper: Swiper,
      swiperNumber: SwiperNumber,
      // swiper 结束
      ProgressDemo,
      // 米家iOS 自定义第三方库>
      // dialog
      DialogTest: DialogTest,
      DialogTest2,
      DialogTest3,
      ImageCapInsetDemo,
      ImageButtonDemo,
      NumberSpinnerDemo,
      StringSpinnerDemo,
      ColorPickerDemo,
      ColorSelectorDemo,
      MiotAndroidScrollViewDemo,
      AbsoluteTouch,
      // 接口服务
      callSmartHomeAPIDemo: CallSmartHomeAPIDemo,
      MHRoomDemo,
      MiotSpecDemo,
      MiotSpecV3Demo,
      // Native 交互
      HostPropsInfoDemo,
      LocaleServer,
      DarkModeDemo,
      JSExecutor,
      // ---
      // 第三方库 demo 开始
      SQLiteDemo: SQLiteDemo,
      OrientationDemo: OrientationDemo,
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

      GLSimple: GLSimple, // ios 包有问题
      // // GLAdvancedEffects:GLAdvancedEffects, //  有bug
      GLHearts: GLHearts, // ios 包有问题
      // GLTests:  GLTests, // 有bug
      GLAnimated: GLAnimated, // ios 包有问题
      GLParticles: GLParticles, // ios 包有问题
      GLOrientation: GLOrientation, // ios 包有问题

      cryptoDemo: CryptoDemo,
      traceDemo: TraceDemo,
      RobotMapDemo: RobotMapDemo,
      // SparkLines,
      // Tabs,
      YMDDatePickerDemo,
      ParticleDemo: ParticleDemo, // iOS 特有的,粒子系统
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

      // opencv
      HoughCirclesDemo: HoughCirclesDemo,
      HoughCircles2Demo: HoughCircles2Demo,
      CvImageManipulationsDemo: CvImageManipulationsDemo,
      CvCameraPreviewDemo: CvCameraPreviewDemo,
      CvFaceDetectionDemo: CvFaceDetectionDemo,
      CvFaceLandmarksDemo: CvFaceLandmarksDemo,

      // animation
      AnimFadeInOutDemo: AnimFadeInOutDemo,
      AnimTransformDemo: AnimTransformDemo,
      AnimTranslationDemo: AnimTranslationDemo,
      AnimEffectsDemo: AnimEffectsDemo,
      AnimEventsDemo: AnimEventsDemo,
      LayoutAnimationDemo: LayoutAnimationDemo,
      AnimCustomCompDemo: AnimCustomCompDemo,
      PdfViewerDemo: PdfViewerDemo,
      // ImageFilterDemo: ImageFilterDemo,
      // 第三方库 demo 结束

      // 米家iOS 自定义第三方库<
      CircularSliderDemo: CircularSliderDemo,
      // 米家iOS 自定义第三方库>
      AnimatedSVGDemo,
      // AbsoluteTouch,
      // List 相关
      ListDemoEntry,
      CustomListDemo,
      RefreshListViewDemo,
      AdaptedFontListDemo,

      // 卡片相关
      CardDemoEntry: CardDemoEntry,
      CustomCardDemo,
      IndependentCardDemo,
      ModeCardDemo,
      AdaptedFontCardDemo,
      GearCardDemo,
      ListCardDemo,
      CardButtonDemo,
      SelectWithButtonDemo,
      SliderWithHeaderDemo,
      SliderWithoutBlockDemo,

      CustomContainer,
      Parallax,
      TitleBarDemo,
      MHDatePickerDemo,
      MHSceneDemo: MHSceneDemo,
      BlankPageDemo,
      ColorPicker,
      BackHandlerDemo,
      tutorialDemo: TutorialDemo,
      PackageDemo: PackageDemo,
      AccountDemo: AccountDemo,
      KookongDemo: KookongDemo,
      // AlarmPhoneDemo: AlarmPhoneDemo,
      CloudStorageDemo: CloudStorageDemo,

      KVStorageDemo: KVStorageDemo,
      FileDemo: FileDemo,
      PhotoDemo: PhotoDemo,
      DownloadFontDemo,

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
      ReactNativeCameraDemo: ReactNativeCameraDemo,

      FadeSlideDemo,

      // 第三方库 demo 结束

      // 米家iOS 自定义第三方库<

      // 官方Demo
      OfficialDemos,
    },
    {
      initialRouteName: initPage,
      // initialRouteName: 'ModeCardDemo',
      navigationOptions: ({ navigation }) => {
        let params = navigation.state.params || {};
        return {
          header: (
            <NavigationBar
              titleSize={"normal"}
              title={params.title || params.name || ""}
              left={
                {
                  key: NavigationBar.ICON.BACK,
                  onPress: () => navigation.goBack(),
                  accessibilityLabel: "返回",
                  accessibilityHint: "返回上一页",
                }
              }
              showBrandLogo
              right={Array.isArray(params.right) ? params.right[0] : params.right}
            />
          ),
        };
      },
      transitionConfig: () => ({
        screenInterpolator: interpolator,
      }),
    }
  );
}

function interpolator(props) {
  const { layout, position, scene } = props;
  if (darkModeDemoPathList.includes(scene.route.routeName)) {
    DarkMode.preparePluginOwnDarkMode();
  }

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
      const currentSceneIndexInScenes = scenes.findIndex(
        (item) => item === scene
      );
      const targetSceneIndexInScenes = scenes.findIndex(
        (item) => item.isActive
      );
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
  const { first, last } = p;
  const index = scene.index;
  const opacity = position.interpolate({
    inputRange: [first, first + 0.01, index, last - 0.01, last],
    outputRange: [0, 1, 1, 0.85, 0],
  });

  const width = layout.initWidth;
  const translateX = position.interpolate({
    inputRange: [first, index, last],
    // outputRange: false ? [-width, 0, width * 0.3] : [width, 0, width * -0.3]
    outputRange: [width, 0, width * -0.3],
  });
  const translateY = 0;

  return {
    opacity,
    transform: [{ translateX }, { translateY }],
  };
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.initData();
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
      case PluginEntrance.OfficialDemos:
        this.initPage = PluginEntrance.OfficialDemos;
        break;
      default:
        this.initPage = "Home";
        break;
    }
    if (Package.pageParams && Package.pageParams.isBackToMainPage) {
      // 需要返回到首页，则首先进入到插件首页，然后插件首页中跳转到真正需要跳转到的page页面
      this.initPage = "Home";
    }
    Logger.trace(this, this.initData, { initPage: this.initPage });
  }

  render() {
    let RootStack = createRootStack(this.initPage);
    return <RootStack />;
  }
}
