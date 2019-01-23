import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableHighlight,
} from 'react-native';


const ItemSeparator = ({highlighted}) => (
    <View style={highlighted ? styles.separatorHighlighted : styles.separator} />
  );

export default class TutorialDemo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            dataSource:[
                {
                    'title':'空白页',
                    'key':'blankDemo',
                },
                // {
                //     'title':'与设备交互',
                //     'key':'OperationDemoIndex',
                // },
                {
                    'title':'与服务器交互 ',
                    'key':'callSmartHomeAPIDemo',
                },
                {
                    'title':'账户信息',
                    'key':'accountDemo',
                },
                {
                    'title':'KeyValue存储',
                    'key':'storageDemo',
                },
                {
                    'title':'文件存储',
                    'key':'fileStorage',
                },
                {
                    'title':'device 信息',
                    'key':'DeviceDemo',
                },
                {
                    'title':'插件包信息',
                    'key':'PackageDemo',
                },
                {
                    'title':'定位相关',
                    'key':'LocaleServer',
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
