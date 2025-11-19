export class Location {
  /**
     * 获取手机地理位置信息
     * 建议调用之前先通过System.permission.request(Permissions.LOCATION)或
     * System.permission.requestInfo(Permissions.LOCATION)进行权限检查,两者主要区别在于返回值类型不同
     * @param {string} accuracy 获取定位的精度，可选high, middle, low, since 10043
     * 在Android系统下，默认为high,设置为middle可能会导致在室内获取结果为0。其中，high为高精度定位模式：会同时使用网络定位和GPS定位，优先返回最高精度的定位结果。
     * middle为仅用设备定位模式：不需要连接网络，只使用GPS进行定位，这种模式下不支持室内环境的定位，需要在室外环境下才可以成功定位。
     * low为低功耗定位模式：不会使用GPS和其他传感器，只会使用网络定位（Wi-Fi和基站定位）。
     * 在iOS系统下，默认为middle,设置为high时可能会耗时较长。其中，high为导航精度，middle为十米精度，low为千米精度。
     * (Attention：从10076开始，Android米家将使用系统自带的API来获取手机位置信息，在此之前使用的是高德地图API来获取的位置信息，可以通过accuracy来控制位置精度，而替换API后此参数将失效，所以这个参数在Android米家上已经被废弃了，iOS依旧可用)
     * @returns {Promise<object>}{
     * country
     * province
     * city
     * district(区域)
     * street
     * address
     * latitude(纬度)
     * longitude(经度)
     * citycode(城市编码)
     * adcode(区域编码)
     * }
     * @example
     * import {System} from 'miot'
     * ...
     * System.location.getLocation().then(res => {
     *  console.log('get location: ', res)
     * })
     */
  getLocation(accuracy?: string): Promise<object>;
  /**
     * 获取手机系统设置位置服务开启状态，仅Android设备需要该方法，因为iOS设备置服务关闭，应用的位置权限也同步关闭，
     * 即米家中Permissions.LOCATION也同样关闭状态，而Android设备位置服务开关与米家位置权限关闭状态不是同步的 。
     * iOS可使用System.permission.request(Permissions.LOCATION)检测位置权限。
     * @since 10057
     * @returns {Promise} 成功进入then，失败进入catch,res:{"code": 0, "data": {"state": 1}};
     * code : 0代表接口调用成功, state = 0表示系统设置位置服务关闭，state = 1表示系统设置位置服务打开
     * iOS调用该接口返回{ "code": -1, "message": 'iOS not support' }
      @example
     * import {System} from 'miot'
     * ...
     * System.location.getLocationServerState().then((res) => {
     *   let state = res['data']['state'];
     *   console.log('location server state : ' , state);
     * }).catch((error) => {
     *   console.log('system location server: ', error);
     * });
     */
  getLocationServerState(): Promise<any>;
}
export namespace LocationEvent {
    namespace locationChanged {
        function forever(emitter: any): (result: any) => void;
    }
}
export default LocationInstance;
declare const LocationInstance: Location;