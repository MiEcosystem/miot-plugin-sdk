import React from 'react';

import {
    View,
    Text, ToastAndroid,
} from 'react-native';

import { NumberSpinner } from 'miot/ui'
import { Host } from 'miot'

export default class NumberSpinnerDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maxMonth: 12,
            unitTextColor: '#f7632a',
            unitFontSize: 20,
        }
    }

    render() {

        return (
            <View>

                <View style={{ flexDirection: 'row' }}>
                    <NumberSpinner
                        style={{ width: 100, height: 200 }}
                        maxValue={9999}
                        minValue={1}
                        interval={1}
                        defaultValue={80}
                        valueFormat={"%1.0f"}
                        unit={"年"}
                        onNumberChanged={(data) => { this.updateValueYear(data) }}
                    />
                    <NumberSpinner
                        style={{ width: 120, height: 200 }}
                        maxValue={this.state.maxMonth}
                        minValue={1}
                        interval={1}
                        defaultValue={6}
                        valueFormat={"%1.f"}
                        unit={"月"}
                        unitTextColor={this.state.unitTextColor}
                        unitFontSize={this.state.unitFontSize}
                        onNumberChanged={(data) => { this.updateValueMonth(data) }}
                    />
                    <NumberSpinner
                        style={{ width: 80, height: 200 }}
                        maxValue={30}
                        minValue={1}
                        interval={1}
                        defaultValue={80}
                        valueFormat={"%1.0f"}
                        lineStyle={"none"}
                        unit={"日"}
                        onNumberChanged={(data) => { this.updateValueDay(data) }}
                    />
                </View>
            </View>
        )
    }

    updateValueYear(data) {
        console.log(`newValue:${data.newValue}`);
        this.setState({
            unitTextColor: '#666666',
            unitFontSize: 13,
        });
        this.showToastAndroid(data)
    }

    updateValueMonth(data) {
        console.log(`newValue:${data.newValue}`);
        this.showToastAndroid(data)
    }

    updateValueDay(data) {
        console.log(`newValue:${data.newValue}`);
        this.showToastAndroid(data)
    }

    showToastAndroid(data) {
        if (Host.isAndroid) {
            ToastAndroid.show(`newValue:${data},oldValue:${data.oldValue}`, ToastAndroid.SHORT)
        }
    }
}

