/**
 * 此文件中是针对华米公司提供的特有API
 */
import {NativeModules} from 'react-native'
const {HmPaceScalesModule} = NativeModules;
export default {
    /**
     *
     * @param weightKg 体重，单位kg
     * @param heightCm 身高，单位cm
     * @param sex 性别 女-0 男-1
     * @param age 年龄
     * @param impedance 当前测量电阻
     * @returns {Promise<any>}
     */
    computeBodyParam(weightKg, heightCm, sex, age, impedance){
         return Promise.resolve([]);
    }
}