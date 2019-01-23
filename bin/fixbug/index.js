
const path = require('path');
const fs = require("fs");
const map = new Map();

map.set("node_modules/react-native/Libraries/Components/WebView/WebView.ios.js", "WebView.ios");
map.set("node_modules/react-native/Libraries/Renderer/ReactFabric-dev.js", "ReactFabric-dev");//三只截屏 crash 的问题
map.set("node_modules/react-native/Libraries/Renderer/ReactFabric-prod.js", "ReactFabric-prod");//三只截屏 crash 的问题
map.set("node_modules/react-native/Libraries/Renderer/ReactNativeRenderer-dev.js", "ReactNativeRenderer-dev");//三只截屏 crash 的问题
map.set("node_modules/react-native/Libraries/Renderer/ReactNativeRenderer-prod.js", "ReactNativeRenderer-prod");//三只截屏 crash 的问题
map.set("node_modules/react-native-sqlite-storage/lib/sqlite.core.js", "sqlite.core");//从代码目录读取数据库，参数使用方式修改
map.set("node_modules/metro/src/lib/polyfills/require.js", "require");// miot 使用最新的 sdkbundle 排重逻辑 。 打 bundle 时 DeltaTransformer._addDependencyMap去掉if (this._bundleOptions.dev) 判断，require.js每个 __d 添加参数 path,如果 path 相同使用先加载的 moduleId

module.exports = {

    findContent(mpath){
        const real = map.get(mpath);
        return real?fs.readFileSync(path.join(__dirname, real)):null;
    }

}
