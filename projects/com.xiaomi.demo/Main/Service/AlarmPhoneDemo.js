
// import React from 'react';
// import { FlatList, StyleSheet, Text, View } from 'react-native';

// import { Device, Service } from "miot";
// import CommonCell from '../../CommonModules/CommonCell';
// import Package from 'miot/Package';

// export default class AlarmPhoneDemo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       apiList: []
//     };
//   }

//   componentWillUnmount() {
//   }

//   componentDidMount() {
//     this.setState({
//       apiList: [
//         {
//           name: "addNewAlarmPhone",
//           group: '添加新的记录',
//           action: () => {
//             Service.alarmPhone.addNewAlarmPhone('break_lock_alarm', Device.deviceID, 'miot', '13888888888').then((res) => {
//               if (res && res.result && res.result.info_id) {
//                 alert(`resolve success! ${ JSON.stringify(res) }`);
//                 this.editInfoRecord = res.result;
//               } else {
//                 alert(`resolve fail! ${ JSON.stringify(res) }`);
//               }
//             }).catch((err) => {
//               alert(`reject ${ JSON.stringify(err) }`);
//             });
//           }
//         },
//         {
//           name: "editAlarmPhone",
//           group: '修改某一条记录',
//           action: () => {
//             if (!this.editInfoRecord || !this.editInfoRecord.info_id) {
//               alert('请先新增一条记录');
//               return;
//             }
//             Service.alarmPhone.editAlarmPhone('break_lock_alarm', Device.deviceID, this.editInfoRecord.info_id, 'miot', '13889999999').then((res) => {
//               if (res && res.result && res.result.info_id) {
//                 alert(`resolve success! ${ JSON.stringify(res) }`);
//                 this.editInfoRecord = res.result;
//               } else {
//                 alert(`resolve fail! ${ JSON.stringify(res) }`);
//               }
//             }).catch((err) => {
//               alert(`reject ${ JSON.stringify(err) }`);
//             });
//           }
//         },
//         {
//           name: "getAllAlarmPhone",
//           group: '获取所有已设置的记录',
//           action: () => {
//             Service.alarmPhone.getAllAlarmPhone(['break_lock_alarm', 'hijack_alarm'], Device.deviceID).then((res) => {
//               if (res && res.result) {
//                 alert(`resolve success! ${ JSON.stringify(res) }`);
//                 this.allRecordInfos = res.result;
//               } else {
//                 alert(`resolve fail! ${ JSON.stringify(res) }`);
//               }
//             }).catch((err) => {
//               alert(`reject ${ JSON.stringify(err) }`);
//             });
//           }
//         },
//         {
//           name: "deleteOneAlarmPhone",
//           group: '删除指定的一条记录',
//           action: () => {
//             if (!this.editInfoRecord || !this.editInfoRecord.info_id) {
//               alert('请先新增一条记录成功后再执行此操作');
//               return;
//             }
//             Service.alarmPhone.deleteAlarmPhone('break_lock_alarm', Device.deviceID, this.editInfoRecord.info_id).then((res) => {
//               alert(`resolve ${ JSON.stringify(res) }`);
//             }).catch((err) => {
//               alert(`reject ${ JSON.stringify(err) }`);
//             });
//           }
//         },
//         {
//           name: "deleteAllAlarmPhone",
//           group: '删除所有的记录',
//           action: () => {
//             if (!this.allRecordInfos) {
//               alert('请在查询所有记录成功后再执行此操作');
//               return;
//             }
//             let breakAlarmAllInfos = this.allRecordInfos['break_lock_alarm'];
//             if (breakAlarmAllInfos) {
//               for (let index = 0; index < breakAlarmAllInfos.length; index++) {
//                 setTimeout(function() {
//                   const element = breakAlarmAllInfos[index];
//                   Service.alarmPhone.deleteAlarmPhone('break_lock_alarm', Device.deviceID, element.info_id).then((res) => {
//                     console.log(`success! delete break_lock_alarm infoid ${ element.info_id } success`);
//                   }).catch((err) => {
//                     console.log(`fail! delete break_lock_alarm infoid ${ element.info_id } failed, error:${ err }`);
//                   });
//                 }, 500 * index);
//               }
//             }
//             let hijackAlarmAllInfos = this.allRecordInfos['hijack_alarm'];
//             if (hijackAlarmAllInfos) {
//               for (let index = 0; index < hijackAlarmAllInfos.length; index++) {
//                 setTimeout(function() {
//                   const element = hijackAlarmAllInfos[index];
//                   Service.alarmPhone.deleteAlarmPhone('hijack_alarm', Device.deviceID, element.info_id).then((res) => {
//                     console.log(`success! delete hijack_alarm infoid ${ element.info_id } success`);
//                   }).catch((err) => {
//                     console.log(`fail! delete hijack_alarm infoid ${ element.info_id } failed, error:${ err }`);
//                   });
//                 }, 750 * index);
//               }
//             }
//           }
//         }
//       ]
//     });
//   }

//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <FlatList
//           data={this.state.apiList}
//           keyExtractor={(item) => item.name}
//           ItemSeparatorComponent={({ highlighted }) => {
//             return (<View style={highlighted ? styles.separatorHighlighted : styles.separator}></View>);
//           }}
//           renderItem={({ item }) => {
//             let marginT = item.group == undefined ? 2 : 5;
//             let title = item.group == undefined ? (undefined) : (<Text style={{ margin: 5 }}>{item.group}</Text>);
//             return (
//               <View style={{ marginTop: marginT }}>
//                 {title}
//                 <CommonCell
//                   title={item.name}
//                   onPress={() => {
//                     item.action();
//                   }}
//                 />
//               </View>
//             );
//           }} />
//       </View>
//     );
//   }
// }
// var styles = StyleSheet.create({
//   separator: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: '#bbbbbb',
//     marginLeft: 15
//   },
//   separatorHighlighted: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: 'rgb(217, 217, 217)'
//   }
// });