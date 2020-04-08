//index.ios.js

'use strict';

import { Host } from "miot";
import React from 'react';
import { PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import Video from 'react-native-video';

export default class PhotoDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentAsset: {}
    };
  }

  componentWillMount() {

  }

  componentWillUnmount() {
  }

  render() {
    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    let fontFamily = {};
    if (Platform.OS === 'android') fontFamily = { fontFamily: 'Kmedium' }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.touchable} onPress={() => {
            this.snapImageSaveToPhoto();
          }}>
            <Text style={{ fontSize: 15 }}>截图保存到手机相册</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.touchable} onPress={() => {
            this.downloadVideoSaveToPhoto();
          }}>
            <Text style={{ fontSize: 15 }}>下载视频保存到手机相册</Text>
          </TouchableOpacity>
        </View >
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.touchable} onPress={() => {
            this.snapImageSaveToDidAlbum();
          }}>
            <Text style={{ fontSize: 15 }}>截图保存到指定名称为did的手机相册</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.touchable} onPress={() => {
            this.downloadVideoSaveToDidAlbum()
          }}>
            <Text style={{ fontSize: 15 }}>下载视频保存到指定名称为did的手机相册</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.touchable} onPress={() => {
            this.getFirstImageFromDidAlbum();
          }}>
            <Text style={{ fontSize: 15 }}>获取指定did的相册中的第一个图片</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.touchable} onPress={() => {
            this.getFirstVideoFromDidAlbum();
          }}>
            <Text style={{ fontSize: 15 }}>获取指定did的相册中的第一个视频</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.touchable} onPress={() => {
            this.deleteFirstAssetFromDidAlbum();
          }}>
            <Text style={{ fontSize: 15 }}>删除指定did相册中的第一个视频或照片</Text>
          </TouchableOpacity>
        </View>
        {this.renderAsset()}
      </ScrollView >
    );
  }

  renderAsset() {
    console.log('photodemo_log' + JSON.stringify(this.state.currentAsset));
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
        return <Image
          source={{
            uri: url,
            width: width,
            height: height,
          }}
          style={{ width: 150, height: 150, }}
        />
      } else if (mediaType == 2) {
        let path = this.state.currentAsset.path;
        return <View>
          <Image
            source={{
              uri: url,
              width: width,
              height: height,
            }}
            style={{ width: 150, height: 150, }}
          />
          <Video
            style={{ width: 200, height: 200 }}
            source={{
              uri: path,
            }}
            paused={true}
            resizeMode='contain'
            onEnd={() => {
              alert('Done!')
            }}
            repeat={false}
            onError={() => {
              console.log('Callback when video cannot be loaded');
            }}
          />
        </View>
        return
      }
    }
  }

  snapImageSaveToPhoto() {
    let imageName = "screen_" + new Date().getTime() + ".png";
    Host.file.screenShot(imageName)
      .then((imagePath) => {
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

  downloadVideoSaveToPhoto() {
    let url = 'http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp4_855379f77b74ca565e8ef7d68c08264c.mp4';

    let fileName = "file" + new Date().getTime() + ".mp4";
    Host.file.downloadFile(url, fileName).then((res) => {
      Host.file.saveFileToPhotosAlbum(fileName).then(() => {
        alert(fileName + " 已保存到系统相册");
      }).catch((result) => {
        alert(result);
      })
    }).catch((error) => {
      alert(JSON.stringify(error));
    })
  }

  snapImageSaveToDidAlbum() {
    let imageName = "screen_" + new Date().getTime() + ".png";
    Host.file.screenShot(imageName)
      .then((imagePath) => {
        Host.file.saveImageToPhotosDidAlbum(imageName).then(() => {
          alert("已保存到相册");
        }).catch((result) => {
          alert(JSON.stringify(result));
        })
      })
      .catch((result) => {
        alert(JSON.stringify(result));
      });
  }

  downloadVideoSaveToDidAlbum() {
    let url = 'http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_mp4_855379f77b74ca565e8ef7d68c08264c.mp4';

    let fileName = "file" + new Date().getTime() + ".mp4";
    Host.file.downloadFile(url, fileName).then((res) => {
      Host.file.saveVideoToPhotosDidAlbum(fileName).then(() => {
        alert(fileName + " 已保存到相册");
      }).catch((result) => {
        alert(result);
      })
    }).catch((error) => {
      alert(JSON.stringify(error));
    })
  }

  getFirstImageFromDidAlbum() {
    Host.file.getAllSourceFromPhotosDidAlbum().then((res) => {
      let sources = res.data;
      if (sources && sources.length > 0) {
        for (let index = 0; index < sources.length; index++) {
          const element = sources[index];
          if (element.mediaType == 1) {
            this.state.currentAsset = element;
            break;
          }
        }
      } else {
        this.state.currentAsset = {};
      }
      this.setState({});
    }).catch((result) => {
      alert(result);
    })
  }

  getFirstVideoFromDidAlbum() {
    Host.file.getAllSourceFromPhotosDidAlbum().then((res) => {
      let sources = res.data;
      if (sources && sources.length > 0) {
        for (let index = 0; index < sources.length; index++) {
          const element = sources[index];
          if (element.mediaType == 2) {
            this.state.currentAsset = element;
            break;
          }
        }
      } else {
        this.state.currentAsset = {};
      }

      Host.file.fetchLocalVideoFilePathFromDidAlbumByUrl(this.state.currentAsset.url).then((res) => {
        this.state.currentAsset.path = res.data;
        this.setState({});
      }).catch(() => {
        this.setState({});
      });
    }).catch((result) => {
      alert(result);
    })
  }

  deleteFirstAssetFromDidAlbum() {
    Host.file.getAllSourceFromPhotosDidAlbum().then((res) => {
      let sources = res.data;
      var todeleteAsset = [];
      if (sources && sources.length > 0) {
        for (let index = 0; index < sources.length; index++) {
          const element = sources[index];
          todeleteAsset.push(element.url);
          break;
        }
      }
      Host.file.deleteAssetsFromAlbumByUrls(todeleteAsset).then((res) => {
        alert('删除成功');
        this.state.currentAsset = {};
        this.setState({});
      }).catch(() => {
        alert('删除失败');
        this.state.currentAsset = {};
        this.setState({});
      });
    }).catch((result) => {
      alert(result);
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#F5FCFF',
  },
  rowContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  touchable: {
  }
});
