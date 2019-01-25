import React from 'react';
import {
  Dimensions,
  PixelRatio,
  ScrollView,
  Image,
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  findNodeHandle,
} from 'react-native';
import Host from "miot/Host";
const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");


function Base64() {
  // private property
  this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
}

//public method for encoding
Base64.prototype.encode = function (input) {
  var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
  input = this._utf8_encode(input);
  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output +
      this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
      this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
  }
  return output;
}

// public method for decoding
Base64.prototype.decode = function (input) {
  var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
    enc1 = this._keyStr.indexOf(input.charAt(i++));
    enc2 = this._keyStr.indexOf(input.charAt(i++));
    enc3 = this._keyStr.indexOf(input.charAt(i++));
    enc4 = this._keyStr.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  output = this._utf8_decode(output);
  return output;
}

// private method for UTF-8 encoding
Base64.prototype._utf8_encode = function (string) {
  string = string.replace(/\r\n/g, "\n");
  var utftext = "";
  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);
    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }

  }
  return utftext;
}

// private method for UTF-8 decoding
Base64.prototype._utf8_decode = function (utftext) {
  var string = "", i = 0, c = 0, c1 = 0, c2 = 0, c3 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return string;
}

const base64 = new Base64();
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
    };
  }

  componentDidMount() {
    this._readFileList();
  }

  _encode() {
    this.setState({
      fileContent: base64.encode(this.state.fileContent),
      encoded: !this.state.encoded,
    });

  }

  _decode() {
    this.setState({
      fileContent: base64.decode(this.state.fileContent),
      encoded: !this.state.encoded,
    });
  }

  _writeFile() {
    Host.file.writeFile(this.state.fileName, this.state.fileContent).
      then((isSuccess) => {
        this._readFileList();
        alert(isSuccess);
      });
  }

  _writeFileThroughBase64() {
    Host.file.writeFileThroughBase64(this.state.fileName, this.state.fileContent)
      .then((isSuccess) => {
        this._readFileList();
        alert(isSuccess);
      });
  }

  _appendFile() {
    Host.file.appendFile(this.state.fileName, this.state.fileContent)
      .then((isSuccess) => {
        alert(isSuccess);
      });
  }

  _appendFileThroughBase64() {
    Host.file.appendFileThroughBase64(this.state.fileName, this.state.fileContent)
      .then((isSuccess) => {
        alert(isSuccess);
      });
  }

  _readFile(item) {
    this.setState({
      fileName: item
    });
    if (item.startsWith("screen_")) {
      if (imagePathMap.get(item)) {
        this.setState({
          imagePath: imagePathMap.get(item)
        });
      }
    } else {
      Host.file.readFile(item)
        .then((utf8Content) => {
          this.setState({
            fileContent: utf8Content
          });
        })
        .catch((isSuccess) => {
          alert(isSuccess);
        });
    }
  }

  _readFileToHexString() {
    Host.file.readFileToHexString(this.state.fileName)
      .then((hexString) => {
        this.setState({ fileContent: hexString });
      })
      .catch((isSuccess) => {
        alert(isSuccess);
      });
  }

  _readFileToBase64() {
    Host.file.readFileToBase64(this.state.fileName)
      .then((base64Content) => {
        this.setState({ fileContent: base64Content });
      })
      .catch((isSuccess) => {
        alert(isSuccess);
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

  _getLengthOfBase64Data() {
    Host.file.dataLengthOfBase64Data(this.state.fileContent)
      .then((length) => {
        this.setState({ length: length });
      });
  }

  _getSubBase64Data() {
    Host.file.subBase64DataOfBase64Data(this.state.fileContent, 0, this.state.length / 2)
      .then((subData) => {
        this.setState({ fileContent: subData });
      })
      .catch((isSuccess) => {
        alert(isSuccess)
      });
  }

  _readFileList() {
    Host.file.readFileList()
      .then((result) => {
        this.setState({
          dataSource: result
        });
      })
  }

  _deleteFile() {
    Host.file.deleteFile(this.state.fileName)
      .then((isSuccess) => {
        this.setState({
          fileName: "",
          fileContent: "",
          imagePath: "",
        });
        this._readFileList();
        alert(isSuccess);
      })
      .catch((isSuccess) => {
        alert(isSuccess);
      });
  }

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

  _renderFileList(item) {
    return (
      <View>
        <TouchableHighlight
          style={[styles.row, { height: 30 }]}
          onPress={() => this._readFile(item)}
        >
          <Text>{item}</Text>
        </TouchableHighlight>
        <View style={{ height: 1 / PixelRatio.get(), backgroundColor: '#666' }} />
      </View>
    )
  }

    _downLoadFile(){
        console.log("downLoadFile...")
        let path = "http://cdn.cnbj0.fds.api.mi-img.com/miio_fw/8229041d5532e4c8389cce0469299ef3_upd_inshow.watch.w1.bin?GalaxyAccessKeyId=5721718224520&Expires=1550972034000&Signature=yCSX06T+IKQ0RHkAznK+H8PRtlc=";
        Host.file.downloadFile(path, "DFU.zip").then((fileInfo)=>{
            console.log("downloadFile...fileInfo", fileInfo);
            this.zipFilePath = fileInfo.path;
        }).catch((error)=>{
            console.log("downloadFile...error", error);
        });
    }

    _unZipFile(){
        console.log("unZipFile...")
        Host.file.unzipFile("DFU.zip", "DFU").then((msg)=>{
            console.log("unZipFile...msg", msg);
        }).catch((error)=>{
            console.log("unZipFile...error", error);
        });
    }

    _readFileListWithFolder(){
        Host.file.readFileList("DFU").then((result)=>{
            console.log("readFileList...result", result);
        }).catch((error, msg)=>{
            console.log("readFileList...error", error, msg);
        })
    }

  render() {
    return (
      <ScrollView
        ref="myScrollView"
      >
        <View style={styles.row}>
          <Text style={styles.title}>文件名</Text>
          <TextInput
            onChangeText={(text) => { this.setState({ fileName: text }) }}
            style={{ flex: 1, marginLeft: 10, borderBottomColor: '#aaa', borderBottomWidth: 1 }}
            placeholder="输入文件名"
            value={this.state.fileName}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.title, { flex: 1 }]}>{"文件内容 / 长度 " + this.state.length}</Text>
          <Button
            title={this.state.encoded ? "Decode(Base64)" : "Encode(Base64)"}
            onPress={this.state.encoded ? () => this._decode() : () => this._encode()}
          />
        </View>
        <TextInput
          onChangeText={(text) => { this.setState({ fileContent: text }) }}
          style={{ height: 150, borderColor: '#aaa', borderWidth: 1, }}
          multiline={true}
          numberOfLines={12}
          placeholder="输入文件内容"
          value={this.state.fileContent}
        />
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
                      onPress={() => this._readFileListWithFolder()}
                  />
              </View>
          </View>
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
              title="添加内容"
              onPress={() => this._appendFile()}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="添加内容(Base64)"
              onPress={() => this._appendFileThroughBase64()}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Button
              title="读文件(Base64)"
              onPress={() => this._readFileToBase64()}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="读文件(HexString)"
              onPress={() => this._readFileToHexString()}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Button
              title="读取 base64 data长度"
              onPress={() => this._getLengthOfBase64Data()}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="获取子data(half)"
              onPress={() => this._getSubBase64Data()}
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
            <View style={{ flex: 1, alignItems: "center" }} >
              <Text style={styles.title}>屏幕截图</Text>
              {this.state.imagePath &&
                <Image style={styles.img} source={{ uri: this.state.imagePath, scale: PixelRatio.get() }} />
              }
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}
var styles = StyleSheet.create({
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
