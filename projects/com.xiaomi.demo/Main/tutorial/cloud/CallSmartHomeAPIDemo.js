import React from 'react';

import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
} from 'react-native';
import {Service,Device} from "miot";

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
                <Button title="点击查询设备对应model最新固件版本信息" onPress={()=>{
                    
                    Service.smarthome.getLatestVersion(Device.model)
                        .then((result) => {
                            var item = [];
                            for (var key in result) {
                                item.push({'key':key,'value':result[key]});
                            }
                            this.setState((preState)=>{
                                return {dataSource:item};
                            });
                        })
                        .catch(err => {
                            alert("error:",err)
                        })
                }}/>
                <Button title="点击查询当前设备固件版本信息" onPress={()=>{
                    Service.smarthome.getAvailableFirmwareForDids([Device.deviceID])
                        .then((result) => {
                            
                            if(result instanceof Array) {
                                var items = [];
                                for (var i = 0; i < result.length; i++) {
                                    var item = result[i];
                                    items.push({'key':i,'value':"----"})
                                    for (var key in item) {
                                        items.push({'key':key,'value':"v:"+item[key]});
                                    }
                                }
                                this.setState((preState)=>{
                                    return {dataSource:items};
                                });
                            }
                        })
                        .catch(err => {
                            alert("error:",err)
                        })
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

