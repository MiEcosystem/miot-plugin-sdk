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
import _MHImage from './image';
import _ImageButton from './ImageButton';
import _InputDialog from './InputDialog';
import _LoadingDialog from './LoadingDialog';
import _LocalizedStrings from './LocalizedStrings';
import _MessageDialog from './MessageDialog';
import _MultiChoseDialog from './MultiChoseDialog';
import _NumberSpin from './NumberSpinner';
import _StringSpin from './StringSpinner';
import _ProgressDialog from './ProgressDialog';
import _SingleChoseDialog from './SingleChoseDialog';
import _TitleBar from './TitleBar';
import _TitleBarBlack from './TitleBarBlack';
import _TitleBarWhite from './TitleBarWhite';
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
export const MiotAndroidScrollView = _MiotAndroidScrollView;
export const MHImage = _MHImage;
export default {
    ImageButton, MHImage,
    LoadingDialog, MessageDialog, MultiChoseDialog,
    ProgressDialog, SingleChoseDialog, InputDialog,
    TitleBar, TitleBarBlack, TitleBarWhite,
    NumberSpinner, StringSpinner,
    LocalizedStrings, AMapView, MiotAndroidScrollView
}