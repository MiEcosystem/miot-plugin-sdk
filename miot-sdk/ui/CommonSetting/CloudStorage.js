import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { strings, Images } from "../../resources";
import NavigationBar from "../NavigationBar";
import { FontMiSansWLight } from "../../utils/fonts";
import ListItemWithSwitch from "../ListItem/ListItemWithSwitch";
import { Device, Service } from "miot";
import { useState } from "react";
import native from "miot/native";
const SetCloudStorage = async (did, value) => {
  try {
    const result = await Service.callSmartHomeAPI(
      "/camera_cloud/card_cloud_switch/set",
      {
        did: did,
        switchType: 1,
        switchValue: value,
      }
    );
    native.MIOTHost.notifyCameraStorageChangeStateChanged({
      did,
      cameraStorageNoticeFlag: value,
    });
    Service.smarthome.reportLog(Device.model, `GetCloudStorage ${result}`);
    return true;
  } catch (error) {
    Service.smarthome.reportLog(
      Device.model,
      `GetCloudStorage ${error.message}`
    );
    return false;
  }
};
const CloudStorage = (props) => {
  const { navigation } = props;
  const [value, ChangeValue] = useState(navigation.state.params.value);
  const onValueChange = async (value) => {
    const result = await SetCloudStorage(Device.deviceID, value);
    result && ChangeValue(value);
  };
  return (
    <View style={styles.container}>
      <NavigationBar
        containerStyle={{ minHeight: 58 }}
        left={[
          { key: NavigationBar.ICON.BACK, onPress: () => navigation.goBack() },
        ]}
      />
      <View style={styles.title}>
        <Text style={styles.text}>{strings.cloudStorage}</Text>
      </View>
      <View style={styles.image}>
        <Image
          style={{ maxHeight: 190, resizeMode: "contain" }}
          source={Images.common.cloudstorage}
        />
        <ListItemWithSwitch
          showSeparator={false}
          onValueChange={onValueChange}
          value={value}
          title={strings.cloudStorageVip}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    height: 58,
    paddingHorizontal: 28,
    paddingTop: 4,
    marginBottom: 26,
  },
  text: {
    fontSize: 32,
    lineHeight: 44,
    fontFamily: FontMiSansWLight,
  },
  image: {
    paddingHorizontal: 26,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 190,
    marginBottom: 12,
  },
});
CloudStorage.navigationOptions = () => ({ header: null });
export default CloudStorage;