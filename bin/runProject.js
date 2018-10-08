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
const {project_dir,IDX_PATH, IDX_MOD, MOD_SDK} = require("./config/common")

// const isAbsolutePath = require('absolute-path');
const MetroResolver = require("metro-resolver");

// function isRelativeImport(filePath) {
//     return (/^[.][.]?(?:[/]|$)/.test(filePath));
//   }

MetroResolver._miot_resolve = MetroResolver.resolve;
MetroResolver.resolve = (context, moduleName, platform)=>{
  if(!context._miot_dirExists){
    context._miot_dirExists = context.dirExists;
    context.dirExists = p=>{
      // console.log("CHECK DIR :", p);
      if(p.startsWith(miotNativePath)){
        return true;
      }
      return context._miot_dirExists(p);
    }
    context._miot_doesFileExist = context.doesFileExist;
    context.doesFileExist = p=>{
      /**
       * ModuleMap {
            _raw:{ duplicates: {},
                map:
                { Share: [Object],
                    miot: [Object],
                    miot_projects: [Object] },
                mocks: {} } }
       */
      // const r = (options.moduleMap||{})._raw||{};
      // if(r.map && r.map.miot && done){
      //     done --;
      //     console.log(Object.keys(r.map.miot.g))
      // }
      if(p.startsWith(miotNativePath)){
        const name = path.relative(miotNativePath, p);
        if(name.indexOf(".") != name.lastIndexOf(".")
          || !name.endsWith(".js")
          || name.startsWith("android.")
          || name.startsWith("ios.")
          || name.startsWith("common.")
        ){
          // console.log("NOT FOUND!" + name);
          return false;
        };
        // console.log("CHECK FILE :", name);

        return true;
      }
      return context._miot_doesFileExist(p);
    }
  }
  return MetroResolver._miot_resolve(context, moduleName, platform)
}

const miotNativePath = path.join(project_dir, "miot-sdk", "native")
const DependencyGraph = require("metro/src/node-haste/DependencyGraph");
DependencyGraph._miot_load = DependencyGraph.load;
DependencyGraph.load=opt=>{
  return DependencyGraph._miot_load(opt).then(graph=>{
    // console.log(Object.keys(graph))
    const cache = graph._moduleCache;
    cache._miot_getModule = cache.getModule;
    cache.getModule = filepath=>{
      const m = cache._miot_getModule(filepath);
      if(m._sourceCode == null && filepath.startsWith(miotNativePath)){
        m._sourceCode = "";
        // console.log(filepath)
      }
      // console.log("load module:", filepath)
      return m;
    }
    return graph;
  });
}

// const ModuleResolution = require("metro/src/node-haste/DependencyGraph/ModuleResolution")


// // let done = 3;
// class ModuleResolver extends ModuleResolution.ModuleResolver{
//     constructor(options){
//         super(options)
//         /**
//          * options :[ 'dirExists', 'doesFileExist',
//   'extraNodeModules', 'isAssetFile', 'moduleCache',
//   'moduleMap', 'preferNativePlatform', 'resolveAsset', 'sourceExts' ]
//          */
//         // console.log(Object.keys(options))
//         if(!options._miot_dirExists){
//             options._miot_dirExists = options.dirExists;
//             options.dirExists = p=>{
//                 // console.log("CHECK DIR :", p);
//                 if(p.startsWith(miotNativePath)){
//                     return true;
//                 }
//                 return options._miot_dirExists(p);
//             }
//             options._miot_doesFileExist = options.doesFileExist;
//             options.doesFileExist = p=>{
//                 /**
//                  * ModuleMap {
//                 _raw:{ duplicates: {},
//                     map:
//                     { Share: [Object],
//                         miot: [Object],
//                         miot_projects: [Object] },
//                     mocks: {} } }
//                  */
//                 // const r = (options.moduleMap||{})._raw||{};
//                 // if(r.map && r.map.miot && done){
//                 //     done --;
//                 //     console.log(Object.keys(r.map.miot.g))
//                 // }
//                 if(p.startsWith(miotNativePath)){
//                     const name = path.relative(miotNativePath, p);
//                     // console.log("CHECK FILE :", name);
//                     if(name.indexOf(".") != name.lastIndexOf(".")
//                         || !name.endsWith(".js")
//                         || name.startsWith("android.")
//                         || name.startsWith("ios.")
//                         || name.startsWith("common.")
//                     ){
//                         return false;
//                     };
//                     return true;
//                 }
//                 return options._miot_doesFileExist(p);
//             }
//         }
//     }
// }

// ModuleResolution.ModuleResolver = ModuleResolver;

// commander
//     .version("api_level:" + API_LEVEL)
//     .option("-r, --resetCache", "清空缓存")
//     .description("启动调试")
//     .parse(process.argv);

// console.log(commander)

//reset config
// const Config = require('metro/src/Config')
const {DEFAULT} = require('react-native/local-cli/util/Config')

// const {Terminal} = require('metro-core');
// const term = new Terminal(process.stdout)

// term.log("begin to set confg..." + DEFAULT.aaaa)
// DEFAULT.aaaa = "bbb";

// const metro_transformer = require("metro/src/transformer");
// const {transform} = metro_transformer;
// metro_transformer.AAA = "AAA"

// DEFAULT.getTransformOptions=()=>{
//     // metro_transformer.transform = conf=>{
//     //     console.log("===========>>>>>?????")
//     //     return transform(conf);
//     // }
//     // console.log("why???")
//     const moduleMap = {};
//     let buffer = fs.readFileSync(path.join(project_dir, "bin", "config", "modules"));
//     if(buffer){
//         const conf = JSON.parse(buffer.toString()||"{}");
//         (conf.modules||[]).filter(c=>c&&c[IDX_MOD]==MOD_SDK).forEach(c=>{
//             const p = path.join(project_dir, c[IDX_PATH]);
//             moduleMap[path.resolve(p)] = true;
//         })
//         buffer = null;
//     }
//     return {
//       preloadedModules: moduleMap,
//       transform: { inlineRequires: { blacklist: moduleMap } },
//     };
// }

DEFAULT.getTransformModulePath=()=>{
  return path.join(project_dir, "bin", "config", "transformer.js")
}

// DEFAULT.postProcessBundleSourcemap = (m) => {
//     let code = m.code,
//         map = m.map,
//         outFileName = m.outFileName;
//         term.log("=========>" + outFileName)
//     return {
//         code,
//         map
//     };
// }


// const defaultModules = DEFAULT.getModulesRunBeforeMainModule();
// DEFAULT.getModulesRunBeforeMainModule=()=>{
//     term.log("?????getModulesRunBeforeMainModule>>>" + defaultModules)
//     // return [PRELOAD_MODULE_PATH, ...defaultModules];
//     return defaultModules;
// }

// DEFAULT.postProcessModules=modules=>{
//     term.log("post process .............")
//     return modules;
// }

//create moduleId
// const moduleIdMap = new Map();
// let nextPluginId = 0;
// Server.DEFAULT_BUNDLE_OPTIONS._miot_load_modules=(platform)=>{
//     if(nextPluginId){
//         return;
//     }
//     nextPluginId = 1;
//     let buffer = fs.readFileSync(path.join(project_dir, "bin", "config", platform));
//     if(buffer){
//         const conf = JSON.parse(buffer.toString()||"{}");
//         (conf.modules||[]).forEach(c=>{
//             moduleIdMap.set(c[1],c[0]);
//         })
//         buffer = null;
//     }
// }

// const Server = require('metro/src/Server')
// Server.DEFAULT_BUNDLE_OPTIONS.isolateModuleIDs = true;
// Server.DEFAULT_BUNDLE_OPTIONS.createModuleIdFactory=()=>{
//     term.log("createModuleIdFactory>>>>>>>>>>>")
//     return modulePath => {
//         if(modulePath == PRELUDE){
//           return PRELUDE_ID;
//         }
//         if(_path == PRELOAD_MODULE_PATH){
//             return PRELOAD_MODULE_ID;
//         }
//         if(!nextPluginId){
//             throw "FATAL ERROR!!!";
//         }
//         const _path = path.relative(project_dir, modulePath);
//         let id = moduleIdMap.get(_path);
//         if(!id){
//           id = PRELUDE_ID + nextPluginId;
//           nextPluginId += STEP;
//         }
//         moduleIdMap.set(_path, id);
//         return id;
//       };
// }

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
require('react-native/local-cli/cliEntry').run();


