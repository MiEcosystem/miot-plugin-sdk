<a name="module_miot/service/smarthome.getHomeDevice"></a>

## .getHomeDevice(params) ⇒ <code>Promise</code>
添加设备属性和事件历史记录，/home/device_list
当ssid和bssid均不为空时，表示同时搜索这个局域网内所有未被绑定过的设备

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>json</code> | {pid:string ,ssid:string ,bssid:string ,localDidList:array<string>,checkMoreWifi:bool,dids:array<string>} |
| params.pid | <code>string</code> | Device.type |
| params.ssid | <code>string</code> | wifi 的 ssid |
| params.bssid | <code>string</code> | wifi 的bssid |
| params.dids | <code>string</code> | 要拉取列表的设备的didi，如果为空表示所有设备 |
| params.localDidList | <code>string</code> | 本地设备did列表，补充ssid和bssid的本地查询条件，会与ssid查到的本地列表一起返回其中未被绑定的在线设备 |
| params.checkMoreWifi | <code>string</code> | 检查2.4gwifi下的本地设备列表 |
| params.getHuamiDevices | <code>boolean</code> | 获取华米设备,如华米手环 其中，pid：设备PID，ssid：wifi名称，bssid：wifi网关mac，locatDidList：本地设备did列表，补充ssid和bssid的本地查询条件，会与ssid查到的本地列表一起返回其中未被绑定的在线设备，checkMoreWifi：检查2.4gwifi下的本地设备列表，did：要拉取列表的设备的did，如果为空表示所有设备 |

