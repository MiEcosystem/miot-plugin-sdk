import React from 'react';

import {
    View,
    Text,
    Button,
} from 'react-native';
import Host from 'miot/Host';

export default class JSExecutor extends React.Component {

    componentDidMount() {
        const jspath = require("../../Resources/test_executor.jx");
        Host.createBackgroundExecutor(jspath, { 'init1': "1", 'init2': [1, 2] }).then(executor => {
            console.log("createBackgroundExecutor res:", executor);
            this.executor = executor;
        }).catch(err => {
            console.log("createBackgroundExecutor error: ", err);
        });
    }

    componentWillUnmount() {
        this.executor&&this.executor.remove();
    }

    call3() {
        if (this.executor) {
            this.executor.execute("callWithArg3ReturnOBJ", "1", "2", "3").then(res => {
                console.log("call 3 result :", res);
                alert("success: " + JSON.stringify(res));
            }).catch(err => {
                console.log("call 3 failed :", err);
                alert("failed: ", JSON.stringify(err));
            })
        }
    }

    render() {
        return (
            <View>
                <Text>JSExecutor</Text>
                <Button onPress={this.call3.bind(this)} title="函数调用"></Button>
            </View>
        )
    }
}

