import React from 'react';

import {
    View,
    Text,ScrollView
} from 'react-native';

import { StringSpinner } from 'miot/ui'
import { Host } from 'miot'

export default class StringSpinnerDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oneValue: "",
            selectBgColor: "#ff0000",
            // mutiValue: "",
        }
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 40, marginLeft: 15, backgroundColor: "#f8f8f8" }}>

              <ScrollView
                ref={'myScrollView'}
                bounces={true}
              >

                <View style={{ flexDirection: 'row' }}>

                  <StringSpinner
                    visible={false}
                    style={{ width: 120, height: 200, backgroundColor: '#ffffff', }}
                    dataSource={['a', 'b', 'c', 'd', 'e', 'f', 'g']}
                    defaultValue={'c'}
                    onValueChanged={(data) => { this.updateOneValue(data) }}
                  />

                  <StringSpinner
                    style={{ width: 120, height: 200, marginLeft: 10, backgroundColor: '#ffffff', }}
                    dataSource={['a', 'b', 'c', 'd', 'e', 'f', 'g']}
                    defaultValue={'c'}
                    unit={"斤"}
                    pickerInnerStyle={{ lineColor: "#ff0000", textColor: "#ff0000", selectTextColor: "#00ff00", fontSize: 14, selectFontSize: 18, rowHeight: 54, selectBgColor: "#eeeeee", unitFontSize: 12, unitTextColor: '#f7632a' }}
                    onValueChanged={(data) => { this.updateOneValue(data) }}
                  />
                </View>
                <Text style={{ marginTop: 20, color: "#666", fontSize: 14 }}>{"选中的值为：" + this.state.oneValue}</Text>

                <View style={{height: 200, backgroundColor: '#999'}}/>
                <View style={{height: 200, backgroundColor: '#a12'}}/>
                <View style={{height: 200, backgroundColor: '#cda'}}/>
                <View style={{height: 200, backgroundColor: '#999'}}/>
                <View style={{height: 200, backgroundColor: '#1ac'}}/>
                <View style={{height: 200, backgroundColor: '#5aa'}}/>
                <View style={{height: 200, backgroundColor: '#8b2'}}/>
                <View style={{height: 200, backgroundColor: '#cb2'}}/>
                <View style={{height: 200, backgroundColor: '#1b2'}}/>


              </ScrollView>
            </View >
        )
    }

    updateOneValue(data) {
        console.log(data);
        this.setState({ oneValue: data.newValue });
    }
    // updateMutiValue(data) {
    //     console.log(data);
    //     this.setState({ mutiValue: data.newValue.join("-") });
    // }
}

