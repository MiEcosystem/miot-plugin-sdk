
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
map.set("node_modules/@react-native-community/netinfo/src/internal/state.ts", "NetInfoState"); // 新版 NetInfo 修改了 NetInfo.fetch 方法的返回值，为兼容老版本，在此改回来。
map.set("node_modules/react-native-webview/lib/WebView.android.js", "WebView.android"); //RN610:修复webview的crash问题
map.set("node_modules/event-target-shim/dist/event-target-shim.js", "eventTargetShim"); //RN61: change console.assert to throw new TypeError

module.exports = {

    findContent(mpath) {
        const real = map.get(mpath);
        return real ? fs.readFileSync(path.join(__dirname, real)) : null;
    }

}
