import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import {NumberSpinner} from 'miot/ui'
import th from 'miot/resources/strings/th';

export default class BlankDemo extends React.Component{
     
    updateValue(data){
        console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`); 
    }

    render(){

        return (
            <View> 
            
    <NumberSpinner
        style={{width:300, height:200}}
        maxValue={30}
        minValue={-100}
        interval={2.5}
        defaultValue={80}
        valueFormat={"%.1f"}
        lineStyle={"none"}
        unit={"km"}
        onNumberChanged={this.updateValue}
    /> 
            </View>
        )
    }
}

