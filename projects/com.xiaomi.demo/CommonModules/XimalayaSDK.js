//
//  喜马拉雅SDK
//  MiHome
//
//  Created by Woody on 5/8/14.
//  Copyright (c) 2015年 小米移动软件. All rights reserved.
//

'use strict';

var React = require('react-native');
var Ximalaya = require('NativeModules').Ximalaya;

var {
  Component,
} = React;


/**
 * 喜马拉雅请求类型
 **/
var XMReqType = {
    /** 喜马拉雅内容分类 */
    XMReqType_CategoriesList : 0,
    /** 运营人员在首页推荐的专辑分类 */
    XMReqType_CategoriesHumanRecommend : 1,
    /** 获取专辑或声音的标签 */
    XMReqType_TagsList : 2,
    /** 根据分类和标签获取某个分类某个标签下的热门专辑列表 */
    XMReqType_AlbumsHot : 3,
    /** 根据专辑ID获取专辑下的声音列表，即专辑浏览 */
    XMReqType_AlbumsBrowse : 4,
    /** 批量获取专辑列表 */
    XMReqType_AlbumsBatch : 5,
    /** 获取全量专辑数据 */
    XMReqType_AlbumsAll : 6,
    /** 根据专辑ID列表获取批量专辑更新提醒信息列表 */
    XMReqType_AlbumsUpdateBatch : 7,
    /** 获取某个专辑的相关推荐。 */
    XMReqType_AlbumsRelative : 8,
    /** 获取下载听模块的推荐下载专辑 */
    XMReqType_AlbumsRecommendDownload : 9,
    //猜你喜欢
    XMReqType_AlbumsGuessLike : 10,
    //获取某个主播下的专辑列表
    XMReqType_AlbumsByAnnouncer : 11,
    /** 根据分类和标签获取某个分类下某个标签的热门声音列表 */
    XMReqType_TracksHot : 12,
    /** 批量下载声音 */
    XMReqType_TracksDownBatch : 13,
    /** 批量获取声音 */
    XMReqType_TracksBatch : 14,
    /** 根据上一次所听声音的id，获取从那条声音开始往前一页声音。 */
    XMReqType_TrackGetLastPlay : 15,
    /** 搜索获取专辑列表 */
    XMReqType_SearchAlbums : 16,
    /** 搜索获取声音列表 */
    XMReqType_SearchTracks : 17,
    /** 获取最新热搜词 */
    XMReqType_SearchHotWords : 18,
    /** 获取某个关键词的联想词 */
    XMReqType_SearchSuggestWords : 19,
    /** 搜索获取电台列表 */
    XMReqType_SearchRadios : 20,
    /** 获取指定数量直播，声音，专辑的内容 */
    XMReqType_SearchAll : 21,
    /** 搜索获取直播省份列表 */
    XMReqType_LiveProvince : 22,
    /** 搜索获取直播电台列表 */
    XMReqType_LiveRadio : 23,
    /** 搜索获取直播节目列表 */
    XMReqType_LiveSchedule : 24,
    /** 搜索获取当前直播的节目 */
    XMReqType_LiveProgram : 25,
    XMReqType_LiveCity : 26,
    XMReqType_LiveRadioOfCity : 27,
    XMReqType_LiveRadioByID : 28,
    /** 根据榜单类型获取榜单首页的榜单列表 */
    XMReqType_RankList : 29,
    /** 根据rank_key获取某个榜单下的专辑列表 */
    XMReqType_RankAlbum : 30,
    /** 根据rank_key获取某个榜单下的声音列表 */
    XMReqType_RankTrack : 31,
    /** 获取直播电台排行榜 */
    XMReqType_RankRadio : 32,
    /** 获取精品听单列表 */
    XMReqType_ColumnList : 33,
    /** 获取某个听单详情，每个听单包含听单简介信息和专辑或声音的列表 */
    XMReqType_ColumnDetail : 34,
    /** 获取榜单的焦点图列表 */
    XMReqType_RankBanner : 35,
    /** 获取发现页推荐的焦点图列表 */
    XMReqType_DiscoveryBanner : 36,
    /** 获取分类推荐的焦点图列表 */
    XMReqType_CategoryBanner : 37,
};

/**
 * 喜马拉雅SDK封装类
 **/

class XimalayaSDK extends Component{

  /**
   * 请求数据
   **/
  static requestXMData(reqType, params, callback) {
      Ximalaya.requestXMData(reqType, params, (result, error) => {
          if (callback != undefined) {
              callback(result, error);
          }
      });
  }

  static setPlayMode(playMode) {
      Ximalaya.setPlayMode(playMode);
  }

  static setVolume(volume) {
      Ximalaya.setVolume(volume);
  }

  static playWithTrack(track, playlist) {
      Ximalaya.playWithTrack(track, playlist);
  }

  static pauseTrackPlay() {
      Ximalaya.pauseTrackPlay();
  }

  static resumeTrackPlay() {
      Ximalaya.resumeTrackPlay();
  }

  static stopTrackPlay() {
      Ximalaya.stopTrackPlay();
  }

  static replacePlayList(playlist) {
      Ximalaya.replacePlayList(playlist);
  }

  static playNextTrackWithCallback(callback) {
      Ximalaya.playNextTrackWithCallback(callback);
  }

  static playPrevTrackWithCallback(callback) {
      Ximalaya.playPrevTrackWithCallback(callback);
  }

  static setAutoNexTrack(status) {
      Ximalaya.setAutoNexTrack(status);
  }

  static playListWithCallback(callback) {
      Ximalaya.playListWithCallback(callback);
  }

  static nextTrackWithCallback(callback) {
      Ximalaya.nextTrackWithCallback(callback);
  }

  static prevTrackWithCallback(callback) {
      Ximalaya.prevTrackWithCallback(callback);
  }

  static seekToTime(percent) {
      Ximalaya.seekToTime(percent);
  }

  static clearCacheSafely() {
      Ximalaya.clearCacheSafely();
  }

  static setTrackPlayMode(trackPlayMode) {
      Ximalaya.setTrackPlayMode(trackPlayMode);
  }

  static currentTrackWithCallback(callback) {
      Ximalaya.currentTrackWithCallback(callback);
  }

  static startLivePlayWithRadio(radio) {
      Ximalaya.startLivePlayWithRadio(radio);
  }

  static pauseLivePlay() {
      Ximalaya.pauseLivePlay();
  }

  static resumeLivePlay() {
      Ximalaya.resumeLivePlay();
  }

  static stopLivePlay() {
      Ximalaya.stopLivePlay();
  }

  static startHistoryLivePlayWithRadio(radio, program) {
      Ximalaya.startHistoryLivePlayWithRadio(radio, program);
  }

  static startHistoryLivePlayWithRadioInProgramList(radio, program, list) {
      Ximalaya.startHistoryLivePlayWithRadioInProgramList(radio, program, list);
  }

  static seekHistoryLivePlay(duration, callback) {
      Ximalaya.seekHistoryLivePlay(duration, callback);
  }

  static playNextProgram() {
      Ximalaya.playNextProgram();
  }

  static playPreProgram() {
      Ximalaya.playPreProgram();
  }

  static forceClearCacheDataForPath(cachePath, callback) {
      Ximalaya.forceClearCacheDataForPath(cachePath, callback);
  }

  static currentPlayingRadioWithCallback(callback) {
      Ximalaya.currentPlayingRadioWithCallback(callback);
  }

   static currentPlayingProgramWithCallback(callback) {
      Ximalaya.currentPlayingProgramWithCallback(callback);
  }
}

  /**
   * 原生SDK当中的delegate方法将通过RN的事件通知的方式传递到插件js中，
   * 下列的event名称对应着delegate的名称，注册demo：
     var {DeviceEventEmitter} = React;
     var subscription = DeviceEventEmitter.addListener(
       XimalayaSDK.kEventLivePlayerDelegate,
       (body) => {
         if (body.method == "XMLiveRadioPlayerDidFailWithError")
         {
           console.log(body.error);
         }
       }
     );
   * 其中delegate的具体方法名规则为：如原生delegate方法签名只有一段，则直接使用方法名字符串；如原生delegate方法签名不只一段，则用And连接各段并采用camel case：而body中的参数名直接使用原生参数名
   * 比如- (void)XMLiveRadioPlayerNotifyCacheProgress:(CGFloat)percent
   * 在js中body.method为"XMLiveRadioPlayerNotifyCacheProgress"
   * 参数为body.percent
   * 而- (void)XMLiveRadioPlayerNotifyPlayProgress:(CGFloat)percent currentTime:(NSInteger)currentTime
   * 在js中body.method为"XMLiveRadioPlayerNotifyPlayProgressAndCurrentTime"
   * 参数为body.percent和body.currentTime
   **/
XimalayaSDK.kEventTrackPlayerDelegate = "MHEventXimalayaTrackPlayerDelegate";
XimalayaSDK.kEventLivePlayerDelegate = "MHEventXimalayaLivePlayerDelegate";

module.exports.XMReqType = XMReqType;
module.exports.XimalayaSDK = XimalayaSDK;
