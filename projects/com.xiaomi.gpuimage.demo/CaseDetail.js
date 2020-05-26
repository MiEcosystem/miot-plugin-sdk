'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Slider,
} from 'react-native';

//import GL from "gl-react";
import {Surface} from 'gl-react-native';

//const {Image: GLImage} = require('gl-react-image');
//const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');

const {width: WinWidth, height: WinHeight} = Dimensions.get("window");

class SurfaceWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animValue: props.initValue,
        }
    }

    render() {
        return (
            <Surface width={WinWidth} height={WinWidth} style={styles.Surface}>
                {this.props.genFilter(this.state.animValue)}
            </Surface>
        );
    }
}

class CaseDetail extends Component {
    render() {
        let filterCase = this.props.config;
        return (
            <View style={styles.SurfaceContainer}>
                <SurfaceWrapper ref="surface" initValue={filterCase.SLIDER.DEFAULT} genFilter={filterCase.genFilter}>
                </SurfaceWrapper>
                {
                    filterCase.SLIDER.ENABLE && (
                        <Slider
                            minimumValue={filterCase.SLIDER.FROM}
                            maximumValue={filterCase.SLIDER.TO}
                            value={filterCase.SLIDER.DEFAULT}
                            onValueChange={(value) => {
                                let { surface } = this.refs;
                                surface.setState({
                                    animValue: value,
                                });
                            }}
                            style={styles.Slider}
                        >
                        </Slider>
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    SurfaceContainer: {
        marginTop: 100,
        flex: 4
    },

    Surface: {

    },

    Slider: {
        flex: 1
    }
});

export default CaseDetail;