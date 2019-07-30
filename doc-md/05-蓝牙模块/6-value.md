<a name="module_miot/Bluetooth--module.exports.IBluetoothCharacteristic+value"></a>

## .value ⇒
数值, 配合 isValueLoaded 使用

**Kind**: instance member  
**Returns**: hexstring  
**Read only**: true  
**Example**  
```js
...
  if(charateristic.isValueLoaded){
      const val = characteristic.value;
      ...
  }
  ...
```
