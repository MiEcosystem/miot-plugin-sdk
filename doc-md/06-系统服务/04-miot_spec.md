<a name="module_miot/service/spec"></a>

## miot/service/spec
主要面向的是支持Spec协议的设备， 通过提供的API可以实现与设备之间进行通信等功能;
该模块提供的能力大致如下:
1、获取设备的Spec信息  2、获取或修改设备的属性值  3、请求调用设备的方法

**Export**: public  
**Doc_name**: miot_spec  
**Doc_index**: 4  
**Doc_directory**: service  
**Example**  
```js
import { Service } from "miot";
Service.spec.getSpecString(xxx).then(res => {
 console.log("res", res)
}).catch(error => {
   console.log("error", error)
});
```
