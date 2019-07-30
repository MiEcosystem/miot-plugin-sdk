<a name="module_miot/service/smarthome.reportBLEDeviceInfo"></a>

## .reportBLEDeviceInfo(params)
上报蓝牙设备信息
call: /v2/device/bledevice_info
等效于: /v2/blemesh/dev_info

**Kind**: static function  
**Since**: 10020  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | 参数 |
| prarms.did | <code>string</code> | 设备did |
| prarms.fw_ver | <code>string</code> | 设备当前固件版本号 |
| prarms.hw_ver | <code>string</code> | 设备的硬件平台 |
| prarms.latitude | <code>string</code> | 纬度，number字符串 |
| prarms.longitude | <code>string</code> | 经度，number字符串 |
| prarms.iternetip | <code>string</code> | app/网关IP地址 |

