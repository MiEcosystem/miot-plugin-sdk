/**
 * @export
 * @module miot/ui
 *
 * @description 系统提供的一些内置模块,包括提示,高德地图,广告等
 *
 * @example
 *    import {ImageButton,LoadingDialog} from 'miot/ui'
 *    import MiotImageButton from 'miot/ui/ImageButton'
 *    import miotui from 'miot/ui'
 *
 *    const btn = <miotui.ImageButton ... />
 */
import _AMapView from './AMapView';
import _MiotAndroidScrollView from './android/scrollview/MiotAndroidScrollView';
// import _MHImage from './image';
import _ImageButton from './ImageButton';
import _InputDialog from './InputDialog';
import _LoadingDialog from './LoadingDialog';
import _LocalizedStrings from './LocalizedStrings';
import _MessageDialog from './MessageDialog';
import _MultiChoseDialog from './MultiChoseDialog';
import _NumberSpin from './NumberSpinner';
import _StringSpin from './StringSpinner';
import _RobotMapView from './RobotMapView';
import _ProgressDialog from './ProgressDialog';
import _SingleChoseDialog from './SingleChoseDialog';
import _TitleBar from './TitleBar';
import _TitleBarBlack from './TitleBarBlack';
import _TitleBarWhite from './TitleBarWhite';
import _BTInterconnection from './BTInterconnection';
export const ImageButton = _ImageButton;
export const LoadingDialog = _LoadingDialog;
export const MessageDialog = _MessageDialog;
export const ProgressDialog = _ProgressDialog;
export const MultiChoseDialog = _MultiChoseDialog;
export const SingleChoseDialog = _SingleChoseDialog;
export const InputDialog = _InputDialog;
export const TitleBar = _TitleBar;
export const TitleBarBlack = _TitleBarBlack;
export const TitleBarWhite = _TitleBarWhite;
export const LocalizedStrings = _LocalizedStrings;
export const AMapView = _AMapView;
export const NumberSpinner = _NumberSpin;
export const StringSpinner = _StringSpin;
export const RobotMapView = _RobotMapView;
export const MiotAndroidScrollView = _MiotAndroidScrollView;
export const BTInterconnection = _BTInterconnection;
export { default as BigNumber } from './BigNumber';
export { default as CardButton } from './CardButton';
export { default as CircleButton } from './CircleButton';
export { default as ContainerWithGap } from './ContainerWithGap';
export { default as ContainerWithShadowAndSeparator } from './ContainerWithShadowAndSeparator';
export { default as DeviceWithInfo } from './DeviceWithInfo';
export { default as Fan } from './Fan';
export { default as HeaterHeader } from './HeaterHeader';
export { default as LightControl } from './LightControl';
export { default as PageWithNormalNavigator } from './PageWithNormalNavigator';
export { default as SelectorWithButton } from './SelectorWithButton';
export { default as SliderWithHeader } from './SliderWithHeader';
export { default as SmallNumbers } from './SmallNumbers';
export { default as WallSwitch } from './WallSwitch';
export { default as Airer } from './Airer';
export { default as DoubleSelectors } from './DoubleSelectors';
export { default as Curtain } from './Curtain';
export { default as CurtainStyle } from './CurtainStyle';
export { default as PrimeButton } from './PrimeButton';
export { default as QAList } from './QAList';
export { default as MultiButtons } from './MultiButtons';
export { default as Consumable } from './Consumable';
export { default as ImageHeader } from './ImageHeader';
export { default as RTSPRenderView } from './RTSPRenderView';
// export { default as BTInterconnection } from './BTInterconnection';
export default {
  ImageButton,
  // MHImage,
  LoadingDialog, MessageDialog, MultiChoseDialog,
  ProgressDialog, SingleChoseDialog, InputDialog,
  TitleBar, TitleBarBlack, TitleBarWhite,
  NumberSpinner, StringSpinner, RobotMapView,
  LocalizedStrings, AMapView, MiotAndroidScrollView
};