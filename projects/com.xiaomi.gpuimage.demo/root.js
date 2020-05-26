'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {Scene, Router, Modal, TabBar, Schema, Navigator} from 'react-native-router-flux';
import TestCaseList from './TestCaseList';
import CaseDetail from './CaseDetail';

class Root extends Component {
    render() {
        return (
            <View style={styles.application}>
                <Router>
                    <Scene key="root">
                        <Scene key="TestCaseList" component={TestCaseList} title="TestCases" initial={true} hideNavBar={true} style={{ flex: 1 }} />
                        <Scene key="CaseDetail" component={CaseDetail} hideNavBar={false} style={{ flex: 1 }} />
                    </Scene>
                </Router>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    application:{
        flex:1
    },
    tabBarStyle: {
        borderTopWidth : .5,
        borderColor    : '#b7b7b7',
        backgroundColor: 'white',
        opacity        : 1
    }
});

export default Root;
