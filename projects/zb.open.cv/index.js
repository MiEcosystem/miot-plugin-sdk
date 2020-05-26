
import React from 'react';
import { API_LEVEL, Package, Device, Service, Host } from 'miot';
import { PackageEvent, DeviceEvent } from 'miot';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CvImage, CvInvoke, ColorConv, Core } from 'react-native-opencv3';
import { log } from 'miot/utils/fns';

class App extends React.Component {
    render() {
        const originalImagePath = './images/girl_wide_brim_hat.png'

        // return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'powderblue' }}>
        // <Text>hello, this is a tiny plugin project of MIOT</Text>
        // <Text>API_LEVEL:{API_LEVEL}</Text>
        // <Text>NATIVE_API_LEVEL:{Host.apiLevel}</Text>
        // <Text>{Package.packageName}</Text>
        // <Text>models:{Package.models}</Text>
        // </View>
        // )
        return (
            <View style={styles.container}>
                <Image
                        style={{ width: 200, height: 200 }}
                        source={require(`${originalImagePath}`)} />
                        
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => this.activeEvent('点击')}
                    onPressIn={() => this.activeEvent('按下')}
                    onPressOut={() => this.activeEvent('抬起')}
                    onLongPress={() => this.activeEvent('长按')}>
                    <Text style={styles.captions}>Original</Text>
                </TouchableOpacity>

                <CvInvoke func='bitwise_not' params={{ "p1": "dstMat", "p2": "dstMat" }}>
                    <CvInvoke func='rotate' params={{ "p1": "dstMat", "p2": "dstMat", "p3": Core.ROTATE_90_COUNTERCLOCKWISE }}>
                        <CvInvoke func='cvtColor' params={{ "p1": "srcMat", "p2": "dstMat", "p3": ColorConv.COLOR_BGR2GRAY }}>
                            <CvImage
                                style={{ width: 210, height: 220 }}
                                source={require(`${originalImagePath}`)}
                            />
                        </CvInvoke>
                    </CvInvoke>
                </CvInvoke>
                <Text style={styles.captions}>Greyscaled</Text>
            </View>
        )
    }

    activeEvent(event) {
        log(event)
    }

}

Package.entry(App, () => {

})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    captions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 10,
    },
});