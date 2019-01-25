/**
 * @export
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
 *     const myimg = <Image source={{local:myfile}} .../>
 *     ...
 * })
 * .catch(err=>{...})
 * 
 * ...
 * const myshotfile = "testshot.png"
 * Host.file.screenShot(myshotfile)
 * .then(res=>{
 *    const myshotpic = <Image source={{local:myshotfile}} .../>
 *    ...
 * });
 * ...
 */
export default {
    /**
     * 读取沙盒内文件列表
     * * @param {string} subFolder 读取沙盒文件夹下某子文件夹中文件内容，用于解压缩文件中带有文件夹，或者读取指定文件夹解压后的文件,标准path结构，不以'/'开头
     * @returns {Promise}
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.file.readFileList().then(res => {
     *  console.log('read fiel list:', res)
     * })
     * 
     * Host.file.readFileList('mysubfolder/aaa').then(res => {
     *  console.log('read fiel list:', res)
     * })
     */
    readFileList(subFolder = '') {
         return Promise.resolve([]);
    },
    /**
     * 判断文件是否存在
     * @param {string} fileName 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @returns {Promise<boolean>} 
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
         return Promise.resolve(false)
    },
    /**
     * 读本地文件
     * @param {string} fileName - 文件名,可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.filereadFile('name').then(content =>{
     *  console.log('file content:', content)
     * })
     */
    readFile(fileName, opt = {}) {
         return Promise.resolve(null);
    },
    /**
     * 读本地文件
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.filereadFileToHexString('name').then(content =>{
     *  console.log('file content:', content)
     * })
     */
    readFileToHexString(fileName, opt = {}) {
         return Promise.resolve(null);
    },
    /**
     * 读文件，并转换为 Base64 编码
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {object} [opt={}] - 其他设置项
     * @returns {Promise}
     */
    readFileToBase64(fileName, opt = {}) {
         return Promise.resolve(null);
    },
    /**
     * 写文件
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {string} utf8Content - 文件内容字符串
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
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
         return Promise.resolve(null);
    },
    /**
     * 写文件，输入为 Base64 编码字符串
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {string} base64Content - base64编码后的文件内容字符串
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.filewriteFileThroughBase64('name', 'base64').then(_ =>{
     *  //写入成功
     *  console.log('write success')
     * })
     * ...
     */
    writeFileThroughBase64(fileName, base64Content, opt = {}) {
         return Promise.resolve(null);
    },
    /**
     * 向已存在的文件追加内容
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {string} utf8Content - 文件内容字符串
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
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
         return Promise.resolve(null);
    },
    /**
     * 向已存在的文件追加内容，输入为base64编码字符串
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {string} base64Content - base64编码后的文件内容字符串
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
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
    appendFileThroughBase64(fileName, base64Content, opt = {}) {
         return Promise.resolve(null);
    },
    /**
     * 删除文件
     * @param {string} fileName - 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.filedeleteFile('name').then(_ =>{
     *  console.log('delete success')
     * })
     * ...
     */
    deleteFile(fileName, opt = {}) {
         return Promise.resolve(null);
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
         return Promise.resolve(null);
    },
    /**
     * 上传文件到小米云FDS
     * @param {UploadParams} params - 参数字典
     * @returns {Promise}
     * @example
     * same as Host.file.uploadFile
     */
    uploadFileToFDS(params) {
         return Promise.resolve(null);
    },
    /**
     * 下载文件到插件沙盒目录
     * @param {string} url - 文件地址
     * @param {string} fileName - 存储到本地的文件名
     * @returns {Promise}
     * @example
     * import {Host} from 'miot'
     * ...
     * Host.filedownloadFile('url', 'targetName').then(res =>{
     *  console.log('download success with res:', res)
     * }).catch(err => {
     *  console.log('download failed with err:', err)
     * })
     * ...
     */
    downloadFile(url, fileName) {
         return Promise.resolve(null);
    },
    /**
     * 获取 base64 编码的数据长度
     * @param {string} base64Data - base64 编码的字符串
     * @returns {Promise}
     * @example
     * import {Host} from 'miot'
     * ...
     * let len = await Host.file.dataLengthOfBase64Data('data')
     * //or
     * Host.file.dataLengthOfBase64Data('data').then(len => console.log('len:', len))
     * ...
     */
    dataLengthOfBase64Data(base64Data) {
         return Promise.resolve(null);
    },
    /**
     * 获取一个data的子data（base64编码）
     * @param {string} base64Data - base64 编码的数据
     * @param {number} loc - 起始位置
     * @param {number} len - 长度
     * @returns {Promise}
     */
    subBase64DataOfBase64Data(base64Data, loc, len) {
         return Promise.resolve(null);
    },
    /**
     * 解压缩一个zip文件，解压缩后的文件会直接存储在插件存储空间的根目录下
     * @param {string} fileName - 文件名（插件存储空间内的文件）
     * * @param {string} desitinationPath - 目标解压缩文件夹，默认解压到当前文件夹，如果指定名称，压缩包内容会解压到指定文件夹
     * @returns {Promise}
     */
    unzipFile(fileName, desitinationPath = '') {
         return Promise.resolve(null);
    },
    /**
     * 解压缩一个gz文件, 并以base64编码的形式直接返回给插件, 不做本地存储
     * @param {string} fileName - 文件名（插件存储空间内的文件）
     * @return {Promise}
     */
    ungzFile(fileName) {
         return Promise.resolve(null);
    },
    /**
     * 屏幕全屏截图
     * @param {string} imageName - 图片名称，png,
     * @return {Promise<string>} - 截图成功回调函数返回存储图片的绝对路径，加载图片时直接使用即可
     * @example
     * <Image source={{local:imageName, scale:PixelRatio.get()}} />
     *
     */
    screenShot(imageName) {
         return Promise.resolve("...");
    },
    /**
     * 自定义范围的屏幕截图
     * @param {string} imageName - 图片名称，png
     * @param {{l:int, t:int, w:int, h:int}} rect - 截屏范围
     * @return {Promise<string>} -  截图成功 返回图片地址
     *
     *
     */
    screenShotInRect(imageName, rect) {
         return Promise.resolve("...");
    },
    /**
     * 长截屏，用来截scrollView，会把超出屏幕的部分也截到
     * @param {number} viewRef - scrollView的引用
     * @param {string} imageName - 图片名称，png
     * @returns {Promise<string>}
     * @example
     *  var findNodeHandle = require('findNodeHandle');
     *  var myScrollView = findNodeHandle(this.refs.myScrollView);
     *  Host.file.longScreenShot(myScrollView, 'test2.png').then(imagePath=>{
     *      console.log(imagePath);
     *  });
     */
    longScreenShot(viewRef, imageName) {
         return Promise.resolve(null);
    },
    /**
     * 高德地图截屏
     * @param {number} viewRef - MAMapView(MHMapView的父类)的引用
     * @param {string} imageName - 图片名称，自动添加后缀png
     * @return {Promise}
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
         return Promise.resolve("...");
    },
    /**
     * 获取图片指定点的色值, 传空数组将返回所有点的色值
     * @param {string} imagePath - 图片文件路径
     * @param {Array<{x:int,y:int}>} points - 位置数组
     * @returns {Promise}
     */
    getRGBAValueFromImageAtPath(imagePath, points) {
         return Promise.resolve(null);
    }
};