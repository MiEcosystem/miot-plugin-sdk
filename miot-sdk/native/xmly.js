import{DeviceEventEmitter}from"react-native";import native from"./index";export const XimalayaRequest={CategoriesList:0,TagsList:1,AlbumsList:2,AlbumsBrowse:3,AlbumsBatch:4,AlbumsUpdateBatch:5,TracksHot:6,TracksBatch:7,TrackGetLastPlay:8,MetadataList:9,MetadataAlbums:10,LiveProvince:11,LiveRadio:12,LiveSchedule:13,LiveProgram:14,LiveCity:15,LiveRadioOfCity:16,LiveRadioByID:17,LiveRadioCategories:18,LiveGetRadiosByCategory:19,SearchAlbums:20,SearchTracks:21,SearchHotWords:22,SearchSuggestWords:23,SearchRadios:24,SearchAll:25,SearchAnnouncers:26,AlbumsRelative:27,TracksRelativeAlbum:28,AlbumsRecommendDownload:29,AlbumsGuessLike:30,DiscoveryRecommendAlbums:31,CategoryRecommendAlbums:32,RankList:33,RankAlbum:34,RankTrack:35,RankRadio:36,ColumnList:37,ColumnDetail:38,RankBanner:39,DiscoveryBanner:40,CategoryBanner:41};Object.freeze(XimalayaRequest);export const XimalayaEvent={TrackPlayerDelegate:{addListener:a=>DeviceEventEmitter.addListener("MHEventXimalayaTrackPlayerDelegate",a)},LivePlayerDelegate:{addListener:a=>DeviceEventEmitter.addListener("MHEventXimalayaLivePlayerDelegate",a)}};Object.freeze(XimalayaEvent);export default{registry:(a,e,i=-1,t="")=>native.isAndroid?new Promise((i,l)=>{native.MIOTXimalaya.registry(a,e,t),i("finish")}):new Promise((t,l)=>{-1!=i?native.MIOTXimalaya.registerForMiHomeWithType(i,a=>{a.reqOK?t(a):l(a)}):native.MIOTXimalaya.registry(a,e,a=>{a.reqOK?t(a):l(a)})}),request:(a,e)=>new Promise((i,t)=>{native.MIOTXimalaya.requestXMData(a,e,(a,e)=>{e?t(e):i(a)})}),requestByAndroid:(a,e,i)=>new Promise((t,l)=>{native.MIOTXimalaya.requestXMData(a,e,i,(a,e)=>{e?l(e):t(a)})}),setPlayMode(a){native.MIOTXimalaya.setPlayMode(a)},setVolume(a){native.MIOTXimalaya.setVolume(a)},playWithTrack(a,e){native.MIOTXimalaya.playWithTrack(a,e)},pauseTrackPlay(){native.MIOTXimalaya.pauseTrackPlay()},resumeTrackPlay(){native.MIOTXimalaya.resumeTrackPlay()},stopTrackPlay(){native.MIOTXimalaya.stopTrackPlay()},replacePlayList(a){native.MIOTXimalaya.replacePlayList(a)},playNextTrackWithCallback(a){native.MIOTXimalaya.playNextTrackWithCallback(a)},playPrevTrackWithCallback(a){native.MIOTXimalaya.playPrevTrackWithCallback(a)},setAutoNexTrack(a){native.MIOTXimalaya.setAutoNexTrack(a)},playListWithCallback(a){native.MIOTXimalaya.playListWithCallback(a)},nextTrackWithCallback(a){native.MIOTXimalaya.nextTrackWithCallback(a)},prevTrackWithCallback(a){native.MIOTXimalaya.prevTrackWithCallback(a)},seekToTime(a){native.MIOTXimalaya.seekToTime(a)},clearCacheSafely(){native.MIOTXimalaya.clearCacheSafely()},setTrackPlayMode(a){native.MIOTXimalaya.setTrackPlayMode(a)},currentTrackWithCallback(a){native.MIOTXimalaya.currentTrackWithCallback(a)},startLivePlayWithRadio(a){native.MIOTXimalaya.startLivePlayWithRadio(a)},pauseLivePlay(){native.MIOTXimalaya.pauseLivePlay()},resumeLivePlay(){native.MIOTXimalaya.resumeLivePlay()},stopLivePlay(){native.MIOTXimalaya.stopLivePlay()},startHistoryLivePlayWithRadio(a,e){native.MIOTXimalaya.startHistoryLivePlayWithRadio(a,e)},startHistoryLivePlayWithRadioInProgramList(a,e,i){native.MIOTXimalaya.startHistoryLivePlayWithRadioInProgramList(a,e,i)},seekHistoryLivePlay(a,e){native.MIOTXimalaya.seekHistoryLivePlay(a,e)},playNextProgram(){native.MIOTXimalaya.playNextProgram()},playPreProgram(){native.MIOTXimalaya.playPreProgram()},forceClearCacheDataForPath(a,e){native.MIOTXimalaya.forceClearCacheDataForPath(a,e)},currentPlayingRadioWithCallback(a){native.MIOTXimalaya.currentPlayingRadioWithCallback(a)},currentPlayingProgramWithCallback(a){native.MIOTXimalaya.currentPlayingProgramWithCallback(a)}};