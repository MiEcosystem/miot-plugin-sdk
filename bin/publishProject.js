'use strict';

const path = require('path');
const fs = require("fs");
const {project_dir,SDK_VERSION,IDX_PATH, IDX_MOD, MOD_SDK} = require("./config/common")



 //把源码写入 zip 包 (包括node_modules), 这样方便于服务器端编译执行.

 //加密上传
 