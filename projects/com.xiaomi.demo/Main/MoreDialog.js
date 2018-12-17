'use strict';

import React, {Component} from 'react';
import HelloDeveloper from '../CommonModules/HelloDeveloper';

import {
    Platform,
    StyleSheet,
    Text,
    ListView,
    View,
    Image,
    TouchableHighlight,
    StatusBar,
    Modal,
    Alert,
    AlertIOS,
    Animated,
    Easing,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';

const {width, height} = Dimensions.get('window');
import {Host} from 'miot';
import {ImageButton, LoadingDialog} from 'miot/ui';
import {localStrings as LocalizedStrings, getString} from './MHLocalizableString';

const TIME = 300;//动画时长
export default class MoreDialog extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this._createMenuData();
        this.state = {
            modalVisible: this.props.visible,
            loading: false,
            dataSource: ds.cloneWithRows(this._menuData),
            animSlide: new Animated.Value(0),
            animOpacity: new Animated.Value(0),
        };
    }

    _createMenuData() {
        this._menuData = [{
            'name': LocalizedStrings.OpenLibList, 'func': () => {
                this.props.navigation.navigate('OpenLibList', {title: LocalizedStrings.OpenLibList});
                this.dismissDialog(false);
            },
        }, // {
            //   'name': LocalizedStrings.ViewTest,
            //   'func': () => {
            //     this.props.navigation.navigate('ViewTest', {title: LocalizedStrings.ViewTest});
            //     this.dismissDialog(false);
            //   },
            // },
            {
                'name': '分享资源文件', 'func': () => {
                    Host.ui.openShareListBar('小米智能家庭', '小米智能家庭', require("../Resources/test_icon.png"), 'http://open.home.mi.com');
                },
            }, {
                'name': '分享截图', 'func': () => {
                    this.setState({loading: true});
                    Host.file.screenShot("temp.png").then(result => {
                        Host.ui.openShareListBar('小米智能家庭', '小米智能家庭', {local: "temp.png"}, 'http://www.mi.com')
                            .then(result => this.setState({loading: false})).catch(err => this.setState({loading: false}));
                    }).catch(err => this.setState({loading: false}))
                },
            }, {
                'name': getString('device_more_activity_scence'), 'func': () => {
                    Host.ui.openIftttAutoPage();
                },
            }, {
                'name': LocalizedStrings.device_more_activity_common_setting, 'func': () => {
                    this.props.navigation.navigate('moreMenu', {title: LocalizedStrings.device_more_activity_common_setting});
                    this.dismissDialog(false);
                },
            }, {
                'name': LocalizedStrings.device_more_activity_help_feedback, 'func': () => {
                    Host.ui.openFeedbackInput();
                },
            },];
    }

    onShowDidButtonPress() {
        this.props.navigator.push(HelloDeveloper.route);
    }

    /**
     * 渲染一行
     * @param rowData
     * @param sectionID
     * @param rowID
     * @returns {*}
     */
    renderRow(rowData, sectionID, rowID) {
        return (<TouchableHighlight underlayColor='#efeff0' style={styles.itembkg}
                                    onPress={() => {//如果没有字段 rowData.switch，不是开关,相应点击事件，否则响应开关事件
                                        if (rowData.switch === undefined) {
                                            rowData.func();
                                        }
                                    }}>
            <View>
                <View style={styles.rowContainer}>
                    <Text style={styles.title}>{rowData.name}</Text>
                    {rowData.switch !== undefined && <Text style={{
                        width: 60, height: 30,
                    }}
                                                           value={rowData.switch}
                                                           onValueChange={(v) => rowData.func(v)}/>}
                </View>
                <View style={styles.separator}/>
            </View>
        </TouchableHighlight>);
    }

    /**
     * 根据改变的 props 设置显示或隐藏
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (this.state.modalVisible === nextProps.visible) {
            return;
        }
        if (nextProps.visible) {
            this.showDialog(true);
        } else {
            this.dismissDialog(false);
        }
    }

    /**
     * 展开更多弹框
     * @param doAnim true 显示向下展开的动画，false 不显示
     */
    showDialog(doAnim) {
        if (doAnim) {
            this.state.animSlide.setValue(-height);
            this.state.animOpacity.setValue(0.0);
            Animated.parallel([Animated.timing(this.state.animSlide, {
                toValue: 0.0, duration: TIME, easing: Easing.linear,
            }), Animated.timing(this.state.animOpacity, {
                toValue: 1.0, duration: TIME, easing: Easing.linear,
            })]).start();
        }
        this.setState({modalVisible: true});
        this.onVisibleChange(true);
    }

    render() {
        if (this.state.modalVisible) {
            return (<SafeAreaView style={{//控制弹框位置
                height: height, width: width, position: 'absolute', top: StatusBar.currentHeight
            }}>
                <TouchableWithoutFeedback style={{width: width, flex: 1}}
                                          onPress={() => this.dismissDialog(true)}>
                    <View style={[{width: width, flex: 1}]}>
                        <Animated.View
                            style={[styles.container, {opacity: this.state.animOpacity}]}>
                            <Animated.View
                                style={{//下滑展示的 listview
                                    position: 'absolute',
                                    backgroundColor: '#fff',
                                    marginTop: this.state.animSlide,
                                }}>
                                <View style={styles.itembkg}>
                                    <ImageButton style={styles.closeImg}
                                                 source={require('../Resources/title/irv2_more_close_normal.png')}
                                                 highlightedSource={require('../Resources/title/irv2_more_close_pressed.png')}
                                                 onPress={() => this.dismissDialog(true)}
                                    />
                                </View>
                                <View style={styles.separator}/>
                                <ListView style={styles.list} dataSource={this.state.dataSource}
                                          renderRow={this.renderRow.bind(this)}/>
                            </Animated.View>
                        </Animated.View>
                    <LoadingDialog title={'加载中……'}
                                   visible={this.state.loading}/>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>);
        } else {
            return null;
        }
    }

    /**
     * 关闭更多弹框
     * @param doAnim true 显示向上收起的动画，false 不显示
     */
    dismissDialog(doAnim) {
        if (doAnim) {
            this.state.animSlide.setValue(0);
            this.state.animOpacity.setValue(1.0); //1为不透明
            Animated.parallel([Animated.timing(this.state.animSlide, {
                toValue: -height, //
                duration: TIME, easing: Easing.linear,
            }), Animated.timing(this.state.animOpacity, {
                toValue: 0, //
                duration: TIME, easing: Easing.linear,
            })]).start();
            setTimeout(() => {
                this.setState({modalVisible: false});
                this.onVisibleChange(false);
            }, TIME);
        } else {
            this.setState({modalVisible: false});
            this.onVisibleChange(false);
        }
    }

    /**
     * 回调调用的地方
     * @param show  true 显示弹框，false 关闭弹框
     */
    onVisibleChange(show) {
        if (this.props.onVisibleChange) {
            this.props.onVisibleChange(show);
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        flexDirection: 'column',
        backgroundColor: '#00000055',
        justifyContent: 'flex-start',
    }, closeImg: {
        width: 29,
        height: 29,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'flex-end',
    }, itembkg: {
        width: width, backgroundColor: '#fff',
    },

    rowContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        height: 45,
    }, list: {
        alignSelf: 'stretch',
    },

    title: {
        paddingLeft: 23, paddingRight: 23, fontSize: 14, alignItems: 'center', flex: 1,
    }, subArrow: {
        width: 9, height: 18,
    }, separator: {
        height: 0.5, backgroundColor: '#f1f1f1', marginLeft: 23,
    },
});
