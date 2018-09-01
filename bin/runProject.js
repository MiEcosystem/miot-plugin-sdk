/** 
 * 运行 debug
 * 
 * npm start 
 * 
 */
'use strict';

//init react native
require('graceful-fs').gracefulify(require('fs'));
require('react-native/local-cli/server/checkNodeVersion')();
require('react-native/setupBabel')();

// const commander = require('commander');
const path = require('path');
const fs = require("fs");
const {project_dir, API_LEVEL,
    PRELUDE,PRELUDEID, STEP,
    MOD, MOD_PLUG,makeDirs} = require("./config/common")
let PRELUDE_ID = PRELUDEID;

// commander
//     .version("api_level:" + API_LEVEL) 
//     .option("-r, --resetCache", "清空缓存")
//     .description("启动调试")
//     .parse(process.argv);

// console.log(commander)
 
//reset config
// const Config = require('metro/src/Config')
const Server = require('metro/src/Server')
const {DEFAULT} = require('react-native/local-cli/util/Config')

const {Terminal} = require('metro-core');
const term = new Terminal(process.stdout) 

// term.log("begin to set confg..." + DEFAULT.aaaa)
// DEFAULT.aaaa = "bbb";

// Config.DEFAULT.getTransformOptions=()=>{
//     const moduleMap = {};
//     // modulePaths.forEach(path => {
//     //   if (fs.existsSync(path)) {
//     //     moduleMap[resolve(path)] = true;
//     //   }
//     // });
//     term.log(">>>>getTransformOptions")
//     return {
//       preloadedModules: moduleMap,
//       transform: { inlineRequires: { blacklist: moduleMap } },
//     };
// }
//node_modules/react-native/local-cli/bundle/assetPathUtils.js
DEFAULT.getTransformModulePath=()=>{
  term.log(">>>>>>>getTransformModulePath")
  return path.join(project_dir, "bin", "config", "transformer.js")
}
const PRELOAD_MODULE_PATH = path.join(project_dir, "bin", "config", "common.js");
const PRELOAD_MODULE_ID = 999;

const defaultModules = DEFAULT.getModulesRunBeforeMainModule();
DEFAULT.getModulesRunBeforeMainModule=()=>{
    term.log("?????getModulesRunBeforeMainModule>>>" + defaultModules)
    // return [PRELOAD_MODULE_PATH, ...defaultModules];
    return defaultModules;
}

// DEFAULT.postProcessModules=modules=>{
//     term.log("post process .............")
//     return modules;
// }

//create moduleId
const moduleIdMap = new Map(); 
let nextPluginId = 0;
Server.DEFAULT_BUNDLE_OPTIONS._miot_load_modules=(platform)=>{
    if(nextPluginId){
        return;
    }
    nextPluginId = 1;
    let buffer = fs.readFileSync(path.join(project_dir, "bin", "config", platform));
    if(buffer){
        const conf = JSON.parse(buffer.toString()||"{}");
        (conf.modules||[]).forEach(c=>{
            moduleIdMap.set(c[1],c[0]);
        }) 
        buffer = null;
    }
}
Server.DEFAULT_BUNDLE_OPTIONS.isolateModuleIDs = true;
Server.DEFAULT_BUNDLE_OPTIONS.createModuleIdFactory=()=>{
    term.log("createModuleIdFactory>>>>>>>>>>>")
    return modulePath => {
        if(modulePath == PRELUDE){
          return PRELUDE_ID;
        }
        if(_path == PRELOAD_MODULE_PATH){
            return PRELOAD_MODULE_ID;
        }
        if(!nextPluginId){
            throw "FATAL ERROR!!!";
        }
        const _path = path.relative(project_dir, modulePath);
        let id = moduleIdMap.get(_path);
        if(!id){
          id = PRELUDE_ID + nextPluginId;
          nextPluginId += STEP;
        }
        moduleIdMap.set(_path, id);
        return id;
      };
}

//remove config
process.argv = ["", "", "start", 
// "--transformer", path.join(project_dir, "bin", "config", "transformer.js"),
// "--config", path.join("..","..","..","..", "bin", "config", "configForDebug.js" ),
"--reset-cache"];
// if(commander.resetCache){
//     process.argv = [...process.argv, "--reset-cache"]
// }
// console.log(process.argv)
//run command
var cliEntry = require('react-native/local-cli/cliEntry');
if (require.main === module) {
  cliEntry.run();
}
module.exports = cliEntry;

