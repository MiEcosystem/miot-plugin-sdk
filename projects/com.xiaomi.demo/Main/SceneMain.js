'use strict';

import React, { Component } from 'react';

import {
    Dimensions,
    StyleSheet,
    View,
    TextInput,
    Text,
} from 'react-native';

import {Package} from "miot";
var { height: screenHeight, width: screenWidth } = Dimensions.get('window');
import { TitleBarBlack } from 'miot/ui';
import LocalizedStrings  from './MHLocalizableString';
const maxNum = 100;

export default class SceneMain extends React.Component {
    constructor(props, context) {
        super(props, context);
        let value = Package.entryInfo.action.payload.value;
        if (typeof value  === "string") value=JSON.parse(value);
        let text = value ? value.text : ''
        this.state = {
            text: text,
            textNum: this.getBLen(text),
            // textValid: true,
            numValid: !!value,
        };
    }

    getBLen = function (str) {
        if (!str) return 0;
        if (typeof str != "string") {
            str += "";
        }
        return Math.ceil(str.replace(/[^\x00-\xff]/g, "01").length / 2);
    }

    _isValid(str) {
        return /^([a-zA-Z]|[\u4e00-\u9fbb]|，|。|？|！|,|\.|\?|!|\s)*$/.test(str);
    }

    render() {
        return (
            <View style={styles.pageContanier}>
                <TitleBarBlack
                    leftText={LocalizedStrings.string.cancel}
                    onPressLeft={() => this._cancel()}
                    // disabled={!this.state.textValid || !this.state.numValid}
                    disabled={!this.state.numValid}
                    title={LocalizedStrings.string.voiceBroadcast}
                    rightText={LocalizedStrings.string.save}
                    onPressRight={() => this._save()}
                />
                <View style={styles.containerAll}>
                    <View style={styles.separator} />
                    <View style={{ backgroundColor: "#fff" }}>
                        <TextInput
                            multiline={true}
                            numberOfLines={6}
                            style={styles.textInput}
                            value={this.state.text}
                            placeholder={LocalizedStrings.string.enterPlayContent}
                            onChangeText={(text) => this.setState({ text })}
                            onEndEditing={({ nativeEvent }) => this._validateText(nativeEvent.text)}
                        />
                        <View style={styles.textNumContainer}>
                            <Text style={this.state.textNum > maxNum ? styles.textNumInvalid : styles.textNum}>
                                {this.state.textNum}
                            </Text>
                            <Text style={styles.textNum}>{"/" + maxNum}</Text>
                        </View>
                        <View style={[styles.separator, { marginHorizontal: 22 }]} />
                        {/* {this.state.textValid
              ? <Text style={styles.tip}>
                支持输入中文、英文，符号仅支持中文逗号、句号、问号、感叹号。
                </Text>
              : <Text style={[styles.tip, { color: "#F05353" }]}>
                含有不支持的字符
                </Text>
            } */}
                    </View>
                </View>
            </View >
        );
    }

    _validateText(text) {
        let length = this.getBLen(text);
        this.setState({
            textNum: length,
            numValid: length > 0 && length <= maxNum,
            // textValid: this._isValid(text)
        });
    }

    _cancel() {
        Package.exit();
    }

    _save() {
        Package.exitInfo= {
            text: this.state.text,
            type: "PLAY_USER_TTS"
        };
        Package.exit();
    }
}

var styles = StyleSheet.create({
    pageContanier: {
        width: screenWidth,
        height: screenHeight,
        backgroundColor: "#fff",
    },
    containerAll: {
        flex: 1,
        marginTop: 0,
        backgroundColor: "#f2f2f2"
    },
    separator: {
        height: 0.5,
        backgroundColor: '#e5e5e5',
    },
    textInput: {
        height: 225,
        fontSize: 15,
        color: '#000',
        lineHeight: 50,
        backgroundColor: "#fff",
        padding: 15,
    },
    textNumContainer: {
        position: 'absolute',
        top: 181,
        right: 22,
        flexDirection: 'row',
    },
    textNum: {
        fontSize: 15,
        color: '#999'
    },
    textNumInvalid: {
        fontSize: 15,
        color: '#F05353'
    },
    tip: {
        marginHorizontal: 22,
        marginTop: 10,
        marginBottom: 22,
        fontSize: 12,
        color: "#999",
        lineHeight: 17,
    }
});
