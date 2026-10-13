import React from "react";
import { PanResponder, View, FlatList, Text, TouchableOpacity } from "react-native";
import RockerView from "miot/ui/RockerView";
export default class RockerViewDemo extends React.Component {
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      console.log('onStartShouldSetPanResponder true');
      return true;
    },
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      console.log('onMoveShouldSetPanResponder true');
      return true;
    },
    onPanResponderGrant: (evt, gestureState) => {
      console.log('onPanResponderGrant');
      // console.log('evt', evt);
      // console.log('gestureState', gestureState);
    },
    onResponderReject: (evt, gestureState) => {
      console.log('onResponderReject');
    },
    onPanResponderMove: (evt, gestureState) => {
      console.log('onPanResponderMove');
      // console.log('evt', evt);
      // console.log('gestureState', gestureState);
    },
    onPanResponderRelease: (evt, gestureState) => {
      console.log('onPanResponderRelease');
      // console.log('evt', evt);
      // console.log('gestureState', gestureState);
    },
    onResponderTerminationRequest: (evt) => {
      console.log('请求放权,返回true');
      return true;
    },
    onResponderTerminate: (evt) => {
      console.log('响应者权力已经交出');
    }
  });

  render() {
    const data = [
      { id: 1, title: "Black", description: "111" },
      { id: 2, title: "White", description: "222" },
      { id: 3, title: "Blue", description: "333" },
      { id: 4, title: "Red", description: "444" },
      { id: 5, title: "Red", description: "555" },
      { id: 6, title: "Red", description: "666" },
      { id: 7, title: "Red", description: "777" }
    ];
    const Item = ({ title, description }) => (
      <View>
        <TouchableOpacity style={ { width: 100, height: 50, backgroundColor: 'red' } } onPress={ () => {
          console.log(`press ${ description }`);
        } }>
          <Text>{ title } </Text>
        </TouchableOpacity>

        <Text>{description} </Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <Item title={item.title} description={item.description} />
    );
    return (<View>
      <View style={ { width: 300, height: 100, backgroundColor: 'green' } }{ ...this.panResponder.panHandlers }/>
      <FlatList
        style={ { width: 300, height: 300 } }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <RockerView style={ { width: 200, height: 100, backgroundColor: 'blue' } }
        enableClick={false}
        enableDrag = {true}
        onClick={ (evt) => {
          console.log('onClick', evt);
        } }
        onGestureStart={ (evt) => {
          console.log('start', evt);
        } }
        onGestureMove={ (evt) => {
          console.log('move', evt);
        } }
        onGestureEnd={ (evt) => {
          console.log('end', evt);
        } }/>
    </View>);
  }
}