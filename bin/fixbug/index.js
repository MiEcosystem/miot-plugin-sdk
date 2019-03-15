
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

module.exports = {
    findContent(mpath) {
        const real = map.get(mpath);
        return real ? fs.readFileSync(path.join(__dirname, real)) : null;
    }
}
