/**
 * @export public
 * @doc_name 文件模块
 * @doc_index 4
 * @doc_directory host
 * @module miot/host/file
 * @description 
 * 本地文件访问及处理服务
 * 注意插件文件处理皆处于插件沙盒目录下
 * 
 * @example
 * //给定文件名后下载或者截图后被放到本地目录里, 在<Image/>等标签需要引用时, 使用{local:"filename"}的方式引入
 * const myfile = "testpicture.png"
 * Host.file.downloadFile("http://..../...png", myfile)
 * .then(res=>{
 *     const myimg = <Image source={{local:myfile}} ... />
 *     ...
 * })
 * .catch(err=>{...})
 * 
 * ...
 * const myshotfile = "testshot.png"
 * Host.file.screenShot(myshotfile)
 * .then(res=>{
 *    const myshotpic = <Image source={{local:myshotfile}} ... />
 *    ...
 * });
 * ...
 */
//@native
import native, { buildEvents } from "../native";
export const FileEvent = {
    /**
     * 文件下载时的进度事件通知
     * @param filename  文件名
     * @param url       下载地址
     * @param totalBytes    下载总大小
     * @param downloadBytes 已下载文件大小
     */
    fileDownloadProgress: {
        //@native begin
        forever: emitter => ({ filename, url, totalBytesRead, totalBytesExpectedToRead }) => {
            emitter.emit({ filename, url, totalBytes: totalBytesExpectedToRead, downloadBytes: totalBytesRead });
        },
        sameas: native.isIOS ? "MHPluginFSFileIsDownloadingEvent" : "fileDownloadProgress"
        //@native end
    },
};
//@native
buildEvents(FileEvent)
export default {
    /**
     * 读取沙盒内文件列表
     * * @param {string} subFolder 读取沙盒文件夹下某子文件夹中文件内容，用于解压缩文件中带有文件夹，或者读取指定文件夹解压后的文件,标准path结构，不以'/'开头
     * @returns {Promise}
     * 成功时：[{name:xxx}, {name: xxx}, ...]  数组的形式返回数组
     * 失败时：result: {"code":xxx, "message":"xxx" }
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.file.readFileList().then(res => {
     *  console.log('read fiel list:', res)
     * }).catch((isOk, result)=>{
     *   console.log(isOk, result)
     * });
     * 
     * Host.file.readFileList('mysubfolder/aaa').then(res => {
     *  console.log('read fiel list:', res)
     * })
     */
    readFileList(subFolder = '') {
        //@native :=> Promise.resolve([]);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.readFileListFrom(subFolder, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(false, result);
                }
            })
        });
        //@native end
    },
    /**
     * 判断文件是否存在
     * @param {string} fileName 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @returns {Promise<boolean>}
     * 成功时：直接返回true or false
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * import {Host} from 'miot'
     * ...
     * let fileExist = await Host.file.isFileExists('fileName')
     * //or
     * Host.file.isFileExists('fileName').then(res => {
     * console.log('file exist at path:', res)
     * }).catch(err => {
     * // file name error or get file path with error
     * })
     */
    isFileExists(fileName) {
        //@native :=> Promise.resolve(false)
        return new Promise((resolve, reject) => {
            native.MIOTFile.isFileExists(fileName, (isSuccess, json) => {
                if (isSuccess) {
                    resolve(json);
                } else {
                    reject(json);
                }
            })
        })
        //@native end
    },
    /**
     * 读本地文件， 读取普通字符串， 与之对应的写文件为Host.file.writeFile(fileName, content)
     * @param {string} fileName - 文件名,可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise<String>}
     * 成功时：直接返回文件内容
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.filereadFile('name').then(content =>{
     *  console.log('file content:', content)
     * })
     */
    readFile(fileName, opt = {}) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.readFile(fileName, (isSuccess, utf8Content) => {
                if (isSuccess) {
                    resolve(utf8Content);
                } else {
                    reject(utf8Content);
                }
            });
        });
        //@native end
    },
    /**
     * 读本地文件， 通常用于读取蓝牙设备需要的文件数据
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @returns {Promise}
     * 成功时：直接返回文件内容
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.filereadFileToHexString('name').then(content =>{
     *  console.log('file content:', content)
     * })
     */
    readFileToHexString(fileName, opt = {}) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.readFileToHexString(fileName, (isSuccess, utf8Content) => {
                if (isSuccess) {
                    resolve(utf8Content);
                } else {
                    reject(utf8Content);
                }
            });
        });
        //@native end
    },
    /**
     * 读文件，并转换为 Base64 编码
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @returns {Promise}
     * 成功时：直接返回文件内容
     * 失败时：{"code":xxx, "message":"xxx" }
     */
    readFileToBase64(fileName, opt = {}) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.readFileToBase64(fileName, (isSuccess, base64Content) => {
                if (isSuccess) {
                    resolve(base64Content);
                } else {
                    reject(base64Content);
                }
            });
        });
        //@native end
    },
    /**
     * 写文件， 与之对应的读文件为Host.file.readFile(fileName)
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {string} utf8Content - 文件内容字符串
     * @returns {Promise}
     * 成功时：直接返回true
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.filewriteFile('name', 'content').then(_ =>{
     *  //写入成功
     *  console.log('write success')
     * })
     * ...
     * 
     */
    writeFile(fileName, utf8Content, opt = {}) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.writeFile(fileName, utf8Content, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(true);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 写文件，输入为 未经过base64转换的字符串， api内部会对普通字符串做Base64 编码后存放到文件中
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {string} fileContent - 需要写入的文件内容
     * @returns {Promise}
     * 成功时：直接返回true
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.filewriteFileThroughBase64('name', 'base64').then(_ =>{
     *  //写入成功
     *  console.log('write success')
     * })
     * ...
     */
    writeFileThroughBase64(fileName, fileContent, opt = {}) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.writeFileThroughBase64(fileName, fileContent, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(true);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 向已存在的文件追加内容, 通常是通过使用writeFile接口来写的文件
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {string} utf8Content - 文件内容字符串
     * @returns {Promise}
     * 成功时：直接返回true
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.fileappendFile('name', 'base64').then(_ =>{
     *  //写入成功
     *  console.log('write success')
     * })
     * ...
     */
    appendFile(fileName, utf8Content, opt = {}) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.appendFile(fileName, utf8Content, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(true);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 向已存在的文件追加内容，输入为 未经过base64转换的字符串， api内部会对字符串做Base64 编码后存放到文件中
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {string} fileContent - 需要写入的文件内容
     * @returns {Promise}
     * 成功时：直接返回true
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.fileappendFileThroughBase64('name', 'base64').then(_ =>{
     *  //写入成功
     *  console.log('write success')
     * })
     * ...
     *
     */
    appendFileThroughBase64(fileName, fileContent, opt = {}) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.appendFileThroughBase64(fileName, fileContent, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(true);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 删除文件
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @returns {Promise}
     * 成功时：直接返回true
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.filedeleteFile('name').then(_ =>{
     *  console.log('delete success')
     * })
     * ...
     */
    deleteFile(fileName, opt = {}) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.deleteFile(fileName, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(true);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 上传普通文件，需要申请权限使用
     * 获取用于上传FDS文件的obj_name以及用于上传的url
     * 设备需要申请配置FDS权限，参考 https://iot.mi.com/new/guide.html?file=08-%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/03-%E5%AD%98%E5%82%A8/01-%E4%BD%BF%E7%94%A8FDS%E5%AD%98%E5%82%A8%E7%94%A8%E6%88%B7%E6%96%87%E4%BB%B6
     * @since 10004
     * @param {string} did 设备did
     * @param {string} suffix 文件后缀 例如 'mp3', 'txt'
     * @example
     *  let did = Device.deviceID;
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
     */
    generateObjNameAndUrlForFDSUpload(did, suffix) {
        //@native :=> promise
        return new Promise((resolve, reject) => {
            let params = { did, suffix }
            native.MIOTRPC.standardCall("/home/genpresignedurl", params, (ok, res) => {
                if (!ok) {
                    return reject(res);
                }
                resolve(res);
            });
        });
        //@native end
    },
    /**
     * 上传日志文件。
     * 具体使用参考generateObjNameAndUrlForFDSUpload
     * @since 10011
     * @param {string} did 
     * @param {string} suffix string or array<string>
     */
    generateObjNameAndUrlForLogFileFDSUpload(did, suffix) {
        //@native :=> promise
        return new Promise((resolve, reject) => {
            let params = { did, suffix }
            native.MIOTRPC.standardCall("/home/genfilepresignedurl", params, (ok, res) => {
                if (!ok) {
                    return reject(res);
                }
                resolve(res);
            });
        });
        //@native end
    },
    /**
     * 获取FDS文件的信息，包含下载地址等信息
     * 设备需要申请配置FDS权限，参考 https://iot.mi.com/new/guide.html?file=08-%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/03-%E5%AD%98%E5%82%A8/01-%E4%BD%BF%E7%94%A8FDS%E5%AD%98%E5%82%A8%E7%94%A8%E6%88%B7%E6%96%87%E4%BB%B6
     * 
     * 对于手动上传到fds的文件(没有genObjName ,在平台端直接上传的)，可直接设置成public，生成url。插件端需要用这个文件时，用通用下载接口下载此url即可。
     * getFDSFileInfoWithObjName,这个接口只是用来下载通过插件接口(Host.file.uploadFileToFDS)上传到FDS的文件
     * 
     * @since 10004
     * @param {string} obj_name generateObjNameAndUrlForFDSUpload 生成的 obj_name
     * @example
     *  let did = Device.deviceID;
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
     */
    getFDSFileInfoWithObjName(obj_name) {
        //@native :=> promise
        return new Promise((resolve, reject) => {
            native.MIOTRPC.standardCall("/home/getfileurl", { obj_name }, (ok, res) => {
                if (!ok) {
                    return reject(res);
                }
                resolve(res);
            });
        });
        //@native end
    },
    /**
     * @ typedef UploadParams - 参数字典
     * @ property {string} uploadUrl
     * @ property {'POST' | 'PUT'} method
     * @ property {{'Accept': 'application/json'}} headers
     * @ property {{}} fields
     * @ property {[{fileName: 'xxx'}]} files
     */
    /**
     * 上传文件
     * @param {UploadParams} params - 参数字典
     * @returns {Promise}
     * @example
     * import {Host} from 'miot'
     * ...
     * let params = {
     *  uploadUrl: 'http://127.0.0.1:3000',
     *  method: 'POST', // default 'POST',support 'POST' and 'PUT'
     *  headers: {
     *      'Accept': 'application/json',
     *  },
     *  fields: {
     *      'hello': 'world',
     *  },
     *  files: [
     *      {
     *          fileName: 'fileName.png', // 只能上传插件sandbox里的文件
     *      },
     *  ]
     * };
     * Host.file.uploadFile(params).then(res => {
     *  console.log('upload success with res:', res)
     * }).catch(err => {
     *  console.log('upload failed with err:', err)
     * })
     * ...
     */
    uploadFile(params) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.uploadFile(params, (isSuccess, response) => {
                if (isSuccess) {
                    resolve(response);
                } else {
                    reject(response);
                }
            });
        });
        //@native end
    },
    /**
     * 上传文件到小米云FDS
     * @param {UploadParams} params - 参数字典
     * @returns {Promise}
     * @example
     * same as Host.file.uploadFile
     */
    uploadFileToFDS(params) {
        //@native :=> Promise.resolve(null);
        //@mark andr 咱不提供 因为实现方式和 uploadFile 无差别
        return new Promise((resolve, reject) => {
            native.MIOTFile.uploadFileToFDS(params, (isSuccess, response) => {
                if (isSuccess) {
                    resolve(response);
                } else {
                    reject(response);
                }
            });
        });
        //@native end
    },
    /**
     * 下载文件到插件沙盒目录, 文件下载完成后才会回调
     * @param {string} url - 文件地址
     * @param {string} fileName - 存储到本地的文件名
     * @returns {Promise}
     * 成功时：{header:{}, path:xxx, filename:xxx,status:xxx}
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.file.downloadFile('url', 'targetName').then(res =>{
     *  console.log('download success with res:', res)
     * }).catch(err => {
     *  console.log('download failed with err:', err)
     * })
     * ...
     */
    downloadFile(url, fileName) {
        //@native :=> Promise.resolve(null);
        return new Promise((resolve, reject) => {
            native.MIOTFile.downloadFile(url, fileName, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 获取 base64 编码的数据长度
     * @param {string} base64Data - base64 编码的字符串
     * @returns {Promise}  返回具体的长度
     * @example
     * import {Host} from 'miot'
     * ...
     * let len = await Host.file.dataLengthOfBase64Data('data')
     * //or
     * Host.file.dataLengthOfBase64Data('data').then(len => console.log('len:', len))
     * ...
     */
    dataLengthOfBase64Data(base64Data) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.dataLengthOfBase64Data(base64Data, (length) => {
                resolve(length);
            });
        });
        //@native end
    },
    /**
     * 获取一个data的子data（base64编码）
     * @param {string} base64Data - base64 编码的数据
     * @param {number} loc - 起始位置
     * @param {number} len - 长度
     * @returns {Promise}
     */
    subBase64DataOfBase64Data(base64Data, loc, len) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.subBase64DataOfBase64Data(base64Data, loc, len, (isSuccess, subData) => {
                if (isSuccess) {
                    resolve(subData);
                } else {
                    reject(false);
                }
            });
        });
        //@native end
    },
    /**
     * 解压缩一个zip文件，解压缩后的文件会直接存储在插件存储空间的根目录下
     * @param {string} fileName - 文件名（插件存储空间内的文件）
     * * @param {string} desitinationPath - 目标解压缩文件夹，默认解压到当前文件夹，如果指定名称，压缩包内容会解压到指定文件夹
     * @returns {Promise}
     * 成功时：返回true
     * 失败时：{"code":xxx, "message":"xxx" }
     */
    unzipFile(fileName, desitinationPath = '') {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.unzipFile(fileName, desitinationPath, (isSuccess, msg) => {
                if (isSuccess) {
                    resolve(true);
                } else {
                    reject(msg);
                }
            });
        });
        //@native end
    },
    /**
     * 解压缩一个gz文件, 并以base64编码的形式直接返回给插件, 不做本地存储
     * @param {string} fileName - 文件名（插件存储空间内的文件）
     * @return {Promise}
     * 成功时：返回文件的内容
     * 失败时：{"code":xxx, "message":"xxx" }
     */
    ungzFile(fileName) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.ungzFile(fileName, (isSuccess, info) => {
                if (isSuccess) {
                    resolve(info);
                } else {
                    reject(info);
                }
            });
        });
        //@native end
    },
    //@native begin
    /**
     * 为云米扫地机的地图文件解压提供，私有
     * @param {string} fileName - 文件名（插件存储空间内的文件）
     * @return {Promise}
     */
    ungzYunMiFile(fileName) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.ungzYunMiFile(fileName, (isSuccess, info) => {
                if (isSuccess) {
                    resolve(info);
                } else {
                    reject(info);
                }
            });
        });
    },
    //@native end
    /**
    * 保存指定照片文件到系统相册
    * @param {string} fileName 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
    * @returns {Promise}
     * 成功时：返回true
     * 失败时：{"code":xxx, "message":"xxx" }
    * @example
    * import {Host} from 'miot'
    * ...
    * Host.file.saveImageToPhotosAlbum('name').then(_ =>{
    *  console.log('successful save to PhotosAlbum')
    * })
    * ...
    */
    saveImageToPhotosAlbum(fileName) {
        //@native :=> Promise.resolve(false)
        return new Promise((resolve, reject) => {
            native.MIOTFile.saveImageToPhotosAlbum(fileName, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(true);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 屏幕全屏截图
     * @param {string} imageName - 图片名称，png,
     * @return {Promise<string>} - 截图成功回调函数返回存储图片的绝对路径，加载图片时直接使用即可
     * 成功时：返回图片的路径
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * <Image source={{local:imageName, scale:PixelRatio.get()}} />
     *
     */
    screenShot(imageName) {
        //@native :=> Promise.resolve("...");
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.screenShot(imageName, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 自定义范围的屏幕截图
     * @param {string} imageName - 图片名称，png
     * @param {{l:int, t:int, w:int, h:int}} rect - 截屏范围
     * @return {Promise<string>} -  截图成功 返回图片地址
     * 成功时：返回图片的路径
     * 失败时：{"code":xxx, "message":"xxx" }
     *
     */
    screenShotInRect(imageName, rect) {
        //@native :=> Promise.resolve("...");
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.screenShotInRect(imageName, native.isIOS ? { x: rect.l, y: rect.t, width: rect.w, height: rect.h } : rect, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 长截屏，用来截scrollView，会把超出屏幕的部分也截到
     * @param {number} viewRef - scrollView的引用
     * @param {string} imageName - 图片名称，png
     * @returns {Promise<string>}
     * 成功时：返回图片的路径
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     *  var findNodeHandle = require('findNodeHandle');
     *  var myScrollView = findNodeHandle(this.refs.myScrollView);
     *  Host.file.longScreenShot(myScrollView, 'test2.png').then(imagePath=>{
     *      console.log(imagePath);
     *  });
     */
    longScreenShot(viewRef, imageName) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.longScreenShot(viewRef, imageName, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 高德地图截屏
     * @param {number} viewRef - MAMapView(MHMapView的父类)的引用
     * @param {string} imageName - 图片名称，自动添加后缀png
     * @return {Promise}
     * 成功时：返回图片的路径
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * const findNodeHandle = require('findNodeHandle');
     * const myMapViewRef = findNodeHandle(this.refs.myMapView);
     * const imageName = 'mapToShare.png';
     * let imageToShow = null;
     * Host.file.amapScreenShot(myMapViewRef, imageName).then(() => {
     *    imageToShow = <Image source={{local:imageName}}>
     *    console.log("ok");
     * });
     */
    amapScreenShot(viewRef, imageName) {
        //@native :=> Promise.resolve("...");
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.amapScreenShot(viewRef, imageName, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 获取图片指定点的色值, 传空数组将返回所有点的色值
     * @param {string} imagePath - 图片文件路径
     * @param {Array<{x:int,y:int}>} points - 位置数组
     * @returns {Promise}
     */
    getRGBAValueFromImageAtPath(imagePath, points) {
        //@native :=> Promise.resolve(null);
        //@mark andr done
        return new Promise((resolve, reject) => {
            native.MIOTFile.getRGBAValueFromImageAtPath(imagePath, points, (isSuccess, colorValues) => {
                if (isSuccess) {
                    resolve(colorValues);
                } else {
                    reject(false);
                }
            });
        });
        //@native end
    },
    //@native begin
    get storageBasePath() {
        return "";
    }
    //@native end
};