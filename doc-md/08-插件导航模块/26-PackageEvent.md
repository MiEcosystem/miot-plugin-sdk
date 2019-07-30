<a name="module_miot/Package--module.exports..PackageEvent"></a>

## ~PackageEvent : <code>object</code>
Package事件名集合

**Kind**: inner namespace  
**Example**  
```js
import {PackageEvent} from 'miot'
   const subscription = PackageEvent.packageWillPause.addListener(()=>{
         ...
    })
   ...
   subscription.remove()
   ...
```
