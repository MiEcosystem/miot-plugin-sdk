import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, Image, TouchableHighlight, DeviceEventEmitter } from 'react-native';
import { Device } from 'miot';
import Service from 'miot/Service';
import { dynamicStyleSheet } from '../../../Style';
import DynamicColor, { dynamicColor } from '../../../Style/DynamicColor';
import { FontMiSansWRegular } from '../../../../utils/fonts';
import { adjustSize } from '../../../../utils/sizes';
import { strings as I18n, Images } from "../../../../resources";
import { reportAutoSwitchClick } from "../reportUtils";
import PropTypes from 'prop-types';
import { ListItem } from 'miot/ui/hyperOSUI';
import IconSelectDialog from './IconSelectDialog';
import useSwitchRoomInfo from '../../../../hooks/useSwitchRoomInfo';
import RenameDialog from './RenameDialog';
import RoomSelectDialog from './RoomSelectDialog';
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
  deviceName: {
    fontSize: 20,
    fontFamily: FontMiSansWRegular,
    color: new DynamicColor('rgba(0, 0, 0, 1)', 'rgba(255, 255, 255, 0.95)'),
  },
  roomName: {
    fontSize: 13,
    fontFamily: FontMiSansWRegular,
    color: new DynamicColor('rgba(0, 0, 0, .4)', 'rgba(255, 255, 255, 0.5)'),
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
  normalText: {
    lineHeight: 21,
    fontWeight: 'bold',
    color: new DynamicColor('rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.8)'),
  },
});
/**
 * 基础开关信息组件
 * 显示设备图标、名称、房间信息和修改图标弹窗
 */
const BaseSwitchComponent = ({
  switchInfo,
  memberId,
  roomName,
  subRef,
  onIconPress,
}) => {
  const [iconDialogVisible, setIconDialogVisible] = useState(false);
  const [subClassList, setSubClassList] = useState([]);
  const [renameDialogVisible, setRenameDialogVisible] = useState(false);
  const [roomDialogVisible, setRoomDialogVisible] = useState(false);
  // 懒加载 subClassList：仅在弹窗首次打开时请求
  const subClassListLoadedRef = React.useRef(false);
  const handleEditIconPress = () => {
    reportAutoSwitchClick({
      subRef,
      item_type: 'button',
      item_name: 'edit_icon',
    });
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
      }).catch(() => {});
    }
    setIconDialogVisible(true);
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
          onNamePress={() => setRenameDialogVisible(true)}
          onRoomPress={() => setRoomDialogVisible(true)}
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
      <RenameDialog
        visible={renameDialogVisible}
        defaultName={deviceData.name || ''}
        onConfirm={handleNameConfirm}
        onDismiss={() => setRenameDialogVisible(false)}
      />
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
      activeOpacity={0.7}
      style={HeaderStyles.iconCircle}
      onPress={onIconPress}
      disabled={!onIconPress}
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
      <Text style={HeaderStyles.editIconText} numberOfLines={1} ellipsizeMode="tail">{I18n.switch_layoutDetail_editIcon}</Text>
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
export const InfoRow = ({ label, value, onPress, isLast }) => (
  <TouchableHighlight
    underlayColor="transparent"
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={[InfoStyles.infoRow, !isLast && InfoStyles.infoRowDivider]}>
      <Text style={InfoStyles.infoRowLabel} numberOfLines={1}>{label}</Text>
      <View style={InfoStyles.infoRowRight}>
        <Text style={InfoStyles.infoRowValue} numberOfLines={1}>{value}</Text>
        <Image
          source={Images.common.arrowRight || Images.common.nav_right}
          style={InfoStyles.arrowIcon}
        />
      </View>
    </View>
  </TouchableHighlight>
);
InfoRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onPress: PropTypes.func,
  isLast: PropTypes.bool,
};
/**
 * 信息卡片（名称 + 房间）
 */
export const InfoCard = ({ name, roomName, onNamePress, onRoomPress }) => (
  <View style={InfoStyles.infoCard}>
    <ListItem 
      title={I18n.switch_layoutDetail_name}
      value={name}
      hideRightIcon={ false }
      onPress={ onNamePress }
    />
    <ListItem 
      title={I18n.switch_layoutDetail_room} 
      value={roomName}
      hideRightIcon={ false }
      onPress={ onRoomPress }
    />
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
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: adjustSize(36),
  },
  iconCircle: {
    width: adjustSize(234),
    height: adjustSize(234),
    borderRadius: adjustSize(195),
    backgroundColor: new DynamicColor('rgba(0,0,0,0.04)', 'rgba(255,255,255,0.08)'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceIcon: {
    width: adjustSize(156),
    height: adjustSize(156),
  },
  deviceName: {
    fontSize: 20,
    fontFamily: FontMiSansWRegular,
    color: new DynamicColor('rgba(0,0,0,0.8)', 'rgba(255,255,255,0.95)'),
    textAlign: 'center',
    marginBottom: adjustSize(30),
  },
  editIconButton: {
    height: adjustSize(108),
    borderRadius: adjustSize(108),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: adjustSize(60),
    paddingVertical: adjustSize(24),
    backgroundColor: new DynamicColor('#FFFFFF', 'rgba(255,255,255,0.12)'),
  },
  editIconText: {
    maxWidth: 138,
    fontSize: 14,
    fontFamily: FontMiSansWRegular,
    color: new DynamicColor('rgba(0,0,0,0.8)', 'rgba(255,255,255,0.8)'),
  },
});
const InfoStyles = dynamicStyleSheet({
  infoCard: {
    marginHorizontal: adjustSize(36),
    marginBottom: adjustSize(24),
    borderRadius: adjustSize(60),
    backgroundColor: new DynamicColor('#FFFFFF', '#1C1C1C'),
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: adjustSize(48),
    paddingVertical: adjustSize(42),
  },
  infoRowDivider: {
    borderBottomWidth: 0.5,
    borderBottomColor: new DynamicColor('rgba(0,0,0,0.08)', 'rgba(255,255,255,0.08)'),
  },
  infoRowLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontMiSansWRegular,
    color: new DynamicColor('rgba(0,0,0,1)', 'rgba(255,255,255,0.95)'),
  },
  infoRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRowValue: {
    fontSize: 14,
    fontFamily: FontMiSansWRegular,
    color: new DynamicColor('rgba(0,0,0,0.4)', 'rgba(255,255,255,0.4)'),
    marginRight: adjustSize(12),
  },
  arrowIcon: {
    width: adjustSize(48),
    height: adjustSize(48),
    tintColor: new DynamicColor('rgba(0,0,0,0.3)', 'rgba(255,255,255,0.3)'),
  },
});