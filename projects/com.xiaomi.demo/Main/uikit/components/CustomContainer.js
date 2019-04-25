/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * hmpace.watch.v1
 * 
 */

'use strict';

import Host from 'miot/Host';
import React from 'react';
import { Animated, Dimensions, Image, requireNativeComponent, StyleSheet, Text, TouchableHighlight, View } from "react-native";



var window = Dimensions.get('window');

const MHCustomContainer = Host.isIOS ? requireNativeComponent('MHCustomContainer', null) : null;
const MHCustomFooter = Host.isIOS ? requireNativeComponent('MHCustomFooter', null) : null;
const MHCustomHeader = Host.isIOS ? requireNativeComponent('MHCustomHeader', null) : null;
const MHCustomContent = Host.isIOS ? requireNativeComponent('MHCustomContent', null) : null;

class FadeInView extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),  // 透明度初始值设为0
        heightAnim: new Animated.Value(0),  // 高度初始值设为0
    }

    componentDidMount() {                     // 开始执行动画
        Animated.parallel([
            // after decay, in parallel:
            Animated.timing(                  // 随时间变化而执行动画
                this.state.fadeAnim,            // 动画中的变量值
                {
                    toValue: 1,                   // 透明度最终变为1，即完全不透明
                    duration: 1000,              // 让动画持续一段时间
                }
            ),
            Animated.timing(                  // 随时间变化而执行动画
                this.state.heightAnim,            // 动画中的变量值
                {
                    toValue: 100,                   // 透明度最终变为1，即完全不透明
                    duration: 1000,              // 让动画持续一段时间
                }
            )
        ]).start();
    }

    render() {
        let { fadeAnim, heightAnim } = this.state;

        return (
            <Animated.View                 // 使用专门的可动画化的View组件
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,         // 将透明度指定为动画变量值
                    height: heightAnim
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default class CustomContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            showFade: false,
        };
    };

    fakeContent() {
        return (<Image style={{ width: window.width - 100, height: window.width - 100, margin: 50 }} source={{ uri: 'data:image/jpeg;base64,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' }} />);
    }

    render() {
        if (Host.isAndroid) {
            return <View><Text>Android Not Support Yet</Text></View>
        } else {

            let fade = this.state.showFade ? (
                <FadeInView style={[styles.card, styles.cardMargin]}>
                    <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>Fading in</Text>
                </FadeInView>
            ) : null;
            return (
                <MHCustomContainer style={{ flex: 1 }} backgroundColor='lightGray' headerHeight={100} footerHeight={200} zoomEnable={true} maxZoomLevel={5} minZoomLevel={1}>
                    <MHCustomHeader style={[{ flexDirection: 'row', height: 100, backgroundColor: 'white' }]}>
                        <TouchableHighlight style={styles.headerItem} onPress={this.taped.bind(this)}>
                            <View style={[styles.headerItem]}><Text style={[styles.text]}>点击显示/隐藏提示</Text></View>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.headerItem}>
                            <View style={[styles.headerItem]}><Text style={[styles.text]}>header1</Text></View>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.headerItem}>
                            <View style={[styles.headerItem]}><Text style={[styles.text]}>header1</Text></View>
                        </TouchableHighlight>

                    </MHCustomHeader>
                    <MHCustomContent style={{ width: window.width, height: window.width }}>
                        {this.fakeContent()}
                    </MHCustomContent>
                    <MHCustomFooter backgroundColor='green' style={[{ flexDirection: 'column', height: 800 }]}>
                        {fade}
                        <View style={[styles.cardMargin, { flexDirection: "row", backgroundColor: 'transparent', height: 80, justifyContent: 'space-around', marginBottom: 10 },]}>
                            <View style={[styles.card, { flex: 1, marginRight: 5, marginTop: 5 }]}><Text style={styles.text}>开始清扫</Text></View>
                            <View style={[styles.card, { flex: 1, marginLeft: 5, marginTop: 5 }]}><Text style={styles.text}>正在充电</Text></View>
                        </View>
                        <View style={[styles.card, styles.cardMargin]}><Text style={styles.text}>开始清扫</Text></View>
                        <View style={[styles.card, styles.cardMargin]}><Text style={styles.text}>开始清扫</Text></View>
                        <View style={[styles.card, styles.cardMargin]}><Text style={styles.text}>开始清扫</Text></View>
                        <View style={[styles.card, styles.cardMargin]}><Text style={styles.text}>开始清扫</Text></View>
                        <View style={[styles.card, styles.cardMargin]}><Text style={styles.text}>开始清扫</Text></View>
                    </MHCustomFooter>
                </MHCustomContainer>
            )
        }
    }

    taped() {
        let showFade = !this.state.showFade;
        this.setState({ showFade });
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: '#000000',
        alignSelf: 'stretch',
        textAlignVertical: 'center',
    },
    card: {
        height: 80,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardMargin: {
        margin: 10,
        marginTop: 5,
        marginBottom: 5
    },
    headerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const KEY_OF_MAINPAGE = 'CustomContainer';
