<a name="module_miot/Host.getWifiInfo"></a>

## .getWifiInfo() ⇒ <code>Promise</code>
获取手机wifi信息

**Kind**: static function  
**Example**  
```js
Host.getWifiInfo().then(res => console("ssid and bssid = ", res.SSID, res.BSSID))
```
