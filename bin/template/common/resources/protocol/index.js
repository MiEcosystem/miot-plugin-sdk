import { Resources, Service } from "miot";

/**
 * 隐私协议相关能力的实现， 插件开发可以根据自己所需，判断插件需要支持哪些国家的隐私协议在switch...case中做对应的增/删
 * 隐私协议弹窗实现有两种方案；
 * 方案1：开发者平台上进行配置隐私协议, 目前仅支持国内，开发者无需实现如下复杂代码，进入插件无需插件开发自己检查是否需要弹隐私协议弹窗，框架层会自动检测并弹窗;
 * 方案2：隐私协议文件跟随插件代码本地配置, 如下代码为具体实现, 在 main/index.js 中做是否需要弹出隐私协议弹窗的检测
 */
export default {

  /**
   *
   * @param countryCode
   * @param language
   * @returns {{privacyURL: null, agreementURL: null}}
   */
  getProtocolWithParams(countryCode, language) {

    if (!countryCode) {
      countryCode = 'GB';
    }
    if (!language) {
      language = 'en';
    }

    // countryCode 大写， language小写
    countryCode = countryCode.toUpperCase();
    language = language.toLowerCase();

    /**
     * result 中 可以有哪些数据可以参考 Host.ui.previewLegalInformationAuthorization 的 option参数
     */
    let result = {
      privacyURL: null,
      agreementURL: null,
      hideAgreement: false,
      hideUserExperiencePlan: true // 是否需要隐藏用户体验计划
    };

    switch (countryCode) {
      case 'CN': // 中国
      {
        // 英语，显示通用版英文隐私, 非英语，中文
        if (language === 'en') {
          // 统一用英语的
          result.privacyURL = require('./en_privacy_policy.html');
          result.agreementURL = require('./en_user_agreement.html');
        } else {
          result.privacyURL = require('./zh_privacy_policy.html');
          result.agreementURL = require('./zh_user_agreement.html');
        }
        break;
      }
      case 'ES': // 西班牙
      {
        // 英语，显示GDPR版英文隐私   非英语，显示西班牙语的隐私
        if (language === 'en') {
          // 统一用英语的
        } else {
        }
        break;
      }
      case 'PT': // 葡萄牙
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示葡萄牙语的隐私
        break;
      }
      case 'NL': // 荷兰
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示荷兰语的隐私
        break;
      }
      case 'FR': // 法国
      case 'NG': // 尼日利亚
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示法语的隐私
        break;
      }
      case 'IT': // 意大利
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示意大利语的隐私
        break;
      }
      case 'CH': // 瑞士
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示法语德语意大利语的隐私
        break;
      }
      case 'NO': // 挪威
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示挪威语的隐私
        break;
      }
      case 'DK': // 丹麦
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示丹麦语的隐私
        break;
      }
      case 'SE': // 瑞典
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示瑞典语的隐私
        break;
      }
      case 'FI': // 芬兰
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示芬兰语的隐私
        break;
      }
      case 'PL': // 波兰
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示波兰语的隐私
        break;
      }
      case 'DE': // 德国
      case 'AT': // 奥地利
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示德国语的隐私
        break;
      }
      case 'IE': // 爱尔兰
      case 'GB': // 英国
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示GDPR版英文隐私,
        break;
      }
      case 'UA': // 乌克兰
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示乌克兰语的隐私,
        break;
      }
      case 'BE': // 比利时
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示荷兰语法语德语的隐私
        break;
      }
      case 'HR': // 克罗地亚
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示克罗地亚语的隐私,
        if (language === 'en') {
          // 统一用英语的
        } else {
        }
        break;
      }
      case 'CZ': // 捷克
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示捷克语的隐私,
        if (language === 'en') {
          // 统一用英语的
        } else {
        }
        break;
      }
      case 'GR': // 希腊
      case 'CY': // 塞浦路斯
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示希腊语的隐私,
        break;
      }
      case 'BG': // 保加利亚
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示保加利亚语的隐私,
        break;
      }
      case 'LU': // 卢森堡
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示法语德语的隐私
        break;
      }
      case 'HU': // 匈牙利
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示匈牙利语的隐私,
        break;
      }
      case 'LT': // 立陶宛
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示立陶宛语的隐私
        break;
      }
      case 'RU': // 俄罗斯
      {
        // 英语，显示GDPR版英文隐私, 非英语，显示俄罗斯语的隐私
        break;
      }
      case 'BY': // 白俄罗斯
      {
        // 英语，显示通用版英文隐私, 非英语，显示白俄罗斯语的隐私
        break;
      }
      case 'JP': // 日本
      {
        // 英语，显示通用版英文隐私, 非英语，显示日本语的隐私
        break;
      }
      case 'KR': // 韩国
      {
        // 英语，显示韩国版英文隐私, 非英语，显示韩语的隐私
        break;

      }
      case 'ID': // 印尼
      {
        // 英语，显示通用版英文隐私, 非英语，显示印尼语的隐私
        break;
      }
      case 'MY': // 马来西亚
      {
        // 英语，显示通用版英文隐私, 非英语，显示马来西亚语的隐私
        break;

      }
      case 'SG': // 新加坡
      {
        // 英语，显示通用版英文隐私, 非英语，显示通用版英文隐私
        break;
      }
      case 'TH': // 泰国
      {
        // 英语，显示通用版英文隐私, 非英语，显示泰语隐私
        break;
      }
      case 'VN': // 越南
      {
        // 英语，显示通用版英文隐私, 非英语，显示越南语隐私
        break;
      }
      case 'MM': // 缅甸
      {
        // 英语，显示通用版英文隐私, 非英语，显示缅甸语隐私
        break;
      }
      case 'PK': // 巴基斯坦
      case 'PH': // 菲律宾
      case 'AU': // 澳大利亚
      case 'NZ': // 新西兰
      case 'KE': // 肯尼亚
      {
        // 英语，显示通用版英文隐私, 非英语，显示通用版英文隐私
        break;
      }
      case 'CL': // 智利
      case 'PE': // 秘鲁
      case 'MX': // 墨西哥
      case 'CO': // 哥伦比亚
      {
        // 英语，显示通用版英文隐私, 非英语，显示通用版拉丁西班牙语的隐私
        break;
      }
      case 'BR': // 巴西
      {
        // 英语，显示通用版英文隐私, 非英语，显示巴西葡萄牙语的隐私
        break;
      }
      case 'EG': // 埃及
      case 'MA': // 摩洛哥
      case 'AE': // 阿联酋-迪拜
      case 'SA': // 沙特
      case 'QA': // 卡塔尔
      case 'OM': // 阿曼
      case 'IQ': // 伊拉克
      {
        // 英语，显示通用版英文隐私, 非英语，显示阿拉伯语的隐私
        break;
      }
      case 'IL': // 以色列
      {
        // 英语，显示通用版英文隐私, 非英语，显示希伯来语阿拉伯语的隐私
        break;
      }
      case 'TR': // 土耳其
      {
        // 英语，显示通用版英文隐私, 非英语，显示土耳其语的隐私
        break;
      }
      case 'TW': // 台湾
      {
        // 英语，显示通用版英文隐私, 非英语，台湾繁体的隐私
        break;
      }
      case 'US': // 美国
      {
        // 英语
        break;
      }
      case 'RO': // 罗马尼亚
      {
        // 英语  显示GDPR版英文隐私， 非英语，显示罗马尼亚语的隐私
        break;
      }
      case 'SK': // 斯洛伐克
      {
        // 英语 显示GDPR版英文隐私， 非英语，显示斯洛伐克语的隐私
        break;
      }
      case 'SI': // 斯洛文尼亚
      {
        // 英语 显示GDPR版英文隐私， 非英语，显示斯洛文尼亚语的隐私
        break;
      }
      case 'EE': // 爱沙尼亚
      {
        // 英语，显示GDPR版英文隐私   非英语，显示爱沙尼亚语的隐私
        break;
      }
      case 'LV': // 拉脱维亚
      {
        // 英语，显示GDPR版英文隐私   非英语，显示拉脱维亚语的隐私
        break;
      }
      default :
      {
        result.privacyURL = require('./en_privacy_policy.html');
        result.agreementURL = require('./en_user_agreement.html');
      }
    }
    return result;
  },

  /**
   *  返回打开隐私弹出或隐私界面需要的数据
   * @returns {Promise<R>}
   */
  getProtocol() {

    return new Promise((resolve, reject) => {
      Service.getServerName().then((country) => {
        let language = Resources.getLanguage();
        let { countryCode } = country;
        let protocol = this.getProtocolWithParams(countryCode, language);

        resolve(protocol);
      }).catch((error) => {
        reject(error);
      });
    });
  }
};





