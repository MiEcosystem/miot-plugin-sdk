'use strict';

const { spawn,execSync } = require('child_process'); 
const path = require('path');
const fs = require("fs");

const sdkconf = require('../../miot-sdk/package.json');
const project_dir = path.join(__dirname, "..", "..");

const API_LEVEL_IOS = sdkconf.api_level_ios;
const API_LEVEL_ANDROID = sdkconf.api_level_android;
const API_LEVEL_REACT = sdkconf.api_level_react;
const API_LEVEL = API_LEVEL_REACT + API_LEVEL_IOS + API_LEVEL_ANDROID;

const PRELUDE = "__prelude__";
const PRELUDE_ID = 10000;
const STEP = 3;
const MOD = id=>(id%STEP);
const MOD_SDK = 0;
const MOD_BASE = 1;
const MOD_PLUG = 2;

function exec(command, args=[], onFinish=null){
    const cmd = spawn(command, args);
    cmd.stdout.on('data', (data) => {
        console.log(data.toString());
    });
    cmd.stderr.on('data', (data) => {
        console.log(`error：${data}`);
    });
    cmd.on('close', (code) => { 
        onFinish&&onFinish(code);
    });
}

function copyFile(srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function (err) {
      if (err) {
        console.log('read error', srcPath)
      }
      cb && cb(err)
    })
  
    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function (err) {
      if (err) {
        console.log('write error', tarPath)
      }
      cb && cb(err)
    })
    ws.on('close', function (ex) {
      cb && cb(ex)
    })
  
    rs.pipe(ws)
  }
  
function copyFolder(srcDir, tarDir, cb = null) {
    fs.readdir(srcDir, function (err, files) {
      var count = 0
      var checkEnd = function () {
        ++count == files.length && cb && cb()
      }
  
      if (err) {
        checkEnd()
        return
      }
  
      files.forEach(function (file) {
        var srcPath = path.join(srcDir, file)
        var tarPath = path.join(tarDir, file)
  
        fs.stat(srcPath, function (err, stats) {
          if (stats.isDirectory()) {
            // console.log('mkdir', tarPath)
            fs.mkdir(tarPath, function (err) {
              if (err) {
                console.log(err)
                return
              }
              copyFolder(srcPath, tarPath, checkEnd)
            })
          } else {
            copyFile(srcPath, tarPath, checkEnd)
          }
        })
      })
  
      files.length === 0 && cb && cb()
    })
}

function loadFiles(srcDir, onFile=null, rootDir=null) { 
  (fs.readdirSync(srcDir)||[]).forEach(f=>{
      const _path = path.join(srcDir, f)
      const stat = fs.statSync(_path);
      if(stat.isDirectory()){
          loadFiles(_path, onFile, rootDir||srcDir);
      }else if(stat.isFile()){
        onFile(path.relative(rootDir||srcDir,_path));
      } 
  })
}

function loadAllFiles(src){
  const arr=[];
  loadFiles(src, p=>arr.push(p))
  return arr;
}

function makeDirs(filepath,callback=null){
    fs.exists(filepath,function(exists){
        if(exists){
            callback&&callback();
        }
        else{
            makeDirs(path.dirname(filepath),function(){
                fs.mkdir(filepath,callback||(()=>{}));
            });
        }
    });
}

module.exports = {
    sdkconf,
    project_dir,
    API_LEVEL_IOS,
    API_LEVEL_ANDROID,
    API_LEVEL_REACT,
    API_LEVEL,

    PRELUDE,
    PRELUDE_ID,
    PRELUDEID:PRELUDE_ID,
    STEP,
    MOD,
    MOD_SDK,
    MOD_BASE,
    MOD_PLUG,

    exec,
    execSync,
    
    copyFile,
    copyFolder,
    makeDirs,
 
    loadAllFiles,
    loadFiles
}