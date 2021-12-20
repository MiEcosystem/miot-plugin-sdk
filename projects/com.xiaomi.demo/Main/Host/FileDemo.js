import React from 'react';
import {
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

import { ListItem } from 'miot/ui/ListItem';
import { Device, FileEvent, Host } from "miot";
import { ProgressDialog } from 'miot/ui';
import Logger from '../Logger';
import ProtocolManager from 'miot/utils/protocol-helper';


const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const imagePathMap = new Map();

export default class FileStorage extends React.Component {
  constructor(props) {
    super(props);
    Logger.trace(this);
    this.state = {
      dataSource: [],
      fileName: "",
      fileContent: "",
      encoded: false,
      length: 0,
      imagePath: "",
      visProgress: false,
      progress: 0,
      segOff: 0,
      segLength: 1024
    };
  }

  componentDidMount() {
    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    this.fontFamily = {};
    if (Platform.OS === 'android') this.fontFamily = { fontFamily: 'Kmedium' };
    FileEvent.fileDownloadProgress.addListener((data) => {
      let downloaded = data.downloadBytes;
      let all = data.totalBytes;
      let progress = downloaded / all * 100;
      let visProgress = progress < 100;
      console.log(progress);
      this.setState({ progress, visProgress });
    });

    FileEvent.fileUploadProgress.addListener((data) => {
      let uploadBytes = data.uploadBytes;
      let totalBytes = data.totalBytes;
      let progress = uploadBytes / totalBytes * 100;
      let visProgress = progress < 100;
      console.log('fileUploadProgress', data);
      this.setState({ progress, visProgress });
    });
  }


  render() {

    let shotimg = null;
    let pic = this.state.imagePath;
    if (pic && pic != "") {
      if (pic.startsWith("/")) {
        pic = `file://${ pic }`;
      }
      shotimg = <Image style={styles.img}
        source={{ uri: pic, scale: PixelRatio.get() }} />;
    }

    return (
      <View style={styles.container}>
        <View style={{ padding: 10, backgroundColor: '#fff', flexDirection: 'row' }}>
          <View style={{ width: '40%' }}>
            <Text style={styles.title}>文件列表</Text>
            <View style={{ height: 0.5, backgroundColor: '#666' }} />
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => this._renderFileList(item)}
            />
          </View>
          <View style={{ marginLeft: 10, flexGrow: 1 }}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ fileName: text });
              }}
              placeholder="输入文件名"
              value={this.state.fileName}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ segOff: text.replace(/[^\d]+/, '') });
              }}
              placeholder="输入读取文件的起始位置的偏移"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ segLength: text.replace(/[^\d]+/, '') });
              }}
              placeholder="输入读取的最大字节数"
            />
            <TextInput
              style={[styles.input, { button: 10, marginTop: 10, minHeight: 100, textAlignVertical: 'top' }]}
              onChangeText={(text) => {
                this.setState({ fileContent: text });
              }}
              multiline={true}
              numberOfLines={0}
              placeholder="输入文件内容"
              value={this.state.fileContent}
            />
          </View>
        </View>
        <ScrollView style={{ marginTop: 10 }} showsHorizontalScrollIndicator={false} ref={(ref) => { this.myScrollView = ref; }}>
          {
            [
              [
                ["读存储空间", this._readStorage]
              ],
              [
                ["读沙盒空间", this._readSandbox]
              ],
              [
                ["读文件列表", this._readFileList],
                ["判断文件是否存在", this._isFileExist],
                ["删除当前显示的文件", this._deleteFile]
              ],
              [
                ["创建目录", this._mkdir],
                ["写文件", this._writeFile],
                ["写文件(Base64)", this._writeFileThroughBase64],
                ["复制文件", this._copyFile]
              ],
              [
                ["向文件追加内容", this._appendFile],
                ["向文件追加内容(Base64)", this._appendFileThroughBase64],
                ["保存文件到小米手机的小米便签(只支持MIUI和特定model)", this.saveFileToNotesAppOnMIUI]
              ],
              [
                ["读文件", this._readFile],
                ["读文件(Base64)", this._readFileToBase64],
                ["读文件的一部分(Base64)", this._readFileSegmentToBase64]
              ],
              [
                ["上传文件", this._uploadFile],
                ["下载文件", this._downLoadFile],
                ["取消下载", this._canceldownLoadFile]
              ],
              [
                ["上传FDS文件", this._uploadFDSFile],
                ["获取FDS文件", this._fetchFDSFile]
              ],
              [
                ["解压文件", this._unZipFile],
                ["解压文件为指定格式的字符串", this._ungzipFileToString]
              ],
              [
                ["截图当前页面", this._screenShot],
                ["裁剪截图文件", this._cropImage],
                ["长截屏", this._longScreenShot]
              ],
              [
                ["截图并保存到相册", this._screenShotAndSaveToPhotosAlbum],
                ["保存文件到相册", this._saveFileToPhotosAlbum]
              ],
              [
                ["查询文件", this._queryFile],
                ["写入 PDF 文件", this._saveTextToPdf],
                ["pdf转图片", this._pdfToImage],
                ["读PDF信息", this._readPdfMetaData]
              ]
            ].map((section, index) => {
              return (
                <View style={{ marginTop: 10 }} key={index}>
                  {
                    section.map((item, index) => {
                      return <ListItem
                        hideArrow={true}
                        key={index}
                        title={item[0]}
                        onPress={() => {
                          Logger.trace(this, item[1], { name: item[0] });
                          item[1].bind(this)();
                        }} />;
                    })
                  }
                </View>
              );
            })
          }
          <View style={{ alignItems: 'center', margin: 20 }}>
            {shotimg}
          </View>
        </ScrollView>
        <ProgressDialog
          message={'progress'}
          max={100}
          progress={this.state.progress}
          onDismiss={() => {
            console.log('onDismiss');
            this.setState({ visProgress: false });
          }}
          visible={this.state.visProgress} />
      </View>
    );
  }

  _mkdir() {
    let params = {
      dirPath: 'test12321312312/12/testdir0',
      recursive: true
    };
    Host.file.mkdir(params).then((res) => {
      alert(JSON.stringify(res, null, '\t'));
    }).catch((err) => {
      alert(JSON.stringify(err, null, '\t'));
    });

  }

  _copyFile() {
    let copy_params = {
      srcPath: 'test.pdf',
      dstPath: 'test_copy.pdf'
    };
    Host.file.copyFile(copy_params).then((res) => {
      alert(JSON.stringify(res));
      Host.file.readFileList('').then((res) => {
        alert(JSON.stringify(res));
      });
    }).catch((res) => {
      alert(JSON.stringify(res));
    });

  }

  _queryFile() {
    let params = {
      mimeTypes: ["application/pdf", // pdf
        "application/msword", // word
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
        "application/vnd.ms-excel", // xls,xlt
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
        "application/vnd.ms-powerpoint", // ppt,pot,pps
        "application/vnd.openxmlformats-officedocument.presentationml.presentation", // pptx
        "application/wps"// wps
      ],
      pageSize: 10,
      pageNo: 0
    };
    Host.file.queryFile(params).then((res) => {
      alert(JSON.stringify(res));
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  _ungzipFileToString() {
    let params = {
      fileName: `${ Host.file.storageBasePath }Resources/ungzipFileToString.txt.zip`,
      charsetName: "int-array"
    };

    Host.file.ungzipFileToString(params).then((res) => {
      console.log(`ungzipFileToString,res: ${ res }`);
    }).catch((err) => {
      console.log(`ungzipFileToString,err: ${ JSON.stringify(err) }`);
    });
  }

  // text 写入成 pdf
  _saveTextToPdf() {
    if (this.state.fileName === '' || this.state.fileContent === '') {
      alert('请输入文件名或文件内容');
      return;
    }
    Host.file.writePdfFile(this.state.fileContent, this.state.fileName, {
      color: 'red',
      fontSize: 13,
      pageSize: { width: 375, height: 812 },
      marginHorizontal: 0,
      marginVertical: 0
    }).then((res) => {
      alert(JSON.stringify(res));
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  _pdfToImage() {
    if (Host.isIOS) {
      Host.ui.openIOSDocumentFileChoosePage().then((res) => {
        console.log('----------queryFile:', JSON.stringify(res));
        if (res.data && res.data.length > 0) {
          let pdfDic = res.data[0];
          console.log("----------loadFile:", JSON.stringify(pdfDic));
          if (pdfDic && pdfDic['ext'] == 'pdf' && pdfDic['path']) {
            let path = pdfDic['path'];
            let sourcePath = `${ path }`;

            let pdf_params = {
              srcPath: sourcePath,
              imageDir: 'pdf_image',
              pageIndex: 464,
              password: '123456',
              highQuality: false
            };
            Host.file.pdfToImage(pdf_params).then((res) => {
              alert(JSON.stringify(res));
            }).catch((res) => {
              alert(JSON.stringify(res));
            });
          } else {
            alert('选择的文件不存在或不是pdf格式，请重新选择文件');
          }
        }
      }).catch((err) => {
        alert(JSON.stringify(err));
      });
    } else {
      let params = {
        mimeTypes: ["application/pdf" // pdf
        ],
        pageSize: 1,
        pageNo: 0
      };
      Host.file.queryFile(params).then((res) => {
        if (res && res.data) {
          let pdf_params = {
            srcPath: res.data[0].url,
            imageDir: 'pdf_image',
            pageIndex: 0,
            password: '',
            highQuality: false
          };
          Host.file.pdfToImage(pdf_params).then((res) => {
            alert(JSON.stringify(res));
          }).catch((res) => {
            alert(JSON.stringify(res));
          });

        }
      }).catch((err) => {
        alert(JSON.stringify(err));
      });
    }
  }

  _readPdfMetaData() {
    if (Host.isIOS) {
      Host.ui.openIOSDocumentFileChoosePage().then((res) => {
        console.log('----------queryFile:', JSON.stringify(res));
        if (res.data && res.data.length > 0) {
          let pdfDic = res.data[0];
          console.log("----------loadFile:", JSON.stringify(pdfDic));
          if (pdfDic && pdfDic['ext'] == 'pdf' && pdfDic['path']) {
            let path = pdfDic['path'];
            let sourcePath = `${ path }`;

            let pdf_params = {
              srcPath: sourcePath,
              password: ''
            };
            Host.file.readPdfMetaData(pdf_params).then((res) => {
              alert(JSON.stringify(res));
            }).catch((res) => {
              alert(JSON.stringify(res));
            });
          } else {
            alert('选择的文件不存在或不是pdf格式，请重新选择文件');
          }
        }
      }).catch((err) => {
        alert(JSON.stringify(err));
      });
    } else {
      let params = {
        mimeTypes: ["application/pdf" // pdf
        ],
        pageSize: 1,
        pageNo: 0
      };
      Host.file.queryFile(params).then((res) => {
        if (res && res.data) {
          let pdf_params = {
            srcPath: res.data[0].url,
            password: ''
          };
          Host.file.readPdfMetaData(pdf_params).then((res) => {
            alert(JSON.stringify(res));
          }).catch((res) => {
            alert(JSON.stringify(res));
          });

        }
      }).catch((err) => {
        alert(JSON.stringify(err));
      });
    }
  }

  _renderFileList(item) {
    let info = `${ item.name }\nsize:${ item.size }\nmodifyTime:${ item.modifyTime }`;
    return (
      <View>
        <TouchableHighlight
          style={[styles.row, { height: 60 }]}
        >
          <Text style={[{ color: '#333333', fontSize: 12 }, this.fontFamily]}>{info}</Text>
        </TouchableHighlight>
        <View style={{ height: 1 / PixelRatio.get(), backgroundColor: '#666' }} />
      </View>
    );
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
      alert(JSON.stringify(error));
    });
  }

  // 普通字符串 追加写内容
  _appendFile() {
    Host.file.appendFile(this.state.fileName, this.state.fileContent).then((isSuccess) => {
      alert(JSON.stringify(isSuccess));
    }).catch((error) => {
      alert(JSON.stringify(error));
    });
  }

  // 普通字符串 追加写内容
  saveFileToNotesAppOnMIUI() {
    Host.file.saveFileToNotesAppOnMIUI(this.state.fileName).then((isSuccess) => {
      alert(`saveFileToNotesAppOnMIUI success,${ JSON.stringify(isSuccess) }`);
    }).catch((error) => {
      console.log(`saveFileToNotesAppOnMIUI fail,${ JSON.stringify(error) }`);
      alert(`saveFileToNotesAppOnMIUI fail,${ JSON.stringify(error) }`);
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
      alert(JSON.stringify(error));
    });
  }

  // base64 追加写内容
  _appendFileThroughBase64() {
    Host.file.appendFileThroughBase64(this.state.fileName, this.state.fileContent).then((isSuccess) => {
      alert(isSuccess);
    }).catch((error) => {
      alert(JSON.stringify(error));
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
  _readFileSegmentToBase64() {
    let off = Number.isInteger(parseInt(this.state.segOff)) ? parseInt(this.state.segOff) : 0;
    let len = Number.isInteger(parseInt(this.state.segLength)) ? parseInt(this.state.segLength) : 1024;
    Host.file.readFileSegmentToBase64(this.state.fileName, off, len)
      .then((res) => {
        if (res) {
          let totalLength = res.totalLength;
          let base64Content = res.content;
          alert(`off:${ off },len:${ len }\ntotalLength:${ totalLength }\ncontent:${ base64Content }`);
        }
      })
      .catch((err) => {
        if (typeof err === "string") {
          alert(`_readFileSegmentToBase64 fail:${ err }`);
        } else {
          alert(`_readFileSegmentToBase64 fail:${ JSON.stringify(err) }`);
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
      .catch((e) => {
        alert(e);
      });
  }

  _readStorage() {
    Host.file.getStorageInfo().then((result) => {
      alert(JSON.stringify(result));
    }).catch((e, result) => {
      alert(JSON.stringify(result));
    });
  }

  _readSandbox() {
    Host.file.readFolderSize('').then((result) => {
      alert(JSON.stringify(result));
    }).catch((e, result) => {
      alert(JSON.stringify(result));
    });
  }

  // 获取文件列表
  _readFileList() {
    Host.file.readFileList().then((result) => {
      this.setState({
        dataSource: result
      });
    }).catch((e, result) => {
      alert(JSON.stringify(result));
    });
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
    let imageName = `screen_${ new Date().getTime() }.png`;
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

  _cropImage() {
    if (imagePathMap.size <= 0) {
      alert('please shot screen first');
      return;
    }
    let sourceFileName = imagePathMap.keys().next().value;
    if (!sourceFileName) {
      alert('not found image name');
      return;
    }
    let targetFileName = `crop_${ new Date().getTime() }.png`;
    let params = {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        width: 600,
        height: 800
      },
      displaySize: {
        width: 300,
        height: 400
      }
    };
    Host.file.cropImage(targetFileName, sourceFileName, params)
      .then((imagePath) => {
        imagePathMap.set(targetFileName, imagePath);
        this.setState({
          imagePath
        });
        alert(imagePath);
      })
      .catch((error) => {
        alert(error);
      });
  }

  _longScreenShot() {
    let node = findNodeHandle(this.myScrollView);
    let imageName = `screen_${ new Date().getTime() }.png`;
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
    let imageName = `screen_${ new Date().getTime() }.png`;
    Host.file.screenShot(imageName)
      .then((imagePath) => {
        imagePathMap.set(imageName, imagePath);
        this.setState({
          imagePath: imagePath
        });
        this._readFileList();
        Host.file.saveImageToPhotosAlbum(imageName).then(() => {
          alert(`${ imagePath } 已保存到系统相册`);
        }).catch((result) => {
          alert(result);
        });


      })
      .catch((result) => {
        alert(result);
      });
  }

  // 保存文件到相册
  _saveFileToPhotosAlbum() {
    let url = 'http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp4_855379f77b74ca565e8ef7d68c08264c.mp4';
    let fileName = `file${ new Date().getTime() }.mp4`;
    Host.file.downloadFile(url, fileName).then(() => {
      this._readFileList();
      Host.file.saveFileToPhotosAlbum(fileName).then(() => {
        alert(`${ fileName } 已保存到系统相册`);
      }).catch((result) => {
        alert(result);
      });
    }).catch((error) => {
      alert(JSON.stringify(error));
    });
  }

  _fetchFDSFile() {
    if (this.file_obj_name) {
      console.log('param', { 'obj_name': this.file_obj_name });
      Host.file.getFDSFileInfoWithObjName(this.file_obj_name).then((res) => {
        console.log('getfileurl success', res);
        alert(`获取成功${ JSON.stringify(res) }`);
      }).catch((err) => {
        console.log('getfileurl failed', err);
      });
    } else {
      alert("先上传文件");
    }

  }

  __generateUploadInfo(size, complete) {
    let did = Device.deviceID;
    let suffix = "mp3";
    Host.file.generateObjNameAndUrlForFDSUpload(did, suffix).then((res) => {
      if (res.hasOwnProperty(suffix) && res[suffix]) {
        let obj = res[suffix];
        let obj_name = obj.obj_name;
        let name = obj_name.substring(obj_name.length - 22);
        let content = '';
        while (content.length < size) {
          content = content.concat(`${ content.length }this is sample content 这是个示例内容 😄💻\n`);
        }
        this.file_obj_name = obj_name;
        console.log("pre upload", res);
        Host.file.writeFile(name, content).then(() => {
          complete([true, { url: obj.url, method: obj.method, fileName: name }]);
        }).catch((err) => {
          alert(`存储临时文件失败${ JSON.stringify(err) }`);
          console.log("write file failed", err);
          complete([false, err]);
        });
      } else {
        complete([false, {}]);
      }
    }).catch((error) => {
      console.log(error);
      alert(JSON.stringify(error));
      complete([false, error]);
    });
  }

  _uploadFDSFile() {
    this.__generateUploadInfo(5 * 1024 * 1024, ([isSuccess, obj]) => {
      if (isSuccess) {
        let param = {
          uploadUrl: obj.url,
          method: obj.method,
          headers: { "Content-Type": "" },
          files: [{ filename: obj.fileName }]
        };
        Host.file.uploadFileToFDS(param).then((rr) => {
          alert(`上传成功${ JSON.stringify(rr) }`);
          console.log('upload file success', rr);
        }).catch((err) => {
          alert(`上传失败${ JSON.stringify(err) }`);
          console.log('upload file failed', err);
        });
      } else {
        alert(obj);
      }
    });
  }

  _uploadFile() {
    this.__generateUploadInfo(10 * 1024 * 1024, ([isSuccess, obj]) => {
      if (isSuccess) {
        this.uploadFileUrl = obj.url;
        let param = {
          uploadUrl: obj.url,
          method: obj.method,
          headers: { "Content-Type": "" },
          files: [{
            filename: obj.fileName,
            range: { start: 2, length: 5 * 1024 * 1024 },
            formdata: { name: 'custom_name', filename: 'custom_filename' }
          }]
        };
        Host.file.uploadFile(param).then((rr) => {
          alert(`上传成功${ JSON.stringify(rr) }`);
          console.log('upload file success', rr);
        }).catch((err) => {
          alert(`上传失败${ JSON.stringify(err) }`);
          console.log('upload file failed', err);
        });
      } else {
        alert(obj);
      }
    });
  }

  _downLoadFile() {
    console.log("downLoadFile...");
    let taskID = '1111';
    let path = "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_zip_23831a541b583ea55ec212f69f3afc07.zip";
    // 建议将下载地址替换为自己可用的下载地址
    Host.file.downloadFile(path, "test.zip", { taskID: taskID }).then((fileInfo) => {
      console.log("downloadFile...fileInfo", fileInfo);
    }).catch((error) => {
      console.log("downloadFile...error", error);
      alert(`downloadFile:  ${ JSON.stringify(error) }`);
    });
  }

  _canceldownLoadFile() {
    let taskID = '1111';
    console.log("==============setTimeout====================");
    Host.file.cancelDownloadFile(taskID).then((res) => {
      console.log(`成功${ JSON.stringify(res) }`);
      alert(`成功${ JSON.stringify(res) }`);
      this.setState({ visProgress: false });
    }).catch((err) => {
      console.log(`失败${ JSON.stringify(err) }`);
      alert(`失败${ JSON.stringify(err) }`);
    });

  }

  _unZipFile() {
    console.log("unZipFile...");
    Host.file.unzipFile("test.zip", "TEST").then((msg) => {
      console.log("unZipFile...msg", msg);
      alert(`解压成功： ${ JSON.stringify(msg) }`);
    }).catch((error) => {
      console.log("unZipFile...error", error);
      alert(`解压失败： ${ JSON.stringify(error) }`);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 1
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10
  },
  title: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5
  },
  img: {
    width: screenWidth / 2,
    height: screenHeight / 2,
    resizeMode: 'contain'
  },
  row: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  }
});
