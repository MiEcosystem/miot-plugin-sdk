'use strict';

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ListView,
    Text,
    TouchableHighlight,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import TestCases from './TestCases';

class TestCaseList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(TestCases)
        }
    }

    _renderRow(data) {
        return (
            <View style={{
                //alignItems: "center",
                //justifyContent: "center",
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
            }}>
                <TouchableHighlight
                    onPress={()=>{
                        Actions.CaseDetail({config: data, title: data.NAME});
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        margin: 5,
                    }}>{data.NAME}</Text>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 22 }}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                />
            </View>
        );
    }
}

export default TestCaseList;