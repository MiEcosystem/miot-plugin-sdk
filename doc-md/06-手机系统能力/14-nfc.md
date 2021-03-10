<a name="module_miot/system"></a>

## miot/system
NFC相关

**Export**: public  
**Doc_name**: nfc  
**Doc_index**: 14  
**Doc_directory**: system  
**Example**  
```js
import {System} from "miot"
...
System.nfc.getNfcStatus().then(res => {//return result})
...
```

* [miot/system](#module_miot/system)
    * [~INfc](#module_miot/system..INfc)
        * [.getNfcInfo()](#module_miot/system..INfc+getNfcInfo) ⇒ <code>[ &#x27;Promise&#x27; ].&lt;json&gt;</code>


* * *

<a name="module_miot/system..INfc"></a>

### miot/system~INfc
**Kind**: inner interface of [<code>miot/system</code>](#module_miot/system)  

* * *

<a name="module_miot/system..INfc+getNfcInfo"></a>

#### iNfc.getNfcInfo() ⇒ <code>[ &#x27;Promise&#x27; ].&lt;json&gt;</code>
获取NFC的状态信息
since 10051

**Kind**: instance method of [<code>INfc</code>](#module_miot/system..INfc)  
**Returns**: <code>[ &#x27;Promise&#x27; ].&lt;json&gt;</code> - 成功时返回：{code:0,data:{status:xxx}}，
status可能得取值:
 forAndroid： -1（手机不支持NFC）
              0（NFC关闭）
              1（NFC已打开）
              
 foriOS：  -1  （米家app仅对iPhoneXS 及以上的机型支持NFC读写服务，并可以被远程开启和关闭。当其中一项不成立时，返回-1 代表米家NFC功能不可用）
           101   米家nfc读写可用，经测试发现，在手机设置关闭了nfc开关了之后，CoreNFC框架api返回的仍然是可用状态，所以，在iOS平台上，nfc为101并不代表nfc处于开启状态
           100   理论上不会出现此情况，如果出现，可以提工单咨询。
 iOS 目前无法准确的得到手机设置中的nfc开关的具体值，如果开发者有更好的方案，可以提工单交流。
失败时：{code:-1,message:'internal error'}  
**Example**  
```js
System.nfc.getNfcInfo()
```

* * *

