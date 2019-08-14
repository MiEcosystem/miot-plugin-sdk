<a name="module_miot/service/smarthome.reportGPSInfo"></a>

## .reportGPSInfo(deviceID, gpsInfo) ⇒ <code>Promise.&lt;object&gt;</code>
上报gps信息 /location/set

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| deviceID | <code>string</code> | 设备ID |
| gpsInfo | <code>GPSInfo</code> | {lng,lat,countryCode,adminArea,locality,subLocality,thoroughfare,language} 依次为 {，，，，，，，} |

**Example**  
```js
//获取手机地理信息，iOS必须是真机且开启定位权限
Host.locale.getLocation().then(res => {
 console.log('get location: ', res)
 var {longitude,latitude} = res;
}) 
if (latitude && longitude) {
 Service.smarthome.reportGPSInfo(Device.deviceID, {})
}
```
