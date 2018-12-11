/**
 * @export
 * @module miot/host/file
 * @description 本地文件访问及处理服务
 *
 */
export default {
    /**
     * 读取文件列表
     * @returns {Promise}
     *
     */
    readFileList() {
         return Promise.resolve([]);
    },
    /**
     * 判断文件是否存在,then(res=>{res==true 存在，res==false不存在}).catch(err=>consloe.log(err))
     * @param {string} fileName
     * @callback {boolean/string} json 文件是否存在的结果或者报错信息
     */
    isFileExists(fileName) {
         return Promise.resolve(false)
    },
    /**
     * 读本地文件
     * @param {string} fileName - 文件名
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
     */
    readFile(fileName, opt = {}) {
         return Promise.resolve(null);
    },
    /**
     * 读本地文件
     * @param {string} fileName - 文件名
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
     */
    readFileToHexString(fileName, opt = {}) {
         return Promise.resolve(null);
    },
    /**
     * 读文件，并转换为 Base64 编码
     * @param {string} fileName - 文件名
     * @param {object} [opt={}] - 其他设置项
     * @returns {Promise}
     */
    readFileToBase64(fileName, opt = {}) {
         return Promise.resolve(null);
    },
    /**
     * 写文件
     * @param {string} fileName - 文件名
     * @param {string} utf8Content - 文件内容字符串
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
     */
    writeFile(fileName, utf8Content, opt = {}) {
         return Promise.resolve(null);
    },
    /**
     * 写文件，输入为 Base64 编码字符串
     * @param {string} fileName - 文件名
     * @param {string} base64Content - base64编码后的文件内容字符串
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
     */
    writeFileThroughBase64(fileName, base64Content, opt = {}) {
         return Promise.resolve(null);
    },
    /**
     * 向已存在的文件追加内容
     * @param {string} fileName - 文件名
     * @param {string} utf8Content - 文件内容字符串
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
     */
    appendFile(fileName, utf8Content, opt = {}) {
         return Promise.resolve(null);
    },
    /**
     * 向已存在的文件追加内容，输入为base64编码字符串
     * @param {string} fileName - 文件名
     * @param {string} base64Content - base64编码后的文件内容字符串
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
     *
     */
    appendFileThroughBase64(fileName, base64Content, opt = {}) {
         return Promise.resolve(null);
    },
    /**
     * 删除文件
     * @param {string} fileName - 文件名
     * @param {json} [opt={}] - 其他设置项
     * @returns {Promise}
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
     *   let params = {
     *       uploadUrl: 'http://127.0.0.1:3000',
     *       method: 'POST', // default 'POST',support 'POST' and 'PUT'
     *       headers: {
     *           'Accept': 'application/json',
     *       },
     *       fields: {
     *           'hello': 'world',
     *       },
     *       files: [
     *           {
     *               fileName: 'fileName.png', // 只能上传插件sandbox里的文件
     *           },
     *       ]
     *   };
     */
    uploadFile(params) {
         return Promise.resolve(null);
    },
    /**
     * 上传文件到小米云FDS
     * @param {UploadParams} params - 参数字典
     * @returns {Promise}
     */
    uploadFileToFDS(params) {
         return Promise.resolve(null);
    },
    /**
     * 下载文件到插件存储空间
     * @param {string} url - 文件地址
     * @param {string} fileName - 存储到本地的文件名
     * @returns {Promise}
     */
    downloadFile(url, fileName) {
         return Promise.resolve(null);
    },
    /**
     * 获取 base64 编码的数据长度
     * @param {string} base64Data - base64 编码的字符串
     * @returns {Promise}
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
     * @returns {Promise}
     */
    unzipFile(fileName) {
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
     *   const findNodeHandle = require('findNodeHandle');
     *   const myMapViewRef = findNodeHandle(this.refs.myMapView);
     *   const imageName = 'mapToShare.png';
     *   let imageToShow = null;
     *   Host.file.amapScreenShot(myMapViewRef, imageName).then(() => {
     *      imageToShow = <Image source={{local:imageName}}>
     *        console.log("ok");
     *   });
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