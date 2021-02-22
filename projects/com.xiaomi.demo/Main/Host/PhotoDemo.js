// index.ios.js

'use strict';

import { Host } from "miot";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import Video from 'react-native-video';
import Logger from '../Logger';

export default class PhotoDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentAsset: {}
    };
    Logger.trace(this);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          [
            ['截图保存到手机相册', this.snapImageSaveToPhoto],
            ['下载视频保存到手机相册', this.downloadVideoSaveToPhoto],
            ['下载文件保存到手机公共目录', this.downloadFileSaveToPhoto],
            ['截图保存到指定名称为did的手机相册', this.snapImageSaveToDidAlbum],
            ['下载视频保存到指定名称为did的手机相册', this.downloadVideoSaveToDidAlbum],
            ['获取指定did的相册中的第一个图片', this.getFirstImageFromDidAlbum],
            ['获取指定did的相册中的第一个视频', this.getFirstVideoFromDidAlbum],
            ['删除指定did相册中的第一个视频或照片', this.deleteFirstAssetFromDidAlbum],
            ['分享当前的视频或照片', () => Host.ui.openSystemShareWindow(this.state.currentAsset.url)],
            ['获取相册列表', this.getAlbums],
            ['获取相册中的内容', this.getAsserts]
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
        {this.renderAsset()}
      </ScrollView >
    );
  }

  renderAsset() {
    console.log(`photodemo_log${ JSON.stringify(this.state.currentAsset) }`);
    if (this.state.currentAsset == null) {
      return null;
    }
    if (this.state.currentAsset.length == 0) {
      return null;
    } else {
      let url = this.state.currentAsset.url;
      let mediaType = this.state.currentAsset.mediaType;
      let width = this.state.currentAsset.pixelWidth;
      let height = this.state.currentAsset.pixelHeight;
      if (mediaType == 1) {
        return <Image source={{ uri: url, width: width, height: height }} style={{ marginTop: 20, alignSelf: 'center', width: 150, height: 150 }} />;
      } else if (mediaType == 2) {
        let path = this.state.currentAsset.path;
        return <View>
          <Image source={{ uri: url, width: width, height: height }} style={{ marginTop: 20, alignSelf: 'center', width: 150, height: 150 }} />
          <Video style={{ marginTop: 20, marginBottom: 20, alignSelf: 'center', width: 200, height: 200 }}
            source={{ uri: path }}
            paused={false}
            resizeMode="contain"
            onEnd={() => { alert('Done!'); }}
            repeat={false}
            onError={() => { console.log('Callback when video cannot be loaded'); }}
          />
        </View>;
      }
    }
  }

  snapImageSaveToPhoto() {
    let imageName = `screen_${ new Date().getTime() }.png`;
    Host.file.screenShot(imageName)
      .then((imagePath) => {
        Host.file.saveImageToPhotosAlbum(imageName).then((_) => {
          alert(`${ imagePath } 已保存到系统相册`);
        }).catch((result) => {
          alert(result);
        });
      })
      .catch((result) => {
        alert(result);
      });
  }

  downloadVideoSaveToPhoto() {
    let url = 'http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp4_855379f77b74ca565e8ef7d68c08264c.mp4';
    let fileName = `file${ new Date().getTime() }.mp4`;
    Host.file.downloadFile(url, fileName).then((res) => {
      Host.file.saveFileToPhotosAlbum(fileName).then(() => {
        alert(`${ fileName } 已保存到系统相册`);
      }).catch((result) => {
        alert(result);
      });
    }).catch((error) => {
      alert(JSON.stringify(error));
    });
  }

  snapImageSaveToDidAlbum() {
    let imageName = `screen_${ new Date().getTime() }.png`;
    Host.file.screenShot(imageName)
      .then((imagePath) => {
        Host.file.saveImageToPhotosDidAlbum(imageName).then(() => {
          alert("已保存到相册");
        }).catch((result) => {
          alert(JSON.stringify(result));
        });
      })
      .catch((result) => {
        alert(JSON.stringify(result));
      });
  }

  downloadVideoSaveToDidAlbum() {
    let url = 'http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp4_855379f77b74ca565e8ef7d68c08264c.mp4';
    let fileName = `file${ new Date().getTime() }.mp4`;
    Host.file.downloadFile(url, fileName).then((res) => {
      Host.file.saveVideoToPhotosDidAlbum(fileName).then(() => {
        alert(`${ fileName } 已保存到相册`);
      }).catch((result) => {
        alert(result);
      });
    }).catch((error) => {
      alert(JSON.stringify(error));
    });
  }

  downloadFileSaveToPhoto() {
    console.log("downloadFileSaveToPhoto...");
    let path = "http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_zip_23831a541b583ea55ec212f69f3afc07.zip";
    let fileName = `file${ new Date().getTime() }.zip`;
    Host.file.downloadFile(path, fileName).then((fileInfo) => {
      console.log("downloadFile...fileInfo", fileInfo);
      Host.file.saveFileToPhotosAlbum(fileName).then(() => {
        alert(`${ fileName } 已保存到系统公共目录`);
      }).catch((result) => {
        alert(`saveFileToPhotosAlbum error:  ${ JSON.stringify(result) }`);
      });
    }).catch((error) => {
      console.log("downloadFile...error", error);
      alert(`downloadFile error:  ${ JSON.stringify(error) }`);
    });
  }


  getFirstImageFromDidAlbum() {
    Host.file.getAllSourceFromPhotosDidAlbum().then((res) => {
      let sources = res.data;
      alert(JSON.stringify(sources));
      if (sources && sources.length > 0) {
        for (let index = 0; index < sources.length; index++) {
          const element = sources[index];
          if (element.mediaType == 1) {
            this.setState({
              currentAsset: element
            });
            break;
          }
        }
      } else {
        this.setState({
          currentAsset: {}
        });
      }
      this.setState({});
    }).catch((result) => {
      alert(result);
    });
  }

  getFirstVideoFromDidAlbum() {
    Host.file.getAllSourceFromPhotosDidAlbum().then((res) => {
      let sources = res.data;
      alert(JSON.stringify(sources));
      if (sources && sources.length > 0) {
        for (let index = 0; index < sources.length; index++) {
          const element = sources[index];
          if (element.mediaType == 2) {
            this.setState({
              currentAsset: element
            });
            break;
          }
        }
      } else {
        this.setState({
          currentAsset: {}
        });
      }
      Host.file.fetchLocalVideoFilePathFromDidAlbumByUrl(this.state.currentAsset.url).then((res) => {
        let c = this.state.currentAsset;
        c.path = res.data;
        this.setState({
          currentAsset: c
        });
      }).catch(() => {
        this.setState({});
      });

    }).catch((result) => {
      alert(result);
    });
  }

  deleteFirstAssetFromDidAlbum() {
    Host.file.getAllSourceFromPhotosDidAlbum().then((res) => {
      let sources = res.data;
      let todeleteAsset = [];
      if (sources && sources.length > 0) {
        for (let index = 0; index < sources.length; index++) {
          const element = sources[index];
          todeleteAsset.push(element.url);
          break;
        }
      }
      Host.file.deleteAssetsFromAlbumByUrls(todeleteAsset).then((res) => {
        alert('删除成功');
        this.setState({
          currentAsset: {}
        });
      }).catch(() => {
        alert('删除失败');
        this.setState({
          currentAsset: {}
        });
      });
    }).catch((result) => {
      alert(result);
    });
  }

  getAlbums() {
    Host.file.getAlbums().then((res) => {
      alert(JSON.stringify(res, null, '\t'));
      if (res.data && res.data.length > 0) {
        this.albumID = res.data[res.data.length - 1].albumID;
        this.setState({
          currentAsset: res.data[res.data.length - 1].thumb
        });
      }
    }).catch((err) => {
      alert(JSON.stringify(err, null, '\t'));
    });
  }

  getAsserts() {
    if (!this.albumID) {
      alert('请先获取相册列表，确保有有效相册');
      return;
    }
    Host.file.getAssets(this.albumID).then((res) => {
      alert(JSON.stringify(res, null, '\t'));
      if (res.data && res.data.length > 0) {
        this.setState({
          currentAsset: res.data[res.data.length - 1]
        });
      }
    }).catch((err) => {
      alert(JSON.stringify(err, null, '\t'));
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    color: '#000',
    width: '90%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center'
  },
  buttonText: {
    alignSelf: 'center',
    color: '#555',
    fontSize: 14,
    padding: 5
  }
});
