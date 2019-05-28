import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import { StringSpinner } from 'miot/ui'
import { Host } from 'miot'

export default class StringSpinnerDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oneValue: "",
            // mutiValue: "",
        }
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 40, marginLeft: 15, backgroundColor: "#f8f8f8" }}>
                <View>
                    <StringSpinner
                        style={{ width: 300, height: 300, backgroundColor: '#ffffff', }}
                        dataSource={['a', 'b', 'c', 'd']}
                        defaultValue={'c'}
                        pickerInnerStyle={{ lineColor: "#cc0000", textColor: "#ff0000", selectTextColor: "#0000FF", fontSize: 12, selectFontSize: 30, rowHeight: 70, selectBgColor: "#f5f5f5" }}
                        onValueChanged={(data) => { this.updateOneValue(data) }}
                    />
                    <Text style={{ marginTop: 20, color: "#666", fontSize: 14 }}>{"选中的值为：" + this.state.oneValue}</Text>
                </View>
                {/* <View style={{ marginTop: 20 }}>
                    <StringSpinner
                        style={{ width: 300, height: 200 }}
                        dataSource={[['a', 'b', 'c', 'd'], ['1', '2', '3', '4', '5'], ['金', '木', '水', '火', '土']]}
                        defaultValue={['c', '4', '木']}
                        onValueChanged={data => { this.updateMutiValue(data) }}
                        }
                    />
                    <Text style={{ marginTop: 20, color: "#666", fontSize: 14 }}>{"选中的值为：" + this.state.mutiValue}</Text>
                </View> */}
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

