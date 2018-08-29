'use strict';

const path = require('path');
const fs = require("fs");

const project_dir = path.join(__dirname, "..","..","..","..");
console.log(project_dir);
const PRELUDE = "__prelude__";
let PRELUDE_ID = 10000;
const MOD_SDK = 0;
const MOD_BASE = 1;
const MOD_PLUG = 2;
const REGEX_SDK = /^miot-sdk\/.+/;
const REGEX_BASE = /^node_modules\/.+/;

const moduleIdMap = new Map(); 
let nextSdkId = 2, nextBaseId = 3, nextPluginId = 1; 
 
function loadModules(){ 
  if(moduleIdMap.size > 0 || !process.env._MIOT_CONFIG){
    return;
  }
  if(!process.env._FOR_MIOT_BASE){
    const conf_file = path.join(project_dir, "bin", "config", "modules")
    console.log(conf_file)
    const buffer = fs.readFileSync(conf_file);
    if(buffer){
        const conf = buffer.toJSON()||{};
        (conf.modules||[]).forEach(c=>{
            moduleIdMap.set(c[1],c[0]);
        })
        PRELUDE_ID = conf.prelude || PRELUDE_ID;
        if(conf.maxSdk){
            nextSdkId = conf.maxSdk - PRELUDE_ID;
        }
        if(conf.maxBase){
            nextBaseId = conf.maxBase - PRELUDE_ID;
        }
    }
  }
}

function createModuleIdFactory() {
    loadModules()
    return modulePath => {
      loadModules();
      if(modulePath == PRELUDE){
        return PRELUDE_ID;
      }
      const _path = path.relative(project_dir, modulePath);
      let id = moduleIdMap.get(_path);
      if(id){
        return id;
      } 
      const in_project = _path != modulePath;
      if(in_project){
        if(REGEX_SDK.test(_path)){
          id = PRELUDE_ID + nextSdkId;
          nextSdkId += 3;
        }else if(REGEX_BASE.test(_path)){
          id = PRELUDE_ID + nextBaseId;
          nextBaseId += 3;
        }
      }
      if(!id){
        id = PRELUDE_ID + nextPluginId;
        nextPluginId += 3;
      }
      moduleIdMap.set(_path, id); 
       
      return id;
    };
  }

module.exports = createModuleIdFactory;