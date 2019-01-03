
const path = require('path');
const fs = require("fs");
const map = new Map();

map.set("node_modules/react-native/Libraries/Components/WebView/WebView.ios.js", "WebView.ios");
map.set("node_modules/react-native/Libraries/Renderer/ReactFabric-dev.js", "ReactFabric-dev");
map.set("node_modules/react-native/Libraries/Renderer/ReactFabric-prod.js", "ReactFabric-prod");
map.set("node_modules/react-native/Libraries/Renderer/ReactNativeRenderer-dev.js", "ReactNativeRenderer-dev");
map.set("node_modules/react-native/Libraries/Renderer/ReactNativeRenderer-prod.js", "ReactNativeRenderer-prod");
map.set("node_modules/react-native-sqlite-storage/lib/sqlite.core.js", "sqlite.core");

module.exports = {

    findContent(mpath){
        const real = map.get(mpath);
        return real?fs.readFileSync(path.join(__dirname, real)):null;
    }

}
