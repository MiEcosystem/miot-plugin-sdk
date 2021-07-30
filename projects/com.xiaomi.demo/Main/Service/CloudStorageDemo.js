import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView, TextInput
} from 'react-native';
import { Device, Host, Service } from "miot";
import Logger from '../Logger';
import data from 'gl-react/lib/data';

export default class CloudStorageDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      id: '0',
      name: '',
    };
    Logger.trace(this);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <ScrollView style={{ marginTop: 1, width: '90%' }} showsVerticalScrollIndicator={false}>
          {
            [
              ["setThirdUserConfigsForOneKey", () => {
                let data = {
                  "1010530098": {
                    "userGroupList": [
                      {
                        "userGroupId": 0,
                        "passwordList": [
                          { "groupId": 0, "id": 61, "name": "密码03", "number": 3, "authority": 0, "timeInternal": 1561553832, "type": 2 }
                        ],
                        "fingerprintList": [],
                        "nfcList": [],
                        "userGroupType": 0,
                        "userGroupIconId": "default",
                        "userGroupIconUrl": "",
                        "userGroupName": "未分配"
                      },
                      {
                        "userGroupId": 1,
                        "passwordList": [
                          { "groupId": 1, "id": 81, "name": "密码11", "number": 11, "authority": 1, "timeInternal": 536871298, "type": 2 },
                          { "groupId": 1, "id": 83, "name": "密码02", "number": 2, "authority": 1, "timeInternal": 536871298, "type": 2 },
                          { "groupId": 1, "id": 127, "name": "密码01", "number": 1, "authority": 1, "timeInternal": 536871298, "type": 2 }
                        ],
                        "fingerprintList": [
                          { "groupId": 1, "id": 58, "name": "指纹01", "number": 1, "authority": 1, "timeInternal": 1561553771, "type": 1 }
                        ],
                        "nfcList": [],
                        "userGroupType": 1,
                        "userGroupIconId": "default",
                        "userGroupIconUrl": "",
                        "userGroupName": "我"
                      }
                    ],
                    "NFCCidBindList": []
                  },
                  "1010586195": {
                    "userGroupList": [
                      {
                        "userGroupId": 1,
                        "passwordList": [],
                        "fingerprintList": [
                          { "groupId": 1, "id": 4, "name": "指纹02", "number": 2, "authority": 1, "timeInternal": 1561949698, "type": 1 }
                        ],
                        "nfcList": [],
                        "userGroupType": 1,
                        "userGroupIconId": "default",
                        "userGroupIconUrl": "",
                        "userGroupName": "我"
                      },
                      {
                        "userGroupId": 2,
                        "passwordList": [
                          { "groupId": 2, "id": 5, "name": "密码02", "number": 2, "authority": 1, "timeInternal": 1561949749, "type": 2 },
                          { "groupId": 2, "id": 6, "name": "密码03", "number": 3, "authority": 1, "timeInternal": 1561974195, "type": 2 }
                        ],
                        "fingerprintList": [
                          { "groupId": 2, "id": 3, "name": "指纹01", "number": 1, "authority": 1, "timeInternal": 1561949200, "type": 1 }
                        ],
                        "nfcList": [],
                        "userGroupType": 1,
                        "userGroupIconId": "default",
                        "userGroupIconUrl": "",
                        "userGroupName": "用户A"
                      },
                      {
                        "userGroupId": 3,
                        "passwordList": [
                          { "groupId": 3, "id": 11, "name": "密码01", "number": 1, "authority": 2, "timeInternal": 536871298, "type": 2 }
                        ],
                        "fingerprintList": [],
                        "nfcList": [],
                        "userGroupType": 2,
                        "userGroupIconId": "default",
                        "userGroupIconUrl": "",
                        "userGroupName": "用户B"
                      }
                    ],
                    "NFCCidBindList": [],
                    "oneTimePasswordList": [
                      {
                        "number": 0,
                        "startTime": 1562845800,
                        "isInvalid": false,
                        "createTime": 1562846204
                      }
                    ]
                  },
                  "1020006468": {
                    "userGroupList": [
                      {
                        "fingerprintList": [],
                        "nfcList": [],
                        "passwordList": [
                          { "authority": 1, "createTime": 1562836099, "groupId": 1, "id": 1, "name": "密码01", "number": 1, "type": 2 }
                        ],
                        "userGroupId": 1,
                        "userGroupName": "我",
                        "userGroupType": 1
                      }
                    ]
                  }
                };
                Service.storage.setThirdUserConfigsForOneKey(Device.model, 234, data).then((res) => {
                  this.setState({ data: JSON.stringify(res, null, '\t') });
                }).catch((error) => {
                  this.setState({ data: JSON.stringify(error, null, '\t') });
                });
              }],
              ["getThirdUserConfigsForOneKey", () => {
                Service.storage.getThirdUserConfigsForOneKey(Device.model, 234).then((res) => {
                  this.setState({ data: JSON.stringify(res.data ? JSON.parse(res.data) : res, null, '\t') });
                }).catch((error) => {
                  this.setState({ data: JSON.stringify(error, null, '\t') });
                });
              }],
            ].map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.button} onPress={() => {
                  item[1].bind(this)();
                  Logger.trace(this, item[1], { action: item[0] });
                }}>
                  <Text style={styles.buttonText}>{item[0]}</Text>
                </TouchableOpacity>
              );
            })
          }
          <TextInput
            style={styles.textContainer}
            onChangeText={(text) => {
              this.setState({ id: text });
            }}
            placeholder="请输入文件或文件夹 id"
            value={this.state.id}
          />
          <TextInput
            style={styles.textContainer}
            onChangeText={(text) => {
              this.setState({ name: text });
            }}
            placeholder="请输入名称或目标文件夹 id"
            value={this.state.name}
          />
          {
            [
              [
                '在指定目录下创建子文件夹', () => {
                  if (!this.state.id || !this.state.name) {
                    alert('请先在输入文件夹 id 和文件夹名称')
                    return;
                  }
                  Service.storage.createMiCloudFolder(this.state.id, this.state.name).then(res => {
                    this.setState({
                      data: JSON.stringify(res, null, '\t'),
                      id: `${res.id}`
                    });
                  }).catch(err => {
                    this.setState({ data: JSON.stringify(err, null, '\t') });
                  })
                }
              ],
              [
                '列出指定文件夹 id 下的内容', () => {
                  if (!this.state.id) {
                    alert('请先在输入文件夹 id')
                    return;
                  }
                  Service.storage.listMiCloudItem(this.state.id).then(res => {
                    this.setState({ data: JSON.stringify(res, null, '\t') });
                    if (res.records && res.records.length > 0) {
                      this.setState({
                        id: `${res.records[0].id}`,
                      });
                    }
                  }).catch(err => {
                    this.setState({ data: JSON.stringify(err, null, '\t') });
                  })
                }
              ],
              [
                '上传文件到云盘', () => {
                  Service.storage.uploadMiCloudFile(this.state.id, this.state.name).then(res => {
                    this.setState({ 
                      data: JSON.stringify(res, null, '\t'),
                      id: res.data.id,
                      name: ''
                    });
                  }).catch(err => {
                    this.setState({ data: JSON.stringify(err, null, '\t') });
                  })
                }
              ],
              [
                '下载云云盘文件到本地', () => {
                  Service.storage.downloadMiCloudFile(this.state.id, this.state.name).then(res => {
                    this.setState({ data: JSON.stringify(res, null, '\t') });
                  }).catch(err => {
                    this.setState({ data: JSON.stringify(err, null, '\t') });
                  })
                }
              ],
              [
                '重命名项目', () => {
                  if (!this.state.id || !this.state.name) {
                    alert('请先在输入 id 和名称')
                    return;
                  }
                  Service.storage.renameMiCloudItem(this.state.id, this.state.name).then(res => {
                    this.setState({ 
                      data: JSON.stringify(res, null, '\t'),
                      name: ''
                  });
                  }).catch(err => {
                    this.setState({ data: JSON.stringify(err, null, '\t') });
                  })
                }
              ],
              [
                '复制指定文件到指定目录下', () => {
                  if (!this.state.id || !this.state.name) {
                    alert('请先在输入项目 id 和目标 id')
                    return;
                  }
                  Service.storage.manageMiCloudFile('NEWCOPY', [{ id: this.state.id, parentId:this.state.name }]).then(res => {
                    this.setState({ 
                      data: JSON.stringify(res, null, '\t')
                    });
                  }).catch(err => {
                    this.setState({ data: JSON.stringify(err, null, '\t') });
                  })
                }
              ]
            ].map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.button} onPress={() => {
                  item[1].bind(this)();
                  Logger.trace(this, item[1], { action: item[0] });
                }}>
                  <Text style={styles.buttonText}>{item[0]}</Text>
                </TouchableOpacity>
              );
            })
          }
          <Text style={styles.textContainer} selectable>
            {this.state.data || '点击按钮查看输出结果'}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    color: '#000',
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    alignSelf: 'center',
    color: '#555',
    fontSize: 14,
    padding: 5
  },
  textContainer: {
    marginTop: 20,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    backgroundColor: '#FFF',
    color: '#666'
  }
});
