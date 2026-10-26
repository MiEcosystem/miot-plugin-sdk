<a name="module_miot/system"></a>

## miot/system
同步数据到iOS 健康app

**Export**: public  
**Doc_name**: 健康模块(目前只有iOS)  
**Doc_index**: 14  
**Doc_directory**: system  
**Example**  
```js
import {System} from "miot"
...
System.health.requestHealthAuthorization().then(res => {//return result})
...
```

* [miot/system](#module_miot/system)
    * [~IHealth](#module_miot/system..IHealth)
        * [.requestHealthAuthorization(params)](#module_miot/system..IHealth+requestHealthAuthorization)
        * [.getHealthAuthorizationStatus(params)](#module_miot/system..IHealth+getHealthAuthorizationStatus)
        * [.writeDataToHealthApp(params)](#module_miot/system..IHealth+writeDataToHealthApp)


* * *

<a name="module_miot/system..IHealth"></a>

### miot/system~IHealth
**Kind**: inner interface of [<code>miot/system</code>](#module_miot/system)  

* [~IHealth](#module_miot/system..IHealth)
    * [.requestHealthAuthorization(params)](#module_miot/system..IHealth+requestHealthAuthorization)
    * [.getHealthAuthorizationStatus(params)](#module_miot/system..IHealth+getHealthAuthorizationStatus)
    * [.writeDataToHealthApp(params)](#module_miot/system..IHealth+writeDataToHealthApp)


* * *

<a name="module_miot/system..IHealth+requestHealthAuthorization"></a>

#### iHealth.requestHealthAuthorization(params)
**Kind**: instance method of [<code>IHealth</code>](#module_miot/system..IHealth)  
**Since**: 10078
请求与系统健康App交互的权限  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>jsonObject</code> | 传递的jsonObject对象参数 |

**Example**  
```js
let params={
 readObjTypes: ['BodyMass','LeanBodyMass','BodyMassIndex','BodyFatPercentage','JumpRope']从苹果健康读取数据 array类型 //数据含义依次对应：体重|去脂体重|身高体重指数|体脂率|跳绳
 writeObjTypes: ||写入数据到苹果健康 数据类型以及参数值同readObjTypes 
}
System.health.requestHealthAuthorization(params);
 * @returns {object} 成功时，返回：
{ code: 0,
  data: true
}
失败时，返回：透传
{ code: xx, message: 'xx' }
```

* * *

<a name="module_miot/system..IHealth+getHealthAuthorizationStatus"></a>

#### iHealth.getHealthAuthorizationStatus(params)
**Kind**: instance method of [<code>IHealth</code>](#module_miot/system..IHealth)  
**Since**: 10078
获取健康类型的权限  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>jsonObject</code> | 传递的jsonObject对象参数 |

**Example**  
```js
let params={
 authObjType: 'BodyMass' ｜string类型 具体参数值可参考requestHealthAuthorization API参数authObjTypes定义
}
System.health.getHealthAuthorizationStatus(params);
 * @returns {object} 成功时，返回：
{ code: 0,
   data: {
    authStatus: xx | int类型 0:没有请求过权限 1:用户主动关闭了权限 2:权限开启   
   }
}
失败时，返回：透传
{ code: xx, message: 'xx' }
```

* * *

<a name="module_miot/system..IHealth+writeDataToHealthApp"></a>

#### iHealth.writeDataToHealthApp(params)
**Kind**: instance method of [<code>IHealth</code>](#module_miot/system..IHealth)  
**Since**: 10078
同步数据到健康App  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>jsonObject</code> | 传递的jsonObject对象参数 |

**Example**  
```js
let params={
 authObjType: 'BodyMass' ｜string类型 具体参数值可参考requestHealthAuthorization API参数authObjTypes定义
 objValue:xx    | double类型 体重(g)|去脂体重(g)|身高体重指数(count)|体脂率(0.0 - 1.0)
 startTime: xx，| 以秒为单位的时间戳 
 endTime: xx    |以秒为单位的时间戳
 duration:xx    |timeInterval类型 时长 不传默认是结束和开始时间差
 energyBurned:xx |double类型 消耗的卡路里 单位卡
 titleForNumOfJRope:xx |string类型 跳绳次数的title 跳绳体能训练专用
 numOfJRope:xx  |long类型 跳绳次数 跳绳体能训练专用
}
System.health.getHealthAuthorizationStatus(params);
 * @returns {object} 成功时，返回：
{ code: 0,
   data: true
}
失败时，返回：透传
{ code: xx, message: 'xx' }
```

* * *

