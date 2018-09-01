'use strict';
 
const commander = require('commander');
const path = require('path');
const fs = require("fs");

const {project_dir,API_LEVEL,exec, execSync,makeDirs} = require("./config/common")

commander
    .version("api_level:" + API_LEVEL)
    .usage("[options] <packageName>") 
    .option("-m, --models <models>", "固件 model", "")
    .option("-u, --developer <miID>", "开发者账号","")
    .description("生成项目")
    .parse(process.argv);

const packageName = commander.args[0];
const packageDir = path.join(project_dir, packageName);

if(fs.existsSync(packageDir)){
    return;
}

fs.mkdirSync(packageDir);
fs.writeFileSync(path.join(packageDir, "packageInfo.json"), `{
    "package_name": "${packageName}",
    "developer_id": "${commander.developer||''}",
    "models": "${commander.models||''}",
    "min_api_level": "${API_LEVEL}",
    "version": "0"
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

