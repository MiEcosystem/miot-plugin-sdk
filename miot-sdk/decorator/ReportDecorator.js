//@native begin
import native from '../native';
//@native end
/**
 * SDK-10035
 * @param {*} target 
 * @param {*} property 
 * @param {*} descriptor 
 */
//@native begin
export const report = function(target,property,descriptor){
    const originalMethod = descriptor.value;
    descriptor.value =function(...args){
        const startTime = Date.now();
        const ret = originalMethod.apply(this,args);
        let cost = 0;
        let moduleName = 'default';
        if(this && this.constructor){
            moduleName = this.constructor.name;
        }
        _log("miot-sdk-report,descriptor:name:",moduleName,"property:",property);
        if( _isPromiseLike(ret) ){
            _log("miot-sdk-report: promise")
            return new Promise((resolve,reject) => {
                ret.then( res =>{
                    cost = Date.now() - startTime;
                    _doReport(moduleName,property,true,cost);
                    resolve(res);
                }).catch(err =>{
                    cost = Date.now() - startTime;
                    _doReport(moduleName,property,false,cost);
                    reject(err)
                });
            });
        }else{
            _log("miot-sdk-report: non-promise")
            cost = Date.now() - startTime;
            _doReport(moduleName,property,true,cost);
            return ret;
        }
    }
    return descriptor;
}
//@native end
//@native begin
function _isPromiseLike(obj){
    return obj && (typeof obj === 'object' || typeof obj ==='function')
            && typeof obj.then === 'function';
}
//@native end
//@native begin
function _doReport(moduleName,methodName,success,cost){
    const reportInfo={
        module:moduleName,
        method:methodName,
        success:success,
        cost:cost,
    }
    console.log("miot-sdk-report: reportInfo:",JSON.stringify(reportInfo));
    native.MIOTPackage.apiReport(reportInfo);
}
//@native end
//@native start
function _log(...args){
    if(__DEV__){
        console.log(...args);
    }
}
//@native end