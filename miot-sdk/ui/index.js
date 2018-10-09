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
export const ImageButton = require('./ImageButton');
export const LoadingDialog = require('./LoadingDialog');
export const MessageDialog = require('./MessageDialog');
export const ProgressDialog = require('./ProgressDialog');
export const MultiChoseDialog = require('./MultiChoseDialog');
export const SingleChoseDialog = require('./SingleChoseDialog');
export const InputDialog = require('./InputDialog');
export const TitleBarBlack = require('./TitleBarBlack');
export const TitleBarWhite = require('./TitleBarWhite');
export const LocalizedStrings = require('./LocalizedStrings');
export const AMapView = require('./AMapView');
export default {ImageButton,LoadingDialog,MessageDialog,MultiChoseDialog,ProgressDialog,SingleChoseDialog,InputDialog,TitleBarBlack,TitleBarWhite,LocalizedStrings,AMapView}