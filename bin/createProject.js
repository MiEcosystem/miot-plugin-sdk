'use strict';
 
const commander = require('commander');
const path = require('path');
const fs = require("fs");

const {project_dir,API_LEVEL,SDK_VERSION,exec, execSync,makeDirs} = require("./config/common")

commander
    .version("api_level:" + API_LEVEL)
    .usage("[options] <packageName>") 
    .option("-m, --models <models>", "固件 model", "")
    .option("-u, --developer <miID>", "开发者账号","")
    .description("生成项目")
    .parse(process.argv);

const packageName = commander.args[0];
const packageDir = path.join(project_dir, "projects", packageName);

if(fs.existsSync(packageDir)){
    commander.outputHelp();
    throw "the package is exist or invalid package";
}

fs.mkdirSync(packageDir);
fs.writeFileSync(path.join(packageDir, "project.json"), `{
    "package_name": "${packageName}",
    "developer_id": "${commander.developer||''}",
    "models": "${commander.models||''}",
    "min_sdk_api_level":${API_LEVEL}
}`)
fs.writeFileSync(path.join(packageDir, "package.json"), `{
    "name": "project-${packageName.replace(/[.]/g, '-')}",
    "version": "${SDK_VERSION}",
    "scripts":{
        "start":"node ../../bin/runProject.js"
    },
    "dependencies":{
        
    }
}`)

fs.writeFileSync(path.join(packageDir, "index.ios.js"), `import "./index.js";`)

fs.writeFileSync(path.join(packageDir, "index.js"), `
    import React from 'react';
    import {Package,Device,Service,Host} from 'miot';
    import {PackageEvent, DeviceEvent} from 'miot';

    class App extends React.Component{
        render(){
            return null;
        }
    }
    Package.entry(App, ()=>{

    })
`);

fs.mkdirSync(path.join(packageDir, "resources"))
fs.mkdirSync(path.join(packageDir, "build"))

