import Block from "miot/ui/Gear/Block";
import React, { Component } from "react";
import { View, Text, Dimensions, FlatList, TextInput, ScrollView, StyleSheet, TouchableHighlight, PixelRatio, Platform } from "react-native";
import { ListItem } from 'miot/ui/ListItem';
import Logger from '../Logger';
import { Device, FileEvent, Host } from "miot";
import { ProgressDialog } from 'miot/ui';

/**
 * 本demo以MiSansW-Heavy这个字体举例如何使用SDK的动态字体能力
 * 因为MiSansW-Heavy这个字体已经被app下载使用了，所以不替换下载使用的字体看不到效果
 *
 */
const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
export default class DownloadTest extends Component {
  constructor(props) {
    super(props);
    Logger.trace(this);
    this.state = {
      fileName: '',
      downloadUrl: '',
      visProgress: false,
      progress: 0,
      dataSource: [],
      choicefileName: '',
      fontFamily: undefined // 这里比较关键，不能指定成'MiSansW-Heavy'，否者RN会尝试去加载这个字体
    };
  }

  _downloadFontFile = () => {
    // 这里请替换成自己的测试字体，MiSansW-Heavy这个字体已经被app下载了
    let param = {
      fileName: 'MiSansW-Heavy.otf',
      url: "https://cdn.cnbj1.fds.api.mi-img.com/mijiafont/MiSansW-Heavy.otf"
    };

    Host.file.downloadFontFile(param).then((res) => {
      console.log('bbbbbbbbbbbbbbbbbbbb', res);
      this._readFontFileList();
    }).catch((err) => {
      console.log(err);
    });
  }

  _registerFontEnable = () => {
    let param = {
      fontFamily: this.state.choicefileName
    };
    if (Host.isIOS) {
      Host.file.registerFontEnable(param).then((res) => {
        console.log('register generated font name ', res);
      }).catch((err) => {
        console.log(err);
      });
    } else {
      Host.file.registerFontEnable(param);
    }
    this.setState({ fontFamily: this.state.choicefileName }); // 因为文件已经存在，且注册完成了，那就可以使用这个字体了
  }

  _readFontFileList = () => {
    Host.file.readFontFileList().then((res) => {
      console.log('cccccccccccccccccccccc', res);
      this.setState({ dataSource: res });
    }).catch((err) => {
      console.log(err);
    });
  }

  _deleteFontFile = () => {
    let param = {
      fileName: `${ this.state.choicefileName }.otf`
    };
    if (!this.state.choicefileName) {
      alert('请选择删除字体');
      return;
    }
    Host.file.deleteFontFile(param).then((res) => {
      console.log(res);
      this.setState({
        dataSource: this.state.dataSource.filter((item) => {
          return item.name !== param.fileName;
        }),
        choicefileName: ''
      });
    }).catch((err) => { console.log(err); });
  }

  _renderFileList = (item) => {
    return (
      <View>
        <TouchableHighlight
          underlayColor="#f2f2f2"
          style={[styles.row, { height: 60 }]}
          onPress={() => { this.setState({ choicefileName: item.name.slice(0, -4) }); }}
        >
          <Text style={[{ color: '#333333', fontSize: 12 }, this.fontFamily]}>{item.name}</Text>
        </TouchableHighlight>
        <View style={{ height: 1 / PixelRatio.get(), backgroundColor: '#666' }} />
      </View>
    );
  }

  componentDidMount() {
    FileEvent.fileDownloadProgress.addListener((data) => {
      let downloaded = data.downloadBytes;
      let all = data.totalBytes;
      let progress = downloaded / all * 100;
      let visProgress = progress < 100;
      console.log(progress);
      this.setState({ progress, visProgress });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ padding: 10, height: 200, backgroundColor: '#fff', flexDirection: 'row' }}>
          <View style={{ width: '40%' }}>
            <Text style={styles.title}>已下载字体列表</Text>
            <ScrollView>
              <View style={{ height: 0.5, backgroundColor: '#666' }} />
              <FlatList
                data={this.state.dataSource}
                renderItem={({ item }) => this._renderFileList(item)}
              />
            </ScrollView>
          </View>
          <View style={{ marginLeft: 10, flexGrow: 1 }}>
            <TextInput
              editable = {false}
              style={styles.input}
              placeholder="选择字体"
              value={this.state.choicefileName}
            />
          </View>
        </View>
        <ScrollView style={{ marginTop: 10 }} >
          <View style={{ marginTop: 10 }} >
            {
              [
                ["下载字体文件", this._downloadFontFile],
                ["注册字体", this._registerFontEnable],
                ["读取已下载的字体列表", this._readFontFileList],
                ["删除下载的字体文件", this._deleteFontFile]
              ].map((item, index) => {
                return <ListItem
                  key={index}
                  hideArrow={true}
                  title={item[0]}
                  onPress={() => {
                    item[1]();
                  }}
                ></ListItem>;
              })
            }
            <Text style={[styles.bottomText, { fontFamily: this.state.fontFamily }]}>字体样式</Text>
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
  row: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  bottomText: {
    marginTop: 30,
    marginLeft: screenWidth / 2 - 60,
    fontSize: 30,
    justifyContent: 'center'
  }
});
