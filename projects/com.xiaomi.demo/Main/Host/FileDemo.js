import React from 'react';
import {
  Button,
  Dimensions,
  findNodeHandle,
  FlatList,
  Image,
  PixelRatio, Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import { Device, FileEvent, Host } from "miot";
import { ProgressDialog } from 'miot/ui';

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const imagePathMap = new Map();

export default class FileStorage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      fileName: "",
      fileContent: "",
      encoded: false,
      length: 0,
      imagePath: "",
      visProgress: false,
      progress: 0
    };
  }

  componentDidMount() {

    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    this.fontFamily = {};
    if (Platform.OS === 'android') this.fontFamily = { fontFamily: 'Kmedium' }

    FileEvent.fileDownloadProgress.addListener((data) => {
      let downloaded = data.downloadBytes;
      let all = data.totalBytes;
      let progress = downloaded / all * 100;
      let visProgress = progress < 100;
      console.log(progress)
      this.setState({ progress, visProgress })
    });
  }


  render() {

    var shotimg = null;
    var pic = this.state.imagePath;
    if (pic && pic != "") {
      if (pic.startsWith("/")) {
        pic = "file://" + pic;
      }
      shotimg = <Image style={styles.img}
        source={{ uri: pic, scale: PixelRatio.get() }} />
    }

    return (
      <View style={styles.container}>
        <ScrollView
          style={{backgroundColor: '#ffffff'}}
          ref="myScrollView"
        >
          <View style={[styles.row, { marginTop: 10 }]}>
            <Text style={styles.title}>文件名: </Text>
            <TextInput
              onChangeText={(text) => {
                this.setState({ fileName: text })
              }}
              style={{ flex: 1, marginLeft: 10 }}
              placeholder="输入文件名"
              value={this.state.fileName}
            />
          </View>
          <TextInput
            onChangeText={(text) => {
              this.setState({ fileContent: text })
            }}
            style={{ height: 150 }}
            multiline={true}
            numberOfLines={12}
            placeholder="输入文件内容"
            value={this.state.fileContent}
          />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Button
                title="写文件"
                onPress={() => this._writeFile()}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="写文件(Base64)"
                onPress={() => this._writeFileThroughBase64()}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Button
                title="向文件追加内容"
                onPress={() => this._appendFile()}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="向文件追加内容(Base64)"
                onPress={() => this._appendFileThroughBase64()}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Button
                title="读文件"
                onPress={() => this._readFile()}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="读文件(Base64)"
                onPress={() => this._readFileToBase64()}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Button
                title="上传FDS文件"
                onPress={() => this._uploadFDSFile()}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="获取FDS文件"
                onPress={() => this._fetchFDSFile()}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Button
                title="下载文件"
                onPress={() => this._downLoadFile()}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="解压文件"
                onPress={() => this._unZipFile()}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="读文件列表"
                onPress={() => this._readFileList()}
              />
            </View>
          </View>

          <View style={[styles.row, { justifyContent: "center" }]}>
            <View style={{ flex: 1 }}>
              <Button
                title="删除当前显示的文件"
                onPress={() => this._deleteFile()}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="判断文件是否存在"
                onPress={() => this._isFileExist()}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Button
                title="截图当前页面"
                onPress={() => this._screenShot()}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="长截屏"
                onPress={() => this._longScreenShot()}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Button
                title="截图并保存到相册"
                onPress={() => this._screenShotAndSaveToPhotosAlbum()}
              />
            </View>
          </View>


          <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
            <View style={{ flex: 1, padding: 5 }}>
              <Text style={styles.title}>文件列表</Text>
              <View style={{ height: 1 / PixelRatio.get(), backgroundColor: '#666' }} />
              <FlatList
                data={this.state.dataSource}
                renderItem={({ item }) => this._renderFileList(item.name)}
              />
            </View>

            <View style={{ flex: 1, margin: 5 }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.title}>屏幕截图</Text>
                {shotimg}
              </View>
            </View>

          </View>

        </ScrollView>

        <ProgressDialog
          message={'download progress'}
          max={100}
          progress={this.state.progress}
          onDismiss={() => {
            console.log('onDismiss');
            this.setState({ visProgress: false });
          }}
          visible={this.state.visProgress} />
      </View>
    )
  }

  _renderFileList(item) {
    return (
      <View>
        <TouchableHighlight
          style={[styles.row, { height: 30 }]}
        >
          <Text style={[{ color: '#333333' }, this.fontFamily]}>{item}</Text>
        </TouchableHighlight>
        <View style={{ height: 1 / PixelRatio.get(), backgroundColor: '#666' }} />
      </View>
    )
  }

  // 普通字符串写文件
  _writeFile() {

    if (this.state.fileName === '' || this.state.fileContent === '') {
      alert('请输入文件名或文件内容');
      return;
    }

    Host.file.writeFile(this.state.fileName, this.state.fileContent).then((isSuccess) => {
      alert(JSON.stringify(isSuccess));
    }).catch((error) => {
      alert(JSON.stringify(error))
    });
  }

  // 普通字符串 追加写内容
  _appendFile() {
    Host.file.appendFile(this.state.fileName, this.state.fileContent).then((isSuccess) => {
      alert(JSON.stringify(isSuccess))
    }).catch((error) => {
      alert(JSON.stringify(error))
    });
  }

  // base64 写内容
  _writeFileThroughBase64() {

    if (this.state.fileName === '' || this.state.fileContent === '') {
      alert('请输入文件名或文件内容');
      return;
    }

    Host.file.writeFileThroughBase64(this.state.fileName, this.state.fileContent).then((isSuccess) => {
      alert(isSuccess);
    }).catch((error) => {
      alert(JSON.stringify(error))
    });
  }

  // base64 追加写内容
  _appendFileThroughBase64() {
    Host.file.appendFileThroughBase64(this.state.fileName, this.state.fileContent).then((isSuccess) => {
      alert(isSuccess);
    }).catch((error) => {
      alert(JSON.stringify(error))
    });
  }

  // 普通字符串读内容
  _readFile() {
    Host.file.readFile(this.state.fileName)
      .then((utf8Content) => {
        this.setState({
          fileContent: utf8Content
        });
      })
      .catch((err) => {
        if (typeof obj === "string") {
          alert(err);
        } else {
          alert(JSON.stringify(err));
        }
      });
  }

  // base64 读内容
  _readFileToBase64() {
    Host.file.readFileToBase64(this.state.fileName)
      .then((base64Content) => {
        this.setState({ fileContent: base64Content });
      })
      .catch((err) => {
        if (typeof obj === "string") {
          alert(err);
        } else {
          alert(JSON.stringify(err));
        }
      });
  }

  _isFileExist() {
    Host.file.isFileExists(this.state.fileName)
      .then((isSuccess) => {
        alert(isSuccess);
      })
      .catch(e => {
        alert(e);
      })
  }

  // 获取文件列表
  _readFileList() {
    Host.file.readFileList().then((result) => {
      this.setState({
        dataSource: result
      });
    }).catch((e, result) => {
      alert(JSON.stringify(result));
    })
  }

  // 删除文件
  _deleteFile() {

    Host.file.deleteFile(this.state.fileName)
      .then((isSuccess) => {
        this._readFileList();
        alert(isSuccess);
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  }

  // 截屏-全屏
  _screenShot() {
    let imageName = "screen_" + new Date().getTime() + ".png";
    Host.file.screenShot(imageName)
      .then((imagePath) => {
        imagePathMap.set(imageName, imagePath);
        this.setState({
          imagePath: imagePath
        });
        this._readFileList();
        alert(imagePath);
      })
      .catch((result) => {
        alert(result);
      });
  }

  _longScreenShot() {
    let node = findNodeHandle(this.refs.myScrollView);
    let imageName = "screen_" + new Date().getTime() + ".png";
    Host.file.longScreenShot(node, imageName)
      .then((imagePath) => {
        imagePathMap.set(imageName, imagePath);
        this.setState({
          imagePath: imagePath
        });
        this._readFileList();
        alert(imagePath);
      })
      .catch((result) => {
        alert(result);
      });
  }

  _screenShotAndSaveToPhotosAlbum() {
    let imageName = "screen_" + new Date().getTime() + ".png";
    Host.file.screenShot(imageName)
      .then((imagePath) => {
        imagePathMap.set(imageName, imagePath);
        this.setState({
          imagePath: imagePath
        });
        this._readFileList();
        Host.file.saveImageToPhotosAlbum(imageName).then(_ => {
          alert(imagePath + " 已保存到系统相册");
        }).catch((result) => {
          alert(result);
        })


      })
      .catch((result) => {
        alert(result);
      });
  }

  _fetchFDSFile() {
    let did = Device.deviceID;
    let suffix = "mp3";
    if (this.file_obj_name) {
      console.log('param', { 'obj_name': this.file_obj_name })
      Host.file.getFDSFileInfoWithObjName(this.file_obj_name).then(res => {
        console.log('getfileurl success', res)
        alert('获取成功' + JSON.stringify(res))
      }).catch(err => {
        console.log('getfileurl failed', err)
      })
    } else {
      alert("先上传文件")
    }

  }

  _uploadFDSFile() {
    let did = Device.deviceID;
    let suffix = "mp3";
    Host.file.generateObjNameAndUrlForFDSUpload(did, suffix).then(res => {
      if (res.hasOwnProperty(suffix) && res[suffix]) {
        let obj = res[suffix];
        let obj_name = obj.obj_name;
        let name = obj_name.substring(obj_name.length - 22)
        let content = "AC";
        let time = obj.time;
        this.file_obj_name = obj_name;
        console.log("pre upload", res)

        Host.file.writeFile(name, content).then(r => {
          let param = {
            uploadUrl: obj.url,
            method: obj.method,
            headers: { "Content-Type": "" },
            files: [{ filename: name }]
          }
          Host.file.uploadFileToFDS(param).then(rr => {
            alert('上传成功' + JSON.stringify(rr))
            console.log('upload file success', rr)
          }).catch(err => {
            alert('上传失败' + JSON.stringify(err))
            console.log('upload file failed', err)
          })
        }).catch(err => {
          alert('存储临时文件失败' + JSON.stringify(err))
          console.log("write file failed", err)
        })
      }
    }).catch((error) => {
      console.log(error);
      alert(JSON.stringify(error))
    })
  }

  _downLoadFile() {
    console.log("downLoadFile...")
    let path = "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_zip_23831a541b583ea55ec212f69f3afc07.zip";
    //建议将下载地址替换为自己可用的下载地址
    Host.file.downloadFile(path, "test.zip").then((fileInfo) => {
      console.log("downloadFile...fileInfo", fileInfo);
    }).catch((error) => {
      console.log("downloadFile...error", error);
      alert(JSON.stringify(error))
    });
  }

  _unZipFile() {
    console.log("unZipFile...")
    Host.file.unzipFile("test.zip", "TEST").then((msg) => {
      console.log("unZipFile...msg", msg);
      alert('解压成功： ' + JSON.stringify(msg))
    }).catch((error) => {
      console.log("unZipFile...error", error);
      alert('解压失败： ' + JSON.stringify(error))
    });
  }

}
var styles = StyleSheet.create({
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
  title: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  img: {
    width: screenWidth / 2,
    height: screenHeight / 2,
  },
  row: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  }
})
