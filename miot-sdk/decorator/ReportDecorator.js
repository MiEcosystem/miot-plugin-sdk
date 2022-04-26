/**
 * @param {*} target 
 * @param {*} property 
 * @param {*} descriptor 
 */
export const report = function(target, property, descriptor) {
};
/**
 * 次数统计
 * @params {string} 被统计的字段
 */
export const referenceReport = function(moduleName, methodName = 'constructor') {
};
/**
 * 业务成功率上报，业务方法自定义实现 customReportResult 返回上报信息, 否则按默认方式上报
 * @param {*} target 
 * @param {*} property 
 * @param {*} descriptor 
 * @returns descriptor
 */
/**
 * customReportResult 自定义处理 res 返回上报信息, 参数如下
 * @param {*} methodName 
 * @param {*} args 原始请求参数
 * @param {*} res  原始返回值
 * @returns null 或者 [{code:xxx, message:xxx}]
 */
export const resultReport = function(target, property, descriptor) {
};