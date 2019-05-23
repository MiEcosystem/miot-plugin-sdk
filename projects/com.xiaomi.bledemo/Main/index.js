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

import { TitleBar } from 'miot/ui';
import React from 'react';
import { createStackNavigator } from 'react-navigation'; //
import Guide from './Guide';
import NormalBle from './NormalBle';
import XiaomiBle from './XiaomiBle';

const RootStack = createStackNavigator(
    {
        mible: XiaomiBle,
        normalble: NormalBle,
        guide: Guide,
    },
    {
        // ThirdPartyDemo
        initialRouteName: 'guide',
        navigationOptions: ({ navigation }) => {
            return {
                header: <TitleBar
                    title={navigation.state.params ? navigation.state.params.title : ''}
                    // style={{ backgroundColor: '#fff' }}
                    type='dark'
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
