/**
 * @export
 * @module miot/ui/AMapView
 * @description 地图的 js 桥接，内部使用高德地图实现，
 * @mark andr done
 */
import {requireNativeComponent, ViewPropTypes} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
const resolveAssetSource = require('resolveAssetSource');
const MapView = requireNativeComponent('MHMapView', null);
export default class AMapView extends Component {
    static propTypes = {
        /**
         *
         * @member {bool}
         */
        showsUserLocation: PropTypes.bool,
        /**
         *
         * @member {bool}
         */
        trafficEnabled: PropTypes.bool,
        /**
         *
         * @member {bool}
         */
        showsScale: PropTypes.bool,
        /**
         *
         * @member {bool}
         */
        showsCompass: PropTypes.bool,
        /**
         *
         * @member {bool}
         */
        zoomEnabled: PropTypes.bool,
        /**
         *
         * @member {bool}
         */
        pausesLocationUpdatesAutomatically: PropTypes.bool,
        /**
         *
         * @member {bool}
         */
        allowsBackgroundLocationUpdates: PropTypes.bool,
        /**
         *
         * @member {bool}
         */
        desiredAccuracy: PropTypes.bool,
        /**
         *
         * @member {number}
         */
        distanceFilter: PropTypes.number,
        /**
         *
         * @member {number}
         */
        scaleOrigin: PropTypes.number,
        /**
         *
         * @member {number}
         */
        mapType: PropTypes.number,
        /**
         *
         * @member {number}
         */
        headingFilter: PropTypes.number,
        /**
         *
         * @member {number}
         */
        zoomLevel: PropTypes.number,
        /**
         *
         * @member {number}
         */
        centerCoordinate: PropTypes.number,
        /**
         *
         * @member {string}
         */
        userTrackingMode: PropTypes.string,
        /**
         *
         * @member {object}
         */
        compassOrigin: PropTypes.object,
        /**
         *
         * @member {object}
         */
        userLocation: PropTypes.object,
        /**
         *
         * @member {object}
         */
        userLocationRepresentation: PropTypes.object,
        /**
         *
         * @member {array}
         */
        annotations: PropTypes.array,
        /**
         *
         * @member {array}
         */
        circles: PropTypes.array,
        /**
         *
         * @member {array}
         */
        polylines: PropTypes.array,
        /**
         *
         * @member {array}
         */
        multiPolylines: PropTypes.array,
        /**
         *
         * @member {func}
         */
        onUpdateUserLocation: PropTypes.func,
        /**
         *
         * @member {func}
         */
        onSingleTappedAtCoordinate: PropTypes.func,
        /**
         *
         * @member {func}
         */
        onSelectAnnotationView: PropTypes.func,
        /**
         *
         * @member {func}
         */
        onMapWillZoomByUser: PropTypes.func,
        /**
         *
         * @member {func}
         */
        onMapDidZoomByUser: PropTypes.func,
        ...ViewPropTypes,
    };
    render() {
         return null
    }
    static resloveUri(licenseUrl) {
        licenseUrl = resolveAssetSource(licenseUrl);
        if (licenseUrl && (licenseUrl.uri || Array.isArray(licenseUrl))) {
            if (licenseUrl.uri) {
                licenseUrl = [{uri: licenseUrl.uri}];
            }
        }
        return licenseUrl;
    }
}