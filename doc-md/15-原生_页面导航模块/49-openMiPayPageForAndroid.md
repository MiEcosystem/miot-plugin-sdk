<a name="module_miot/host/ui.openMiPayPageForAndroid"></a>

## .openMiPayPageForAndroid(params) ⇒ <code>Promise</code>
android 特有， 跳转到小米钱包

**Kind**: static function  

| Param |
| --- |
| params | 

**Example**  
```js
let params = {action:'issue_mifare',type:'1',product_id:'66666-00211',source_channel:'mijia'};
Host.ui.openMiPayPageForAndroid(params).then((res)=>{console.log(res)}).catch((error)=>{ console.log(error)});
```
