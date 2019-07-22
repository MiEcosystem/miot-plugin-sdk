import BlankPage from 'miot/ui/BlankPage';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { View } from 'react-native';

export default class BlankPageDemo extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type='dark'
          title={navigation.state.params ? navigation.state.params.title : ''}
          style={{ backgroundColor: '#fff' }}
          onPressLeft={_ => navigation.goBack()}
        />
    };
  };

  render() {
    const params = this.props.navigation.state.params.props;
    return (
      <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <BlankPage {...params} />
      </View>
    );
  }
}