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
                    title={navigation.state.params ? navigation.state.params.title : 'Home'}
                    type='dark'
                    onPressLeft={() => {
                        navigation.goBack();
                    }} />
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
        this.initPage = "Home";
    }

    render() {
        let RootStack = createRootStack(this.initPage);
        return <RootStack />
    }
}

const NaviApp = createStackNavigator({
  RTSPPage: { 
        // screen: MainPage
        screen: RTSPPage
    }
},{
    initialRouteName: 'RTSPPage',
    navigationOptions: ({ navigation }) => {
        if (navigation.state.params && navigation.state.params.show) {
            return { header: null }
        } else {
            return {
                header:
                <TitleBar
                    title={navigation.state.params ? navigation.state.params.title : 'Home'}
                    type={navigation.state.params ? navigation.state.params.type : 'dark'}
                    style={navigation.state.params? navigation.state.params.style : {backgroundColor: 'white'}}
                    onPressLeft={() => {
                        //navigation.pop();
                        Package.exit();
                    }} 
                    onPressRight={navigation.state.params? navigation.state.params.onPressRight : null}
                    />
            }
        }
    }
});

Package.entry(NaviApp, () => {

})