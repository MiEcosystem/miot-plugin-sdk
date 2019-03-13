import React from 'react';

import {
    View,
    Text,
    Button,
} from 'react-native';
import Host from 'miot/Host';

export default class JSExecutor extends React.Component {

    componentDidMount() {
        const resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");
        const jsfile = require("../../Resources/js_executor_demo.html");
        const jspath = resolveAssetSource(jsfile).uri;
        Host.createBackgroundExecutor(jspath).then(executor => {
            console.log("createBackgroundExecutor res:", executor);
            this.executor = executor;
        }).catch(err => {
            console.log("createBackgroundExecutor error: ", err);
        });
    }

    call0() {
        if (this.executor) {
            this.executor.execute("callWithNoArgReturnString").then(res => {
                console.log("call 0 result :", res);
            }).catch(err => {
                console.log("call 0 failed :", err);
            })
        }
    }

    call1() {
        if (this.executor) {
            this.executor.execute("callWithArg1ReturnNumber", "1").then(res => {
                console.log("call 1 result :", res);
            }).catch(err => {
                console.log("call 1 failed :", err);
            })
        }
    }

    call2() {
        if (this.executor) {
            this.executor.execute("callWithArg2ReturnARR", "1", "2").then(res => {
                console.log("call 2 result :", res);
            }).catch(err => {
                console.log("call 2 failed :", err);
            })
        }
    }

    call3() {
        if (this.executor) {
            this.executor.execute("callWithArg3ReturnOBJ", "1", "2", "3").then(res => {
                console.log("call 3 result :", res);
            }).catch(err => {
                console.log("call 3 failed :", err);
            })
        }
    }

    render() {
        return (
            <View>
                <Text>JSExecutor</Text>
                <Button onPress={this.call0.bind(this)} title="CallNoParams"></Button>
                <Button onPress={this.call1.bind(this)} title="CallOneParams"></Button>
                <Button onPress={this.call2.bind(this)} title="CallTwoParams"></Button>
                <Button onPress={this.call3.bind(this)} title="CallThreeParams"></Button>
            </View>
        )
    }
}

