//index.ios.js

'use strict';

import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicatorIOS,
  ListView,
  Image,
  PixelRatio,
} from 'react-native';

var MHMapSearch = require('NativeModules').MHMapSearch;
import {AMapView} from 'miot/ui';
var window = Dimensions.get('window');

export default class MHMapDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.currentLatitude = 0;
    this.currentLongitude = 0;
    this.destinationLatitude = 0;
    this.destinationLongitude = 0;
    this.state = {
      zoomLevel: 16.1,
      userLocation: {
        image: require( '../Resources/map/003.png'),
        enabled: false,
        size: {
          width: 64,
          height: 64,
        },

      },

      userLocationRepresentation: {
        image: require( '../Resources/map/003.png'),
        imageScale: 5,
        showsAccuracyRing: false,
        // strokeColor: [0.9, 0.1, 0.1, 0.9],
        // fillColor: [0.1, 0.9, 0.1, 0.4],
      },
      annotations: [],
      circles: [],
      polylines: [],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <AMapView
          style={{width:window.width, height:window.height}}
          distanceFilter={100}
          zoomLevel={this.state.zoomLevel}
          onMapWillZoomByUser={this._onMapWillZoomByUser.bind(this)}
          onMapDidZoomByUser={this._onMapDidZoomByUser.bind(this)}
          showsUserLocation={true}
          centerCoordinate={null}
          userTrackingMode='follow'
          showsCompass={false}
          showsScale={false}
          userLocationRepresentation={this.state.userLocationRepresentation}
          annotations={this.state.annotations}
          onSingleTappedAtCoordinate={this._onSingleTappedAtCoordinate.bind(this)}
          onLongPressedAtCoordinate={this._onLongPressedAtCoordinate.bind(this)}
          onUpdateUserLocation={this._onUpdateUserLocation.bind(this)}
          circles={this.state.circles}
          polylines={this.state.polylines}
          multiPolylines={this.state.multiPolylines}
          mapType={1}
        />
        <TouchableOpacity style={styles.walkingRouteSearch} onPress={this._walkingRouteSearchButtonClicked.bind(this)}>
          <Text style={{fontSize: 20}}>步行路径规划</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onMapWillZoomByUser(e) {
    console.log(e.nativeEvent);
  }

  _onMapDidZoomByUser(e) {
    console.log(e.nativeEvent);
  }

  _onUpdateUserLocation(e) {
    this.currentLatitude = e.nativeEvent.latitude;
    this.currentLongitude = e.nativeEvent.longitude;
  }

  _onSingleTappedAtCoordinate(e) {
    var circle = {
      id: 'circle' + e.nativeEvent.latitude + e.nativeEvent.longitude,
      coordinate: {
        latitude: e.nativeEvent.latitude,
        longitude: e.nativeEvent.longitude,
      },
      radius: 150,
      strokeColor: [0.9, 0.1, 0.1, 0.9],
      fillColor: [0.1, 0.9, 0.1, 0.4],
      lineWidth: 2,
    };
    this.setState({
      circles : new Array(circle),
    });
  }

  _onLongPressedAtCoordinate(e) {
    var annotation = {
      id: 'annotation' + e.nativeEvent.latitude + e.nativeEvent.longitude,
      title: '目标位置',
      image: require( '../Resources/map/003.png'),
      size: {
        width: 64,
        height: 64,
      },
      canShowCallout: false,
      lockedScreenPoint:{x:0.5,y:1},//控制图标绘制起点相对点击的位置，android 测了
      coordinate: {
        latitude: e.nativeEvent.latitude,
        longitude: e.nativeEvent.longitude,
      },
    };
    this.setState({
      annotations: new Array(annotation),
    });
    this.destinationLatitude = e.nativeEvent.latitude;
    this.destinationLongitude = e.nativeEvent.longitude;
  }

  _walkingRouteSearchButtonClicked() {
    var originCoordinate = {
      'latitude': this.currentLatitude,
      'longitude': this.currentLongitude,
    };
    var destinationCoordinate = {
      'latitude': this.destinationLatitude,
      'longitude': this.destinationLongitude,
    };

    MHMapSearch.walkingRouteSearch(originCoordinate, destinationCoordinate, 0, (isSuccess, json)=>{
      if (isSuccess) {
        this.route = json;
        var path = this.route.paths[0];
        if (path != null && path.steps.length) {
          var steps = path.steps;
          var polylines = [];
          for (var i = 0; i < steps.length; i++) {
            var coordinates = this.coordinatesForPolyline(steps[i].polyline);
            // var polyline = {
            //   'id': 'polyline' + i,
            //   'coordinates': coordinates,
            // };
            var multiPolyline = {
              'id':'multiPolyline' + i,
              'coordinates':coordinates,
              'drawStyleIndexes':[0,1,2],
              'renderGradient':true,
              'renderLineWidth':12,
              'colors':[0xff0096ff,0xfff6c623,0xffff6600]
            };
            polylines.push(multiPolyline);
          }
          // console.log(polylines);
          this.setState({
            multiPolylines: polylines,
          });
        }
      }
      else {
        alert('操作失败');
      }
    });
  }

  coordinatesForPolyline(stepPolyline, parseToken) {
    if (!stepPolyline.length) {
      return null;
    }
    var str = stepPolyline.replace(/;/g, ',');
    var tempArray = str.split(',');
    console.log(tempArray);
    var coordinates = [];
    for (var i = 0; i < tempArray.length; i+=2) {
      if (tempArray[i] && tempArray[i+1]){
          var coordinate = {
            'longitude': parseFloat(tempArray[i]),
            'latitude': parseFloat(tempArray[i+1]),
          }
          coordinates.push(coordinate);
      }
    }
    console.log(coordinates);
    return coordinates;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  aroundSearch: {
    position: 'absolute',
    top: window.height * 0.2,
    right: 10,
  },
  keywordsSearch: {
    position: 'absolute',
    top: window.height * 0.3,
    right: 10,
  },
  IDSearch: {
    position: 'absolute',
    top: window.height * 0.4,
    right: 10,
  },
  walkingRouteSearch: {
    position: 'absolute',
    top: window.height * 0.4,
    left: 10,
  },
});

// var route = {
//   key: 'MHMapDemo',
//   title: '',
//   component: MHMapDemo,
// }

// module.exports = {
//   component: MHMapDemo,
//   route: route,
// }
