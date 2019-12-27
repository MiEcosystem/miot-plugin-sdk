'use strict';
require('../setupBabel')();


//TRANSFORMER
const metro_transformer = require('metro-react-native-babel-transformer/src/index');
//require("node_modules/@react-native-community/cli/node_modules/metro-babel-transformer/src");

const path = require('path');
const fs = require("fs");
const { project_dir, DEV } = require("./common");

const Fixbug = require('../fixbug');

const { transform, getCacheKey } = metro_transformer;
const exportObject = {
    getCacheKey
};

const modulesMap = new Map();
function load(conf) {
    conf && (typeof (conf) != 'string') && (conf.modules || []).forEach(c => {
        modulesMap.set(c[1], c[0]);
    })
};
//发布到第三方开发环境 github 上时, 会将这里的initData替换成 modules_sdk 的内容
let initData = {"modules":[]};
// const is_dev = (typeof(initData)==='string')
function init() {
    if (modulesMap.size || !initData) {
        return;
    }
    load(initData);
    initData = null;
    if (modulesMap.size < 1 && needReplaceCode()) {
        const mp = path.join(project_dir, "bin", "config", "modules_sdk");
        let buffer = fs.existsSync(mp) ? fs.readFileSync(mp) : null;
        if (buffer) {
            load(JSON.parse(buffer.toString() || "{}"))
            buffer = null;
        }
    }
}

function needReplaceCode() {
    //第三方开发环境执行(!DEV)或非打包时执行(sdk and plugin bundles),目前 DEV 环境下就是在模拟第三方 npm run 时执行
    return (!DEV || !exportObject._miot_building);
}

/**
 *
 * assetDataPlugins,customTransformOptions,
 * enableBabelRCLookup,
 * dev,hot,inlineRequires,minify,
 * platform,projectRoot
 */
//[ 'filename', 'localPath', 'options', 'plugins', 'src' ]
//options:[ 'assetDataPlugins', 'customTransformOptions', 'enableBabelRCLookup',
//     'dev', 'hot', 'inlineRequires', 'minify',  'platform', 'projectRoot' ]
//ast:[ 'type', 'start', 'end', 'loc', 'program', 'comments', 'tokens' ]
exportObject.transform = function (conf) {
    init();
    const _modulepath = path.relative(project_dir, conf.filename);
    const fixed_modulepath = _modulepath.replace(/\\/g, "/");
    if (exportObject._miot_fixbug) {
        const exchanged = exportObject._miot_fixbug(fixed_modulepath, conf, transform);
        if (exchanged) {
            return exchanged;
        }
    }
    //fixbug
    const fixbug = Fixbug.findContent(fixed_modulepath);
    if (fixbug) {
        console.log("FIXBUG", _modulepath);
        conf.src = fixbug.toString();
        return transform(conf);
    }
    //replace
    if (needReplaceCode()) {
        const modulepath = _modulepath.replace(/\\/g, "/");
        const src = modulesMap.get(modulepath);
        if (src) {
            conf.src = src;
            conf.options.dev = false;
            conf.options.hot = false;
            conf.options.minify = true;
            conf.options.enableBabelRCLookup = false;
            conf.options.inlineRequires = true;
            return transform(conf);
        }
    }
    return transform(conf);
}

//TRANSFORMER
module.exports = exportObject;
