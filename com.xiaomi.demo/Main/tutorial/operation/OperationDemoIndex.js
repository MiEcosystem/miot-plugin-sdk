import React from 'react';

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';


const ItemSeparator = ({highlighted}) => (
    <View style={highlighted ? styles.separatorHighlighted : styles.separator} />
  );

export default class OperationDemoIndex extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            dataSource:[
                {
                    'title':'蓝牙设备操作演示',
                    'key':'BLEConnectionDemo',
                },
                {
                    'title':'WiFi（双模）设备操作演示',
                    'key':'ControlDemo',
                }
            ],
        }
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <FlatList
                ItemSeparatorComponent={ItemSeparator}
                    style={styles.list}
                    data={this.state.dataSource}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item})=>{
                        return (
                            <TouchableHighlight style={{height:44}} onPress={()=>{
                                this.props.navigation.navigate(item.key,{title:item.title})
                            }} >
                                <View style={[{flexDirection:'row',margin:10}]}>
                                    <Text style={[styles.rowTitleText]}>{item.title}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    }
                }/>
        );
    }
}

var styles = StyleSheet.create({
    listContainer: {
        flex: 1,
      },
      list: {
        backgroundColor: '#eeeeee',
      },
      sectionHeader: {
        backgroundColor: '#eeeeee',
        padding: 5,
        fontWeight: '500',
        fontSize: 11,
      },
      row: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
      },
      image:{
        width:44,
        height:44,
        margin:15,

      },
      separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginLeft: 15,
      },
      separatorHighlighted: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgb(217, 217, 217)',
      },
      rowTitleText: {
        fontSize: 17,
        fontWeight: '500',
      },
});
