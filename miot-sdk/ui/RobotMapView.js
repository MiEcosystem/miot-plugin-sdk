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
export default class RobotMapView extends React.Component {
    static propTypes = {
      imageSources: PropTypes.array,
      mapStyle: PropTypes.object,
      ...ViewPropTypes
    };
    constructor(props, context) {
      super(props, context);
      referenceReport('RobotMapView');
    }
    render() {
       return null
    }
    // 更新地图数据
    updateData(pointsStr, autoCenter, robotImage, scaleToFit) {
       return null
    }
    // 获取图片当前位置
    positionForImage(name) {
       return Promise.resolve(null);
      });
    }
    // 清理地图上的所有内容
    cleanMapView() {
      MHSweepingMapManager.cleanMapView(findNodeHandle(this.refs.robotMapView));
    }
}