import native from './native';
/**
 * 账户
 * uid: 用户 uid
 * name: 姓名
 * age: 年龄
 * gender: 性别 male/female
 * icon: 用户头像
*/
export default class Account {
  constructor() {
    this.uid = "";
    this.name = "";
    this.age = "";
    this.gender = "";
    this.icon = "";
  }
  /**
   * 获取账户信息
   * 调用示例：
   * Account.getAccount()
      .then((account) => {
        this.setState({ currentAccount: account });
      })
      .catch((error) => {
        console.log("error", error);
      });
   *
  */
  static getAccount() {
    return new Promise((resolve, reject) => {
      native.Account.getAccountInfo((isOk, response) => {
        if (isOk && response) {
          let account = new Account();
          let { uid, name, age, gender, icon } = response;
          account.uid = uid;
          account.name = name;
          account.age = age;
          account.gender = gender;
          account.icon = icon;
          resolve(account);
        } else {
          reject(response);
        }
      });
    });
  }
  static setUserInfoFromPlugin(userInfo) {
    native.Account.setUserInfoFromPlugin(userInfo);
  }
  static setUserInfoAndCallBackFromPlugin(userInfo) {
    return new Promise((resolve, reject) => {
      native.Account.setUserInfoAndCallBackFromPlugin(userInfo, (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
}