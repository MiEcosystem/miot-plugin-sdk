/**
 * @export
 * @module miot/host/file
 * @description 本地文件访问及处理服务
 *
 */
import native from "../native";

export default {

    /**
     * 读取文件列表
     * @mark andr done
     */
    readFileList() {
        return new Promise((resolve, reject) => {
            native.MIOTFile.readFileList((isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(false, result);
                }
            })
        });
    },

    /**
     * 读本地文件
     * @param {string} fileName - 文件名
     * @param {object} [opt={}] - 其他设置项
     * @mark andr done
     */
    readFile(fileName, opt = {}) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.readFile(fileName, (isSuccess, utf8Content) => {
                if (isSuccess) {
                    resolve(utf8Content);
                } else {
                    reject(false);
                }
            });
        });
    },

    /**
     * 读文件，转换为 Base64 编码
     * @param {string} fileName - 文件名
     * @param {object} [opt={}] - 其他设置项
     * @mark andr done
     */
    readFileToBase64(fileName, opt = {}) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.readFileToBase64(fileName, (isSuccess, base64Content) => {
                if (isSuccess) {
                    resolve(base64Content);
                } else {
                    reject(false);
                }
            });
        });
    },

    /**
     * 写文件
     * @param {string} fileName - 文件名
     * @param {string} utf8Content - 文件内容字符串
     * @param {object} [opt={}] - 其他设置项
     * @mark andr done
     */
    writeFile(fileName, utf8Content, opt = {}) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.writeFile(fileName, utf8Content, (isSuccess) => {
                if (isSuccess) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    },

    /**
     * 写文件，输入为 Base64 编码字符串
     * @param {string} fileName - 文件名
     * @param {string} base64Content - base64编码后的文件内容字符串
     * @param {object} [opt={}] - 其他设置项
     * @mark andr done
     */
    writeFileThroughBase64(fileName, base64Content, opt = {}) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.writeFileThroughBase64(fileName, base64Content, (isSuccess) => {
                if (isSuccess) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    },

    /**
     * 向已存在的文件追加内容
     * @param {string} fileName - 文件名
     * @param {string} utf8Content - 文件内容字符串
     * @param {object} [opt={}] - 其他设置项
     * @mark andr done
     */
    appendFile(fileName, utf8Content, opt = {}) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.appendFile(fileName, utf8Content, (isSuccess) => {
                if (isSuccess) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    },

    /**
     * 向已存在的文件追加内容，输入为base64编码字符串
     * @param {string} fileName - 文件名
     * @param {string} base64Content - base64编码后的文件内容字符串
     * @param {object} [opt={}] - 其他设置项
     * @mark andr done
     */
    appendFileThroughBase64(fileName, base64Content, opt = {}) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.appendFileThroughBase64(fileName, base64Content, (isSuccess) => {
                if (isSuccess) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    },

    /**
     * 删除文件
     * @param {string} fileName - 文件名
     * @param {object} [opt={}] - 其他设置项
     * @mark andr done
     */
    deleteFile(fileName, opt = {}) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.deleteFile(fileName, (isSuccess) => {
                if (isSuccess) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    },

    /**
     * @ typedef Params - 参数字典
     * @ property {string} uploadUrl
     * @ property {'POST' | 'PUT'} method
     * @ property {{'Accept': 'application/json'}} headers
     * @ property {{}} fields
     * @ property {[{fileName: 'xxx'}]} files
     */

    /**
     * 上传文件
     * @param {Params} params - 参数字典
     * @mark andr done
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
        return new Promise((resolve, reject) => {
            native.MIOTFile.uploadFile(params, (isSuccess, response) => {
                if (isSuccess) {
                    resolve(response);
                } else {
                    reject(response);
                }
            });
        });
    },

    /**
     * 上传文件到小米云FDS
     * @mark andr 咱不提供 因为实现方式和 uploadFile 无差别
     * @param {Params} params - 参数字典
     */
    uploadFileToFDS(params) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.uploadFileToFDS(params, (isSuccess, response) => {
                if (isSuccess) {
                    resolve(response);
                } else {
                    reject(response);
                }
            });
        });
    },

    /**
     * 下载文件到插件存储空间
     * @mark andr done
     * @param {string} url - 文件地址
     * @param {string} fileName - 存储到本地的文件名
     */
    downloadFile(url, fileName) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.downloadFile(url, fileName, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
    },

    /**
     * 获取 base64 编码的数据长度
     * @param {string} base64Data - base64 编码的字符串
     * @mark andr done
     */
    dataLengthOfBase64Data(base64Data) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.dataLengthOfBase64Data(base64Data, (length) => {
                resolve(length);
            });
        });
    },

    /**
     * 获取一个data的子data（base64编码）
     * @param {string} base64Data - base64 编码的数据
     * @param {number} loc - 起始位置
     * @param {number} len - 长度
     * @mark andr done
     */
    subBase64DataOfBase64Data(base64Data, loc, len) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.subBase64DataOfBase64Data(base64Data, loc, len, (isSuccess, subData) => {
                if (isSuccess) {
                    resolve(subData);
                } else {
                    reject(false);
                }
            });
        });
    },

    /**
     * 解压缩一个zip文件，解压缩后的文件会直接存储在插件存储空间的根目录下
     * @param {string} fileName - 文件名（插件存储空间内的文件）
     * @mark andr done
     */
    unzipFile(fileName) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.unzipFile(fileName, (isSuccess) => {
                isSuccess && resolve(true);
                !isSuccess && reject(false);
            });
        });
    },

    /**
     * 解压缩一个gz文件, 并以base64编码的形式直接返回给插件, 不做本地存储
     * @param {string} fileName - 文件名（插件存储空间内的文件）
     * @mark andr done
     */
    ungzFile(fileName) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.ungzFile(fileName, (isSuccess, base64Data) => {
                if (isSuccess) {
                    resolve(base64Data);
                } else {
                    reject(false);
                }
            });
        });
    },

    /**
     * 屏幕全屏截图
     * @param {string} imageName - 图片名称，png
     * 截图成功回调函数返回存储图片的绝对路径，加载图片时直接使用即可
     * @mark andr done
     * @example
     * <Image source={{uri:imagePath, scale:PixelRatio.get()}} />
     */
    screenShot(imageName) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.screenShot(imageName, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
    },

    /**
     * 自定义范围的屏幕截图
     * @param {string} imageName - 图片名称，png
     * @param {{l:number, t:number, w:number, h:number}} rect - 截屏范围
     * @mark andr done
     */
    screenShotInRect(imageName, rect) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.screenShotInRect(imageName, rect, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
    },

    /**
     * 长截屏，用来截scrollView，会把超出屏幕的部分也截到
     * @param {number} viewRef - scrollView的引用
     * @param {string} imageName - 图片名称，png
     * @mark andr done
     * @example
     *  var findNodeHandle = require('findNodeHandle');
     *  var myScrollView = findNodeHandle(this.refs.myScrollView);
     *  MHPluginFS.screenShotInRect(myScrollView, 'test2.png', (isSuccess, response) => {
     *      if (isSuccess) {
     *          console.log(response);
     *      }
     *  });
     */
    longScreenShot(viewRef, imageName) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.longScreenShot(viewRef, imageName, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
    },

    /**
     * 高德地图截屏
     * @param {number} viewRef - MAMapView(MHMapView的父类)的引用
     * @param {string} imageName - 图片名称，自动添加后缀png
     * @mark andr done
     * @example
     *   var findNodeHandle = require('findNodeHandle');
     *   var myMapViewRef = findNodeHandle(this.refs.myMapView);
     *   MHPluginFS.amapScreenShot(myMapViewRef, 'mapToShare.png', (isSuccess, imagePath) => {
     *       if (isSuccess) {
     *           console.log(imagePath);
     *       }
     *   });
     */
    amapScreenShot(viewRef, imageName) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.amapScreenShot(viewRef, imageName, (isSuccess, imagePath) => {
                if (isSuccess) {
                    resolve(imagePath);
                } else {
                    reject(false);
                }
            });
        });
    },

    /**
     * 获取图片指定点的色值, 传空数组将返回所有点的色值
     * @param {string} imagePath - 图片文件路径
     * @param {Array<{x:number,y:number}>} points - 位置数组
     * @mark andr done
     */
    getRGBAValueFromImageAtPath(imagePath, points) {
        return new Promise((resolve, reject) => {
            native.MIOTFile.getRGBAValueFromImageAtPath(imagePath, points, (isSuccess, colorValues) => {
                if (isSuccess) {
                    resolve(colorValues);
                } else {
                    reject(false);
                }
            });
        });
    }

};
