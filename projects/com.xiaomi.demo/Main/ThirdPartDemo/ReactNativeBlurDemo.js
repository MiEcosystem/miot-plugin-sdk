import React, { Component } from "react";
import { View, Image, Text, findNodeHandle, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";
import TitleBar from "miot/ui/TitleBar";


/**
 * 开源库
 *  https://github.com/react-native-community/react-native-blur
 */
export default class ReactNativeBlurDemo extends Component {

    static navigationOptions = ({ navigation }) => {

        return {
            header: <TitleBar type='dark' title={'ReactNativeBlurDemo测试'} style={{ backgroundColor: '#fff' }}
                              onPressLeft={() => {
                                  navigation.goBack();
                              }} />,
        };
    };

    constructor(props) {
        super(props);
        this.state = { viewRef: null };
    }

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    render() {

        console.log("render...", this.state);

        return (
            <View style={styles.container}>
                <Text style={{ alignSelf: 'flex-start', color: '#ff0000' }}>Hi, I am some unblurred text</Text>
                <Image
                    ref={img => {
                        this.backgroundImage = img;
                    }}
                    source={{ uri: 'http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_e090a3ef96110f731a19223fb05e5032.png' }}
                    style={[styles.absolute]}
                    resizeMode="center"
                    onLoadEnd={this.imageLoaded.bind(this)}
                />
                <BlurView
                    style={{ position: 'absolute', width: 200, height: 120 }}
                    viewRef={this.state.viewRef}
                    blurType="light"
                    blurAmount={2}
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        alignItems: "center",
        height: 120,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});