import React from 'react';
import TitleBar from 'miot/ui/TitleBar';
import { createStackNavigator } from 'react-navigation'; //
import MainPage from './MainPage';
import { Package } from 'miot';

function createRootStack(initPage) {
    return createStackNavigator({
        Home: MainPage
    },
    {
        initialRouteName: initPage,
        navigationOptions: ({ navigation }) => {
            return {
                header: <TitleBar
                    title={navigation.state.params ? navigation.state.params.title : 'Home'}
                    type='dark'
                    onPressLeft={() => {
                        navigation.goBack();
                    }} />,
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

Package.entry(App, () => {

})