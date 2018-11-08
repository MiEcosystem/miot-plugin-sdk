/**
 * @export
 * @module miot/service/ximalaya
 * @description 喜马拉雅内容服务 API
 *
 */
/**
 * 喜马拉雅请求类型 
 * @namespace
 **/
export const XimalayaRequest = {
    /** 喜马拉雅内容分类 */
    CategoriesList : 0,
    /** 运营人员在首页推荐的专辑分类 */
    CategoriesHumanRecommend : 1,
    /** 获取专辑或声音的标签 */
    TagsList : 2,
    /** 根据分类和标签获取某个分类某个标签下的热门专辑列表 */
    AlbumsHot : 3,
    /** 根据专辑ID获取专辑下的声音列表，即专辑浏览 */
    AlbumsBrowse : 4,
    /** 批量获取专辑列表 */
    AlbumsBatch : 5,
    /** 获取全量专辑数据 */
    AlbumsAll : 6,
    /** 根据专辑ID列表获取批量专辑更新提醒信息列表 */
    AlbumsUpdateBatch : 7,
    /** 获取某个专辑的相关推荐。 */
    AlbumsRelative : 8,
    /** 获取下载听模块的推荐下载专辑 */
    AlbumsRecommendDownload : 9,
    //猜你喜欢
    AlbumsGuessLike : 10,
    //获取某个主播下的专辑列表
    AlbumsByAnnouncer : 11,
    /** 根据分类和标签获取某个分类下某个标签的热门声音列表 */
    TracksHot : 12,
    /** 批量下载声音 */
    TracksDownBatch : 13,
    /** 批量获取声音 */
    TracksBatch : 14,
    /** 根据上一次所听声音的id，获取从那条声音开始往前一页声音。 */
    TrackGetLastPlay : 15,
    /** 搜索获取专辑列表 */
    SearchAlbums : 16,
    /** 搜索获取声音列表 */
    SearchTracks : 17,
    /** 获取最新热搜词 */
    SearchHotWords : 18,
    /** 获取某个关键词的联想词 */
    SearchSuggestWords : 19,
    /** 搜索获取电台列表 */
    SearchRadios : 20,
    /** 获取指定数量直播，声音，专辑的内容 */
    SearchAll : 21,
    /** 搜索获取直播省份列表 */
    LiveProvince : 22,
    /** 搜索获取直播电台列表 */
    LiveRadio : 23,
    /** 搜索获取直播节目列表 */
    LiveSchedule : 24,
    /** 搜索获取当前直播的节目 */
    LiveProgram : 25,
    LiveCity : 26,
    LiveRadioOfCity : 27,
    LiveRadioByID : 28,
    /** 根据榜单类型获取榜单首页的榜单列表 */
    RankList : 29,
    /** 根据rank_key获取某个榜单下的专辑列表 */
    RankAlbum : 30,
    /** 根据rank_key获取某个榜单下的声音列表 */
    RankTrack : 31,
    /** 获取直播电台排行榜 */
    RankRadio : 32,
    /** 获取精品听单列表 */
    ColumnList : 33,
    /** 获取某个听单详情，每个听单包含听单简介信息和专辑或声音的列表 */
    ColumnDetail : 34,
    /** 获取榜单的焦点图列表 */
    RankBanner : 35,
    /** 获取发现页推荐的焦点图列表 */
    DiscoveryBanner : 36,
    /** 获取分类推荐的焦点图列表 */
    CategoryBanner : 37,
};
Object.freeze(XimalayaRequest)
  /**
   * 喜马拉雅事件监听, 原生SDK当中的delegate方法将通过RN的事件通知的方式传递到插件js中，
   * @namespace
   * @example 
     import {XimalayaEvent} from 'miot/service/ximalaya';
     var subscription = XimalayaEvent.LivePlayerDelegate.addListener( 
       (body) => {
         if (body.method == "XMLiveRadioPlayerDidFailWithError")
         {
           console.log(body.error);
         }
       }
     );
   * 其中delegate的具体方法名规则为：如原生delegate方法签名只有一段，则直接使用方法名字符串；如原生delegate方法签名不只一段，则用And连接各段并采用camel case：而body中的参数名直接使用原生参数名
   * 比如-(void)XMLiveRadioPlayerNotifyCacheProgress:(CGFloat)percent
   * 在js中body.method为"XMLiveRadioPlayerNotifyCacheProgress"
   * 参数为body.percent
   * 而-(void)XMLiveRadioPlayerNotifyPlayProgress:(CGFloat)percent currentTime:(NSInteger)currentTime
   * 在js中body.method为"XMLiveRadioPlayerNotifyPlayProgressAndCurrentTime"
   * 参数为body.percent和body.currentTime
   **/
export const XimalayaEvent = {
    TrackPlayerDelegate:{
    },
    LivePlayerDelegate:{
    }
};
Object.freeze(XimalayaEvent);
export default {
    /**
     * 
     * @param {*} appkey 
     * @param {*} secret 
     * @param {*} packid 
     */
    registry(appkey, secret){
    },
    /**
     * @method
     * @param {*} reqType 
     * @param {*} params 
     * @return {Promise}
     */
    request(reqType, params) {
         return Promise.resolve({});
    },
    /**
     * 
     * @method
     * @param {*} playMode 
     */
    setPlayMode(playMode) {
    },
    /**
     * 
     * @method
     * @param {*} volume 
     */
    setVolume(volume) {
    },
    /**
     * 
     * @method
     * @param {*} playlist 
     * @param {*} startidx 
     */
    playWithTrack(playlist, startidx) {
    },
    /**
     * 
     * @method
     */
    pauseTrackPlay() {
    },
    /**
     * 
     * @method
     */
    resumeTrackPlay() {
    },
    /**
     * 
     * @method
     */
    stopTrackPlay() {
    },
    /**
     * 
     * @method
     * @param {*} playlist 
     */
    replacePlayList(playlist) {
    },
    /**
     * 
     * @method
     * @param {*} callback 
     */
    playNextTrackWithCallback(callback) {
    },
    /**
     * 
     * @method
     * @param {*} callback 
     */
    playPrevTrackWithCallback(callback) {
    },
    /**
     * 
     * @method
     * @param {*} status 
     */
    setAutoNexTrack(status) {
    },
    /**
     * 
     * @method
     * @param {*} callback 
     */
    playListWithCallback(callback) {
    },
    /**
     * 
     * @method
     * @param {*} callback 
     */
    nextTrackWithCallback(callback) {
    },
    /**
     * 
     * @method
     * @param {*} callback 
     */
    prevTrackWithCallback(callback) {
    },
    /**
     * 
     * @method
     * @param {*} percent 
     */
    seekToTime(percent) {
    },
    /**
     * 
     * @method
     */
    clearCacheSafely() {
    },
    /**
     * 
     * @method
     * @param {*} trackPlayMode 
     */
    setTrackPlayMode(trackPlayMode) {
    },
    /**
     * 
     * @method
     * @param {*} callback 
     */
    currentTrackWithCallback(callback) {
    },
    /**
     * 
     * @method
     * @param {*} radio 
     */
    startLivePlayWithRadio(radio) {
    },
    /**
     * 
     * @method
     */
    pauseLivePlay() {
    },
    /**
     * 
     * @method
     */
    resumeLivePlay() {
    }, 
    /**
     * 
     * @method
     */
    stopLivePlay() {
    },
    /**
     * 
     * @method
     * @param {*} radio 
     * @param {*} program 
     */
    startHistoryLivePlayWithRadio(radio, program) {
    },
    /**
     * 
     * @method
     * @param {*} radio 
     * @param {*} program 
     * @param {*} list 
     */
    startHistoryLivePlayWithRadioInProgramList(radio, program, list) {
    },
    /**
     * 
     * @method
     * @param {*} duration 
     * @param {function} callback 
     */
    seekHistoryLivePlay(duration, callback) {
    },
    /**
     * 
     * @method
     */
    playNextProgram() {
    },
    /**
     * 
     * @method
     */
    playPreProgram() {
    },
    /**
     * 
     * @method
     * @param {*} cachePath 
     * @param {*} callback 
     */
    forceClearCacheDataForPath(cachePath, callback) {
    },
    /**
     * 
     * @method
     * @param {*} callback 
     */
    currentPlayingRadioWithCallback(callback) {
    },
    /**
     * 
     * @method
     * @param {*} callback 
     */
    currentPlayingProgramWithCallback(callback) {
    }
  }