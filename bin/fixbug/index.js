
const path = require('path');
const fs = require("fs");
const map = new Map();

map.set("node_modules/react-native/Libraries/Components/WebView/WebView.ios.js", "WebView.ios");

module.exports = {

    findContent(mpath){
        const real = map.get(mpath);
        return real?fs.readFileSync(path.join(__dirname, real)):null;
    }

}