<a name="module_miot/host/file.generateObjNameAndUrlForFDSUpload"></a>

## .generateObjNameAndUrlForFDSUpload(did, suffix)
上传普通文件，需要申请权限使用
获取用于上传FDS文件的obj_name以及用于上传的url
设备需要申请配置FDS权限，参考 https://iot.mi.com/new/guide.html?file=08-%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/03-%E5%AD%98%E5%82%A8/01-%E4%BD%BF%E7%94%A8FDS%E5%AD%98%E5%82%A8%E7%94%A8%E6%88%B7%E6%96%87%E4%BB%B6

**Kind**: static function  
**Since**: 10004  

| Param | Type | Description |
| --- | --- | --- |
| did | <code>string</code> | 设备did |
| suffix | <code>string</code> | 文件后缀 例如 'mp3', 'txt' |

**Example**  
```js
let did = Device.deviceID;
        let suffix = "mp3";
        Host.file.generateObjNameAndUrlForFDSUpload(did, suffix).then(res => {
        if (res.hasOwnProperty(suffix) && res[suffix]) {
            let obj = res[suffix];
            let obj_name = obj.obj_name;
            let name = obj_name.substring(obj_name.length - 22)
            let content = "AC";
            let time = obj.time;
            this.file_obj_name = obj_name;
            console.log("pre upload", res)

            Host.file.writeFile(name, content).then(r => {
                let param = {
                    uploadUrl: obj.url,
                    method: obj.method,
                    headers: { "Content-Type": "" },
                    files: [{ filename: name }]
                }
                Host.file.uploadFileToFDS(param).then(rr => {
                    alert('上传成功' + JSON.stringify(rr))
                    console.log('upload file success', rr)
                }).catch(err => {
                    alert('上传失败' + JSON.stringify(err))
                    console.log('upload file failed', err)
                })
            }).catch(err => {
                alert('存储临时文件失败' + JSON.stringify(err))
                console.log("write file failed", err)
            })
        }
        })
```
