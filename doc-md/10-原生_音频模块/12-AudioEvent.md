<a name="module_miot/host/audio..AudioEvent"></a>

## ~AudioEvent : <code>object</code>
Audio播放事件名集合

**Kind**: inner namespace  
**Example**  
```js
import { AudioEvent } from 'miot/host/audio';
   const subscription = AudioEvent.audioPlayerDidFinishPlaying.addListener(
      (event)=>{
         ...
      }
    )
   ...
   subscription.remove()
   ...
```
