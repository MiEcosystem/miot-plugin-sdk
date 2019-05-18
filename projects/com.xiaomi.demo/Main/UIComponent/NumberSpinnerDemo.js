import React from 'react';

import {
    View,
    Text, ToastAndroid,
} from 'react-native';

import {NumberSpinner} from 'miot/ui'
import {Host} from 'miot'

export default class NumberSpinnerDemo extends React.Component{

    render(){

        return (
            <View>

                <View style={{flexDirection: 'row'}}>
                    <NumberSpinner
                        style={{width:100, height:200}}
                        maxValue={9999}
                        minValue={1}
                        interval={1}
                        defaultValue={80}
                        valueFormat={"%1.0f"}
                        lineStyle={"1 , #666666"}
                        unit={"年"}
                        onNumberChanged={(data)=>{this.updateValueYear(data)}}
                    />
                    <NumberSpinner
                        style={{width:120, height:200}}
                        maxValue={100}
                        minValue={1}
                        interval={1}
                        defaultValue={80}
                        valueFormat={"%1.0f"}
                        lineStyle={"none"}
                        unit={"月"}
                        onNumberChanged={(data)=>{this.updateValueMonth(data)}}
                    />
                    <NumberSpinner
                        style={{width:80, height:200}}
                        maxValue={30}
                        minValue={1}
                        interval={1}
                        defaultValue={80}
                        valueFormat={"%1.0f"}
                        lineStyle={"none"}
                        unit={"日"}
                        onNumberChanged={(data)=>{this.updateValueDay(data)}}
                    />
                </View>
            </View>
        )
    }

    updateValueYear(data){
        console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`);
        this.showToastAndroid(data)
    }

    updateValueMonth(data){
        console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`);
        this.showToastAndroid(data)
    }

    updateValueDay(data){
        console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`);
        this.showToastAndroid(data)
    }

    showToastAndroid(data){
        if(Host.isAndroid){
            ToastAndroid.show(`newValue:${data.newValue},oldValue:${data.oldValue}`, ToastAndroid.SHORT)
        }
    }
}

