/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
'use strict';

import React from 'react';

import {
    View, Text, AppRegistry, Button,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    Dimensions,
    Animated,
    StyleSheet,
    PixelRatio,
    DeviceEventEmitter,
    Image,
} from 'react-native';

import { TitleBarBlack } from 'miot/ui';
import { createStackNavigator } from 'react-navigation'; //
import MainPage from './MainPage';
import Package from 'miot/Package'
const RootStack = createStackNavigator(
    {
        Home: MainPage,
    },
    {
        // ThirdPartyDemo
        initialRouteName: 'Home',
        navigationOptions: ({ navigation }) => {
            return {
                header: <TitleBarBlack title={navigation.state.params ? navigation.state.params.title : ''} style={{ backgroundColor: '#fff' }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }} />,
            };
        },
        // transitionConfig: () => ({
        //   screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        // }),
    }
);
export default class App extends React.Component {
    render() {
        return <RootStack />;
    }

}
