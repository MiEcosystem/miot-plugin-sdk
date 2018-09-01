'use strict';

const path = require('path');
const fs = require("fs");
const {Terminal} = require('metro-core');
const metro_transformer = require("metro/src/transformer")

const {project_dir,PRELUDE,PRELUDE_ID, MOD, MOD_BASE, MOD_PLUG, MOD_SDK} = require("./common")

const {transform, getCacheKey} = metro_transformer;

const term = new Terminal(process.stdout);

// const modules = require("./modules")
let inited = false;

// term.log(">>>my transformer")
/**
 * 
 * assetDataPlugins,customTransformOptions,
 * enableBabelRCLookup,
 * dev,hot,inlineRequires,minify,
 * platform,projectRoot
 */


function myTransform(conf) {
    const {filename,options,src,plugins} = conf;
    const modulepath = path.relative(project_dir, filename);
    const {dev, platform, hot} = options;
    if(!inited){
        inited = true;
        // writeInfo(platform, dev)
        term.log("transform>>>" + dev + ">" + platform + ">" + hot) 
        // Server.DEFAULT_BUNDLE_OPTIONS._miot_load_modules(platform);
    }
    
    const {ast} = transform(conf); 
    
    return {ast}
}

function writeInfo(platform, dev){
    process.env.__MIOT_PLATFORM = platform;
    process.env.__MIOT_DEBUG = dev;
    fs.writeFileSync(path.join(project_dir, "node_modules", "metro", "src", "lib", ".curtrans"),
        JSON.stringify({platform, dev}));
}

module.exports = {
    getCacheKey,
    transform:myTransform
}
