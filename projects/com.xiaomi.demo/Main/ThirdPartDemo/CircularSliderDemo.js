
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MHCircularSlider from '../../CommonModules/MHCircularSlider';


export default class CircularSliderDemo extends React.Component {

    _onUpdate(e) {
        console.log("🔴log:")
        const body = e.body;
        console.log("on Update: " + e.nativeEvent.value + " touchend:" + e.nativeEvent.touchEnded);
    }


    render() {
        if (Platform.OS === 'ios') {
            return (
                <MHCircularSlider
                    style={styles.container}
                    minimumValue={0}
                    maximumValue={100}
                    value={100}
                    onUpdate={this._onUpdate.bind(this)} 
                 />
            );
        } else {
            return <View></View>
        }


    }

}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    }
})