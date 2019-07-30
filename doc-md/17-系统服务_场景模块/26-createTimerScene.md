<a name="module_miot/service/scene--module.exports.createTimerScene"></a>

## .createTimerScene(deviceID, opt) ⇒ <code>IScene</code>
创建定时场景  
用法同上面的 createScene(deviceID, SceneType.Timer, opt);
定时中的 crontab string 详见 [Linux crontab命令](http://www.runoob.com/linux/linux-comm-crontab.html)

**Kind**: static function  

| Param | Type |
| --- | --- |
| deviceID | <code>string</code> | 
| opt | <code>json</code> | 

**Example**  
```js
import {Service, Device, SceneType} from 'miot'
const settinig = {
enable_timer_on: true, //是否开启定时打开。如果enable_timer设置为false，此属性不会起作用
on_time: * * * * *, //crontab string, minute hour day month week。如：59 11 21 3 * 指3月21号11点59分定时开
off_time: * * * * *, //crontab string，同上。
enable_timer_off: true,//是否开启定时关闭。如果enable_timer设置为false，此属性不会起作用
onMethod: 'method_name', //咨询硬件工程师,指硬件端，打开开关的方法。miot-spec下，一般为：set_properties
on_param: 'param', //咨询硬件工程师，指硬件端，打开开关应该传入的参数。miot-spec下，一般为：[{did,siid,piid,value}]
off_method: 'method_name', //咨询硬件工程师，指硬件端，关闭开关的方法。miot-spec下，一般为：set_properties
off_param: 'param', //咨询硬件工程师，关闭开关应该传入的参数。 miot-spec下，一般为：[{did,siid,piid,value}]
enable_timer: true, //是否开启此定时器，后续打开，关闭定时器，可以设置此属性
timer_type: "0",//用来区分普通定时和倒计时，为空（或者为"0"）表示普通定时，为"1"表示倒计时
on_filter: "cn_workday" // 后台用来过滤日期,目前只在大陆地区生效：cn_workday 表示工作日，cn_freeday 表示节假日
off_filter:"cn_freeday" // 后台用来过滤日期,目前只在大陆地区生效：cn_workday 表示工作日，cn_freeday 表示节假日
     // 
}

const scene = Service.scene.createTimerScene(Device.deviceID, {
     identify:'identify',//同上面的identify
     name:'myTimer',//同上面的名称
     setting:settinig
});

scene.save().then(scene=>{
  ...
})
```
