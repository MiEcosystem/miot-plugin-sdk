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
  const [state, setState] = useState({ list: [], loaded: false });
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
      Device.getCurrentSelectHomeInfo().then((res) => {
        Service.sceneV2.getManualSceneList({
          home_id: homeId,
          room_id: null,
          owner_uid: res?.data?.ownerUid,
          source,
          get_type: getType,
          filter_closed: filterClosed,
          scene_ids: specificSceneIds
        }).then((res) => {
          setState({ list: res || [], loaded: true });
        }).catch((error) => {
          console.log('获取批量控制报错---getManualSceneList---error', error);
          setState((prev) => ({ ...prev, loaded: true }));
        });
      }).catch((error) => {
        console.log('获取批量控制报错---getManualSceneList---error', error);
        setState((prev) => ({ ...prev, loaded: true }));
      });
    }).catch(() => {
      setState((prev) => ({ ...prev, loaded: true }));
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
  return state;
}