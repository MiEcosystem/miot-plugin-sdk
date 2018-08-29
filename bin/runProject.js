'use strict';
 
const commander = require('commander');
const path = require('path');
const fs = require("fs");

const {project_dir,API_LEVEL,exec} = require("./config/common")

commander
    .version("api_level:" + API_LEVEL) 
    .option("-r, --resetCache", "清空缓存")
    .description("启动调试")
    .parse(process.argv);

function runBundle(onFinish=null){ 
    console.log("[MIOT]start to debug bundle"); 
    let args = [
        "node_modules/react-native/local-cli/cli.js",
        "start", 
        "--config", path.join("..","..","..","..", "bin", "config", "configForDebug.js" )
    ]
    exec("node", commander.resetCache?[...args, "--reset-cache"]:args, onFinish);
}

const target = path.join(project_dir, "node_modules", "metro", "src", "lib", "createModuleIdFactory.js");
const metro_path = path.join(project_dir, "bin") 
fs.unlink(target, ()=>{
    fs.writeFileSync(target, fs.readFileSync(path.join(metro_path, "config", "createModuleIdFactory.js")));
    runBundle();
})