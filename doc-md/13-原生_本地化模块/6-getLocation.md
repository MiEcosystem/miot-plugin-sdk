<a name="module_miot/host/locale.getLocation"></a>

## .getLocation() ⇒ <code>Promise</code>
获取手机地理位置信息
{
country
province
city
district(区域)
street
address
latitude(纬度)
longitude(经度)
citycode(城市编码)
adcode(区域编码)
}

**Kind**: static function  
**Example**  
```js
import {Host} from 'miot'
...
Host.locale.getLocation().then(res => {
 console.log('get location: ', res)
})
```
