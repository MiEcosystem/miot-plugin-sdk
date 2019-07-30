<a name="module_miot/host/crypto"></a>

## miot/host/crypto
加密模块

  
**Example**  
```js
import {Host} from 'miot'
...
const str = '123'
//async
let md5 = await Host.crypto.endoceMD5(str)

//normal
Host.crypto.encodeMD5(str).then(res => {//md5 value is res})
...
```
