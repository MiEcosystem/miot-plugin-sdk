import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { strings, Images } from "../../resources";
import NavigationBar from "../NavigationBar";
import { FontMiSansWLight } from "../../utils/fonts";
import ListItemWithSwitch from "../ListItem/ListItemWithSwitch";
import DarkMode from "miot/darkmode";
import Service from "miot/Service";
import Device from "miot/device/BasicDevice";
import { useState } from "react";
import native from "miot/native";
import { dynamicColor as Dynamic } from "miot/ui/Style/DynamicColor";
const { width: W, height: H } = Dimensions.get("screen");
const SetCloudStorage = async(did, value) => {
  try {
    const result = await Service.callSmartHomeAPI(
      "/camera_cloud/card_cloud_switch/set",
      {
        did: did,
        switchType: 1,
        switchValue: value
      }
    );
    native.MIOTHost.notifyCameraStorageChangeStateChanged({
      did,
      cameraStorageNoticeFlag: value
    });
    Service.smarthome.reportLog(Device.model, `GetCloudStorage ${ result }`);
    return true;
  } catch (error) {
    Service.smarthome.reportLog(
      Device.model,
      `GetCloudStorage ${ error.message }`
    );
    return false;
  }
};
const CloudStorage = (props) => {
  const { navigation } = props;
  const [value, ChangeValue] = useState(navigation.state.params.value);
  const onValueChange = async(value) => {
    const result = await SetCloudStorage(Device.deviceID, value);
    result && ChangeValue(value);
  };
  return (
    <View style={styles.container}>
      <NavigationBar
        containerStyle={{ minHeight: 56 }}
        left={[
          { key: NavigationBar.ICON.BACK, onPress: () => navigation.goBack() }
        ]}
      />
      <View style={styles.title}>
        <Text style={styles.text}>{strings.cloudStorage}</Text>
      </View>
      <View style={styles.image}>
        <Image
          resizeMode="contain"
          style={{
            width: W - 26 * 2,
            height: (190 / 340) * (W - 26 * 2),
            resizeMode: "contain"
          }}
          source={Images.common[DarkMode.getColorScheme()].cloudstorage}
        />
      </View>
      <ListItemWithSwitch
        showSeparator={false}
        onValueChange={onValueChange}
        value={value}
        containerStyle={{ minHeight: 60, height: undefined }}
        titleNumberOfLines={3}
        title={strings.cloudStorageVip}
        switchStyle={{ width: 52, height: 28 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Dynamic("#fff", "#000")
  },
  title: {
    minHeight: 58,
    paddingHorizontal: 26,
    paddingTop: 4,
    marginBottom: 12,
    paddingBottom: 12
  },
  text: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: FontMiSansWLight
  },
  image: {
    paddingHorizontal: 26,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 12,
    minHeight: 190
  }
});
CloudStorage.navigationOptions = () => ({ header: null });
export default CloudStorage;