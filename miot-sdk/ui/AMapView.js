/**
 * @export public
 * @doc_name 地图组件
 * @doc_index 4
 * @doc_directory ui
 * @module miot/ui/AMapView
 * @description 地图的 js 桥接，内部使用高德地图实现，
 * @mark andr done
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { requireNativeComponent, ViewPropTypes } from 'react-native';
import Host from '../Host';
import { referenceReport } from '../decorator/ReportDecorator';
// const resolveAssetSource = require('resolveAssetSource');
const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
const MapView = requireNativeComponent('MHMapView', null);
export default class AMapView extends Component {
    static propTypes = {
      /**
         * 是否显示用户位置
         * @member {bool}
         */
      showsUserLocation: PropTypes.bool,
      /**
         * 是否显示交通状况
         * @member {bool}
         */
      trafficEnabled: PropTypes.bool,
      /**
         * 是否显示坐标尺
         * @member {bool}
         */
      showsScale: PropTypes.bool,
      /**
         * 是否显示指南针
         * @member {bool}
         */
      showsCompass: PropTypes.bool,
      /**
         * 是否允许用户缩放
         * @member {bool}
         */
      zoomEnabled: PropTypes.bool,
      /**
         * 是否自动暂停位置更新
         * @member {bool}
         */
      pausesLocationUpdatesAutomatically: PropTypes.bool,
      /**
         * 允许后台更新位置信息
         * @member {bool}
         */
      allowsBackgroundLocationUpdates: PropTypes.bool,
      /**
         * 定位精度
         * @member {number}
         */
      desiredAccuracy: PropTypes.number,
      /**
         * 设定定位的最小更新距离，即移动多远会提示移动
         * @member {number}
         */
      distanceFilter: PropTypes.number,
      /**
         * 比例尺原点位置  
         * 格式：{'x':number, 'y':number}
         * @member {object}
         */
      scaleOrigin: PropTypes.object,
      /**
         * 地图类型  
         * 0< 普通地图 1< 卫星地图
         * @member {number}
         */
      mapType: PropTypes.number,
      /**
         * 设定最小更新角度。默认为1度。
         * @member {number}
         */
      headingFilter: PropTypes.number,
      /**
         * 缩放级别, [3, 20]
         * @member {number}
         */
      zoomLevel: PropTypes.number,
      /**
         * 中心点坐标  
         * 格式：{latitude: number, longitude: number}
         * @member {object}
         */
      centerCoordinate: PropTypes.object,
      /**
         * 定位用户位置的模式   
         * none < 不追踪用户的location更新  
         * follow < 追踪用户的location更新  
         * followWithHeading < 追踪用户的location与heading更新  
         * @member {string}
         */
      userTrackingMode: PropTypes.string,
      /**
         * 罗盘原点位置  
         * 格式：{'x':number, 'y':number}
         * @member {object}
         */
      compassOrigin: PropTypes.object,
      /**
         * 用户定位
         * @member {object}
         */
      userLocation: PropTypes.object,
      /**
         * 地图语言的支持, 目前仅支持中英文, 默认中文
         * 0: 表示中文;  1: 表示英文
         * @member {number}
         */
      language: PropTypes.number,
      /**
         * 地图logo的显示位置, 默认左边底部
         * 0: 左边底部;   1：中间底部;   2：右边底部;
         * @member {number}
         */
      logoPosition: PropTypes.number,
      /**
         * 用户位置显示样式控制  
         * 格式：{'image':'imagePath', 'imageScale': number, 'showsAccuracyRing':boolean, 'showsHeadingIndicator': boolean, 'lineWidth':number, 'fillColor': color, 'strokeColor': color, 'lineDashPattern':[]}
         * @member {object}
         */
      userLocationRepresentation: PropTypes.object,
      /**
         * 标记点数组  
         * 格式：[{'coordinate':{latitude: number, longitude: number}, 'title':'aaa', 'subtitle':'', 'id':'', 'image':'imagePath', 'canShowCallout': true}]
         * canShowCallout 是否点击后显示title
         * @member {array}
         */
      annotations: PropTypes.array,
      /**
         * 绘制圆形layer数组  
         * 格式: [{'coordinate':{latitude: number, longitude: number}, 'radius':number, 'strokeColor': color, 'fillColor': color ,'id': 'string', 'lineWidth': numebr}]
         * @member {array}
         */
      circles: PropTypes.array,
      /**
         * 绘制线条数组,默认格式  
         * 格式: ['coordinates':[{latitude: number, longitude: number}], 'id':'string']
         * @member {array}
         */
      polylines: PropTypes.array,
      /**
         * 绘制自定义线条数组  
         * drawStyleIndexes: 颜色索引数组(使用颜色数组中的指定色),成员为number,且为非负数，负数按0处理
         * colors: 颜色数组，用于渲染线段
         * 格式: ['coordinates':[{latitude: number, longitude: number}], 'drawStyleIndexes': [], colors: [color], 'renderGradient': boolean, 'renderLineWidth': number]
         * @member {array}
         */
      multiPolylines: PropTypes.array,
      /**
         * 用户位置更新回调
         * @member {func}
         */
      onUpdateUserLocation: PropTypes.func,
      /**
         * 点击某坐标回调
         * @member {func}
         */
      onSingleTappedAtCoordinate: PropTypes.func,
      /**
         * 选中某点标记回调
         * @member {func}
         */
      onSelectAnnotationView: PropTypes.func,
      /**
         * 用户缩放地图回调，将要缩放
         * @member {func}
         */
      onMapWillZoomByUser: PropTypes.func,
      /**
         * 用户缩放地图回调，已经缩放
         * @member {func}
         */
      onMapDidZoomByUser: PropTypes.func,
      ...ViewPropTypes
    };
    constructor(props, context) {
      super(props, context);
      referenceReport('AMapView');
    }
    render() {
       return null
    }
    static resloveUri(licenseUrl) {
      licenseUrl = resolveAssetSource(licenseUrl);
      if (licenseUrl && (licenseUrl.uri || Array.isArray(licenseUrl))) {
        if (licenseUrl.uri) {
          licenseUrl = [{ uri: licenseUrl.uri }];
        }
      }
      return licenseUrl;
    }
}