/**
 * @export
 * @module miot/resources
 * @description 系统提供的静态资源, 包括图片, 文字, 基础 styleSheet css 等等
 *
 * import res from "miot/resources"
 *
 * res.logo
 * res.strings.mijia
 *
 */
export default {
    get logo(){
        return "";
    },
    get strings(){
         return {}
    }
}