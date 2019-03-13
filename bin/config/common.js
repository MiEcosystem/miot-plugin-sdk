'use strict';

const { spawn,execSync } = require('child_process'); 
const path = require('path');
const fs = require("fs");

//get current path
const project_dir = path.join(__dirname, "..", "..");
const process_dir = process.cwd();
//will be changed to false when export to github
const DEV=fs.existsSync(path.join(project_dir, "bin", "config", "common_dev.js"));

process.chdir(project_dir)
process.on('uncaughtException', e=>{
  e&&console.log(e);
  process.exit(100)
})
try{
  (function(...args){return [2,...args]})(1)
}catch(err){
  console.log("PLEASE USE NODE v9 AT LEAST")
  process.exit(101)
}

if(!DEV){
  fs.chmodSync(path.join(project_dir, "package.json"), 0o444);
}

const sdkconf = JSON.parse(fs.readFileSync(path.join(project_dir, "miot-sdk", "package.json")).toString());
const API_LEVEL = sdkconf.api_level;
const SDK_VERSION = Math.floor(API_LEVEL / 10000) + "." 
                  + Math.floor((API_LEVEL % 10000)/100) + "."
                  + (API_LEVEL % 100);
sdkconf.version = SDK_VERSION;

const ANDROID = "android"
const IOS = "ios"

const IDX_ANDROID = 0
const IDX_IOS = 1
const IDX_MOD = 2
const IDX_PATH = 3
const IDX_TYPE = 4

const TYPE_MODULE = 1
const TYPE_ASSET = 2

const SUPPORTED_ASSET_FILE_TYPES = ["jx", "txt", "bin", "htm", "ogg", "db", "svg", "ico",
        "zip", "gz", "pdf", "xls", "tmp", "doc", "mid", "dat", "dta", "data",
        "mp3", "wma","avi", "rm", "rmvb", "flv", "mpg", "mpeg","mov", "mkv", "qt"];

function objectWithoutProperties(obj, ...keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

function exec(command, args=[], onFinish=null, ignore_out=false){
    const cmd = spawn(command, args);
    cmd.stdout.on('data', (data) => {
      ignore_out || console.log(data.toString());
    });
    cmd.stderr.on('data', (data) => {
      ignore_out || console.log(`error：${data}`); 
    });
    cmd.on('close', (code) => { 
      onFinish&&onFinish(code); 
    });
}

function absolutePath(p){
  if(!p || p.length < 1)return null;
  return path.isAbsolute(p)?p:path.join(process_dir, p);
}

function makeDirsSync(srcPath){
  if(!srcPath || srcPath.length < 1 || fs.existsSync(srcPath)){
    return;
  }
  console.log(srcPath)
  makeDirsSync(path.dirname(srcPath)); 
  fs.mkdirSync(srcPath); 
}

function copyFileSync(srcPath, tarPath){
  fs.writeFileSync(tarPath, fs.readFileSync(srcPath))
}

function copyFile(srcPath, tarPath, cb) {
   
  // console.log("copy_file", srcPath, tarPath)
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
        const _p = path.relative(rootDir||srcDir,_path);
        if(!onFile.onDir||onFile.onDir(path.relative(rootDir||srcDir,_path))){
          loadFiles(_path, onFile, rootDir||srcDir);
          onFile&&onFile.afterDir&&onFile.afterDir(_p)
        }
      }else if(stat.isFile()){
        (onFile.onFile||onFile)(path.relative(rootDir||srcDir,_path));
      } 
  })
}

function loadAllFiles(src){
  const arr=[];
  loadFiles(src, p=>arr.push(p.replace(/\\/g,"/")))
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

function removeDir(srcPath){
  fs.existsSync(srcPath) && loadFiles(srcPath, {
    afterDir(p){
      fs.rmdirSync(path.join(srcPath, p))
    },
    onFile(p){
      fs.unlinkSync(path.join(srcPath, p))
    }
  })
}

module.exports = {
    DEV,
    project_dir, 
    process_dir,

    sdkconf,
    API_LEVEL,
    SDK_VERSION,

    ANDROID,
    IOS,
    IDX_ANDROID,
    IDX_IOS,
    IDX_MOD,
    IDX_PATH,
    IDX_TYPE,
    
    TYPE_MODULE,
    TYPE_ASSET,
    SUPPORTED_ASSET_FILE_TYPES,

    exec,
    execSync,
    
    copyFile,
    copyFileSync,
    copyFolder,
    makeDirs,
    makeDirsSync,
    absolutePath,
 
    loadAllFiles,
    loadFiles,

    removeDir, 

    objectWithoutProperties 
}