<a name="module_miot/host/file.getFDSFileInfoWithObjName"></a>

## .getFDSFileInfoWithObjName(obj_name)
获取FDS文件的信息，包含下载地址等信息
设备需要申请配置FDS权限，参考 https://iot.mi.com/new/guide.html?file=08-%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/03-%E5%AD%98%E5%82%A8/01-%E4%BD%BF%E7%94%A8FDS%E5%AD%98%E5%82%A8%E7%94%A8%E6%88%B7%E6%96%87%E4%BB%B6

对于手动上传到fds的文件(没有genObjName ,在平台端直接上传的)，可直接设置成public，生成url。插件端需要用这个文件时，用通用下载接口下载此url即可。
getFDSFileInfoWithObjName,这个接口只是用来下载通过插件接口(Host.file.uploadFileToFDS)上传到FDS的文件

**Kind**: static function  
**Since**: 10004  

| Param | Type | Description |
| --- | --- | --- |
| obj_name | <code>string</code> | generateObjNameAndUrlForFDSUpload 生成的 obj_name |

**Example**  
```js
let did = Device.deviceID;
        let suffix = "mp3";
        let file_obj_name = this.file_obj_name //从服务端获取或者本地获取,通过generateObjNameAndUrlForFDSUpload 生成
        if (file_obj_name) {
        Host.file.getFDSFileInfoWithObjName(file_obj_name).then(res => {
            console.log('getfileurl success', res)
            alert('获取成功' + JSON.stringify(res))
        }).catch(err => {
            console.log('getfileurl failed', err)
        })
        } else {
        alert("先上传文件")
        }
```
