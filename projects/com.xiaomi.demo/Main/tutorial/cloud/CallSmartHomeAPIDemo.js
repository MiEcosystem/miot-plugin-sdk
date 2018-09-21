import React from 'react';

import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
} from 'react-native';
import {MHPluginSDK } from 'NativeModules';

export default class CallSmartHomeAPIDemo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
        };
    }
    render(){
        return (
            <View>
                <Button title="点击查询固件版本信息" onPress={()=>{
                    MHPluginSDK.callSmartHomeAPI("/home/latest_version", {"model":MHPluginSDK.deviceModel}, (response) => {
                        var result = response['result'];

                        var item = [];
                        for (var key in result) {
                            // alert(key);
                            item.push({'key':key,'value':result[key]});
                        }
                        this.setState((preState)=>{
                            return {dataSource:item};
                        });
                       });
                }}/>
                <FlatList data={this.state.dataSource}
                    ItemSeparatorComponent={({highlighted})=>{
                        return (<View style={highlighted ? styles.separatorHighlighted : styles.separator}></View>)

                    }}
                    renderItem={({item})=>{
                        return (<View style={{flexDirection:'row',margin:10}}>
                            <Text style={{width:150}}>{item.key}:</Text>
                            <Text style={{width:150}}>{item.value}</Text>
                        </View>);
                    }} />
            </View>

        )
    }
}

var styles= StyleSheet.create({
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginLeft: 15,
      },
      separatorHighlighted: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgb(217, 217, 217)',
      },
});

