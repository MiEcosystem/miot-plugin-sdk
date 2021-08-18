/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * 基于react-native-pdf@6.2.0
 * 但是去掉了对以下库的依赖：
 * @react-native-community/progress-bar-android，
 * @react-native-community/progress-view
 * rn-fetch-blob
 * crypto-js/sha1
 */
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  requireNativeComponent,
  View,
  Platform,
  ViewPropTypes,
  StyleSheet,
  Image
} from 'react-native';
// import { ProgressBar } from '@react-native-community/progress-bar-android'
// import { ProgressView } from '@react-native-community/progress-view'
import * as Progress from 'react-native-progress';
import Host from '../../Host';
// import RNFetchBlob from 'rn-fetch-blob';
// const SHA1 = require('crypto-js/sha1');
import PdfView from './PdfView';
export default class Pdf extends Component {
    static propTypes = {
      ...ViewPropTypes,
      source: PropTypes.oneOfType([
        PropTypes.shape({
          uri: PropTypes.string,
          cache: PropTypes.bool,
          expiration: PropTypes.number
        }),
        // Opaque type returned by require('./test.pdf')
        PropTypes.number
      ]).isRequired,
      page: PropTypes.number,
      scale: PropTypes.number,
      minScale: PropTypes.number,
      maxScale: PropTypes.number,
      horizontal: PropTypes.bool,
      spacing: PropTypes.number,
      password: PropTypes.string,
      progressBarColor: PropTypes.string,
      activityIndicator: PropTypes.any,
      activityIndicatorProps: PropTypes.any,
      enableAntialiasing: PropTypes.bool,
      enableAnnotationRendering: PropTypes.bool,
      enablePaging: PropTypes.bool,
      enableRTL: PropTypes.bool,
      fitPolicy: PropTypes.number,
      trustAllCerts: PropTypes.bool,
      onLoadComplete: PropTypes.func,
      onPageChanged: PropTypes.func,
      onError: PropTypes.func,
      onPageSingleTap: PropTypes.func,
      onScaleChanged: PropTypes.func,
      onPressLink: PropTypes.func,
      // Props that are not available in the earlier react native version, added to prevent crashed on android
      accessibilityLabel: PropTypes.string,
      importantForAccessibility: PropTypes.string,
      renderToHardwareTextureAndroid: PropTypes.string,
      testID: PropTypes.string,
      onLayout: PropTypes.bool,
      accessibilityLiveRegion: PropTypes.string,
      accessibilityComponentType: PropTypes.string
    };
    static defaultProps = {
      password: "",
      scale: 1,
      minScale: 1,
      maxScale: 3,
      spacing: 10,
      fitPolicy: 2, // fit both
      horizontal: false,
      page: 1,
      enableAntialiasing: true,
      enableAnnotationRendering: true,
      enablePaging: false,
      enableRTL: false,
      activityIndicatorProps: { color: '#009900', progressTintColor: '#009900' },
      trustAllCerts: true,
      usePDFKit: true,
      onLoadProgress: (percent) => {
      },
      onLoadComplete: (numberOfPages, path) => {
      },
      onPageChanged: (page, numberOfPages) => {
      },
      onError: (error) => {
      },
      onPageSingleTap: (page, x, y) => {
      },
      onScaleChanged: (scale) => {
      },
      onPressLink: (url) => {
      }
    };
    constructor(props) {
      super(props);
      this.state = {
        path: '',
        isDownloaded: false,
        progress: 0,
        isSupportPDFKit: -1
      };
      this.lastRNBFTask = null;
    }
    componentDidUpdate(prevProps) {
      const nextSource = Image.resolveAssetSource(this.props.source);
      const curSource = Image.resolveAssetSource(prevProps.source);
      if ((nextSource.uri !== curSource.uri)) {
        // if has download task, then cancel it.
        if (this.lastRNBFTask) {
          this._cancelDownload(this.lastRNBFTask);
          this.lastRNBFTask = null;
        } else {
          this._loadFromSource(this.props.source);
        }
      }
    }
    componentDidMount() {
      this._mounted = true;
      if (Platform.OS === "ios") {
        const PdfViewManagerNative = require('react-native').NativeModules.PdfViewManager;
        PdfViewManagerNative.supportPDFKit((isSupportPDFKit) => {
          if (this._mounted) {
            this.setState({ isSupportPDFKit: isSupportPDFKit ? 1 : 0 });
          }
        });
      }
      this._loadFromSource(this.props.source);
    }
    componentWillUnmount() {
      this._mounted = false;
      if (this.lastRNBFTask) {
        // this.lastRNBFTask.cancel(err => {
        // });
        this._cancelDownload(this.lastRNBFTask);
        this.lastRNBFTask = null;
      }
    }
    _cancelDownload(lastDownloadTask) {
      if (lastDownloadTask && typeof lastDownloadTask === 'string') {
        Host.file.cancelDownloadFile(lastDownloadTask).catch((err) => {
          console.log('pdfviewer cancelDownloadFile error:', lastDownloadTask);
        });
      }
    }
    _loadFromSource = (newSource) => {
      const source = Image.resolveAssetSource(newSource) || {};
        
      let uri = source.uri || '';
      // first set to initial state
      if (this._mounted) {
        this.setState({ isDownloaded: false, path: '', progress: 0 });
      }
      this._prepareFile(source);
    };
    _prepareFile = async(source) => {
      try {
        if (source.uri) {
          let uri = source.uri || '';
          const isNetwork = !!(uri && uri.match(/^https?:\/\//));
          const isAsset = !!(uri && uri.match(/^bundle-assets:\/\//));
          const isBase64 = !!(uri && uri.match(/^data:application\/pdf;base64/));
            
          const cacheFile = 'pdfviewer_cache/temp.pdf';
          // const cacheFile = RNFetchBlob.fs.dirs.CacheDir + '/' + SHA1(uri) + '.pdf';
          // delete old cache file
          // this._unlinkFile(cacheFile);
                
          if (isNetwork) {
            console.log('------------pdf isNetwork');
            this._downloadFile(source, cacheFile);
                    
          } else if (isAsset) {
            console.log('pdfviewer Asset Resource is not supported');
          } else if (isBase64) {
            console.log('pdfviewer Base64 Resource is not supported');
          } else {
            if (this._mounted) {
              this.setState({
                path: uri.replace(/file:\/\//i, ''),
                isDownloaded: true
              });
            }
          }
        } else {
          this._onError(new Error('no pdf source!'));
        }
      } catch (e) {
        this._onError(e);
      }
    };
     _downloadFile = async(source, cacheFile) => {
       Host.file.deleteFile(cacheFile).catch((err) => {
         console.log('pdfviewer _downloadFile, deleteFile error:', JSON.stringify(err));
       }).finally(() => {
         this._cancelDownload(this.lastRNBFTask);
         this.lastRNBFTask = ''.concat(Date.now(), cacheFile);
         console.log('pdfviewer start download:', cacheFile);
         Host.file.downloadFile(source.uri, cacheFile, { taskID: this.lastRNBFTask }).then((res) => {
           console.log('pdfviewer download:', JSON.stringify(res));
           let path = res.path;
           Host.file.isFileExists(cacheFile).then((res) => {
             if (this._mounted) {
               this.setState({ path: path, isDownloaded: true, progress: 1 });
             }  
           }).catch((err) => {
             console.log('pdfviewer file not exist:', JSON.stringify(err));
           });
                
         }).catch((err) => {
           console.log('pdfviewer download file error,', JSON.stringify(err));
         });
       });
     };
    _unlinkFile = async(file) => {
      // try {
      //     await RNFetchBlob.fs.unlink(file);
      // } catch (e) {
      // }
    }
    setNativeProps = (nativeProps) => {
      if (this._root) {
        this._root.setNativeProps(nativeProps);
      }
    };
    setPage(pageNumber) {
      if ((pageNumber === null) || (isNaN(pageNumber))) {
        throw new Error('Specified pageNumber is not a number');
      }
      this.setNativeProps({
        page: pageNumber
      });
    }
    _onChange = (event) => {
      let message = event.nativeEvent.message.split('|');
      // __DEV__ && console.log("onChange: " + message);
      if (message.length > 0) {
        if (message.length > 5) {
          message[4] = message.splice(4).join('|');
        }
        if (message[0] === 'loadComplete') {
          this.props.onLoadComplete && this.props.onLoadComplete(Number(message[1]), this.state.path, {
            width: Number(message[2]),
            height: Number(message[3])
          },
          message[4] && JSON.parse(message[4]));
        } else if (message[0] === 'pageChanged') {
          this.props.onPageChanged && this.props.onPageChanged(Number(message[1]), Number(message[2]));
        } else if (message[0] === 'error') {
          this._onError(new Error(message[1]));
        } else if (message[0] === 'pageSingleTap') {
          this.props.onPageSingleTap && this.props.onPageSingleTap(message[1], message[2], message[3]);
        } else if (message[0] === 'scaleChanged') {
          this.props.onScaleChanged && this.props.onScaleChanged(message[1]);
        } else if (message[0] === 'linkPressed') {
          this.props.onPressLink && this.props.onPressLink(message[1]);
        }
      }
    };
    _onError = (error) => {
      this.props.onError && this.props.onError(error);
    };
    render() {
      if (Platform.OS === "android" || Platform.OS === "ios") {
        return (
          <View style={[this.props.style, { overflow: 'hidden' }]}>
            {!this.state.isDownloaded ?
              (<View
                style={styles.progressContainer}
              >
                {/* {this.props.activityIndicator
                                    ? this.props.activityIndicator
                                    : Platform.OS === 'android'
                                        ? <ProgressBar
                                            progress={this.state.progress}
                                            indeterminate={false}
                                            styleAttr="Horizontal"
                                            style={styles.progressBar}
                                            {...this.props.activityIndicatorProps}
                                        />
                                        : <ProgressView
                                            progress={this.state.progress}
                                            style={styles.progressBar}
                                            {...this.props.activityIndicatorProps}
                                        />} */
                }
                <Progress.CircleSnail
                  progress={this.state.progress}
                />
              </View>) : (
                Platform.OS === "android" ? (
                  <PdfCustom
                    ref={(component) => (this._root = component)}
                    {...this.props}
                    style={[{ flex: 1, backgroundColor: '#EEE' }, this.props.style]}
                    path={this.state.path}
                    onChange={this._onChange}
                  />
                ) : (
                  this.props.usePDFKit && this.state.isSupportPDFKit === 1 ? (
                    <PdfCustom
                      ref={(component) => (this._root = component)}
                      {...this.props}
                      style={[{ backgroundColor: '#EEE', overflow: 'hidden' }, this.props.style]}
                      path={this.state.path}
                      onChange={this._onChange}
                    />
                  ) : (<PdfView
                    {...this.props}
                    style={[{ backgroundColor: '#EEE', overflow: 'hidden' }, this.props.style]}
                    path={this.state.path}
                    onLoadComplete={this.props.onLoadComplete}
                    onPageChanged={this.props.onPageChanged}
                    onError={this._onError}
                    onPageSingleTap={this.props.onPageSingleTap}
                    onScaleChanged={this.props.onScaleChanged}
                    onPressLink={this.props.onPressLink}
                  />)
                )
              )}
          </View>);
      } else {
        return (null);
      }
    }
}
if (Platform.OS === "android") {
  var PdfCustom = requireNativeComponent('RCTPdf', Pdf, {
    nativeOnly: { path: true, onChange: true }
  });
} else if (Platform.OS === "ios") {
  var PdfCustom = requireNativeComponent('RCTPdfView', Pdf, {
    nativeOnly: { path: true, onChange: true }
  });
}
const styles = StyleSheet.create({
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressBar: {
    width: 200,
    height: 2
  }
});