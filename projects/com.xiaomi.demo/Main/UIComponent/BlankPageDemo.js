import BlankPage from 'miot/ui/BlankPage';
import React from 'react';
import { View } from 'react-native';
import Logger from '../Logger';

export default class BlankPageDemo extends React.Component {

  constructor(props) {
    super(props);
    Logger.trace(this);
  }

  render() {
    const params = this.props.navigation.state.params.props;
    return (
      <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <BlankPage {...params} />
      </View>
    );
  }
}