<a name="module_miot/ui/NumberSpinner"></a>

## miot/ui/NumberSpinner
数字选择器

  
**Since**: 10003  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| visible | <code>bool</code> | 是否可见 |
| unit | <code>string</code> | 单位 |
| max | <code>int</code> | 最大值 |
| min | <code>int</code> | 最小值 |
| interval | <code>int</code> | 步长，默认为1 |
| defaultValue | <code>int</code> | 默认值 |
| valueFormat | <code>string</code> | 格式 |
| onNumberChanged | <code>func</code> | 值改变的回调 |

**Example**  
```js
<NumberSpinner
        style={{width:200, height:100}}
        maxValue={30}
        minValue={1}
        defaultValue={5}
        unit={"km"}
        onNumberChanged={data=>{
            console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`);
        }}
    />


                
    <NumberSpinner
        style={{width:300, height:200}}
        maxValue={30}
        minValue={-100}
        interval={2.5}
        defaultValue={80}
        valueFormat={"%.1f"}
        unit={"km"}
        onNumberChanged={data=>{
            console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`);
        }}
    /> 
```
