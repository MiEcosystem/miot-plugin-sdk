'use strict';

import { AudioEvent, Host } from "miot";
import React from 'react';
import { PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Logger from '../Logger';
const audioPlayerUid = 'com.xiaomi.demoios';

let fileName = 'test.wav';

export default class MHAudioDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      audioRecorderPeakPower: ''
    };
    Logger.trace(this);
  }

  componentDidMount() {
    this.s0 = AudioEvent.updateAudioPlayerTime.addListener((event) => {
      if (event.audioPlayerUid === audioPlayerUid) {
        console.log(event.currentTime);// 播放器播放的时间
      }
    });
    this.s1 = AudioEvent.audioPlayerDidFinishPlaying.addListener((event) => {
      console.log("播放完成,再次播放");
      if (event.audioPlayerUid === audioPlayerUid) {
        if (__DEV__ && console.warn) {
          console.warn("播放完成,再次播放");
        }
        this._startPlayButtonClicked();
      }
    });
    this.s2 = AudioEvent.audioPlayerDidStartPlaying.addListener((event) => {
      if (event.audioPlayerUid === audioPlayerUid) {
        alert('播放开始');
        if (__DEV__ && console.warn) {
          console.warn(JSON.stringify(event));
        }
      }
    });
  }

  componentWillUnmount() {
    this.s0 && this.s0.remove();
    this.s1 && this.s1.remove();
    this.s2 && this.s2.remove();
    this._stopPeakPowerLoop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.buttonText, { marginTop: 20 }]}>{`PeakPower: ${ this.state.audioRecorderPeakPower }`}</Text>
        {
          [
            ['isAbleToRecord', () => alert(Host.audio.isAbleToRecord())],
            ['录音开始', this._startRecordButtonClicked],
            ['录音结束', this._stopRecordButtonClicked],
            ['播放开始', this._startPlayButtonClicked],
            ['播放结束', this._stopPlayButtonClicked],
            ['格式转换 wav -> Amr', this._convertButtonWavToAmrClicked],
            ['格式转换 amr -> Wav', this._convertButtonAmrToWavClicked]
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
      </View >
    );
  }

  _startRecordButtonClicked() {
    let settings = {
      AVFormatIDKey: 'audioFormatLinearPCM',
      AVSampleRateKey: 9500,
      AVNumberOfChannelsKey: 2,
      AVEncoderAudioQualityKey: 'audioQualityHigh',
      AVLinearPCMBitDepthKey: 16,
      AVLinearPCMIsBigEndianKey: false,
      AVLinearPCMIsFloatKey: false
    };
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, null)
        .then((granted) => {
          console.log("granted", granted);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Host.audio.startRecord(fileName, settings).then(() => {
              console.log('startRecord');
              this._startPeakPowerLoop();
            });
          }
        }).catch((error) => {
          console.log("error", error);
        });
    } else {
      Host.audio.startRecord(fileName, settings).then(() => {
        console.log('startRecord');
        this._startPeakPowerLoop();
      }).catch((err) => {
        console.log(`startRecord catch error${ err }`);
      });
    }
  }

  _stopRecordButtonClicked() {
    Host.audio.stopRecord().then(() => {
      console.log('stopRecord');
      this._stopPeakPowerLoop();
    });
  }

  _startPlayButtonClicked() {
    let params = {
      'updateAudioPlayerTimeInterval': 1,
      'audioPlayerUid': audioPlayerUid,
      "p": require('../../Resources/Test.html')
    };
    Host.audio.startPlay(fileName, params).then(() => { console.log('startPlay'); });
  }
  _stopPlayButtonClicked() {
    Host.audio.stopPlay().then(() => { console.log('stopPlay'); });
  }

  _convertButtonWavToAmrClicked() {
    let wavPath = 'test.wav';
    let amrPath = 'test.amr';
    Host.audio.wavToAmr(wavPath, amrPath)
      .then(() => {
        console.log('wavToAmr success');
        alert('wavToAmr success');
      })
      .catch(() => {
        console.log('wavToAmr fail');
        alert('wavToAmr fail');
      });
  }

  _convertButtonAmrToWavClicked() {
    let wavPath = 'test.wav';
    let amrPath = 'test.amr';
    Host.audio.amrToWav(amrPath, wavPath)
      .then(() => {
        console.log('amrToWav success');
        alert('amrToWav success');
      })
      .catch(() => {
        console.log('amrToWav fail');
        alert('amrToWav fail');
      });
  }

  _startPeakPowerLoop() {
    this.peakPowerTimer = setInterval(
      () => {
        Host.audio.getRecordingPeakPower().then((res) => {
          if (res != null) {
            this.setState({ audioRecorderPeakPower: JSON.stringify(res) });
            console.log(`peakpower err : ${ JSON.stringify(res) }`);
          }
        }).catch((err) => {
          this.setState({ audioRecorderPeakPower: JSON.stringify(err) });
          console.log(`peakpower err : ${ JSON.stringify(err) }`);
        });
      },
      500
    );
  }

  _stopPeakPowerLoop() {
    this.peakPowerTimer && clearInterval(this.peakPowerTimer);
    this.peakPowerTimer = undefined;
    this.setState({ audioRecorderPeakPower: '' });
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
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
    marginTop: 20
  },
  buttonText: {
    color: '#555',
    fontSize: 14,
    padding: 5
  }
});