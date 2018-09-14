/**
 * @export
 * @module miot/host/crypto
 * @description 加密相关的
 */
export default {
    /**
     * @param {string} content
     * @returns {Promise<string>}
     */
    encodeMD5(content){
       return Promise.resolve('');
    },
    /** 
     * @param {string} content
     * @returns {Promise<string>}
     */
    encodeBase64(content){
         return Promise.resolve('');
    },
    /**
     * @param {string} content
     * @returns {Promise<string>}
     */
    decodeBase64(content){
       return Promise.resolve('');
    },
    /**
     * @param {string} content
     * @returns {Promise<string>}
     */
    encodeSHA1(content){
       return Promise.resolve('');
    },
    /**
     *
     * @param {*} content
     */
    encodeSHA2(content){
       return Promise.resolve('');
    },
};