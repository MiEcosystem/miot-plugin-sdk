import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Button,
} from 'react-native';
import {MHPluginSDK} from 'NativeModules';

export default class DeviceInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            respText:'',
        }
    }

    _keyExtractor = (item, index) => item.id;

    render(){
        return (
            <View>
                <Button title="点击查看当前设备的信" onPress={()=>{
                    MHPluginSDK.updateDeviceInfoCallback((resp)=>{
                        // alert(JSON.stringify(resp['result']['list']));

                        var properties = resp['result']['list'];
                        // alert(typeof properties);
                        // properties.foreach((k,v,m)=>{alert('k = '+ k + ' v = '+ v + ' m = '+m)});
                        // for ([key , value ] of properties){
                        //     alert('key ' + key);
                        // }
                        // alert(properties.keys());
                        var list = []
                        // var keys = properties.keys();
                        // alert(JSON.stringify(properties));
                        properties.forEach((item)=>{
                            for (var key in item){
                                list.push({'key':JSON.stringify(key),'value':JSON.stringify(item[key])});
                            }
                        });


                        this.setState((preState)=>{
                            return {data:list,respText:JSON.stringify(resp)};
                        });
                    });

                }}/>
                <Text>返回数据</Text>
                <Text>{this.state.respText}</Text>
                <View style={{height:30}}/>
                <FlatList
                    ItemSeparatorComponent={ItemSeparator}
                    style={styles.list}
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item})=>{
                        // alert(JSON.stringify( item))
                        return (<View style={[{flexDirection:'row'}]}>
                                    <View style={{flexDirection:'column'}}>
                                        <Text style={[styles.rowTitleText,{}]}>key:{item.key} </Text>
                                        <Text style={[styles.rowDetailText]}>value:{item.value}</Text>
                                    </View>
                            </View>)

                    }
                }/>
            </View>
            )
    }
}
const ItemSeparator = ({highlighted}) => (
    <View style={highlighted ? styles.separatorHighlighted : styles.separator} />
  );

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
    rowDetailText: {
      fontSize: 15,
      color: '#888888',
      lineHeight: 20,
    },
    searchRow: {
      backgroundColor: '#eeeeee',
      padding: 10,
    },
    searchTextInput: {
      backgroundColor: 'white',
      borderColor: '#cccccc',
      borderRadius: 3,
      borderWidth: 1,
      paddingLeft: 8,
      paddingVertical: 0,
      height: 35,
    },
  });
