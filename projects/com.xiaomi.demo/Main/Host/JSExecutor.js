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

    ObjectMethodCall() {
        if (this.executor) {
            //支持使用Obj对象中的method
            this.executor.execute("TestObj.callWithArg1ReturnNumber", "hello world").then(res => {
                console.log("ObjectMethodCall result :", res);
                alert("success: " + JSON.stringify(res));
            }).catch(err => {
                console.log("ObjectMethodCall failed :", err);
                alert("failed: ", JSON.stringify(err));
            })
        }
    }

    callWithObject() {
        if (this.executor) {
            //execute参数支持任意可以json序列化的对象
            this.executor.execute("callWithObj", "initialProps.init1", ['array1', 'array2'], {'map1':'map1'}).then(res => {
                console.log("callWithObj result :", res);
                alert("success: " + JSON.stringify(res));
            }).catch(err => {
                console.log("callWithObj failed :", err);
                alert("failed: ", JSON.stringify(err));
            })
        }
    }

    call3Params() {
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
                <Button onPress={this.call3Params.bind(this)} title="简单函数调用"></Button>
                <Button onPress={this.callWithObject.bind(this)} title="函数调用传递对象"></Button>
                <Button onPress={this.ObjectMethodCall.bind(this)} title="Obj方法调用"></Button>
            </View>
        )
    }
}

