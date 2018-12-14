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
 *    const btn = <miotui.ImageButton .../>
 */
import _ImageButton from './ImageButton'
import _LoadingDialog from './LoadingDialog'
import _MessageDialog from './MessageDialog'
import _ProgressDialog from './ProgressDialog'
import _MultiChoseDialog from './MultiChoseDialog'
import _SingleChoseDialog from './SingleChoseDialog'
import _InputDialog from './InputDialog'
import _TitleBar from './TitleBar'
import _TitleBarWhite from './TitleBarWhite'
import _TitleBarBlack from './TitleBarBlack'
import _LocalizedStrings from './LocalizedStrings'
import _AMapView from './AMapView'
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
export default { ImageButton, LoadingDialog, MessageDialog, MultiChoseDialog, ProgressDialog, SingleChoseDialog, InputDialog, TitleBar, TitleBarBlack, TitleBarWhite, LocalizedStrings, AMapView }