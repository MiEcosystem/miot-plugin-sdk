
import React from 'react';
import {
    Animated, 
    ART, 
    View, 
    Platform,
    StyleSheet
} from 'react-native';

import MHCircularSlider  from '../CommonModules/MHCircularSlider'

export default class CircularSliderDemo extends React.Component {

    _onUpdate(e) {
        console.log("🔴log:")
        const body = e.body;
        console.log("on Update: "+e.nativeEvent.value+" touchend:"+e.nativeEvent.touchEnded);
    }


    render() {
        if (Platform.OS === 'ios') {
            return (
                <MHCircularSlider 
                style={styles.container}
                minimumValue={0} 
                maximumValue={100} 
                value={100} 
                onUpdate={this._onUpdate.bind(this)} ref="sliderA" />
                );
        } else {
            return <View></View>
        }

 
    }

}
var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'red',
    }
})