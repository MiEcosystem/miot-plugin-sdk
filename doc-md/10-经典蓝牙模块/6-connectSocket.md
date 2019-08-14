<a name="module_miot/ClassicBluetooth.connectSocket"></a>

## .connectSocket(macAddress, transport) ⇒ <code>Promise.&lt;any&gt;</code>
根据device 的mac 地址，与中心设备建立socket 链接, 返回的数据没有实际作用, 执行到catch表示连接失败

**Kind**: static function  
**Returns**: <code>Promise.&lt;any&gt;</code> - 成功进入then，失败进入catch  
**Since**: 10023  

| Param | Type | Description |
| --- | --- | --- |
| macAddress | <code>string</code> | 中心设备mac地址 |
| transport | <code>string</code> | 连接中心设备的相应服务的UUID |

