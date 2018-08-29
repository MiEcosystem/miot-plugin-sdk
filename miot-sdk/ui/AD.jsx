/**
 * @export
 * @module miot/ui/AD
 * @description 广告
 * @mark andr 暂未提供
 */

import React from 'react'


import {isAndroid, isIOS} from '../native'


class AndroidAD extends React.Component{
    render(){
        return null;
    }
}

class IosAD extends React.Component{
    render(){
        return null;
    }
}

const AD = isIOS?IosAD:AndroidAD;
export default AD;
