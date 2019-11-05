import FadeSlide from 'miot/ui/FadeSlide';
import TitleBar from 'miot/ui/TitleBar';
import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default class FadeSlideDemo extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header:
                <TitleBar
                    type='dark'
                    title='显示隐藏动画'
                    style={{ backgroundColor: '#fff' }}
                    onPressLeft={_ => navigation.goBack()}
                />
        };
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            status: false
        };
    }

    //改变显示、隐藏状态
    changeStatus = () => {
        this.setState((state, props) => {
            return { status: !state.status };
        });
    }

    render() {
        let { status } = this.state;

        return (
            <View style={styles.container}>
                <Button
                    title='显示/隐藏'
                    onPress={this.changeStatus}
                />
                <FadeSlide
                    isShown={status}
                    childrenHeight={100}
                >
                    <View style={styles.box} />
                </FadeSlide>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingBottom: 0,
        paddingTop: 0,
    },
    box: {
        width: '100%',
        height: 100,
        backgroundColor: 'blue',
        marginTop: 10
    },
});