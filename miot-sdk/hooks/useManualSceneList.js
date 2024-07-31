import { useState, useEffect } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import useDeepCompareEffect from './useDeepCompareEffect';
export default function useManualSceneList({
  source = 'switch',
  getType = 2,
  filterClosed = false,
  specificSceneIds = []
}) {
  const [manualSceneList, setManualSceneList] = useState([]);
  const fetchManualSceneList = () => {
    Device.getRoomInfoForCurrentHome().then((res) => {
      const { homeId } = res?.data || {};
      if (!homeId) {
        return Promise.reject({
          msg: 'get homeId fail'
        });
      }
      return homeId;
    }).then((homeId) => {
      Service.sceneV2.getManualSceneList({
        home_id: homeId,
        room_id: null,
        owner_uid: Service.account.ID,
        source,
        get_type: getType,
        filter_closed: filterClosed,
        scene_ids: specificSceneIds
      }).then((res) => {
        // console.log('获取批量控制成功--getManualSceneList-res', res);
        setManualSceneList(res || []);
      }).catch((error) => {
        console.log('获取批量控制报错---getManualSceneList---error', error);
      });
    });
  };
  useDeepCompareEffect(() => {
    fetchManualSceneList();
    const listener = PackageEvent.packageViewWillAppear.addListener(() => {
      fetchManualSceneList();
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, [getType, source, filterClosed, specificSceneIds]);
  return manualSceneList;
}