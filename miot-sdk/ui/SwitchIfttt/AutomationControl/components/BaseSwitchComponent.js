import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, Image, TouchableHighlight, DeviceEventEmitter } from 'react-native';
import { Device } from 'miot';
import Service from 'miot/Service';
import { dynamicStyleSheet } from '../../../Style';
import DynamicColor, { dynamicColor } from '../../../Style/DynamicColor';
import { Fonts } from 'miot/ui/hyperOSUI';
import { strings as I18n, Images } from "../../../../resources";
import PropTypes from 'prop-types';
import Right from 'mhui-rn/dist/icons/Right';
import IconSelectDialog from './IconSelectDialog';
import useSwitchRoomInfo from '../../../../hooks/useSwitchRoomInfo';
import RenameDialog from './RenameDialog';
import RoomSelectDialog from './RoomSelectDialog';
import { reportAutoSwitchClick } from "../reportUtils";
import { SUB_REF } from '../utils/constants';
import { colorToken } from 'mhui-rn/dist/hyperOS';
const Styles = dynamicStyleSheet({
  baseSwitchStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 80,
    height: 80,
    marginBottom: 16,
    marginTop: 30,
  },
  baseSwitchInfo: {
    paddingHorizontal: 28,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseNormalButton: {
    marginTop: 10,
    marginBottom: 30,
    height: 36,
    maxWidth: 138,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: new DynamicColor('rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.12)'),
  },
});
/**
 * 基础开关信息组件
 * 显示设备图标、名称、房间信息和修改图标弹窗
 */
const BaseSwitchComponent = ({
  switchInfo,
  memberId,
  onIconPress,
}) => {
  const [iconDialogVisible, setIconDialogVisible] = useState(false);
  const [subClassList, setSubClassList] = useState([]);
  const [renameDialogVisible, setRenameDialogVisible] = useState(false);
  const [roomDialogVisible, setRoomDialogVisible] = useState(false);
  // 懒加载 subClassList：仅在弹窗首次打开时请求，数据就绪后再显示弹窗
  const subClassListLoadedRef = React.useRef(false);
  const handleEditIconPress = () => {
    reportAutoSwitchClick({ subRef: SUB_REF, item_type: 'button', item_name: 'change_icon' });
    if (!subClassListLoadedRef.current) {
      subClassListLoadedRef.current = true;
      Service.callSmartHomeAPI('/v2/device/switch_subclass', {}).then((res) => {
        const rawList = Array.isArray(res) ? res : res?.list;
        if (rawList) {
          setSubClassList(rawList.map((item) => ({
            id: item.id,
            chineseName: item.chinese_name,
            categoryId: item.category_id,
            pluginType: item.plugin_type,
            proxy_category_icon: item.proxy_category_icon,
          })));
        }
        setIconDialogVisible(true);
      }).catch(() => {
        setIconDialogVisible(true);
      });
    } else {
      setIconDialogVisible(true);
    }
  };
  const deviceData = useMemo(() => {
    return switchInfo[memberId + 1] || {};
  }, [switchInfo, memberId]);
  // member 自己的房间名，随 room_id 变化自动刷新
  const memberRoomInfo = useSwitchRoomInfo(
    Object.values(switchInfo).map((m) => m.room_id || 0)
  );
  const memberRoomName = memberRoomInfo[String(memberId + 1)] || '';
  const saveMember = (patch) => {
    if (!deviceData?.id) return;
    const updatedMember = { ...deviceData, ...patch };
    const getNewIcon = () => {
      if (patch.subclass_id === undefined || patch.subclass_id === deviceData.subclass_id) {
        return Promise.resolve(deviceData.icon);
      }
      if (patch.subclass_id === 0) {
        return Promise.resolve(Device.iconURL);
      }
      return Service.smarthome.getDeviceIcon({ subclass_id: patch.subclass_id })
        .then((res) => res?.data?.proxy_category_icon || Device.iconURL)
        .catch(() => Device.iconURL);
    };
    Service.callSmartHomeAPI('/v2/device/update_membership', {
      did: Device.deviceID,
      update_fields: [{ id: deviceData.id, field: updatedMember }],
    }).then(() => getNewIcon()).then((newIcon) => {
      const editInfo = { ...switchInfo, [`${memberId + 1}`]: { ...updatedMember, icon: newIcon } };
      DeviceEventEmitter.emit('EditSwitchInfo_DeviceEventEmitter', editInfo);
    }).catch(() => {});
  };
  const handleIconConfirm = (subclass_id) => saveMember({ subclass_id });
  const handleNameConfirm = (name) => saveMember({ name });
  const handleRoomConfirm = ({ room_id, home_id }) => saveMember({ room_id, home_id });
  return (
    <View style={Styles.baseSwitchStyle}>
      <DeviceHeader
        iconURL={deviceData.icon}
        deviceName={deviceData.name}
        onEditIcon={handleEditIconPress}
        onIconPress={onIconPress}
      />
      <View style={{ width: '100%' }}>
        <InfoCard
          name={deviceData.name}
          roomName={memberRoomName}
          onNamePress={() => {
            reportAutoSwitchClick({ subRef: SUB_REF, item_type: 'button', item_name: 'change_name' });
            setRenameDialogVisible(true);
          }}
          onRoomPress={() => {
            reportAutoSwitchClick({ subRef: SUB_REF, item_type: 'button', item_name: 'change_room' });
            setRoomDialogVisible(true);
          }}
        />
      </View>
      <IconSelectDialog
        visible={iconDialogVisible}
        subClassList={subClassList}
        currentSubclassId={deviceData.subclass_id}
        deviceIconURL={Device.iconURL}
        onConfirm={handleIconConfirm}
        onDismiss={() => setIconDialogVisible(false)}
      />
      {renameDialogVisible && <RenameDialog
        visible={renameDialogVisible}
        defaultName={deviceData.name || ''}
        onConfirm={handleNameConfirm}
        onDismiss={() => setRenameDialogVisible(false)}
      />}
      <RoomSelectDialog
        visible={roomDialogVisible}
        member={deviceData}
        onConfirm={handleRoomConfirm}
        onDismiss={() => setRoomDialogVisible(false)}
      />
    </View>
  );
};
export default BaseSwitchComponent;
// ─── DeviceHeader ─────────────────────────────────────────────────────────────
/**
 * 顶部设备信息区域（Figma 风格）
 * 圆形背景图标 + 设备名 + "修改图标"按钮
 */
export const DeviceHeader = ({ iconURL, deviceName, onEditIcon, onIconPress }) => (
  <View style={HeaderStyles.headerContainer}>
    <TouchableHighlight
      underlayColor="transparent"
      style={HeaderStyles.iconCircle}
    >
      <Image
        source={iconURL ? { uri: iconURL } : Images.common.defaultDevice}
        style={HeaderStyles.deviceIcon}
      />
    </TouchableHighlight>
    <TouchableHighlight
      underlayColor="transparent"
      activeOpacity={0.7}
      style={HeaderStyles.editIconButton}
      onPress={onEditIcon}
    >
      <Text style={[Fonts.fontSystem14Medium, HeaderStyles.editIconText]} numberOfLines={1} ellipsizeMode="tail">{I18n.switch_layoutDetail_editIcon}</Text>
    </TouchableHighlight>
  </View>
);
DeviceHeader.propTypes = {
  iconURL: PropTypes.string,
  deviceName: PropTypes.string,
  onEditIcon: PropTypes.func,
  onIconPress: PropTypes.func,
};
// ─── InfoRow / InfoCard ───────────────────────────────────────────────────────
/**
 * 带右侧值和箭头的列表行
 */
export const InfoRow = ({ label, value, onPress }) => (
  <TouchableHighlight
    underlayColor="transparent"
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={InfoStyles.infoRow}>
      <Text style={[Fonts.fontSystem16Medium, InfoStyles.infoRowLabel]} numberOfLines={3}>{label}</Text>
      <View style={InfoStyles.infoRowRight}>
        <Text style={[Fonts.fontSystem14Regular, InfoStyles.infoRowValue]} numberOfLines={3}>{value}</Text>
        <Right width={18} height={18} fill={dynamicColor('rgba(0,0,0,0.3)', 'rgba(255,255,255,0.3)')} />
      </View>
    </View>
  </TouchableHighlight>
);
InfoRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onPress: PropTypes.func,
};
/**
 * 信息卡片（名称 + 房间）
 */
export const InfoCard = ({ name, roomName, onNamePress, onRoomPress }) => (
  <View style={InfoStyles.infoCard}>
    <InfoRow label={I18n.switch_layoutDetail_name} value={name} onPress={onNamePress} />
    <InfoRow label={I18n.switch_layoutDetail_room} value={roomName} onPress={onRoomPress} />
  </View>
);
InfoCard.propTypes = {
  name: PropTypes.string,
  roomName: PropTypes.string,
  onNamePress: PropTypes.func,
  onRoomPress: PropTypes.func,
};
// ─── 样式 ─────────────────────────────────────────────────────────────────────
const HeaderStyles = dynamicStyleSheet({
  headerContainer: {
    alignItems: 'center',
    paddingTop: 21,
    paddingBottom: 21,
    paddingHorizontal: 12,
  },
  iconCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: colorToken.fillQuaternary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceIcon: {
    width: 52,
    height: 52,
  },
  editIconButton: {
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    maxWidth: 138,
    backgroundColor: colorToken.fillInverse,
  },
  editIconText: {
    maxWidth: 138,
    color: colorToken.contentSecondaryNormal,
  },
});
const InfoStyles = dynamicStyleSheet({
  infoCard: {
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 20,
    backgroundColor: colorToken.surfaceCardTranslucent,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 17,
    paddingVertical: 12,
    minHeight: 56,
  },
  infoRowLabel: {
    flex: 1,
    paddingLeft: 3,
    marginRight: 10,
    paddingTop: 1,
    color: new DynamicColor('rgba(0,0,0,1)', 'rgba(255,255,255,0.95)'),
  },
  infoRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 1,
  },
  infoRowValue: {
    color: new DynamicColor('rgba(0,0,0,0.4)', 'rgba(255,255,255,0.4)'),
    textAlign: 'right',
    maxWidth: 87,
  },
});