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
import Device from "../device/BasicDevice";
import { report } from "../decorator/ReportDecorator";
import { PermissionsAndroid } from "react-native";
import { processColor } from "react-native";
/**
 * 文件事件名集合
 * @namespace FileEvent
 */
export const FileEvent = {
  /**
     * 文件下载时的进度事件通知
     * @param filename  文件名
     * @param url       下载地址
     * @param totalBytes    下载总大小
     * @param downloadBytes 已下载文件大小
     */
  fileDownloadProgress: {
  },
  /**
   * 文件上传时的进度事件通知， 支持Host.file.uploadFile 和 Host.file.uploadFileToFDS 文件上传接口进度回调
   * @param uploadUrl       上传地址
   * @param totalBytes    上传总大小
   * @param uploadBytes 已上传文件大小
   */
  fileUploadProgress: {
  }
};
/**
 * 文件管理
 * @interface
 *
 */
class IFile {
  /**
   * 读取沙盒内文件列表, 返回文件的名称和文件的大小， 注意文件夹大小为：-1, 大小单位为B（字节）;
   * 从10047起，新增 modifyTime 字段：文件保存时的时间戳，单位秒
   * * @param {string} subFolder 读取沙盒文件夹下某子文件夹中文件内容，用于解压缩文件中带有文件夹，或者读取指定文件夹解压后的文件,标准path结构，不以'/'开头
   * @returns {Promise}
   * 成功时：[{name:'xxx', size: 'xxx' , 'modifyTime': xxx(文件保存时的时间戳，单位秒)}, {name:'xxx', size: 'xxx', 'modifyTime': xxx(文件保存时的时间戳，单位秒)}, ...]  数组的形式返回数组
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
  @report
  readFileList(subFolder = '') {
     return Promise.resolve([]);
  }
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
  @report
  isFileExists(fileName) {
     return Promise.resolve(false)
  }
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
  @report
  readFile(fileName) {
     return Promise.resolve(null);
  }
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
  @report
  readFileToHexString(fileName) {
     return Promise.resolve(null);
  }
  /**
   * 读文件，并转换为 Base64 编码
   * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
   * @returns {Promise}
   * 成功时：直接返回文件内容
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  readFileToBase64(fileName) {
     return Promise.resolve(null);
  }
  /**
   * 读取一定字节的文件，并转换为 Base64 编码
   * @since 10045
   * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
   * @param {number} off - 在文件中读取数据的起始位置的偏移
   * @param {number} len - 读取的最大字节数
   * @returns {Promise}
   * 成功时：{content:"xxx",totalLength:xxx},
   * content为读取到的经过Base64编码后的文件内容，类型为string
   * totalLength为文件总长度，类型为number
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  readFileSegmentToBase64(fileName, off, len) {
     return Promise.resolve(null);
  }
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
  @report
  writeFile(fileName, utf8Content) {
     return Promise.resolve(null);
  }
  /**
   * 写文件，输入为 Base64 编码的字符串， api内部会对字符串做 Base64 解码后存放到文件中
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
  @report
  writeFileThroughBase64(fileName, fileContent) {
     return Promise.resolve(null);
  }
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
  @report
  appendFile(fileName, utf8Content) {
     return Promise.resolve(null);
  }
  /**
   * 向已存在的文件追加内容，输入为 Base64 编码的字符串， api内部会对字符串做 Base64 解码后存放到文件中
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
  @report
  appendFileThroughBase64(fileName, fileContent) {
     return Promise.resolve(null);
  }
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
  @report
  deleteFile(fileName) {
     return Promise.resolve(null);
  }
  /**
   * 上传普通文件，需要申请权限使用
   * 获取用于上传FDS文件的obj_name以及用于上传的url
   * 访问接口：/home/genpresignedurl
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
  @report
  generateObjNameAndUrlForFDSUpload(did, suffix) {
     return Promise.resolve(null);
  }
  /**
   * 上传普通文件，需要申请权限使用,V3版本
   * 获取用于上传FDS文件的obj_name以及用于上传的url
   * 访问接口：/v2/home/genpresignedurl_v3
   * @since 10056
   * @param {string} did 设备did
   * @param {string} suffix 文件后缀 例如 'mp3', 'txt'
   * @example
   * let did = Device.deviceID;
   * let suffix = "mp3";
   * *** Host.file.uploadFileToFDS(param) param = {headers: { "Content-Type": "application/octet-stream" }},上传FDS需要配置Content-Type
   * *** 如果是KS3 headers: { "Content-Type": "application/octet-stream", "X-Amz-Acl" : "private"}
   Host.file.generateObjNameAndUrlForFDSUploadV3(did, suffix).then(res => {
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
                  headers: { "Content-Type": "application/octet-stream" },
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
   * */
  @report
  generateObjNameAndUrlForFDSUploadV3(did, suffix) {
     return Promise.resolve(null);
  }
  /**
   * 上传日志文件。
   * 具体使用参考generateObjNameAndUrlForFDSUpload
   * @since 10011
   * @param {string} did
   * @param {string} suffix string or array<string>
   */
  @report
  generateObjNameAndUrlForLogFileFDSUpload(did, suffix) {
     return Promise.resolve(null);
  }
  /**
   * 获取FDS文件的信息，包含下载地址等信息
   *
   * 对于手动上传到fds的文件(没有genObjName ,在平台端直接上传的)，可直接设置成public，生成url。插件端需要用这个文件时，用通用下载接口下载此url即可。
   * getFDSFileInfoWithObjName,这个接口只是用来下载通过插件接口(Host.file.uploadFileToFDS)上传到FDS的文件
   *访问接口:/home/getfileurl
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
  @report
  getFDSFileInfoWithObjName(obj_name) {
     return Promise.resolve(null);
  }
  /**
   * 获取FDS文件的信息，包含下载地址等信息 V3版本
   *
   * 对于手动上传到fds的文件(没有genObjName ,在平台端直接上传的)，可直接设置成public，生成url。插件端需要用这个文件时，用通用下载接口下载此url即可。
   * getFDSFileInfoWithObjNameV3,这个接口只是用来下载通过插件接口(Host.file.uploadFileToFDS)上传到FDS的文件
   * 访问接口:/v2/home/getfileurl_v3
   * @since 10056
   * @param {string} obj_name generateObjNameAndUrlForFDSUploadV3 生成的 obj_name
   * @example
   *  let did = Device.deviceID;
   let suffix = "mp3";
   let file_obj_name = this.file_obj_name //从服务端获取或者本地获取,generateObjNameAndUrlForFDSUploadV3 生成
   if (file_obj_name) {
      Host.file.getFDSFileInfoWithObjNameV3(file_obj_name).then(res => {
          console.log('getfileurl success', res)
          alert('获取成功' + JSON.stringify(res))
      }).catch(err => {
          console.log('getfileurl failed', err)
      })
      } else {
      alert("先上传文件")
      }
   */
  @report
  getFDSFileInfoWithObjNameV3(obj_name) {
     return Promise.resolve(null);
  }
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
   *          filename: 'fileName.png', // 必选， 只能上传插件sandbox里的文件
   *          range: {start: 10, length: 100} // 可选， since 10037， 从start开始读取lengt长度的文件，可选，不配置则表示文件从头到尾
   *          formdata: {name: 'name1.png', filename: 'customFileName.png'} // 可选， since 10038， 用于自定义formdata中的name和filename
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
  @report
  uploadFile(params) {
     return Promise.resolve(null);
  }
  /**
   * 上传文件到小米云FDS
   * @param {UploadParams} params - 参数字典
   * @returns {Promise}
   * @example
   * same as Host.file.uploadFile
   */
  @report
  uploadFileToFDS(params) {
     return Promise.resolve(null);
  }
  /**
   * @ typedef DownloadParams - 参数字典
   * @ property {string} taskID -  可选 since 10038 下载任务唯一标示, 如 MD5(url + timestamp)
   */
  /**
   * 下载文件到插件沙盒目录, 文件下载完成后才会回调，只支持下载单个文件
   * @param {string} url - 文件地址
   * @param {string} fileName - 存储到本地的文件名
   * @param {DownloadParams} params 参数字典 可选 since 10038
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
  @report
  downloadFile(url, fileName, params = null) {
     return Promise.resolve(null);
  }
  /**
   * 取消指定的下载任务
   * @param {string} taskID - since 10038 下载任务的唯一ID， 与 downloadFile 传入的 taskID 一致
   * @returns {Promise}
   * 成功时：{code:0, data:{}}
   * 失败时：{code:-1, message:'xxx'}
   */
  cancelDownloadFile(taskID) {
     return Promise.resolve(null);
  }
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
  @report
  dataLengthOfBase64Data(base64Data) {
     return Promise.resolve(null);
  }
  /**
   * 获取一个data的子data（base64编码）
   * @param {string} base64Data - base64 编码的数据
   * @param {number} loc - 起始位置
   * @param {number} len - 长度
   * @returns {Promise}
   */
  @report
  subBase64DataOfBase64Data(base64Data, loc, len) {
     return Promise.resolve(null);
  }
  /**
   * 解压缩一个zip文件，解压缩后的文件会直接存储在插件存储空间的根目录下
   * @param {string} fileName - 文件名（插件存储空间内的文件）
   * * @param {string} desitinationPath - 目标解压缩文件夹，默认解压到当前文件夹，如果指定名称，压缩包内容会解压到指定文件夹
   * @returns {Promise}
   * 成功时：返回true
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  unzipFile(fileName, desitinationPath = '') {
     return Promise.resolve(null);
  }
  /**
   * 解压缩一个gzip文件为指定格式的字符串；文件首先被解压为一个字节数组，然后将字节数组转换为string(string可以是utf-8、base-64、16进制)
   * @since 10054
   * @param {json} params {
   *  fileName: 'cache/test.zip', //沙盒内的相对路径,必填
   *  charsetName:'[utf-8|base-64|hex-string|int-array]',//指定解压后的字符串的格式: utf-8表示将文件解压为utf-8格式的字符串；
   * base-64表示解压为base-64格式的字符串；hex-string表示解压为16进制字符串；int-array表示将解压后的数据以JSONArray(数组元素为int类型)的格式的字符串返回
   * charsetName可不传，不传默认为base-64
   * }
   * @returns {Promise<json>} 成功时返回：{code:0,data:'xxxxxxxxxxx'}
   * 失败时返回：
   * {code:-1,message:’${fileName} is not valid’}
   * {code:-2,message:’${fileName} is not exist‘}
   * {code:-3,message:’${fileName} is not a file}
   * {code:-4,message: 'unzipToString failed:internal error'}
   * @example
   * let params = {
   *  fileName: 'cache/test.zip',
   *  charsetName: 'base-64',
   * }
   * Host.file.ungzipFileToString(params).then(res=>{
   *  console.log("file content:",res);
   * }).catch(err=>{
   *  console.log("ungzipFileToString error:",err);
   * })
   */
   @report
  ungzipFileToString(params) {
     return Promise.resolve(null);
  }
  /**
   * 解压缩一个gz文件, 并以base64编码的形式直接返回给插件, 不做本地存储
   * @param {string} fileName - 文件名（插件存储空间内的文件）
   * @return {Promise}
   * 成功时：返回文件的内容
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
   ungzFile(fileName) {
      return Promise.resolve(null);
   }
  /**
  * 保存指定照片文件到系统相册
  * @param {string} fileName 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
  * @returns {Promise}
   * 成功时：返回true
   * 失败时：{"code":xxx, "message":"xxx" }
  * @example  参考com.xiaomi.demo Host-->PhotoDemo.js
  * import {Host} from 'miot'
  * ...
  * Host.file.saveImageToPhotosAlbum('name').then(_ =>{
  *  console.log('successful save to PhotosAlbum')
  * })
  * ...
  */
  @report
  saveImageToPhotosAlbum(fileName) {
     return Promise.resolve(false)
  }
  /**
   * 保存指定文件到系统相册
   * @since 10037
   * @param {string} fileName 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
   * @returns {Promise}
   * 成功时：返回true
   * 失败时：{"code":xxx, "message":"xxx" }
   * @example 参考com.xiaomi.demo Host-->PhotoDemo.js
  */
  @report
  saveFileToPhotosAlbum(fileName) {
     return Promise.resolve(false)
  }
  /**
   * 保存指定图片文件到以did命名的相册中
   * 该方法会在系统相册中创建一个以did[-customDirName]命名的相册（如果不存在），并将图片保存在其中
   * @since 10037
   * @param {string} fileName 图片在沙盒中的文件名
   * @param {string} customDirName 自定义相册名称，默认为null，since 10042
   * @returns {Promiste}
   * 成功时：返回true
   * 失败时：
   *  {"code":-401, "message":"access to photo library denied" }
   *  {"code":-1, "message":"did cannot be empty" }
   *  {"code":-2, "message":"did cannot be empty" }
   *  {"code":-3, "message":"path is ilegal or file not exist" }
   *  {"code":-5, "message":"filepath cannot convert to a image, please check" }
   *  {"code":-100, "message":"failed to save image" }
   *  {"code":-101, "message":"failed to create album" }
   * @example 参考com.xiaomi.demo Host-->PhotoDemo.js
   */
  @report
  saveImageToPhotosDidAlbum(fileName, customDirName = null) {
     return Promise.resolve(false)
  }
  /**
   * 保存指定照片文件到以did命名的相册中
   * 该方法会在系统相册中创建一个以did命名的相册（如果不存在），并将视频保存在其中
   * @since 10037
   * @param {string} fileName
   * @param {string} customDirName 自定义相册名称，默认为null, since 10042
   * @returns {Promise}
   * 成功时：返回true
   * 失败时：
   *  {"code":-401, "message":"access to photo library denied" }
   *  {"code":-1, "message":"did cannot be empty" }
   *  {"code":-2, "message":"did cannot be empty" }
   *  {"code":-3, "message":"path is ilegal or file not exist" }
   *  {"code":-4, "message":"filepath cannot seek to be video file" }
   *  {"code":-6, "message":"file cannot save to album as a video" }
   *  {"code":-100, "message":"failed to save video" }
   *  {"code":-101, "message":"failed to create album" }
   * @example 参考com.xiaomi.demo Host-->PhotoDemo.js
   */
  @report
  saveVideoToPhotosDidAlbum(fileName, customDirName = null) {
     return Promise.resolve(false)
  }
  /**
   * 从did命名的相册中 通过url获取视频文件的filepath
   * @since 10037
   * @param {string} url
   * @param {string} customDirName 自定义相册名称，默认为null, since 10042
   * @returns {Promise}
   * 成功时：返回true
   * 失败时：
   *  {"code":-401, "message":"access to photo library denied" }
   *  {"code":-1, "message":"did cannot be empty" }
   *  {"code":-2, "message":"did cannot be empty" }
   *  {"code":-3, "message":"url cannot be empty" }
   * @example 参考com.xiaomi.demo Host-->PhotoDemo.js
   */
  @report
  fetchLocalVideoFilePathFromDidAlbumByUrl(url, customDirName = null) {
     return Promise.resolve(false)
  }
  /**
   * 获取指定以did命名的相册中所有的图片和视频
   * 如果不存在该相册，返回空数组
   * @since 10037
   * @param {string} customDirName 自定义相册名称，默认为null, since 10042
   * @returns {Promise}
   * 成功时：{"code":0, "data":[] }
   *      返回图片和视频信息
   *          ios 返回 图片scheme协议 miotph:// 视频scheme miotvideo://
   *          android 返回图片和视频文件的fileurl
   *      每个图片信息包含key
   *      {'url':<'miotph://XXXXXX'(ios) 'file://XXXXXX' (android)>,
   *      'mediaType' : <number>, // 0 : unknowntype, 1: image, 2:video, 3: audio(10037暂不支持)
   *      'pixelWidth' :<number>, // width信息，0 代表unknown
   *      'pixelHeight' :<number>, // height 0 代表unknown
   *      'creationDate' :<number>, // 创建时间信息，unix时间戳
   *      'modificationDate' : <number>, // 修改时间信息， unix时间戳
   *      'duration' : <number>, // 持续时间 信息 图片文件返回0  单位ms 10042之前ios返回的是秒，安卓返回的是ms 在10042 之后ios修正为ms
   *      'uti' : <string>, // 资源类型 since 10050 参考 https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E7%B1%BB%E5%9E%8B%E6%A0%87%E8%AF%86
   *      }
   * 失败时：
   *  {"code":-401, "message":"access to photo library denied" }
   *  {"code":-1, "message":"did cannot be empty" }
   *  {"code":-2, "message":"did cannot be empty" }
   * @example 参考com.xiaomi.demo Host-->PhotoDemo.js
   */
  @report
  getAllSourceFromPhotosDidAlbum(customDirName = null) {
     return Promise.resolve(false)
  }
  /**
   * 在相册中通过url 删除指定的assets
   * @since 10037
   * @param {array} urls
   * @returns {Promise}
   * 成功时：返回true
   * 失败时：
   *  {"code":-401, "message":"access to photo library denied" }
   *  {"code":-1, "message":"did cannot be empty" }
   *  {"code":-2, "message":"did cannot be empty" }
   *  {"code":-3, "message":"urls cannot be parsed to a Array or it is empty" }
   *  {"code":-100, "message":"delete assets failed" }
   * @example 参考com.xiaomi.demo Host-->PhotoDemo.js
   */
  @report
  deleteAssetsFromAlbumByUrls(urls) {
     return Promise.resolve(false)
  }
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
  @report
  screenShot(imageName) {
     return Promise.resolve("...");
  }
  /**
   * 自定义范围的屏幕截图
   * @param {string} imageName - 图片名称，png
   * @param {{l:int, t:int, w:int, h:int}} rect - 截屏范围
   * @return {Promise<string>} -  截图成功 返回图片地址
   * 成功时：返回图片的路径
   * 失败时：{"code":xxx, "message":"xxx" }
   *
   */
  @report
  screenShotInRect(imageName, rect) {
     return Promise.resolve("...");
  }
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
  @report
  longScreenShot(viewRef, imageName) {
     return Promise.resolve(null);
  }
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
  @report
  amapScreenShot(viewRef, imageName) {
     return Promise.resolve("...");
  }
  /**
   * 获取图片指定点的色值, 传空数组将返回所有点的色值
   * @param {string} imagePath - 图片文件路径
   * @param {Array<{x:int,y:int}>} points - 位置数组
   * @returns {Promise}
   */
  @report
  getRGBAValueFromImageAtPath(imagePath, points) {
     return Promise.resolve(null);
  }
  /**
   * 沙盒路径
   */
  get storageBasePath() {
  }
  /**
   * 创建目录
   * @since 10042
   * @param {json} params {dirPath:‘xxx’,//本地路径如：dir0,/dir0/dir1
   *                       recursive: [true/false],//是否递归创建目录。如果为 true，则创建该目录和该目录下的所有子目录
   *                      }
   * @returns {Promise<json>} 成功时：{code:0,message:'success'},
   *              失败时可能的返回值有：{code:-1,message:'directory name is not valid'},
   *                                {code:-2,message:'file ${dirPath} already exist'},
   *                                {code:-3,message:'parent directory is not exist:${dirPath}'},
   *                                {code:-4,message:'permission denied,cannot access dir:${dirPath}'},
   * @example
   * let params ={
   *  dirPath: 'dir0/dir1',
   *  recursive: true,
   * };
   * Host.file.mkdir(params)
   *      .then(res=>{alert(JSON.stringify(res))})
   *      .catch(err=>{alert(JSON.stringify(err))})
   */
  @report
  mkdir(params) {
  }
  /**
   * 搜索文件（只在Android可使用）
   * @since 10052
   * @param {json} params {
   *     mimeTypes:[],//需要搜索的文件类型
   *     pageSize: xxx,//分页大小,number类型(如100)；如果需要分页，pageSize必须大于0，不传或者传0表示不分页
   *     pageNum: xxx,//分页编号,number类型(如0,1,2...)，pageSize大于0时有效
   * }
   * mimeType的可选值如下：
   * ["application/pdf",//pdf
    "application/msword",//word
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",//docx
    "application/vnd.ms-excel",//xls,xlt
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",//xlsx
    "application/vnd.ms-powerpoint",//ppt,pot,pps
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",//pptx
    "text/text",//text
    "text/html",//html
    "text/xml",//xml
    "image/jpeg",]
    @returns {Promise<json>} 返回值：
    成功时：{ code:0,
      data:[{
        relativePath:'相对路径',
        name:'文件名',
        url:'文件地址'
        size: xxx//'文件大小',
        modifacationDate:xxxxx,//上次修改时间
        }]
    }
    失败时：{
      code:-xxx,
      message:'xxxxx'
    }
    @example
    let params = {
      mimeTypes: ["application/pdf", // pdf
        "application/msword", // word
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
        "application/vnd.ms-excel", // xls,xlt
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
        "application/vnd.ms-powerpoint", // ppt,pot,pps
        "application/vnd.openxmlformats-officedocument.presentationml.presentation", // pptx
      ],
      pageSize: 2,
      pageNo: 0
    };
    Host.file.queryFile(params).then((res) => {
      alert(JSON.stringify(res));
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
   */
  @report
  queryFile(params) {
     return Promise.resolve(null);
  }
  /**
    * 将 utf8Content 转成 PDF 文件
    * @since 10054
    * @param {string} utf8Content  需要被转换的文本内容
    * @param {string} filename  存储为的文件名，与 isFileExists 相同
    * @param {json} params 样式参数
    * @param {string} params.color 文本颜色 如 '#FFF', 'red'
    * @param {number} params.fontSize 字体大小
    * @param {object} params.pageSize 页面大小 如 {width: 200, height:100}
    * @param {string} params.marginHorizontal 水平边距
    * @param {string} params.marginVertical 竖直边距
    * @returns {Promise<Object>}
    *   成功时: {code:0, data: filepath} 绝对路径，可直接用于展示
    *   失败时: {
    *          code:100xx,     // 错误码，非0数字
    *          message:""      // 错误信息
    *        }
    */
  @report
  writePdfFile(utf8Content, filename, params) {
     return Promise.resolve(null);
  }
  /**
   * 将PDF指定页转换为图片
   * @since 10052
   * @param {json} params {
   *   srcPath:'xxxxx',//pdf文件路径
   *   imageDir:'xxxx',//转换后的图片保存目录（目录名，不含文件名）
   *   pageIndex: xx(如：1),//需要将PDF的那一页转换为图片，从0开始
   *   password:'xxxxx',//PDF密码，如果没有加密传空即可
   *   highQuality: true/false,//是否需要高质量图片:如果为true图片格式为ARGB_8888,反之为RGB565;高质量图片会占用更多的内存和磁盘
   * }
   * @returns {Promise<json>} 成功时返回如下：
   * {
   *   code:0,
   *   data:{
   *           imageName: 'xxxxx',//图片名称，imageDir +'/' + imageName即为图片的路径
   *        }
   * }
   * 失败是返回如下：
   * {code:-1,message:'invalid srcPath or imageDir'}
   * {code:-2,message:'no permission to access source file'}
   * {code:-3,message:'password required or incorrect password'}
   * {code:-4,message:'out of memory,set highQuality=false can reduce memory cost'}
   * {code:-5,message:'genarate image failed'}
   * {code:-6,message:'write image failed'}
   * {code:-7,message:'invalid input params pageIndex'}
   *
   * @example
   * let params = {
      mimeTypes: ["application/pdf", // pdf
      ],
      pageSize: 1,
      pageNo: 0
    };
    Host.file.queryFile(params).then((res) => {
      if(res && res.data){
        let pdf_params ={
          srcPath:res.data[0].url,
          imageDir: 'pdf_image',
          pageIndex: 0,
          password:'',
          highQuality:false,
        }
        Host.file.pdfToImage(pdf_params).then(res=>{
          alert(JSON.stringify(res));
        }).catch(res=>{
          alert(JSON.stringify(res));
        })
      }
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
   */
  @report
  pdfToImage(params) {
     return Promise.resolve(null);
  }
  /**
    * 读PDF文件信息
    * @since 10052
    * @param {json} params {
    *   srcPath:'xxxxx',//pdf文件路径
    *   password:'xxxxx',//PDF密码，如果没有加密传空即可
    * }
    * @returns {Promise<json>} 成功时返回如下：
    * {
    *   code:0,
    *   data:{
    *           pageCount: xxx(如：30),//PDF的总页数
    *        }
    * }
    * 失败是返回如下：
    * {code:-1,message:'invalid srcPath or imageDir'}
    * {code:-2,message:'no permission to access source file'}
    * {code:-3,message:'password required or incorrect password'}
    *
    * @example
    * Host.file.queryFile(params).then((res) => {
      if(res && res.data){
        let pdf_params ={
          srcPath:res.data[0].url,
          password:'',
        }
        Host.file.readPdfMetaData(pdf_params).then(res=>{
          alert(JSON.stringify(res));
        }).catch(res=>{
          alert(JSON.stringify(res));
        })
      }
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
    */
  @report
  readPdfMetaData(params) {
     return Promise.resolve(null);
  }
  /**
   * 复制文件
   * since 10048
   * @param {json} params {
   *  srcPath:'xxxxx',//源文件文件路径
   *  dstPath:'xxxx', //目标文件路径：dstDir不为空时，可以传相对路径；dstDir不为空时，这里传文件名
   *  dstDir:'xxx',//目标文件保存路径父目录，沙盒内复制文件时传空即可；如果是往沙盒外复制，dstDiir传目标文件的父目录(不能为空)
   * }
   * @returns {Promise<json>} 成功时：{code:0,message:success}
   *          失败时：{code:-1,message:'invalid srcPath or dstPath'}
   *                {code:-2,message:'file ${dstPath} already exist'}
   *                {code:-3,message:'file not found,xxx'}
   *                {code:-4,message:'copy file error,xxx'}
   *                {code:-5,message:'copy file error,detail: create file error'}
   * @example
   * 沙盒内复制
   * let copy_params={
      srcPath:'test.pdf',
      dstPath:'test_copy.pdf',
    }
    Host.file.copyFile(copy_params).then((res) => {
      alert(JSON.stringify(res));
      Host.file.readFileList('').then(res=>{
        alert(JSON.stringify(res))
      })
    }).catch((res) => {
      alert(JSON.stringify(res));
    });
    * 沙盒外复制
    * let copy_params={
      srcPath:'test.pdf',
      dstPath:'test_copy.pdf',
      dstDir:'content://xxxxxxx'
    }
    Host.file.copyFile(copy_params).then((res) => {
      alert(JSON.stringify(res));
      Host.file.readFileList('').then(res=>{
        alert(JSON.stringify(res))
      })
    }).catch((res) => {
      alert(JSON.stringify(res));
    });
   */
  @report
  copyFile(params) {
     return Promise.resolve(null);
  }
  /**
   * 获取当前磁盘的可用空间和总存储空间
   * since 10048
   * @returns {Promise<json>} 返回当前磁盘的可用空间和总存储空间：{code: 0 ,data: { totalSpace: 123456, freeSpace: 23456} }，
   * 其中totalSpace：总存储空间；freeSpace：剩余可用空间；单位都字节(byte)
   *
   * @example
   * Host.file.getStorageInfo().then(res=>{
   *  alert(JSON.stringify(res))
   * }).catch(err=>{
   *  alert(JSON.stringify(err));
   * });
   */
  @report
  getStorageInfo() {
     return Promise.resolve(null);
  }
  /**
     * 获取指定目录的占用空间 目录必须在插件沙盒或者是插件沙盒子目录
     * 参数 folderName 为 '' 时获取插件沙盒目录
     * 获取子目录需要传递相对路径，sdk会自动对目录做拼接
     * since 10062
     * @returns {Promise<json>} 返回目录必须在插件沙盒或者是插件沙盒子目录占用的存储空间：{code: 0 ,data: { size: 123456} }，
     * 单位都字节(byte)
     *
     * @example
     * // 参数 folderName 为 '' 时获取插件沙盒目录
     * Host.file.readFolderSize('folder').then(res=>{
     *  alert(JSON.stringify(res))
     * }).catch(err=>{
     *  alert(JSON.stringify(err));
     * });
     */
     @report
  readFolderSize(folderName) {
     return Promise.resolve(null);
  }
  /**
   * 裁剪图片
   * since 10054
   * @returns{Promise<string>} 成功时返回裁剪后的图片路径，失败返回 {code:-1,message:'xxx'}
   * @param {string} targetFileName 裁剪后生成的文件的文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.jpg'
   * @param {string} sourceFilename 要裁剪的源图片名
   * @param {Object} params: 裁剪参数
   * @param {Object} params.offset: 裁剪图像的左上角坐标，在原始图像的坐标空间中指定. e.g :{x:0,y:0} type int
   * @param {Object} params.size: 裁切后的图像的尺寸，在原始图像的坐标空间中指定. e.g :{width:400,height:400} type int
   * @param {Object} params.displaySize: 将裁切后的图像缩放到指定大小(Optional).  e.g :{width:200,height:200} type int
   */
  @report
     cropImage(targetFileName, sourceFilename, params) {
        return Promise.resolve(null);
     }
  /**
   * 获取文件的信息
   * @since 10067
   * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
   * @param {string} type - 文件类型,区分micloud_file_create或其它
   * @returns {Promise}
   * 成功时：返回文件信息
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  readFileInfo(fileName, type) {
     return Promise.resolve(null);
  }
}
const FileInstance = new IFile();
export default FileInstance;