import React from 'react';
import TitleBar from 'miot/ui/TitleBar';
import { DeviceEventEmitter, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MainPage from './MainPage';
import RTSPPage from './RTSPPage';
import { Package } from 'miot';
import th from 'miot/resources/strings/th';



function createRootStack(initPage) {
    return createStackNavigator({
        MainPage,
        RTSPPage,
        Home: {
            screen: MainPage,
        },
    },
    {
        initialRouteName: initPage,
        navigationOptions: ({ navigation }) => {
            return {
                header: 
                    <TitleBar
                        title={navigation.state.params ? navigation.state.params.title : 'Page Name'}
                        type={navigation.state.params ? navigation.state.params.type : 'dark'}
                        leftText={navigation.state.params ? navigation.state.params.leftText : null}
                        rightText={navigation.state.params ? navigation.state.params.rightText : null}
                        onPressLeft={navigation.state.params ? navigation.state.params.onPressLeft : () => { navigation.goBack() }}
                        onPressRight={navigation.state.params ? navigation.state.params.onPressRight : null}
                        leftTextStyle={navigation.state.params ? navigation.state.params.leftTextStyle : null}
                        rightTextStyle={navigation.state.params ? navigation.state.params.rightTextStyle : null}
                    />
            };
        }
    })
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.initData();
    }

    initData() {
        this.initPage = "MainPage";
    }

    render() {
        let RootStack = createRootStack(this.initPage);
        return <RootStack />
    }
}

Package.entry(App, () => {

})