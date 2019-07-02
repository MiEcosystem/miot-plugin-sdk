
import React, { Component } from 'react';
import {  StyleSheet, Text, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import TitleBar from "miot/ui/TitleBar";

/**
 * 开源库
 *  https://github.com/react-native-community/react-native-linear-gradient
 */
export default class LinearGradientDemo extends Component {

    static navigationOptions = ({ navigation }) => {

        return {
            header: <TitleBar type='dark' title={'LinearGradientDemo测试'} style={{ backgroundColor: '#fff' }}
                              onPressLeft={() => {
                                  navigation.goBack();
                              }} />,
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                        Sign in with miot
                    </Text>
                </LinearGradient>

                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                        Sign in with miot
                    </Text>
                </LinearGradient>

                <LinearGradient
                    start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                    locations={[0,0.5,0.6]}
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.linearGradient3}>
                    <Text style={styles.buttonText}>
                        Sign in with miot
                    </Text>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        height: 200,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    linearGradient3: {
        height: 50,
        width:200,
        margin: 20,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },

});