import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import { dynamicColor } from "../../../Style";
import AutoDeviceInfoButton from './AutoDeviceInfoButton';
/**
 * 添加设备按钮组件
 * 用于普通设备模式下展示"添加设备"入口
 */
const AddDeviceButton = ({ onPress, style }) => {
  return (
    // <AutoDeviceInfoButton
    //   style={{ marginTop: 12 }}
    //   title={"添加设备"}
    //   icon={require('miot/resources/images/add-bt.png')}
    //   onPress={()=>{onPress && onPress();}}
    // />
    <TouchableHighlight
      style={{ width: '100%' }}
      underlayColor="transparent"
      onPress={() => {
        onPress && onPress();
      }}>
      <View style={[Styles.container, style]}>
        <Image source={require('miot/resources/images/add-bt.png')} style={Styles.iconStyle}/>
        <View style={Styles.titleContainer}>
          <Text style={Styles.titleStyle} numberOfLines={3}>{"添加设备"}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
const Styles = {
  container: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: dynamicColor('rgba(0, 0, 0, .04)', 'rgba(255, 255, 255, 0.14)'),
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 7,
    alignItems: "center",
    marginTop: 12,
    height: 64
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: dynamicColor('rgba(50, 186, 192, 0.15)', 'rgba(37, 169, 175, 0.25)'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconPlus: {
    fontSize: 24,
    color: dynamicColor('#32BAC0', '#25A9AF'),
    fontWeight: '500'
  },
  titleStyle: {
    fontSize: 15,
    color: dynamicColor('#00B884', '#00BA7CFF'),
    fontWeight: "700",
    paddingHorizontal: 4
  },
  iconStyle: {
    width: 30,
    height: 30
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 14,
    color: dynamicColor('#00B884', '#00BA7CFF'),
    flexDirection: "row",
    
    alignItems: "center"
  }
};
export default AddDeviceButton;