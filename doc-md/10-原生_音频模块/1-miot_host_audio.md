<a name="module_miot/host/audio"></a>

## miot/host/audio
音频处理

  
**Example**  
```js
import {Host} from 'miot'
...
Host.audio.startRecord('sample', {'AVFormatIDKey': 'AMR'})
 .then(res => {//start record success})
...
Host.audio.stopRecord().then(res => {//stop finished})
...
```
