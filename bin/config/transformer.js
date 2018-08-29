'use strict';

const metro_transformer = require("metro/src/transformer")
const {transform, getCacheKey} = metro_transformer;

let done = false;
function myTransform(conf) {
    // options = options || {
    //   assetDataPlugins: [],
    //   platform: '',
    //   projectRoot: '',
    //   inlineRequires: false,
    //   minify: false
    // };
    const {ast} = transform(conf);
    if(!done){
        const {filename,options,src,plugins} = conf;
        console.log(filename)
        // console.log(options)
        // console.log(plugins)
        // console.log(src)
        // console.log(ast)
        done=true;
    }
    return {ast}
}

module.exports = {
    getCacheKey,
    transform:myTransform
}
