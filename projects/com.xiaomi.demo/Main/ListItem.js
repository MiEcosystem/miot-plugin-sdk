import React from 'react';
import {
   View, Text,AppRegistry,Button,
   TouchableHighlight,
   TouchableOpacity,
   Platform,
   Dimensions,
   Animated,
   StyleSheet,
   PixelRatio,
   StatusBar,
   Image,
   TextInput,
   WebView,
   DeviceEventEmitter,
   FlatList,
} from 'react-native';

export default class ListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.id,this.props.title);
    };

    render() {
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View style={{height:44,justifyContent:'center',alignItems:'stretch'}}>
            <Text style={{textAlign:'center',textAlignVertical:'center'}}>
              {this.props.title}
            </Text>
          </View>
          <View style={{backgroundColor:"gray",height:0.5}}></View>
        </TouchableOpacity>
      );
    }
  }
