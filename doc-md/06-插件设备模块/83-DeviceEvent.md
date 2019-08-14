<a name="module_miot/Device--module.exports..DeviceEvent"></a>

## ~DeviceEvent : <code>object</code>
Device事件集合

**Kind**: inner namespace  
**Example**  
```js
import {DeviceEvent} from 'miot'
   ...
   class MyPage extends React.Component{
         componentWillMount(){
             this.subscription = DeviceEvent.deviceReceivedMessages.addListener((device, messages)=>{
                 if(!this.props.navigation.isFocused()){
                     return;
                 }
                 ...
             })
         }
         ...
         componentWillUnmount(){
             ...
             this.subscription.remove()
         }
         ...
   }

   ...
```
