/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @since 10029
 * @module miot/ui/RobotMap
 * @description 扫地机器人地图组件
 *
 * @example
 *
 <MHRobotMap
    style={{ width: 300, height: 300, backgroundColor: '#ffffff'}}
    mapStyle={{wallColor: '#75c4fa',floorColor: '#468ad6',lineColor: '#9bc4e3'}}
    images={[{image:require(''),position:{125,125},size:{5,5},rotation:0,name:'charge'}]}
/>
 *
 *
 * @property {array<object>} imageSources 需要展示在地图上的图片
 * @property {source} imageSources.source 图片resource，必传。
 * @property {string} imageSources.name 图片名称，后续更新方便确定图片,必传
 * @property {source} imageSources.bgSource 图片背景图，类似扫地机清扫时周边的那一圈，如果传了这个，一定会有动画
 * @property {string} imageSources.position 图片相对位置，如果不传，则保持上一次的位置不动，但是首次必传
 * @property {string} imageSources.size 图片在view中展示的大小，如果不传，则保持上一次的大小不动，同样首次必传
 * @property {number} imageSources.rotation 图片的逆时针旋转角度 0-360，可不传
 * images=[{
 *   image:url,
 *   bgImage:url1,
 *   position:{127,125},
 *   size:{10,10},
 *   rotation:180,
 *   name:charge
 * }]
 *
 * @property {string}  mapStyle.wallColor 文字颜色 默认值 #000000
 * @property {string}  mapStyle.floorColor 文字颜色 默认值 #000000
 * @property {string}  mapStyle.lineColor 文字颜色 默认值 #000000
 */
//@native begin
import PropTypes from 'prop-types';
import React from 'react';
import { requireNativeComponent, ViewPropTypes, NativeModules, findNodeHandle, Platform, UIManager } from 'react-native';
const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
const merge = require('merge');
const MHRobotMap = requireNativeComponent('MHSweepingMap');
const { MHSweepingMapManager } = NativeModules;
//@native end
export default class RobotMapView extends React.Component {
    static propTypes = {
        imageSources: PropTypes.array,
        mapStyle: PropTypes.object,
        ...ViewPropTypes,
    };
    render() {
        //@native :=> null
        const mapStyle = this.props.mapStyle || {};
        let imageSources = this.props.imageSources;
        let newImagesources = [];
        // 对图片资源的转换
        if (imageSources) {
            let len = imageSources.length;
            for (let i = 0; i < len; i++) {
                newImagesources[i] = { ...imageSources[i] };
                if (imageSources[i].source) {
                    if (Platform.OS === 'android') {
                        newImagesources[i].source = [resolveAssetSource(imageSources[i].source)];
                    } else {
                        newImagesources[i].source = resolveAssetSource(imageSources[i].source);
                    }
                }
                if (imageSources[i].bgSource) {
                    if (Platform.OS === 'android') {
                        newImagesources[i].bgSource = [resolveAssetSource(imageSources[i].bgSource)];
                    } else {
                        newImagesources[i].bgSource = resolveAssetSource(imageSources[i].bgSource);
                    }
                }
            }
        }
        const nativeProps = merge(this.props, {
            imageSources: newImagesources,
            wallColor: mapStyle.wallColor,
            floorColor: mapStyle.floorColor,
            lineColor: mapStyle.lineColor,
        });
        return <MHRobotMap
            ref="robotMapView"
            {...nativeProps} />
        // ref="robotMapView" {...this.props} wallColor={mapStyle.wallColor} floorColor={mapStyle.floorColor} lineColor={mapStyle.lineColor}
        //@native end
    }
    //更新地图数据
    updateData(pointsStr, autoCenter, robotImage, scaleToFit) {
        //@native :=> null
        if (Platform.OS === 'android') {
            UIManager.dispatchViewManagerCommand(
                findNodeHandle(this),
                UIManager.MHSweepingMap.Commands.addMapWithPoints,
                [{ points: pointsStr, name: robotImage, autoCenter: autoCenter, scaleToFit: scaleToFit }],
            )
        } else {
            MHSweepingMapManager.addSweepingMapWithPoints(pointsStr, autoCenter, robotImage, scaleToFit, findNodeHandle(this.refs.robotMapView));
        }
        //@native end
    }
    //获取图片当前位置
    positionForImage(name) {
        //@native :=> promise
        return new Promise((resolve, reject) => {
            MHSweepingMapManager.positionWithImageName(name, findNodeHandle(this.refs.robotMapView), (ok, res) => {
                if (ok) {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
            //@native end
        });
    }
    //清理地图上的所有内容
    cleanMapView() {
        MHSweepingMapManager.cleanMapView(findNodeHandle(this.refs.robotMapView));
    }
}