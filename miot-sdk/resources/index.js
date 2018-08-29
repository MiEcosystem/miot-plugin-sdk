/**
 * @export
 * @module miot/resources
 * @description 系统提供的静态资源, 包括图片, 文字, 基础 styleSheet css 等等
 *
 * import res from "miot/resources"
 *
 * res.logo
 * res.strings.mijia
 *
 */

import native,{Utils} from '../native'


const GetResource=path=>{
    // if(native.MIOTPackage.buildType == "debug"){

    // }

}


// const logo = {uri:native.localFileOf(""), width:100, height:100}

export default {
    get logo(){
        return "";
    },
    get strings(){
        const lang = native.getLanguage();
        return {};
    }
}
