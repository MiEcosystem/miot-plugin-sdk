'use strict';

import React from 'react';


import {
  StyleSheet,
  Text,
  ListView,
  View,
  Image,
  Component,
  StatusBar,
  PixelRatio,
  ActionSheetIOS,
  TouchableHighlight,
  Alert,
} from 'react-native';

import { TitleBarBlack,MessageDialog,InputDialog,SingleChoseDialog,MultiChoseDialog,LoadingDialog,ProgressDialog } from 'miot/ui';


export default class DialogTest extends React.Component {

  static navigationOptions = ({navigation}) => {

    return {
      header: <TitleBarBlack title={'DialogTest'} style={{backgroundColor: '#fff'}}
                             onPressLeft={() => {
                               navigation.goBack();
                             }}/>,
    };
  };

  constructor() {
    super();
    var timer1 = null;
    this.state = {
      visMessage: false,
      visInput: false,
      visSingle: false,
      visMulti: false,
      visLoading: false,
      visProgress: false,
      progress: 0,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.rowContainer}
          underlayColor='#838383'
          onPress={() => {
            this.setState({visMessage: true});
          }}>
          <Text style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily:'MI-LANTING--GBK1-Light',
            height: 45,
          }}>显示MessageDialog</Text>
        </TouchableHighlight>
        <MessageDialog title={'title'}
                       message={'message'}
                       cancelable={true}
                       cancel={'取消'}
                       confirm={'确认'}
                       timeout={10000}
                       onCancel={(e) => {
                         console.log('onCancel', e);
                       }}
                       onConfirm={(e) => {
                         console.log('onConfirm', e);
                       }}
                       onDismiss={() => {
                         console.log('onDismiss');
                         this.setState({visMessage: false});
                       }}
                       visible={this.state.visMessage}/>
        <TouchableHighlight
          style={styles.rowContainer}
          underlayColor='#838383'
          onPress={() => {
            this.setState({visInput: true});
          }}>
          <Text style={{
            textAlign: 'center',
            fontFamily:'D-DIN',
            textAlignVertical: 'center', height: 45,
          }}>显示InputDialog</Text>
        </TouchableHighlight>
        <InputDialog title={'title'}
                     message={'message'}
                     singleLine={true}
                     cancel={'取消'}
                     cancelable={false}
                     timeout={0}
                     confirm={'确认'}
                     placeholder={'placeholder'}
                     defaultText={'default text'}
                     onCancel={(e) => {
                       console.log('onCancel', e);
                     }}
                     onConfirm={(e) => {
                       console.log('onConfirm', e);
                     }}
                     onDismiss={() => {
                       console.log('onDismiss');
                       this.setState({visInput: false});
                     }}
                     visible={this.state.visInput}/>
        <TouchableHighlight
          style={styles.rowContainer}
          underlayColor='#838383'
          onPress={() => {
            this.setState({visSingle: true});
          }}>
          <Text style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily:'D-DINCondensed-Bold',
            height: 45,
          }}>显示SingleChoseDialog</Text>
        </TouchableHighlight>
        <SingleChoseDialog title={'title'}
                           dataSource={['message0', 'message1', 'message2', 'message3', 'message4', 'message5', 'message6']}
                           cancel={'取消'}
                           confirm={'确认'}
                           cancelable={false}
                           timeout={0}
                           check={2}
                           onCancel={(e) => {
                             console.log('onCancel', e);
                           }}
                           onConfirm={(e) => {
                             console.log('onConfirm', e);
                           }}
                           onCheck={(e) => {
                             console.log('onCheck', e);
                           }}
                           onDismiss={() => {
                             console.log('onDismiss');
                             this.setState({visSingle: false});
                           }}
                           visible={this.state.visSingle}/>
        <TouchableHighlight
          style={styles.rowContainer}
          underlayColor='#838383'
          onPress={() => {
            this.setState({visMulti: true});
          }}>
          <Text style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily:'D-DINCondensed',
            height: 45,
          }}>显示MultiChoseDialog</Text>
        </TouchableHighlight>
        <MultiChoseDialog title={'title'}
                          timeout={0}
                          cancelable={false}
                          dataSource={[{'name': 'message0', 'check': true},
                            {'name': 'message1', 'check': true}, {
                              'name': 'message2',
                              'check': false,
                            },
                            {'name': 'message3', 'check': false}, {
                              'name': 'message4',
                              'check': false,
                            },
                            {'name': 'message5', 'check': false}, {
                              'name': 'message6',
                              'check': true,
                            }]}
                          dataKey={'name'}
                          checkKey={'check'}
                          cancel={'取消'}
                          confirm={'确认'}
                          onCancel={(e) => {
                            console.log('onCancel', e);
                          }}
                          onConfirm={(e) => {
                            console.log('onConfirm', e);
                          }}
                          onCheck={(e) => {
                            console.log('onCheck', e);
                          }}
                          onDismiss={() => {
                            console.log('onDismiss');
                            this.setState({visMulti: false});
                          }}
                          visible={this.state.visMulti}/>
        <TouchableHighlight
          style={styles.rowContainer}
          underlayColor='#838383'
          onPress={() => {
            this.setState({visLoading: true});
            setTimeout(() => {
              this.setState({visLoading: false});
            }, 3000);
          }}>
          <Text style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily:'D-DINExp-Bold',
            height: 45,
          }}>显示LoadingDialog</Text>
        </TouchableHighlight>
        <LoadingDialog title={'title'}
                       message={'message'}
                       cancelable={false}
                       timeout={3000}
                       onDismiss={() => {
                         console.log('onDismiss');
                         this.setState({visLoading: false});
                       }}
                       visible={this.state.visLoading}/>
        <TouchableHighlight
          style={styles.rowContainer}
          underlayColor='#838383'
          onPress={() => {
            this.setState({visProgress: true, progress: 0});
            this.timer1 = setInterval(() => {
              console.log('setInterval', this.state.progress);
              if (this.state.progress === 100) {
                clearInterval(this.timer1);
                this.setState({visProgress: false});
              } else {
                var nextProgress = this.state.progress + 1;
                this.setState({progress: nextProgress});
              }
            }, 40);
          }}>
          <Text style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily:'DS-Digital',
            height: 45,
          }}>显示ProgressDialog</Text>
        </TouchableHighlight>
        <ProgressDialog message={'message'}
          //title={'title'}
                        max={100}
                        cancelable={false}
                        progress={this.state.progress}
                        onDismiss={() => {
                          console.log('onDismiss');
                          this.setState({visProgress: false});
                        }}
                        visible={this.state.visProgress}/>
        <TouchableHighlight
          style={styles.rowContainer}
          underlayColor='#838383'
          onPress={() => {
            Alert.alert(
              'Alert Title',
              'My Alert Msg',

              [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
          }}>
          <Text style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 45,
          }}>Alert(RN自带的) </Text>
        </TouchableHighlight>

         <TouchableHighlight
          style={styles.rowContainer}
          underlayColor='#838383'
          onPress={() => {
            ActionSheetIOS.showActionSheetWithOptions({
              options: ['Cancel', 'message1',"message2","message3"],
              destructiveButtonIndex: 2,
              cancelButtonIndex: 0,
            },
            (buttonIndex) => {
              if (buttonIndex === 1) { /* destructive action */ }
            });

                    }}>
          <Text style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 45,
          }}>ActionSheet(RN自带的,iOS 特有的) </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: '#f1f1f1',
    borderTopWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    marginBottom: 0,
    marginTop: 0,
  },
});

