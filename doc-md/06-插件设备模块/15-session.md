<a name="module_miot/Device--module.exports..IDevice+session"></a>

## .session : <code>string</code>
设备的 token 加密后生成的固定值，在设备快连入网时生成，能唯一标识设备的生命周期，直至被重置、重新快连入网。注意该 Session 并非设备与服务器交互时认证所用 Token，只能用于标识作用

**Kind**: instance member  
**Read only**: true  
