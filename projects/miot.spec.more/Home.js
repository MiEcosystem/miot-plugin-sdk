/**
 * 本demo仅用于标准插件的更多功能的简单示例
 * 更加复杂的功能实现可以参考com.xiaomi.demo
 */
import {
  Package, Host, DeviceEvent
} from "miot";
import { CardButton, ContainerWithGap } from "miot/ui";
import React from 'react';
import {
  View, Text
} from 'react-native';
import { adjustSize } from 'miot/utils/sizes';
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
import DynamicColor, { dynamicColor } from 'miot/ui/Style/DynamicColor';
import { FontDefault, FontKmedium, FontPrimary, FontSecondary } from 'miot/utils/fonts';
import NavigationBar from "miot/ui/NavigationBar";

const DefaultHeight = 240;
const DefaultPaddingHeight = 60;
const CardIcon = require('./Resources/Images/card_icon.png');
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.props.navigation.setParams({
      title: '更多功能插件示例',
      backgroundColor: dynamicColor('#f7f7f7', '#000'),
      left: [{
        key: NavigationBar.ICON.BACK,
        onPress: () => Package.exit(),
        accessibilityLabel: "返回",
        accessibilityHint: "返回上一页"
      }]
    });
  }


  componentDidMount() {
    console.log("Home  componentDidMount...");
    this._deviceOnlineListener = DeviceEvent.deviceStatusChanged.addListener((device, newstatus) => {
      console.log(device.isOnline);
      alert(`设备状态改变:${ JSON.stringify(newstatus) }`);
    });

  }

  componentWillUnmount() {
    this._deviceOnlineListener && this._deviceOnlineListener.remove();
  }


  render() {
    return (
      <View style={Styles.container}>
        <ContainerWithGap outerGap={adjustSize(36)} gap={adjustSize(36)} >
          <CardButton
            icon={CardIcon}
            themeColor={dynamicColor('#2874FE', '#125DE5')}
            containerStyle={Styles.cardContainer}
            iconContainerStyle={Styles.iconContainer}
            iconStyle={Styles.icon}
            onSwitch={() => {

            }}
            title={'睡眠开关'}
            onPress={() => {

            }}
          >
          </CardButton>
          <CardButton
            icon={CardIcon}
            themeColor={dynamicColor('#2874FE', '#125DE5')}
            rightArrow={true}
            containerStyle={Styles.cardContainer}
            iconContainerStyle={Styles.iconContainer}
            iconStyle={Styles.icon}
            title={'新手引导'}
            onPress={() => {
              // 打开一个web页面
              Host.ui.openWebPage("https://home.mi.com/views/article.html?articleId=684095286000000001");
            }}
          >
          </CardButton>
          <CardButton
            icon={CardIcon}
            themeColor={dynamicColor('#A7E8EB', '#005E62')}
            rightArrow={true}
            containerStyle={Styles.cardContainer}
            iconContainerStyle={Styles.iconContainer}
            iconStyle={Styles.icon}
            title={'主标题'}
            subtitle={'萌萌的副标题呀'}
            onPress={() => {
              // 打开一个web页面
              Host.ui.openWebPage("https://home.mi.com/views/article.html?articleId=684095286000000001");
            }}
          >
          </CardButton>
        </ContainerWithGap>

        <View style={Styles.entryInfo}>
          <Text>pageName: Package.entrance { JSON.stringify(Package.entrance || '') }</Text>
          <Text>pageParams: Package.entryInfo.pageParams { JSON.stringify(Package.entryInfo?.pageParams || '') }</Text>
          <Text>typeof pageParams: { typeof Package.entryInfo?.pageParams }</Text>
        </View>
      </View>
    );
  }
}

const Styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicColor('#f7f7f7', '#000')
  },
  cardContainer: {
    height: adjustSize(DefaultHeight),
    borderRadius: adjustSize(33),
    paddingHorizontal: adjustSize(DefaultPaddingHeight),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: new DynamicColor('#fff', '#1A1A1A')
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  iconContainer: {
    marginRight: adjustSize(39),
    width: adjustSize(120),
    height: adjustSize(120),
    borderRadius: adjustSize(60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: adjustSize(72),
    height: adjustSize(72),
    resizeMode: 'cover'
  },
  iconText: {
    fontFamily: FontKmedium,
    fontSize: 20,
    color: new DynamicColor('#fff', '#fff')
  },
  titleContainer: {
    flex: 1
  },
  title: {
    ...FontPrimary,
    fontSize: 15,
    color: new DynamicColor('#000000', '#E5E5E5')
  },
  subtitle: {
    ...FontSecondary,
    fontSize: 12,
    lineHeight: 14,
    color: new DynamicColor('rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0.6)'),
    marginTop: adjustSize(12)
  },
  switchContainer: {
    marginLeft: adjustSize(30),
    flexDirection: 'row',
    alignItems: 'center'
  },
  separator: {
    width: 1,
    height: adjustSize(78),
    marginRight: adjustSize(48),
    backgroundColor: new DynamicColor('rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0.15)')
  },
  rightText: {
    fontFamily: FontDefault,
    fontSize: 12,
    color: new DynamicColor('rgba(0, 0, 0, 0.4)', 'rgba(255, 255, 255, 0.4)'),
    marginLeft: adjustSize(30)
  },
  redDot: {
    height: 5,
    width: 5,
    borderRadius: 2.5,
    marginLeft: adjustSize(42),
    backgroundColor: new DynamicColor('#F43F31', '#D92719'),
    alignItems: 'center'
  },
  rightArrow: {
    width: adjustSize(72),
    height: adjustSize(72)
  },
  entryInfo: {
    marginHorizontal: adjustSize(72),
    marginTop: adjustSize(72)
  }
});
