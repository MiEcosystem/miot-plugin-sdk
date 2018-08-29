var MHGlobal = {}
var { Platform, PixelRatio } = require('react-native');
import { Host } from 'miot';
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
let APPBAR_MARGINTOP = 20;
let EDIT_FOOTER_HEIGHT = 56;
let mobileModel = Host.systemInfo ? Host.systemInfo.mobileModel : ""
if (mobileModel === "iPhone10,3" || mobileModel === "iPhone10,6") {
    APPBAR_MARGINTOP = 40;
    EDIT_FOOTER_HEIGHT = 80;
}
MHGlobal.RATIO = 1 / PixelRatio.get();
MHGlobal.APPBAR_HEIGHT = APPBAR_HEIGHT;
MHGlobal.EDIT_FOOTER_HEIGHT = EDIT_FOOTER_HEIGHT;
MHGlobal.APPBAR_MARGINTOP = APPBAR_MARGINTOP;
MHGlobal.APP_MARGINTOP = 0;
MHGlobal.deviceName = Host.deviceName;
MHGlobal.pluginVersion = "0.0.36";
MHGlobal.configUrl = 'https://api.io.mi.com/app/service/getappconfig?data=';
MHGlobal.env = 1;   //   0: preview;   1: product     Chrome环境和线上环境对于Date某些API表现不同
MHGlobal.ring = {
    "alarm": [
        { "isSelected": true, "title": "Crystal", "name": "a1.mp3", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_a3bb84a90b4df894c228dce4d5ccebae.mp3" },
        { "isSelected": false, "title": "Chirp", "name": "a2.mp3", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_9e71778c15610373488a6ab25d67c6cc.mp3" },
        { "isSelected": false, "title": "Guitar", "name": "a3.mp3", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_32f0d697b3aaedd012e144fa148d29c7.mp3" },
        { "isSelected": false, "title": "Bells", "name": "a4.mp3", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_c0bbc6bbd955e8122c9267c98867046a.mp3" },
        { "isSelected": false, "title": "MusicBox", "name": "a5.mp3", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_e2e18364ca2a0e603e73e7906c161e24.mp3" },
        { "isSelected": false, "title": "Breeze", "name": "a6.mp3", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_98c6da86995f0c57789be2b591f6c486.mp3" },
        { "isSelected": false, "title": "Blues", "name": "a7.mp3", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_473ef3c444ad1e9305b4c4f698818f8b.mp3" },
        { "isSelected": false, "title": "Enthusiastic", "name": "a8.mp3", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_f2d92e51babf3b81917a0e475781ee80.mp3" },
        { "isSelected": false, "title": "Future", "name": "a9.mp3", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_bb85dc98b403e950723d80fed16d52a2.mp3" },
        { "isSelected": false, "title": "MiXylophone", "name": "a10.mp3", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_c86fada9dcc2187b13afdaedb3b1856f.mp3" },
        { "isSelected": false, "title": "Childhood", "name": "a11.mp3", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_bf6b658c103854e8e2ab6ae3521bf690.mp3" }
    ],
    "reminder": [
        { "name": "r1.mp3", "title": "Moment", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_c0a8cc34826719c88d80eab5d88cd186.mp3" }
    ],
    "timer": [
        { "name": "c1.mp3", "title": "Beep", "url": "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp3_6a51366905e24ecaf7c9dbe853745ff4.mp3" }
    ]
};
MHGlobal.workday = {
    "holidays": [20180101, 20180215, 20180216, 20180217, 20180218, 20180219, 20180220, 20180221, 20180405, 20180406, 20180407, 20180429, 20180430, 20180501, 20180618, 20180924, 20181001, 20181002, 20181003, 20181004, 20181005, 20181006, 20181007],
    "workdays": [20180211, 20180224, 20180408, 20180428, 20180929, 20180930]
};
module.exports = MHGlobal