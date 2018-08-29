'use strict';

const path = require('path');
const fs = require("fs");

const PRELUDE = "__prelude__";
const PRELUDE_ID = 10000;
const MOD_SDK = 0;
const MOD_BASE = 1;
const MOD_PLUG = 2;

const project_dir = path.join(__dirname, "..", "..");
process.env._MIOT_CONFIG = true;

function postProcessModules(modules, entryPoints){
    //try to reset base module contents
    return modules.filter(m=>(m.id%3)==MOD_PLUG);
}

// function getTransformModulePath(){
//     return null;
// }

module.exports = {
    postProcessModules,
    // getTransformModulePath
}