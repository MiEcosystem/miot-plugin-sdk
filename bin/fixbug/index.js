
const path = require('path');
const fs = require("fs");
const map = new Map();

map.set("node_modules/react-native/Libraries/Components/WebView/WebView.ios.js", "WebView.ios");
map.set("node_modules/react-native/Libraries/Renderer/ReactFabric-dev.js", "ReactFabric-dev");//三只截屏 crash 的问题
map.set("node_modules/react-native/Libraries/Renderer/ReactFabric-prod.js", "ReactFabric-prod");//三只截屏 crash 的问题
map.set("node_modules/react-native/Libraries/Renderer/ReactNativeRenderer-dev.js", "ReactNativeRenderer-dev");//三只截屏 crash 的问题
map.set("node_modules/react-native/Libraries/Renderer/ReactNativeRenderer-prod.js", "ReactNativeRenderer-prod");//三只截屏 crash 的问题
map.set("node_modules/react-native-sqlite-storage/lib/sqlite.core.js", "sqlite.core");//从代码目录读取数据库，参数使用方式修改
map.set("node_modules/react-navigation-stack/dist/views/Header/HeaderBackButton.js", "HeaderBackButton"); // 
map.set("node_modules/react-navigation/src/createNavigationContainer.js", "createNavigationContainer"); // 
map.set("node_modules/react-native/Libraries/Text/Text.js", "Text"); //TypeError: undefined is not an object (evaluating '_reactNative.Text.prototype.render') 
map.set("node_modules/react-native/Libraries/Image/Image.ios.js", "Image.ios"); //修复TypeError: undefined is not an object (evaluating '_reactNative.Image.resizeMode.contain')
map.set("node_modules/react-native/Libraries/Image/Image.android.js", "Image.android"); //修复TypeError: undefined is not an object (evaluating '_reactNative.Image.resizeMode.contain')
map.set("node_modules/@react-native-community/netinfo/src/index.ts", "NetInfoIndex"); // 新版 NetInfo 修改了 NetInfo.fetch 方法的返回值，为兼容老版本，在此改回来。
map.set("node_modules/react-native-webview/lib/WebView.android.js", "WebView.android"); //RN610:修复webview的crash问题
map.set("node_modules/event-target-shim/dist/event-target-shim.js", "eventTargetShim"); //RN61: change console.assert to throw new TypeError
map.set("node_modules/react-native/Libraries/Modal/Modal.js", "Modal"); //RN610:修复_reactNative.Modal.propType crash问题
map.set("node_modules/react-native-swiper/src/index.js","react-native-swiper.index");//RN610:修复swiper中android端不使用ViewPagerAndroid渲染scrollView的问题
map.set("node_modules/react-native/Libraries/Alert/Alert.js", "Alert") // RN61: 修复 alert 被意外重写的问题
map.set("node_modules/react-navigation/src/routers/createConfigGetter.js", "YeelightNavigation") // 61升级之后 Yeelight 收藏页面的 headerTitle 显示了出来，在此将 headerTitle 设置为 “”，  Yeelight 修复后将其删掉。
map.set("node_modules/react-native-svg/elements/Svg.js", "react-native-svg") // 61升级之后 svg parseInt 导致宽高精度丢失，从而导致背景等不能完全填充，出现白色边框
module.exports = {

    findContent(mpath) {
        const real = map.get(mpath);
        return real ? fs.readFileSync(path.join(__dirname, real)) : null;
    }

}
